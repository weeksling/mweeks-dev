import { Html, Head, Main, NextScript } from 'next/document'

// Inline script runs before React hydrates to prevent flash of wrong theme.
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch(e) {}
})();
`

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
