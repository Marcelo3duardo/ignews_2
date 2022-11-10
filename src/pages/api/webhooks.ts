import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream'

import Stripe from "stripe";
import { stripe } from "../../Services/stripe";
import { saveSubscription } from "./_lib/managerSubscription";

async function buffer(readable: Readable) {
    const chunks = [];

    for await (const chunk of readable) {
        chunks.push(
            typeof chunk === "string" ? Buffer.from(chunk) : chunk
        );
    }

    return Buffer.concat(chunks);
}

export const config = {
    api: {
        bodyParser: false,
    },
}

const relevantEvents = new Set([
    'checkout.session.completed'
])

export default async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const buf = await buffer(req)
        const secret = req.headers['stripe-signature'];

        let event: Stripe.Event

        try {
            event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_SECRET_KEY_WEBHOOKS);
        }
        catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
        }

        const type = event.type;
        try {
            if (relevantEvents.has(type)) {
                switch (type) {



                    case 'checkout.session.completed':
                        const checkoutSession = event.data.object as Stripe.Checkout.Session

                        await saveSubscription(
                            
                            checkoutSession.subscription.toString(),
                            checkoutSession.customer.toString()
                        )
                        console.log(' Subscription salved')

                        break;
                    default:
                        throw new Error('unhandled event.')
                        
                }
            }
        } catch (err) {
            //avisar o programador
            return res.json({ error: 'webhook handler failed.' })
        }


        res.status(200).json({ received: true })
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}