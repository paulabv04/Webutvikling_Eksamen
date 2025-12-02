import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { FinanceProvider } from './contexts/FinanceContext';
import { VenueProvider } from './contexts/VenueContext';
import { AthleteProvider } from './contexts/AthleteContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <FinanceProvider>
      <AthleteProvider>
      <VenueProvider>
        <App/>
      </VenueProvider>
      </AthleteProvider>
    </FinanceProvider>
    </BrowserRouter>
  </React.StrictMode>
);
