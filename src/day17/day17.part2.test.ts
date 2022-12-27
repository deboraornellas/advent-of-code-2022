import { day17part2 } from './day17.part2';
import { data, testData } from './day17.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day17part2()).toBe(17);
}); */

test('Provided test cases', () => {
  // expect(day17part2(testData as string[])).toBe(1514285714288);
});

test('Returns an answer', () => {
  logAnswer(day17part2(data as string[]));
});
