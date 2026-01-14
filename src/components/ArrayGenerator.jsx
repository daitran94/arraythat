import { useState, useEffect } from 'react';

const ArrayGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [outputs, setOutputs] = useState({
    doubleQuote: '[]',
    singleQuote: '[]',
    original: '[]',
  });
  const [copiedState, setCopiedState] = useState(null);

  useEffect(() => {
    const lines = inputText.split('\n').filter((line) => line.trim() !== '');

    if (lines.length === 0) {
      setOutputs({
        doubleQuote: '[]',
        singleQuote: '[]',
        original: '[]',
      });
      return;
    }

    const doubleQuote = `[${lines.map((line) => `"${line}"`).join(', ')}]`;
    const singleQuote = `[${lines.map((line) => `'${line}'`).join(', ')}]`;
    const original = `[${lines.join(', ')}]`;

    setOutputs({
      doubleQuote,
      singleQuote,
      original,
    });
  }, [inputText]);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedState(key);
    setTimeout(() => setCopiedState(null), 2000);
  };

  return (
    <div className="generator-container">
      <div className="input-section">
        <div className="input-header">
          <label htmlFor="input-text" className="section-label">Input Text List</label>
          <button
            onClick={() => {
              const lines = inputText.split('\n');
              const uniqueLines = [...new Set(lines)];
              setInputText(uniqueLines.join('\n'));
            }}
            className="action-btn"
            title="Remove duplicates from the list"
          >
            Remove Duplicates
          </button>
        </div>
        <textarea
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your list here...&#10;One item per line"
          className="input-textarea"
          spellCheck="false"
        />
      </div>

      <div className="output-section">
        <OutputBlock
          label="Double Quotes Array"
          content={outputs.doubleQuote}
          onCopy={() => handleCopy(outputs.doubleQuote, 'double')}
          isCopied={copiedState === 'double'}
        />
        <OutputBlock
          label="Single Quotes Array"
          content={outputs.singleQuote}
          onCopy={() => handleCopy(outputs.singleQuote, 'single')}
          isCopied={copiedState === 'single'}
        />
        <OutputBlock
          label="Original Text Array"
          content={outputs.original}
          onCopy={() => handleCopy(outputs.original, 'original')}
          isCopied={copiedState === 'original'}
        />
      </div>
    </div>
  );
};

const OutputBlock = ({ label, content, onCopy, isCopied }) => (
  <div className="output-block">
    <div className="output-header">
      <span className="output-label">{label}</span>
      <button
        className={`copy-btn ${isCopied ? 'copied' : ''}`}
        onClick={onCopy}
        aria-label={`Copy ${label}`}
      >
        {isCopied ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Copied!
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy
          </>
        )}
      </button>
    </div>
    <div className="output-content">
      <code>{content}</code>
    </div>
  </div>
);

export default ArrayGenerator;
