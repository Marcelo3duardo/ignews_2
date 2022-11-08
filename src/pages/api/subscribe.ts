import { NextApiRequest, NextApiResponse } from "next";
import { env } from "process";
import { stripe } from "../../Services/stripe";
import { getSession } from 'next-auth/react'

export default async(req: NextApiRequest,res:NextApiResponse) => {

    if (req.method == 'POST'){
        const session = await getSession({req})
        
        const stripecumstumer = await stripe.customers.create({
            email: session.user.email,
            //metadata
        })

        session.user

        const stripeCheckoultSession = await stripe.checkout.sessions.create({
            customer:stripecumstumer.id,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items:[
                {price: 'price_1Kfl3yFGYdwyE1tHH2tnLErf',quantity: 1}
            ],
            mode: 'subscription',
            allow_promotion_codes:true,
            success_url: process.env.STRIPI_SUCCESS_URL,
            cancel_url: process.env.STRIPI_CANCEL_URL,
        })

        return res.status(200).json({sessionId: stripeCheckoultSession.id})
    } else{
        res.setHeader('Allow','POST')
        res.status(405).end('Method not allowed')
    }
}