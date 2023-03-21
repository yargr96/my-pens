interface ICoordinates {
    offsetX: number;
    offsetY: number;
}

const getTouchCoordinates = (e: MouseEvent & TouchEvent): ICoordinates => ({
    offsetX: e.offsetX ?? e.touches[0].clientX,
    offsetY: e.offsetY ?? e.touches[0].clientY,
});

export default getTouchCoordinates;
