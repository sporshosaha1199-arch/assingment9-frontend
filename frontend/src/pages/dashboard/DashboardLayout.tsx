import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink, Outlet } from 'react-router-dom';
import { CalendarDays, User, Menu, X } from 'lucide-react';

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <Helmet>
        <title>Dashboard | DocAppoint</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        
        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex justify-between items-center bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
           <span className="font-bold text-gray-900">Dashboard Menu</span>
           <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 bg-gray-50 rounded-lg text-gray-600">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
           </button>
        </div>

        {/* Sidebar */}
        <div className={`md:w-72 flex-shrink-0 ${mobileOpen ? 'block' : 'hidden md:block'}`}>
          <div className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col gap-2 md:sticky md:top-28">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-3">Quick Menu</h2>
            <NavLink 
              to="/dashboard/bookings" 
              onClick={() => setMobileOpen(false)}
              className={({isActive}) => `flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${isActive ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-100' : 'text-gray-600 hover:bg-gray-50 border border-transparent'}`}
            >
              <CalendarDays size={20} />
              My Bookings
            </NavLink>
            <NavLink 
              to="/dashboard/profile" 
              onClick={() => setMobileOpen(false)}
              className={({isActive}) => `flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold transition-all ${isActive ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-100' : 'text-gray-600 hover:bg-gray-50 border border-transparent'}`}
            >
              <User size={20} />
              My Profile
            </NavLink>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white p-6 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 min-h-[500px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
