#  Movie Search
- allow user search movie by name via OMDB API.

# steps
1. Copy rerepository to your local file
```
git clone https://github.com/xiaochendev/labData.git
```

2. Change direcotry to ex. react_movie_search
```
cd react_movie_search
```

3. Create .env in the dir 
```
touch .env
```

4. Add variables in .env
```
VITE_OMDB_API_KEY=<YOUR_OMDB_API_KEY>
```

5. Install all the required dependencies
```
npm install
```

6. Start the frontend
```
npm run dev
```

7. Its viewable in your browser by entering

```
http://localhost:5173/
```

Notes: Install Extensions (Thunder Client or Postman) in Visual Studio allow you to test following APIs.

|  VERB |   PATH | QUERY PARAMS | DESCRIPTION |
|----------|----------|--------|------------------------------|
|  GET	|  

# Technologies
- React.js


# Reflections
- Errors during the process:
    - When tried to return/diplay movie details.get error,"cannot read property title of null", b/c React doesn't know to not render MovieDisplay until we have movie data, 
    - To fix this, Need to make sure movie data exists.
        - Make a loaded function that returns the JSX if the data exists.
        - Make a loading function that returns the JSX if it doesn't.
        - Use a ternary operator to determine which function we return.
    - Can't just make a call to getMovie in the body of the App component because it would create:
        - Make the fetch call...
        - Update the state...
        - Re-render the component...
        - Invoke getMovie again...
        - Create an infinite loop.
    - Is there a way to have something happen when a component loads without repeating on every render? Yes! useEffect


# NOTES:
# React Hooks: useState
-   must be imported from the `react` object at the top of the page
-   must be declared in the TOP LEVEL of the react component
-   must NOT be inside of control flow statements when declared
-   *** changes to state ALWAYS trigger a re-render of components who own that state
-   `setState` function updates the value of the state & triggers a rerender


## Steps to setup useState
1.  `import {useState} from 'react';`
2.  setUp useState boilerplate `const [ ] = useState();`
3.  create return values from useState `[state, setState]`


# useEffect
-   listens for values to change, before running a set piece of code
-   automate when certain functions are run
-   must be declared on the top level of a react component
-   2 arguments:
    -   callback function - the code you want to run
    -   dependency list (array) of values you want to 'listen' too - when you want to run it
            - runs after EVERY render if DON'T provide a dependency array.
            - runs ONLY once (after initial render) if provide an empty array [].
            - runs ONLY WHEN one or more dependencies change if provide them in the array — i.e., the effect watches these values, and if any change between renders, the effect runs again.
-   if `return` is present in setupfunciton, means cleanup function
    -   runs after a trigger of the useEffect before a rerun of the set up


## When will useEffect run its code?
-   callback function will ALWAYS run on first render
-   have NO dependency list
    - will run code block on EVERY render
-   has EMPTY dependency list
    -   will run ONLY on mount(first render)
    -   this is used to get data from DB
-   has values in dependency array
    -   run once on startup
    -   run once, everytime value changes