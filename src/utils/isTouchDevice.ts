const isTouchDevice = (): boolean => (('ontouchstart' in window)
    || (navigator.maxTouchPoints > 0));

export default isTouchDevice;
