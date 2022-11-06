
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../Components/SubscribeButton'
import { stripe } from '../Services/stripe'
import styles from './home.module.scss'

interface HomeProps{
  product:{
    priceId: string;
    amount: number;
  }
}

export default function Home({product}:HomeProps) {
  return (
    <>
      <Head>
        <title>Ig.News | Home</title>
      </Head>
      <main className={styles.ContentContainer}>
        <section className={styles.Hero}>
          <span>✌ Hey, welcome</span>
          <h1> News about the <span>React</span> word. </h1>
          <p>
            Get access to all publications<br/>
            <span>For {product.amount} month</span>

          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="girl coding"></img>
      </main>
    </>
  )
}



// esta rodando dentro do *Next*
export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1Kfl3yFGYdwyE1tHH2tnLErf',{
    expand: ['product']
  })
  
  const product = {
    priceId:price.id,
    amount: new Intl.NumberFormat('en-US',{
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  }

  return{ 
    props:{
      product,
    }
  }
}