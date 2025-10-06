#  Search a movie in OMDB
- allow user to search a movie in OMDB by different methods, ex. movie title, or star war characters
- displayed popular movies in OMDB

- Used third party APIs key: 
    1. Get FREE [OMDB_API_KEY](https://www.omdbapi.com/apikey.aspx)

# Steps
1. Copy rerepository to your local file
```
git clone https://github.com/xiaochendev/labData.git
```

2. Change direcotry to ex. react_web_app
```
cd react_web_app
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
