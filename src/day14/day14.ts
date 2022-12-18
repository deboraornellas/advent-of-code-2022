export const day14 = (input: string[]) => {
  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxX = 0;
  let maxY = 0;

  let rockLines: number[][][] = [];
  input.forEach((line) => {
    const moves = line.split(' -> ');
    const positions = moves.map((pos) =>
      pos.split(',').map((c, i) => {
        let numC = Number(c);
        if (i === 0) {
          if (numC > maxX) maxX = numC;
          if (numC < minX) minX = numC;
        } else if (i === 1) {
          if (numC > maxY) maxY = numC;
          if (numC < minY) minY = numC;
        }
        return numC;
      }),
    );
    rockLines.push(positions);
  });
  let matrix: string[][] = Array(maxY + 1).fill([]);
  matrix = matrix.map((_) => Array(maxX - minX + 1).fill('.'));
  rockLines = rockLines.map((lines) =>
    lines.map((line) => [line[1], line[0] - minX]).reverse(),
  );
  for (const line of rockLines) {
    line.forEach((position, i) => {
      if (line[i + 1]) {
        const x1 = Math.min(line[i][0], line[i + 1][0]);
        const x2 = Math.max(line[i][0], line[i + 1][0]);
        const y1 = Math.min(line[i][1], line[i + 1][1]);
        const y2 = Math.max(line[i][1], line[i + 1][1]);
        for (let j = x1; j <= x2; j++) {
          matrix[j][y1] = '#';
        }
        for (let j = y1; j <= y2; j++) {
          matrix[x1][j] = '#';
        }
      }
    });
  }
  const sandInitialPos = [0, 500 - minX];
  let counter = 0;
  while (
    moveSand(matrix, sandInitialPos)[0] >= 0 &&
    moveSand(matrix, sandInitialPos)[1] >= 0
  ) {
    const pos = moveSand(matrix, sandInitialPos);
    matrix[pos[0]][pos[1]] = 'o';
    counter++;
  }
  return counter;
};

export const moveSand = (
  matrix: string[][],
  initialPos: number[],
): number[] => {
  const x = initialPos[0];
  const y = initialPos[1];
  if (
    !matrix[x + 1]?.[y] ||
    !matrix[x + 1]?.[y + 1] ||
    !matrix[x + 1]?.[y - 1]
  ) {
    return [];
  }
  if (
    matrix[x + 1][y] !== '.' &&
    matrix[x + 1][y + 1] !== '.' &&
    matrix[x + 1][y - 1] !== '.'
  ) {
    return initialPos;
  } else if (matrix[x + 1][y] === '.') {
    return moveSand(matrix, [x + 1, y]);
  } else if (matrix[x + 1][y - 1] === '.') {
    return moveSand(matrix, [x + 1, y - 1]);
  } else if (matrix[x + 1][y + 1] === '.') {
    return moveSand(matrix, [x + 1, y + 1]);
  }
  return [];
};
