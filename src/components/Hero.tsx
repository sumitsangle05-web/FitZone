import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <div className="h-full bg-card-dark bento-card p-10 flex flex-col justify-end relative overflow-hidden group">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000" 
          alt="Gym Hero" 
          className="w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
      </div>

      <div className="absolute top-8 right-10 text-primary/10 font-display font-black text-[12rem] italic select-none pointer-events-none tracking-tighter leading-none">GYM</div>
      
      <div className="relative z-10">
        <h1 className="text-6xl font-display font-black italic uppercase leading-[0.85] tracking-tighter mb-4">
          Push Your <br /> <span className="text-primary">Limits.</span>
        </h1>
        <p className="text-zinc-400 text-sm max-w-sm font-light leading-relaxed italic">
          Elite coaching, world-class equipment, and a community that never quits. 
          Start your transformation today in our premium facility.
        </p>
      </div>
    </div>
  );
}
