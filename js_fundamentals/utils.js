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
 console.log(`------JUST For Fun: combined data`);

function getCombinedData(course, ag, submissions) {
  let result = [];

  // get currentLearnerIDs
  let learnersIds = [...new Set(submissions.map(submission => submission.learner_id))];

  // acombined data based on currentLeaners;
  learnersIds.forEach( learnerId => {
    const learnerSubmissions = submissions.filter(submission => submission.learner_id === learnerId);

    const assignmentsForLearners = {
      learner_id: learnerId,
      course_name: course.name,
      assignment_group_name: ag.name,
      assignments: []
    };

    learnerSubmissions.forEach(submission => {
      const assignment = ag.assignments.find(assignment => assignment.id === submission.assignment_id);
      if (assignment) {
        assignmentsForLearners.assignments.push({
          assignment_id: assignment.id,
          assignment_name: assignment.name,
          assignment_due_date: assignment.due_at,
          points_possible: assignment.points_possible,
          submission: {
            submitted_at: submission.submission.submitted_at,
            score: submission.submission.score
          }
        });
      }
    });


    console.log(JSON.stringify(assignmentsForLearners, null, 2));
    return result;
  });
}

const result = getCombinedData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(JSON.stringify(result, null, 2));

console.log(`------JUST For Fun: combined data`)