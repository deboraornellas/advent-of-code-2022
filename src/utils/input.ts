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
) => {
  const inputArray = input.split(delimiter || getDelimiter(input));
  if (!trimmed) return mapToNumberIfNecessary(inputArray);
  const trimmedArray = inputArray.map((e) => e.trim());
  return mapToNumberIfNecessary(trimmedArray);
};
