import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function WorkoutPlanner() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Deadlifts - 5x5 @ 85% 1RM', completed: false },
    { id: 2, text: 'Romanian Deadlifts - 3x12', completed: true },
    { id: 3, text: 'Lat Pulldowns - 4x10', completed: false },
  ]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="h-full bg-card-dark bento-card p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Today's Schedule</h3>
        <span className="text-[9px] bg-primary px-2 py-0.5 rounded font-black italic uppercase tracking-widest leading-none">Leg Day</span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { name: 'Squats', val: '4 Sets x 12', active: true },
          { name: 'Leg Press', val: '3 Sets x 15', active: false },
          { name: 'Deadlifts', val: '5 Sets x 5', active: false },
        ].map((ex, i) => (
          <div key={i} className={`border-l-2 pl-3 py-1 ${ex.active ? 'border-primary' : 'border-white/10'}`}>
            <p className="text-[11px] font-bold uppercase tracking-tight">{ex.name}</p>
            <p className="text-[9px] text-zinc-500 font-bold tracking-widest">{ex.val}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 space-y-2 mb-6">
        {tasks.slice(0, 2).map((task) => (
          <div key={task.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/5">
            <div className={`w-3 h-3 rounded-full border-2 ${task.completed ? 'bg-primary border-primary' : 'border-zinc-700'}`} />
            <span className={`text-[10px] uppercase font-bold tracking-widest ${task.completed ? 'text-zinc-600 line-through' : 'text-zinc-300'}`}>
              {task.text.split(' - ')[0]}
            </span>
          </div>
        ))}
      </div>

      <button className="w-full py-3 bg-zinc-900 border border-white/5 text-[10px] font-bold rounded-full uppercase tracking-widest hover:border-white/20 transition-all">
        Full Schedule
      </button>
    </div>
  );
}
