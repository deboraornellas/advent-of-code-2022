export const day7 = (input: string[]) => {
  const SIZE_LIMIT = 100000;
  let counter = 0;
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
  const allDirectories = queue.concat(popped);
  counter += allDirectories.reduce<number>((acc, item) => {
    if (item.size <= SIZE_LIMIT) return acc + item.size;
    return acc;
  }, 0);
  return counter;
};

const isCommand = (line: string) => line.includes('$');
const isDirectory = (line: string) => line.includes('dir');
export const isCdCommand = (line: string) => line.includes('$ cd ');
export const isFile = (line: string) => !isCommand(line) && !isDirectory(line);
export const parseCdAsDirectoryName = (line: string) => {
  return line.split(' ')[2];
};
export const parseFileSize = (line: string) => {
  return Number(line.split(' ')[0]);
};
