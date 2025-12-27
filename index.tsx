import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  const errDiv = document.createElement('div');
  errDiv.style.color = 'red';
  errDiv.innerText = 'CRITICAL ERROR: No root element found in index.html';
  document.body.appendChild(errDiv);
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error('Mounting error:', err);
    throw err; // Will be caught by window.onerror in index.html
  }
}