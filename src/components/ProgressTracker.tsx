import { motion } from 'motion/react';
import { TrendingUp, Award, Clock, Heart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const weightData = [
  { day: 'Mon', weight: 82.5 },
  { day: 'Tue', weight: 82.1 },
  { day: 'Wed', weight: 82.3 },
  { day: 'Thu', weight: 81.8 },
  { day: 'Fri', weight: 81.5 },
  { day: 'Sat', weight: 81.6 },
  { day: 'Sun', weight: 81.2 },
];

const activityData = [
  { name: 'Mon', value: 45 },
  { name: 'Tue', value: 60 },
  { name: 'Wed', value: 30 },
  { name: 'Thu', value: 90 },
  { name: 'Fri', value: 60 },
  { name: 'Sat', value: 120 },
  { name: 'Sun', value: 45 },
];

export default function ProgressTracker({ type }: { type?: 'summary' }) {
  if (type === 'summary') {
    return (
      <>
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Weekly Progress</h3>
        <div className="flex items-end justify-between h-24 gap-1.5 mb-4">
          {[
            { h: '40%', active: false },
            { h: '60%', active: false },
            { h: '55%', active: false },
            { h: '85%', active: true },
            { h: '70%', active: false },
            { h: '90%', active: false },
            { h: '45%', active: false },
          ].map((bar, i) => (
            <div 
              key={i} 
              className={`w-full rounded-sm transition-all duration-500 ${bar.active ? 'bg-primary' : 'bg-zinc-800'}`} 
              style={{ height: bar.h }} 
            />
          ))}
        </div>
        <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest text-zinc-600">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
          <span>Sun</span>
        </div>
      </>
    );
  }

  return (
    <section id="tools" className="py-24 bg-zinc-900/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16 text-center">
          <TrendingUp className="text-primary w-12 h-12 mb-6" />
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase italic tracking-tighter">
            Progress <span className="text-primary">Tracker</span>
          </h2>
          <p className="text-zinc-500 max-w-xl">
            Numbers don't lie. Monitor your metrics, visualize your growth, and stay accountable to your future self.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-zinc-950 border border-white/5 p-8 rounded-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-display font-bold uppercase italic tracking-tighter">Weight Analytics</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Target: 78kg</span>
                </div>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                  <defs>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2626" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    stroke="#52525b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#52525b" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    domain={['dataMin - 1', 'dataMax + 1']}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '4px' }}
                    itemStyle={{ color: '#DC2626', fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#DC2626" 
                    strokeWidth={3} 
                    dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-zinc-950 border border-white/5 p-8 rounded-sm">
            <h3 className="text-2xl font-display font-bold uppercase italic tracking-tighter mb-8">Quick Stats</h3>
            <div className="space-y-6">
              {[
                { label: 'Total Calories', value: '12,450', sub: 'Last 7 days', icon: <Heart size={18} className="text-red-500" /> },
                { label: 'Workout Hours', value: '42.5h', sub: 'Current month', icon: <Clock size={18} className="text-blue-500" /> },
                { label: 'Goal Milestone', value: 'Streak 12', sub: 'Consecutive days', icon: <Award size={18} className="text-yellow-500" /> },
              ].map((stat, i) => (
                <div key={i} className="flex items-center bg-zinc-900/50 p-6 rounded-sm border border-white/5 group hover:border-primary/30 transition-all">
                  <div className="bg-zinc-800 p-4 rounded-sm mr-6 group-hover:bg-primary/10 transition-colors">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1">{stat.label}</div>
                    <div className="text-2xl font-display font-bold text-white italic">{stat.value}</div>
                    <div className="text-[10px] text-zinc-600 font-light italic">{stat.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-zinc-950 border border-white/5 p-8 rounded-sm">
            <h3 className="text-2xl font-display font-bold uppercase italic tracking-tighter mb-8">Activity Intensity (min)</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <Bar dataKey="value" fill="#DC2626" radius={[2, 2, 0, 0]} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a' }}
                  />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} stroke="#52525b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-primary p-8 rounded-sm flex flex-col justify-center relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-700">
              <TrendingUp size={160} />
            </div>
            <div className="relative z-10">
              <h4 className="text-3xl font-display font-bold uppercase italic italic tracking-tighter text-white mb-2 leading-none">Monthly <br /> Performance <span className="text-black/40">Report</span></h4>
              <p className="text-white/80 font-light italic text-sm mb-6 max-w-xs">Your consistency has increased by 15% compared to last month. Keep the momentum!</p>
              <button className="bg-white text-primary text-[10px] font-bold uppercase tracking-widest px-8 py-4 rounded-sm shadow-xl shadow-black/20">
                View Full Analysis
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
