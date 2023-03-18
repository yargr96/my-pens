import styles from './Canvas.module.scss';

interface ICanvas {
    element: HTMLCanvasElement;
    getContext: () => CanvasRenderingContext2D;
    setSize: (mountElement: Element, scale?: number) => void;
    append: (element: Element) => void;
}

export const DEFAULT_CANVAS_SCALE = 2;

const Canvas = (): ICanvas => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.className = styles.canvas;

    const getContext = (): CanvasRenderingContext2D => canvas.getContext('2d');

    const setSize = (mountElement: Element, scale = DEFAULT_CANVAS_SCALE) => {
        const { width, height } = mountElement.getBoundingClientRect();
        canvas.width = width * scale;
        canvas.height = height * scale;
    };

    const append = (element: Element) => {
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
