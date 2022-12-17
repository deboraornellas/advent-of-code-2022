import { day13part2 } from './day13.part2';
import { data, testData } from './day13.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day13part2()).toBe(13);
}); */

test('Provided test cases', () => {
  expect(day13part2(testData as string[])).toBe(140);
});

test('Returns an answer', () => {
  logAnswer(day13part2(data as string[]));
});
