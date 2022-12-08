const getDelimiter = (input: string) => {
  if (input.includes(',')) {
    return ',';
  }
  if (input.includes('\n')) {
    return '\n';
  }
  return '';
};

const mapToNumberIfNecessary = (input: string[]) => {
  if (input.every((value) => !isNaN(Number(value)))) {
    return input.map((e) => Number(e));
  }
  return input;
};

export const parseInput = (
  input: string,
  delimiter?: string,
  trimmed: boolean = true,
  parsedToNumber: boolean = true,
) => {
  let inputArray: string[] | number[] = input.split(
    delimiter || getDelimiter(input),
  );
  if (trimmed) {
    inputArray = inputArray.map((e) => e.trim());
  }
  if (parsedToNumber) inputArray = mapToNumberIfNecessary(inputArray);
  return inputArray;
};
