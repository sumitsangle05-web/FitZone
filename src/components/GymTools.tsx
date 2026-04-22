import { motion } from 'motion/react';
import { Hammer, Ruler, Weight, Shield, Info, ArrowLeft, Zap, Target } from 'lucide-react';

const gymTools = [
  {
    id: 1,
    name: "Olympic Barbell",
    category: "Free Weights",
    description: "The standard for heavy lifting. 20kg (44lb) with high-tensile steel and precision knurling for optimal grip.",
    specs: "7.2ft length, 28mm diameter, 1500lb capacity",
    img: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=800",
    icon: <Weight className="w-6 h-6" />
  },
  {
    id: 2,
    name: "Power Cage",
    category: "Safety Equipment",
    description: "The foundation of safe heavy lifting. Allows for squats, bench press, and overhead press with adjustable safety pins.",
    specs: "3x3\" 11-gauge steel, multi-grip pull-up bar",
    img: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800",
    icon: <Shield className="w-6 h-6" />
  },
  {
    id: 3,
    name: "Adjustable Dumbbells",
    category: "Versatility",
    description: "Compact and space-efficient. Replace 15+ pairs of weights with a single set for varied resistance training.",
    specs: "5-50lb range, quick-turn dial system",
    img: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&q=80&w=800",
    icon: <Target className="w-6 h-6" />
  },
  {
    id: 4,
    name: "Resistance Bands",
    category: "Mobility & Warmup",
    description: "Essential for pre-activation, rehab, and adding progressive resistance to compound movements.",
    specs: "100% natural latex, color-coded tension levels",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
    icon: <Zap className="w-6 h-6" />
  }
];

export default function GymTools({ onBack }: { onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-bg p-4 flex flex-col gap-8"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors mb-4 text-[10px] font-black uppercase tracking-widest"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Arena
            </button>
            <h1 className="text-5xl font-display font-black uppercase italic tracking-tighter leading-none mb-2">
              Arsenal <span className="text-primary">of Power</span>
            </h1>
            <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest">A comprehensive guide to our performance-grade equipment</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-primary/10 border border-primary/20 px-6 py-4 rounded-2xl flex flex-col items-center justify-center">
              <p className="text-2xl font-black italic leading-none">24/7</p>
              <p className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest">Access</p>
            </div>
            <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl flex flex-col items-center justify-center">
              <p className="text-2xl font-black italic leading-none">CERT</p>
              <p className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest">Quality</p>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gymTools.map((tool) => (
            <motion.div 
              key={tool.id}
              whileHover={{ y: -5 }}
              className="bg-white/2 border border-white/5 rounded-3xl overflow-hidden group hover:border-primary/50 transition-all flex flex-col lg:flex-row"
            >
              <div className="lg:w-2/5 h-64 lg:h-auto overflow-hidden relative">
                <img 
                  src={tool.img} 
                  alt={tool.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-bg via-transparent to-transparent hidden lg:block" />
              </div>
              
              <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/20 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {tool.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary">{tool.category}</p>
                      <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter">{tool.name}</h3>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm italic font-light leading-relaxed mb-6">
                    "{tool.description}"
                  </p>
                </div>
                
                <div className="space-y-3 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Info size={14} className="text-primary" />
                    <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Technical Specs:</p>
                  </div>
                  <p className="text-[11px] font-mono font-bold text-zinc-300">{tool.specs}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="mt-12 p-8 bg-primary rounded-3xl text-black flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-display font-black uppercase italic leading-none mb-2">Need a demo?</h2>
            <p className="font-bold text-sm uppercase tracking-widest opacity-80">Book a personal orientation with a trainer to master these tools.</p>
          </div>
          <button className="bg-black text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl">
            Book Orientation
          </button>
        </div>
      </div>
    </motion.div>
  );
}
