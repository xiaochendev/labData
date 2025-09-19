import express from "express";
import Mammal from "../models/mammalSchema.mjs";
const router = express.Router();
import { mammals } from '../data/data.mjs'; 

// //@route   GET /api/mammals/seed
// //@desc    Seed database with initial mammal data (usually disabled)
// //@access  Private (should be restricted in production)
// router
//   .route('/seed')
//   .get(async (req, res)=>{
//     try {
//       await Mammal.deleteMany({});     //optional just to clear out database before reloading new data, ensure data not repeated.
//       await Mammal.create(mammals);     //mongoose   
//       // await Mammal.insertMany(mammals);     //mongoDB driver way

//       res.send('data succesfully seeded');
//     } catch (error) {
//       console.error(error.message);
//     }
//   })

// @route   GET /api/mammals/habitat/:hab
// @desc    Get mammals by habitat
// @access  Public
router.get("/habitat/:hab", async (req, res) => {
  let result = await Mammal.inHabitat(req.params.hab);

  res.json(result);
});

// @route   GET /api/mammals/eco/:id
// @desc    Get mammals with similar habitat as mammal by ID
// @access  Public
router.get("/eco/:id", async (req, res) => {
  try {
    let animal = await Mammal.findById(req.params.id);

    let result = await animal.getOthersInHab();

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: `❌ Error - ${err.message}` });
  }
});

// @route   GET /api/mammals/avaiable
// @desc    Get all mammals available for adoption
// @access  Public
router
  .route("/avaiable")
  .get(async (req, res) => {
    try {
      const avaiableMammals = await Mammal.avaiableForAdoption();
      res.json(avaiableMammals);
    } catch (error) {
      console.error(err.message);
      res.status(500).json({ msg: `❌ Error - ${err.message}` });
    }
  })


// @route   POST /api/mammals
// @desc    Create a new mammal
// @access  Public (or Private if add auth)
router
  .route("/")
  .post(async (req, res) => {
    try {
      // Parse habitat string into array if it exists
      if (req.body.habitat) {
        req.body.habitat = req.body.habitat.split(",").map(h => h.trim());
      } else {
        req.body.habitat = [];
      }

      // Checkbox for adopted returns "on" if checked, so convert to boolean
      req.body.adopted = req.body.adopted === 'on';

      // Perform Action
      let newMammal = await Mammal.create(req.body);

      // Return Response
      // res.json(newMammal);
      req.flash("Success", "Mammal created successfully");
      res.redirect(`/api/mammals`);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: `❌ Error - ${err.message}` });
    }
  })
  // @route   GET /api/mammals
  // @desc    Get all mammals
  // @access  Public
  .get(async (req, res) => {
    try {
      let allMammals = await Mammal.find({});

      // res.json(allMammals);
      res.render("mammals", {mammals: allMammals });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: `❌ Error - ${err.message}` });
    }
  });


router
  .route("/:id")
  // @route   GET /api/mammals/:id
  // @desc    Get a mammal by ID
  // @access  Public (or Private if add auth)
  .get(async (req, res) => {
    try {
      const mammal = await Mammal.findById(req.params.id);

      if (!mammal){
        return res.status(404).render('404', { msg: 'Mammal not found' }); // optional 404 page
      }

      res.render('mammal', { mammal: mammal });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: `❌ Error - ${err.message}`});
    }
  })
  // @route   PUT /api/mammals/:id
  // @desc    Update a mammal by ID
  // @access  Public (or Private if add auth)
  .put(async (req, res) => {
    try {
      let updatedMammal = await Mammal.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Option to allow newly updated object to be sent back
      );

      res.json(updatedMammal);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: `❌ Error - ${err.message}` });
    }
  })
  // @route   DELETE /api/mammals/:id
  // @desc    Delete a mammal by ID
  // @access  Public (or Private if add auth)
  .delete(async (req, res) => {
    try {
      let deleteMammal = await Mammal.findByIdAndDelete(req.params.id);

      res.json(deleteMammal);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: `❌ Error - ${err.message}` });
    }
  });

export default router;