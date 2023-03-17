export type Vector = [number, number];

export const addVectors = (a: Vector, b: Vector): Vector => [
    a[0] + b[0],
    a[1] + b[1],
];

export const getPointBetween = (a: Vector, b: Vector): Vector => [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
];

export const polarToCartesianVector = (radius: number, angle: number): Vector => [
    radius * Math.cos(angle),
    radius * Math.sin(angle),
];

export const CLOCK_ANGLE_OFFSET: number = -Math.PI / 2;
