export const day21part2 = (input: string[]) => {
  const map = new Map<string, () => number>();
  const secondMap = new Map<string, string[]>();
  input.forEach((line) => {
    const split = line.split(': ');
    const isHuman = split[0] === 'humn';
    const isRoot = split[0] === 'root';
    let furtherSplit = split[1].split(' ');
    if (furtherSplit.length === 1) {
      secondMap.set(split[0], []);
      if (isHuman) map.set(split[0], () => 0);
      else map.set(split[0], () => Number(furtherSplit[0]));
    } else {
      if (isRoot) {
        furtherSplit[1] = '=';
        map.set(split[0], () =>
          (map.get(furtherSplit[0])?.() || 0) ===
          (map.get(furtherSplit[2])?.() || 0)
            ? 1
            : 0,
        );
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
      secondMap.set(split[0], furtherSplit);
    }
  });

  let str = 'root';
  const arr = recursive(secondMap, str, []) || [];
  let index = 2;
  let val = map.get(arr[1])?.() as number;

  while (index <= (arr?.length || 0) - 2) {
    const first = arr[index];
    const second = arr[index + 1];
    if (['+', '-', '/', '*'].includes(first)) {
      switch (first) {
        case '+':
          val -= map.get(second)?.() as number;
          break;
        case '-':
          val += map.get(second)?.() as number;
          break;
        case '/':
          val *= map.get(second)?.() as number;
          break;
        case '*':
          val = val / (map.get(second)?.() as number);
          break;
        default:
          break;
      }
    } else {
      switch (second) {
        case '+':
          val -= map.get(first)?.() as number;
          break;
        case '-':
          val = (map.get(first)?.() as number) - val;
          break;
        case '/':
          val = (map.get(first)?.() as number) / val;
          break;
        case '*':
          val = val / (map.get(first)?.() as number);
          break;
        default:
          break;
      }
    }
    index += 2;
  }

  return val;
};

const recursive = (
  secondMap: Map<string, string[]>,
  str: string,
  arr: string[],
): string[] | undefined => {
  if (str === 'humn') return arr;
  if (!secondMap.get(str) || secondMap.get(str)?.length === 0) return undefined;
  return (
    recursive(secondMap, secondMap.get(str)?.[0] || '', [
      ...arr,
      secondMap.get(str)?.[1] || '',
      secondMap.get(str)?.[2] || '',
    ]) ||
    recursive(secondMap, secondMap.get(str)?.[2] || '', [
      ...arr,
      secondMap.get(str)?.[0] || '',
      secondMap.get(str)?.[1] || '',
    ])
  );
};
