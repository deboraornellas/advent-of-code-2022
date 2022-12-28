import { day18part2 } from './day18.part2';
import { data, testData } from './day18.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day18part2()).toBe(18);
}); */

test('Provided test cases', () => {
  expect(day18part2(testData as string[])).toBe(58);
});

test('Returns an answer', () => {
  logAnswer(day18part2(data as string[]));
});

//3023 too high
//2054 too low
