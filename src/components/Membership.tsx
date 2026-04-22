import { motion } from 'motion/react';
import { Check, ShieldCheck } from 'lucide-react';

const plans = [
  {
    name: 'Standard',
    price: '2,499',
    features: ['Access to basic gym area', 'Locker room access', '1 Personal training intro', 'Free parking'],
    accent: false
  },
  {
    name: 'Premium',
    price: '4,999',
    features: ['Full gym access 24/7', 'Group workout classes', 'Sauna and Spa access', 'Custom workout app', 'Monthly nutrition plan'],
    accent: true
  },
  {
    name: 'Elite',
    price: '7,999',
    features: ['Everything in Premium', 'Personal training 2x/week', 'Protein shake bar access', 'Guest passes (5/mo)', 'Body recovery therapy'],
    accent: false
  }
];

export default function Membership({ bento }: { bento?: boolean }) {
  if (bento) {
    return (
      <div className="h-full bg-card-light bento-card p-6 flex flex-col justify-between border-white/10">
        <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Membership</h3>
        <div>
          <span className="text-4xl font-display font-black italic tracking-tighter">₹2,499</span>
          <span className="text-xs text-zinc-500 uppercase tracking-widest font-bold ml-1">/mo</span>
        </div>
        <ul className="text-[10px] text-zinc-500 space-y-1.5 uppercase font-bold tracking-widest">
          <li>• 24/7 Gym Access</li>
          <li>• Free Personal Trainer</li>
          <li>• Spa & Sauna</li>
        </ul>
        <button className="w-full py-3 border border-white/20 text-[10px] font-bold rounded-full uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Upgrade Plan
        </button>
      </div>
    );
  }

  return (
    <section id="membership" className="py-24 bg-zinc-900/40">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <ShieldCheck className="text-primary w-12 h-12 mb-6" />
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase italic tracking-tighter mb-4">
            Membership <span className="text-primary">Options</span>
          </h2>
          <p className="text-zinc-500 max-w-xl">
            Choose the level that fits your commitment. No hidden fees, just pure performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-10 rounded-sm border ${
                plan.accent 
                ? 'bg-zinc-900 border-primary shadow-[0_0_40px_rgba(220,38,38,0.1)]' 
                : 'bg-zinc-950 border-white/5'
              }`}
            >
              {plan.accent && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-sm">
                  Most Popular
                </div>
              )}

              <div className="mb-10">
                <h3 className="text-2xl font-display font-bold uppercase tracking-widest mb-4 italic">{plan.name}</h3>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-display font-bold">₹</span>
                  <span className="text-7xl font-display font-bold leading-none">{plan.price}</span>
                  <span className="text-zinc-500 font-bold uppercase tracking-widest ml-2">/ month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-12">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-sm text-zinc-400">
                    <Check className={`shrink-0 w-4 h-4 ${plan.accent ? 'text-primary' : 'text-zinc-600'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-sm font-bold uppercase tracking-[0.2em] transition-all hover:scale-105 ${
                plan.accent 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
              }`}>
                Choose Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
