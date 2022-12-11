import { day11 } from './day11';
import { data, testData } from './day11.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day11()).toBe(11);
}); */

test('Provided test cases', () => {
  expect(day11(testData as string[])).toBe(10605);
});

test('Returns an answer', () => {
  logAnswer(day11(data as string[]));
});
