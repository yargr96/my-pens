// TODO Remove

import Canvas from '@/components/Canvas';
import Controls, { IControlItemProps } from '@/components/Controls';
import styles from '@/modules/fractal-sets/FractalSets.module.scss';
import { FractalSetType, IWorkerData } from '@/modules/fractal-sets/renderingWorker';
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
    value: FractalSetType,
}

interface IZoomButton extends IControlItemProps {
    value: 2 | 0.5,
}

const setSelectButtons: ISelectSetButton[] = [
    {
        text: 'Mandelbrot set',
        key: 'mandelbrot',
        value: 'mandelbrot',
    },
    {
        text: 'Julia set',
        key: 'julia',
        value: 'julia',
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
    const worker = new Worker(new URL('./renderingWorker', import.meta.url));

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
    const mathCoordinateSizeDefault: number = (
        coordinatesSquareSize / COORDINATE_SQUARE_MATH_SIZE
    );
    const canvasCenterCoordinates: Vector = [canvas.width / 2, canvas.height / 2];
    const coordinatesCenterDefault: Vector = canvasCenterCoordinates;

    let fractalSetType: FractalSetType = 'mandelbrot';
    let coordinatesCenter: Vector = coordinatesCenterDefault;
    let mathCoordinateSize: number = mathCoordinateSizeDefault;

    const render = ({ isLowQuality = false } = {}): void => {
        const message: IWorkerData = {
            canvasSize: [canvas.width, canvas.height],
            coordinatesCenter,
            mathCoordinateSize,
            fractalSetType,
        };

        worker.postMessage(message);

        worker.onmessage = ({ data }: MessageEvent<ImageData>) => {
            context.putImageData(data, 0, 0);
        };
    };

    const controls = Controls([
        setSelectButtons,
        zoomButtons,
    ]);

    controls.append(mountElement);

    setSelectButtons.forEach(({ key, value }) => {
        controls.elements[key].addEventListener('click', () => {
            fractalSetType = value;
            mathCoordinateSize = mathCoordinateSizeDefault;
            coordinatesCenter = coordinatesCenterDefault;

            render();
        });
    });

    zoomButtons.forEach(({ key, value }) => {
        controls.elements[key].addEventListener('click', () => {
            // todo implement
            // const centerAsMathCoords = coordinates.toMathCoordinates(canvasCenterCoordinates);
            // coordinates.setMathCoordinateSize(
            //     coordinates.getMathCoordinateSize() * value,
            // );
            // coordinates.setCenterToMathCoordinates(centerAsMathCoords);
            render();
        });
    });

    let isMouseDown = false;
    let startMouseCoordinates: Vector;
    let coordinatesChanged = false;
    let imageData: ImageData;
    let deltaCoordinates: Vector;

    const handleMouseDown = (e: MouseEvent & TouchEvent) => {
        isMouseDown = true;

        const { offsetX, offsetY } = getTouchCoordinates(e);
        startMouseCoordinates = [offsetX, offsetY];
    };

    const handleMouseMove = (e: MouseEvent & TouchEvent) => {
        if (!isMouseDown) {
            return;
        }

        const { offsetX, offsetY } = getTouchCoordinates(e);

        deltaCoordinates = subtractVector([offsetX, offsetY], startMouseCoordinates);
        if (areSimilarVectors(deltaCoordinates, [0, 0])) {
            return;
        }

        coordinatesChanged = true;

        imageData = imageData ?? context.getImageData(0, 0, canvas.width, canvas.height);
        // todo цвет из градиента
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.putImageData(imageData, ...deltaCoordinates);
    };
    const handleMouseUp = () => {
        if (!isMouseDown) {
            return;
        }

        isMouseDown = false;

        if (coordinatesChanged) {
            coordinatesCenter = addVectors(coordinatesCenter, deltaCoordinates);
            deltaCoordinates = null;
            imageData = null;
            coordinatesChanged = false;

            render();
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
