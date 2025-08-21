// //model a simple adventurer with basic properties such as health and an inventory. 
// // const adventurer = {
// //     name: "Ops",
// //     health: 10,
// //     inventory: ["sword", "potion", "artifact"],
// //     companion: {
// //         name: "Leo",
// //         type: "Cat",
// //     }
// // }

// // Next, give Ops’s feline friend a friend of his own:
//     // Add a “companion” sub-object to “Leo” with the following properties:
//     // The companion’s name is “Frank.”
//     // The companion’s type is “Flea.”
//     // The companion has its own belongings, which includes a small hat and sunglasses.
// const adventurer = {
//     name: "Ops",
//     health: 10,
//     inventory: ["sword", "potion", "artifact"],
//     companion: {
//         name: "Leo",
//         type: "Cat",
//         companion: {
//             name: "Frank",
//             type: "Flea",
//             belongings: ["hat", "sunglasses"]
//         }
//     },

//     roll (mod = 0) {
//         const result = Math.floor(Math.random() * 20) + 1 + mod;
//         console.log(`${this.name} rolled a ${result}.`)
//     }
// }

// // Part 2: Class Fantasy
// // Start with a Character class, which will define generic character entities. 
// // Ops and their companions all have a name, so the Character class should definitely include name as one of its properties. 
// // At this stage, we will also make the decision that every character should have health 
// // (which we will standardize to a maximum of 100, and an inventory (even if the inventory is empty).

// class Character {
//     constructor(name){
//         this.name = name;
//         this.health = 100;
//         this.inventory = [];
//     }

//     roll (mod = 0) {
//         const result = Math.floor(Math.random() * 20) + 1 + mod;
//         console.log(`${this.name} rolled a ${result}.`)
//     }
// }

// const Robbin = new Character("Robbin");
// Robbin.inventory = ["sword", "potion", "artifact"];
// Robbin.companion = new Character("Leo");
// Robbin.companion.type = "Cat";
// Robbin.companion.companion = new Character("Frank");
// Robbin.companion.companion.type = "Flea";
// Robbin.companion.companion.inventory = ["small hat", "sunglasses"];

// console.log(Robbin);
// // console.log(JSON.stringify(Ops));

// // Part 3: Class Features
// // Let’s begin by creating an Adventurer class. What attributes might be specific to an adventure, 
// // but that not all characters have? Take a look at our example below, and expand upon it with your own properties and methods.

// // class Adventurer extends Character{
// //     constructor(name, role) {
// //         super(name);
// //         // adventures have specific roles
// //         this.role = role;
// //         // every adventure starts w a bed and 50 gold coins
// //         this.inventory.push("bedroll", "50 gold coins")
// //     }
// //     // adventures have the ability to scount head of them
// //     scout(){
// //         console.log(`${this.name} is scouting ahead...`);
// //         super.roll();
// //     }

// // }

// // What else should an adventurer be able to do? What other properties should they have?
//     // Level – Adventurers often level up.
//     // Experience points (XP) – For tracking progress.
//     // Quests – A list of active quests.
//     // Abilities – Special actions or powers depending on role.
//     // gainXP() method – To increase XP and potentially level up.
//     // attack() method – Basic combat behavior.

// class Adventurer extends Character{
//     constructor(name, role) {
//         super(name);
//         // adventures have specific roles
//         this.role = role;
//         // every adventure starts w a bed and 50 gold coins
//         this.level = 1;
//         this.quests = [];
//         this.abilities = [];
//         this.inventory.push("bedroll", "50 gold coins")
//     }
//     // adventures have the ability to scount head of them
//     scout(){
//         console.log(`${this.name} is scouting ahead...`);
//         super.roll();
//     }
//     // leveling 
//     levelUp(amount) {
//         this.xp += amount;
//         console.log(`${this.name} gains ${amount} Xp`);
        
//         // when xp reached currentLv * 100
//         if (this.xp >= this.level * 100) {
//             // increase lv
//             this.level++;
//             // reset xp to 0
//             this.xp = 0;
//             console.log(`${this.name} has reached lv ${this.level}`)
//         }
//     }

