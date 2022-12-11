import { day9, isTailTouchingHead, moveHead } from './day9';
import { data, testData } from './day9.data';
import { logAnswer } from '../utils/logging';

test('Personal test cases', () => {
  expect(isTailTouchingHead([0, 0], [0, 0])).toBe(true);
  expect(isTailTouchingHead([0, 0], [0, 1])).toBe(true);
  expect(isTailTouchingHead([0, 0], [0, 2])).toBe(false);
  expect(isTailTouchingHead([0, 0], [1, 1])).toBe(true);
  expect(moveHead([0, 0], 'R')).toEqual([1, 0]);
  expect(moveHead([4, 5], 'L')).toEqual([3, 5]);
});

test('Provided test cases', () => {
  expect(day9(testData as string[])).toBe(13);
});

test('Returns an answer', () => {
  logAnswer(day9(data as string[]));
});
