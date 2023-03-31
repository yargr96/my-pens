import { Vector } from '@/utils/Vector';
import getRenderLoopDefault from '@/utils/useRenderLoop';

interface IterativeRender {
    start: Vector;
    end: Vector;
    step?: number;
    callback: (coordinates: Vector, step: number) => void;
    iterationEndCallback?: () => void;
    isLowQuality?: boolean;
    getRenderLoop?: typeof getRenderLoopDefault;
}

const iterativeRender = ({
    start,
    end,
    step = 16,
    callback,
    iterationEndCallback = () => {},
    isLowQuality = false,
    getRenderLoop = getRenderLoopDefault,
}: IterativeRender) => {
    let currentStep = step;
    let isRecursiveCall = false;

    const renderLoop = getRenderLoop(() => {
        for (let x = start[0], i = 0; x < end[0]; x += currentStep, i += 1) {
            const isEvenColumn = i % 2 === 0;

            const stepY = isEvenColumn && isRecursiveCall ? currentStep * 2 : currentStep;
            const startY = isEvenColumn && isRecursiveCall
                ? start[1] + currentStep
                : start[1];

            for (let y = startY; y < end[1]; y += stepY) {
                callback([x, y], currentStep);
            }
        }

        iterationEndCallback();

        if (currentStep <= 1 || isLowQuality) {
            renderLoop.stop();
        }

        currentStep /= 2;
        isRecursiveCall = true;
    });

    renderLoop.run();
};

export default iterativeRender;
