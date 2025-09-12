# Aggregations, Indexes, and Validation
- 

# Steps
1. Copy rerepository to your local file
```
git clone https://github.com/xiaochendev/labData.git
```

2. Change to lab direcotry, ex. mongodb_ops
```
cd mongodb_ops
```

3. Install all the required dependencies
```
npm install
```

4. Start the server
```
npm start
```

5. Its viewable in your browser by entering
```
localhost:3000
```

Notes: Install Extensions (Thunder Client or Postman) in Visual Studio allow you to test following APIs.

|  VERB |   PATH | QUERY PARAMS | DESCRIPTION |
|----------|----------|--------|------------------------------|
|  GET	|  /api/grades	|  —	|  Get all grades   |  
|  POST	|  /api/grades	|  —	|  Create new grade entry   |  
|  GET	|  /api/grades/:id	|  id	|  Get grade by grade ID    |  
|  PATCH|  	/api/grades/:id	|  id	|  Add to scores array  |
|  PUT	|  /api/grades/:id	|  id	|  Remove from scores array |  
|  DELETE|  /api/grades/:id	|  id	|  Delete grade by ID   |  
|  GET	|  /api/grades/:id/student	|  id	|  Get grades by student ID |  
|  DELETE|  /api/grades/:id/student	|  id	|  Delete grades by student ID  |  
|  GET	|  /api/grades/:id/class	|  id	|  Get grades by class ID   |  
|  DELETE|  /api/grades/:id/class	|  id	|  Delete grades by class ID    |  
|  GET	|  /api/grades/:classId/class/:studentId/student	|  classId, studentId	|  Get grades by class and student ID|  

# Technologies
- Node.js
- Express.js
- MongoDB


