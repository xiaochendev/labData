//  Promise.all() runs all promises concurrently & will fail the once any of them fail
//  Promise.allSettled() run all promises concurrently and wai till all are fufilled OR rejected
//  Promise.any() runs all prmises concurrently and will take first successful promise
//  Promise.race() runs all promises concurrently and will reject/fufill based on first response back, 
                // returns a single Promise that settles with the eventual state of the first input promise that settles. 

// splits its data across multiple databases. 
// assemble this information using a single function that takes an id parameter and returns a Promise that resolves to an object containing specific data.
// The object must contain the following information, which will be gathered from the databases:
// {
//     id: number,
//     name: string,
//     username: string,
//     email: string,
//     address: {
//       street: string,
//       suite: string,
//       city: string,
//       zipcode: string,
//       geo: {
//         lat: string,
//         lng: string
//       }
//     },
//     phone: string,
//     website: string,
//     company: {
//       name: string,
//       catchPhrase: string,
//       bs: string
//     }
// }
// central: There are too many users to store in a single database, so the central database identifies which database the users are stored within. 
// The central database will return a string that identifies which database to access for that particular user's information. You can access the central database like so:
// const returnedValue = await central(id);
// // or
// central(id).then((returnedValue) => { ... });

// db1, db2, and db3: fake limited databases, using id value between 1-10(inclusive)
// You can access these databases like so:
// const returnedValue = await db1(id);
// // or
// db1(id).then((returnedValue) => { ... }); 

// This is where the dbs object in the starter code can become useful. Using this object, you can access each database directly using the string returned from central by using square bracket notation, e.g.:
// dbs[valueReturnedFromCentral](id)

// vault: The personal data for each user is contained within the vault database since its access and usage is restricted by law. The vault will return an object with the user's name, email, address, and phone, and can be accessed like so:
// const returnedValue = await vault(id);
// // or
// vault(id).then((returnedValue) => { ... });

// Your task is to assemble this information using a single function that takes an id parameter and 
// returns a Promise that resolves to an object containing specific data associated with the user with the given id, as described above.
    // As an additional requirement, note that each database request takes 100ms to respond. 
    // However, your function must complete in 200ms or less. 
          // first, run central and vault in parralel using Promises.all(), which cost 100ms to respond
          // then, fetched from selected db(db1, db2, or db3), cost 100ms
          // total 200ms
    // Since there are three different databases, you must query; one might assume that the minimum time to do so would be 300ms, but that is not the case.
// test your code by passing it many different values for id, including:
//       Valid numbers – 1 through 10 (inclusive).
//       Invalid numbers – less than 1 or higher than 10.
//       Invalid data types – strings, Booleans, etc.


// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

// task: using a single function that takes an id parameter and returns a Promise that resolves to an object containing specific data associated with the user with the given id
// Retrieves and assembles complete user data
// @param {Number} id - user ID
// @return {Promise<Object>} - Object that containing merged user data

// using async/await
export async function getUserData(id) {
  //validated input
  if (typeof id !== "number" || id < 1 || id > 10) {
    throw new Error("Invalid inputs!");
  }

  // access central and vault in parallel using promise.all, cuz central stored db identifies which db the users are stored within; and vault stored users personal info
  const  [dbName, vaultData] = await Promise.all([
    central(id),
    vault(id)
  ])

  //get correct db function
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };
  const dbFunc = dbs[dbName];

  // if not found in dbs
  if (!dbFunc) {
    throw new Error(`unknow database ${dbName}`);
  }

  const dbData = await dbFunc(id);

  // merged and return data objctes
  return {
    id,
    db: dbName,
    ...vaultData,
    ...dbData
  };

}


// Test cases:
// getUserData(1);    // nothing showup unless use .then(console.log)
// getUserData(2).then(console.log).catch(console.error);      // test db1
// getUserData(7).then(console.log).catch(console.error);      // test db2
// getUserData(8).then(console.log).catch(console.error);     // test db3

// getUserData(0).then(console.log).catch(console.error);      // invalid input id, test using 0
// getUserData(13).then(console.log).catch(console.error);     // invalid input id, test using 13

// getUserData("3").then(console.log).catch(console.error);      // invalid input type, test using string
// getUserData(true).then(console.log).catch(console.error);       // invalid input type, test using boolean


// Alt appproach using Promise chaining via then() statements
export function getUserDataChaining(id){
  // check input 
  if (typeof id !== "number" || id < 0 || id > 10) {
    // used Promise.reject
    return Promise.reject(new Error("invalid inputs!!!"));
  }

  const dbs = { db1, db2, db3 };

  // first check central and valut dbs,
  return Promise.all([central(id), vault(id)])
    // get selected db, or user Personal info
    .then(([dbName, vaultData]) => {

      // 
      const db = dbs[dbName];

      // if db not found in current dbs, rejected request
      if (!db) {
        return Promise.reject(new Error(`Unknow Database ${dbName}`));
      }

      // otherwise return associated user data in given id;
      return db(id).then((dbData)=>({
        id,
        db: dbName,
        ...vaultData,
        ...dbData
      }));
    });
}

// getUserDataChaining(2)  //nothing showup unless use .then(console.log)
// getUserDataChaining(2).then(console.log)
// getUserDataChaining(2).then(console.log).catch(console.error);      // test db1
// getUserDataChaining(7).then(console.log).catch(console.error);      // test db2
// getUserDataChaining(8).then(console.log).catch(console.error);     // test db3


// getUserDataChaining(0).then(console.log)
// getUserDataChaining(0).then(console.log).catch(console.error);      // invalid input id, test using 0
// getUserDataChaining(13).then(console.log).catch(console.error);     // invalid input id, test using 13


// getUserDataChaining("3").then(console.log).catch(console.error);      // invalid input type, test using string
// getUserDataChaining(false).then(console.log).catch(console.error);       // invalid input type, test using boolean
