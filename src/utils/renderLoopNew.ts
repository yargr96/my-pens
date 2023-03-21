interface IRenderLoop {
    run: () => void;
    stop: () => void;
    toggle: () => void;
}

export const useRenderLoop = () => {
    const getRenderLoop = (callback: () => void): IRenderLoop => {
        let isRunning = false;
        let timerId: NodeJS.Timeout;

        const loop = () => {
            if (!isRunning) {
                return;
            }

            callback();

            timerId = setTimeout(() => {
                loop();
            }, 500);
        };

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

        return {
            run,
            stop,
            toggle,
        };
    };

    return { getRenderLoop };
};

export const { getRenderLoop } = useRenderLoop();

(() => {
    const { run, stop, toggle } = getRenderLoop(() => {
        console.log(1);
    });

    run();

    document.addEventListener('click', () => {
        stop();
    });
})();

export default getRenderLoop;
