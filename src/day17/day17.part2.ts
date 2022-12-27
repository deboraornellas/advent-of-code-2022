import { day17 } from './day17';
import { day17Modified } from './day17_modified';

export const day17part2 = (directions: string[]) => {
  const BIG_NUM = 1000000000000;
  const [a, b] = day17Modified(directions);
  const mmc = a;
  const modulo = (BIG_NUM - b) % mmc;
  const divided = (BIG_NUM - b - modulo) / mmc;
  return (
    divided * day17(directions, mmc + b) -
    (divided - 1) *
      (2 * day17(directions, mmc + b) - day17(directions, 2 * mmc + b)) +
    day17(directions, b + modulo + mmc) -
    day17(directions, b + mmc)
  );
};
