import Canvas from '@/components/Canvas';
import useCoordinates from '@/modules/fractal-sets/useCoordinates';
import { Module } from '@/modules/moduleTypes';
import colors from '@/styles/colors.module.scss';
import { addVectors, Vector } from '@/utils/Vector';

// z(n) = z(n-1)**2 + c
const getComplexNumberSquare = ([x, y]: Vector): Vector => [
    x ** 2 - y ** 2,
    2 * x * y,
];

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
    const COORDINATE_SQUARE_MATH_SIZE = 4;
    const pixelsPerOneMathCoordinate: number = coordinatesSquareSize / COORDINATE_SQUARE_MATH_SIZE;
    const coordinatesCenter: Vector = [canvas.width / 2, canvas.height / 2];

    const { getMathCoordinates, getCanvasCoordinates } = useCoordinates({
        coordinatesCenter,
        pixelsPerOneMathCoordinate,
        canvas,
    });

    context.fillStyle = colors.light;
    context.fillRect(...addVectors(coordinatesCenter, [-2, -2]), 4, 4);

    canvas.addEventListener('click', ({ offsetX, offsetY }) => {
        const mathCoordinates = getMathCoordinates([offsetX, offsetY]);
        console.log(mathCoordinates);
        console.log(getCanvasCoordinates(mathCoordinates));
        console.log([offsetX, offsetY]);
    });

    return {};
};

export default FractalSets;
