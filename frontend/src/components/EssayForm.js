import React, { useState } from 'react';
import axios from 'axios';

function EssayForm() {
  const [readings, setReadings] = useState('');
  const [thesis, setThesis] = useState('');
  const [topicSentences, setTopicSentences] = useState('');
  const [evidence, setEvidence] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [prompt, setPrompt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/generate-essay', {
        readings,
        thesis,
        topicSentences,
        evidence,
        analysis,
        prompt,
      });
      console.log(response.data); // Print data to console for now
    } catch (error) {
      console.error('Error generating essay:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Readings:</label>
          <textarea
            value={readings}
            onChange={(e) => setReadings(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Thesis:</label>
          <textarea
            value={thesis}
            onChange={(e) => setThesis(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Topic Sentences:</label>
          <textarea
            value={topicSentences}
            onChange={(e) => setTopicSentences(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Evidence:</label>
          <textarea
            value={evidence}
            onChange={(e) => setEvidence(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Analysis:</label>
          <textarea
            value={analysis}
            onChange={(e) => setAnalysis(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prompt:</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EssayForm;
