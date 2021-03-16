// import '../styles/globals.css'
import '../styles/reset.css';
// import '../components/all.scss'
// src/App.js
import React from 'react'
import {MDXProvider} from '@mdx-js/react'


const components = {}

function MyApp({ Component, pageProps }) {
  return <MDXProvider components={components}><Component {...pageProps} /></MDXProvider>
  
}

export default MyApp
