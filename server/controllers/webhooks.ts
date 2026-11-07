import {Request,Response} from 'express'
import { verifyWebhook } from '@clerk/express/webhooks'
import User from '../models/User.js'
//https://dashboard.clerk.com/apps/app_3LHfRuCvZ1kEhR87lW5fwl0ja4e/instances/ins_3LHfRsBDAieJ7id24AsJyNQu1qv/webhooks
//https://dashboard.clerk.com/apps/app_3LHfRuCvZ1kEhR87lW5fwl0ja4e/instances/ins_3LHfRsBDAieJ7id24AsJyNQu1qv/webhooks
//end point :https://play.svix.com/in/3FkvG0BGsB2r0luI1xaZOA2e5rB/
//whsec_mUZd/7Y04PoFN4jvmFGN7GLIr+BGVFeC
export const clerkWebhooks=async (req:Request, res:Response) => {
  try {
    const evt = await verifyWebhook(req)
    if(evt.type === 'user.created' || evt.type === 'user.updated' )
    {
      const user=await User.findOne({clerkId:evt.data.id})
      const userData={
        clerkId:evt.data.id,
        email:evt.data?.email_addresses[0]?.email_address,
        name:evt.data?.first_name + " " + evt.data?.last_name,
        image:evt.data?.image_url 
      }
      if(user){
        await User.findOneAndUpdate({clerkId:evt.data.id},userData)
      }else{
        await User.create(userData)
      }
    }
    return res.json({success:true,})

    // const { id } = evt.data
    // const eventType = evt.type
    // console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    // console.log('Webhook payload:', evt.data)

    // res.send('Webhook received')
  } catch (err) {
    console.error('Error verifying webhook:', err)
    res.status(400).send('Error verifying webhook')
  }
}