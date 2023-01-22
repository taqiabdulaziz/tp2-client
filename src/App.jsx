import React from 'react';

import './App.css';
import {
  BrowserRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoutes';
import HomePage from './pages/Homepage/HomePage';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <div className="menu">
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route exact path="/home" element={<HomePage />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />

          </Routes>
        </div>
      </Router>
    </QueryClientProvider>

  );
}

export default App;
