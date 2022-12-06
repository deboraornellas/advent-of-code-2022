export const findStartOfMessageMarker = (
  input: string[],
  numberOfCharacters: number,
) => {
  let unique: string[] = [];
  let counter = 0;
  for (let i = 0; i < input.length; i++) {
    counter++;
    while (unique.includes(input[i])) {
      unique.shift();
    }
    unique.push(input[i]);

    if (unique.length === numberOfCharacters) {
      return counter;
    }
  }
  return counter;
};
