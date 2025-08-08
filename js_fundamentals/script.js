// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

// Create a function named getLearnerData()
    // input: CourseInfo, AssignmentGroup, [LearnerSubmission]
    // output: an array of objects: [{ "id": number, "avg": number, <assignment_id>: number}]
                //   [{
                //   id: 125,
                //   avg: 0.985, // (47 + 150) / (50 + 150)
                //   1: 0.94, // 47 / 50
                //   2: 1.0 // 150 / 150
                // },
                // {
                //   id: 132,
                //   avg: 0.82, // (39 + 125) / (50 + 150)
                //   1: 0.78, // 39 / 50
                //   2: 0.833 // late: (140 - 15) / 150
                // }]
    // Converted to formular from provided data:
          // [{ LearnerSubmissions.find(submission.learner_id): Num, 
          //   "avg": total(LearnerSubmissions.find(submission.score) / total(AssignmentGroup.assignments.find(assignment.points_possible)),
          //   AssignmentGroup.assignments.find(assignment.id): LearnerSubmissions.find(submission.score) / AssignmentGroup.assignments.find(assignment.points_possible),
          //   AssignmentGroup.assignments.find(assignment.id): LearnerSubmissions.find(submission.score)/ AssignmentGroup.assignments.find(assignment.points_possible)}]
// If an AssignmentGroup does not belong to its course (mismatching course_id), should throw an error
// potential errors：Use try/catch and other logic to handle these types of errors 
    // What if points_possible is 0? 
    // What if a value that you are expecting to be a number is instead a string? 
// If an assignment is not yet due, do not include it in the results or the average.
// if the learner’s submission is late (submitted_at is past due_at), 
    // deduct 10 percent of the total points possible from their score for that assignment


function getLearnerData(course, ag, submissions) {
  // console.log(ag);
  // console.log(submissions);
  // console.log(course);
  // // Observed assisngments r array inside of object
  // // get assignment info: 

  // Map assignments by ID for easier lookup
  const assignmentsMap = ag.assignments.reduce((acc, assignment) => {
    acc[assignment.id] = assignment;
    return acc;
  }, {});
  // console.log(assignmentsMap); 


  let results = [];

  // most needed info is in submissions <- center of most operations
  // loop through submissions

  submissions.forEach(submission => {

    // Group learner submissions by learner_id
    const { learner_id, assignment_id, submission:{score}} = submission;
    const assignment = assignmentsMap[assignment_id];

    // Find or create the learner's result obj
    let result = results.find(result => result.id === learner_id);
    if (!result) {
      result = {
        id: learner_id, 
        avg: 0, ...Object.fromEntries(ag.assignments.map(a => [a.id, 0]))
      };
      results.push(result);
    }

    // calculate each assignment score (out of 1.0 scale)
    const assignmentMaxPoints = assignment.points_possible;

    // Penalty: 
    // if LearnerSubmissions.submission.submitted_at not due, not indclude it in the result or avg
    // if LearnerSubmissions.submission.submitted_at is late, Penalty = -10%(AssignmentGroup.assignments.points_possible)
    let today = new Date();
    let submissionDate = new Date(submission.submitted_at);
    let assignmentDueDate = new Date(assignment.due_at);
    let isLate = submissionDate > assignmentDueDate 
    let penalty = isLate ? 0.10 : 0;
    const scoreAfterLate = Math.max(0, score - (penalty*assignment.points_possible)); 
    
    // pevent divided by 0 by checking points_possible
    const scaledScore = assignment.points_possible === 0? 0 : scoreAfterLate/assignmentMaxPoints;
    
    // round to 3 decimal
    const roundedScore = parseFloat(scaledScore.toFixed(3));
    // store each assignment score
    result[assignment_id] = roundedScore;

    // update avg
    let totalScore = 0;
    let totalPossiblePoints = 0;

    results.forEach(result => {
      if (result.id === learner_id) {
        ag.assignments.forEach(a => {
          totalScore += result[a.id] * a.points_possible;
          totalPossiblePoints += a.points_possible;
        });
      }
    });
    result.avg = totalScore/totalPossiblePoints;
  });
  
  return results;
};


const results = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(results);
