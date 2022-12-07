import { day7part2 } from './day7.part2';
import { data, testData } from './day7.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day7part2()).toBe(7);
}); */

test('Provided test cases', () => {
  expect(day7part2(testData as string[])).toBe(24933642);
});

test('Returns an answer', () => {
  logAnswer(day7part2(data as string[]));
});
