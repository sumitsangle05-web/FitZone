import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Twitter, Linkedin, Calendar, Users, ArrowLeft, Trophy, Medal, Star, ChevronRight } from 'lucide-react';
import BookingModal from './BookingModal';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const initialTrainers = [
  {
    name: 'Marcus Thorne',
    role: 'Strength & Conditioning',
    img: 'https://images.unsplash.com/photo-1567013127542-490d757e51fe?auto=format&fit=crop&q=80&w=800',
    specialty: 'Powerlifting, Bodybuilding',
    bio: 'Former Olympic weightlifting coach with 15+ years experience in bio-mechanics and peak performance.',
    stats: { clients: '500+', experience: '15yr', rank: 'Master' }
  },
  {
    name: 'Elena Volkov',
    role: 'Nutrition & Performance',
    img: 'https://images.unsplash.com/photo-1548690312-e3b507d17a12?auto=format&fit=crop&q=80&w=800',
    specialty: 'Fat Loss, Dietetics',
    bio: 'Specializes in metabolic optimization and performance-based nutrition protocols for elite athletes.',
    stats: { clients: '1.2k', experience: '8yr', rank: 'Elite' }
  },
  {
    name: 'David Chen',
    role: 'HIIT Specialist',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
    specialty: 'Functional Training, Agility',
    bio: 'Expert in high-intensity functional movements and structural integrity training.',
    stats: { clients: '800+', experience: '10yr', rank: 'Lead' }
  }
];

export default function TrainersPage({ onBack }: { onBack: () => void }) {
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);
  const [trainers, setTrainers] = useState<any[]>(initialTrainers);

  useEffect(() => {
    const q = query(collection(db, 'trainers'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setTrainers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), stats: { clients: 'New', experience: 'Expert', rank: 'Coach' } })));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg p-4 flex flex-col"
    >
      <BookingModal 
        isOpen={!!selectedTrainer} 
        onClose={() => setSelectedTrainer(null)} 
        trainerName={selectedTrainer || ''} 
      />

      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 mt-8">
          <div>
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors mb-8 text-[10px] font-black uppercase tracking-widest"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Arena
            </button>
            <h1 className="text-7xl md:text-9xl font-display font-black uppercase italic tracking-tighter leading-[0.8] mb-6">
              Elite <span className="text-primary">Roster</span>
            </h1>
            <p className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.3em] ml-2">Human potential, unlocked by science and iron</p>
          </div>
          
          <div className="flex gap-4">
             <div className="flex -space-x-4">
               {trainers.map((t, i) => (
                 <img key={i} src={t.img} className="w-12 h-12 rounded-full border-2 border-bg object-cover" alt="Elite Trainer" />
               ))}
             </div>
             <div className="flex flex-col justify-center">
               <span className="text-xl font-display font-black italic tracking-tighter leading-none">{trainers.length} SPECIALISTS</span>
               <span className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest">Available for booking</span>
             </div>
          </div>
        </div>

        {/* Trainers Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] mb-10 rounded-[3rem] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl">
                <img 
                  src={trainer.img} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 opacity-60 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                
                {/* Ranking Badge */}
                <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-3xl flex flex-col items-center">
                  <Medal className="text-primary mb-1" size={16} />
                  <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">{trainer.stats?.rank || 'Coach'}</span>
                </div>

                {/* Info Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity mb-6">
                    <a href="#" className="p-3 bg-white/10 rounded-xl hover:bg-primary hover:text-black transition-colors"><Instagram size={18} /></a>
                    <a href="#" className="p-3 bg-white/10 rounded-xl hover:bg-primary hover:text-black transition-colors"><Twitter size={18} /></a>
                  </div>
                  <h3 className="text-4xl font-display font-black uppercase italic tracking-tighter mb-2 group-hover:text-primary transition-colors">{trainer.name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{trainer.role}</p>
                </div>
              </div>

              <div className="px-4">
                <p className="text-sm italic font-light text-zinc-500 leading-relaxed mb-8">
                  "{trainer.bio || 'Professional fitness enthusiast dedicated to your success.'}"
                </p>

                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                    <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600 mb-1">Experience</p>
                    <p className="text-lg font-display font-black text-white italic">{trainer.stats?.experience || '5yr+'}</p>
                  </div>
                  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                    <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600 mb-1">Global Clients</p>
                    <p className="text-lg font-display font-black text-white italic">{trainer.stats?.clients || '100+'}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedTrainer(trainer.name)}
                  className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary hover:text-white transition-all group flex items-center justify-center gap-3"
                >
                  <Calendar size={16} />
                  Book Transformation
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Roster Quality Footer */}
        <div className="mt-24 mb-16 p-12 bg-white/2 border border-white/5 rounded-[3rem] text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-display font-black uppercase italic tracking-tight mb-4">Elite <span className="text-primary italic">Certification</span> Required</h2>
            <p className="text-zinc-500 text-sm italic font-light">Every FitZone specialist undergoes a rigorous 120-hour assessment on biomechanics, nutrition science, and structural empathy before joining our roster.</p>
          </div>
          <div className="flex gap-8">
             <div className="flex flex-col items-center">
               <Trophy size={48} className="text-primary mb-2 opacity-50" />
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Global Standards</span>
             </div>
             <div className="flex flex-col items-center">
               <Star size={48} className="text-primary mb-2 opacity-50" />
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">5-Star Elite</span>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
