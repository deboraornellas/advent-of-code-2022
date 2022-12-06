import { parseCratesAsArrays, parseMoveCommands } from '../utils/helpers';

export const day5 = (input: string[]) => {
  let text = '';
  const crateQueues = parseCratesAsArrays(input[0]);
  const commands = parseMoveCommands(input[1]);
  commands.forEach((command) => {
    const [numberOfCratesToMove, fromCrate, toCrate] = command;
    for (let i = 0; i < numberOfCratesToMove; i++) {
      const toBeMoved = crateQueues[fromCrate - 1].pop() || '';
      crateQueues[toCrate - 1].push(toBeMoved);
    }
  });
  crateQueues.forEach((queue) => (text = text.concat(queue[queue.length - 1])));
  return text;
};
