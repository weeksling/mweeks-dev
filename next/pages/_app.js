import '../styles/reset.css'
import '../styles/globals.css'
import ThemeToggle from '../components/ThemeToggle'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeToggle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
