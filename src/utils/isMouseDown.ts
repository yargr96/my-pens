let mouseDown = false;

window.addEventListener('mousedown', () => {
    mouseDown = true;
});

window.addEventListener('mouseup', () => {
    mouseDown = false;
});

const isMouseDown = () => mouseDown;

export default isMouseDown;
