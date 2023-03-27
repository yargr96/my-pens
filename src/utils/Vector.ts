export type Vector = [x: number, y: number];

export const addVectors = (a: Vector, b: Vector): Vector => [
    a[0] + b[0],
    a[1] + b[1],
];

export const subtractVector = (a: Vector, b: Vector): Vector => [
    a[0] - b[0],
    a[1] - b[1],
];

export const multiplyVectorByNumber = ([x, y]: Vector, number: number): Vector => [
    x * number,
    y * number,
];

export const getPointBetween = (a: Vector, b: Vector): Vector => [
    (a[0] + b[0]) / 2,
    (a[1] + b[1]) / 2,
];

export const polarToCartesianVector = (radius: number, angle: number): Vector => [
    radius * Math.cos(angle),
    radius * Math.sin(angle),
];

export const getVectorAngle = ([x, y]: Vector): number => Math.atan2(y, x);

export const areSimilarVectors = (a: Vector, b: Vector): boolean => a[0] === b[0] && a[1] === b[1];

export const CLOCK_ANGLE_OFFSET: number = -Math.PI / 2;
