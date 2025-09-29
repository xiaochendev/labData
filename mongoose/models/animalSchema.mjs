import mongoose from "mongoose";

// want polymorphism or shared fields + unique fields

// E.g., find all animals over age 10, regardless of type
const animalSchema = new mongoose.Schema({
  name: String,
  species: String,
  age: Number,
  habitat: [String],
  animalClass: {
    type: String,
    required: true,
    enum: ["mammal", "fish", "avian", "reptile"]
  }
});

// Discriminator for mammals
const Animal = mongoose.model("Animal", animalSchema);
const Mammal = Animal.discriminator("Mammal", new mongoose.Schema({
  furColor: String
}));

const Fish = Animal.discriminator("Fish", new mongoose.Schema({
  waterType: String
}));


export default mongoose.model('Animal', animalSchema);