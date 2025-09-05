const Customer = require("../models/Customer");

exports.createCustomer = async(req,res) => {
    try{
        const newCustomer = await Customer.create({
            ...req.body,
            userInfo:req.user._id
        });
        res.status(201).json({
  message: "Customer created successfully",
  customer: newCustomer
});


    }
catch(err){
        res.status(500).json({message:err.message});
    }
}
exports.getCustomer = async(req,res) => {
    try{
        const customer = await Customer.find({userInfo:req.user._id});
        if(!customer || customer.length === 0){
            return res.status(404).json({message:"No customer is found under this user"});
        }
         res.status(200).json({
            message: "Customer list fetched successfully",
            customers: customer
        });

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

exports.updateCustomer = async(req,res) => {
    try{
        const customer = await Customer.findOneAndUpdate({_id:req.params.id,userInfo:req.user._id},req.body,{new:true});
        if(!customer){
            return res.status(404).json({message:"No customer is found under this user"});
        }
        res.status(200).json({message:"Customer Updated Successfully",customer})

    }
    
catch(err){
        res.status(500).json({message:err.message});
    }
}

exports.deleteCustomer = async(req,res) => {
    try{
        const customer = await Customer.findOneAndDelete({_id:req.params.id,userInfo:req.user._id});
        if(!customer){
            return res.status(404).json({message:"No customer is found under this user"});
        }
        res.status(200).json({message:"Customer Deleted successfully",customer})


    }
       
catch(err){
        res.status(500).json({message:err.message});
    }

}