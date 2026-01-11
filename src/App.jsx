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
    </div>
  )
}

export default App
