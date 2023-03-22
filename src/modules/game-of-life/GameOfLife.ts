import useGrid, { IGrid } from '@/modules/game-of-life/useGrid';
import useFieldMatrix, { FieldMatrix, IFieldMatrix } from '@/modules/game-of-life/useFieldMatrix';
import life from '@/modules/game-of-life/figures/life';
import controlsData, { sizeControls, speedControls } from '@/modules/game-of-life/controls';
import Canvas from '@/components/Canvas';
import Controls from '@/components/Controls';
import getRenderLoop, { FramesPerSecond, IRenderLoop } from '@/utils/useRenderLoop';
import { areSimilarVectors, Vector } from '@/utils/Vector';
import { Module } from '@/modules/moduleTypes';

import colors from '@/styles/colors.module.scss';
import getTouchCoordinates from '@/utils/touchCoordinates';
import isTouchDevice from '@/utils/isTouchDevice';

interface IConfig {
    cellSize: number,
    framesPerSecond: FramesPerSecond,
}

const renderMatrix = (fieldMatrix: FieldMatrix, renderCell: (cell: Vector) => void): void => {
    fieldMatrix.forEach((item, x) => {
        item.forEach((isAlive, y) => {
            if (!isAlive) {
                return;
            }

            renderCell([x, y]);
        });
    });
};

const GameOfLife: Module = (mountElement) => {
    const {
        element: canvas,
        setSize,
        append,
        getContext,
    } = Canvas();

    setSize(mountElement, 1);
    append(mountElement);

    const context: CanvasRenderingContext2D = getContext();

    let grid: IGrid = null;
    let fieldMatrix: IFieldMatrix = null;
    let renderLoop: IRenderLoop = null;

    const config: IConfig = {
        cellSize: 20,
        framesPerSecond: 10,
    };

    const render = () => {
        grid = useGrid({
            canvas,
            context,
            cellSize: config.cellSize,
            showGrid: config.cellSize >= 10,
            colors: {
                colorBackground: colors.dark,
                colorGrid: colors.gray800,
                colorCell: colors.primary,
            },
        });

        fieldMatrix = useFieldMatrix({
            gridSize: {
                xCellsCount: grid.gridSizeParams.xCellsCount,
                yCellsCount: grid.gridSizeParams.yCellsCount,
            },
        });

        renderLoop = getRenderLoop(() => {
            const isUpdated = fieldMatrix.updateGeneration();
            if (!isUpdated) {
                renderLoop.stop();
            }

            grid.renderGrid();
            renderMatrix(fieldMatrix.getMatrix(), grid.renderCell);
        }, { framesPerSecond: config.framesPerSecond });

        grid.renderGrid();
        fieldMatrix.putFigureToCenter(life);
        renderMatrix(fieldMatrix.getMatrix(), grid.renderCell);
    };

    render();

    const controls = Controls(controlsData);
    controls.append(mountElement);

    controls.elements.play.addEventListener('click', () => {
        renderLoop.toggle();
    });

    controls.elements.clear.addEventListener('click', () => {
        renderLoop.stop();
        fieldMatrix.setEmptyMatrix();
        grid.renderGrid();
    });

    controls.elements.randomFill.addEventListener('click', () => {
        grid.renderGrid();
        fieldMatrix.randomFill();
        renderMatrix(fieldMatrix.getMatrix(), grid.renderCell);
    });

    const changeSize = (size: number): void => {
        if (config.cellSize === size) {
            return;
        }

        config.cellSize = size;
        render();
    };

    sizeControls.forEach(({ key, value }) => {
        controls.elements[key].addEventListener('click', () => {
            changeSize(value);
        });
    });

    speedControls.forEach(({ key, value }) => {
        controls.elements[key].addEventListener('click', () => {
            config.framesPerSecond = value;
            renderLoop.setFramesPerSecond(value);
        });
    });

    let previousCell: Vector = null;
    let isMouseDown = false;

    const drawCell = (coordinates: Vector) => {
        const cell: Vector = grid.getCellByCoordinates(coordinates);

        if (!cell) {
            return;
        }

        if (previousCell && areSimilarVectors(cell, previousCell)) {
            return;
        }

        previousCell = cell;
        fieldMatrix.setPoints([cell]);
        grid.renderGrid();
        renderMatrix(fieldMatrix.getMatrix(), grid.renderCell);
    };

    const handleMouseDown = (e: MouseEvent & TouchEvent) => {
        const { offsetX, offsetY } = getTouchCoordinates(e);

        isMouseDown = true;

        renderLoop.stop();
        drawCell([offsetX, offsetY]);
    };

    const handleMouseUp = (): void => {
        isMouseDown = false;
        previousCell = null;
    };

    const handleMouseMove = (e: MouseEvent & TouchEvent) => {
        const { offsetX, offsetY } = getTouchCoordinates(e);

        if (!isMouseDown) {
            if (previousCell) {
                previousCell = null;
            }

            return;
        }

        drawCell([offsetX, offsetY]);
    };

    if (isTouchDevice()) {
        canvas.addEventListener('touchstart', handleMouseDown);
        window.addEventListener('touchend', handleMouseUp);
        canvas.addEventListener('touchmove', handleMouseMove);
    } else {
        canvas.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mousemove', handleMouseMove);
    }

    const beforeUnmount = () => {
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchend', handleMouseUp);
    };

    return { beforeUnmount };
};

export default GameOfLife;
