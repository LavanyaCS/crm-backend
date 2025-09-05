const Case = require("../models/Case");

exports.createCase = async(req,res) => {
    try{
        const newCase = await Case.create({
            ...req.body,
            assigned_to:req.user._id
        });
        res.status(201).json(newCase);


    }
catch(err){
        res.status(500).json({message:err.message});
    }
}
exports.getCase = async(req,res) => {
    try{
        const getcase = await Case.find({assigned_to:req.user._id});
        if(!getcase){
            return res.status(404).json({message:"No case is found under this user"});
        }
        res.status(200).json(getcase)

    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}
exports.updateCase = async(req,res) => {
    try{
        const getcase = await Case.findOneAndUpdate({_id:req.params.id,assigned_to:req.user._id},req.body,{new:true});
        if(!getcase){
            return res.status(404).json({message:"No case is found under this user"});
        }
        res.status(200).json({message:"Case Updated Successfully",getcase})

    }
    
catch(err){
        res.status(500).json({message:err.message});
    }
}

exports.deleteCase = async(req,res) => {
    try{
        const getcase = await Case.findOneAndDelete({_id:req.params.id,assigned_to:req.user._id});
        if(!getcase){
            return res.status(404).json({message:"No case is found under this user"});
        }
        res.status(200).json({message:"Case Deleted successfully",getcase})


    }
       
catch(err){
        res.status(500).json({message:err.message});
    }

}