import mongoose from "mongoose";

const reptileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    age: { type: Number, min: 0, required: true },
    isVenomous: { type: Boolean, default: false },
    habitat: {
      type: [String],       // reptile often live in mult. habitats
      enum: ["desert", "forest", "wetland", "grassland", "tropical", "aquatic"],
      required: true,
      validate: {             // Enum validation for habitat to restrict values
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "At least one habitat must be specified",
      },
    },
    maxElevation: { type: Number, min: 0 }, // optional/might useful, allow to track the maximum altitude a reptile can be found at (like mountain lizards)
    isAdopted: { type: Boolean, default: false },
    adoptionDate: { type: Date },
    adopterName: { type: String },
    adopterContact: { type: String },
    arrivalDate: { type: Date, required: true, default: Date.now },
    healthStatus: { type: String, default: "unknown" },
    vaccinated: { type: Boolean, default: false },
    microchipId: { type: String },
  },
  { timestamps: true }, 
);

export default mongoose.model("Reptile", reptileSchema);