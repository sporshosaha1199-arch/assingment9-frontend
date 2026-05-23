import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, CheckCircle, Activity, Heart, Shield, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [topDoctors, setTopDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopDoctors = async () => {
      try {
        const res = await axios.get('/api/doctors/top');
        setTopDoctors(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopDoctors();
  }, []);

  const slideData = [
    {
      image: "https://images.unsplash.com/photo-1538108149393-cebb47acdd4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Your Health Is Our Top Priority",
      subtitle: "Connect with the most highly trained and compassionate doctors in your area."
    },
    {
      image: "https://images.unsplash.com/photo-1551076805-e1869043e560?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Advanced Medical Technology",
      subtitle: "We use the latest medical advancements to provide you with the best care possible."
    },
    {
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Expert Care Accessible Anywhere",
      subtitle: "Book your appointment online easily and manage your health seamlessly."
    }
  ];

  return (
    <>
      <Helmet>
        <title>DocAppoint | Find the Best Doctors</title>
        <meta name="description" content="Book appointments with top-rated doctors easily on DocAppoint." />
      </Helmet>

      {/* Hero Banner with Swiper */}
      <section className="relative h-[80vh] min-h-[500px] max-h-[800px] w-full">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="w-full h-full"
        >
          {slideData.map((slide, idx) => (
            <SwiperSlide key={idx} className="relative h-full w-full bg-gray-900 overflow-hidden">
              <div className="absolute inset-0">
                <img src={slide.image} alt="Banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>
              </div>
              <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-12 md:px-20 lg:px-32 z-10 max-w-7xl mx-auto w-full">
                <div className="max-w-2xl">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-10 max-w-xl leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <Link to="/appointments" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-xl shadow-xl transition-all transform hover:-translate-y-1 hover:shadow-brand-500/25">
                    Book an Appointment <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Top Rated Doctors */}
      <section className="py-24 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-brand-600 font-bold tracking-wider uppercase text-sm">Top Specialists</span>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl">Meet Our Top Rated Doctors</h2>
            <div className="mt-4 w-24 h-1 bg-brand-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted professionals with excellent patient reviews, ready to provide you with the best medical care.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center p-12"><div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {topDoctors.map(doctor => (
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
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">{doctor.name}</h3>
                    <p className="text-brand-600 font-semibold mb-3">{doctor.specialty}</p>
                    <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">
                      {doctor.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-xl p-4 mb-6">
                       <div className="flex flex-col">
                          <span className="text-xs text-gray-400 font-medium">Experience</span>
                          <span className="font-semibold">{doctor.experience}</span>
                       </div>
                       <div className="w-px h-8 bg-gray-200"></div>
                       <div className="flex flex-col text-right">
                          <span className="text-xs text-gray-400 font-medium">Consultation Fee</span>
                          <span className="font-bold text-gray-900">${doctor.fee}</span>
                       </div>
                    </div>
                    <button 
                      onClick={() => navigate(`/appointments/${doctor._id}`)}
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
          <div className="text-center mt-16">
            <Link to="/appointments" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors">
              View All Doctors <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-50 blur-3xl opacity-50 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="bg-blue-50/50 border border-blue-100 p-8 rounded-3xl hover:bg-blue-50 transition-colors">
                    <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                       <Activity className="text-blue-600 w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Cardiology</h3>
                    <p className="text-gray-600 leading-relaxed">Advanced heart care and accurate diagnostics by experts.</p>
                 </div>
                 <div className="bg-red-50/50 border border-red-100 p-8 rounded-3xl hover:bg-red-50 transition-colors sm:mt-12">
                    <div className="bg-red-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                       <Heart className="text-red-600 w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Pediatrics</h3>
                    <p className="text-gray-600 leading-relaxed">Loving, comprehensive care for your little ones.</p>
                 </div>
                 <div className="bg-purple-50/50 border border-purple-100 p-8 rounded-3xl hover:bg-purple-50 transition-colors">
                    <div className="bg-purple-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                       <Shield className="text-purple-600 w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">Neurology</h3>
                    <p className="text-gray-600 leading-relaxed">Expert treatment for diverse nervous system conditions.</p>
                 </div>
                 <div className="bg-emerald-50/50 border border-emerald-100 p-8 rounded-3xl hover:bg-emerald-50 transition-colors sm:mt-12">
                    <div className="bg-emerald-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                       <Clock className="text-emerald-600 w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">24/7 Availability</h3>
                    <p className="text-gray-600 leading-relaxed">Round-the-clock emergency assistance when you need it.</p>
                 </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-brand-600 font-bold tracking-wider uppercase text-sm">Why Choose Us</span>
              <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">Comprehensive Care Tailored For You</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe in providing the most accessible and effective healthcare solutions. Our platform connects you with specialists across various disciplines, ensuring your health is in expert hands.
              </p>
              <ul className="space-y-5">
                {[
                  'Easy Online Booking System',
                  'Verified and Experienced Doctors',
                  'Secure Patient Data Privacy',
                  '24/7 Support and Consultations'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="bg-white rounded-full p-1 shadow-sm">
                       <CheckCircle className="text-brand-500" size={24} />
                    </div>
                    <span className="text-gray-800 font-bold">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-700 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="currentColor"></circle></pattern></defs><rect x="0" y="0" width="100%" height="100%" fill="url(#dots)"></rect>
            </svg>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-brand-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who have found their perfect doctor through our platform. Sign up today and start booking appointments seamlessly.
          </p>
          {!user ? (
            <Link to="/register" className="bg-white text-brand-700 font-bold px-10 py-5 rounded-xl shadow-xl hover:bg-gray-50 hover:scale-105 transition-all inline-block md:text-lg">
              Create an Account Now
            </Link>
          ) : (
            <Link to="/appointments" className="bg-white text-brand-700 font-bold px-10 py-5 rounded-xl shadow-xl hover:bg-gray-50 hover:scale-105 transition-all inline-block md:text-lg">
              Book Your Appointment
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
