import { day16part2 } from './day16.part2';
import { data, testData } from './day16.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day16part2()).toBe(16);
}); */

test('Provided test cases', () => {
  expect(day16part2(testData as string[])).toBe(1707);
});

test('Returns an answer', () => {
  logAnswer(day16part2(data as string[]));
});
