import React, { useState } from 'react';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/NewDashboard';
import { Routes, Route } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import './App.css';
import PrivateRoute from './helpers/PrivateRoute';

function App() {
  const [token, setToken] = useState(false);
  const { keycloak } = useKeycloak();
  // Retrieve token from sessionStorage and check if it exists
  const tokenString = JSON.parse(sessionStorage.getItem('token') || '{}');
  if ((!token && tokenString.jwt?.length === undefined && !keycloak?.authenticated)) {
    // If token does not exist, render Login component
    return (<Login setToken={setToken} />)
  }
  // If token exists, render Dashboard component

  return (
    <>
      <Routes>
        <Route path="/" element={
          <PrivateRoute setToken={setToken} token={token}>
            <Dashboard />
          </PrivateRoute>
        } />
      </Routes >
    </>
  );
}

export default App;
