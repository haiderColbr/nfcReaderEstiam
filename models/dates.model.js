const mongoose = require("mongoose");
const { Schema } = mongoose;

const datesSchema = new Schema(
  {
    derniere_activation: { type: Date, default: Date.now },
    jour: { type: Number, required: true },
    mois: { type: Number, required: true },
    annee: { type: Number, required: true },
  },
  { timestamps: true }
);

let Dates = mongoose.model("Dates", datesSchema);

module.exports = Dates;
