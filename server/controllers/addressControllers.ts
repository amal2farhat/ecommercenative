
import { Request, Response } from "express";
// import Cart from "../models/Cart.js";
// import Product from "../models/Products.js";
// import Order from "../models/Order.js";
import Address from "../models/Address.js";

export const getAddresses=async(req:Request,res:Response)=>{
    try {
      
        const addresses=await Address.find({user:req.user._id}).sort({isDefault:-1})

            res.json({success:true,data:addresses})   
        

    } catch (error:any) {
        res.status(500).json({success:false,message:error.message})
    }

}

export const addAddresses=async(req:Request,res:Response)=>{
    try {
        const {type,street,city,state,zipCode,country,isDefault}=req.body;
      
        if(isDefault){
            await Address.updateMany({user:req.user._id},{isDefault:false})
        }

        const newAddresses=await Address.create({user:req.user._id,type,street,city,state,
            zipCode,country,isDefault:isDefault || false})

            res.json({success:true,data:newAddresses})   
        

    } catch (error:any) {
        res.status(500).json({success:false,message:error.message})
    }

}

export const updateAddresses=async(req:Request,res:Response)=>{
    try {
        const {type,street,city,state,zipCode,country,isDefault}=req.body;
      let addressItem=await Address.findById(req.params.id)
      if(!addressItem){
         res.status(404).json({success:true,message:"Address not found"})   
      }
      if(addressItem?.user.toString() !== req.user._id.toString()){
return  res.json({success:false,message:"Not authorized"})   
      }
      if(isDefault){
        await Address.updateMany({user:req.user._id},{isDefault:false})
      }
    addressItem=await Address.findByIdAndUpdate(req.params.id,{type,street,city,state,
            zipCode,country,isDefault},{new:true})

         
            res.status(201).json({success:false,data:addressItem})   
        

    } catch (error:any) {
        res.status(500).json({success:false,message:error.message})
    }

}


export const deleteAddresses=async(req:Request,res:Response)=>{
    try {
        
      const address=await Address.findById(req.params.id)
      if(!address){
         res.status(404).json({success:true,message:"Address not found"})   
      }

      if(address?.user.toString() !== req.user._id.toString()){
return  res.json({success:false,message:"Not authorized"})   
      }
    await address?.deleteOne();
    
         
            res.status(201).json({success:false, message:"Address deleted"})   
        

    } catch (error:any) {
        res.status(500).json({success:false,message:error.message})
    }

}