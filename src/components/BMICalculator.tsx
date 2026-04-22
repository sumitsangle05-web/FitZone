import { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Info } from 'lucide-react';

export default function BMICalculator() {
  const [weight, setWeight] = useState<string>('82');
  const [height, setHeight] = useState<string>('185');
  const [bmi, setBmi] = useState<number>(24.0);
  const [category, setCategory] = useState<string>('Healthy');

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const result = w / (h * h);
      setBmi(Math.round(result * 10) / 10);
      
      if (result < 18.5) setCategory('Underweight');
      else if (result < 25) setCategory('Healthy');
      else if (result < 30) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  return (
    <div className="h-full bg-card-light bento-card p-6 flex flex-col justify-between border-white/10">
      <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">BMI Calculator</h3>
      
      <div className="space-y-4 my-4">
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
            <span className="text-zinc-500">Height (cm)</span>
            <span>{height}</span>
          </div>
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '75%' }} className="h-full bg-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
            <span className="text-zinc-500">Weight (kg)</span>
            <span>{weight}</span>
          </div>
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '50%' }} className="h-full bg-white" />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/5 flex items-end justify-between">
        <span className="text-4xl font-display font-black italic tracking-tighter">{bmi.toFixed(1)}</span>
        <div className="flex flex-col items-end">
           <button onClick={calculateBMI} className="text-[8px] uppercase tracking-widest font-bold text-zinc-500 hover:text-white transition-colors mb-2 underline">Update</button>
           <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">{category}</span>
        </div>
      </div>
    </div>
  );
}
