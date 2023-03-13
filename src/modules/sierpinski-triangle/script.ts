import styles from '@/modules/sierpinski-triangle/style.module.scss';
import colors from '@/styles/colors.module.scss';

import Canvas from '@/components/Canvas';

const createRange = (): HTMLInputElement => {
    const range = document.createElement('input');
    range.type = 'range';
    range.min = '3';
    range.max = '10';
    range.className = styles.range;
    document.body.appendChild(range);

    return range;
};

type Vector = [number, number];

export default () => {
    const canvas = Canvas();
    document.body.appendChild(canvas);

    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;

    const context = canvas.getContext('2d');

    const getBaseNodes = (count: number): Vector[] => {
        const centerCoordinate: Vector = [
            canvas.width / 2,
            canvas.height / 2,
        ];

        const radius: number = Math.min(...centerCoordinate) - 100;
        const angleStep: number = (2 * Math.PI) / count;

        const nodes: Vector[] = [];

        const angleOffset: number = -Math.PI / 2;

        for (let i = 0; i < count; i += 1) {
            nodes.push([
                radius * Math.cos(angleStep * i + angleOffset) + centerCoordinate[0],
                radius * Math.sin(angleStep * i + angleOffset) + centerCoordinate[1],
            ]);
        }

        return nodes;
    };

    const DEFAULT_NODES_COUNT = 3;

    let baseNodes: Vector[] = getBaseNodes(DEFAULT_NODES_COUNT);

    baseNodes.forEach(([x, y]) => {
        context.fillRect(x, y, 1, 1);
    });

    const getMiddlePoint = (a: Vector, b: Vector): Vector => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

    let renderStopFlag = false;

    const render = (): void => {
        context.fillStyle = colors.dark;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = colors.light;

        let lastPoint: Vector = baseNodes[0];

        renderStopFlag = !renderStopFlag;
        const currentStopFlag: boolean = renderStopFlag;

        const renderFrame = (): void => {
            if (currentStopFlag !== renderStopFlag) {
                return;
            }

            for (let i = 0; i < 100; i += 1) {
                const nextNodeIndex: number = Math.floor(Math.random() * baseNodes.length);
                const nextNode: Vector = baseNodes[nextNodeIndex];

                const newPoint: Vector = getMiddlePoint(lastPoint, nextNode);
                context.fillRect(newPoint[0], newPoint[1], 2, 2);

                lastPoint = newPoint;
            }

            requestAnimationFrame(renderFrame);
        };

        renderFrame();
    };

    render();

    const range: HTMLInputElement = createRange();
    range.value = String(DEFAULT_NODES_COUNT);

    range.addEventListener('input', ({ target }): void => {
        baseNodes = getBaseNodes(Number((target as HTMLInputElement).value));
        render();
    });
};
