import { data, testData } from './day1.data';
import { logAnswer } from '../utils/logging';
import { day1 } from './day1';

test('Provided test cases', () => {
  expect(day1(testData as string[])).toBe(24000);
});

test('Returns an answer', () => {
  logAnswer(day1(data as string[]));
});
