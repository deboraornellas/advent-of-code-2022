import { getNextIndexFromArray } from '../utils/helpers';

type RockPos = {
  pos: number[];
  shape: Shapes;
};

export const day17Modified = (directions: string[]) => {
  let pos = [3, 2];
  let shapeIndex = 0;
  let directionIndex = 0;
  let round = 0;
  let moveVertically = false;
  const stoppedRockPositions: RockPos[] = [
    { pos: [-1, -1], shape: Shapes.MINUS },
  ];
  let ans = 0;
  let ansIndex = 0;
  let gotToTheEndOfDirectionsArr = false;
  const map = new Map<string, number>();
  while (!gotToTheEndOfDirectionsArr) {
    const newPos = movePosition(
      moveVertically,
      pos,
      shapes[shapeIndex],
      directions[directionIndex],
      stoppedRockPositions,
    );
    if (!newPos) {
      shapeIndex = getNextIndexFromArray(shapes, shapeIndex);
      const str = JSON.stringify([shapeIndex, directionIndex, pos[1]]);
      pos = [
        getVerticalStartPosition(stoppedRockPositions, shapes[shapeIndex]),
        2,
      ];
      if (map.has(str)) {
        ans = round - (map.get(str) as number);
        ansIndex = map.get(str) as number;
        gotToTheEndOfDirectionsArr = true;
      }
      map.set(str, round);
      round++;
    } else {
      pos = newPos;
      if (!moveVertically) {
        directionIndex = getNextIndexFromArray(directions, directionIndex);
      }
    }
    moveVertically = !moveVertically;
  }
  return [ans, ansIndex];
};

enum Shapes {
  MINUS,
  PLUS,
  L,
  I,
  SQUARE,
}

const shapes = [Shapes.MINUS, Shapes.PLUS, Shapes.L, Shapes.I, Shapes.SQUARE];

const isPositionCoveredByRocks = (
  positionToCheck: number[],
  rockInitialPosition: number[],
  shape: Shapes,
): boolean => {
  switch (shape) {
    case Shapes.MINUS:
      if (minusLogic(positionToCheck, rockInitialPosition)) return true;
      break;
    case Shapes.PLUS:
      if (plusLogic(positionToCheck, rockInitialPosition)) return true;
      break;
    case Shapes.L:
      if (lLogic(positionToCheck, rockInitialPosition)) return true;
      break;
    case Shapes.I:
      if (iLogic(positionToCheck, rockInitialPosition)) return true;
      break;
    case Shapes.SQUARE:
      if (squareLogic(positionToCheck, rockInitialPosition)) return true;
      break;
    default:
      break;
  }
  return false;
};

const isPositionInsideWalls = (
  position: number[],
  rockType: Shapes,
): boolean => {
  if (position[1] < 0) return false;
  switch (rockType) {
    case Shapes.MINUS:
      return position[1] <= 3;
    case Shapes.PLUS:
      return position[1] <= 4;
    case Shapes.L:
      return position[1] <= 4;
    case Shapes.I:
      return position[1] <= 6;
    case Shapes.SQUARE:
      return position[1] <= 5;
    default:
      break;
  }
  return false;
};

const isPositionAboveTheFloor = (
  position: number[],
  shape: Shapes,
): boolean => {
  switch (shape) {
    case Shapes.MINUS:
      return position[0] >= 0;
    case Shapes.PLUS:
      return position[0] >= 2;
    case Shapes.L:
      return position[0] >= 2;
    case Shapes.I:
      return position[0] >= 3;
    case Shapes.SQUARE:
      return position[0] >= 1;
    default:
      break;
  }
  return false;
};

const movePosition = (
  moveVertically: boolean,
  currentPos: number[],
  currShape: Shapes,
  currDirection: string,
  stoppedRockPositions: RockPos[],
) => {
  if (moveVertically) {
    const newPosition = [currentPos[0] - 1, currentPos[1]];
    if (!isPositionAboveTheFloor(newPosition, currShape)) {
      stoppedRockPositions.push({
        pos: currentPos,
        shape: currShape,
      });
      return undefined;
    }

    if (shouldNotMove(newPosition, currShape, stoppedRockPositions)) {
      stoppedRockPositions.push({
        pos: currentPos,
        shape: currShape,
      });
      return undefined;
    }
    return newPosition;
  }
  const newPosition =
    currDirection === '>'
      ? [currentPos[0], currentPos[1] + 1]
      : [currentPos[0], currentPos[1] - 1];
  if (
    isPositionInsideWalls(newPosition, currShape) &&
    !shouldNotMove(newPosition, currShape, stoppedRockPositions)
  ) {
    return newPosition;
  }
  return currentPos;
};

const shouldNotMove = (
  positionToVerify: number[],
  currShape: Shapes,
  stoppedRockPositions: RockPos[],
): boolean => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let pos = [positionToVerify[0] - i, positionToVerify[1] + j];
      // console.log(pos);
      if (isPositionCoveredByRocks(pos, positionToVerify, currShape)) {
        // console.log(`pos ${pos} is covered`);
        for (const rockPos of stoppedRockPositions) {
          if (isPositionCoveredByRocks(pos, rockPos.pos, rockPos.shape)) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

const getVerticalStartPosition = (
  stoppedRockPositions: RockPos[],
  currShape: Shapes,
) => {
  const highestValue = stoppedRockPositions.reduce((acc, curr) => {
    if (curr.pos[0] > acc) return curr.pos[0];
    return acc;
  }, 0);
  switch (currShape) {
    case Shapes.MINUS:
      return highestValue + 4;
    case Shapes.PLUS:
      return highestValue + 6;
    case Shapes.L:
      return highestValue + 6;
    case Shapes.I:
      return highestValue + 7;
    case Shapes.SQUARE:
      return highestValue + 5;
    default:
      break;
  }
  return highestValue + 4;
};

const minusLogic = (position: number[], rockPos: number[]): boolean =>
  [0].includes(position[0] - rockPos[0]) &&
  [0, 1, 2, 3].includes(position[1] - rockPos[1]);

const plusLogic = (position: number[], rockPos: number[]): boolean => {
  if (
    [0, 2].includes(rockPos[0] - position[0]) &&
    [1].includes(position[1] - rockPos[1])
  )
    return true;
  if (
    [1].includes(rockPos[0] - position[0]) &&
    [0, 1, 2].includes(position[1] - rockPos[1])
  )
    return true;
  return false;
};

const lLogic = (position: number[], rockPos: number[]): boolean => {
  if (
    [0, 1].includes(rockPos[0] - position[0]) &&
    [2].includes(position[1] - rockPos[1])
  )
    return true;
  if (
    [2].includes(rockPos[0] - position[0]) &&
    [0, 1, 2].includes(position[1] - rockPos[1])
  )
    return true;
  return false;
};

const iLogic = (position: number[], rockPos: number[]): boolean =>
  [0, 1, 2, 3].includes(rockPos[0] - position[0]) &&
  [0].includes(position[1] - rockPos[1]);

const squareLogic = (position: number[], rockPos: number[]): boolean =>
  [0, 1].includes(rockPos[0] - position[0]) &&
  [0, 1].includes(position[1] - rockPos[1]);
