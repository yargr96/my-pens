import Canvas from '@/components/Canvas';
import { Module } from '@/modules/moduleTypes';
import colors from '@/styles/colors.module.scss';
import { addVectors, multiplyVectorByNumber, Vector } from '@/utils/Vector';

const FractalSets: Module = (mountElement) => {
    const {
        element: canvas,
        setSize,
        append,
        getContext,
    } = Canvas();

    setSize(mountElement, 1);
    append(mountElement);

    const context: CanvasRenderingContext2D = getContext();

    context.fillStyle = colors.dark;
    context.fillRect(0, 0, canvas.width, canvas.height);

    const PADDING = 20;

    const coordinatesSquareSize = Math.min(canvas.width, canvas.height) - PADDING * 2;

    const fieldZeroCoordinates: Vector = multiplyVectorByNumber([
        canvas.width - coordinatesSquareSize,
        canvas.height - coordinatesSquareSize,
    ], 0.5);

    const zeroCoordinates = addVectors(
        fieldZeroCoordinates,
        [coordinatesSquareSize / 2, coordinatesSquareSize / 2],
    );

    const canvasToFieldCoordinates = (canvasCoordinates: Vector): Vector => [
        canvasCoordinates[0] - zeroCoordinates[0],
        canvas.height - canvasCoordinates[1] - zeroCoordinates[1],
    ];

    context.fillStyle = colors.light;
    context.fillRect(...fieldZeroCoordinates, coordinatesSquareSize, coordinatesSquareSize);

    context.fillStyle = colors.dark;
    context.fillRect(...addVectors(zeroCoordinates, [-5, -5]), 10, 10);

    canvas.addEventListener('click', ({ offsetX, offsetY }) => {
        console.log(canvasToFieldCoordinates([offsetX, offsetY]));
    });

    return {};
};

export default FractalSets;
