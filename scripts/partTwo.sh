#!/bin/bash
echo "export const day$1part2 = (input: string[]) => {
  return $1;
};" >> src/day$1/day$1.part2.ts

echo "import { day$1part2 } from './day$1.part2';
import { data, testData } from './day$1.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day$1part2()).toBe($1);
}); */

test('Provided test cases', () => {
  expect(day$1part2(testData as string[])).toBe($1);
});


test('Returns an answer', () => {
  logAnswer(day$1part2(data as string[]));
});" >> src/day$1/day$1.part2.test.ts
