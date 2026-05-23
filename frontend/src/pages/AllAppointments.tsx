import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AllAppointments() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const url = searchTerm ? `/api/doctors?search=${searchTerm}` : '/api/doctors';
        const res = await axios.get(url);
        setDoctors(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    // Add small debounce to prevent too many requests
    const timer = setTimeout(() => {
        fetchDoctors();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleBookClick = (doctorId: string) => {
    navigate(`/appointments/${doctorId}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <Helmet>
        <title>All Doctors | DocAppoint</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Find Your Specialist</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Browse our complete list of highly qualified medical professionals.</p>
        </div>

        <div className="max-w-2xl mx-auto mb-16 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-brand-500" />
            </div>
            <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-14 pr-4 py-4 border-2 border-brand-100 rounded-2xl bg-white focus:outline-none focus:ring-0 focus:border-brand-500 text-lg shadow-sm transition duration-300 ease-in-out"
            />
        </div>

        {loading ? (
            <div className="flex justify-center p-20"><div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : doctors.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No doctors found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search criteria.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {doctors.map(doctor => (
                <div key={doctor._id} className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group flex flex-col">
                  <div className="h-72 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gray-100 animate-pulse"></div>
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 relative z-10" />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 text-amber-500 shadow-sm z-20">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      {doctor.rating}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-1">{doctor.name}</h3>
                    <p className="text-brand-600 font-semibold mb-3">{doctor.specialty}</p>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-1 leading-relaxed">
                       {doctor.hospital} • {doctor.location}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 border-t border-gray-100 pt-5 mb-6 mt-auto">
                       <div className="flex flex-col">
                          <span className="text-xs text-gray-400 font-medium">Experience</span>
                          <span className="font-semibold">{doctor.experience}</span>
                       </div>
                       <div className="w-px h-8 bg-gray-200"></div>
                       <div className="flex flex-col text-right">
                          <span className="text-xs text-gray-400 font-medium">Fee</span>
                          <span className="font-bold text-gray-900">${doctor.fee}</span>
                       </div>
                    </div>
                    
                    <button 
                      onClick={() => handleBookClick(doctor._id)}
                      className="w-full text-center flex items-center justify-center gap-2 bg-white border-2 border-brand-100 hover:border-brand-600 hover:bg-brand-600 text-brand-700 hover:text-white font-bold py-3.5 rounded-xl transition-all duration-300"
                    >
                      View Details
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
        )}
      </div>
    </div>
  );
}
