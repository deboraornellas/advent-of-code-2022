export const day18 = (input: string[]) => {
  let counter = 0;
  const set = new Set<string>();
  const parsedInput = input.map((line) =>
    line.split(',').map((x) => Number(x)),
  );

  parsedInput.forEach((line) => {
    set.add(JSON.stringify(line));
  });
  parsedInput.forEach((line) => {
    for (let i = 0; i < 3; i++) {
      let lineCopy = [...line];
      lineCopy[i] = line[i] + 1;
      if (set.has(JSON.stringify(lineCopy))) {
        counter++;
      }
      lineCopy[i] = line[i] - 1;
      if (set.has(JSON.stringify(lineCopy))) {
        counter++;
      }
    }
  });
  return input.length * 6 - counter;
};
