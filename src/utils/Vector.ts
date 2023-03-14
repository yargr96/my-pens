export type Vector = [number, number];

export const addVectors = (a: Vector, b: Vector): Vector => [
    a[0] + b[0],
    a[1] + b[1],
];

export const getPointBetween = (a: Vector, b: Vector): Vector => [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
];

export const getVectorFromAngle = (angle: number, magnitude: number): Vector => [
    magnitude * Math.cos(angle),
    magnitude * Math.sin(angle),
];

export const CLOCK_ANGLE_OFFSET: number = -Math.PI / 2;
