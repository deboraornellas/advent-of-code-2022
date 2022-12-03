export const day3 = (input: string[]) => {
  const repeatedItems: string[] = [];
  input.forEach((rucksack) => {
    const splitRucksack = rucksack.split('');
    const firstRucksack = splitRucksack.slice(0, rucksack.length / 2);
    const secondRucksack = splitRucksack.slice(rucksack.length / 2);
    const map = new Map<string, number>();
    let repeated = '';
    firstRucksack.forEach((char) => {
      map.set(char, 1);
    });
    secondRucksack.forEach((char) => {
      if (map.has(char)) {
        repeated = char;
      }
    });
    repeatedItems.push(repeated);
  });
  return repeatedItems.reduce((acc, item) => acc + getPriority(item), 0);
};

export const getPriority = (item: string) => {
  if (item.charCodeAt(0) <= 90) return item.charCodeAt(0) - 38;
  return item.charCodeAt(0) - 96;
};
