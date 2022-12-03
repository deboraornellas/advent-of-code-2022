import { getPriority } from './day3';

export const day3part2 = (input: string[]) => {
  const thirdTimeIsTheCharm: string[] = [];
  for (let i = 0; i < input.length / 3; i++) {
    const firstSet = new Set();
    const secondSet = new Set();
    let repeated: string = '';
    input[3 * i].split('').forEach((char) => firstSet.add(char));
    input[3 * i + 1].split('').forEach((char) => {
      if (firstSet.has(char)) {
        secondSet.add(char);
      }
    });
    input[3 * i + 2].split('').forEach((char) => {
      if (secondSet.has(char)) {
        repeated = char;
      }
    });
    thirdTimeIsTheCharm.push(repeated);
  }
  return thirdTimeIsTheCharm.reduce((acc, item) => acc + getPriority(item), 0);
};
