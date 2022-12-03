#!/bin/bash
mkdir src/day$1

if [ $? -ne 0 ] ; then
  echo "Day already exists!"
  exit
fi

echo "export const day$1 = (input: string[]) => {
  return $1;
};" >> src/day$1/day$1.ts

echo "import { day$1 } from './day$1';
import { data, testData } from './day$1.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day$1()).toBe($1);
}); */

test('Provided test cases', () => {
  expect(day$1(testData as string[])).toBe($1);
});

test('Returns an answer', () => {
  logAnswer(day$1(data as string[]));
});" >> src/day$1/day$1.test.ts

echo "import { parseInput } from '../utils/input';

const input = ``;
const testInput = ``;

export const data = parseInput(input);
export const testData = parseInput(testInput);" >> src/day$1/day$1.data.ts
exit
