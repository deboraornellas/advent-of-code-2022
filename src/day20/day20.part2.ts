export const day20part2 = (input: number[]) => {
  const obj = input.map((v, i) => ({
    val: 811589153 * v,
    originalIndex: i,
  }));
  let copy = [...obj];
  for (let a = 0; a < 10; a++) {
    obj.forEach((obj, i) => {
      const val = obj.val;
      const oldIndex = copy.findIndex((v) => v.originalIndex === i);
      let newIndex = oldIndex;
      let qty = Math.abs(val) % (input.length - 1);
      for (let i = 0; i < qty; i++) {
        if (val > 0) {
          newIndex = getNextIndexFromArrayMod(copy, newIndex);
        } else {
          newIndex = getPastIndexFromArrayMod(copy, newIndex);
        }
      }
      const removed = copy.splice(oldIndex, 1);
      const beginning = copy.slice(0, newIndex);
      const end = copy.slice(newIndex);
      copy = beginning.concat(removed).concat(end);
    });
  }
  const zeroIndex = copy.findIndex((v) => v.val === 0);
  const mod1000 = (1000 + zeroIndex) % input.length;
  const mod2000 = (2000 + zeroIndex) % input.length;
  const mod3000 = (3000 + zeroIndex) % input.length;
  return copy[mod1000].val + copy[mod2000].val + copy[mod3000].val;
};

export const getNextIndexFromArrayMod = <T>(
  arr: T[],
  index: number,
): number => {
  if (index + 1 === arr.length - 1) {
    return 0;
  }
  if (index + 1 === arr.length) {
    return 1;
  }
  return index + 1;
};

export const getPastIndexFromArrayMod = <T>(
  arr: T[],
  index: number,
): number => {
  if (index - 1 === 0) {
    return arr.length - 1;
  }
  if (index - 1 === -1) {
    return arr.length - 2;
  }
  return index - 1;
};
