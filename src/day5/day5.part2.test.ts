import { logAnswer } from '../utils/logging';
import { data, testData } from './day5.data';
import { day5part2 } from './day5.part2';

/* test('Personal test cases', () => {
  expect(day5part2()).toBe(5);
}); */

test('Provided test cases', () => {
  expect(day5part2(testData as string[])).toBe('MCD');
});

test('Returns an answer', () => {
  logAnswer(day5part2(data as string[]));
});
