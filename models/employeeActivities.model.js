const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = new Schema(
  {
    userID: { type: Number }, // Assuming a unique identifier
    NFC_CardID: { type: String, ref: "NFC_Card" }, // Foreign key reference
    check_Out_Time: { type: Date, default: Date.now },
    check_In_Time: { type: Date, default: Date.now },
    date_expiration: { type: Date, default: Date.now },
    date_activation: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

let Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
