import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App'; // <-- CHANGED LINE
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { DataProvider } from './contexts/DataContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <DataProvider>
      <AuthProvider>
        <BookingProvider>
          <App />
        </BookingProvider>
      </AuthProvider>
    </DataProvider>
  </React.StrictMode>
);
