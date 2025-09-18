import express from "express";
import Reptile from "../models/reptileSchema.mjs";

const router = express.Router();
import { reptiles } from '../data/data.mjs'; 

// @route GET /api/reptiles
// @desc Get all reptiles
// @access Public
router
  .route("/")
  .get(async (req, res) => {
    let getReptile = await Reptile.find({});
    res.json(getReptile);
  })
  // @route POST /api/reptiles
  // @desc Create a reptile
  // @access Public
  .post(async (req, res) => {
    let newReptile = await Reptile.create(req.body);
    res.json(newReptile);
  });

// @route GET /api/reptiles/:id
// @desc Get a reptile by id
// @access Public
router
  .route("/:id")
  .get(async (req, res) => {
    let reptile = await Reptile.findById(req.params.id);
    res.json(reptile);
  })
  // @route UPDATE /api/reptiles/:id
  // @desc Update a reptile by id
  // @access Public
  .put(async (req, res) => {
    let updateReptile = await Reptile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      
    });

    res.json(updateReptile);
  })
  // @route DELETE /api/reptiles/:id
  // @desc Delete a reptile by id
  // @access Public
  .delete(async (req, res) => {
    let deletedReptile = await Reptile.findByIdAndDelete(req.params.id);

    if (!deletedReptile) res.json({ msg: "err doesnt exist" });
    else res.json(deletedReptile);
  });


export default router;