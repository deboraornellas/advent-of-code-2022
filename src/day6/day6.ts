import { findStartOfMessageMarker } from '../utils/helpers';

export const day6 = (input: string[]) => {
  return findStartOfMessageMarker(input, 4);
};
