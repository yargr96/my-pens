import { multiplyVectorByNumber, subtractVector, Vector } from '@/utils/Vector';

interface IUseCoordinatesProps {
    coordinatesCenter: Vector;
    pixelsPerOneMathCoordinate: number;
    canvas: HTMLCanvasElement,
}

interface IUseCoordinates {
    toMathCoordinates: (canvasCoordinates: Vector) => Vector;
    toCanvasCoordinates: (mathCoordinates: Vector) => Vector;
    getBoundingCanvasCoordinates: (mathCoordinates: Vector) => Vector;
    setCoordinatesCenter: (value: Vector) => void;
    setPixelsPerOneMathCoordinate: (value: number) => void;
    getCoordinatesCenter: () => Vector;
    getPixelsPerOneMathCoordinate: () => number;
    setCenterToMathCoordinates: (mathCoordinates: Vector) => void;
}

const useCoordinates = ({
    coordinatesCenter,
    pixelsPerOneMathCoordinate,
    canvas,
}: IUseCoordinatesProps): IUseCoordinates => {
    const properties = {
        coordinatesCenter,
        pixelsPerOneMathCoordinate,
    };

    const canvasSize: Vector = [canvas.width, canvas.height];
    const canvasCenter: Vector = [canvas.width / 2, canvas.height / 2];

    const toShiftedCoordinates = (canvasCoordinates: Vector): Vector => [
        canvasCoordinates[0] - properties.coordinatesCenter[0],
        canvasSize[1] - canvasCoordinates[1] - (canvasSize[1] - properties.coordinatesCenter[1]),
    ];

    const toUnshiftedCoordinates = (shiftedCoordinates: Vector): Vector => [
        shiftedCoordinates[0] + properties.coordinatesCenter[0],
        canvasSize[1] - shiftedCoordinates[1] - (canvasSize[1] - properties.coordinatesCenter[1]),
    ];

    const toMathCoordinates = (canvasCoordinates: Vector): Vector => {
        const shiftedCoordinates = toShiftedCoordinates(canvasCoordinates);

        return multiplyVectorByNumber(
            shiftedCoordinates,
            1 / properties.pixelsPerOneMathCoordinate,
        );
    };

    const toCanvasCoordinates = (mathCoordinates: Vector): Vector => {
        const shiftedCoordinates = multiplyVectorByNumber(
            mathCoordinates,
            properties.pixelsPerOneMathCoordinate,
        );

        const unshiftedCoordinates = toUnshiftedCoordinates(shiftedCoordinates);

        return [
            Math.round(unshiftedCoordinates[0]),
            Math.round(unshiftedCoordinates[1]),
        ];
    };

    const getBoundingCanvasCoordinates = (mathCoordinates: Vector): Vector => {
        const canvasCoordinates = toCanvasCoordinates(mathCoordinates);

        if (canvasCoordinates[0] < 0) {
            canvasCoordinates[0] = 0;
        }

        if (canvasCoordinates[0] > canvasSize[0]) {
            canvasCoordinates[0] = canvasSize[0];
        }

        if (canvasCoordinates[1] < 0) {
            canvasCoordinates[1] = 0;
        }

        if (canvasCoordinates[1] > canvasSize[1]) {
            canvasCoordinates[1] = canvasSize[1];
        }

        return canvasCoordinates;
    };

    const setCenterToMathCoordinates = (mathCoordinates: Vector): void => {
        const mathCoordinatesInCanvasCoords = toCanvasCoordinates(mathCoordinates);
        const vectorToTargetCoords = subtractVector(
            mathCoordinatesInCanvasCoords,
            properties.coordinatesCenter,
        );
        properties.coordinatesCenter = subtractVector(canvasCenter, vectorToTargetCoords);
    };

    const setCoordinatesCenter = (value: Vector) => {
        properties.coordinatesCenter = value;
    };

    const setPixelsPerOneMathCoordinate = (value: number) => {
        properties.pixelsPerOneMathCoordinate = value;
    };

    const getCoordinatesCenter = (): Vector => properties.coordinatesCenter;
    const getPixelsPerOneMathCoordinate = (): number => properties.pixelsPerOneMathCoordinate;

    return {
        toMathCoordinates,
        toCanvasCoordinates,
        getBoundingCanvasCoordinates,
        setCoordinatesCenter,
        setPixelsPerOneMathCoordinate,
        getCoordinatesCenter,
        getPixelsPerOneMathCoordinate,
        setCenterToMathCoordinates,
    };
};

export default useCoordinates;
