# Grade Report System
- Generated a Grade Report System for every learners in the current courses, including:
    - Identified current existing learners,
    - Calculated the average of completed/late assigments for every learner,
    - Displayed the grade of each completed/late assignment.

```
// The desired result:
    [{
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }]
```
# Steps
Copy repository to your local file

```
git clone https://github.com/xiaochendev/labData.git
```

Change directory to specific SBA, ex. js_fundamentals
```
cd js_fundamentals
```

Check results by running .js 
```
node script.js
```

# Technology
- Javascript

# Reflection

Q: What could you have done differently during the planning stages of your project to make the execution easier?
- archicture functions before writing details code; explore datatypes and relationships between different tables

Q: Were there any requirements that were difficult to implement? What do you think would make them easier to implement in future projects?
- printed out exact same order like desired result; cuz first loop saved assignment result using array.push(); then did the arithemetic operations, later added avg to result. Would use Map if ordered is critical for the application

Q: What would you add to, or change about your application if given more time?
- Divided it into multiples small functions; it's more practical when handle large dataset or databases

Q: Use this space to make notes for your future self about anything that you think is important to remember about this process, or that may aid you when attempting something similar again:
- 