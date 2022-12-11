import { Direction, isTailTouchingHead, moveHead, moveTail } from './day9';

export const day9part2 = (input: string[]) => {
  const uniquePlaces = new Set<string>();
  let positions: number[][] = new Array(10).fill([0, 0]);
  input.forEach((line) => {
    const parsedLine = line.split(' ');
    const direction: Direction = (parsedLine[0] as Direction) || 'D';
    const timesToRepeat = Number(parsedLine[1]);
    for (let i = 0; i < timesToRepeat; i++) {
      positions[0] = moveHead(positions[0], direction);
      for (let j = 1; j < 10; j++) {
        positions[j] = moveTail(positions[j], positions[j - 1]);
      }
      uniquePlaces.add(JSON.stringify(positions[9]));
    }
  });
  return uniquePlaces.size;
};
