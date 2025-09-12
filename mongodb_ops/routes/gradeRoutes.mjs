import express from "express";
import gradeCTRL from "../controllers/gradeController.mjs";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Create a GET route at /grades/stats
//     Within this route, create an aggregation pipeline that returns the following information:
//         The number of students with a weighted average (as calculated by the existing routes) higher than 70%.
//         The total number of students.
//         The percentage of students with an average above 70% (a ratio of the above two outputs).
// Create a GET route at /grades/stats/:id
//     Within this route, mimic the above aggregation pipeline, but only for students within a class that has a class_id equal to the specified :id.
// Create a single-field index on class_id.
// Create a single-field index on student_id.
// Create a compound index on student_id and class_id, in that order, both ascending.
// Create the following validation rules on the grades collection:
//     Each document must have a class_id field, which must be an integer between 0 and 300, inclusive.
//     Each document must have a student_id field, which must be an integer greater than or equal to 0.
// Change the validation action to "warn."


router
  .route("/")
  //  @route: GET /api/grades
  //  @desc: Get All Grades
  //  @access: Public
  .get(gradeCTRL.getAll)
  //  @route: POST /api/grades
  //  @desc: Create New Grade Entry
  //  @access: Public
  .post(gradeCTRL.createOne);

// router.route("/class").put(async (res, req) => {
//   let updateObj = {
//     $unset: { class_id: "" },
//   };
//   let grades = await db.collection("grades");
//   let result = await grades.deleteMany({}, updateObj);
//   console.log(result)
//   res.json(result);
// });

//  @route: /api/grades/:id
//  @desc: Get Grades by ID
//  @access: Public
router
  .route("/:id")
  .get(gradeCTRL.getById)
  //  @desc: Patch Add to scores array
  //  @access: Public
  .patch(gradeCTRL.addScoreToArray)
  .put(gradeCTRL.removeFromArray)
  .delete(gradeCTRL.deleteGrade);

//  @route: GET /api/grades/:id/student
//  @desc: Get Grades by student ID
//  @access: Public
router
  .route("/:id/student")
  .get(gradeCTRL.getByStudentId)
  .delete(gradeCTRL.deleteStudent);

//  @route: GET /api/grades/:id/class
//  @desc: Get Grades by class ID
//  @access: Public
router
  .route("/:id/class")
  .get(gradeCTRL.getByClassId)
  .delete(gradeCTRL.deleteClass);

//  @route: GET /api/grades/:classId/class/:studentId/student
//  @desc: Get Grades by class & student ID
//  @access: Public
router
  .route("/:classId/class/:studentId/student")
  .get(gradeCTRL.getByStudentClass);


 
  
export default router;