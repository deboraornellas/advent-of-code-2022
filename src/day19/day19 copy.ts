// const resourceType = ['geode', 'obsidian', 'clay', 'ore'] as const;
const resourceType = ['ore', 'clay', 'obsidian', 'geode'] as const;
type ResourceType = typeof resourceType[number];

type Robot = {
  type: ResourceType;
  createdAt: number;
};

type Resource = {
  type: ResourceType;
  qty: number;
};

export const day19 = (input: string[]) => {
  let quality = 0;
  const parsedInput = input.map((line) => {
    const parsedLine: number[] = line
      .replace('Blueprint ', '')
      .replace(': Each ore robot costs', '')
      .replace('ore. Each clay robot costs ', '')
      .replace('ore. Each obsidian robot costs ', '')
      .replace('ore and ', '')
      .replace('clay. Each geode robot costs ', '')
      .replace('ore and ', '')
      .replace(' obsidian.', '')
      .split(' ')
      .map((x) => Number(x));
    return parsedLine;
  });
  const blueprint = parsedInput[0];
  // parsedInput.forEach((blueprint) => {
  const robots: Robot[] = [
    {
      type: 'ore',
      createdAt: 0,
    },
  ];
  const resources: Resource[] = [
    {
      type: 'ore',
      qty: 0,
    },
    {
      type: 'clay',
      qty: 0,
    },
    {
      type: 'obsidian',
      qty: 0,
    },
    {
      type: 'geode',
      qty: 0,
    },
  ];
  const value =
    blueprint[0] * calculateGeodeQuantity(blueprint, 1, robots, resources);
  console.log(value);
  quality += value;
  // });

  return quality;
};

/*
Indexes:
0: ID
1: Cost of ore robot (ore)
2: Cost of clay robot (ore)
3: Cost of obsidian robot (ore)
4: Cost of obsidian robot (clay)
5: Cost of geode robot (ore)
6: Cost of geode robot (obsidian)
*/

/*
What we need to store:
- Current amounts of:
  - Time
  - Clay
  - Ore
  - Obsidian
  - Geode
  - Clay robots
  - Ore robots
  - Obsidian robots
  - Geode robots

If we know how many robots we have and at what time (t) they were created,
we know they are able to create (24-t) items.

Max possible ore: 24;

Robot: {
  type: 'ore'| 'clay'|'obsidian'|'geode';
  createdAt: number;
}

for each time from 1 to 24
can we buy ore robot?
y - buy it and recursive with t+1 and new robot
can we buy clay robot?
y - buy it and recursive with t+1 and new robot
can we buy obsidian robot?
y - buy it and recursive with t+1 and new robot
can we buy geode robot?
y - buy it and recursive with t+1 and new robot
else just do recursive with t+1 
return sum of geode robots' (24-t)

can I buy geode? 
yes -> buy it, next
no -> 
  do I need obsidian? 
    no ->
     do I need ore?
      no -> wtf
      yes -> shouldBuyOre = true
    yes -> shouldBuyObsidian = true
 
should buy obsidian?
  no
  yes -> can I buy it?
    yes -> buy it, next
    no ->
      do I need clay?
        no
        yes -> shouldBuyClay = true
      do I need ore?
        no
        yes -> shouldBuyOre = true

should buy clay?
  no
  yes -> can I buy it?
    yes -> buy it, next
    no ->
      do I need ore?
        no
        yes -> shouldBuyOre = true

should buy ore?
  no
  yes -> can I buy it?
    yes -> buy it, next
    no -> do nothing

do nothing, next

*/

const calculateGeodeQuantity = (
  blueprint: number[],
  time: number,
  robots: Robot[],
  resources: Resource[],
) => {
  if (time > 7) {
    console.log(time, robots, resources, 'back');
    return getResourceQty(resources, 'geode');
  }
  timePayment(robots, resources, time);
  let geodeQty = getResourceQty(resources, 'geode');
  let shouldBuyObsidian = false;
  let shouldBuyClay = false;
  let shouldBuyOre = false;
  // console.log(time, robots, resources, 'geode');
  if (canWeBuyARobot(blueprint, resources, 'geode')) {
    geodeQty = logic(blueprint, time, robots, resources, 'geode', geodeQty);
  } else {
    if (getResourceQty(resources, 'obsidian') < blueprint[6]) {
      shouldBuyObsidian = true;
    } else {
      shouldBuyOre = true;
    }
  }
  // console.log(time, robots, resources, 'obsidian');
  if (shouldBuyObsidian) {
    if (canWeBuyARobot(blueprint, resources, 'obsidian')) {
      geodeQty = logic(
        blueprint,
        time,
        robots,
        resources,
        'obsidian',
        geodeQty,
      );
    } else {
      if (getResourceQty(resources, 'clay') < blueprint[4]) {
        shouldBuyClay = true;
      } else {
        shouldBuyOre = true;
      }
    }
  }
  // console.log(time, robots, resources, 'clay');
  if (shouldBuyClay) {
    if (canWeBuyARobot(blueprint, resources, 'clay')) {
      geodeQty = logic(blueprint, time, robots, resources, 'clay', geodeQty);
    }
  }
  // console.log(time, robots, resources, 'ore');
  if (canWeBuyARobot(blueprint, resources, 'ore')) {
    geodeQty = logic(blueprint, time, robots, resources, 'ore', geodeQty);
  }
  // console.log(time, robots, resources, 'empty');
  const calc = calculateGeodeQuantity(blueprint, time + 1, robots, resources);
  if (geodeQty < calc) {
    geodeQty = calc;
  }
  undoTimePayment(robots, resources, time);
  // console.log(time, robots, resources);
  return geodeQty;
};

