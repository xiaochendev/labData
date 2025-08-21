// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

// task: using a single function that takes an id parameter and returns a Promise that resolves to an object containing specific data associated with the user with the given id
// Retrieves and assembles complete user data
// @param {Number} id - user ID
// @return {Promise<Object>} - Object that containing merged user data

// using async/await
export async function getUserData(id) {

    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3
    }

    try {
        if (isNaN(id) || id < 0 || id > 10) throw new Error("incorrect input!");
        const centralReturn = await central(id);

        // const secureInfo = await vault(id);
        // const basicInfo = await dbs[centralReturn](id);
        const [basicInfo, secureInfo] = await Promise.all([
            dbs[centralReturn](id), 
            vault(id)
        ]);

        return {id, ...basicInfo, ...secureInfo};

    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
    }

}



// Test cases:
// getUserData(1);    // nothing showup unless use .then(console.log) or await
// console.log(await getUserData(2));
// getUserData(2).then(res => console.log(res)).catch(err => console.error(err));
// getUserData(2).then(console.log).catch(console.error);      // test db1
// getUserData(7).then(console.log).catch(console.error);      // test db2
// getUserData(8).then(console.log).catch(console.error);     // test db3

// getUserData(0).then(console.log).catch(console.error);      // invalid input id, test using 0
// getUserData(13).then(console.log).catch(console.error);     // invalid input id, test using 13

// getUserData("3").then(console.log).catch(console.error);      // invalid input type, test using string
// getUserData(true).then(console.log).catch(console.error);       // invalid input type, test using boolean


export function getUserDataChained(id) {
    const dbs = {
        db1: db1,
        db2: db2,
        db3: db3
    }

    if (isNaN(id) || id < 0 || id > 10) throw new Error("incorrect input!");

    return central(id)
        .then((dbValue) => Promise.all([dbs[dbValue](id), vault(id)]))
        .then(([basicInfo, secureInfo]) => ({ id, ...basicInfo, ...secureInfo }))
        .catch((err) => console.error(`❌ Error - ${err.message}`));

}


getUserDataChained(2).then(console.log).catch(console.error);      // test db1
