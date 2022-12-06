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
