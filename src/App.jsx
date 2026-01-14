import { useState, useEffect } from 'react'
import ArrayGenerator from './components/ArrayGenerator'
import { translations } from './translations'

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
    return 'dark'
  })
  const [lang, setLang] = useState('en')
  const t = translations[lang]

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'vn' : 'en')
  }

  return (
    <div className="app-container">
      <button
        onClick={toggleTheme}
        className="theme-toggle"
        aria-label={t.themeToggleLabel(theme === 'dark' ? 'light' : 'dark')}
        title={t.themeToggleLabel(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        )}
      </button>

      <button
        onClick={toggleLang}
        className="lang-toggle"
        title={t.langToggleLabel}
      >
        {lang === 'en' ? 'VN' : 'EN'}
      </button>

      <header className="header">
        <h1 className="title">{t.title}</h1>
        <p className="subtitle">{t.subtitle}</p>
      </header>
      <main>
        <ArrayGenerator lang={lang} t={t} />
      </main>
      <footer className="footer">
        <p>
          {t.footer} <a href="https://github.com/daitran94" target="_blank" rel="noopener noreferrer" className="footer-link">daitran94</a>
        </p>
      </footer>
    </div>
  )
}

export default App
