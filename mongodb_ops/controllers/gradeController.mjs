import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

let getAll = async (req, res) => {
  // 1.   Choose Collection
  let grades = await db.collection("grades");

  // 2.   Perform an action
  let result = await grades.find({}).limit(10).toArray();

  // 3.   Return results
  res.json(result);
};

let createOne = async (req, res) => {
  let { class_id, student_id, scores } = req.body;

  if (class_id && student_id && scores) {
    let grades = await db.collection("grades");

    let result = await grades.insertOne({ scores, student_id, class_id });

    res.status(201).json(result);
  } else {
    res.status(400).json({ msg: "❌ Insufficient Data" });
  }
};

let getById = async (req, res) => {
  // Create filterable object
  let query = { _id: new ObjectId(req.params.id) };

  // Choose collection
  let grades = await db.collection("grades");

  // Perform acrion
  let results = await grades.find(query).toArray();

  // Return results
  if (results.length == 0) res.status(404).json({ msg: "❌ Grade Not Found!" });
  else res.json(results);
};

let getByLearnerId = async (req, res) => {
  let query = { student_id: Number(req.params.id) };

  // Choose collection
  let grades = await db.collection("grades");

  // Perform an action
  let results = await grades.find(query).limit(5).toArray();

  //Return the results
  if (results.length == 0)
    res.status(404).json({ msg: "❌ Learner Not Found" });
  else res.json(results);
};

let getByClassId = async (req, res) => {
  let query = { student_id: Number(req.params.id) };

  // Choose collection
  let grades = await db.collection("grades");

  // Perform an action
  let results = await grades.find(query).limit(5).toArray();

  //Return the results
  if (results.length == 0)
    res.status(404).json({ msg: "❌ Learner Not Found" });
  else res.json(results);
};

let getByLearnerClass = async (req, res) => {
  let query = {
    $and: [
      { class_id: Number(req.params.classId) },
      { student_id: Number(req.params.learnerId) },
    ],
  };

  let grades = await db.collection("grades");

  let results = await grades.find(query).limit(10).toArray();

  if (results.length == 0)
    res.status(404).json({ msg: `❌ Class/learner Not Found` });
  else res.json(results);
};

let addScoreToArray = async (req, res) => {
  let query = {
    _id: new ObjectId(req.params.id),
  };

  let updateObj = {
    $push: { scores: req.body },
  };

  // Choose collection
  let grades = await db.collection("grades");

  // Perform Action
  let result = await grades.updateOne(query, updateObj);

  // Return Results
  res.json(result);
};

let deleteGrade = async (req, res) => {
  let query = {
    _id: new ObjectId(req.params.id),
  };

  // Choose collection
  let grades = await db.collection("grades");

  let result = await grades.deleteOne(query);

  res.json(result);
};

let removeFromArray = async (req, res) => {
  let query = {
    _id: new ObjectId(req.params.id),
  };
  console.log(req.body);
  let updateObj = {
    $pull: { scores: req.body },
  };

  let grades = await db.collection("grades");

  let result = await grades.updateOne(query, updateObj);

  res.json(result);
};

let deleteLearner = async (req, res) => {
  let query = { student_id: Number(req.params.id) };

  let grades = await db.collection("grades");
  let result = await grades.deleteMany(query);

  res.json(result);
};

let deleteClass = async (req, res) => {
  let query = { class_id: Number(req.params.id) };

  let grades = await db.collection("grades");
  let result = await grades.deleteMany(query);

  res.json(result);
};

export default {
  getAll,
  createOne,
  getById,
  getByLearnerId,
  getByClassId,
  getByLearnerClass,
  addScoreToArray,
  deleteGrade,
  removeFromArray,
  deleteLearner,
  deleteClass,
};