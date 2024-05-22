import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './i18n';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import mykeycloak from './Keycloak';

// Create root for ReactDOM to render the app
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// Render the app inside the root using React.StrictMode and the BrowserRouter
root.render(
  // <React.StrictMode>
  <ReactKeycloakProvider authClient={mykeycloak}>
    <Router>
      <App />
    </Router>
  </ReactKeycloakProvider>
  // </React.StrictMode>
);