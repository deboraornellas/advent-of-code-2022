export const day1part2 = (input: string[]) => {
  let topThree = [0, 0, 0];
  input.forEach((foodList) => {
    const foodArray = foodList.split('\n');
    const calorieSum = foodArray.reduce<number>(
      (acc, calIntake) => acc + Number(calIntake),
      0,
    );
    if (calorieSum >= topThree[2]) {
      topThree.pop();
      topThree.push(calorieSum);
      topThree.sort((a, b) => b - a);
    }
  });
  return topThree.reduce<number>(
    (acc, calIntake) => acc + Number(calIntake),
    0,
  );
};
