type FramesPerSecond = number | 'auto';

export interface IRenderLoop {
    getRenderFrame: (callback: () => void, framesPerSecond?: FramesPerSecond) => () => void;
    stop: () => void;
}

const getTimeout = (framesPerSecond: number): number => 1000 / framesPerSecond;

const useRenderLoop = (): IRenderLoop => {
    let renderFrameSingleton: () => void;

    const getRenderFrame = (callback: () => void, framesPerSecond: FramesPerSecond = 'auto') => {
        const timeoutFunction = framesPerSecond === 'auto'
            ? requestAnimationFrame
            : (recursiveFunction: () => void): void => {
                setTimeout(
                    recursiveFunction,
                    getTimeout(framesPerSecond),
                );
            };

        const renderFrame = () => {
            if (renderFrame !== renderFrameSingleton) {
                return;
            }

            callback();

            timeoutFunction(renderFrame);
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
