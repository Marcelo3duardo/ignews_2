import {FaGithub} from 'react-icons/fa'
import styles from './styles.module.scss'
import { FiX } from "react-icons/fi";



export function SingInButton(){
    const IsUserLoggedIn = true;
    return IsUserLoggedIn ? (
        <button 
        type="button" 
        className={styles.SingInButton}
        
        > 
        <FaGithub color="#04d361" />
        Marcelo
        <FiX color="#737380"  className={styles.closeIcon}/>
        </button>
        
    ):(
        <button 
        type="button" 
        className={styles.SingInButton}
        
        > 
        <FaGithub color="#eba417" />
        Sing in GitHub
        </button>
        
    );

}