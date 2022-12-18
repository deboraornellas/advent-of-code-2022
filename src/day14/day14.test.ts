import { day14 } from './day14';
import { data, testData } from './day14.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day14()).toBe(14);
}); */

test('Provided test cases', () => {
  expect(day14(testData as string[])).toBe(24);
});

test('Returns an answer', () => {
  logAnswer(day14(data as string[]));
});