const timePayment = (robots: Robot[], resources: Resource[], time: number) => {
  robots.forEach((robot) => {
    if (robot.createdAt < time) {
      const r = resources.find(
        (resource) => resource.type === robot.type,
      ) as Resource;
      r.qty++;
    }
  });
};

const undoTimePayment = (
  robots: Robot[],
  resources: Resource[],
  time: number,
) => {
  robots.forEach((robot) => {
    if (robot.createdAt < time) {
      const r = resources.find(
        (resource) => resource.type === robot.type,
      ) as Resource;
      r.qty--;
    }
  });
};

const canWeBuyARobot = (
  blueprint: number[],
  resources: Resource[],
  type: ResourceType,
): boolean => {
  switch (type) {
    case 'ore':
      return getResourceQty(resources, 'ore') >= blueprint[1];
    case 'clay':
      return getResourceQty(resources, 'ore') >= blueprint[2];
    case 'obsidian':
      return (
        getResourceQty(resources, 'ore') >= blueprint[3] &&
        getResourceQty(resources, 'clay') >= blueprint[4]
      );
    case 'geode':
      return (
        getResourceQty(resources, 'ore') >= blueprint[5] &&
        getResourceQty(resources, 'obsidian') >= blueprint[6]
      );
    default:
      return false;
  }
};

const payForRobot = (
  blueprint: number[],
  resources: Resource[],
  type: ResourceType,
) => {
  let resourceOre = findResource(resources, 'ore');
  let resourceClay = findResource(resources, 'clay');
  let resourceObsidian = findResource(resources, 'obsidian');
  switch (type) {
    case 'ore':
      resourceOre.qty = resourceOre.qty - blueprint[1];
      break;
    case 'clay':
      resourceOre.qty = resourceOre.qty - blueprint[2];
      break;
    case 'obsidian':
      resourceOre.qty = resourceOre.qty - blueprint[3];
      resourceClay.qty = resourceClay.qty - blueprint[4];
      break;
    case 'geode':
      resourceOre.qty = resourceOre.qty - blueprint[5];
      resourceObsidian.qty = resourceObsidian.qty - blueprint[6];
      break;
    default:
      break;
  }
};

const undoPayment = (
  blueprint: number[],
  resources: Resource[],
  type: ResourceType,
) => {
  let resourceOre = findResource(resources, 'ore');
  let resourceClay = findResource(resources, 'clay');
  let resourceObsidian = findResource(resources, 'obsidian');
  switch (type) {
    case 'ore':
      resourceOre.qty = resourceOre.qty + blueprint[1];
      break;
    case 'clay':
      resourceOre.qty = resourceOre.qty + blueprint[2];
      break;
    case 'obsidian':
      resourceOre.qty = resourceOre.qty + blueprint[3];
      resourceClay.qty = resourceClay.qty + blueprint[4];
      break;
    case 'geode':
      resourceOre.qty = resourceOre.qty + blueprint[5];
      resourceObsidian.qty = resourceObsidian.qty + blueprint[6];
      break;
    default:
      break;
  }
};

const findResource = (resources: Resource[], type: ResourceType) =>
  resources.find((resource) => resource.type === type) as Resource;

const getResourceQty = (resources: Resource[], type: ResourceType) =>
  resources.find((resource) => resource.type === type)?.qty || 0;

const logic = (
  blueprint: number[],
  time: number,
  robots: Robot[],
  resources: Resource[],
  type: ResourceType,
  qty: number,
) => {
  robots.push({
    type,
    createdAt: time + 1,
  });
  payForRobot(blueprint, resources, type);
  const calc = calculateGeodeQuantity(blueprint, time + 1, robots, resources);
  if (qty < calc) {
    qty = calc;
  }
  const foundR = robots.findIndex(
    (robot) => robot.type === type && robot.createdAt === time + 1,
  );

  robots.splice(foundR, 1);
  undoPayment(blueprint, resources, type);
  return qty;
};
