import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, Zap, Waves, Activity, Check, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const programs = [
  {
    id: 'strength-power',
    title: 'Strength & Power',
    desc: 'Master the compound lifts and build raw explosive strength through periodized training.',
    icon: <Zap className="w-8 h-8" />,
    img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
    tag: 'Bulking'
  },
  {
    id: 'hiit',
    title: 'High-Intensity HIIT',
    desc: 'Short, explosive bursts of exercise designed to torch calories and improve endurance.',
    icon: <Activity className="w-8 h-8" />,
    img: 'https://images.unsplash.com/photo-1599058917233-35f939e6022e?auto=format&fit=crop&q=80&w=800',
    tag: 'Fat Loss'
  },
  {
    id: 'mobility',
    title: 'Mobility & Flow',
    desc: 'Improve functional range of motion and joint health with our specialized mobility sessions.',
    icon: <Waves className="w-8 h-8" />,
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    tag: 'Wellness'
  },
  {
    id: 'body-recomp',
    title: 'Body Recomposition',
    desc: 'The perfect balance of strength and cardio to build muscle while losing body fat.',
    icon: <Target className="w-8 h-8" />,
    img: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800',
    tag: 'Athletics'
  }
];

export default function Programs({ bento }: { bento?: boolean }) {
  const { user } = useAuth();
  const [activeProgramId, setActiveProgramId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const fetchProgram = async () => {
        const docRef = doc(db, 'userPrograms', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setActiveProgramId(docSnap.data().programId);
        }
      };
      fetchProgram();
    }
  }, [user]);

  const handleEnlist = async (programId: string) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'userPrograms', user.uid), {
        userId: user.uid,
        programId,
        enlistedAt: serverTimestamp()
      });
      setActiveProgramId(programId);
    } catch (error) {
      console.error("Enlist Error", error);
    }
  };

  if (bento) {
    return (
      <div className="h-full bg-primary rounded-2xl p-6 text-black flex flex-col justify-between group cursor-pointer overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700 rotate-12">
            <Zap size={140} />
        </div>
        <h3 className="text-xs font-black uppercase tracking-[0.2em] relative z-10">Featured Program</h3>
        <div className="relative z-10">
            <p className="text-4xl font-display font-black italic leading-[0.85] tracking-tighter uppercase mb-2">Iron<br />Warrior 2.0</p>
            <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">New 12-week powerlifting series now live for members.</p>
        </div>
        <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center relative z-10">
            <div className="w-2 h-2 rounded-full bg-black" />
        </div>
      </div>
    );
  }

  return (
    <section id="programs" className="py-24 bg-zinc-900/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Specialized Training</span>
            <h2 className="text-5xl md:text-6xl font-display font-bold uppercase italic leading-none">
              Programs Built <br /> For <span className="text-primary">Performance</span>
            </h2>
          </div>
          <p className="text-zinc-500 max-w-sm mb-2">
            Every program is scientifically designed to help you reach your specific fitness goals with maximum efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden bg-bg rounded-sm border border-white/5 hover:border-primary/50 transition-all cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={program.img} 
                  alt={program.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
              
              <div className="absolute top-4 right-4 bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                {program.tag}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="bg-primary/20 p-3 rounded-sm inline-block mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {program.icon}
                </div>
                <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-2 italic">
                  {program.title}
                </h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed line-clamp-2 italic mb-6">
                  {program.desc}
                </p>

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnlist(program.id);
                  }}
                  className={`w-full py-3 rounded text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                    activeProgramId === program.id 
                    ? 'bg-zinc-800 text-white' 
                    : 'bg-primary text-white hover:bg-primary-dark translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                  }`}
                >
                  {activeProgramId === program.id ? <><ShieldCheck size={14} /> Enlisted</> : 'Enlist Now'}
                </button>
              </div>

              {/* Hover overlay detail */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
