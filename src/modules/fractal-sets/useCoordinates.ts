import { multiplyVectorByNumber, Vector } from '@/utils/Vector';

interface IUseCoordinatesProps {
    coordinatesCenter: Vector;
    pixelsPerOneMathCoordinate: number;
    canvas: HTMLCanvasElement,
}

interface IUseCoordinates {
    getMathCoordinates: (canvasCoordinates: Vector) => Vector;
    getCanvasCoordinates: (mathCoordinates: Vector) => Vector;
    getBoundingCanvasCoordinates: (mathCoordinates: Vector) => Vector;
    updateCoordinatesCenter: (value: Vector) => void;
    updatePixelsPerOneMathCoordinate: (value: number) => void;
    getCoordinatesCenter: () => Vector;
    getPixelsPerOneMathCoordinate: () => number;
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

    const getShiftedCoordinates = (canvasCoordinates: Vector): Vector => [
        canvasCoordinates[0] - properties.coordinatesCenter[0],
        canvasSize[1] - canvasCoordinates[1] - (canvasSize[1] - properties.coordinatesCenter[1]),
    ];

    const getUnshiftedCoordinates = (shiftedCoordinates: Vector): Vector => [
        shiftedCoordinates[0] + properties.coordinatesCenter[0],
        canvasSize[1] - shiftedCoordinates[1] - (canvasSize[1] - properties.coordinatesCenter[1]),
    ];

    const getMathCoordinates = (canvasCoordinates: Vector): Vector => {
        const shiftedCoordinates = getShiftedCoordinates(canvasCoordinates);

        return multiplyVectorByNumber(
            shiftedCoordinates,
            1 / properties.pixelsPerOneMathCoordinate,
        );
    };

    const getCanvasCoordinates = (mathCoordinates: Vector): Vector => {
        const shiftedCoordinates = multiplyVectorByNumber(
            mathCoordinates,
            properties.pixelsPerOneMathCoordinate,
        );

        const unshiftedCoordinates = getUnshiftedCoordinates(shiftedCoordinates);

        return [
            Math.round(unshiftedCoordinates[0]),
            Math.round(unshiftedCoordinates[1]),
        ];
    };

    const getBoundingCanvasCoordinates = (mathCoordinates: Vector): Vector => {
        const canvasCoordinates = getCanvasCoordinates(mathCoordinates);

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

    const updateCoordinatesCenter = (value: Vector) => {
        properties.coordinatesCenter = value;
    };

    const updatePixelsPerOneMathCoordinate = (value: number) => {
        properties.pixelsPerOneMathCoordinate = value;
    };

    const getCoordinatesCenter = (): Vector => properties.coordinatesCenter;
    const getPixelsPerOneMathCoordinate = (): number => properties.pixelsPerOneMathCoordinate;

    return {
        getMathCoordinates,
        getCanvasCoordinates,
        getBoundingCanvasCoordinates,
        updateCoordinatesCenter,
        updatePixelsPerOneMathCoordinate,
        getCoordinatesCenter,
        getPixelsPerOneMathCoordinate,
    };
};

export default useCoordinates;
