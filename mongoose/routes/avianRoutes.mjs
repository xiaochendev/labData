import express from "express";
import Avian from "../models/avianSchema.mjs";

const router = express.Router();

// Create
router
  .route("/")
  .get(async (req, res) => {
    let getAvains = await Avian.find({});
    res.json(getAvains);
  })
  .post(async (req, res) => {
    let newAvains = await Avian.create(req.body);
    res.json(newAvains);
  });

// Read
router
  .route("/:id")
  .get(async (req, res) => {
    let avain = await Avian.findById(req.params.id);
    res.json(avain);
  })
  .put(async (req, res) => {
    let updateAvian = await Avian.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      
    });

    res.json(updateAvian);
  })
  .delete(async (req, res) => {
    let deletedAvian = await Avian.findByIdAndDelete(req.params.id);

    if (!deletedAvian) res.json({ msg: "err doesnt exist" });
    else res.json(deletedAvian);
  });
// Update
// Delete

export default router;