import { IRenderLoop } from '@/utils/useRenderLoop';
import Canvas from '@/components/Canvas';
import colors from '@/styles/colors.module.scss';

const renderGrid = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D): void => {
    const cellSize = 50;
    const xCellsCount = Math.floor(canvas.width / cellSize);
    const yCellsCount = Math.floor(canvas.height / cellSize);

    const gridWidth = cellSize * xCellsCount;
    const gridHeight = cellSize * yCellsCount;

    const offsetLeft = (canvas.width - gridWidth) / 2;
    const offsetTop = (canvas.height - gridHeight) / 2;

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

        renderGrid(canvas, context);
    };

    render();
};

export default GameOfLife;
