const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name:{type:String,required:true},
    contact_info:{type:String,required:true},
     status: { type: String, enum: ["active", "inactive"], default: "active" },
     userInfo:{
        type: mongoose.Schema.Types.ObjectId,ref:"User"
     }
});

const Customer = mongoose.model("Customer",customerSchema);
module.exports = Customer;