export const day9 = (input: string[]) => {
  const uniquePlaces = new Set<string>();
  let headPosition = [0, 0];
  let tailPosition = [0, 0];
  input.forEach((line) => {
    const parsedLine = line.split(' ');
    const direction: Direction = (parsedLine[0] as Direction) || 'D';
    const timesToRepeat = Number(parsedLine[1]);
    for (let i = 0; i < timesToRepeat; i++) {
      headPosition = moveHead(headPosition, direction);
      tailPosition = moveTail(tailPosition, headPosition);
      uniquePlaces.add(JSON.stringify(tailPosition));
    }
  });
  return uniquePlaces.size;
};

export type Direction = 'D' | 'U' | 'R' | 'L';

export const isTailTouchingHead = (tail: number[], head: number[]) =>
  getAbsoluteDistance(tail[0], head[0]) <= 1 &&
  getAbsoluteDistance(tail[1], head[1]) <= 1;

export const getAbsoluteDistance = (a: number, b: number) => Math.abs(a - b);

export const moveHead = (head: number[], direction: Direction) => {
  switch (direction) {
    case 'D':
      return [head[0], head[1] - 1];
    case 'L':
      return [head[0] - 1, head[1]];
    case 'R':
      return [head[0] + 1, head[1]];
    case 'U':
      return [head[0], head[1] + 1];
    default:
      return [head[0], head[1]];
  }
};

export const moveTail = (tail: number[], head: number[]) => {
  if (isTailTouchingHead(tail, head)) return tail;
  return [
    tail[0] + 1 * Math.sign(head[0] - tail[0]),
    tail[1] + 1 * Math.sign(head[1] - tail[1]),
  ];
};
