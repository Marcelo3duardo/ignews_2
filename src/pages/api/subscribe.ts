import { NextApiRequest, NextApiResponse } from "next";

import { stripe } from "../../Services/stripe";
import { getSession, useSession } from 'next-auth/react'

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const session = await getSession({req})
        
        //const { data: session } = useSession()
        //const user = await req.body.user;

        const stripeCustomer = await stripe.customers.create({
            email: session.user.email,
            //metadata
        })


        //session.user

        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomer.id,
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            line_items: [
                { price: 'price_1Kfl3yFGYdwyE1tHH2tnLErf', quantity: 1 }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL,
        })

        return res.status(200).json({ sessionId: stripeCheckoutSession.id })
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}