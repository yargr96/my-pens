import useGrid, { IGridSize } from '@/modules/game-of-life/useGrid';
import Canvas from '@/components/Canvas';
import { IRenderLoop } from '@/utils/useRenderLoop';
import { Vector } from '@/utils/Vector';

import colors from '@/styles/colors.module.scss';

type FieldMatrix = Array<boolean[]>;

const getFieldMatrix = ({ xCellsCount, yCellsCount }: IGridSize): FieldMatrix => {
    const arr = [];

    for (let i = 0; i < xCellsCount; i += 1) {
        arr[i] = [];

        for (let j = 0; j < yCellsCount; j += 1) {
            arr[i][j] = false;
        }
    }

    return arr;
};

const fillCell = (cell: Vector, field: FieldMatrix): void => {
    // eslint-disable-next-line no-param-reassign
    field[cell[0]][cell[1]] = true;
};

const testFillField = (field: FieldMatrix): void => {
    const points: Vector[] = [
        [4, 3],
        [5, 4],
        [5, 5],
        [4, 5],
        [3, 5],
    ];

    points.forEach((point) => {
        fillCell(point, field);
    });
};

const getNextGeneration = (pastGeneration: FieldMatrix): FieldMatrix => pastGeneration
    .map(
        (item, x) => item.map((isAlive, y) => {
            const neighbours: boolean[] = [
                pastGeneration[x]?.[y - 1],
                pastGeneration[x + 1]?.[y - 1],
                pastGeneration[x + 1]?.[y],
                pastGeneration[x + 1]?.[y + 1],
                pastGeneration[x]?.[y + 1],
                pastGeneration[x - 1]?.[y + 1],
                pastGeneration[x - 1]?.[y],
                pastGeneration[x - 1]?.[y - 1],
            ];

            const aliveNeighboursCount: number = neighbours.filter((i) => i).length;

            if (!isAlive) {
                return aliveNeighboursCount === 3;
            }

            return aliveNeighboursCount === 2 || aliveNeighboursCount === 3;
        }),
    );

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

        let fieldMatrix = getFieldMatrix(gridSizeParams);
        testFillField(fieldMatrix);

        const renderFrame = renderLoop.getRenderFrame(() => {
            renderGrid();
            renderMatrix(fieldMatrix, renderCell);
            fieldMatrix = getNextGeneration(fieldMatrix);
        });

        renderFrame();
    };

    render();
};

export default GameOfLife;
