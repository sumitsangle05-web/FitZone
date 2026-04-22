import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, CheckCircle, ChevronRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainerName: string;
}

export default function BookingModal({ isOpen, onClose, trainerName }: BookingModalProps) {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [workoutType, setWorkoutType] = useState('Personal Training');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);

    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        userEmail: user.email,
        trainerName,
        workoutType,
        dateTime: new Date(`${date}T${time}`),
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setStep(1);
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Booking Error", error);
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {success ? (
              <div className="p-12 text-center">
                <div className="inline-flex p-4 bg-green-500/20 rounded-full text-green-500 mb-6 animate-bounce">
                  <CheckCircle size={48} />
                </div>
                <h3 className="text-3xl font-display font-black uppercase italic tracking-tight mb-2">Booking Confirmed!</h3>
                <p className="text-zinc-500">Your session with {trainerName} has been scheduled. Check your dashboard for details.</p>
              </div>
            ) : !user ? (
              <div className="p-12 text-center">
                <div className="inline-flex p-4 bg-primary/20 rounded-full text-primary mb-6">
                  <AlertCircle size={48} />
                </div>
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tight mb-4">Login Required</h3>
                <p className="text-zinc-500 mb-8">You must be signed in to book a session with our elite trainers.</p>
                <button 
                  onClick={onClose}
                  className="bg-white text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all"
                >
                  Close & Sign In
                </button>
              </div>
            ) : (
              <div className="p-8">
                <button 
                  onClick={onClose}
                  className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="mb-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-2">Book a Session</h3>
                  <h2 className="text-3xl font-display font-black uppercase italic tracking-tighter leading-none">
                    Session with <br /> <span className="text-white">{trainerName}</span>
                  </h2>
                </div>

                <div className="space-y-6">
                  {step === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3 ml-1">Select Workout Type</label>
                        <div className="grid grid-cols-2 gap-3">
                          {['Personal Training', 'Powerlifting', 'HIIT', 'Nutrition Call'].map(type => (
                            <button 
                              key={type}
                              onClick={() => setWorkoutType(type)}
                              className={`p-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                                workoutType === type ? 'bg-primary border-primary text-white' : 'bg-black/50 border-white/5 text-zinc-500'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button 
                        onClick={() => setStep(2)}
                        className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                      >
                        Select Date & Time <ChevronRight size={16} />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3 ml-1">Date</label>
                          <input 
                            type="date" 
                            min={new Date().toISOString().split('T')[0]}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm focus:border-primary focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3 ml-1">Time Slot</label>
                          <div className="grid grid-cols-2 gap-2">
                             {timeSlots.map(t => (
                               <button 
                                key={t}
                                onClick={() => setTime(t)}
                                className={`py-2 rounded-lg border text-[10px] font-black tracking-widest transition-all ${
                                  time === t ? 'bg-primary border-primary text-white' : 'bg-black/50 border-white/5 text-zinc-500'
                                }`}
                               >
                                 {t}
                               </button>
                             ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => setStep(1)}
                          className="flex-1 border border-white/10 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs"
                        >
                          Back
                        </button>
                        <button 
                          onClick={handleSubmit}
                          disabled={!date || !time || loading}
                          className="flex-[2] bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 disabled:opacity-50"
                        >
                          {loading ? 'Confirming...' : 'Confirm Booking'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
