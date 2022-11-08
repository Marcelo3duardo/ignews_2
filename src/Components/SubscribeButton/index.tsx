import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss"

interface subscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: subscribeButtonProps) {
    const {data:session} = useSession();

    function handleSubscribe() {
        if(!session){
            signIn('github')
            return;
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