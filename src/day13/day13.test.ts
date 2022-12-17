import { day13 } from './day13';
import { data, testData } from './day13.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day13()).toBe(13);
}); */

test('Provided test cases', () => {
  expect(day13(testData as string[])).toBe(13);
});

test('Returns an answer', () => {
  logAnswer(day13(data as string[]));
});
