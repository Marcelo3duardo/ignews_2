import Head from "next/head";
import styles from "./styles.module.scss"

export default function Posts() {
    return (
        <>
            <Head>
                <title> Post | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.post_list}>
                    <a href="#">
                        <time> 23 nov 2022</time>
                        <strong>Marcelo esta estudando</strong>
                        <p>
                            Umas das funcionalidades que está na moda em Blogs e Sites é o Dark Mode.
                            Devs, em sua maioria, curtem bastante utilizar temas escuros, tanto na IDE
                            quanto em outros apps.
                        </p>
                    </a>
                    <a href="#" >
                        <time> 23 nov 2022</time>
                        <strong>Marcelo esta estudando</strong>
                        <p>
                            Umas das funcionalidades que está na moda em Blogs e Sites é o Dark Mode.
                            Devs, em sua maioria, curtem bastante utilizar temas escuros, tanto na IDE
                            quanto em outros apps.
                        </p>
                    </a>
                    <a href="#">
                        <time> 23 nov 2022</time>
                        <strong>Marcelo esta estudando</strong>
                        <p>
                            Umas das funcionalidades que está na moda em Blogs e Sites é o Dark Mode.
                            Devs, em sua maioria, curtem bastante utilizar temas escuros, tanto na IDE
                            quanto em outros apps.
                        </p>
                    </a>
                </div>
            </main>

        </>
    );
}