import { day7 } from './day7';
import { data, testData } from './day7.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day7()).toBe(7);
}); */

test('Provided test cases', () => {
  expect(day7(testData as string[])).toBe(95437);
});

test('Returns an answer', () => {
  logAnswer(day7(data as string[]));
});
