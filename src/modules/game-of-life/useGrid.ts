import { subtractVector, Vector } from '@/utils/Vector';

interface IGridColors {
    colorBackground: string;
    colorGrid: string;
    colorCell: string;
}

interface IGridParams {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    cellSize: number;
    colors: IGridColors;
}

export interface IGridSize {
    xCellsCount: number;
    yCellsCount: number;
}

interface IGridSizeParams extends IGridSize {
    gridWidth: number;
    gridHeight: number;
    offsetLeft: number;
    offsetTop: number;
}

interface IGrid {
    renderGrid: () => void;
    renderCell: (cell: Vector) => void;
    gridSizeParams: IGridSizeParams;
    getCellByCoordinates: (coordinates: Vector) => Vector;
}

const getGridSizeParams = (canvas: HTMLCanvasElement, cellSize: number): IGridSizeParams => {
    const xCellsCount = Math.floor(canvas.width / cellSize);
    const yCellsCount = Math.floor(canvas.height / cellSize);

    const gridWidth = cellSize * xCellsCount;
    const gridHeight = cellSize * yCellsCount;

    const offsetLeft = (canvas.width - gridWidth) / 2;
    const offsetTop = (canvas.height - gridHeight) / 2;

    return {
        xCellsCount,
        yCellsCount,
        gridWidth,
        gridHeight,
        offsetLeft,
        offsetTop,
    };
};

const useGrid = ({
    canvas,
    context,
    cellSize,
    colors: {
        colorBackground,
        colorGrid,
        colorCell,
    },
}: IGridParams): IGrid => {
    const gridSizeParams: IGridSizeParams = getGridSizeParams(canvas, cellSize);

    const renderGrid = (): void => {
        context.fillStyle = colorBackground;
        context.fillRect(0, 0, canvas.width, canvas.height);

        const {
            xCellsCount,
            yCellsCount,
            gridWidth,
            gridHeight,
            offsetLeft,
            offsetTop,
        } = gridSizeParams;

        context.strokeStyle = colorGrid;

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

    const renderCell = (cell: Vector): void => {
        const { offsetTop, offsetLeft } = gridSizeParams;

        const cellPadding = 2;
        const cellRenderingSize = cellSize - cellPadding * 2;

        const position: Vector = [
            cell[0] * cellSize + offsetLeft + cellPadding,
            cell[1] * cellSize + offsetTop + cellPadding,
        ];

        context.fillStyle = colorCell;
        context.fillRect(...position, cellRenderingSize, cellRenderingSize);
    };

    const getCellByCoordinates = (coordinates: Vector): Vector => {
        const coordinatesWithoutOffset = subtractVector(coordinates, [
            gridSizeParams.offsetLeft,
            gridSizeParams.offsetTop,
        ]);

        if (coordinatesWithoutOffset[0] < 0 || coordinatesWithoutOffset[1] < 0) {
            return null;
        }

        const cell: Vector = [
            Math.floor(coordinatesWithoutOffset[0] / cellSize),
            Math.floor(coordinatesWithoutOffset[1] / cellSize),
        ];

        if (cell[0] >= gridSizeParams.xCellsCount || cell[1] >= gridSizeParams.yCellsCount) {
            return null;
        }

        return cell;
    };

    return {
        gridSizeParams,
        renderGrid,
        renderCell,
        getCellByCoordinates,
    };
};

export default useGrid;
