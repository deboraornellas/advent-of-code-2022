export const day18part2 = (input: string[]) => {
  let extraCounter = 0;
  let max = Array(3).fill(0);
  let min = Array(3).fill(Number.MAX_SAFE_INTEGER);
  const set = new Set<string>();
  const parsedInput = input.map((line) =>
    line.split(',').map((x) => Number(x)),
  );

  parsedInput.forEach((line) => {
    set.add(JSON.stringify(line));
    for (let i = 0; i < 3; i++) {
      if (line[i] > max[i]) max[i] = line[i];
      if (line[i] < min[i]) min[i] = line[i];
    }
  });

  parsedInput.forEach((line) => {
    for (let i = 0; i < 3; i++) {
      let lineCopy = [...line];
      lineCopy[i] = line[i] + 1;
      if (
        set.has(JSON.stringify(lineCopy)) ||
        !canPositionReachTheWater(lineCopy, max, min, set, new Set<string>())
      ) {
        extraCounter++;
      }

      lineCopy[i] = line[i] - 1;
      if (
        set.has(JSON.stringify(lineCopy)) ||
        !canPositionReachTheWater(lineCopy, max, min, set, new Set<string>())
      ) {
        extraCounter++;
      }
    }
  });

  return input.length * 6 - extraCounter;
};

const canPositionReachTheWater = (
  pos: number[],
  max: number[],
  min: number[],
  set: Set<string>,
  visited: Set<string>,
) => {
  if (visited.has(JSON.stringify(pos))) return false;
  if (set.has(JSON.stringify(pos))) return false;
  if (
    pos[0] >= max[0] ||
    pos[0] <= min[0] ||
    pos[1] >= max[1] ||
    pos[1] <= min[1] ||
    pos[2] >= max[2] ||
    pos[2] <= min[2]
  )
    return true;
  visited.add(JSON.stringify(pos));
  let ans = false;
  for (let i = 0; i < 3; i++) {
    let posCopy = [...pos];
    posCopy[i] = pos[i] + 1;
    if (canPositionReachTheWater(posCopy, max, min, set, visited)) {
      ans = true;
      break;
    }
    posCopy[i] = pos[i] - 1;
    if (canPositionReachTheWater(posCopy, max, min, set, visited)) {
      ans = true;
      break;
    }
  }
  return ans;
};
