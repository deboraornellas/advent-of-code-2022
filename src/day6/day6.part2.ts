import { findStartOfMessageMarker } from '../utils/helpers';

export const day6part2 = (input: string[]) => {
  return findStartOfMessageMarker(input, 14);
};
