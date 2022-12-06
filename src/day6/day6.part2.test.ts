import { day6part2 } from './day6.part2';
import { data, testData } from './day6.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day6part2()).toBe(6);
}); */

test('Provided test cases', () => {
  expect(day6part2(testData as string[])).toBe(26);
});

test('Returns an answer', () => {
  logAnswer(day6part2(data as string[]));
});
