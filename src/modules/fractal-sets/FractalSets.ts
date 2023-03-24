import { getGradient, gradientPoints } from './gradient';
import Canvas from '@/components/Canvas';
import Controls, { IControlItemProps } from '@/components/Controls';
import {
    belongsToMandelbrotSet,
    belongsToJuliaSet,
    ITERATIONS_COUNT,
    IBelongsToFractalSet,
} from '@/modules/fractal-sets/belongsToSet';
import useCoordinates from '@/modules/fractal-sets/useCoordinates';
import { Module } from '@/modules/moduleTypes';
import { Vector } from '@/utils/Vector';

const gradient = getGradient(gradientPoints, ITERATIONS_COUNT);

interface ISelectSetButton extends IControlItemProps {
    value: (z: Vector) => IBelongsToFractalSet,
}

const setSelectButtons: ISelectSetButton[] = [
    {
        text: 'Mandelbrot set',
        key: 'mandelbrot',
        value: belongsToMandelbrotSet,
    },
    {
        text: 'Julia set',
        key: 'julia',
        value: belongsToJuliaSet,
    },
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

    context.fillStyle = gradient[0];
    context.fillRect(0, 0, canvas.width, canvas.height);

    const PADDING = 20;

    const coordinatesSquareSize = Math.min(canvas.width, canvas.height) - PADDING * 2;
    const COORDINATE_SQUARE_MATH_SIZE = 4;
    const pixelsPerOneMathCoordinate: number = coordinatesSquareSize / COORDINATE_SQUARE_MATH_SIZE;
    const coordinatesCenter: Vector = [canvas.width / 2, canvas.height / 2];

    let belongsTo = belongsToMandelbrotSet;

    const render = (): void => {
        const { getMathCoordinates, getBoundingCanvasCoordinates } = useCoordinates({
            coordinatesCenter,
            pixelsPerOneMathCoordinate,
            canvas,
        });

        const renderingBounds = [
            getBoundingCanvasCoordinates([-2, 2]),
            getBoundingCanvasCoordinates([2, -2]),
        ];

        for (let x = renderingBounds[0][0]; x <= renderingBounds[1][0]; x += 1) {
            for (let y = renderingBounds[0][1]; y <= renderingBounds[1][1]; y += 1) {
                const mathCoordinates = getMathCoordinates([x, y]);
                const { value, stepsCount } = belongsTo(mathCoordinates);

                context.fillStyle = value
                    ? '#000'
                    : gradient[stepsCount];
                context.fillRect(x, y, 1, 1);
            }
        }
    };

    const controls = Controls([setSelectButtons]);

    controls.append(mountElement);

    setSelectButtons.forEach(({ key, value }) => {
        controls.elements[key].addEventListener('click', () => {
            belongsTo = value;
            render();
        });
    });

    render();

    return {};
};

export default FractalSets;
