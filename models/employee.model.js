const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployeeActivitiesSchema = new Schema(
  {
    userID: { type: Number, required: true }, // Assuming a unique identifier
    NFC_CardID: { type: String, required: true, ref: "NFC_Card" }, // Foreign key reference
    check_Out_Time: { type: Date, default: Date.now },
    departement: { type: String, default: "" },
    id_dept: { type: Number, default: "" },
    role: { type: String, default: "" },
  },
  { timestamps: true }
);

let EmployeeActivities = mongoose.model(
  "employeeActivities",
  EmployeeActivitiesSchema
);

module.exports = EmployeeActivities;