//     attack(target){
//         const roll = this.roll();
//         console.log(`${this.name} attacks ${target.name} and rolls a ${roll}`);

//         if (roll > 10) {
//             target.health -= 10;
//             console.log(`${target.name} takes 10 damage! Health now at ${target.health}`);
//         } else {
//             console.log(`${this.name} misses the attack.`);
//         }
//     }
// }
// // Next, create a Companion class with properties and methods specific to the companions.
//     // Companions differ from adventurers in that:
//     // They don’t go on full quests, but support their partner.
//     // They have a type (e.g. Cat, Flea, Wolf).
//     // They might have loyalty or bond with their adventurer.
//     // Could have a trick() or assist() method.
// class Companion extends Character {
//     constructor(name, type, companion = null) {
//         super(name);
//         this.type = type;
//         this.companion = companion;
//         this.loyalty = 50  // out of 100
//     }

//     assist() {
//         console.log(`${this.name} the ${this.type} assists their adventurer!`);
//         return this.roll();
//     }

//     trick() {
//         console.log(`${this.name} performs a trick!`);
//         return this.roll() + 2;  // bonus for being clever or cute
//     }

//     incLoyalty(amount = 5) {
//         this.loyalty = Math.min(100, this.loyalty + amount);
//         console.log(`${this.name}'s loyalty increases to ${this.loyalty}`);
//     }
// }


// // Finally, change the declaration of Ops and the companions to use the new Adventurer and Companion classes.

// // Create Frank the flea
// const frank = new Companion("Frank", "Flea");
// frank.inventory = ["small hat", "sunglasses"];

// // Create Leo the cat with Frank as his companion
// const leo = new Companion("Leo", "Cat", frank);

// // Create Ops the adventurer with the role "Archer"
// const Ops = new Adventurer("Ops", "Archer");
// Ops.inventory.push("sword", "potion", "artifact");
// Ops.companion = leo;

// Ops.scout();                     // Ops is scouting ahead...
// leo.trick();                      // Leo performs a trick!
// Ops.attack(frank);              // Ops attacks Frank (poor flea...)
// Ops.levelUp(120);                // Level up!
// leo.incLoyalty();               // Increase Leo’s loyalty

