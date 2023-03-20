import useGrid from '@/modules/game-of-life/useGrid';
import useFieldMatrix, { FieldMatrix } from '@/modules/game-of-life/useFieldMatrix';
import Canvas from '@/components/Canvas';
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

const initialAliveCells: Vector[] = [
    [4, 3],
    [5, 4],
    [5, 5],
    [4, 5],
    [3, 5],
];

const GameOfLife = (mountElement: Element, renderLoop: IRenderLoop): void => {
    const {
        element: canvas,
        setSize,
        append,
        getContext,
    } = Canvas();

    setSize(mountElement);
    append(mountElement);

    const context: CanvasRenderingContext2D = getContext();

    const render = (): void => {
        const {
            gridSizeParams,
            renderGrid,
            renderCell,
        } = useGrid({
            canvas,
            context,
            cellSize: 50,
            colors: {
                colorBackground: colors.dark,
                colorGrid: colors.light,
                colorCell: colors.primary,
            },
        });

        const {
            getMatrix,
            updateGeneration,
        } = useFieldMatrix({
            gridSize: {
                xCellsCount: gridSizeParams.xCellsCount,
                yCellsCount: gridSizeParams.yCellsCount,
            },
            initialAliveCells,
        });

        const renderFrame = renderLoop.getRenderFrame(() => {
            renderGrid();
            renderMatrix(getMatrix(), renderCell);
            updateGeneration();
        }, 10);

        renderFrame();
    };

    render();

    canvas.addEventListener('click', () => {
        renderLoop.toggle();
    });
};

export default GameOfLife;
