import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from 'faunadb'
import { stripe } from "../../Services/stripe";
import { getSession, useSession } from 'next-auth/react'
import { fauna } from "../../Services/fauna";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    type User = {
        ref: {
            id: string;
        }
    }

    if (req.method === 'POST') {
        const session = await getSession({ req })
        //erro era no .env.local -> NEXTAUTH_SECRET
        //const { data: session } = useSession()
        //const user = await req.body.user;

        const stripeCustomer = await stripe.customers.create({
            email: session.user.email,
            //metadata
        })


        //atualizando user
        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                )
            )
        )

        await fauna.query(
            q.Update(
                q.Ref(
                    q.Collection('users'),
                    user.ref.id),
                {
                    data: { stripe_customer_id: stripeCustomer.id }
                },
            )
        )

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