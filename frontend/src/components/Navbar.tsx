import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Stethoscope, User, LogOut, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const navLinks = (
    <>
      <NavLink to="/" className={({isActive}) => `px-3 py-2 text-sm md:text-base font-medium rounded-lg transition-colors ${isActive ? 'text-brand-700 bg-brand-50' : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'}`}>Home</NavLink>
      <NavLink to="/appointments" className={({isActive}) => `px-3 py-2 text-sm md:text-base font-medium rounded-lg transition-colors ${isActive ? 'text-brand-700 bg-brand-50' : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'}`}>All Appointments</NavLink>
      {user && (
        <NavLink to="/dashboard" className={({isActive}) => `px-3 py-2 text-sm md:text-base font-medium rounded-lg transition-colors ${isActive ? 'text-brand-700 bg-brand-50' : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'}`}>Dashboard</NavLink>
      )}
    </>
  );

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200' : 'bg-white border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-brand-50 p-2.5 rounded-xl text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-sm">
                <Stethoscope size={24} />
              </div>
              <span className="font-extrabold text-2xl text-gray-900 tracking-tight">DocAppoint</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {navLinks}
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                <div className="relative group cursor-pointer flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 hidden lg:block">{user.name}</span>
                  <div className="w-10 h-10 rounded-full bg-brand-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="text-brand-600" size={20} />
                    )}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <Link to="/login" className="text-gray-700 hover:text-brand-600 font-medium text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-white border-b border-gray-200 shadow-lg transition-all duration-300 ease-in-out origin-top ${isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col gap-2">
          {navLinks}
          <div className="border-t border-gray-100 my-2 pt-4"></div>
          {user ? (
            <div className="flex items-center justify-between px-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 overflow-hidden flex items-center justify-center">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="text-brand-600" size={20} />
                  )}
                </div>
                <span className="font-medium text-gray-900">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 font-medium px-3 py-2 rounded-lg hover:bg-red-50"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 px-3">
              <Link to="/login" className="w-full text-center text-brand-600 hover:bg-brand-50 border border-brand-200 font-medium px-4 py-2.5 rounded-lg transition-colors">
                Login
              </Link>
              <Link to="/register" className="w-full text-center bg-brand-600 hover:bg-brand-700 text-white font-medium px-4 py-2.5 rounded-lg transition-colors shadow-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
