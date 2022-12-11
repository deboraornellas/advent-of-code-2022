export const day10 = (input: string[]) => {
  const map = fillSignalStrengthMap(input);
  return getSumFromMapEntries(map, [20, 60, 100, 140, 180, 220]);
};

export const fillSignalStrengthMap = (input: string[]) => {
  let cycleCounter = 1;
  let register = 1;
  const map = new Map<number, number>();
  input.forEach((line) => {
    const splitLine = line.split(' ');
    cycleCounter++;
    if (splitLine[0] === 'addx') {
      map.set(cycleCounter, register * cycleCounter);
      cycleCounter++;
      register += Number(splitLine[1]);
    }
    map.set(cycleCounter, register * cycleCounter);
  });
  return map;
};
const getSumFromMapEntries = (map: Map<number, number>, entries: number[]) => {
  let sum = 0;
  entries.forEach((entry) => {
    sum += map.get(entry) ?? 0;
  });

  return sum;
};