// Part 4: Class Uniforms
// Using the static keyword:
    // Add a static MAX_HEALTH property to the Character class, equal to 100.
    class Character {
        static MAX_HEALTH = 100;
        constructor(name) {
            this.name = name;
            this.health = Character.MAX_HEALTH;
            this.inventory = [];
        }

        roll() {
            return Math.floor(Math.random() * 20) + 1;
        }
    }
    // Add a static ROLES array to the Adventurer class, with the values “Fighter,” “Healer,” and “Wizard.” Feel free to add other roles, if you desire!
    class Adventurer extends Character {
        static ROLES = ["Fighter", "Healer", "Wizard", "Archer", "Thief"];

        constructor(name, role) {
            if (!Adventurer.ROLES.includes(role)) {
            throw new Error(`Invalid role: "${role}". Must be one of: ${Adventurer.ROLES.join(", ")}`);
            }

            super(name);
            this.role = role;
            this.level = 1;
            this.xp = 0;
            this.quests = [];
            this.abilities = [];
            this.inventory.push("bedroll", "50 gold coins");
        }

        scout() {
            console.log(`${this.name} is scouting ahead...`);
            return this.roll();
        }

        gainXP(amount) {
            this.xp += amount;
            console.log(`${this.name} gains ${amount} XP!`);

            if (this.xp >= this.level * 100) {
            this.level++;
            this.xp = 0;
            console.log(`${this.name} has reached level ${this.level}!`);
            }
        }

        attack(target) {
            const roll = this.roll();
            console.log(`${this.name} attacks ${target.name} and rolls a ${roll}!`);
            if (roll > 10) {
            target.health -= 10;
            console.log(`${target.name} takes 10 damage! Health now at ${target.health}`);
            } else {
            console.log(`${this.name} misses the attack.`);
            }
        }
        // // Create an additional method, duel(), for the Adventurer class with the following functionality:
        // Accept an Adventurer as a parameter.
        duel(opponent) {
            console.log(`⚔️ Duel begins between ${this.name} and ${opponent.name}!`);

            while (this.health > 50 && opponent.health > 50) {
                    // Use the roll() functionality to create opposing rolls for each adventurer.
                const myRoll = this.roll();
                const theirRoll = opponent.roll();

                console.log(`🎲 ${this.name} rolls ${myRoll}, ${opponent.name} rolls ${theirRoll}`);

                if (myRoll > theirRoll) {
                    // Subtract 1 from the adventurer with the lower roll.
                opponent.health -= 1;
                console.log(`${this.name} wins the round! ${opponent.name} loses 1 health.`);
                } else if (theirRoll > myRoll) {
                this.health -= 1;
                console.log(`${opponent.name} wins the round! ${this.name} loses 1 health.`);
                } else {
                console.log("It's a tie! No damage dealt.");
                }

                // Log the results of this “round” of the duel, including the rolls and current health values.
                console.log(`❤️ ${this.name}: ${this.health} | ❤️ ${opponent.name}: ${opponent.health}\n`);
            }

            // Repeat this process until one of the two adventurers reaches 50 health.
            const winner = this.health > 50 ? this : opponent;
            // Log the winner of the duel: the adventurer still above 50 health.
            console.log(`🏆 ${winner.name} wins the duel!`);
        }

        // Fighter:
        powerStrike(target) {
        const roll = this.roll();
        if (roll > 15) {
            target.health -= 20;
            console.log(`${this.name} lands a massive blow!`);
        } else {
            console.log(`${this.name} misses the power strike.`);
        }
        }
        // Healer:
        heal(target) {
        target.health = Math.min(Character.MAX_HEALTH, target.health + 10);
        console.log(`${this.name} heals ${target.name} for 10 health!`);
        }
        // Wizard:
        castSpell(target) {
        const roll = this.roll();
        if (roll > 10) {
            target.health -= 15;
            console.log(`${this.name} casts a spell on ${target.name}!`);
        } else {
            console.log(`${this.name}'s spell fizzles.`);
        }
        }
        // 🐾 Companion Methods
        assistAttack() {
        const boost = this.roll() > 10 ? 1 : 0;
        console.log(`${this.name} assists their partner, providing ${boost} attack boost!`);
        return boost;
        }
}
    // // Add a check to the constructor of the Adventurer class that ensures the given role matches one of these values.
    // const robin = new Adventurer("Robin", "Archer");
    // robin.inventory.push("sword", "potion", "artifact");

    // const frank = new Companion("Frank", "Flea");
    // frank.inventory = ["small hat", "sunglasses"];

    // const leo = new Companion("Leo", "Cat", frank);
    // robin.companion = leo;

    // // static check by passing Clown role
    // const bob = new Adventurer("Bob", "Clown");  // Error: Invalid role: "Clown". Must be one of: Fighter, Healer, Wizard, Archer, Thief


// Are there other static properties or methods that make sense to add to these classes?

// Part 5: Gather your Party
// Sometimes, you need many objects of a class that have one or more shared property values. A common approach for creating many similar objects of a single class, and keeping track of them is creating a “factory.”
// Factories are classes that generate objects according to the factory’s instance properties.
// As an example, let’s look at how we might create many “healer” role adventurers using a factory:

class AdventurerFactory {  
  constructor (role) {
    this.role = role;
    this.adventurers = [];
  }
  generate (name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
  }
  findByIndex (index) {
    return this.adventurers[index];
  }
  findByName (name) {
    return this.adventurers.find((a) => a.name === name);
  }
}
// // create many “healers” using the healer factory, and conveniently find them using the factory’s methods.
// const healers = new AdventurerFactory("Healer");
// const robin = healers.generate("Robin");

