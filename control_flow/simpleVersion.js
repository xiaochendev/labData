// Tools
// variables
// control flow statements
// operators

// What do we know?
// // totalSpaceAvail = radius 5meters
// // const PI = 3.1415;
// // const area = PI * radius * radius;
//  // each plant takes up 0.8 m^2
//  // start with 20 plants
//  // plants double every week

//  // pruned 80% > maxcap
//  // monitored 50 < cap < 80
//  // planted cap < 50
//  //  // res 1, 2, 3 week

// What can we infer?
//  // total area doesnt need to incoporate spaces between circles

//  What do we need from our calculations?
//  // Either:  find currents plants at the end of the week divide by total plants possible?
//  //  // find space take up by plants each week and divide by total space avaible

// Constance Variables
const startingPlants = 20;
const radius = 5;
const PI = 3.1415;
const area = PI * radius * radius;
const spacePerPlant = 0.8;

// Other Variables
let week = 1.3;

// Find Max Possible Plants
const totalPossPlants = area / spacePerPlant;
console.log(
  `With ${area} sqr meters, we can have a total of ${totalPossPlants} plants.`
);

// Find Plants per week
const ppWeek = startingPlants * 2 ** week;
console.log(`After ${week} week(s), you have ${ppWeek} plants`);

// Find Perfect of total plants achieved
const percentFilled = (ppWeek / totalPossPlants) * 100;
console.log(`We have grown ${percentFilled}% of possible plants.`);

if (percentFilled > 80) {
  console.log(`We reccomend you Prune your plants`);
} else if ( percentFilled >= 50) {
  console.log(`We reccomend you monitor your plants`);
} else {
  console.log(`We reccomend you plant more plants, Lets GROOOW!!`);
}