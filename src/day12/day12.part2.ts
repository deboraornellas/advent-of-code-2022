export const day12part2 = (input: string[]) => {
  const charMatrix = input.map((str) => str.split(''));

  let initialPos = findCharIndexesInMatrix(charMatrix, 'S')[0];
  charMatrix[initialPos[0]][initialPos[1]] = 'a';
  let goalPos = findCharIndexesInMatrix(charMatrix, 'E')[0];
  const aPos = findCharIndexesInMatrix(charMatrix, 'a');
  let answer = Number.MAX_SAFE_INTEGER;

  for (let pos of aPos) {
    const numMatrix = input.map((str) =>
      str.split('').map((x) => Number.MAX_SAFE_INTEGER),
    );
    numMatrix[pos[0]][pos[1]] = 0;
    let allVisited = [];
    let queue = [JSON.stringify(pos)];

    while (queue.length !== 0) {
      pos = JSON.parse(queue.pop() || JSON.stringify(initialPos));
      allVisited.push(JSON.stringify(pos));
      const neighbors = possibleNextPositions(charMatrix, pos);

      for (const neighbor of neighbors) {
        if (
          numMatrix[neighbor[0]][neighbor[1]] >
          numMatrix[pos[0]][pos[1]] + 1
        ) {
          numMatrix[neighbor[0]][neighbor[1]] = numMatrix[pos[0]][pos[1]] + 1;
        }
        if (
          !allVisited.includes(JSON.stringify(neighbor)) &&
          !queue.includes(JSON.stringify(neighbor))
        ) {
          queue.push(JSON.stringify(neighbor));
        }
      }
      queue.sort(
        (b, a) =>
          numMatrix[JSON.parse(a)[0]][JSON.parse(a)[1]] -
          numMatrix[JSON.parse(b)[0]][JSON.parse(b)[1]],
      );
    }
    if (answer > numMatrix[goalPos[0]][goalPos[1]]) {
      answer = numMatrix[goalPos[0]][goalPos[1]];
    }
  }
  return answer;
};

const findCharIndexesInMatrix = (
  charMatrix: string[][],
  charToLocate: string,
) => {
  let pos: number[][] = [];

  for (let i = 0; i < charMatrix.length; i++) {
    for (let j = 0; j < charMatrix[0].length; j++) {
      if (charMatrix[i][j] === charToLocate) {
        pos.push([i, j]);
      }
    }
  }
  return pos;
};

const possibleNextPositions = (matrix: string[][], currPosition: number[]) => {
  const positions: number[][] = [];
  const possibleArray = possibleNextPositionsArray(currPosition);
  const currChar = matrix[currPosition[0]]?.[currPosition[1]];
  for (const pos of possibleArray) {
    if (
      matrix[pos[0]]?.[pos[1]] &&
      isOneStepHigherOrLower(currChar, matrix[pos[0]]?.[pos[1]])
    ) {
      positions.push(pos);
    }
  }
  return positions;
};

const isOneStepHigherOrLower = (char1: string, char2: string) => {
  let c1 = char1 === 'E' ? 'z' : char1;
  let c2 = char2 === 'E' ? 'z' : char2;
  return c1.charCodeAt(0) - c2.charCodeAt(0) >= -1;
};

const possibleNextPositionsArray = (currPosition: number[]) => [
  [currPosition[0] - 1, currPosition[1]],
  [currPosition[0] + 1, currPosition[1]],
  [currPosition[0], currPosition[1] + 1],
  [currPosition[0], currPosition[1] - 1],
];
