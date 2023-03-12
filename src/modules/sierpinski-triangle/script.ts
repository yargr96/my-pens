const createCanvas = (): HTMLCanvasElement => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.className = 'sierpinski-triangle__canvas';
    document.body.appendChild(canvas);

    return canvas;
}

const createRange = (): HTMLInputElement => {
    const range = document.createElement('input');
    range.type = 'range';
    range.min = '3';
    range.max = '10';
    range.className = 'sierpinski-triangle__range';
    document.body.appendChild(range);

    return range;
}

type vector = [number, number];

export default () => {
    const canvas = createCanvas();

    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;

    const context = canvas.getContext('2d');

    const getBaseNodes = (count: number): vector[] => {
        const centerCoordinate: vector = [
            canvas.width / 2,
            canvas.height / 2,
        ];

        const radius: number = Math.min(...centerCoordinate) - 100;
        const angleStep: number = 2 * Math.PI / count;

        const nodes: vector[] = [];

        const angleOffset: number = - Math.PI / 2;

        for (let i: number = 0; i < count; i++) {
            nodes.push([
                radius * Math.cos(angleStep * i + angleOffset) + centerCoordinate[0],
                radius * Math.sin(angleStep * i + angleOffset)  + centerCoordinate[1],
            ]);
        }

        return nodes;
    };

    const DEFAULT_NODES_COUNT: number = 3;

    let baseNodes: vector[] = getBaseNodes(DEFAULT_NODES_COUNT);

    baseNodes.forEach(([x, y]) => {
        context.fillRect(x, y, 1, 1);
    })

    const getMiddlePoint = (a: vector, b: vector): vector => {
        return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    };

    let renderStopFlag: boolean = false;

    const render = (): void => {
        context.fillStyle = '#212529';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#f8f9fa';

        let lastPoint: vector = baseNodes[0];

        renderStopFlag = !renderStopFlag;
        const currentStopFlag: boolean = renderStopFlag;

        const renderFrame = (): void => {
            if (currentStopFlag !== renderStopFlag) {
                return;
            }

            for (let i: number = 0; i < 100; i++) {
                const nextNodeIndex: number = Math.floor(Math.random() * baseNodes.length);
                const nextNode: vector = baseNodes[nextNodeIndex];

                const newPoint: vector = getMiddlePoint(lastPoint, nextNode);
                context.fillRect(newPoint[0], newPoint[1], 2, 2);

                lastPoint = newPoint;
            }

            requestAnimationFrame(renderFrame);
        }

        renderFrame();
    };

    render();

    const range: HTMLInputElement = createRange();
    range.value = String(DEFAULT_NODES_COUNT);

    range.addEventListener('input', function(): void {
        baseNodes = getBaseNodes(Number(this.value));
        render();
    })
};
