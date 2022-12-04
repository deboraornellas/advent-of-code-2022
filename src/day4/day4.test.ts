import { day4 } from './day4';
import { data, testData } from './day4.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day4()).toBe(4);
}); */

test('Provided test cases', () => {
  expect(day4(testData as string[])).toBe(2);
});

test('Returns an answer', () => {
  logAnswer(day4(data as string[]));
});
