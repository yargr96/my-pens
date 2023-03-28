import {
    belongsToSet,
    IBelongsToFractalSet,
    ITERATIONS_COUNT,
} from '@/modules/fractal-sets/belongsToSet';
import { getGradient, gradientPoints } from '@/modules/fractal-sets/gradient';
import useCoordinates, { IUseCoordinates } from '@/modules/fractal-sets/useCoordinates';
import { Vector } from '@/utils/Vector';

export type FractalSetType = 'mandelbrot' | 'julia';

export interface IWorkerInitData {
    canvasSize: Vector;
    coordinatesCenter: Vector;
    mathCoordinateSize: number;
}

export type IMessage = {
    type: 'init';
    payload: IWorkerInitData;
} | {
    type: 'setFractalFunction';
    payload: FractalSetType;
} | {
    type: 'render';
};

const C: Vector = [0.14, 0.6];

const setFunctions: Record<FractalSetType, (z: Vector) => IBelongsToFractalSet> = {
    julia: (z: Vector): IBelongsToFractalSet => belongsToSet(z, C),
    mandelbrot: (c: Vector): IBelongsToFractalSet => belongsToSet([0, 0], c),
};

const gradient = getGradient(gradientPoints, ITERATIONS_COUNT);

let canvas: OffscreenCanvas;
let canvasSize: Vector;
let context: OffscreenCanvasRenderingContext2D;
let coordinates: IUseCoordinates;
let fractalSetFunction: FractalSetType = 'mandelbrot';

const init = ({
    canvasSize: canvasSizeProp,
    coordinatesCenter,
    mathCoordinateSize,
}: IWorkerInitData) => {
    canvasSize = canvasSizeProp;
    canvas = new OffscreenCanvas(...canvasSize);
    context = <OffscreenCanvasRenderingContext2D>canvas.getContext('2d');
    coordinates = useCoordinates({
        coordinatesCenter,
        mathCoordinateSize,
        canvasSize,
    });
};

const setFractalFunction = (value: FractalSetType) => {
    fractalSetFunction = value;
};

const render = () => {
    const renderingBounds = {
        start: [0, 0],
        end: canvasSize,
    };

    const setFunction = setFunctions[fractalSetFunction];

    for (let x = renderingBounds.start[0]; x < renderingBounds.end[0]; x += 1) {
        for (let y = renderingBounds.start[1]; y < renderingBounds.end[1]; y += 1) {
            const mathCoordinates = coordinates.toMathCoordinates([x, y]);
            const { value, stepsCount } = setFunction(mathCoordinates);

            context.fillStyle = value
                ? '#000'
                : gradient[stepsCount];
            context.fillRect(x, y, 1, 1);
        }
    }

    const imageData: ImageData = context.getImageData(0, 0, ...canvasSize);

    postMessage(imageData);
};

onmessage = ({ data }: MessageEvent<IMessage>) => {
    const { type } = data;

    if (type === 'init') {
        init(data.payload);
    }

    if (type === 'render') {
        render();
    }
};
