export const day11 = (input: string[]) => {
  const monkeys = parseInputAsMonkeys(input);
  let round = 0;
  while (round < 20) {
    monkeys.forEach((monkey) => {
      monkey.totalNumberOfItems += monkey.currentItems.length;
      monkey.currentItems.forEach((item) => {
        const newScore = monkey.operation(item);
        const monkeyToThrow = monkey.test(newScore);
        monkeys[monkeyToThrow].currentItems.push(newScore);
      });
      monkey.currentItems = [];
    });
    round++;
  }

  const totalItemsList = monkeys
    .map((monkey) => monkey.totalNumberOfItems)
    .sort((a, b) => b - a);

  return totalItemsList[0] * totalItemsList[1];
};

/*
We want to track:

- each monkey items (array, treated as a queue)
- what their operation is (method);
(worryLevel) => newWorryLevel (including division by 3)
- what their test is (method);
(worryLevel) => monkeyToThrow
- number of items they've ever held (Set?)
- number of rounds (1 to 20)

*/

type Monkey = {
  currentItems: number[];
  totalNumberOfItems: number;
  test: (a: number) => number;
  operation: Function;
};

export const parseInputAsMonkeys = (input: string[]) => {
  const monkeys: Monkey[] = [];
  input.forEach((monkeyString, i) => {
    const monkey = newMonkey();
    const lines = monkeyString.split('\n');
    monkey.currentItems = getStartingItems(lines[1]);
    monkey.operation = getOperation(lines[2]);
    monkey.test = getTest(lines);
    monkeys[i] = monkey;
  });
  // console.log(monkeys);

  return monkeys;
};

const newMonkey = (): Monkey => ({
  currentItems: [],
  totalNumberOfItems: 0,
  test: () => 0,
  operation: () => 0,
});

const getStartingItems = (line: string) => {
  const split = line.split('Starting items: ');
  return split[1].split(', ').map((x) => Number(x));
};

const getOperation = (line: string) => {
  const split = line.split('Operation: new = ');
  const operation = Function('old', `return Math.floor((${split[1]})/3)`);
  return operation;
};

const getTest = (lines: string[]) => {
  const divisor = Number(lines[3].split('Test: divisible by ')[1]);
  const monkeyIfTrue = Number(lines[4].split('If true: throw to monkey ')[1]);
  const monkeyIfFalse = Number(lines[5].split('If false: throw to monkey ')[1]);
  return (worryLevel: number) => {
    if (worryLevel % divisor === 0) {
      return monkeyIfTrue;
    }
    return monkeyIfFalse;
  };
};
