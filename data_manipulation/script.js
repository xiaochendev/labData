// The initial numbers that must be verified.
const n1 = 10;
const n2 = 15;
const n3 = 20;
const n4 = 5;

// Check one: add up to 50
// This is a fairly simple operation using
// arithmetic operators and a comparison.
const isSum50 = (n1 + n2 + n3 + n4) == 50;

// Check two: at least two odd numbers
// Here, we use modulus to check if something is odd.
// Since % 2 is 0 if even and 1 if odd, we can use
// arithmetic to count the total number of odd numbers.
const isTwoOdd = (n1 % 2) + (n2 % 2) + (n3 % 2) + (n4 % 2) >= 2;

// Check three: no number larger than 25
// This time, we use the OR operator to check
// if ANY of the numbers is larger than 25.
const isOver25 = n1 > 25 || n2 > 25 || n3 > 25 || n4 > 25;

// Check four: all unique numbers
// This is long, and there are more efficient
// ways of handling it with other data structures
// that we will review later.
const isUnique = n1 != n2 && n1 != n3 && n1 != n4 && n2 != n3 && n2 != n4 && n3 != n4;

// Here, we put the results into a single variable 
// for convenience. Note how we negate isOver25 using
// the ! operator. We could also have tested for 
// "isUnder25" as an alternative.
const isValid = isSum50 && isTwoOdd && !isOver25 && isUnique;

// Finally, log the results.
console.log(isValid);

// Here's another example of how this COULD be done,
// but it SHOULD NOT be done this way. As programmers,
// we break things into small, manageable pieces so that
// they can be better understood, scaled, and maintained.
const dontDoThis = ((n1 + n2 + n3 + n4) == 50) && 
  ((n1 % 2) + (n2 % 2) + (n3 % 2) + (n4 % 2) >= 2) && 
  !(n1 > 25 || n2 > 25 || n3 > 25 || n4 > 25) && 
  (n1 != n2 && n1 != n3 && n1 != n4 && n2 != n3 && n2 != n4 && n3 != n4);


// PART 1:
// Check if all numbers are divisible by 5. Cache the result in a variable.

// let nums = [n1, n2, n3, n4];
// let divisibleBy5 = [];
// for (let i=0; i < nums.length; i++) {
//     if nums[i] % 5 = 0;
//         divisibleBy5 += nums[i];
// };
// console.log(divisibleBy5);

const isDiv5 = n1 % 5 + n2 % 5 + n3 % 5 + n4 % 5 == 0;
console.log(`${isDiv5}: is divisible by 5`);

// Check if the first number is larger than the last. Cache the result in a variable.

// let firstNumLargeThanLastNum = [];
// if nums[0] > nums[nums.length-1];
//     firstNumLargeThanLastNum += nums[0];
//     break;
// console.log(firstNumLargeThanLastNum);

const firstNumLgLast = n1 > n4;
console.log(`${firstNumLgLast}: first number is larger than last.`);

// Accomplish the following arithmetic chain:
  // Subtract the first number from the second number.

// let subtractRes = nums[0] - nums[1];
let num = n2 - n1;
console.log(`${n2} - ${n1} = ${num}`);

  // Multiply the result by the third number.

// let mutiplyRes = subtractRes * nums[2];
num *= n3;
console.log(`${n2 - n1} * ${n3} = ${num}`);


  // Find the remainder of dividing the result by the fourth number.

// let remainder = mutiplyRes % nums[3];
num %= n4;
console.log(`${n2 - n1} * ${n3} % ${n4} = ${num}`);

// Change the way that isOver25 calculates so that we do not need to use the NOT operator (!) in other logic comparisons. Rename the variable as appropriate.

// for(let i=0; i<nums.length-1; i++) {
//     if nums[i] <= 25;
//         isUnder25 += nums[i];
//     break;
// };

const isUnder25 = n1 <= 25 && n2 <= 25 && n3 <= 25 && n4 <= 25;
console.log(`it is ${isUnder25}, the numbers are all under 25`)


// PART 2:

// You are planning a cross-country road trip!
// The distance of the trip, in total, is 1,500 miles.
const totalDistance = 1500;
// You have a fuel budget of $175.
const budget = 175;
// The average cost of fuel is $3 per gallon.
const costPerGallon = 3;

// Your car’s fuel efficiency is as follows:
// let fuelEff = {60:28, 75:23, 55:30}

// At 60 miles per hour, you get 28 miles per gallon.
// At 75 miles per hour, you get 23 miles per gallon.
// At 55 miles per hour, you get 30 miles per gallon.
let speed = 75;
let mpg = 23;


// Set up a program to answer the following questions:
// How many gallons of fuel will you need for the entire trip?
let gallonsPerTrip = totalDistance/mpg;
console.log(
  `At ${speed}mph, you will need ${gallonsPerTrip} gallons of fuel, to travel ${totalDistance} miles.`
);

// Will your budget be enough to cover the fuel expense?
let costPerTrip = gallonsPerTrip * costPerGallon;
console.log(
  `At ${speed}mph, it takes total ${gallonsPerTrip} gallons, which cost $${costPerTrip} dollars`
);

let isEnoughBudget = budget >= costPerTrip;
console.log(
  `With budget $${budget}. it is ${isEnoughBudget} that we can effort this trip at that speed.`
);

// How long will the trip take, in hours?
let timeOfTrip = totalDistance / speed;
console.log(
  `At ${speed}mph it would take ${timeOfTrip} hrs to complete ${totalDistance} miles`
);
// Compare the results when traveling at an average of 55, 60, and 75 miles per hour. Which makes the most sense for the trip?
// At 75mph, it takes total 65.21739130434783 gallons, which cost $195.6521739130435 dollars, it would take 20 hrs.
// At 60mph, it takes total 53.57142857142857 gallons, which cost $160.71428571428572 dollars. At 60mph it would take 25 hrs to complete 1500 miles
// At 55mph, it takes total 50 gallons, which cost $150 dollars. it would take 27.272727272727273 hrs.
// Travel at 55 - 60 mph makes sense.

// Log the results of your calculations using string concatenation or template literals.



// Part 3: Future Exploration
// In all of the problems above, there are two tools that would make it much easier to implement the logic we need and to reuse the code to test with different values:
// Control flow, which is how we conditionally determine what a program does next. For example, if we exceed our fuel budget, perhaps the program could automatically change the speed it is testing until it finds the optimal speed.
// Functions, which are reusable blocks of code, allow us to run pieces of code multiple times without rewriting the code or changing the value of variables in the code itself, like we needed to do above.
