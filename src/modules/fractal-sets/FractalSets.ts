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
import { addVectors, subtractVector, Vector } from '@/utils/Vector';
import isTouchDevice from '@/utils/isTouchDevice';
import getTouchCoordinates from '@/utils/touchCoordinates';

interface ISelectSetButton extends IControlItemProps {
    value: (z: Vector) => IBelongsToFractalSet,
}

interface IZoomButton extends IControlItemProps {
    value: 2 | 0.5,
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

const zoomButtons: IZoomButton[] = [
    {
        text: '+',
        key: 'plus',
        value: 2,
    },
    {
        text: '-',
        key: 'minus',
        value: 0.5,
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

    const PADDING = 20;

    const coordinatesSquareSize = Math.min(canvas.width, canvas.height) - PADDING * 2;
    const COORDINATE_SQUARE_MATH_SIZE = 4;
    const pixelsPerOneMathCoordinateDefault: number = (
        coordinatesSquareSize / COORDINATE_SQUARE_MATH_SIZE
    );
    const coordinatesCenterDefault: Vector = [canvas.width / 2, canvas.height / 2];

    let belongsTo = belongsToMandelbrotSet;
    let pixelsPerOneMathCoordinate = pixelsPerOneMathCoordinateDefault;
    let coordinatesCenter = coordinatesCenterDefault;

    const render = ({ isLowQuality = false } = {}): void => {
        const { getMathCoordinates, getBoundingCanvasCoordinates } = useCoordinates({
            coordinatesCenter,
            pixelsPerOneMathCoordinate,
            canvas,
        });

        const renderingBounds = [
            getBoundingCanvasCoordinates([-2, 2]),
            getBoundingCanvasCoordinates([2, -2]),
        ];

        context.fillStyle = gradient[0];
        context.fillRect(0, 0, canvas.width, canvas.height);

        iterativeRender({
            start: renderingBounds[0],
            end: renderingBounds[1],
            isLowQuality,
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

    const controls = Controls([
        setSelectButtons,
        zoomButtons,
    ]);

    controls.append(mountElement);

    setSelectButtons.forEach(({ key, value }) => {
        controls.elements[key].addEventListener('click', () => {
            belongsTo = value;
            pixelsPerOneMathCoordinate = pixelsPerOneMathCoordinateDefault;
            coordinatesCenter = coordinatesCenterDefault;
            render();
        });
    });

    zoomButtons.forEach(({ key, value }) => {
        controls.elements[key].addEventListener('click', () => {
            pixelsPerOneMathCoordinate *= value;
            render();
        });
    });

    let isMouseDown = false;
    let lastMouseCoordinates: Vector;

    const handleMouseDown = (e: MouseEvent & TouchEvent) => {
        isMouseDown = true;

        const { offsetX, offsetY } = getTouchCoordinates(e);
        lastMouseCoordinates = [offsetX, offsetY];
    };
    const handleMouseMove = (e: MouseEvent & TouchEvent) => {
        if (!isMouseDown) {
            return;
        }

        const { offsetX, offsetY } = getTouchCoordinates(e);

        const deltaCoordinates = subtractVector([offsetX, offsetY], lastMouseCoordinates);
        coordinatesCenter = addVectors(coordinatesCenter, deltaCoordinates);
        lastMouseCoordinates = [offsetX, offsetY];

        render({ isLowQuality: true });
    };
    const handleMouseUp = () => {
        isMouseDown = false;
        render();
    };

    if (isTouchDevice()) {
        canvas.addEventListener('touchstart', handleMouseDown);
        canvas.addEventListener('touchmove', handleMouseMove);
        window.addEventListener('touchend', handleMouseUp);
    } else {
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    render();

    return {
        beforeUnmount: () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchend', handleMouseUp);
        },
    };
};

export default FractalSets;
