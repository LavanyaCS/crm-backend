const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
    status: { type: String, enum: ["Open", "In Progress", "Closed"], default: "Open" }
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });


const Case = mongoose.model("Case",caseSchema);
module.exports = Case;