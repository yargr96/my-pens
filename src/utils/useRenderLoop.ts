type FramesPerSecond = number | 'auto';

export interface IRenderLoop {
    getRenderFrame: (callback: () => void, framesPerSecond?: FramesPerSecond) => () => void;
    stop: () => void;
    continueLoop: () => void;
    toggle: () => void;
}

const getTimeout = (framesPerSecond: number): number => 1000 / framesPerSecond;

const useRenderLoop = (): IRenderLoop => {
    let renderFrameSingleton: () => void;
    let renderFrameForPause: typeof renderFrameSingleton;

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
        renderFrameForPause = renderFrame;

        return renderFrame;
    };

    const stop = () => {
        renderFrameSingleton = null;
    };

    const continueLoop = (): void => {
        if (renderFrameSingleton) {
            return;
        }

        renderFrameSingleton = renderFrameForPause;
        renderFrameSingleton();
    };

    const toggle = () => {
        if (renderFrameSingleton) {
            stop();
            return;
        }

        continueLoop();
    };

    return {
        getRenderFrame,
        stop,
        continueLoop,
        toggle,
    };
};

export default useRenderLoop;
