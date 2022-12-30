import { day21part2 } from './day21.part2';
import { data, testData } from './day21.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day21part2()).toBe(21);
}); */

test('Provided test cases', () => {
  expect(day21part2(testData as string[])).toBe(301);
});

test('Returns an answer', () => {
  logAnswer(day21part2(data as string[]));
});
