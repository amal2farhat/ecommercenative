import mongoose from "mongoose";
import { Request, Response } from "express";
import { verifyWebhook } from "@clerk/express/webhooks";
import User from "../models/User.js";

export const clerkWebhooks = async (req: Request, res: Response) => {
    try {
        console.log("=================================");
        console.log("CLERK WEBHOOK RECEIVED");

        // Verify Clerk webhook signature
        const evt = await verifyWebhook(req);

        console.log("WEBHOOK VERIFIED:", evt.type);

        // User Created or Updated
        if (
            evt.type === "user.created" ||
            evt.type === "user.updated"
        ) {
            const clerkUser = evt.data;

            const email = clerkUser.email_addresses?.find(
                (item) => item.id === clerkUser.primary_email_address_id
            )?.email_address;

            if (!email) {
                console.error("User email not found");

                return res.status(400).json({
                    success: false,
                    message: "User email not found"
                });
            }

            const userData = {
                clerkId: clerkUser.id,
                email: email,
                name: [
                    clerkUser.first_name,
                    clerkUser.last_name
                ].filter(Boolean).join(" ") || "User",
                image: clerkUser.image_url
            };

            console.log("Saving user to MongoDB:", userData.clerkId);
console.log("MongoDB connection state:", mongoose.connection.readyState);
            // Create or Update User
            const user = await User.findOneAndUpdate(
                { clerkId: clerkUser.id },
                {
                    $set: userData,
                    $setOnInsert: {
                        role: "user"
                    }
                },
                {
                    new: true,
                    upsert: true,
                    runValidators: true
                }
            );

            console.log("USER SAVED SUCCESSFULLY:", user.email);
        }

        // User Deleted
        else if (evt.type === "user.deleted") {
            const deletedUser = await User.findOneAndDelete({
                clerkId: evt.data.id
            });

            console.log(
                deletedUser
                    ? "USER DELETED FROM MONGODB"
                    : "USER WAS NOT FOUND IN MONGODB"
            );
        }

        return res.status(200).json({
            success: true,
            message: "Webhook processed successfully"
        });

    } catch (error: any) {
        console.error("CLERK WEBHOOK ERROR:", error);

        return res.status(400).json({
            success: false,
            message: error.message || "Webhook verification failed"
        });
    }
};

// import {Request,Response} from 'express'
// import { verifyWebhook } from '@clerk/express/webhooks'
// import User from '../models/User.js'
// //https://dashboard.clerk.com/apps/app_3LHfRuCvZ1kEhR87lW5fwl0ja4e/instances/ins_3LHfRsBDAieJ7id24AsJyNQu1qv/webhooks
// //https://dashboard.clerk.com/apps/app_3LHfRuCvZ1kEhR87lW5fwl0ja4e/instances/ins_3LHfRsBDAieJ7id24AsJyNQu1qv/webhooks
// //end point :https://play.svix.com/in/3FkvG0BGsB2r0luI1xaZOA2e5rB/
// //whsec_mUZd/7Y04PoFN4jvmFGN7GLIr+BGVFeC
// export const clerkWebhooks=async (req:Request, res:Response) => {
//   try {
//     const evt = await verifyWebhook(req)
//     if(evt.type === 'user.created' || evt.type === 'user.updated' )
//     {
//       const user=await User.findOne({clerkId:evt.data.id})
//       const userData={
//         clerkId:evt.data.id,
//         email:evt.data?.email_addresses[0]?.email_address,
//         name:evt.data?.first_name + " " + evt.data?.last_name,
//         image:evt.data?.image_url 
//       }
//       if(user){
//         await User.findOneAndUpdate({clerkId:evt.data.id},userData)
//       }else{
//         await User.create(userData)
//       }
//     }
//     return res.json({success:true,})

//     // const { id } = evt.data
//     // const eventType = evt.type
//     // console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
//     // console.log('Webhook payload:', evt.data)

//     // res.send('Webhook received')
//   } catch (err) {
//     console.error('Error verifying webhook:', err)
//     res.status(400).send('Error verifying webhook')
//   }
// }