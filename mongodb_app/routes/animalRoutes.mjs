import express from 'express';

import Mammal from "../models/mammalSchema.mjs";
import Reptile from "../models/reptileSchema.mjs";
import Fish from "../models/fishSchema.mjs";
import Avian from "../models/avianSchema.mjs";

import { mammals, reptiles, fishes, avians } from '../data/data.mjs';

const router = express.Router();


// @route   GET /seed
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
        Avian.deleteMany({}),
      ]);
    
      // Seed data
      await Promise.all([
        Mammal.create(mammals),
        Reptile.create(reptiles),
        Fish.create(fishes),
        Avian.create(avians),
      ]);
    
      res.send('All animal data seeded successfully');
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Seeding failed');
    }
  });
// @route   GET /
// @desc    Get all animals across mammals, reptiles, and fish, avians in db
// @access  Public
router
    .route("/")
    .get(async (req, res) => {
        try {
          const [mammals, reptiles, fishes, avians] = await Promise.all([
            Mammal.find({}),
            Reptile.find({}),
            Fish.find({}),
            Avian.find({}),
          ]);
      
          const allAnimals = [...mammals, ...reptiles, ...fishes, ...avians];
      
          // res.json(allAvailable);
          res.render("home", {animals: allAnimals })
        } catch (err) {
          console.error(err.message);
          res.status(500).json({ msg: `❌ Error - ${err.message}` });
        }
    });


// @route   GET /available
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
            Avian.availableForAdoption(),
          ]);
      
          const allAvailable = [...mammals, ...reptiles, ...fish, ...avians];
      
          // res.json(allAvailable);
          res.render("available", { animals: allAvailable });
        } catch (err) {
          console.error(err.message);
          res.status(500).json({ msg: `❌ Error - ${err.message}` });
        }
    });

export default router;