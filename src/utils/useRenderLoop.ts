export type FramesPerSecond = 'auto' | number;

export interface IRenderLoop {
    run: () => void;
    stop: () => void;
    toggle: () => void;
    setFramesPerSecond: (fps: FramesPerSecond) => void;
}

interface IRenderLoopParams {
    framesPerSecond?: FramesPerSecond;
}

interface IRenderLoopHook {
    getRenderLoop: (callback: () => void, params?: IRenderLoopParams) => IRenderLoop;
}

const getTimeout = (framesPerSecond: number): number => 1000 / framesPerSecond;

export const useRenderLoop = (): IRenderLoopHook => {
    let loopSingleton: () => void;

    const getRenderLoop = (callback: () => void, {
        framesPerSecond = 'auto',
    }: IRenderLoopParams = {}): IRenderLoop => {
        let isRunning = false;
        let timerId: NodeJS.Timeout;

        const getTimeoutFunction = (fps: FramesPerSecond) => (fps === 'auto'
            ? requestAnimationFrame
            : (recursiveCallback: () => void): void => {
                setTimeout(recursiveCallback, getTimeout(fps));
            });

        let timeoutFunction = getTimeoutFunction(framesPerSecond);

        const loop = () => {
            if (loop !== loopSingleton || !isRunning) {
                return;
            }

            callback();

            timeoutFunction(loop);
        };

        loopSingleton = loop;

        const run = () => {
            if (isRunning) {
                return;
            }

            isRunning = true;
            loop();
        };

        const stop = () => {
            isRunning = false;
            clearTimeout(timerId);
        };

        const toggle = () => {
            if (isRunning) {
                stop();
            } else {
                run();
            }
        };

        const setFramesPerSecond = (fps: FramesPerSecond) => {
            timeoutFunction = getTimeoutFunction(fps);
        };

        return {
            run,
            stop,
            toggle,
            setFramesPerSecond,
        };
    };

    return { getRenderLoop };
};

export const { getRenderLoop } = useRenderLoop();

export default getRenderLoop;
