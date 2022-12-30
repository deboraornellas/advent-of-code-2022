export const findStartOfMessageMarker = (
  input: string[],
  numberOfCharacters: number,
) => {
  let unique: string[] = [];
  let counter = 0;
  for (let i = 0; i < input.length; i++) {
    counter++;
    while (unique.includes(input[i])) {
      unique.shift();
    }
    unique.push(input[i]);

    if (unique.length === numberOfCharacters) {
      return counter;
    }
  }
  return counter;
};

export const parseCratesAsArrays = (crateInput: string) => {
  const split = crateInput.split('\n');
  const lastRow = split.pop() || '';

  const numberOfCrates = lastRow.trim().split('  ').length;

  let matrix: string[][] = [[]];
  for (let i = numberOfCrates - 1; i >= 0; i--) {
    if (!split[i]) continue;
    const line = split[i].replace(/\x20{4}/g, ' _').replace(/\x20{1}/g, '');
    const splitLine = line.replace(/\[/g, '').replace(/\]/g, '').split('');
    splitLine.forEach((crate, i) => {
      if (crate !== '_') {
        if (matrix[i]) {
          matrix[i].push(crate);
        } else matrix[i] = [crate];
      }
    });
  }
  return matrix;
};

export const parseMoveCommands = (commandInput: string) => {
  const commands: number[][] = [];
  commandInput.split('\n').forEach((command) => {
    commands.push(
      command
        .replace('move ', '')
        .replace('from ', '')
        .replace('to ', '')
        .split(' ')
        .map((x) => Number(x)),
    );
  });
  return commands;
};

export const compareArrays = (
  arr1: number[] | string[],
  arr2: number[] | string[],
) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};

export const findAllArrayCombinations = (
  arr: string[],
  index: number,
  out: string[][],
  onlyHalf?: boolean,
): string[][] => {
  const n = arr.length;
  if (index >= n) return out;
  const newOut = [];

  if (out.length === 0) {
    const item1: string[] = [];
    const item2 = [arr[index]];
    item1.length <= (onlyHalf ? n / 2 : n) &&
      newOut.push(...findAllArrayCombinations(arr, index + 1, [item1]));
    item2.length <= (onlyHalf ? n / 2 : n) &&
      newOut.push(...findAllArrayCombinations(arr, index + 1, [item2]));
  }

  for (let item of out) {
    const item1 = [...item];
    const item2 = [...item1, arr[index]];
    item1.length <= n / 2 &&
      newOut.push(...findAllArrayCombinations(arr, index + 1, [item]));
    item2.length <= n / 2 &&
      newOut.push(...findAllArrayCombinations(arr, index + 1, [item2]));
  }

  return newOut;
};

export const getNextFromArray = <T>(arr: T[], index: number): T => {
  if (index + 1 >= arr.length) {
    return arr[0];
  }
  return arr[index + 1];
};

export const getNextIndexFromArray = <T>(arr: T[], index: number): number => {
  if (index + 1 >= arr.length) {
    return 0;
  }
  return index + 1;
};

export const getPastIndexFromArray = <T>(arr: T[], index: number): number => {
  if (index - 1 < 0) {
    return arr.length - 1;
  }
  return index - 1;
};
