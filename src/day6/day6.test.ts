import { day6 } from './day6';
import { data, testData } from './day6.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day6()).toBe(6);
}); */

test('Provided test cases', () => {
  expect(day6(testData as string[])).toBe(11);
});

test('Returns an answer', () => {
  logAnswer(day6(data as string[]));
});
