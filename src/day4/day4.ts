export const day4 = (input: string[]) => {
  let counter = 0;
  input.forEach((pair, i) => {
    const firstInterval = pair
      .split(',')[0]
      .split('-')
      .map((x) => Number(x));
    const secondInterval = pair
      .split(',')[1]
      .split('-')
      .map((x) => Number(x));
    if (
      firstInterval[0] >= secondInterval[0] &&
      firstInterval[1] <= secondInterval[1]
    ) {
      counter++;
      console.log(firstInterval, secondInterval, counter, i);
    } else if (
      secondInterval[0] >= firstInterval[0] &&
      secondInterval[1] <= firstInterval[1]
    ) {
      counter++;
      console.log(firstInterval, secondInterval, counter, i);
    }
  });
  return counter;
};