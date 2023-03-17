import Canvas from '@/components/Canvas';

import colors from '@/styles/colors.module.scss';

const Gravity = () => {
    const {
        element: canvas,
        setSize,
        append,
        getContext,
    } = Canvas();

    setSize();
    append(document.body);

    const context: CanvasRenderingContext2D = getContext();

    const render = () => {
        context.fillStyle = colors.dark;
        context.fillRect(0, 0, canvas.width, canvas.height);
    };

    render();
};

export default Gravity;
