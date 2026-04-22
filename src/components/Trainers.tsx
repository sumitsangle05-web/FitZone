import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter, Linkedin, Calendar, Users } from 'lucide-react';
import BookingModal from './BookingModal';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const initialTrainers = [
  {
    name: 'Marcus Thorne',
    role: 'Strength & Conditioning',
    img: 'https://images.unsplash.com/photo-1567013127542-490d757e51fe?auto=format&fit=crop&q=80&w=800',
    specialty: 'Powerlifting, Bodybuilding'
  },
  {
    name: 'Elena Volkov',
    role: 'Nutrition & Performance',
    img: 'https://images.unsplash.com/photo-1548690312-e3b507d17a12?auto=format&fit=crop&q=80&w=800',
    specialty: 'Fat Loss, Dietetics'
  },
  {
    name: 'David Chen',
    role: 'HIIT Specialist',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
    specialty: 'Functional Training, Agility'
  }
];

export default function Trainers({ bento }: { bento?: boolean }) {
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);
  const [trainers, setTrainers] = useState<any[]>(initialTrainers);

  useEffect(() => {
    const q = query(collection(db, 'trainers'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setTrainers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    });

    return () => unsubscribe();
  }, []);

  if (bento) {
    return (
      <div className="h-full bg-card-dark bento-card p-6 flex flex-col">
        <BookingModal 
          isOpen={!!selectedTrainer} 
          onClose={() => setSelectedTrainer(null)} 
          trainerName={selectedTrainer || ''} 
        />
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-6">Expert Trainers</h3>
        <div className="flex justify-between items-center flex-1">
          {trainers.map((trainer, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center gap-3 text-center group cursor-pointer"
              onClick={() => setSelectedTrainer(trainer.name)}
            >
              <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-zinc-700 p-0.5 group-hover:border-primary transition-colors overflow-hidden relative">
                <img src={trainer.img} alt={trainer.name} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Calendar size={12} className="text-white" />
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-tight">{trainer.name.split(' ')[0]}</p>
                <p className="text-[8px] text-primary uppercase font-black tracking-widest leading-none mt-1">{trainer.role.split(' ')[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section id="trainers" className="py-24 bg-bg">
      <BookingModal 
        isOpen={!!selectedTrainer} 
        onClose={() => setSelectedTrainer(null)} 
        trainerName={selectedTrainer || ''} 
      />
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">The Elite Team</span>
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase italic tracking-tighter">
            Train With <span className="text-primary">Professionals</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative mb-8 mx-auto w-full aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 rounded-sm">
                <img 
                  src={trainer.img} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Social icons overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href="#" className="bg-bg p-3 rounded-sm hover:bg-primary hover:text-white transition-colors">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="bg-bg p-3 rounded-sm hover:bg-primary hover:text-white transition-colors">
                    <Twitter size={20} />
                  </a>
                  <a href="#" className="bg-bg p-3 rounded-sm hover:bg-primary hover:text-white transition-colors">
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>

              <h3 className="text-3xl font-display font-bold uppercase italic mb-2">{trainer.name}</h3>
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">{trainer.role}</p>
              <p className="text-zinc-500 text-sm font-light italic mb-8">{trainer.specialty}</p>

              <button 
                onClick={() => setSelectedTrainer(trainer.name)}
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl"
              >
                <Calendar size={16} />
                Book Session
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
