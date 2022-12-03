import { logAnswer } from '../utils/logging';
import { data, testData } from './day2.data';
import { day2part2 } from './day2.part2';

/* test('Personal test cases', () => {
  expect(day2part2()).toBe(2);
}); */

test('Provided test cases', () => {
  expect(day2part2(testData as string[])).toBe(12);
});

test('Returns an answer', () => {
  logAnswer(day2part2(data as string[]));
});
