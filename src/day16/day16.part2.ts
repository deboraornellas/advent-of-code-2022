import { findAllArrayCombinations } from '../utils/helpers';

export const day16part2 = (input: string[]) => {
  const parsedInput = input.map((line) => {
    const parsedLine: (number | string | string[])[] = line
      .replace('Valve ', '')
      .replace('has flow rate=', '_')
      .replace('; tunnels lead to valves', '_')
      .replace('; tunnel leads to valve', '_')
      .split('_');
    parsedLine[0] = (parsedLine[0] as string).trim();
    parsedLine[1] = Number(parsedLine[1]);
    parsedLine[2] = (parsedLine[2] as string).split(',').map((x) => x.trim());
    return parsedLine;
  });
  const tunnels = parseTunnels(parsedInput);
  const tunnelsWithFlow = tunnels
    .filter((t) => t.flowRate > 0)
    .map((t) => t.name);
  const profundityMap = calcProfundityMap(tunnels, [...tunnelsWithFlow, 'AA']);
  return findAndCalculateAllPairs(tunnels, tunnelsWithFlow, profundityMap);
};

const findAndCalculateAllPairs = (
  tunnels: Tunnel[],
  arr: string[],
  profundityMap: Record<string, Record<string, number>>,
) => {
  let ans = 0;
  const allCombinations = findAllArrayCombinations(arr, 0, []);
  for (let i = 0; i < allCombinations.length; i++) {
    const parsedPerm = allCombinations[i];
    const remaining = arr.filter((item) => !parsedPerm.includes(item));
    const val =
      calculateHighestVolume(
        tunnels,
        parsedPerm,
        profundityMap,
        new Set<string>(),
        0,
        'AA',
        0,
      ) +
      calculateHighestVolume(
        tunnels,
        remaining,
        profundityMap,
        new Set<string>(),
        0,
        'AA',
        0,
      );
    if (val > ans) {
      ans = val;
    }
  }
  return ans;
};

type Tunnel = {
  name: string;
  connectedTo: { name: string; visited: boolean }[];
  flowRate: number;
  minutesActivated: number;
  isOpen: boolean;
};

const parseTunnels = (list: (number | string | string[])[][]): Tunnel[] =>
  list.map((line) => ({
    name: line[0] as string,
    connectedTo: (line[2] as string[]).map((tunnel) => ({
      name: tunnel,
      visited: false,
    })),
    flowRate: line[1] as number,
    minutesActivated: 0,
    isOpen: (line[1] as number) === 0 ? true : false,
  }));

const findTunnel = (tunnels: Tunnel[], name: string) =>
  tunnels.find((tunnel) => tunnel.name === name);

const findTunnelProfundity = (
  tunnels: Tunnel[],
  name: string,
  visited: Set<string>,
  queue: { name: string; profundity: number }[],
): number | undefined => {
  const queueShift = queue.shift();
  const curr = findTunnel(tunnels, queueShift?.name as string) as Tunnel;
  visited.add(curr.name);
  if (curr.name === name) return queueShift?.profundity;
  for (let i in curr.connectedTo) {
    if (!visited.has(curr.connectedTo[i].name))
      queue.push({
        name: curr.connectedTo[i].name,
        profundity: (queueShift?.profundity ?? 0) + 1,
      });
  }
  if (queue.length === 0) return undefined;
  return findTunnelProfundity(tunnels, name, visited, queue);
};

const calcProfundityMap = (
  tunnels: Tunnel[],
  tunnelsWithFlow: string[],
): Record<string, Record<string, number>> => {
  const n = tunnelsWithFlow.length;
  const map: Record<string, Record<string, number>> = {};
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!map[tunnelsWithFlow[i]]) map[tunnelsWithFlow[i]] = {};
      map[tunnelsWithFlow[i]][tunnelsWithFlow[j]] =
        findTunnelProfundity(tunnels, tunnelsWithFlow[j], new Set<string>(), [
          { name: tunnelsWithFlow[i], profundity: 0 },
        ]) || 0;
    }
  }
  return map;
};

const calculateHighestVolume = (
  allTunnels: Tunnel[],
  tunnelsWithFlow: string[],
  profundityMap: Record<string, Record<string, number>>,
  visited: Set<string>,
  time: number,
  current: string,
  currentHighestVol: number,
) => {
  let v = currentHighestVol;
  visited.add(current);
  for (let tunnel of tunnelsWithFlow) {
    if (!visited.has(tunnel)) {
      const profundity = profundityMap[current][tunnel];
      const newTime = time + profundity + 1;
      if (newTime <= 26) {
        const vol = calculateHighestVolume(
          allTunnels,
          tunnelsWithFlow,
          profundityMap,
          visited,
          newTime,
          tunnel,
          currentHighestVol +
            (26 - newTime) * (findTunnel(allTunnels, tunnel)?.flowRate || 0),
        );
        if (v < vol) {
          v = vol;
        }
      }
    }
  }
  visited.delete(current);
  return v > currentHighestVol ? v : currentHighestVol;
};
