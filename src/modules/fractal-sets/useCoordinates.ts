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
}

const useCoordinates = ({
    coordinatesCenter,
    pixelsPerOneMathCoordinate,
    canvas,
}: IUseCoordinatesProps): IUseCoordinates => {
    const canvasSize: Vector = [canvas.width, canvas.height];

    const getShiftedCoordinates = (canvasCoordinates: Vector): Vector => [
        canvasCoordinates[0] - coordinatesCenter[0],
        canvasSize[1] - canvasCoordinates[1] - (canvasSize[1] - coordinatesCenter[1]),
    ];

    const getUnshiftedCoordinates = (shiftedCoordinates: Vector): Vector => [
        shiftedCoordinates[0] + coordinatesCenter[0],
        canvasSize[1] - shiftedCoordinates[1] - (canvasSize[1] - coordinatesCenter[1]),
    ];

    const getMathCoordinates = (canvasCoordinates: Vector): Vector => {
        const shiftedCoordinates = getShiftedCoordinates(canvasCoordinates);

        return [
            shiftedCoordinates[0] / pixelsPerOneMathCoordinate,
            shiftedCoordinates[1] / pixelsPerOneMathCoordinate,
        ];
    };

    const getCanvasCoordinates = (mathCoordinates: Vector): Vector => {
        const shiftedCoordinates = multiplyVectorByNumber(
            mathCoordinates,
            pixelsPerOneMathCoordinate,
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

    return {
        getMathCoordinates,
        getCanvasCoordinates,
        getBoundingCanvasCoordinates,
    };
};

export default useCoordinates;
