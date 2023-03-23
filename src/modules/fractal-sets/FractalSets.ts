import Canvas from '@/components/Canvas';
import Controls from '@/components/Controls';
import useCoordinates from '@/modules/fractal-sets/useCoordinates';
import { Module } from '@/modules/moduleTypes';
import { addVectors, getVectorLength, Vector } from '@/utils/Vector';

const getComplexNumberSquare = ([x, y]: Vector): Vector => [
    x ** 2 - y ** 2,
    2 * x * y,
];

const ITERATIONS_COUNT = 100;
const C: Vector = [0.14, 0.6];

interface IBelongsToFractalSet {
    value: boolean;
    stepsCount?: number;
}

const belongsToJuliaSet = (z: Vector): IBelongsToFractalSet => {
    let zLast: Vector = [...z];

    for (let i = 0; i < ITERATIONS_COUNT; i += 1) {
        const zNew = (addVectors(getComplexNumberSquare(zLast), C));

        if (getVectorLength(zNew) > 2) {
            return {
                value: false,
                stepsCount: i,
            };
        }

        zLast = zNew;
    }

    return { value: true };
};

const belongsToMandelbrotSet = (c: Vector): IBelongsToFractalSet => {
    let zLast: Vector = [0, 0];

    for (let i = 0; i < ITERATIONS_COUNT; i += 1) {
        const zNew = addVectors(
            getComplexNumberSquare(zLast),
            c,
        );

        if (getVectorLength(zNew) > 2) {
            return {
                value: false,
                stepsCount: i,
            };
        }

        zLast = zNew;
    }

    return { value: true };
};

const getColor = (stepsCount: number): string => {
    const grb = Math.floor((stepsCount / ITERATIONS_COUNT) * 255);

    return `rgb(${grb}, ${grb}, ${grb})`;
};

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

    context.fillStyle = getColor(0);
    context.fillRect(0, 0, canvas.width, canvas.height);

    const PADDING = 20;

    const coordinatesSquareSize = Math.min(canvas.width, canvas.height) - PADDING * 2;
    const COORDINATE_SQUARE_MATH_SIZE = 4;
    const pixelsPerOneMathCoordinate: number = coordinatesSquareSize / COORDINATE_SQUARE_MATH_SIZE;
    const coordinatesCenter: Vector = [canvas.width / 2, canvas.height / 2];

    let belongsTo = belongsToJuliaSet;

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
                    : getColor(stepsCount);
                context.fillRect(x, y, 1, 1);
            }
        }
    };

    const controls = Controls([[
        {
            text: 'Julia set',
            key: 'julia',
        },
        {
            text: 'Mandelbrot set',
            key: 'mandelbrot',
        },
    ]]);

    controls.append(mountElement);

    controls.elements.julia.addEventListener('click', () => {
        belongsTo = belongsToJuliaSet;
        render();
    });

    controls.elements.mandelbrot.addEventListener('click', () => {
        belongsTo = belongsToMandelbrotSet;
        render();
    });

    render();

    return {};
};

export default FractalSets;
