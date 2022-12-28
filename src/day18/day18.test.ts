import { day18 } from './day18';
import { data, testData } from './day18.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day18()).toBe(18);
}); */

test('Provided test cases', () => {
  expect(day18(testData as string[])).toBe(64);
});

test('Returns an answer', () => {
  logAnswer(day18(data as string[]));
});
