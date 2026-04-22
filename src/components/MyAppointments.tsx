import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, ChevronRight } from 'lucide-react';

export default function MyAppointments() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      setBookings([]);
      return;
    }

    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <div className="h-full bg-card-dark bento-card p-6 flex flex-col justify-center items-center text-center">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-4">My Dashboard</label>
        <p className="text-sm font-bold text-zinc-500 italic">Login to track your sessions and progress.</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-card-dark bento-card p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">My Appointments</h3>
        <span className="text-[9px] bg-primary/20 text-primary px-2 py-0.5 rounded font-black italic uppercase tracking-widest">{bookings.length} Booked</span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-primary/20 transition-all">
              <div className="flex justify-between items-start mb-1">
                <p className="text-[11px] font-bold uppercase tracking-tight">{booking.trainerName}</p>
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              </div>
              <div className="flex items-center gap-3 text-zinc-500">
                <div className="flex items-center gap-1">
                  <Calendar size={10} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">
                    {booking.dateTime.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={10} />
                  <span className="text-[9px] font-bold uppercase tracking-widest">
                    {booking.dateTime.toDate().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center py-4">
            <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-2">No Sessions Yet</p>
            <p className="text-[9px] text-zinc-700 italic">Book a session with our elite team above.</p>
          </div>
        )}
      </div>

      <button className="w-full mt-6 py-3 bg-zinc-900 border border-white/5 text-[10px] font-bold rounded-full uppercase tracking-widest hover:border-white/20 transition-all flex items-center justify-center gap-2">
        Full History <ChevronRight size={12} />
      </button>
    </div>
  );
}
