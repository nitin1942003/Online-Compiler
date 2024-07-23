import React, { useState } from 'react';
import axios from 'axios';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/run', { language, code });
      setOutput(response.data.output);
      setError('');
    } catch (err) {
      setError(err.response.data.error.stderr);
      setOutput('');
    }
  };

  const languageMapping = {
    cpp: 'clike',
    java: 'java',
    python: 'python',
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Online Compiler</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Code</label>
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => highlight(code, languages[languageMapping[language]])}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                border: '1px solid #ccc',
                borderRadius: '5px',
                minHeight: '200px',
              }}
              className="mt-1 block w-full h-40 p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md hover:bg-blue-600"
          >
            Run Code
          </button>
        </form>
        {output && (
          <pre className="bg-gray-200 p-4 mt-4 rounded-md">
            <code>{output}</code>
          </pre>
        )}
        {error && (
          <pre className="bg-red-200 p-4 mt-4 rounded-md">
            <code>{error}</code>
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;
