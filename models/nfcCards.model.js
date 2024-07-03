const mongoose = require("mongoose");
const { Schema } = mongoose;

const nfcCardSchema = new Schema(
  {
    NFC_CardID: { type: String, required: true, unique: true }, // Primary key
    Date_delivrance: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

let NFC_Card = mongoose.model("NFC_Card", nfcCardSchema, "NFC_cards");

module.exports = NFC_Card;
