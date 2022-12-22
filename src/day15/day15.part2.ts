type Sensor = {
  position: number[];
  distance: number;
};

export const day15part2 = (input: string[], min: number, max: number) => {
  const sensors: Sensor[] = [];
  input.forEach((line) => {
    const arr = line
      .replace('Sensor at ', '')
      .replace(': closest beacon is at', '')
      .replace(/\,/g, '')
      .replace(/x\=/g, '')
      .replace(/y\=/g, '')
      .split(' ')
      .map((x) => Number(x));
    const sensor = [arr[0], arr[1]];
    const beacon = [arr[2], arr[3]];
    const distance = manhattanDistance(sensor, beacon);
    sensors.push({
      position: sensor,
      distance,
    });
  });
  sensors.sort((a, b) => a.distance - b.distance);

  const found = findOnlyPossibleBeacon(sensors, min, max);

  return found[0] * 4000000 + found[1];
};

const findOnlyPossibleBeacon = (
  sensors: Sensor[],
  min: number,
  max: number,
) => {
  for (const sensor of sensors) {
    const borders = getAllPositionsWithGivenDistance(
      sensor.position,
      sensor.distance + 1,
      min,
      max,
    );
    for (let border of borders) {
      if (
        sensors.every(
          (sensor) =>
            manhattanDistance(sensor.position, JSON.parse(border)) >
            sensor.distance,
        )
      ) {
        return JSON.parse(border);
      }
    }
  }
};

const getAllPositionsWithGivenDistance = (
  initialPos: number[],
  distance: number,
  min: number,
  max: number,
) => {
  const set = new Set<string>();
  for (let i = 0; i <= distance; i++) {
    addIfInRange(
      set,
      min,
      max,
      initialPos[0] + i,
      initialPos[1] + distance - i,
    );
    addIfInRange(
      set,
      min,
      max,
      initialPos[0] - i,
      initialPos[1] + distance + i,
    );
    addIfInRange(
      set,
      min,
      max,
      initialPos[0] + distance + i,
      initialPos[1] - i,
    );
    addIfInRange(
      set,
      min,
      max,
      initialPos[0] + distance + i,
      initialPos[1] - i,
    );
  }
  return set;
};

const addIfInRange = (
  set: Set<string>,
  min: number,
  max: number,
  valueX: number,
  valueY: number,
) => {
  if (min <= valueX && max >= valueX && min <= valueY && max >= valueY) {
    set.add(JSON.stringify([valueX, valueY]));
  }
};

const manhattanDistance = (a: number[], b: number[]) =>
  Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
