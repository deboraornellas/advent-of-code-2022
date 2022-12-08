import { day8part2 } from './day8.part2';
import { data, testData } from './day8.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day8part2()).toBe(8);
}); */

test('Provided test cases', () => {
  expect(day8part2(testData as string[])).toBe(8);
});

test('Returns an answer', () => {
  logAnswer(day8part2(data as string[]));
});