// An alternative approach to this would be to extend the Adventurer class to create a Healer class. 
// This would be the practical approach if healers had additional properties and methods, 
// but if healers are just adventurers with a specific role, creating an entire class for them is inefficient

// prudent to create classes for each adventuring role, depending on the additional properties and methods you would like to add.

// Part 6: Developing Skills
// Many of the core features of these characters are now implemented, but the adventurers cannot  really do much yet. The only action (method) they have is scout().
// Create an additional method, duel(), for the Adventurer class with the following functionality:


const robin = new Adventurer("Robin", "Fighter");
const thorne = new Adventurer("Thorne", "Wizard");

robin.duel(thorne);

    // What other properties and methods could these classes have? Should fighters, healers, and wizards have their own methods? Should companions have specific methods?
    // subclass Fighter, Healer


    // choose to subclass (e.g. class Healer extends Adventurer) or handle this via a shared castRoleAbility(target) 
    // method that changes behavior based on the role value

// Part 7: Adventure Forth
// create other classes that can interact with your characters; perhaps more characters, but in a different direction from adventurers or companions – dragons, orcs, elves, vampires...

// create base class - creature inherited from character;
class Creature extends Character {
  constructor(name, species, alignment = "neutral") {
    super(name);
    this.species = species; // e.g. Dragon, Orc, Vampire
    this.alignment = alignment; // "hostile", "friendly", "neutral"
  }

  interact(target) {
    console.log(`${this.name} the ${this.species} interacts with ${target.name}.`);
  }
}

// Step 2: Create Specific Creature Classes, ex dragon, orc, elf, vampire
class Dragon extends Creature {
  constructor(name, color) {
    super(name, "Dragon", "hostile");
    this.color = color;
    this.fireBreathPower = 20;
  }

  breatheFire(target) {
    const roll = this.roll();
    console.log(`${this.name} breathes fire at ${target.name} with a roll of ${roll}`);
    if (roll > 10) {
      target.health -= this.fireBreathPower;
      console.log(`${target.name} takes ${this.fireBreathPower} fire damage!`);
    } else {
      console.log(`${this.name}'s fire breath misses!`);
    }
  }
}

class Orc extends Creature {
  constructor(name) {
    super(name, "Orc", "hostile");
    this.strength = 5;
  }

  smash(target) {
    const roll = this.roll();
    console.log(`${this.name} smashes ${target.name}! Roll: ${roll}`);
    if (roll > 8) {
      target.health -= this.strength;
      console.log(`${target.name} takes ${this.strength} damage.`);
    } else {
      console.log(`${this.name} misses the smash.`);
    }
  }
}

class Elf extends Creature {
  constructor(name, alignment = "friendly") {
    super(name, "Elf", alignment);
  }

  assistAttack() {
    const boost = this.roll() > 12 ? 2 : 0;
    console.log(`${this.name} (Elf) assists with an attack, boost: ${boost}`);
    return boost;
  }
}

class Vampire extends Creature {
  constructor(name) {
    super(name, "Vampire", "hostile");
    this.bitePower = 8;
  }

  bite(target) {
    const roll = this.roll();
    console.log(`${this.name} tries to bite ${target.name}! Roll: ${roll}`);
    if (roll > 10) {
      target.health -= this.bitePower;
      this.health += this.bitePower;
      console.log(`${this.name} drains ${this.bitePower} health from ${target.name}!`);
    } else {
      console.log(`${this.name} misses the bite.`);
    }
  }
}

const kevin = new Adventurer("Kevin", "Fighter");
const smaug = new Dragon("Smaug", "Red");
const gorg = new Orc("Gorg");
const elara = new Elf("Elara");
const drake = new Vampire("Drake");

smaug.breatheFire(kevin);
gorg.smash(kevin);
elara.assistAttack(); // Elven assist
drake.bite(kevin);


// You can also create classes for the inventory itself, and include inventory methods such as adding, removing, searching, selling, trading. Even individual items could be their own classes, and have properties and methods specific to the type of item.