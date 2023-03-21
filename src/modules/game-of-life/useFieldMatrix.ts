import { IGridSize } from '@/modules/game-of-life/useGrid';
import { Vector } from '@/utils/Vector';

interface IFieldMatrixParams {
    gridSize: IGridSize;
    initialAliveCells?: Vector[];
}

export type FieldMatrix = Array<boolean[]>;

interface IFieldMatrix {
    getMatrix: () => FieldMatrix;
    updateGeneration: () => void;
    fillCell: (cell: Vector) => void;
    setEmptyMatrix: () => void;
    setPoints: (points: Vector[]) => void;
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
    initialAliveCells = [],
}: IFieldMatrixParams): IFieldMatrix => {
    let fieldMatrix: FieldMatrix;

    const setEmptyMatrix = (): void => {
        fieldMatrix = getFieldMatrix({ xCellsCount, yCellsCount });
    };

    setEmptyMatrix();

    const fillCell = (cell: Vector): void => {
        // eslint-disable-next-line no-param-reassign
        fieldMatrix[cell[0]][cell[1]] = true;
    };

    initialAliveCells.forEach((item) => {
        fillCell(item);
    });

    const getMatrix = (): FieldMatrix => fieldMatrix;

    const updateGeneration = (): void => {
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

                return isAlive
                    ? aliveNeighboursCount === 2 || aliveNeighboursCount === 3
                    : aliveNeighboursCount === 3;
            }),
        );
    };

    const setPoints = (points: Vector[]) => {
        points.forEach(([x, y]) => {
            if (fieldMatrix[x][y] === undefined) {
                return;
            }

            fieldMatrix[x][y] = !fieldMatrix[x][y];
        });
    };

    return {
        setEmptyMatrix,
        getMatrix,
        updateGeneration,
        fillCell,
        setPoints,
    };
};

export default useFieldMatrix;
