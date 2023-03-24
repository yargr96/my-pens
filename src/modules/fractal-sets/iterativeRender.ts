import { Vector } from '@/utils/Vector';

interface IterativeRender {
    start: Vector;
    end: Vector;
    step?: number;
    callback: (coordinates: Vector, step: number) => void;
    isRecursiveCall?: boolean;
}

let timerId: NodeJS.Timer;

const iterativeRender = ({
    start,
    end,
    step = 8,
    callback,
    isRecursiveCall = false,
}: IterativeRender) => {
    for (let x = start[0], i = 0; x < end[0]; x += step, i += 1) {
        const isEvenColumn = i % 2 === 0;

        const stepY = isEvenColumn && isRecursiveCall ? step * 2 : step;
        const startY = isEvenColumn && isRecursiveCall
            ? start[1] + step
            : start[1];

        for (let y = startY; y < end[1]; y += stepY) {
            callback([x, y], step);
        }
    }

    if (step <= 1) {
        return;
    }

    clearTimeout(timerId);
    timerId = setTimeout(() => {
        iterativeRender({
            start,
            end,
            step: step / 2,
            callback,
            isRecursiveCall: true,
        });
    }, 0);
};

export default iterativeRender;
