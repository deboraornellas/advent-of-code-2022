export const day21 = (input: string[]) => {
  const map = new Map<string, () => number>();

  input.forEach((line) => {
    const split = line.split(': ');
    const furtherSplit = split[1].split(' ');
    if (furtherSplit.length === 1) {
      map.set(split[0], () => Number(furtherSplit[0]));
    } else {
      switch (furtherSplit[1]) {
        case '+':
          map.set(
            split[0],
            () =>
              (map.get(furtherSplit[0])?.() || 0) +
              (map.get(furtherSplit[2])?.() || 0),
          );
          break;
        case '-':
          map.set(
            split[0],
            () =>
              (map.get(furtherSplit[0])?.() || 0) -
              (map.get(furtherSplit[2])?.() || 0),
          );
          break;
        case '*':
          map.set(
            split[0],
            () =>
              (map.get(furtherSplit[0])?.() || 0) *
              (map.get(furtherSplit[2])?.() || 0),
          );
          break;
        case '/':
          map.set(
            split[0],
            () =>
              (map.get(furtherSplit[0])?.() || 0) /
              (map.get(furtherSplit[2])?.() || 0),
          );
          break;
        default:
          break;
      }
    }
  });
  return map.get('root')?.();
};
