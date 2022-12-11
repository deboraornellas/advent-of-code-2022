export const day11part2 = (input: string[]) => {
  const primeNumbers = getPrimeNumbers(input);
  const monkeys = parseInputAsMonkeys(input, primeNumbers);
  let round = 0;
  while (round < 10000) {
    monkeys.forEach((monkey, monkeyIndex) => {
      monkey.totalNumberOfItems += monkey.currentItemModulos.length;
      monkey.currentItemModulos.forEach((item) => {
        item.forEach((_, i) => {
          let newModulo = monkey.operation(item[i], primeNumbers[i]);
          item[i] = newModulo;
        });
        const monkeyToThrow = monkey.test(item[monkeyIndex]);
        monkeys[monkeyToThrow].currentItemModulos.push(item);
      });
      monkey.currentItemModulos = [];
    });
    round++;
  }

  const totalItemsList = monkeys
    .map((monkey) => monkey.totalNumberOfItems)
    .sort((a, b) => b - a);

  return totalItemsList[0] * totalItemsList[1];
};

type Monkey = {
  currentItemModulos: number[][];
  totalNumberOfItems: number;
  primeNumber: number;
  test: (modulo: number) => number;
  operation: Function;
};
export const getPrimeNumbers = (input: string[]) => {
  const numbers: number[] = [];
  input.forEach((monkeyString) => {
    const lines = monkeyString.split('\n');
    numbers.push(getPrimeNumber(lines[3]));
  });
  return numbers;
};

export const parseInputAsMonkeys = (
  input: string[],
  primeNumbers: number[],
) => {
  const monkeys: Monkey[] = [];
  input.forEach((monkeyString, i) => {
    const monkey = newMonkey();
    const lines = monkeyString.split('\n');
    monkey.currentItemModulos = getStartingItems(lines[1], primeNumbers);
    monkey.operation = getOperation(lines[2]);
    monkey.test = getTest(lines);
    monkeys[i] = monkey;
  });
  return monkeys;
};

const newMonkey = (): Monkey => ({
  currentItemModulos: [],
  totalNumberOfItems: 0,
  primeNumber: 0,
  test: () => 0,
  operation: () => 0,
});

const getStartingItems = (line: string, primeNumbers: number[]) => {
  const split = line.split('Starting items: ');
  const startingItems = split[1].split(', ').map((x) => Number(x));
  const modulos = startingItems.map((item) => {
    const mod: number[] = [];
    primeNumbers.forEach((num) => mod.push(item % num));
    return mod;
  });
  return modulos;
};

const getOperation = (line: string) => {
  const split = line.split('Operation: new = ');
  const secondSplit = split[1].split(' ');
  const operator = secondSplit[1];
  if (operator === '+') {
    return (modulo: number, primeNumber: number) =>
      (modulo + (Number(secondSplit[2]) % primeNumber)) % primeNumber;
  }
  return (modulo: number, primeNumber: number) =>
    ((modulo *
      (isNaN(Number(secondSplit[2])) ? modulo : Number(secondSplit[2]))) %
      primeNumber) %
    primeNumber;
};

const getPrimeNumber = (line: string) =>
  Number(line.split('Test: divisible by ')[1]);

const getTest = (lines: string[]) => {
  const monkeyIfTrue = Number(lines[4].split('If true: throw to monkey ')[1]);
  const monkeyIfFalse = Number(lines[5].split('If false: throw to monkey ')[1]);
  return (modulo: number) => {
    if (modulo === 0) {
      return monkeyIfTrue;
    }
    return monkeyIfFalse;
  };
};
