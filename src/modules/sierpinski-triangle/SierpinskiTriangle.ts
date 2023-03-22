import Canvas from '@/components/Canvas';
import Range from '@/components/Range';
import {
    Vector,
    addVectors,
    getPointBetween,
    polarToCartesianVector,
    CLOCK_ANGLE_OFFSET,
} from '@/utils/Vector';
import getRenderLoop from '@/utils/useRenderLoop';
import { Module } from '@/modules/moduleTypes';

import colors from '@/styles/colors.module.scss';

const CIRCLE_OFFSET = 100;

const getBasePoints = (count: number, centerCoordinate: Vector): Vector[] => {
    const radius: number = Math.min(...centerCoordinate) - CIRCLE_OFFSET;
    const angleStep: number = (2 * Math.PI) / count;

    const basePoints: Vector[] = [];

    for (let i = 0; i < count; i += 1) {
        const angle = angleStep * i + CLOCK_ANGLE_OFFSET;

        basePoints.push(addVectors(
            polarToCartesianVector(radius, angle),
            centerCoordinate,
        ));
    }

    return basePoints;
};

const SierpinskiTriangle: Module = (mountElement) => {
    const {
        element: canvas,
        setSize,
        append,
        getContext,
    } = Canvas();

    setSize(mountElement);
    append(mountElement);

    let basePointsCount = 3;

    const context: CanvasRenderingContext2D = getContext();

    const centerCoordinate: Vector = [
        canvas.width / 2,
        canvas.height / 2,
    ];

    const render = (): void => {
        context.fillStyle = colors.dark;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = colors.light;

        const basePoints: Vector[] = getBasePoints(basePointsCount, centerCoordinate);

        basePoints.forEach(([x, y]) => {
            context.fillRect(x, y, 1, 1);
        });

        let lastPoint: Vector = basePoints[0];

        const { run } = getRenderLoop(() => {
            for (let i = 0; i < 100; i += 1) {
                const nextPointIndex: number = Math.floor(Math.random() * basePoints.length);
                const nextPoint: Vector = basePoints[nextPointIndex];

                const newPoint: Vector = getPointBetween(lastPoint, nextPoint);
                context.fillRect(newPoint[0], newPoint[1], 2, 2);

                lastPoint = newPoint;
            }
        });

        run();
    };

    render();

    const range: HTMLInputElement = Range();
    range.value = String(basePointsCount);
    mountElement.appendChild(range);

    range.addEventListener('input', ({ target }): void => {
        basePointsCount = Number((target as HTMLInputElement).value);
        render();
    });

    return {};
};

export default SierpinskiTriangle;
