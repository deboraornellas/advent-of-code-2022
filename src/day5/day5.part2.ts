import { parseCratesAsArrays, parseMoveCommands } from '../utils/helpers';

export const day5part2 = (input: string[]) => {
  let text = '';
  const crateQueues = parseCratesAsArrays(input[0]);
  const commands = parseMoveCommands(input[1]);
  commands.forEach((command) => {
    const [numberOfCratesToMove, fromCrate, toCrate] = command;
    const toBeMoved = crateQueues[fromCrate - 1].splice(-numberOfCratesToMove);
    crateQueues[toCrate - 1] = crateQueues[toCrate - 1].concat(toBeMoved);
  });
  crateQueues.forEach((queue) => (text = text.concat(queue[queue.length - 1])));
  return text;
};
