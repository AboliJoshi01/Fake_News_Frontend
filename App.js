import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const checkNews = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/predict`, { text });
      setResult(res.data.result);
    } catch (err) {
      setResult('❌ Could not connect to the prediction API.');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <h2>📰 Fake News Detector</h2>
      <textarea
        placeholder="Enter a news headline or article..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        cols={60}
      />
      <br />
      <button onClick={checkNews} disabled={loading}>
        {loading ? 'Checking...' : 'Check News'}
      </button>
      {result && (
        <h3 style={{ color: result === 'FAKE' ? 'red' : result === 'REAL' ? 'green' : 'black' }}>
          Result: {result}
        </h3>
      )}
    </div>
  );
}

export default App;
