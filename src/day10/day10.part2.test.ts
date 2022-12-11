import { day10part2 } from './day10.part2';
import { data, testData } from './day10.data';
import { logAnswer } from '../utils/logging';

/* test('Personal test cases', () => {
  expect(day10part2()).toBe(10);
}); */

test('Provided test cases', () => {
  expect(day10part2(testData as string[]))
    .toMatch(`##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`);
});

test('Returns an answer', () => {
  logAnswer(day10part2(data as string[]));
});
