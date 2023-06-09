import { IGridSize } from '@/modules/game-of-life/useGrid';
import { addVectors, subtractVector, Vector } from '@/utils/Vector';

interface IFieldMatrixParams {
    gridSize: IGridSize;
}

export type FieldMatrix = Array<boolean[]>;

export interface IFieldMatrix {
    getMatrix: () => FieldMatrix;
    updateGeneration: () => boolean;
    setEmptyMatrix: () => void;
    setPoints: (points: Vector[]) => void;
    putFigureToCenter: (figure: Vector[]) => void;
    randomFill: () => void;
}

const getFieldMatrix = ({ xCellsCount, yCellsCount }: IGridSize): FieldMatrix => {
    const arr = [];

    for (let i = 0; i < xCellsCount; i += 1) {
        arr[i] = [];

        for (let j = 0; j < yCellsCount; j += 1) {
            arr[i][j] = false;
        }
    }

    return arr;
};

const useFieldMatrix = ({
    gridSize: {
        xCellsCount,
        yCellsCount,
    },
}: IFieldMatrixParams): IFieldMatrix => {
    let fieldMatrix: FieldMatrix;

    const setEmptyMatrix = (): void => {
        fieldMatrix = getFieldMatrix({ xCellsCount, yCellsCount });
    };

    setEmptyMatrix();

    const getMatrix = (): FieldMatrix => fieldMatrix;

    const updateGeneration = (): boolean => {
        let isUpdated = false;

        fieldMatrix = fieldMatrix.map(
            (item, x) => item.map((isAlive, y) => {
                let aliveNeighboursCount = 0;

                for (let i = -1; i <= 1; i += 1) {
                    for (let j = -1; j <= 1; j += 1) {
                        if (!(i === 0 && j === 0) && fieldMatrix[x + i]?.[y + j]) {
                            aliveNeighboursCount += 1;
                        }
                    }
                }

                const isAliveInNextGeneration = isAlive
                    ? aliveNeighboursCount === 2 || aliveNeighboursCount === 3
                    : aliveNeighboursCount === 3;

                if (!isUpdated && isAlive !== isAliveInNextGeneration) {
                    isUpdated = true;
                }

                return isAliveInNextGeneration;
            }),
        );

        return isUpdated;
    };

    const setPoints = (points: Vector[]) => {
        points.forEach(([x, y]) => {
            if (fieldMatrix[x]?.[y] === undefined) {
                return;
            }

            fieldMatrix[x][y] = !fieldMatrix[x][y];
        });
    };

    const fieldCenter: Vector = [
        Math.floor(xCellsCount / 2),
        Math.floor(yCellsCount / 2),
    ];

    const putFigureToCenter = (figure: Vector[]): void => {
        const figureBounds = figure.reduce((acc, [x, y]) => ({
            top: y < acc.top ? y : acc.top,
            right: x > acc.right ? x : acc.right,
            bottom: y > acc.bottom ? y : acc.bottom,
            left: x < acc.left ? x : acc.left,
        }), {
            top: Infinity,
            right: -Infinity,
            bottom: -Infinity,
            left: Infinity,
        });

        const figureHalfSize: Vector = [
            Math.floor((figureBounds.right - figureBounds.left) / 2),
            Math.floor((figureBounds.bottom - figureBounds.top) / 2),
        ];

        const normalizedFigure = figure
            .map((cell) => subtractVector(cell, [figureBounds.left, figureBounds.top]));

        const centeredFigure = normalizedFigure
            .map((cell) => addVectors(cell, subtractVector(fieldCenter, figureHalfSize)));

        setPoints(centeredFigure);
    };

    const randomFill = (): void => {
        fieldMatrix = fieldMatrix.map((row) => row.map(() => Math.random() < 0.333));
    };

    return {
        setEmptyMatrix,
        getMatrix,
        updateGeneration,
        setPoints,
        putFigureToCenter,
        randomFill,
    };
};

export default useFieldMatrix;
