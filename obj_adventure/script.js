
//model a simple adventurer with basic properties such as health and an inventory. 
// const adventurer = {
//     name: "Robin",
//     health: 10,
//     inventory: ["sword", "potion", "artifact"],
//     companion: {
//         name: "Leo",
//         type: "Cat",
//     }
// }

// Next, give Robin’s feline friend a friend of his own:
    // Add a “companion” sub-object to “Leo” with the following properties:
    // The companion’s name is “Frank.”
    // The companion’s type is “Flea.”
    // The companion has its own belongings, which includes a small hat and sunglasses.
const adventurer = {
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"],
    companion: {
        name: "Leo",
        type: "Cat",
        companion: {
            name: "Frank",
            type: "Flea",
            belongings: ["hat", "sunglasses"]
        }
    },

    roll (mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`)
    }
}

// Part 2: Class Fantasy
// Start with a Character class, which will define generic character entities. 
// Robin and their companions all have a name, so the Character class should definitely include name as one of its properties. 
// At this stage, we will also make the decision that every character should have health 
// (which we will standardize to a maximum of 100, and an inventory (even if the inventory is empty).

class Character {
    
}