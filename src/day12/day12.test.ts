import { day12 } from './day12';
import { data, testData } from './day12.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day12()).toBe(12);
}); */

test('Provided test cases', () => {
  expect(day12(testData as string[])).toBe(31);
});

test('Returns an answer', () => {
  logAnswer(day12(data as string[]));
});
