import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Building2, Star, Clock, Calendar, BadgeDollarSign, ChevronLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Form State
  const [patientName, setPatientName] = useState(user?.name || '');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`/api/doctors/${id}`);
        setDoctor(res.data);
      } catch (err) {
        toast.error('Doctor not found');
        navigate('/appointments');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id, navigate]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      await axios.post('/api/appointments', {
        doctorId: doctor._id,
        doctorName: doctor.name,
        patientName,
        gender,
        phone,
        appointmentDate,
        appointmentTime,
        fee: doctor.fee
      });
      toast.success('Appointment booked successfully!');
      setIsModalOpen(false);
      navigate('/dashboard/bookings');
    } catch (err) {
      toast.error('Failed to book appointment');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center"><div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!doctor) return null;

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <Helmet>
        <title>{doctor.name} | DocAppoint</title>
      </Helmet>

      {/* Header Profile background */}
      <div className="bg-brand-700 w-full h-64 md:h-80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="currentColor"></circle></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="url(#dots)"></rect>
            </svg>
        </div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10 pt-8">
           <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-brand-100 hover:text-white transition-colors font-medium text-sm">
              <ChevronLeft size={20} /> Back to Search
           </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden">
          <div className="md:flex">
            {/* Doctor Avatar/Image Side */}
            <div className="md:w-2/5 lg:w-1/3 bg-gray-100 relative">
              <div className="h-96 md:h-full w-full overflow-hidden">
                 <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900/80 to-transparent p-6 text-white text-center md:hidden">
                 <h1 className="text-2xl font-bold">{doctor.name}</h1>
                 <p className="text-brand-300 font-medium">{doctor.specialty}</p>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-6 sm:p-10 md:w-3/5 lg:w-2/3">
              <div className="hidden md:flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">{doctor.name}</h1>
                  <p className="text-brand-600 font-bold text-xl inline-flex items-center gap-2 bg-brand-50 px-3 py-1 rounded-lg">
                    {doctor.specialty}
                  </p>
                </div>
                <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl flex items-center gap-2 font-bold shadow-sm border border-amber-200">
                  <Star size={20} fill="currentColor" />
                  {doctor.rating}
                </div>
              </div>
              
              <div className="md:hidden flex justify-between items-center mb-6">
                <span className="text-brand-600 font-bold text-lg">{doctor.specialty}</span>
                <span className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg flex items-center gap-1 font-bold text-sm">
                   <Star size={16} fill="currentColor" /> {doctor.rating}
                </span>
              </div>

              <div className="prose prose-brand max-w-none text-gray-600 mb-10 leading-relaxed bg-white border border-gray-100 shadow-sm p-6 rounded-2xl relative">
                <div className="absolute top-0 left-6 w-12 h-1 bg-brand-500 rounded-b-full"></div>
                <p className="pt-2">{doctor.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="flex items-start gap-4">
                   <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 text-brand-500">
                      <Building2 size={24} />
                   </div>
                   <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Hospital/Clinic</p>
                      <p className="font-bold text-gray-900">{doctor.hospital}</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 text-brand-500">
                      <MapPin size={24} />
                   </div>
                   <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Location</p>
                      <p className="font-bold text-gray-900">{doctor.location}</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 text-brand-500">
                      <Clock size={24} />
                   </div>
                   <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Experience</p>
                      <p className="font-bold text-gray-900">{doctor.experience}</p>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 text-brand-500">
                      <BadgeDollarSign size={24} />
                   </div>
                   <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Consultation Fee</p>
                      <p className="font-bold text-brand-600 text-xl">${doctor.fee}</p>
                   </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                 <div>
                   <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Calendar className="text-brand-500" size={20} />
                      Available Times
                   </h3>
                   <div className="flex flex-wrap gap-2">
                      {doctor.availability.map((time: string, idx: number) => (
                         <span key={idx} className="bg-brand-50 text-brand-700 px-4 py-2 rounded-lg text-sm font-semibold border border-brand-100 hover:bg-brand-100 cursor-pointer transition-colors"
                           onClick={() => {
                              setAppointmentTime(time);
                              setIsModalOpen(true);
                           }}
                         >
                            {time}
                         </span>
                      ))}
                   </div>
                 </div>
                 
                 <button 
                  onClick={() => {
                     if (!user) {
                        toast.error('Please login to book an appointment');
                        navigate('/login');
                        return;
                     }
                     setIsModalOpen(true);
                  }}
                  className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white font-bold px-10 py-4 rounded-xl shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-1"
                 >
                   Book Appointment
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden z-[101] animate-fade-in-up border border-gray-100 flex flex-col max-h-[90vh]">
            <div className="px-5 py-5 sm:px-8 sm:py-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center relative overflow-hidden flex-shrink-0">
               <div className="absolute top-0 right-0 p-4 opacity-5 bg-brand-500 rounded-bl-full w-24 h-24 pointer-events-none"></div>
               <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-1">Book Appointment</h3>
                  <p className="text-sm text-gray-500 font-medium">with <span className="text-brand-600">{doctor.name}</span></p>
               </div>
               <button onClick={() => setIsModalOpen(false)} className="bg-white p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors border border-gray-200 z-10 shadow-sm">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
               </button>
            </div>
            <form onSubmit={handleBook} className="p-5 sm:p-8 overflow-y-auto">
              <div className="mb-5">
                 <label className="block text-sm font-bold text-gray-700 mb-2">Patient Name</label>
                 <input type="text" required value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="Full Name" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white transition-colors" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                    <div className="relative">
                       <select required value={gender} onChange={e => setGender(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-10 py-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white transition-colors appearance-none font-medium text-gray-700">
                           <option value="" disabled hidden>Select Gender</option>
                           <option value="Male">Male</option>
                           <option value="Female">Female</option>
                           <option value="Other">Other</option>
                       </select>
                       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                       </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 234 567 8900" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white transition-colors" />
                  </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Appointment Date</label>
                    <input type="date" required value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white transition-colors font-medium text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Appointment Time</label>
                    <div className="relative">
                       <select required value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-10 py-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white transition-colors appearance-none font-medium text-gray-700">
                           <option value="" disabled hidden>Select Time</option>
                           {doctor.availability.map((time: string) => (
                              <option key={time} value={time}>{time}</option>
                           ))}
                       </select>
                       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                       </div>
                    </div>
                  </div>
              </div>
              <div className="flex gap-4 bg-yellow-50 p-4 rounded-xl border border-yellow-100 mb-8 items-center">
                 <div className="bg-white p-2 rounded-lg shadow-sm border border-yellow-200 text-yellow-600">
                    <BadgeDollarSign size={24} />
                 </div>
                 <div>
                    <p className="text-xs font-bold text-yellow-800 uppercase tracking-widest mb-0.5">Consultation Fee</p>
                    <p className="text-xl font-extrabold text-gray-900">${doctor.fee}</p>
                 </div>
              </div>
              <div className="flex gap-4 justify-end pt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-bold transition-all w-1/3">
                  Cancel
                </button>
                <button type="submit" disabled={bookingLoading} className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none w-2/3 flex justify-center items-center gap-2">
                  {bookingLoading ? (
                    <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Processing</>
                  ) : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
