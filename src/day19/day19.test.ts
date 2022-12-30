import { day19 } from './day19';
import { data, testData } from './day19.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day19()).toBe(19);
}); */

test('Provided test cases', () => {
  expect(day19(testData as string[])).toBe(33);
});

test('Returns an answer', () => {
  // logAnswer(day19(data as string[]));
});
