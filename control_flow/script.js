// Part 1: Growing Pains
// Your task is to create a program that advises a group of environmental scientists how to handle the growth and spread of a unique plant species under their supervision. You must develop a growth control system that will monitor and predict the plant growth, making decisions based on the available space and potential growth.
// Here is the information you have been given:
    // The area in which the plants are contained is circular, with a radius of 5 meters.
        // The formula for calculating the area of a circle is PI multiplied by the radius, squared:
            // const PI = 3.1415;
            // const area = PI * radius * radius;
    // Each plant requires a minimum space of 0.8 square meters.
    // The area is starting with 20 plants.
    // The plants double in number every week.
const RADIUS = 5;   
const PI = 3.1415;
const GARDEN_AREA = PI * RADIUS * RADIUS;
const AREA_PER_PLANT = 0.8;

let nums_of_plants = 20;

// Using this information, your objectives are to:
// Predict the plant growth after a specific number of weeks.
// Implement control flow to make decisions on whether the plants should be:
    // Pruned, to stop them from exceeding the capacity of the garden.
         // This condition should be met if the plant count after the given number of weeks is greater than 80% of the maximum capacity of the garden.
        const BASE = 2;
        let weeks = 0;
        let max_capacity = GARDEN_AREA * 0.8;

        function current_capacity(weeks) {
            let current_capacity = 0;
            return current_capacity = AREA_PER_PLANT * nums_of_plants * BASE ** weeks;
        };

        function prune(current_capacity) {
            if (current_capacity < max_capacity) {
                console.log(`Kept pruning. Current capacity is ${current_capacity} Not yet reach limit`)
            } else {
                console.log(`Stop Pruned, Reached 80% capacity: ${current_capacity}`);
            };
        };

    // Monitored, if they are growing at an acceptable rate.
        // This condition should be met if the plant count is between 50% and 80% of the maximum capacity of the garden after the given number of weeks.
        let min_capacity = GARDEN_AREA * 0.5;
        function monitor(current_capacity){
            let res_from_monitor = ``;
            if (current_capacity < min_capacity) {
                return res_from_monitor.concat(`Less than 50%, something wrong`);
            } else if (current_capacity > max_capacity) {
                return res_from_monitor.concat(`Great Job. Plant grow faster than expected`);
            } else { return res_from_monitor.concat(`Nice and steady. Planting is growing correctly`);
            };
        };

    // Planted, if there is room to plant more plants.
        // This condition should be met if the plant count after the given number of weeks is less than 50% of the maximum capacity of the garden.
        function plant(res_from_monitor) {
            if (res_from_monitor == 'Less than 50%, something wrong') {
                console.log(`Stop planted`);
            } else {
                console.log(`Kept planting, extra room provided`);
            };
        };

// Within your submission, include the results for 1, 2, and 3 weeks of growth as inputs.
console.log(`current capacity for 1 week is ${current_capacity(1)}, Prune status: ${prune(current_capacity)}, monitor status: ${monitor(current_capacity)}, Plant status: ${plant(monitor(current_capacity))}`);
console.log(`current capacity for 2 weeks is ${current_capacity(2)}, Prune status: ${prune(current_capacity)}, monitor status: ${monitor(current_capacity)}, Plant status: ${plant(monitor(current_capacity))}`);
console.log(`current capacity for 3 weeks is ${current_capacity(3)}, Prune status: ${prune(current_capacity)}, monitor status: ${monitor(current_capacity)}, Plant status: ${plant(monitor(current_capacity))}`);


// Part 2: Thinking Bigger
// The conservation area in which the garden is located has multiple other gardens. 
// Using the logic you have already created, determine:
// The amount of additional space that would be required if the scientists were to start with 100 plants, and did not prune them for 10 weeks.


// If the space remained circular, what would be the radius of this expanded garden?


// Part 3: Errors in Judgement
// The scientists decided not to listen to your recommendations, and have instead started with 100 plants in the original 5-meter-radius garden.
// Use try and catch to wrap your work in an error-handling block. If the amount of space required to hold the originally provided number of plants exceeds the amount of space available, throw a new error and log an appropriate message.