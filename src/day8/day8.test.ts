import { day8 } from './day8';
import { data, testData } from './day8.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day8()).toBe(8);
}); */

test('Provided test cases', () => {
  expect(day8(testData as string[])).toBe(21);
});

test('Returns an answer', () => {
  logAnswer(day8(data as string[]));
});
