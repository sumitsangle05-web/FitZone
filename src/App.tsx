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
import { motion } from 'motion/react';

import MyAppointments from './components/MyAppointments';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-bg text-white font-sans selection:bg-primary selection:text-white p-4 flex flex-col gap-4">
        <Navbar />
        
        <main className="flex-1 w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min lg:grid-rows-[repeat(3,minmax(300px,auto))]">
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
        </main>

        <Footer />

        {/* Decorative patterns */}
        <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        </div>
      </div>
    </AuthProvider>
  );
}


