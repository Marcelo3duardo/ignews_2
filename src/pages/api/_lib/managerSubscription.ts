import { query as q } from 'faunadb'
import { fauna } from "../../../Services/fauna";
import { stripe } from '../../../Services/stripe';


export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createAction = false
) {
    // buscar usuário no faunadbKey
    // buscar ID do customerId

    //salvar os dados da subscription no faunadb

    //console.log(subscriptionId,customerId);
    console.log(subscriptionId, customerId);

    const userRef = await fauna.query(
        q.Select(
            "ref",
            q.Get(
                q.Match(
                    q.Index('user_by_stripe_customer_id'),
                    customerId
                )
            )
        )
    )

    //selecionei os dados do stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)


    const subscriptionData = {
        id: subscription.id,
        useID: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    }

    //salvando no fauna os importantes
    if (createAction) {
        await fauna.query(
            q.Create(
                q.Collection('subscriptions'),
                { data: subscriptionData }
            ),

        )
    } else {
        await fauna.query(
            q.Replace(
                q.Select(
                    'ref',
                    q.Get(
                        q.Match(
                            q.Index('subscription_by_id'),
                            subscription.id
                        )
                    )
                ),
                { data: subscriptionData }


            )
        )
    }
    //console.log(subscriptionData)



}
