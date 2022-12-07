import {
  isCdCommand,
  parseCdAsDirectoryName,
  isFile,
  parseFileSize,
} from './day7';

export const day7part2 = (input: string[]) => {
  const TOTAL_DISK_SPACE = 70000000;
  const MIN_SPACE_NEEDED = 30000000;
  let totalUsedSpace = 0;
  type Directory = {
    name: string;
    size: number;
  };
  const queue: Directory[] = [];
  const popped: Directory[] = [];
  input.forEach((line) => {
    if (isCdCommand(line)) {
      const dirName = parseCdAsDirectoryName(line);
      if (dirName === '..') {
        const pop = queue.pop();
        pop && popped.push(pop);
      } else queue.push({ name: parseCdAsDirectoryName(line), size: 0 });
    }
    if (isFile(line)) {
      const size = parseFileSize(line);
      queue.map((item) => (item.size += size));
    }
  });
  totalUsedSpace = queue[0].size;
  const neededSpace = MIN_SPACE_NEEDED - (TOTAL_DISK_SPACE - totalUsedSpace);
  const allDirectories = queue.concat(popped);
  let minSizeToDelete = totalUsedSpace;
  allDirectories.map((item) => {
    if (item.size >= neededSpace && item.size < minSizeToDelete)
      minSizeToDelete = item.size;
  });
  return minSizeToDelete;
};
