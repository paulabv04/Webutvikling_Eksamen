import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FinanceProvider } from './contexts/FinanceContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <FinanceProvider>
    <App />
    </FinanceProvider>
    </BrowserRouter>
  </React.StrictMode>
)
 