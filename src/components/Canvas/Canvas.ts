import styles from './Canvas.module.scss';

interface ICanvas {
    element: HTMLCanvasElement;
    getContext: () => CanvasRenderingContext2D;
    setSize: () => void;
    append: (element: HTMLElement) => void;
}

const Canvas = (): ICanvas => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.className = styles.canvas;

    const getContext = (): CanvasRenderingContext2D => canvas.getContext('2d');

    const setSize = () => {
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
    };

    const append = (element: HTMLElement) => {
        element.append(canvas);
    };

    return {
        element: canvas,
        getContext,
        setSize,
        append,
    };
};

export default Canvas;
