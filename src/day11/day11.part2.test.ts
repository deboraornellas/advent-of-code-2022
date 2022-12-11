import { day11part2 } from './day11.part2';
import { data, testData } from './day11.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day11part2()).toBe(11);
}); */

test('Provided test cases', () => {
  expect(day11part2(testData as string[])).toBe(2713310158);
});

test('Returns an answer', () => {
  logAnswer(day11part2(data as string[]));
});
