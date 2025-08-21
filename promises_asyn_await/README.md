# Promises or asyn/await 
- fetched users data from databases using given id
- implemented query func to fetch data from external databases by using promises and asyn/await

```
// Promise.all() runs all promises concurrently & will fail the once any of them fail, 
                // input and output are [], otherwise not iterable.
//  Promise.allSettled() run all promises concurrently and wai till all are fufilled OR rejected
//  Promise.any() runs all prmises concurrently and will take first successful promise
//  Promise.race() runs all promises concurrently and will reject/fufill based on first response back, 
                // returns a single Promise that settles with the eventual state of the first input promise that settles. 
```

# Steps
Copy repository to your local file

```
git clone https://github.com/xiaochendev/labData.git
```

Change directory to specific lab, ex. promises
```
cd promises_asyn_await/src
```

Check results by running .js ex. script.js 
```
node script.js
```


# Technologies
- Javascript
