import styles from './Canvas.module.scss';

const Canvas = (): HTMLCanvasElement => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.className = styles.canvas;

    return canvas;
};

export default Canvas;
