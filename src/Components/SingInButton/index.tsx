import { FaGithub } from 'react-icons/fa'
import styles from './styles.module.scss'
import { FiX } from "react-icons/fi";
import { signIn,signOut,useSession } from "next-auth/react"


export function SingInButton() {
    const {data:session} =useSession()
    
    console.log(session)
    return session ? (
        <button
            type="button"
            className={styles.SingInButton}
            onClick={() => signOut()}
        >
            <FaGithub color="#04d361" />
            {session.user.name}
            <FiX color="#737380" className={styles.closeIcon} />
        </button>

    ) : (
        <button
            type="button"
            className={styles.SingInButton}
            onClick={() => signIn('github')}
        >
            <FaGithub color="#eba417" />
            Sing in GitHub
        </button>

    );

}
