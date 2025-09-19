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
    // let getFish = await Fish.find({});
    // res.json(getFish);
    try {
      let allFishes = await Fish.find({});

    // res.json(allFishes);
      res.render("fishes", { fishes: allFishes });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: `❌ Error - ${err.message}`});
    }
  })
  // @route POST /api/fishes
  // @desc Create a new fish
  // @access Public
  .post(async (req, res) => {
    // let newFish = await Fish.create(req.body);
    // res.json(newFish);
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
      let newFish = await Fish.create(req.body);

      // Return Response
      // res.json(newFishes);
      req.flash("Success", "Reptile created successfully");
      res.redirect(`/api/fishes`);

    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: `❌ Error - ${err.message }`});
    }
  });

// @route GET /api/fishes/:id
// @desc Get a fish by id
// @access Public
router
  .route("/:id")
  .get(async (req, res) => {
    // let fish = await Fish.findById(req.params.id);
    // res.json(fish);
    try {
      const fish = await Fish.findById(req.params.id);
      
      if (!fish){
        return res.status(404).render('404', { msg: 'Reptile not found' }); 
      }
      // res.json(fish);
      res.render('fish', { fish: fish });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: `❌ Error - ${err.message}`});
    }
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