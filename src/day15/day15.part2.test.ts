import { day15part2 } from './day15.part2';
import { data, testData } from './day15.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day15part2()).toBe(15);
}); */

test('Provided test cases', () => {
  expect(day15part2(testData as string[], 0, 20)).toBe(56000011);
});

test('Returns an answer', () => {
  logAnswer(day15part2(data as string[], 0, 4000000));
});
