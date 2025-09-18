import mongoose from "mongoose";

const avianSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    species: { type: String, required: true },
    breed: {                            // Subgroup within a species, Human selection
      type: String,
      required: function () {
        return this.domesticated === true;
      },
    },
    domesticated: { type: Boolean, default: false },      // wild bird not breed/domesticated
    age: { type: Number, min: 0, required: true },
    habitat: {
      type: [String],                   // "forest", "wetland", "urban", "grassland", "coastal", "mountain", "desert", "tundra",
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "At least one habitat must be specified",
      },
      required: true,
    },
    maxElevation: { type: Number, min: 0, required: true },
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

export default mongoose.model("Avian", avianSchema);