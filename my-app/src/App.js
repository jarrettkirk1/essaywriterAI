import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  const [thesis, setThesis] = useState('');
  const [supportingArguments, setSupportingArguments] = useState('');
  const [evidence, setEvidence] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [files, setFiles] = useState([]);
  const [essay, setEssay] = useState('');

  const handleFileUpload = (event) => {
    setFiles([...files, ...Array.from(event.target.files)]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      thesis,
      supportingArguments,
      evidence,
      analysis,
      files,
    };

    // Convert files to base64 (if needed, otherwise just send file names or metadata)
    const fileDataPromises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({ name: file.name, content: e.target.result });
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    const fileData = await Promise.all(fileDataPromises);

    try {
      const response = await fetch('http://localhost:5000/generate-essay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          files: fileData,
        }),
      });

      const result = await response.json();
      setEssay(result.essay);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Essay Generator</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="document-upload">Upload Documents</label>
            <input
              type="file"
              id="document-upload"
              onChange={handleFileUpload}
              multiple
              required
            />
            <div className="uploaded-files">
              {files.length > 0 && (
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="thesis">Thesis</label>
            <textarea
              id="thesis"
              value={thesis}
              onChange={(e) => setThesis(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="supporting-arguments">Supporting Arguments</label>
            <textarea
              id="supporting-arguments"
              value={supportingArguments}
              onChange={(e) => setSupportingArguments(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="evidence">Evidence</label>
            <textarea
              id="evidence"
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="analysis">Analysis</label>
            <textarea
              id="analysis"
              value={analysis}
              onChange={(e) => setAnalysis(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button type="submit">Submit</button>
          </div>
        </form>
        {essay && (
          <div className="essay-output">
            <h2>Generated Essay</h2>
            <p>{essay}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
