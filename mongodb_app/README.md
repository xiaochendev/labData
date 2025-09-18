# Mongodb app
- 

# Steps
1. Copy rerepository to your local file
```
git clone https://github.com/xiaochendev/labData.git
```

2. Change to lab direcotry, ex. mongodb_app
```
cd mongodb_app
```
3. Create .env in mongodb_app dir
```
touch .env
```
4. Add variables in .env
```
MONGO_URI=<YOUR_MONGODB_COLLECTION_CONNECTION>
PORT=3000
```

5. Install all the required dependencies
```
npm install
```

6. Start the server
```
npm start
```

7. Add Seed-data into your mongodb First by visiting broswer
```
localhost:3000/api/animals/seed
```
- notes: Your supposed to see 'All animal data seeded successfully' if Your set MONGO_URI corretly in .env

8. Then, Its viewable in your browser by entering
```
localhost:3000
```

Notes: Install Extensions (Thunder Client or Postman) in Visual Studio allow you to test following APIs.

|  VERB |   PATH | QUERY PARAMS | DESCRIPTION |
|----------|----------|--------|------------------------------|
|  GET	|  


# Technologies
- Node.js
- Express.js
- mongoose


# Reflection
- What could you have done differently during the planning stages of your project to make the execution easier?
 NA
- Were there any requirements that were difficult to implement? What do you think would make them easier to implement in future projects?
  NA
- What would you add to or change about your application if given more time?
    NA
- Use this space to make notes for your future self about anything that you think is important to remember about this process, or that may aid you when attempting something similar again:
    NA