import { logAnswer } from '../utils/logging';
import { day5 } from './day5';
import { data, testData } from './day5.data';

/* test('Personal test cases', () => {
  expect(day5()).toBe(5);
}); */

test('Provided test cases', () => {
  expect(day5(testData as string[])).toBe('CMZ');
});

test('Returns an answer', () => {
  // expect(day5(testData as string[])).toBe('CMZ');
  logAnswer(day5(data as string[]));
});
