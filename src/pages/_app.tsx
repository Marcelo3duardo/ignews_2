import '../styles/global.scss'
import { AppProps } from 'next/app'
import { Header } from '../Components/Header'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
