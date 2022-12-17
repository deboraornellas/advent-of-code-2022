export const day13 = (input: string[]) => {
  let ans = 0;
  input.forEach((pair, i) => {
    const parsedPair = pair.split('\n').map((x) => {
      return JSON.parse(x);
    });
    const inputL: number | any[] = parsedPair[0];
    const inputR: number | any[] = parsedPair[1];
    if (isRightOrder(inputL, inputR, 0)) {
      ans = ans + i + 1;
    }
  });
  return ans;
};

export const isRightOrder = (
  arrayL: any,
  arrayR: any,
  initIndex: number,
): boolean => {
  let indexToInspect = initIndex;
  let currL = arrayL[indexToInspect];
  let currR = arrayR[indexToInspect];
  if (currL === undefined || currL.length === 0) return true;
  if (currR === undefined || currR.length === 0) return false;
  if (Array.isArray(currL) && Array.isArray(currR)) {
    return isRightOrder(currL, currR, 0);
  } else if (Array.isArray(currL) || Array.isArray(currR)) {
    currL = Array.isArray(currL) ? currL : [currL];
    currR = Array.isArray(currR) ? currR : [currR];
    return isRightOrder(currL, currR, 0);
  } else {
    if (currL === currR) {
      return isRightOrder(arrayL, arrayR, indexToInspect + 1);
    }
    return currL < currR;
  }
};
