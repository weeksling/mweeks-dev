// import '../styles/globals.css'
import '../styles/reset.css';
// import '../components/all.scss'
// src/App.js
import React from 'react'
import {MDXProvider} from '@mdx-js/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { SITE_URL } from '../lib/site'


const components = {}

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter()
  return (
    <MDXProvider components={components}>
      <Head>
        <link rel="canonical" href={SITE_URL + asPath.split(/[?#]/)[0]} />
      </Head>
      <Component {...pageProps} />
    </MDXProvider>
  )
}

export default MyApp
