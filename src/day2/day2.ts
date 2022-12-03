export const day2 = (input: string[]) => {
  const winMap: Record<string, string> = {
    X: 'C',
    Y: 'A',
    Z: 'B',
  };
  const drawMap: Record<string, string> = {
    A: 'X',
    B: 'Y',
    C: 'Z',
  };
  const shapeMap: Record<string, number> = {
    X: 1,
    Y: 2,
    Z: 3,
  };
  enum Points {
    WIN = 6,
    DRAW = 3,
    LOSE = 0,
  }
  let score = 0;
  input.forEach((round) => {
    const shapes = round.split(' ');
    score += shapeMap[shapes[1]];
    if (winMap[shapes[1]] === shapes[0]) {
      score += Points.WIN;
    } else if (drawMap[shapes[0]] === shapes[1]) {
      score += Points.DRAW;
    } else {
      score += Points.LOSE;
    }
  });
  return score;
};
