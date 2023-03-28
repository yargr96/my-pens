import {
    belongsToSet,
    IBelongsToFractalSet,
    ITERATIONS_COUNT,
} from '@/modules/fractal-sets/belongsToSet';
import { getGradient, gradientPoints } from '@/modules/fractal-sets/gradient';
import useCoordinates from '@/modules/fractal-sets/useCoordinates';
import { Vector } from '@/utils/Vector';

export type FractalSetType = 'mandelbrot' | 'julia';

export interface IWorkerData {
    canvasSize: Vector;
    coordinatesCenter: Vector;
    mathCoordinateSize: number;
    fractalSetType: FractalSetType;
}

const C: Vector = [0.14, 0.6];

const setFunctions: Record<FractalSetType, (z: Vector) => IBelongsToFractalSet> = {
    julia: (z: Vector): IBelongsToFractalSet => belongsToSet(z, C),
    mandelbrot: (c: Vector): IBelongsToFractalSet => belongsToSet([0, 0], c),
};

const gradient = getGradient(gradientPoints, ITERATIONS_COUNT);

const renderCanvas = ({
    canvasSize,
    coordinatesCenter,
    mathCoordinateSize,
    fractalSetType,
}: IWorkerData): ImageData => {
    const canvas = new OffscreenCanvas(...canvasSize);
    const context = <OffscreenCanvasRenderingContext2D>canvas.getContext('2d');

    const coordinates = useCoordinates({
        coordinatesCenter,
        mathCoordinateSize,
        canvasSize,
    });

    const renderingBounds = {
        start: [0, 0],
        end: canvasSize,
    };

    const fractalSetFunction = setFunctions[fractalSetType];

    for (let x = renderingBounds.start[0]; x < renderingBounds.end[0]; x += 1) {
        for (let y = renderingBounds.start[1]; y < renderingBounds.end[1]; y += 1) {
            const mathCoordinates = coordinates.toMathCoordinates([x, y]);
            const { value, stepsCount } = fractalSetFunction(mathCoordinates);

            context.fillStyle = value
                ? '#000'
                : gradient[stepsCount];
            context.fillRect(x, y, 1, 1);
        }
    }

    return context.getImageData(0, 0, ...canvasSize);
};

onmessage = ({ data }: MessageEvent<IWorkerData>) => {
    postMessage(renderCanvas(data));
};
