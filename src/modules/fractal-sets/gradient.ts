type Vector3 = [number, number, number];

const addVector3 = (a: Vector3, b: Vector3): Vector3 => [
    a[0] + b[0],
    a[1] + b[1],
    a[2] + b[2],
];

const subtractVector3 = (a: Vector3, b: Vector3): Vector3 => [
    a[0] - b[0],
    a[1] - b[1],
    a[2] - b[2],
];

const multiplyVector3ByNumber = ([x, y, z]: Vector3, number: number): Vector3 => [
    x * number,
    y * number,
    z * number,
];

const roundVector3 = (vector: Vector3): Vector3 => [
    Math.round(vector[0]),
    Math.round(vector[1]),
    Math.round(vector[2]),
];

export const gradientPoints: Vector3[] = [
    [248, 249, 250],
    [25, 135, 84],
];

const vectorToColor = (vector: Vector3): string => `rgb(${vector[0]}, ${vector[1]}, ${vector[2]})`;

export const getGradient = (points: Vector3[], length: number) => {
    const colorsDifference = subtractVector3(points[1], points[0]);
    const step = multiplyVector3ByNumber(colorsDifference, 1 / length);

    const gradient: Vector3[] = [];

    for (let i = 0; i < length - 1; i += 1) {
        gradient.push(addVector3(
            points[0],
            roundVector3(multiplyVector3ByNumber(step, i)),
        ));
    }

    gradient.push(points[1]);

    return gradient.map((v) => vectorToColor(v));
};
