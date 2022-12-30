import { day20 } from './day20';
import { data, testData } from './day20.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day20()).toBe(20);
}); */

test('Provided test cases', () => {
  expect(day20(testData as number[])).toBe(3);
});

test('Returns an answer', () => {
  logAnswer(day20(data as number[]));
});
