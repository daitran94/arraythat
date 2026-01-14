import ArrayGenerator from './components/ArrayGenerator'

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">ArrayThat</h1>
        <p className="subtitle">Transform your text lists into code-ready arrays instantly.</p>
      </header>
      <main>
        <ArrayGenerator />
      </main>
      <footer className="footer">
        <p>
          Developed by <a href="https://github.com/daitran94" target="_blank" rel="noopener noreferrer" className="footer-link">daitran94</a>
        </p>
      </footer>
    </div>
  )
}

export default App
