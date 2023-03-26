import { getGradient, gradientPoints } from './gradient';
import Canvas from '@/components/Canvas';
import Controls, { IControlItemProps } from '@/components/Controls';
import styles from '@/modules/fractal-sets/FractalSets.module.scss';
import {
    belongsToSet,
    ITERATIONS_COUNT,
    IBelongsToFractalSet,
} from '@/modules/fractal-sets/belongsToSet';
import iterativeRender from '@/modules/fractal-sets/iterativeRender';
import useCoordinates from '@/modules/fractal-sets/useCoordinates';
import { Module } from '@/modules/moduleTypes';
import {
    addVectors,
    areSimilarVectors,
    subtractVector,
    Vector,
} from '@/utils/Vector';
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

    canvas.classList.add(styles.canvas);

    setSize(mountElement, 1);
    append(mountElement);

    const context: CanvasRenderingContext2D = getContext();

    const PADDING = 20;

    const coordinatesSquareSize = Math.min(canvas.width, canvas.height) - PADDING * 2;
    const COORDINATE_SQUARE_MATH_SIZE = 4;
    const pixelsPerOneMathCoordinateDefault: number = (
        coordinatesSquareSize / COORDINATE_SQUARE_MATH_SIZE
    );
    const canvasCenterCoordinates: Vector = [canvas.width / 2, canvas.height / 2];
    const coordinatesCenterDefault: Vector = canvasCenterCoordinates;

    let belongsTo = belongsToMandelbrotSet;

    const coordinates = useCoordinates({
        coordinatesCenter: coordinatesCenterDefault,
        pixelsPerOneMathCoordinate: pixelsPerOneMathCoordinateDefault,
        canvas,
    });

    const render = ({ isLowQuality = false } = {}): void => {
        const renderingBounds = [
            coordinates.getBoundingCanvasCoordinates([-2, 2]),
            coordinates.getBoundingCanvasCoordinates([2, -2]),
        ];

        context.fillStyle = gradient[0];
        context.fillRect(0, 0, canvas.width, canvas.height);

        iterativeRender({
            start: renderingBounds[0],
            end: renderingBounds[1],
            isLowQuality,
            callback: ([x, y], step) => {
                const mathCoordinates = coordinates.toMathCoordinates([x, y]);
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
            coordinates.setPixelsPerOneMathCoordinate(pixelsPerOneMathCoordinateDefault);
            coordinates.setCoordinatesCenter(coordinatesCenterDefault);
            render();
        });
    });

    zoomButtons.forEach(({ key, value }) => {
        controls.elements[key].addEventListener('click', () => {
            const centerAsMathCoords = coordinates.toMathCoordinates(canvasCenterCoordinates);
            coordinates.setPixelsPerOneMathCoordinate(
                coordinates.getPixelsPerOneMathCoordinate() * value,
            );
            coordinates.setCenterToMathCoordinates(centerAsMathCoords);
            render();
        });
    });

    let isMouseDown = false;
    let lastMouseCoordinates: Vector;
    let coordinatesChanged = false;

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
        if (areSimilarVectors(deltaCoordinates, [0, 0])) {
            return;
        }

        coordinates.setCoordinatesCenter(
            addVectors(coordinates.getCoordinatesCenter(), deltaCoordinates),
        );
        lastMouseCoordinates = [offsetX, offsetY];
        coordinatesChanged = true;

        render({ isLowQuality: true });
    };
    const handleMouseUp = () => {
        if (!isMouseDown) {
            return;
        }

        isMouseDown = false;

        if (coordinatesChanged) {
            render();
            coordinatesChanged = false;
        }
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
