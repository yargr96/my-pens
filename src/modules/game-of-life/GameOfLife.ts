import useGrid from '@/modules/game-of-life/useGrid';
import useFieldMatrix, { FieldMatrix } from '@/modules/game-of-life/useFieldMatrix';
import { glider } from '@/modules/game-of-life/figures';
import Canvas from '@/components/Canvas';
import Controls from '@/components/Controls';
import getRenderLoop from '@/utils/renderLoopNew';
import { areSimilarVectors, Vector } from '@/utils/Vector';

import colors from '@/styles/colors.module.scss';

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

const GameOfLife = (mountElement: Element): void => {
    const {
        element: canvas,
        setSize,
        append,
        getContext,
    } = Canvas();

    setSize(mountElement, 1);
    append(mountElement);

    const context: CanvasRenderingContext2D = getContext();

    const {
        gridSizeParams,
        renderGrid,
        renderCell,
        getCellByCoordinates,
    } = useGrid({
        canvas,
        context,
        cellSize: 20,
        colors: {
            colorBackground: colors.dark,
            colorGrid: colors.gray800,
            colorCell: colors.primary,
        },
    });
    const {
        getMatrix,
        setEmptyMatrix,
        updateGeneration,
        setPoints,
    } = useFieldMatrix({
        gridSize: {
            xCellsCount: gridSizeParams.xCellsCount,
            yCellsCount: gridSizeParams.yCellsCount,
        },
    });

    renderGrid();

    const { run, stop, toggle } = getRenderLoop(() => {
        updateGeneration();
        renderGrid();
        renderMatrix(getMatrix(), renderCell);
    }, { framesPerSecond: 10 });

    const controls = Controls([
        {
            text: 'Play',
            onClick() {
                toggle();
            },
        },
        {
            text: 'Clear',
            onClick() {
                stop();
                setEmptyMatrix();
                renderGrid();
            },
        },
        {
            text: 'Add figure',
            onClick() {
                setPoints(glider);
                run();
            },
        },
    ]);

    controls.append(mountElement);

    let previousCell: Vector = null;
    let isMouseDown = false;

    const drawCell = (coordinates: Vector) => {
        const cell: Vector = getCellByCoordinates(coordinates);

        if (!cell) {
            return;
        }

        if (previousCell && areSimilarVectors(cell, previousCell)) {
            return;
        }

        previousCell = cell;
        setPoints([cell]);
        renderGrid();
        renderMatrix(getMatrix(), renderCell);
    };

    canvas.addEventListener('mousedown', ({ offsetX, offsetY, button }) => {
        if (button !== 0) {
            return;
        }

        isMouseDown = true;

        stop();
        drawCell([offsetX, offsetY]);
    });

    window.addEventListener('mouseup', () => {
        isMouseDown = false;
        previousCell = null;
    });

    canvas.addEventListener('mousemove', ({ offsetX, offsetY }) => {
        if (!isMouseDown) {
            if (previousCell) {
                previousCell = null;
            }

            return;
        }

        drawCell([offsetX, offsetY]);
    });
};

export default GameOfLife;
