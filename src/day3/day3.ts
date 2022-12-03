export const day3 = (input: string[]) => {
  const repeatedItems: string[] = [];
  input.forEach((rucksack) => {
    const splitRucksack = rucksack.split('');
    const firstRucksack = splitRucksack.slice(0, rucksack.length / 2);
    const secondRucksack = splitRucksack.slice(rucksack.length / 2);
    const set = new Set<string>();
    let repeated = '';
    firstRucksack.forEach((char) => {
      set.add(char);
    });
    secondRucksack.forEach((char) => {
      if (set.has(char)) {
        repeated = char;
      }
    });
    repeatedItems.push(repeated);
  });
  return repeatedItems.reduce((acc, item) => acc + getPriority(item), 0);
};

export const getPriority = (item: string) => {
  if (item.charCodeAt(0) <= 'Z'.charCodeAt(0))
    return item.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
  return item.charCodeAt(0) - ('a'.charCodeAt(0) - 1);
};
