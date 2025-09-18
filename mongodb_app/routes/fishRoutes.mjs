import express from "express";
import Fish from "../models/fishSchema.mjs";

const router = express.Router();
import { fishes } from '../data/data.mjs'; 

// @route GET /api/fishes
// @desc Get all fishes
// @access Public
router
  .route("/")
  .get(async (req, res) => {
    let getFish = await Fish.find({});
    res.json(getFish);
  })
  // @route POST /api/fishes
  // @desc Create a new fish
  // @access Public
  .post(async (req, res) => {
    let newFish = await Fish.create(req.body);
    res.json(newFish);
  });

// @route GET /api/fishes/:id
// @desc Get a fish by id
// @access Public
router
  .route("/:id")
  .get(async (req, res) => {
    let fish = await Fish.findById(req.params.id);
    res.json(fish);
  })
  // @route PUT /api/fishes/:id
  // @desc Update a fish by id
  // @access Public
  .put(async (req, res) => {
    let updateFish = await Fish.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      
    });

    res.json(updateFish);
  })
  // @route DELETE /api/fishes/:id
  // @desc Delete a fish by id
  // @access Public
  .delete(async (req, res) => {
    let deletedFish = await Fish.findByIdAndDelete(req.params.id);

    if (!deletedFish) res.json({ msg: "err doesnt exist" });
    else res.json(deletedFish);
  });


export default router;