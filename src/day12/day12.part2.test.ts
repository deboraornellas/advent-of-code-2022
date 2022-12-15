import { day12part2 } from './day12.part2';
import { data, testData } from './day12.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day12part2()).toBe(12);
}); */

test('Provided test cases', () => {
  expect(day12part2(testData as string[])).toBe(29);
});

test('Returns an answer', () => {
  logAnswer(day12part2(data as string[]));
});
