import { IRenderLoop } from '@/utils/useRenderLoop';
import Canvas from '@/components/Canvas';
import colors from '@/styles/colors.module.scss';
import { Vector } from '@/utils/Vector';

interface IGridData {
    cellSize: number;
    xCellsCount: number;
    yCellsCount: number;
    gridWidth: number;
    gridHeight: number;
    offsetLeft: number;
    offsetTop: number;
}

const getGridData = (canvas: HTMLCanvasElement): IGridData => {
    const cellSize = 50;
    const xCellsCount = Math.floor(canvas.width / cellSize);
    const yCellsCount = Math.floor(canvas.height / cellSize);

    const gridWidth = cellSize * xCellsCount;
    const gridHeight = cellSize * yCellsCount;

    const offsetLeft = (canvas.width - gridWidth) / 2;
    const offsetTop = (canvas.height - gridHeight) / 2;

    return {
        cellSize,
        xCellsCount,
        yCellsCount,
        gridWidth,
        gridHeight,
        offsetLeft,
        offsetTop,
    };
};

const renderGrid = (
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    gridData: IGridData,
): void => {
    const {
        cellSize,
        xCellsCount,
        yCellsCount,
        gridWidth,
        gridHeight,
        offsetLeft,
        offsetTop,
    } = gridData;

    context.strokeStyle = colors.light;

    context.beginPath();

    for (let i = 0; i <= xCellsCount; i += 1) {
        const xCoordinate = cellSize * i;
        context.moveTo(xCoordinate + offsetLeft, offsetTop);
        context.lineTo(xCoordinate + offsetLeft, gridHeight + offsetTop);
    }

    for (let i = 0; i <= yCellsCount; i += 1) {
        const yCoordinate = cellSize * i;
        context.moveTo(offsetLeft, yCoordinate + offsetTop);
        context.lineTo(gridWidth + offsetLeft, yCoordinate + offsetTop);
    }

    context.stroke();
};

const renderCell = (
    context: CanvasRenderingContext2D,
    cell: Vector,
    grid: IGridData,
): void => {
    const cellPadding = 5;
    const cellRenderingSize = grid.cellSize - cellPadding * 2;

    const position: Vector = [
        cell[0] * grid.cellSize + grid.offsetLeft + cellPadding,
        cell[1] * grid.cellSize + grid.offsetTop + cellPadding,
    ];

    context.fillStyle = colors.primary;
    context.fillRect(...position, cellRenderingSize, cellRenderingSize);
};

type FieldArray = Array<Array<boolean>>;

const getFieldArray = ({ xCellsCount, yCellsCount }: IGridData): FieldArray => {
    const arr = [];

    for (let i = 0; i < xCellsCount; i += 1) {
        arr[i] = [];

        for (let j = 0; j < yCellsCount; j += 1) {
            arr[i][j] = false;
        }
    }

    return arr;
};

const fillCell = (cell: Vector, field: FieldArray) => {
    // eslint-disable-next-line no-param-reassign
    field[cell[0]][cell[1]] = true;
};

const testFillField = (field: FieldArray) => {
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

const renderField = (
    context: CanvasRenderingContext2D,
    gridData: IGridData,
    fieldArray: FieldArray,
): void => {
    fieldArray.forEach((item, x) => {
        item.forEach((isAlive, y) => {
            if (!isAlive) {
                return;
            }

            renderCell(context, [x, y], gridData);
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

    const render = () => {
        context.fillStyle = colors.dark;
        context.fillRect(0, 0, canvas.width, canvas.height);

        const gridData = getGridData(canvas);

        renderGrid(canvas, context, gridData);

        const fieldArray = getFieldArray(gridData);

        testFillField(fieldArray);
        renderField(context, gridData, fieldArray);
    };

    render();
};

export default GameOfLife;
