export const day2part2 = (input: string[]) => {
  const winMap: Record<string, string> = {
    A: 'B',
    B: 'C',
    C: 'A',
  };
  const drawMap: Record<string, string> = {
    A: 'A',
    B: 'B',
    C: 'C',
  };
  const loseMap: Record<string, string> = {
    A: 'C',
    B: 'A',
    C: 'B',
  };
  enum Points {
    WIN = 6,
    DRAW = 3,
    LOSE = 0,
  }
  const getMap: Record<string, Record<string, string>> = {
    X: loseMap,
    Y: drawMap,
    Z: winMap,
  };
  const points: Record<string, number> = {
    X: Points.LOSE,
    Y: Points.DRAW,
    Z: Points.WIN,
  };
  const shapeMap: Record<string, number> = {
    A: 1,
    B: 2,
    C: 3,
  };
  let score = 0;
  input.forEach((round) => {
    const shapes = round.split(' ');
    const map = getMap[shapes[1]];
    const chosenShape = map[shapes[0]];
    console.log(chosenShape);
    score = score + shapeMap[chosenShape] + points[shapes[1]];
  });
  return score;
};
