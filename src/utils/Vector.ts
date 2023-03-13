export type Vector = [number, number];

export const getPointBetween = (a: Vector, b: Vector): Vector => [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
];

export const CLOCK_ANGLE_OFFSET: number = -Math.PI / 2;
