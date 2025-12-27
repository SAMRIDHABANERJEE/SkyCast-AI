import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log('SkyCast AI: Bootstrap initiated');

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('SkyCast AI: Root element not found');
} else {
  try {
    const root = createRoot(rootElement);
    // Removing StrictMode temporarily to ensure maximum compatibility with Recharts/ESM
    root.render(<App />);
    console.log('SkyCast AI: Render called successfully');
  } catch (err) {
    console.error('SkyCast AI: Mounting failure', err);
    const display = document.getElementById('error-display');
    if (display) {
        display.style.display = 'block';
        display.innerHTML = 'Mounting Error: ' + (err instanceof Error ? err.message : String(err));
    }
  }
}