import { logAnswer } from '../utils/logging';
import { day2 } from './day2';
import { data, testData } from './day2.data';

/* test('Personal test cases', () => {
  expect(day2()).toBe(2);
}); */

test('Provided test cases', () => {
  expect(day2(testData as string[])).toBe(15);
});

test('Returns an answer', () => {
  logAnswer(day2(data as string[]));
});
