import { day10 } from './day10';
import { data, testData } from './day10.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day10()).toBe(10);
}); */

test('Provided test cases', () => {
  expect(day10(testData as string[])).toBe(13140);
});

test('Returns an answer', () => {
  logAnswer(day10(data as string[]));
});
