import {
    belongsToSet,
    IBelongsToFractalSet,
    ITERATIONS_COUNT,
} from '@/modules/fractal-sets/belongsToSet';
import { getGradient, gradientPoints } from '@/modules/fractal-sets/gradient';
import iterativeRender from '@/modules/fractal-sets/iterativeRender';
import useCoordinates, { IUseCoordinates } from '@/modules/fractal-sets/useCoordinates';
import { Vector } from '@/utils/Vector';
import { useRenderLoop } from '@/utils/useRenderLoop';

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

const { getRenderLoop } = useRenderLoop();

interface IDefaults {
    coordinatesCenter: Vector;
    mathCoordinateSize: number;
}

const defaults: IDefaults = {
    coordinatesCenter: null,
    mathCoordinateSize: null,
};

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
    defaults.coordinatesCenter = coordinatesCenter;
    defaults.mathCoordinateSize = mathCoordinateSize;

    canvasSize = canvasSizeProp;
    canvas = new OffscreenCanvas(...canvasSize);
    context = <OffscreenCanvasRenderingContext2D>canvas
        .getContext('2d', { willReadFrequently: true });
    coordinates = useCoordinates({
        coordinatesCenter,
        mathCoordinateSize,
        canvasSize,
    });
};

const render = () => {
    const renderingBounds: { start: Vector, end: Vector } = {
        start: [0, 0],
        end: canvasSize,
    };

    const setFunction = setFunctions[fractalSetFunction];

    iterativeRender({
        start: renderingBounds.start,
        end: renderingBounds.end,
        getRenderLoop,
        callback: ([x, y], step) => {
            const mathCoordinates = coordinates.toMathCoordinates([x, y]);
            const { value, stepsCount } = setFunction(mathCoordinates);
            context.fillStyle = value
                ? '#000'
                : gradient[stepsCount];
            context.fillRect(x, y, step, step);
        },
        iterationEndCallback: () => {
            const imageData: ImageData = context.getImageData(0, 0, ...canvasSize);
            postMessage(imageData);
        },
    });
};

const setFractalFunction = (value: FractalSetType) => {
    fractalSetFunction = value;
    coordinates.setCoordinatesCenter(defaults.coordinatesCenter);
    coordinates.setMathCoordinateSize(defaults.mathCoordinateSize);

    render();
};

onmessage = ({ data }: MessageEvent<IMessage>) => {
    const { type } = data;

    if (type === 'init') {
        init(data.payload);
    }

    if (type === 'render') {
        render();
    }

    if (type === 'setFractalFunction') {
        setFractalFunction(data.payload);
    }
};
