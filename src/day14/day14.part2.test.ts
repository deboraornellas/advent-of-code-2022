import { day14part2 } from './day14.part2';
import { data, testData } from './day14.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day14part2()).toBe(14);
}); */

test('Provided test cases', () => {
  expect(day14part2(testData as string[])).toBe(93);
});

test('Returns an answer', () => {
  logAnswer(day14part2(data as string[]));
});
