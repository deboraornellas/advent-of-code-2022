import { day9part2 } from './day9.part2';
import { data, testData } from './day9.data';
import { logAnswer } from '../utils/logging';
import { parseInput } from '../utils/input';

/* test('Personal test cases', () => {
  expect(day9part2()).toBe(9);
}); */

test('Provided test cases', () => {
  // expect(day9part2(testData as string[])).toBe(1);
  expect(
    day9part2(
      parseInput(`R 5
  U 8
  L 8
  D 3
  R 17
  D 10
  L 25
  U 20
  `) as string[],
    ),
  ).toBe(36);
});

test('Returns an answer', () => {
  logAnswer(day9part2(data as string[]));
});
