import { useState, useEffect, useRef } from 'react';

const ArrayGenerator = ({ t }) => {
  const [inputText, setInputText] = useState('');
  const [outputs, setOutputs] = useState({
    doubleQuote: '[]',
    singleQuote: '[]',
    original: '[]',
  });
  const [includeBrackets, setIncludeBrackets] = useState(true);
  const [copiedState, setCopiedState] = useState(null);
  const [selectedOutputs, setSelectedOutputs] = useState({
    doubleQuote: true,
    singleQuote: false,
    original: false,
  });
  const textareaRef = useRef(null);

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

    const content = lines.join(',');
    const doubleQuoteContent = lines.map((line) => `"${line}"`).join(',');
    const singleQuoteContent = lines.map((line) => `'${line}'`).join(',');

    const doubleQuote = includeBrackets ? `[${doubleQuoteContent}]` : doubleQuoteContent;
    const singleQuote = includeBrackets ? `[${singleQuoteContent}]` : singleQuoteContent;
    const original = includeBrackets ? `[${content}]` : content;

    setOutputs({
      doubleQuote,
      singleQuote,
      original,
    });
  }, [inputText, includeBrackets]);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedState(key);
    setTimeout(() => setCopiedState(null), 2000);
  };

  return (
    <div className="generator-container">
      <div className="input-section">
        <div className="input-header">
          <label htmlFor="input-text" className="section-label">{t.inputLabel}</label>
          <div className="action-buttons">
            <button
              onClick={() => {
                const lines = inputText.split('\n');
                const trimmedLines = lines.map(line => line.trim());
                setInputText(trimmedLines.join('\n'));
              }}
              className="action-btn"
              title={t.trimTitle}
            >
              {t.trim}
            </button>
            <button
              onClick={() => {
                const lines = inputText.split('\n');
                const uniqueLines = [...new Set(lines)];
                setInputText(uniqueLines.join('\n'));
              }}
              className="action-btn"
              title={t.deduplicateTitle}
            >
              {t.deduplicate}
            </button>
            <button
              onClick={() => setIncludeBrackets(!includeBrackets)}
              className={`action-btn ${!includeBrackets ? 'active' : ''}`}
              title={t.toggleBracketsTitle}
            >
              {includeBrackets ? t.removeBrackets : t.addBrackets}
            </button>
          </div>
        </div>
        <div className="textarea-wrapper">
          <div
            className="line-numbers"
            ref={(el) => {
              if (el && textareaRef.current) {
                el.scrollTop = textareaRef.current.scrollTop;
              }
            }}
          >
            {Array.from({ length: Math.max(inputText.split('\n').length, 1) }, (_, i) => (
              <div key={i + 1} className="line-number">{i + 1}</div>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onScroll={(e) => {
              const lineNumbers = e.target.previousSibling;
              if (lineNumbers) {
                lineNumbers.scrollTop = e.target.scrollTop;
              }
            }}
            placeholder={t.placeholder}
            className="input-textarea"
            spellCheck="false"
          />
        </div>
      </div>

      <div className="output-section">
        <div className="output-options">
          <span className="section-label">{t.outputOptionsLabel}</span>
          <div className="options-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedOutputs.doubleQuote}
                onChange={() => setSelectedOutputs(prev => ({ ...prev, doubleQuote: !prev.doubleQuote }))}
              />
              {t.doubleQuoteLabel}
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedOutputs.singleQuote}
                onChange={() => setSelectedOutputs(prev => ({ ...prev, singleQuote: !prev.singleQuote }))}
              />
              {t.singleQuoteLabel}
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedOutputs.original}
                onChange={() => setSelectedOutputs(prev => ({ ...prev, original: !prev.original }))}
              />
              {t.originalLabel}
            </label>
          </div>
        </div>

        {selectedOutputs.doubleQuote && (
          <OutputBlock
            label={t.doubleQuoteLabel}
            content={outputs.doubleQuote}
            onCopy={() => handleCopy(outputs.doubleQuote, 'double')}
            isCopied={copiedState === 'double'}
            t={t}
          />
        )}
        {selectedOutputs.singleQuote && (
          <OutputBlock
            label={t.singleQuoteLabel}
            content={outputs.singleQuote}
            onCopy={() => handleCopy(outputs.singleQuote, 'single')}
            isCopied={copiedState === 'single'}
            t={t}
          />
        )}
        {selectedOutputs.original && (
          <OutputBlock
            label={t.originalLabel}
            content={outputs.original}
            onCopy={() => handleCopy(outputs.original, 'original')}
            isCopied={copiedState === 'original'}
            t={t}
          />
        )}
      </div>
    </div>
  );
};

const OutputBlock = ({ label, content, onCopy, isCopied, t }) => (
  <div className="output-block">
    <div className="output-header">
      <span className="output-label">{label}</span>
      <button
        className={`copy-btn ${isCopied ? 'copied' : ''}`}
        onClick={onCopy}
        aria-label={`${t.copy} ${label}`}
      >
        {isCopied ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            {t.copied}
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            {t.copy}
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
