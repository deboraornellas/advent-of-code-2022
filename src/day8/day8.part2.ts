import { Direction } from './day8';

export const day8part2 = (input: string[]) => {
  let counter = 0;
  const matrix = input.map((line) => line.split('').map((x) => Number(x)));
  matrix.forEach((line, ver) => {
    line.forEach((tree, hor) => {
      const score =
        getVisibilityScore(matrix, ver, hor, tree, 'left') *
        getVisibilityScore(matrix, ver, hor, tree, 'right') *
        getVisibilityScore(matrix, ver, hor, tree, 'top') *
        getVisibilityScore(matrix, ver, hor, tree, 'bottom');
      if (counter < score) counter = score;
    });
  });
  return counter;
};

export const getVisibilityScore = (
  matrix: number[][],
  ver: number,
  hor: number,
  value: number,
  direction: Direction,
) => {
  let array: number[] = [];
  switch (direction) {
    case 'bottom':
      array = getBottomArray(matrix, ver, hor);
      break;
    case 'left':
      array = getLeftArray(matrix, ver, hor);
      break;
    case 'right':
      array = getRightArray(matrix, ver, hor);
      break;
    case 'top':
      array = getTopArray(matrix, ver, hor);
      break;
  }
  let i = 0;
  let score = 0;
  while (array[i] < value) {
    score++;
    i++;
  }
  if (i < array.length) score++;
  return score;
};

const getTopArray = (matrix: number[][], ver: number, hor: number) => {
  const topArray = [];
  for (let i = ver - 1; i >= 0; i--) {
    topArray.push(matrix[i][hor]);
  }
  return topArray;
};

const getBottomArray = (matrix: number[][], ver: number, hor: number) => {
  let matrixHeight = matrix.length;
  const bottomArray = [];
  for (let i = ver + 1; i < matrixHeight; i++) {
    bottomArray.push(matrix[i][hor]);
  }
  return bottomArray;
};

const getRightArray = (matrix: number[][], ver: number, hor: number) => {
  if (hor === matrix[ver].length - 1) return [];
  return matrix[ver].slice(hor + 1);
};

const getLeftArray = (matrix: number[][], ver: number, hor: number) => {
  if (hor === 0) return [];
  return matrix[ver].slice(0, hor).reverse();
};
