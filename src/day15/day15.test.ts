import { day15 } from './day15';
import { data, testData } from './day15.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day15()).toBe(15);
}); */

test('Provided test cases', () => {
  expect(day15(testData as string[], 10)).toBe(26);
});

test('Returns an answer', () => {
  logAnswer(day15(data as string[], 2000000));
});
