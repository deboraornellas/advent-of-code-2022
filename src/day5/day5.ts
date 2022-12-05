export const day5 = (input: string[]) => {
  let text = '';
  const crateQueues = parseCratesAsArrays(input[0]);
  const commands = parseMoveCommands(input[1]);
  commands.forEach((command) => {
    const numberOfCratesToMove = Number(command[0]);
    const fromCrate = Number(command[1]);
    const toCrate = Number(command[2]);
    for (let i = 0; i < numberOfCratesToMove; i++) {
      const toBeMoved = crateQueues[fromCrate - 1].pop() || '';
      crateQueues[toCrate - 1].push(toBeMoved);
    }
  });
  crateQueues.forEach((queue) => (text = text.concat(queue[queue.length - 1])));
  return text;
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
  const commands: string[][] = [];
  commandInput.split('\n').forEach((command) => {
    commands.push(
      command
        .replace('move ', '')
        .replace('from ', '')
        .replace('to ', '')
        .split(' '),
    );
  });
  return commands;
};
