import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import NotificationProvider from './context/NotificationProvider'; // ✅ Corrected import path

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </StrictMode>
  );
}
