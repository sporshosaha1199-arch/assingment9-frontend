/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import './lib/axiosConfig';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AllAppointments from './pages/AllAppointments';
import DoctorDetails from './pages/DoctorDetails';
import DashboardLayout from './pages/dashboard/DashboardLayout';
import MyBookings from './pages/dashboard/MyBookings';
import MyProfile from './pages/dashboard/MyProfile';
import NotFound from './pages/NotFound';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div></div>;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return <>{children}</>;
}

function GlobalLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/appointments" element={<AllAppointments />} />
          
          {/* Protected Route - Can be accessed from All Appointments if logged in */}
          <Route path="/appointments/:id" element={<PrivateRoute><DoctorDetails /></PrivateRoute>} />
          
          <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
            <Route index element={<Navigate to="bookings" replace />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="profile" element={<MyProfile />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <GlobalLayout />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}
