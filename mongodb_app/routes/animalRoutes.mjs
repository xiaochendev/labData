import express from 'express';

import Mammal from "../models/mammalSchema.mjs";
import Reptile from "../models/reptileSchema.mjs";
import Fish from "../models/fishSchema.mjs";

const router = express.Router();


// @route   GET /api/animals/seed
// @desc    Seed database with initial data for all animals (mammals, reptiles, fish)
// @access  Private (should be restricted in production)
router
  .route('/seed')
  .get(async (req, res) => {
    try {
      // Clear existing data first (optional)
      await Promise.all([
        Mammal.deleteMany({}),
        Reptile.deleteMany({}),
        Fish.deleteMany({}),
      ]);
    
      // Seed data
      await Promise.all([
        Mammal.create(mammals),
        Reptile.create(reptiles),
        Fish.create(fish),
      ]);
    
      res.send('All animal data seeded successfully');
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Seeding failed');
    }
  });


// @route   GET /api/animals/available
// @desc    Get all available animals across mammals, reptiles, and fish
// @access  Public
router
    .route("/available")
    .get(async (req, res) => {
        try {
          const [mammals, reptiles, fish] = await Promise.all([
            Mammal.availableForAdoption(),
            Reptile.availableForAdoption(),
            Fish.availableForAdoption(),
          ]);
      
          const allAvailable = [...mammals, ...reptiles, ...fish];
      
          res.json(allAvailable);
        } catch (err) {
          console.error(err.message);
          res.status(500).json({ msg: `❌ Error - ${err.message}` });
        }
    });

export default router;