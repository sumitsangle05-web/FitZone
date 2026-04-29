/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Programs from './components/Programs';
import Trainers from './components/Trainers';
import Membership from './components/Membership';
import BMICalculator from './components/BMICalculator';
import DietPlans from './components/DietPlans';
import WorkoutPlanner from './components/WorkoutPlanner';
import ProgressTracker from './components/ProgressTracker';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell } from 'lucide-react';

import MyAppointments from './components/MyAppointments';
import GymTools from './components/GymTools';
import MembershipPage from './components/MembershipPage';
import DietPlanPage from './components/DietPlanPage';
import TrainersPage from './components/TrainersPage';
import ShopPage from './components/ShopPage';
import { useState } from 'react';

type ViewState = 'landing' | 'home' | 'tools' | 'membership' | 'diet' | 'trainers' | 'shop';

export default function App() {
  const [view, setView] = useState<ViewState>('landing');

  const renderView = () => {
    switch (view) {
      case 'landing':
        return (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-bg flex flex-col items-center justify-center p-8 overflow-hidden"
          >
            {/* Background Image/Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=2000" 
                alt="Gym Background" 
                className="w-full h-full object-cover opacity-30"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/80 to-bg" />
            </div>

            <div className="relative z-10 text-center max-w-4xl space-y-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-4 mb-4"
              >
                <div className="bg-primary p-4 rounded-2xl text-white shadow-2xl shadow-primary/40">
                  <Dumbbell size={40} />
                </div>
                <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter italic uppercase">FitZone</h1>
              </motion.div>

              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-4xl font-display font-bold uppercase italic tracking-tight text-white/90 leading-tight"
              >
                The Elite <span className="text-primary">Performance</span> <br /> 
                Training Grounds
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-zinc-400 text-lg max-w-xl mx-auto font-light leading-relaxed italic"
              >
                Stop wishing. Start doing. Access personalized programs, expert trainers, and advanced tools designed for your peak transformation.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="pt-8"
              >
                <button 
                  onClick={() => setView('home')}
                  className="group relative bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-primary hover:text-white transition-all shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10">Enter Dashboard</span>
                  <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-12 left-12 hidden lg:block">
              <div className="flex flex-col gap-1">
                <div className="w-12 h-1 bg-primary" />
                <div className="w-8 h-1 bg-white/20" />
                <div className="w-4 h-1 bg-white/10" />
              </div>
            </div>
          </motion.div>
        );
      case 'tools': return <GymTools onBack={() => setView('home')} />;
      case 'membership': return <MembershipPage onBack={() => setView('home')} />;
      case 'diet': return <DietPlanPage onBack={() => setView('home')} />;
      case 'trainers': return <TrainersPage onBack={() => setView('home')} />;
      case 'shop': return <ShopPage onBack={() => setView('home')} />;
      default: return (
        <motion.main 
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex-1 w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min lg:grid-rows-[repeat(3,minmax(300px,auto))]"
        >
          {/* Row 1 */}
          <div className="lg:col-span-2 lg:row-span-1">
            <Hero />
          </div>
          <div className="lg:col-span-1 lg:row-span-1">
            <BMICalculator />
          </div>
          <div className="lg:col-span-1 lg:row-span-1">
            <MyAppointments />
          </div>

          {/* Row 2 */}
          <div className="lg:col-span-1 lg:row-span-2">
            <DietPlans />
          </div>
          <div className="lg:col-span-2 lg:row-span-1">
            <WorkoutPlanner />
          </div>
          <div className="lg:col-span-1 lg:row-span-1">
            <Membership bento={true} />
          </div>

          {/* Row 3 */}
          <div className="lg:col-span-2 lg:row-span-1">
            <Trainers bento={true} />
          </div>
          <div className="lg:col-span-1 lg:row-span-1">
            <Programs bento={true} />
          </div>
        </motion.main>
      );
    }
  };

  const handleNavigate = (v: string) => {
    if (v === 'Tools') setView('tools');
    else if (v === 'Membership') setView('membership');
    else if (v === 'Diet Plan') setView('diet');
    else if (v === 'Trainers') setView('trainers');
    else if (v === 'Shop') setView('shop');
    else {
      setView('home');
      // If navigating to Programs from a sub-page, we might need a small delay for the view to mount before scrolling
      if (v === 'Programs') {
        setTimeout(() => {
          const el = document.getElementById('programs');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-bg text-white font-sans selection:bg-primary selection:text-white p-4 flex flex-col gap-4">
        {view !== 'landing' && <Navbar onNavigate={handleNavigate} />}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 w-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>

        {view !== 'landing' && <Footer />}

        {/* Decorative patterns */}
        <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        </div>
      </div>
    </AuthProvider>
  );
}


