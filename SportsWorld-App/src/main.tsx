import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FinanceProvider } from './contexts/FinanceContext';
import { VenueProvider } from './contexts/VenueContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <FinanceProvider>
      <VenueProvider>
        <App/>
      </VenueProvider>
    </FinanceProvider>
    </BrowserRouter>
  </React.StrictMode>
);
