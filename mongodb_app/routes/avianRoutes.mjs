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
    try {
      let allAvians = await Avian.find({});

    // res.json(allAvians);
      res.render("avians", { avians: allAvians });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: `❌ Error - ${err.message}`});
    }
  })
  // @route POST /api/avian
  // @desc Create a new avian
  // @access Public
  .post(async (req, res) => {
    // let newAvains = await Avian.create(req.body);
    // res.json(newAvains);
    try {
      // parse habitat string into array if exists 
      if (req.body.habitat) {
        req.body.habitat = req.body.habitat.split(",").map(h => h.trim());
      } else {
        req.body.habitat = [];
      }

      // Checkbox for adopted returns "on" if checked, so convert to boolean
      req.body.adopted = req.body.adopted === 'on';

      // Perform Action
      let newAvian = await Avian.create(req.body);

      // Return Response
      // res.json(newAvian);
      req.flash("Success", "Reptile created successfully");
      res.redirect(`/api/reptiles`);

    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: `❌ Error - ${err.message }`});
    }
  });

// @route GET /api/avians/:id
// @desc Geta avian by id
// @access Public
router
  .route("/:id")
  .get(async (req, res) => {
    // let avain = await Avian.findById(req.params.id);
    // res.json(avain);
    try {
      const avian = await Avian.findById(req.params.id);
      
      if (!avian){
        return res.status(404).render('404', { msg: 'Avian not found' }); 
      }
      // res.json(avian);
      res.render('avian', { avian: avian });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: `❌ Error - ${err.message}`});
    }
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