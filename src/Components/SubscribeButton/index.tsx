import { signIn, useSession } from "next-auth/react";
import { api } from "../../Services/api";
import { getStripeJs } from "../../Services/stripe-js";
import styles from "./styles.module.scss"

interface subscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: subscribeButtonProps) {
    
    //const [session] = useSession();
    const { data: session } = useSession();

    async function handleSubscribe() {
        if (!session) {
            signIn('github')
            return;
        }

        try {
            const response = await api.post('/subscribe')
            /*
            const response = await api.post('/subscribe', {
                user: session
            })*/
            

            const { sessionId } = response.data

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({ sessionId: sessionId } )
        } catch (err) {
            alert(err.message);
        }
    }



    return (

        <button
            type="button"
            className={styles.SubscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>)
}