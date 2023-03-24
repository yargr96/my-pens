import { getGradient, gradientPoints } from './gradient';
import Canvas from '@/components/Canvas';
import Controls, { IControlItemProps } from '@/components/Controls';
import {
    belongsToSet,
    ITERATIONS_COUNT,
    IBelongsToFractalSet,
} from '@/modules/fractal-sets/belongsToSet';
import iterativeRender from '@/modules/fractal-sets/iterativeRender';
import useCoordinates from '@/modules/fractal-sets/useCoordinates';
import { Module } from '@/modules/moduleTypes';
import { Vector } from '@/utils/Vector';

interface ISelectSetButton extends IControlItemProps {
    value: (z: Vector) => IBelongsToFractalSet,
}

const gradient = getGradient(gradientPoints, ITERATIONS_COUNT);

const C: Vector = [0.14, 0.6];

const belongsToJuliaSet = (z: Vector): IBelongsToFractalSet => belongsToSet(z, C);
const belongsToMandelbrotSet = (c: Vector): IBelongsToFractalSet => belongsToSet([0, 0], c);

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

        iterativeRender({
            start: renderingBounds[0],
            end: renderingBounds[1],
            callback: ([x, y], step) => {
                const mathCoordinates = getMathCoordinates([x, y]);
                const { value, stepsCount } = belongsTo(mathCoordinates);

                context.fillStyle = value
                    ? '#000'
                    : gradient[stepsCount];
                context.fillRect(x, y, step, step);
            },
        });
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
