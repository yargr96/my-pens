export interface IRenderLoop {
    getRenderFrame: (callback: () => void) => () => void;
    stop: () => void;
}

const useRenderLoop = (): IRenderLoop => {
    let renderFrameSingleton: () => void;

    const getRenderFrame = (callback: () => void) => {
        const renderFrame = () => {
            if (renderFrame !== renderFrameSingleton) {
                return;
            }

            callback();

            requestAnimationFrame(renderFrame);
        };

        renderFrameSingleton = renderFrame;
        return renderFrame;
    };

    const stop = () => {
        renderFrameSingleton = () => {};
    };

    return {
        getRenderFrame,
        stop,
    };
};

export default useRenderLoop;
