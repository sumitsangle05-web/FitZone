import { motion } from 'motion/react';
import { Check, ShieldCheck, ArrowLeft, Zap, Crown, Star } from 'lucide-react';

const plans = [
  {
    name: 'Standard',
    price: '2,499',
    description: 'Perfect for those starting their fitness journey. Access to the essentials.',
    features: ['Access to basic gym area', 'Locker room access', '1 Personal training intro', 'Free parking', 'Basic workout app access'],
    color: 'border-zinc-800'
  },
  {
    name: 'Premium',
    price: '4,999',
    description: 'Our most popular tier for dedicated athletes seeking full immersion.',
    features: ['Full gym access 24/7', 'Group workout classes', 'Sauna and Spa access', 'Custom workout app', 'Monthly nutrition plan', 'Towel service'],
    accent: true,
    color: 'border-primary'
  },
  {
    name: 'Elite',
    price: '7,999',
    description: 'The ultimate performance package for those who demand the best.',
    features: ['Everything in Premium', 'Personal training 2x/week', 'Protein shake bar access', 'Guest passes (5/mo)', 'Body recovery therapy', 'Priority booking'],
    color: 'border-zinc-800'
  }
];

export default function MembershipPage({ onBack }: { onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      className="min-h-screen bg-bg p-4 flex flex-col gap-8"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-16">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors mb-6 text-[10px] font-black uppercase tracking-widest"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Arena
          </button>
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-12 bg-primary"></span>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Investment in yourself</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black uppercase italic tracking-tighter leading-none">
            Choose Your <span className="text-primary">Tier</span>
          </h1>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-zinc-900 shadow-2xl rounded-[2.5rem] border ${plan.color} p-10 flex flex-col justify-between relative overflow-hidden group`}
            >
              {plan.accent && (
                <div className="absolute top-8 right-8 bg-primary text-black p-3 rounded-2xl rotate-12 group-hover:rotate-0 transition-transform">
                  <Star size={20} fill="currentColor" />
                </div>
              )}
              
              <div>
                <div className="flex items-center gap-3 mb-8">
                  {plan.name === 'Elite' ? <Crown className="text-primary" /> : <Zap className="text-zinc-500" />}
                  <h3 className="text-3xl font-display font-black uppercase italic tracking-tighter">{plan.name}</h3>
                </div>
                
                <p className="text-zinc-500 text-sm italic font-light mb-8 leading-relaxed">
                  {plan.description}
                </p>

                <div className="flex items-end gap-1 mb-10">
                  <span className="text-5xl font-display font-black">₹</span>
                  <span className="text-8xl font-display font-black leading-none">{plan.price}</span>
                  <span className="text-zinc-500 font-black uppercase tracking-widest text-[10px] ml-2 mb-2">/ month</span>
                </div>

                <div className="space-y-4 mb-12">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-4 group/item">
                      <div className={`p-1 rounded-full ${plan.accent ? 'bg-primary/20 text-primary' : 'bg-white/5 text-zinc-600'}`}>
                        <Check size={12} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover/item:text-white transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:scale-[1.02] ${
                plan.accent 
                ? 'bg-primary text-white shadow-2xl shadow-primary/20' 
                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
              }`}>
                Claim This Power
              </button>
            </motion.div>
          ))}
        </div>

        {/* Global Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: <ShieldCheck />, label: 'No Contracts' },
            { icon: <ShieldCheck />, label: '24/7 Access' },
            { icon: <ShieldCheck />, label: 'Guest Passes' },
            { icon: <ShieldCheck />, label: 'Global Entry' }
          ].map((feat, i) => (
            <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center justify-center gap-4">
              <span className="text-primary">{feat.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-widest">{feat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
