import { Vector } from '@/utils/Vector';

interface IterativeRender {
    start: Vector;
    end: Vector;
    step?: number;
    callback: (coordinates: Vector, step: number) => void;
}

let timerId: NodeJS.Timer;

const iterativeRender = ({
    start,
    end,
    step = 8,
    callback,
}: IterativeRender) => {
    for (let i = start[0]; i < end[0]; i += step) {
        for (let j = start[1]; j < end[1]; j += step) {
            callback([i, j], step);
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
        });
    }, 100);
};

export default iterativeRender;
