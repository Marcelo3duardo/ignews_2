import '../styles/global.scss'
import { AppProps } from 'next/app'
import { Header } from '../Components/Header'

import { getProviders as NextAuthProvider  } from 'next-auth/react'
import { SessionProvider } from "next-auth/react"



function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider >
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
