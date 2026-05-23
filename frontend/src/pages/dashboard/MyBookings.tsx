import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, Clock, MapPin, Building2, Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MyBookings() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  
  // Update Form State
  const [patientName, setPatientName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('/api/appointments/my');
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await axios.delete(`/api/appointments/${id}`);
      toast.success('Appointment deleted successfully!');
      setAppointments(appointments.filter(app => app._id !== id));
    } catch (err) {
      toast.error('Failed to delete appointment');
    }
  };

  const openUpdateModal = (appointment: any) => {
    setSelectedAppointment(appointment);
    setPatientName(appointment.patientName);
    setGender(appointment.gender);
    setPhone(appointment.phone);
    setAppointmentDate(appointment.appointmentDate);
    setAppointmentTime(appointment.appointmentTime);
    setIsUpdateModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await axios.put(`/api/appointments/${selectedAppointment._id}`, {
         patientName, gender, phone, appointmentDate, appointmentTime
      });
      toast.success('Appointment updated successfully!');
      setAppointments(appointments.map(app => app._id === selectedAppointment._id ? res.data : app));
      setIsUpdateModalOpen(false);
    } catch(err) {
      toast.error('Failed to update appointment');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">My Bookings</h2>
      
      {appointments.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center text-gray-500 flex flex-col items-center justify-center">
           <div className="bg-white p-4 rounded-full shadow-sm mb-4">
               <Calendar className="w-10 h-10 text-gray-400" />
           </div>
           <p className="text-lg font-medium text-gray-600">You have no upcoming appointments.</p>
           <p className="text-sm mt-1">Book an appointment with our specialists today.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {appointments.map(app => (
            <div key={app._id} className="bg-white border text-left border-gray-100 rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(0,0,0,0.06)] transition-all">
               <div className="flex flex-col md:flex-row justify-between md:items-start mb-6 gap-6">
                  <div>
                    <h3 className="text-xl font-extrabold text-gray-900 mb-1">Dr. {app.doctorName || 'Doctor'}</h3>
                    <p className="text-brand-600 font-medium mb-3">Patient: {app.patientName} ({app.gender})</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg inline-flex border border-gray-100">
                        <Clock size={14} className="text-gray-400" /> Phone: {app.phone}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                      <div className="flex bg-brand-50 border border-brand-100 text-brand-700 px-4 py-2.5 rounded-xl items-center gap-4 text-sm font-bold whitespace-nowrap shadow-sm">
                        <span className="flex items-center gap-1.5"><Calendar size={18} className="opacity-70" /> {app.appointmentDate}</span>
                        <div className="w-px h-4 bg-brand-200"></div>
                        <span className="flex items-center gap-1.5"><Clock size={18} className="opacity-70" /> {app.appointmentTime}</span>
                      </div>
                  </div>
               </div>
               
               <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row justify-end items-center gap-3">
                  <button onClick={() => openUpdateModal(app)} className="w-full sm:w-auto justify-center flex items-center gap-2 text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-100 px-5 py-2.5 rounded-xl transition-colors font-bold shadow-sm">
                    <Edit size={16} /> Update Details
                  </button>
                  <button onClick={() => handleDelete(app._id)} className="w-full sm:w-auto justify-center flex items-center gap-2 text-red-700 bg-red-50 hover:bg-red-100 border border-red-100 px-5 py-2.5 rounded-xl transition-colors font-bold shadow-sm">
                    <Trash2 size={16} /> Cancel Appointment
                  </button>
               </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsUpdateModalOpen(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden z-10 animate-fade-in-up border border-gray-100 flex flex-col max-h-[90vh]">
            <div className="px-5 py-5 sm:px-8 sm:py-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center relative overflow-hidden flex-shrink-0">
               <div className="absolute top-0 right-0 p-4 opacity-5 bg-brand-500 rounded-bl-full w-24 h-24 pointer-events-none"></div>
               <div>
                 <h3 className="text-xl font-extrabold text-gray-900 mb-1">Update Appointment</h3>
                 <p className="text-sm font-medium text-gray-500">Edit your details before the session</p>
               </div>
               <button onClick={() => setIsUpdateModalOpen(false)} className="bg-white p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors border border-gray-200 z-10 shadow-sm text-lg flex items-center justify-center -mr-2">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
               </button>
            </div>
            <form onSubmit={handleUpdate} className="p-5 sm:p-8 overflow-y-auto">
              <div className="mb-5">
                 <label className="block text-sm font-bold text-gray-700 mb-1.5">Doctor</label>
                 <input type="text" readOnly className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed font-medium" value={selectedAppointment.doctorName} />
              </div>
              <div className="mb-5">
                 <label className="block text-sm font-bold text-gray-700 mb-1.5">Patient Name</label>
                 <input type="text" required value={patientName} onChange={e => setPatientName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white transition-colors" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Gender</label>
                    <div className="relative">
                       <select required value={gender} onChange={e => setGender(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-10 py-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white transition-colors appearance-none font-medium">
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
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
                    <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white transition-colors" />
                  </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Date</label>
                    <input type="date" required value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white transition-colors font-medium text-gray-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Time</label>
                    <input type="time" required value={appointmentTime} onChange={e => setAppointmentTime(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white transition-colors font-medium text-gray-700" />
                  </div>
              </div>
              <div className="flex gap-4 justify-end pt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsUpdateModalOpen(false)} className="px-6 py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 font-bold transition-all w-1/3 text-center pointer-events-auto">
                  Cancel
                </button>
                <button type="submit" disabled={updating} className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold transition-all shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none w-2/3 flex justify-center items-center gap-2">
                  {updating ? (
                      <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Saving</>
                  ) : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
