import { isRightOrder } from './day13';

export const day13part2 = (input: string[]) => {
  let allLines: any[] = [[[2]], [[6]]];
  input.forEach((pair, i) => {
    const parsedPair = pair.split('\n').map((x) => {
      return JSON.parse(x);
    });
    allLines = allLines.concat(parsedPair);
  });
  allLines.sort((a, b) => (isRightOrder(b, a, 0) ? -1 : 1));
  allLines.reverse();
  const index1 = allLines.findIndex(
    (a) => JSON.stringify(a) === JSON.stringify([[2]]),
  );
  const index2 = allLines.findIndex(
    (a) => JSON.stringify(a) === JSON.stringify([[6]]),
  );
  return (index1 + 1) * (index2 + 1);
};
