const createCanvas = () => {
    const canvas = document.createElement('canvas');
    canvas.className = 'sierpinski-triangle__canvas'
    document.body.appendChild(canvas);
    return canvas;
}

const createRange = () => {
    const range = document.createElement('input');
    range.type = 'range';
    range.min = '3';
    range.max = '10';
    range.className = 'sierpinski-triangle__range';
    document.body.appendChild(range);

    return range;
}

export default () => {
    const canvas = createCanvas();

    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;

    const context = canvas.getContext('2d');

    const getBaseNodes = (count) => {
        const centerCoordinate = [
            canvas.width / 2,
            canvas.height / 2,
        ];

        const radius = Math.min(...centerCoordinate) - 100;
        const angleStep = 2 * Math.PI / count;

        const nodes = [];

        const angleOffset = - Math.PI / 2;

        for (let i = 0; i < count; i++) {
            nodes.push([
                radius * Math.cos(angleStep * i + angleOffset) + centerCoordinate[0],
                radius * Math.sin(angleStep * i + angleOffset)  + centerCoordinate[1],
            ]);
        }

        return nodes;
    };

    const DEFAULT_NODES_COUNT = 3;

    let baseNodes = getBaseNodes(DEFAULT_NODES_COUNT);

    baseNodes.forEach(([x, y]) => {
        context.fillRect(x, y, 1, 1);
    })

    const getMiddlePoint = (a, b) => {
        return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    };

    let renderStopFlag = false;

    const render = () => {
        context.fillStyle = '#212529';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#f8f9fa';

        let lastPoint = baseNodes[0];

        renderStopFlag = !renderStopFlag;
        const currentStopFlag = renderStopFlag;

        const renderFrame = () => {
            if (currentStopFlag !== renderStopFlag) {
                return;
            }

            for (let i = 0; i < 100; i++) {
                const nextNodeIndex = Math.floor(Math.random() * baseNodes.length);
                const nextNode = baseNodes[nextNodeIndex];

                const newPoint = getMiddlePoint(lastPoint, nextNode);
                context.fillRect(newPoint[0], newPoint[1], 2, 2);

                lastPoint = newPoint;
            }

            requestAnimationFrame(renderFrame);
        }

        renderFrame();
    };

    render();

    const range = createRange();
    range.value = DEFAULT_NODES_COUNT;
    range.addEventListener('input', ({ target: { value }}) => {
        baseNodes = getBaseNodes(value);
        render();
    })
};
