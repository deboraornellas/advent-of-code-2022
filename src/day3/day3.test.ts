import { logAnswer } from '../utils/logging';
import { day3 } from './day3';
import { data, testData } from './day3.data';

/* test('Personal test cases', () => {
  expect(day3()).toBe(3);
}); */

test('Provided test cases', () => {
  expect(day3(testData as string[])).toBe(157);
});

test('Returns an answer', () => {
  logAnswer(day3(data as string[]));
});
