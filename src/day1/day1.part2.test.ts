import { day1part2 } from './day1.part2';
import { data, testData } from './day1.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day1part2()).toBe(1);
}); */

test('Provided test cases', () => {
  expect(day1part2(testData as string[])).toBe(45000);
});

test('Returns an answer', () => {
  logAnswer(day1part2(data as string[]));
});
