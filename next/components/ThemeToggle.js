import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark =
      stored === 'dark' ||
      (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setDark(prefersDark)
    document.documentElement.setAttribute(
      'data-theme',
      prefersDark ? 'dark' : 'light'
    )
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute(
      'data-theme',
      next ? 'dark' : 'light'
    )
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        position: 'fixed',
        top: '1.25rem',
        right: '1.25rem',
        background: 'none',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        padding: '0.4rem 0.6rem',
        cursor: 'pointer',
        fontSize: '1rem',
        lineHeight: 1,
        color: 'var(--color-text-muted)',
        transition: 'border-color 0.15s ease, color 0.15s ease',
        zIndex: 50,
      }}
    >
      {dark ? '\u2600' : '\u263E'}
    </button>
  )
}
