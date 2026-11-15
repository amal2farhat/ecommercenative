
// import { Request, Response } from "express";
// import User from "../models/User.js";
// import Product from "../models/Products.js";
// import Order from "../models/Order.js";



// export const getDashboarsStats=async(req:Request,res:Response)=>{
//     try {
//         const totalUsers=await User.countDocuments()
//          const totalProduct=await Product.countDocuments()
//           const totalOrders=await Order.countDocuments()

//           const validOrders=await Order.find({orderStatus:{$ne:"cancelled"}});
//           const totalRevenue=validOrders.reduce((sum,order)=>sum + order.totalAmount,0)
//           const recentOrders=await Order.find().sort("-createdAt").limit(5)
//           .populate("user","name email");
//           res.json({success:true,data:{totalUsers,totalProduct,totalOrders,totalRevenue,recentOrders}})
//     } catch (error:any) {
//         res.status(500).json({success:false,message:error.message})
//     }
// }


import User from "../models/User.js";
import Product from "../models/Products.js";
import Order from "../models/Order.js";
import { Request, Response } from "express";

export const getDashboarsStats = async (req:Request,res:Response) => {
    try {
        const totalUsers = await User.countDocuments();

        const totalProducts = await Product.countDocuments();

        const totalOrders = await Order.countDocuments();

        const validOrders = await Order.find({
            orderStatus: { $ne: "cancelled" }
        });

        const totalRevenue = validOrders.reduce(
            (sum, order) => sum + (Number(order.totalAmount) || 0),
            0
        );

        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("user", "name email");

        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalProducts,
                totalOrders,
                totalRevenue,
                recentOrders
            }
        });

    } catch (error:any) {
        console.error("ADMIN STATS ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
