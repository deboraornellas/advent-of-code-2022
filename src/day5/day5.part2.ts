import { parseCratesAsArrays, parseMoveCommands } from './day5';

export const day5part2 = (input: string[]) => {
  let text = '';
  const crateQueues = parseCratesAsArrays(input[0]);
  const commands = parseMoveCommands(input[1]);
  commands.forEach((command) => {
    const numberOfCratesToMove = Number(command[0]);
    const fromCrate = Number(command[1]);
    const toCrate = Number(command[2]);
    const toBeMoved = crateQueues[fromCrate - 1].splice(-numberOfCratesToMove);
    crateQueues[toCrate - 1] = crateQueues[toCrate - 1].concat(toBeMoved);
  });
  crateQueues.forEach((queue) => (text = text.concat(queue[queue.length - 1])));
  return text;
};
