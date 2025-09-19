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
    try {
      let allReptiles = await Reptile.find({});

    // res.json(getReptile);
      res.render("reptiles", { reptiles: allReptiles });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: `❌ Error - ${err.message}`});
    }
  })
  // @route POST /api/reptiles
  // @desc Create a reptile
  // @access Public
  .post(async (req, res) => {
    // let newReptile = await Reptile.create(req.body);
    // res.json(newReptile);
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
      let newReptile = await Reptile.create(req.body);

      // Return Response
      // res.json(newReptile);
      req.flash("Success", "Reptile created successfully");
      res.redirect(`/api/reptiles`);

    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: `❌ Error - ${err.message }`});
    }
  });

// @route GET /api/reptiles/:id
// @desc Get a reptile by id
// @access Public
router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const reptile = await Reptile.findById(req.params.id);
      
      if (!reptile){
        return res.status(404).render('404', { msg: 'Reptile not found' }); 
      }
      // res.json(reptile);
      res.render('reptile', { reptile: reptile });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: `❌ Error - ${err.message}`});
    }
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