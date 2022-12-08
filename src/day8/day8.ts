export type Direction = 'top' | 'bottom' | 'left' | 'right';

export const day8 = (input: string[]) => {
  let counter = 0;
  const matrix = input.map((line) => line.split('').map((x) => Number(x)));
  matrix.forEach((line, ver) => {
    line.forEach((tree, hor) => {
      const visible =
        isVisible(matrix, ver, hor, tree, 'left') ||
        isVisible(matrix, ver, hor, tree, 'right') ||
        isVisible(matrix, ver, hor, tree, 'top') ||
        isVisible(matrix, ver, hor, tree, 'bottom');
      if (visible) counter++;
    });
  });
  return counter;
};

export const isVisible = (
  matrix: number[][],
  ver: number,
  hor: number,
  value: number,
  direction: Direction,
) => {
  let sortedArray: number[] = [];
  switch (direction) {
    case 'bottom':
      sortedArray = getSortedBottomArray(matrix, ver, hor);
      break;
    case 'left':
      sortedArray = getSortedLeftArray(matrix, ver, hor);
      break;
    case 'right':
      sortedArray = getSortedRightArray(matrix, ver, hor);
      break;
    case 'top':
      sortedArray = getSortedTopArray(matrix, ver, hor);
      break;
  }
  if (sortedArray.length === 0 || value > sortedArray[0]) return true;
  return false;
};

const getSortedTopArray = (matrix: number[][], ver: number, hor: number) => {
  const topArray = [];
  for (let i = 0; i < ver; i++) {
    topArray.push(matrix[i][hor]);
  }
  return topArray.sort((a, b) => b - a);
};

const getSortedBottomArray = (matrix: number[][], ver: number, hor: number) => {
  let matrixHeight = matrix.length;
  const bottomArray = [];
  for (let i = ver + 1; i < matrixHeight; i++) {
    bottomArray.push(matrix[i][hor]);
  }
  return bottomArray.sort((a, b) => b - a);
};

const getSortedRightArray = (matrix: number[][], ver: number, hor: number) => {
  if (hor === matrix[ver].length - 1) return [];
  return matrix[ver].slice(hor + 1).sort((a, b) => b - a);
};

const getSortedLeftArray = (matrix: number[][], ver: number, hor: number) => {
  if (hor === 0) return [];
  return matrix[ver].slice(0, hor).sort((a, b) => b - a);
};
