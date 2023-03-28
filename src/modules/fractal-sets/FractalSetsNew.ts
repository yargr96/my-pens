import Canvas from '@/components/Canvas';
import Controls, { IControlItemProps } from '@/components/Controls';
import styles from '@/modules/fractal-sets/FractalSets.module.scss';
import { FractalSetType, IMessage } from '@/modules/fractal-sets/renderingWorker';
import { Module } from '@/modules/moduleTypes';
import { multiplyVectorByNumber, Vector } from '@/utils/Vector';

const DEFAULT_PADDING = 20;
const COORDINATE_SQUARE_MATH_SIZE = 4;

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
    const canvasSize: Vector = [canvas.width, canvas.height];
    const coordinatesCenter: Vector = multiplyVectorByNumber(canvasSize, 0.5);
    const coordinatesSquareSize = Math.min(...canvasSize) - DEFAULT_PADDING * 2;
    const mathCoordinateSize: number = (
        coordinatesSquareSize / COORDINATE_SQUARE_MATH_SIZE
    );

    const worker = new Worker(new URL('./renderingWorker', import.meta.url));

    worker.onmessage = ({ data }: MessageEvent<ImageData>) => {
        context.putImageData(data, 0, 0);
    };

    const initMessage: IMessage = {
        type: 'init',
        payload: {
            canvasSize: [canvas.width, canvas.height],
            coordinatesCenter,
            mathCoordinateSize,
        },
    };
    worker.postMessage(initMessage);

    const render = () => {
        const renderMessage: IMessage = { type: 'render' };
        worker.postMessage(renderMessage);
    };

    const controls = Controls([
        setSelectButtons,
        zoomButtons,
    ]);

    controls.append(mountElement);

    setSelectButtons.forEach(({ key, value }) => {
        controls.elements[key].addEventListener('click', () => {
            const selectSetMessage: IMessage = {
                type: 'setFractalFunction',
                payload: value,
            };

            worker.postMessage(selectSetMessage);
        });
    });

    render();

    return {};
};

export default FractalSets;
