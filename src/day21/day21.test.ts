import { day21 } from './day21';
import { data, testData } from './day21.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day21()).toBe(21);
}); */

test('Provided test cases', () => {
  expect(day21(testData as string[])).toBe(152);
});

test('Returns an answer', () => {
  logAnswer(day21(data as string[]));
});
