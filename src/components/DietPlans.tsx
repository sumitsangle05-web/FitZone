import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Apple, Utensils, Zap, Beef, Leaf, Coffee, Save, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const dietPlans = {
  'weight-loss': {
    title: 'Fat Reduction & Cut',
    calories: '1800 - 2000 kcal',
    macronutrients: { p: '40%', c: '30%', f: '30%' },
    meals: [
      { name: 'Breakfast', menu: 'Oatmeal with berries and a protein shake', icon: <Coffee size={14} /> },
      { name: 'Lunch', menu: 'Grilled chicken breast with asparagus and quinoa', icon: <Utensils size={14} /> },
      { name: 'Snack', menu: 'Greek yogurt with handful of almonds', icon: <Leaf size={14} /> },
      { name: 'Dinner', menu: 'Baked salmon with steamed broccoli and lemon', icon: <Utensils size={14} /> }
    ]
  },
  'muscle-gain': {
    title: 'Anabolic Mass Gainer',
    calories: '3000 - 3500 kcal',
    macronutrients: { p: '35%', c: '45%', f: '20%' },
    meals: [
      { name: 'Breakfast', menu: '4 Whole eggs, 2 cups brown rice, large banana', icon: <Beef size={14} /> },
      { name: 'Lunch', menu: 'Lean ground beef bowl with white rice and beans', icon: <Utensils size={14} /> },
      { name: 'Snack', menu: 'Peanut butter smoothie with oats and whey', icon: <Zap size={14} /> },
      { name: 'Dinner', menu: 'Grilled steak with sweet potatoes and green beans', icon: <Utensils size={14} /> }
    ]
  },
  'maintenance': {
    title: 'Sustenance & Performance',
    calories: '2400 - 2600 kcal',
    macronutrients: { p: '30%', c: '40%', f: '30%' },
    meals: [
      { name: 'Breakfast', menu: 'Scrambled eggs on sourdough with avocado', icon: <Coffee size={14} /> },
      { name: 'Lunch', menu: 'Turkey wrap with hummus and colorful veggies', icon: <Utensils size={14} /> },
      { name: 'Snack', menu: 'Cottage cheese with pineapple chunks', icon: <Leaf size={14} /> },
      { name: 'Dinner', menu: 'Tofu stir-fry with mixed vegetables and rice', icon: <Utensils size={14} /> }
    ]
  }
};

type Goal = 'weight-loss' | 'muscle-gain' | 'maintenance';

export default function DietPlans() {
  const { user } = useAuth();
  const [activeGoal, setActiveGoal] = useState<Goal>('weight-loss');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchDiet = async () => {
        const docRef = doc(db, 'userDiets', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setActiveGoal(docSnap.data().goal as Goal);
        }
      };
      fetchDiet();
    }
  }, [user]);

  const handleSavePlan = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'userDiets', user.uid), {
        userId: user.uid,
        goal: activeGoal,
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

  const currentPlan = dietPlans[activeGoal];

  return (
    <div className="h-full bg-[#0a0a0a] bento-card p-6 flex flex-col border-red-900/20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Goal: {activeGoal.split('-').join(' ')}</h3>
        <div className="flex gap-2">
          {(['weight-loss', 'muscle-gain', 'maintenance'] as Goal[]).map(g => (
            <button 
              key={g} 
              onClick={() => setActiveGoal(g)}
              className={`w-2 h-2 rounded-full transition-all ${activeGoal === g ? 'bg-primary scale-125' : 'bg-zinc-800'}`}
              title={g}
            />
          ))}
        </div>
      </div>
      
      <div className="flex-1 space-y-4">
        {currentPlan.meals.map((meal, i) => (
          <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-primary opacity-50">{meal.icon}</span>
              <p className="text-[9px] text-zinc-500 uppercase font-black tracking-widest">{meal.name}</p>
            </div>
            <p className="text-[11px] font-bold text-zinc-300 leading-snug">{meal.menu}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/5">
        <div className="grid grid-cols-2 gap-2 mb-4">
           {Object.entries(currentPlan.macronutrients).slice(0, 2).map(([key, val]) => (
             <div key={key} className="bg-zinc-900/50 p-2 rounded text-center">
               <div className="text-[10px] text-zinc-500 uppercase font-bold">{key === 'p' ? 'Prot' : 'Carb'}</div>
               <div className="text-sm font-display font-black text-primary">{val}</div>
             </div>
           ))}
        </div>
        {user ? (
          <button 
            onClick={handleSavePlan}
            disabled={saving}
            className={`w-full py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
              saved ? 'bg-green-600 text-white' : 'bg-primary text-white hover:bg-primary-dark'
            }`}
          >
            {saving ? 'Syncing...' : saved ? <><Check size={14} /> Saved</> : <><Save size={14} /> Upload to Profile</>}
          </button>
        ) : (
          <button className="w-full py-3 bg-zinc-800 text-zinc-500 text-[10px] font-bold rounded-lg uppercase tracking-widest cursor-not-allowed">
            Login to Save Plan
          </button>
        )}
      </div>
    </div>
  );
}
