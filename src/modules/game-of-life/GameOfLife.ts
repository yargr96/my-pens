import useGrid from '@/modules/game-of-life/useGrid';
import useFieldMatrix, { FieldMatrix } from '@/modules/game-of-life/useFieldMatrix';
import { glider } from '@/modules/game-of-life/figures';
import Canvas from '@/components/Canvas';
import Controls from '@/components/Controls';
import { IRenderLoop } from '@/utils/useRenderLoop';
import { Vector } from '@/utils/Vector';

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

const GameOfLife = (mountElement: Element, renderLoop: IRenderLoop): void => {
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
        initialAliveCells: glider,
    });

    const controls = Controls([
        {
            text: 'Play',
            onClick() {
                renderLoop.toggle();
            },
        },
        {
            text: 'Clear',
            onClick() {
                setEmptyMatrix();
                renderLoop.stop();
                renderGrid();
            },
        },
        {
            text: 'Add figure',
            onClick() {
                setPoints(glider);
            },
        },
    ]);

    controls.append(mountElement);

    const renderFrame = renderLoop.getRenderFrame(() => {
        renderGrid();
        renderMatrix(getMatrix(), renderCell);
        updateGeneration();
    }, 10);

    renderFrame();

    canvas.addEventListener('click', ({ offsetX, offsetY }) => {
        const cell: Vector = getCellByCoordinates([offsetX, offsetY]);
        setPoints([cell]);
    });
};

export default GameOfLife;
