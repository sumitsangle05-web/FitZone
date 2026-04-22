import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Apple, Utensils, Zap, Beef, Leaf, Coffee, Save, Check, ArrowLeft, Flame, Scale, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const dietPlans = [
  {
    id: 'weight-loss',
    title: 'Precision Cut',
    subtitle: 'Fat Loss & Definition',
    description: 'Designed to torch fat while preserving lean muscle mass through high-protein, calorie-controlled nutrition.',
    calories: '1800 - 2000 kcal',
    stats: { protein: '40%', carbs: '30%', fat: '30%' },
    meals: [
      { name: 'Dawn Fuel', menu: 'Oatmeal with berries and a protein shake', icon: <Coffee size={18} /> },
      { name: 'Core Lunch', menu: 'Grilled chicken breast with asparagus and quinoa', icon: <Utensils size={18} /> },
      { name: 'Surge Snack', menu: 'Greek yogurt with handful of almonds', icon: <Leaf size={18} /> },
      { name: 'Night Recovery', menu: 'Baked salmon with steamed broccoli and lemon', icon: <Utensils size={18} /> }
    ]
  },
  {
    id: 'muscle-gain',
    title: 'Anabolic Mass',
    subtitle: 'Growth & Hypertrophy',
    description: 'A high-calorie, nutrient-dense protocol optimized for maximum strength gains and muscle tissue repair.',
    calories: '3000 - 3500 kcal',
    stats: { protein: '35%', carbs: '45%', fat: '20%' },
    meals: [
      { name: 'Dawn Fuel', menu: '4 Whole eggs, 2 cups brown rice, large banana', icon: <Beef size={18} /> },
      { name: 'Core Lunch', menu: 'Lean ground beef bowl with white rice and beans', icon: <Utensils size={18} /> },
      { name: 'Surge Snack', menu: 'Peanut butter smoothie with oats and whey', icon: <Zap size={18} /> },
      { name: 'Night Recovery', menu: 'Grilled steak with sweet potatoes and green beans', icon: <Utensils size={18} /> }
    ]
  },
  {
    id: 'maintenance',
    title: 'Vanguard Balance',
    subtitle: 'Performance & Recovery',
    description: 'The ultimate equilibrium for athletes who have reached their target weight and want to dominate in the arena.',
    calories: '2400 - 2600 kcal',
    stats: { protein: '30%', carbs: '40%', f: '30%' },
    meals: [
      { name: 'Dawn Fuel', menu: 'Scrambled eggs on sourdough with avocado', icon: <Coffee size={18} /> },
      { name: 'Core Lunch', menu: 'Turkey wrap with hummus and colorful veggies', icon: <Utensils size={18} /> },
      { name: 'Surge Snack', menu: 'Cottage cheese with pineapple chunks', icon: <Leaf size={18} /> },
      { name: 'Night Recovery', menu: 'Tofu stir-fry with mixed vegetables and rice', icon: <Utensils size={18} /> }
    ]
  }
];

export default function DietPlanPage({ onBack }: { onBack: () => void }) {
  const { user } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const activePlan = dietPlans[activeIndex];

  const handleSavePlan = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'userDiets', user.uid), {
        userId: user.uid,
        goal: activePlan.id,
        updatedAt: serverTimestamp()
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Save Diet Error", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="min-h-screen bg-bg p-4 flex flex-col"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors mb-12 text-[10px] font-black uppercase tracking-widest"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Arena
        </button>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4">
            <h1 className="text-6xl font-display font-black uppercase italic tracking-tighter leading-tight mb-4">
              Pure <span className="text-primary">Fuel</span>
            </h1>
            <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-12">Engineered nutrition for peak performance</p>
            
            <div className="space-y-4">
              {dietPlans.map((plan, i) => (
                <button
                  key={plan.id}
                  onClick={() => setActiveIndex(i)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all flex flex-col gap-1 ${
                    activeIndex === i 
                    ? 'bg-primary border-primary text-black shadow-2xl shadow-primary/20' 
                    : 'bg-zinc-900 border-white/5 text-white hover:border-white/20'
                  }`}
                >
                  <span className={`text-[10px] font-black uppercase tracking-widest ${activeIndex === i ? 'text-black/60' : 'text-primary'}`}>{plan.subtitle}</span>
                  <span className="text-2xl font-display font-black uppercase italic tracking-tight">{plan.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlan.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-zinc-900/50 border border-white/10 rounded-[2.5rem] p-12 shadow-2xl relative overflow-hidden"
              >
                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32" />

                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Scale className="text-primary" />
                      <h2 className="text-4xl font-display font-black uppercase italic tracking-tighter">{activePlan.title}</h2>
                    </div>
                    <p className="text-zinc-400 font-light italic leading-relaxed text-lg italic">"{activePlan.description}"</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center min-w-[160px]">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <TrendingUp size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Daily Intake</span>
                    </div>
                    <span className="text-2xl font-display font-black italic">{activePlan.calories.split(' ')[0]}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">kcal</span>
                  </div>
                </div>

                {/* Macro Breakdown */}
                <div className="grid grid-cols-3 gap-6 mb-12">
                  {Object.entries(activePlan.stats).map(([key, val]) => (
                    <div key={key} className="bg-black/40 border border-white/5 p-6 rounded-3xl group hover:border-primary/30 transition-all">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">{key}</p>
                      <p className="text-3xl font-display font-black text-white italic group-hover:text-primary transition-colors">{val}</p>
                    </div>
                  ))}
                </div>

                {/* Meal Schedule */}
                <div className="space-y-4 mb-12">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                    <Apple size={14} /> Full Daily Protocol
                   </h3>
                   <div className="grid md:grid-cols-2 gap-4">
                     {activePlan.meals.map((meal, i) => (
                       <div key={i} className="p-6 bg-white/5 border border-white/5 rounded-2xl group hover:bg-white/10 transition-all">
                         <div className="flex items-center gap-3 mb-2">
                           <div className="text-primary">{meal.icon}</div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{meal.name}</p>
                         </div>
                         <p className="text-sm font-bold text-white leading-relaxed">{meal.menu}</p>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Action */}
                <div className="flex items-center justify-between p-8 bg-black/40 rounded-3xl border border-white/10">
                  <div>
                    <h4 className="text-xl font-display font-black uppercase italic italic mb-1">Satisfied with this plan?</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Sync details directly to your athlete profile</p>
                  </div>
                  {user ? (
                    <button 
                      onClick={handleSavePlan}
                      disabled={saving}
                      className={`px-10 py-5 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${
                        saved ? 'bg-green-600 text-white' : 'bg-primary text-white hover:scale-105 active:scale-95'
                      }`}
                    >
                      {saving ? 'Processing...' : saved ? <><Check size={16} /> Synced</> : <><Save size={16} /> Sync to Profile</>}
                    </button>
                  ) : (
                    <div className="px-6 py-4 bg-zinc-800 text-zinc-500 text-[10px] font-black uppercase tracking-widest rounded-xl">
                      Login to Sync
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
