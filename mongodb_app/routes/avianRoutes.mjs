import express from "express";
import Avian from "../models/avianSchema.mjs";

const router = express.Router();
import { avians } from '../data/data.mjs'; 


// @route GET /api/avians
// @desc Get all avians
// @access Public
router
  .route("/")
  .get(async (req, res) => {
    let getAvains = await Avian.find({});
    res.json(getAvains);
  })
  // @route POST /api/avian
  // @desc Create a new avian
  // @access Public
  .post(async (req, res) => {
    let newAvains = await Avian.create(req.body);
    res.json(newAvains);
  });

// @route GET /api/avians/:id
// @desc Geta avian by id
// @access Public
router
  .route("/:id")
  .get(async (req, res) => {
    let avain = await Avian.findById(req.params.id);
    res.json(avain);
  })
  // @route PUT /api/avians/:id
  // @desc Update a avian by id
  // @access Public
  .put(async (req, res) => {
    let updateAvian = await Avian.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      
    });

    res.json(updateAvian);
  })
  // @route DELETE /api/avians/:id
  // @desc Delete a avian by id
  // @access Public
  .delete(async (req, res) => {
    let deletedAvian = await Avian.findByIdAndDelete(req.params.id);

    if (!deletedAvian) res.json({ msg: "err doesnt exist" });
    else res.json(deletedAvian);
  });

export default router;