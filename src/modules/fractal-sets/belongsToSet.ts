import { addVectors, Vector } from '@/utils/Vector';

export interface IBelongsToFractalSet {
    value: boolean;
    stepsCount?: number;
}

const getComplexNumberSquare = ([x, y]: Vector): Vector => [
    x ** 2 - y ** 2,
    2 * x * y,
];

export const ITERATIONS_COUNT = 100;
const C: Vector = [0.14, 0.6];

const belongsToSet = (z0: Vector, c: Vector): IBelongsToFractalSet => {
    let zLast: Vector = [...z0];

    for (let i = 0; i < ITERATIONS_COUNT; i += 1) {
        const zNew = (
            addVectors(
                getComplexNumberSquare(zLast),
                c,
            ));

        if (zNew[0] ** 2 + zNew[1] ** 2 > 4) {
            return {
                value: false,
                stepsCount: i,
            };
        }

        zLast = zNew;
    }

    return { value: true };
};

export const belongsToJuliaSet = (z: Vector): IBelongsToFractalSet => belongsToSet(z, C);

export const belongsToMandelbrotSet = (c: Vector): IBelongsToFractalSet => belongsToSet([0, 0], c);
