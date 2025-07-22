import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import UserDetails from './pages/UserDetails/UserDetails';
import './styles/global.scss';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component (redirect if already authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

function App() {
  const basename = import.meta.env.PROD ? '/lendsqr-fe-test' : '';

  return (
    <Router basename={basename}>
      <Routes>
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserDetails />} />
          
          {/* Placeholder routes for sidebar navigation */}
          <Route path="guarantors" element={<div className="page-placeholder">Guarantors Page</div>} />
          <Route path="loans" element={<div className="page-placeholder">Loans Page</div>} />
          <Route path="decision-models" element={<div className="page-placeholder">Decision Models Page</div>} />
          <Route path="savings" element={<div className="page-placeholder">Savings Page</div>} />
          <Route path="loan-requests" element={<div className="page-placeholder">Loan Requests Page</div>} />
          <Route path="whitelist" element={<div className="page-placeholder">Whitelist Page</div>} />
          <Route path="karma" element={<div className="page-placeholder">Karma Page</div>} />
          <Route path="organization" element={<div className="page-placeholder">Organization Page</div>} />
          <Route path="loan-products" element={<div className="page-placeholder">Loan Products Page</div>} />
          <Route path="savings-products" element={<div className="page-placeholder">Savings Products Page</div>} />
          <Route path="fees-charges" element={<div className="page-placeholder">Fees and Charges Page</div>} />
          <Route path="transactions" element={<div className="page-placeholder">Transactions Page</div>} />
          <Route path="services" element={<div className="page-placeholder">Services Page</div>} />
          <Route path="service-account" element={<div className="page-placeholder">Service Account Page</div>} />
          <Route path="settlements" element={<div className="page-placeholder">Settlements Page</div>} />
          <Route path="reports" element={<div className="page-placeholder">Reports Page</div>} />
          <Route path="preferences" element={<div className="page-placeholder">Preferences Page</div>} />
          <Route path="fees-pricing" element={<div className="page-placeholder">Fees and Pricing Page</div>} />
          <Route path="audit-logs" element={<div className="page-placeholder">Audit Logs Page</div>} />
        </Route>
        
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;