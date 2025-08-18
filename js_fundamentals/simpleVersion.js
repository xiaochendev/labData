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


function getLearnerData(course, ag, submissions) {
  // console.log("ag:", ag); 
  // console.log("submission:", submissions); 
  // console.log("course:", course);
  const result = [];
  try {
    if (course.id !== ag.course_id) 
        throw `Course error: Incorrect assignments`;

    for (let sub of submissions) {
        let learner = getLearner(sub.learner_id, result);
        let assignment = getAssignment(sub.assignment_id, ag.assignments);
        let score = getScore(sub, assignment);

        addToDb(learner, score, sub.assignment_id);
    }

    formatDb(result);

  } catch (error) {
    console.log(`❌ Error - ${error}`);
  }


  return result;
}
const results = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(results);


// Helper functions ----|
function getLearner(id, db){
    let learner = db.find(entry => entry.id === id);
    if (!learner) {
        learner = {
            id: id,
            avg: 0,
            totalPP: 0,
            totalReceived: 0
        };

        db.push(learner);
    }
    return learner;
    // let learner = null;

    // if (db.length === 0) {
    //     learner = {
    //         "id": id,
    //         "avg": 0,
    //         "totalPP": 0,
    //         "totalReceived": 0
    //     };

    //     db.push(learner);
    //     return learner;
    // } else {
    //         for (let entry of db) {
    //             if (entry.id == id) {
    //                 learner = entry;
    //             }
    //         }
    //         if (!learner) {
    //             let learner = {
    //                 "id": id,
    //                 "avg": 0,
    //                 "totalPP": 0,
    //                 "totalReceived": 0
    //             };
    //             db.push(learner);
    //         }
    //         return learner;
    // }
}

function getAssignment(assId, assArray) {
    // console.log(assId)
    // console.log(assArray)
    // for (let ass of assArray) {
    //     if (assId == ass.id) {
    //         return ass;
    //     }
    // }
    return assArray.find(ass => ass.id === assId);
}

function getScore(sub, ass) {
    // console.log(sub, ass);
    // see if assignment is early late on time
    // calculate grade
    // return score

    let time = checkTime(sub.submission.submitted_at, ass.due_at);
    // console.log(time);
    let score = calculateGrade(time, sub.submission.score, ass.points_possible);
    return score;
}

function checkTime(subTime, dueDate) {
    // let today = [2025, 1, 1];

    // subTime = subTime.split('-');
    // dueDate = dueDate.split('-');

    // if (today[0] > dueDate[0]) return 'notDue';

    // for ( let i=0; i<dueDate.length; i++) {
    //     // console.log(subTime[i], dueDate[i]);
    //     if(Number(subTime[i]) > Number(dueDate[i])){
    //         return 'late';
    //     }
    // }
    // return 'on-time';
    const today = new Date("2025-01-01");
    const submission = new Date(subTime);
    const due = new Date(dueDate);

    if (due > today) return "notDue";
    if (submission > due) return "late";
    return "on-time";
}

function calculateGrade(time, score, pp) {
    // console.log('time.', time);
    // console.log('score.', score);
    // console.log('pp.', pp);
    switch (time) {
        case "notDue":
            return "notDue";
        case "on-time":
            return { score: score / pp, pointsReceived: score, pp: pp };
        case "late":
            const adjustedScore = 0.9 * score;
            return { score: adjustedScore / pp, pointsReceived: adjustedScore, pp: pp };
        default:
            throw `validation error: incorrect time input`;
    }
}

function addToDb(learner, score, id) {
    if (score === 'notDue') {
        return;
    } else {
        learner.totalPP += score.pp;
        learner.totalReceived += score.pointsReceived;
        learner[id] = Number(score.score.toFixed(3));
    }
}


function formatDb(db) {
    for (let learner of db) {
        learner.avg = Number((learner.totalReceived / learner.totalPP).toFixed(3));
        delete learner.totalPP;
        delete learner.totalReceived;
    }
}