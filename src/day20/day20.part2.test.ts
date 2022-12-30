import { day20part2 } from './day20.part2';
import { data, testData } from './day20.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day20part2()).toBe(20);
}); */

test('Provided test cases', () => {
  expect(day20part2(testData as number[])).toBe(1623178306);
});

test('Returns an answer', () => {
  logAnswer(day20part2(data as number[]));
});
