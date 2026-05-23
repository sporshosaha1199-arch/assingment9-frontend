import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Twitter, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-brand-50 p-2 rounded-lg text-brand-600">
                <Stethoscope size={24} />
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">DocAppoint</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              Your trusted partner for health and wellness. Easily find top-rated doctors and book appointments smoothly.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-500 hover:text-brand-600 text-sm transition-colors">Home</Link></li>
              <li><Link to="/appointments" className="text-gray-500 hover:text-brand-600 text-sm transition-colors">All Appointments</Link></li>
              <li><Link to="/dashboard" className="text-gray-500 hover:text-brand-600 text-sm transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 tracking-wide">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-brand-50 hover:text-brand-600 transition-colors">
                {/* SVG X Icon */}
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.96H5.078z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-brand-50 hover:text-brand-600 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-brand-50 hover:text-brand-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} DocAppoint. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
