import { day4part2 } from './day4.part2';
import { data, testData } from './day4.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day4part2()).toBe(4);
}); */

test('Provided test cases', () => {
  expect(day4part2(testData as string[])).toBe(4);
});


test('Returns an answer', () => {
  logAnswer(day4part2(data as string[]));
});
