export const day15 = (input: string[], row: number) => {
  let maxX = 0;
  let maxY = 0;
  let minX = Number.MAX_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;
  const sensors: Sensor[] = [];
  const sensorSet = new Set<string>();
  const beaconSet = new Set<string>();
  const noBeaconMap = new Map<number, Set<string>>();
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
    // console.log(Math.min(arr[0], arr[2]));
    if (maxX < Math.max(arr[0], arr[2])) {
      maxX = Math.max(arr[0], arr[2]);
    }
    if (minX > Math.min(arr[0], arr[2])) {
      minX = Math.min(arr[0], arr[2]);
    }
    if (maxY < Math.max(arr[1], arr[3])) {
      maxY = Math.max(arr[1], arr[3]);
    }
    if (minY > Math.min(arr[1], arr[3])) {
      minY = Math.min(arr[1], arr[3]);
    }
    const distance = manhattanDistance(sensor, beacon);
    sensors.push({
      position: sensor,
      beacon,
      distance,
    });
    sensorSet.add(JSON.stringify(sensor));
    beaconSet.add(JSON.stringify(beacon));
  });
  console.log(maxX, maxY, minX, minY);
  for (const sensor of sensors) {
    const verticalDistance = Math.abs(sensor.position[1] - row);
    if (verticalDistance > sensor.distance) continue;
    const diff = sensor.distance - verticalDistance;
    for (
      let i = sensor.position[0] - diff;
      i <= sensor.position[0] + diff;
      i++
    ) {
      const pos = [i, row];
      const stringifiedPos = JSON.stringify(pos);
      if (!sensorSet.has(stringifiedPos) && !beaconSet.has(stringifiedPos)) {
        const set = noBeaconMap.get(row) ?? new Set<string>();
        noBeaconMap.set(row, set.add(stringifiedPos));
      }
    }
  }
  // console.log(noBeaconMap);
  return noBeaconMap.get(row)?.size;
};

type Sensor = {
  position: number[];
  distance: number;
  beacon: number[];
};

const manhattanDistance = (a: number[], b: number[]) =>
  Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
