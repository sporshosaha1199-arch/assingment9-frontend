import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Camera } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function MyProfile() {
  const { user, setUser } = useAuth();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await axios.put('/api/users/profile', { name, photoURL });
      setUser(res.data);
      toast.success('Profile updated successfully!');
      setIsUpdateModalOpen(false);
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  if (!user) return null;

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">My Profile</h2>
      
      <div className="bg-white border text-left border-gray-100 rounded-3xl p-8 sm:p-12 max-w-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 bg-brand-500 rounded-bl-full w-40 h-40 pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
          <div className="relative">
            <div className="w-36 h-36 rounded-full border-4 border-white shadow-xl bg-brand-50 overflow-hidden flex items-center justify-center">
               {user.photoURL ? (
                 <img src={user.photoURL} alt={user.name} className="w-full h-full object-cover shadow-inner" />
               ) : (
                 <User className="text-brand-300" size={64} />
               )}
            </div>
          </div>
          
          <div className="flex-1 text-center sm:text-left">
             <h3 className="text-3xl font-extrabold text-gray-900 mb-2">{user.name}</h3>
             <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 mb-6 font-medium">
               <Mail size={18} className="text-brand-400" />
               {user.email}
             </div>
             
             <button onClick={() => setIsUpdateModalOpen(true)} className="inline-flex items-center gap-2 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold px-6 py-3 rounded-xl transition-all border border-brand-200 hover:shadow-md transform hover:-translate-y-0.5">
                <Camera size={18} />
                Edit Profile
             </button>
          </div>
        </div>
      </div>

       {/* Update Profile Modal */}
       {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsUpdateModalOpen(false)}></div>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden z-10 animate-fade-in-up border border-gray-100 flex flex-col max-h-[90vh]">
            <div className="px-5 py-5 sm:px-8 sm:py-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center relative overflow-hidden flex-shrink-0">
               <div className="absolute top-0 right-0 p-4 opacity-5 bg-brand-500 rounded-bl-full w-24 h-24 pointer-events-none"></div>
               <div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-1">Update Profile</h3>
                  <p className="text-sm font-medium text-gray-500">Personalize your account details</p>
               </div>
               <button onClick={() => setIsUpdateModalOpen(false)} className="bg-white p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors border border-gray-200 z-10 shadow-sm flex justify-center items-center -mr-2">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
               </button>
            </div>
            <form onSubmit={handleUpdate} className="p-5 sm:p-8 overflow-y-auto">
              <div className="mb-5">
                 <label className="block text-sm font-bold text-gray-700 mb-1.5">Email</label>
                 <input type="text" readOnly className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed font-medium" value={user.email} />
                 <p className="text-xs text-gray-400 mt-2 font-medium">Email address cannot be changed.</p>
              </div>
              <div className="mb-5">
                 <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                 <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors focus:bg-white text-gray-900" />
              </div>
              <div className="mb-8">
                 <label className="block text-sm font-bold text-gray-700 mb-1.5">Photo URL</label>
                 <input type="url" value={photoURL} onChange={e => setPhotoURL(e.target.value)} placeholder="https://example.com/photo.jpg" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors focus:bg-white text-gray-900" />
              </div>
              <div className="flex gap-4 justify-end pt-6 border-t border-gray-100">
                <button type="button" onClick={() => setIsUpdateModalOpen(false)} className="px-6 py-3.5 rounded-xl border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-bold transition-all w-1/3 text-center">
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
