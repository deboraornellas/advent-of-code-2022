export const day1 = (input: string[]) => {
  let highestSum = 0;
  input.forEach((foodList) => {
    const foodArray = foodList.split('\n');
    const calorieSum = foodArray.reduce<number>(
      (acc, calIntake) => acc + Number(calIntake),
      0,
    );
    if (calorieSum >= highestSum) {
      highestSum = calorieSum;
    }
  });
  return highestSum;
};
