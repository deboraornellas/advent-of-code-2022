export const day10part2 = (input: string[]) => {
  const map = fillRegisterMap(input);
  let result = '';
  for (let row = 0; row < 6; row++) {
    for (let pixelIndex = 0; pixelIndex < 40; pixelIndex++) {
      const register = map.get(getCycleFromPixelIndex(pixelIndex, row)) || 0;
      const sprite = getSpriteInterval(register);
      if (sprite.includes(pixelIndex)) {
        result = result.concat('#');
      } else {
        result = result.concat('.');
      }
    }
    result = result.concat('\n');
  }
  return result;
};

const getCycleFromPixelIndex = (pixelIndex: number, row: number) =>
  pixelIndex + 1 + row * 40;

const getSpriteInterval = (register: number) => [
  register - 1,
  register,
  register + 1,
];

export const fillRegisterMap = (input: string[]) => {
  let cycleCounter = 1;
  let register = 1;
  const map = new Map<number, number>();
  input.forEach((line) => {
    const splitLine = line.split(' ');
    cycleCounter++;
    if (splitLine[0] === 'addx') {
      map.set(cycleCounter, register);
      cycleCounter++;
      register += Number(splitLine[1]);
    }
    map.set(cycleCounter, register);
  });
  return map;
};

// ###..####.####.####.#..#.###..####..##..
// #..#.#.......#.#....#.#..#..#.#....#..#.
// #..#.###....#..###..##...###..###..#..#.
// ###..#.....#...#....#.#..#..#.#....####.
// #.#..#....#....#....#.#..#..#.#....#..#.
// #..#.#....####.####.#..#.###..#....#..#.
