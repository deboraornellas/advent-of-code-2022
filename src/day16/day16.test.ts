import { day16 } from './day16';
import { data, testData } from './day16.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day16()).toBe(16);
}); */

test('Provided test cases', () => {
  // expect(day16(testData as string[])).toBe(1651);
});

test('Returns an answer', () => {
  logAnswer(day16(data as string[]));
});
