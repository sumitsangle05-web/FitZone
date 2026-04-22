import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, ArrowLeft, Check, Package, Sparkles, Filter, IndianRupee } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const products = [
  {
    id: 'creatine-monohydrate',
    name: 'Vanguard Creatine',
    category: 'Performance',
    price: 1899,
    description: '100% Pure micronized creatine monohydrate for maximum power output and cell hydration.',
    img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=800',
    tags: ['Pure', 'Strength', 'Recovery'],
    stats: { servings: '60', purity: '99.9%' }
  },
  {
    id: 'whey-isolate',
    name: 'Titan Whey Isolate',
    category: 'Protein',
    price: 4599,
    description: 'Fast-absorbing cold-filtered whey isolate for peak muscle synthesis and rapid recovery.',
    img: 'https://images.unsplash.com/photo-1579722820308-d74e5719d38e?auto=format&fit=crop&q=80&w=800',
    tags: ['Lean', 'Growth', 'Fast'],
    stats: { servings: '30', protein: '27g' }
  },
  {
    id: 'pre-workout-surge',
    name: 'Inferno Pre-Workout',
    category: 'Energy',
    price: 2499,
    description: 'High-intensity energy formula with beta-alanine and citrulline for explosive pumps.',
    img: 'https://images.unsplash.com/photo-1593095947771-474c5cc2989d?auto=format&fit=crop&q=80&w=800', // Reusing similar aesthetic
    tags: ['Energy', 'Focus', 'Pump'],
    stats: { servings: '25', caffeine: '300mg' }
  }
];

export default function ShopPage({ onBack }: { onBack: () => void }) {
  const { user } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [ordering, setOrdering] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const handleOrder = async () => {
    if (!user) return;
    setOrdering(true);
    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        userEmail: user.email,
        productName: selectedProduct.name,
        price: "₹" + selectedProduct.price,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setOrdered(true);
      setTimeout(() => setOrdered(false), 3000);
    } catch (error) {
      console.error("Order Error", error);
    } finally {
      setOrdering(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg p-4 flex flex-col"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-16 mt-8">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-zinc-500 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-widest"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Arena
          </button>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <ShoppingCart size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">FitZone Store</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product Image Section */}
          <div className="relative group aspect-square rounded-[3rem] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedProduct.id}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </AnimatePresence>
            <div className="absolute top-8 left-8 flex gap-2">
              {selectedProduct.tags.map(tag => (
                <span key={tag} className="bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-2">{selectedProduct.category}</p>
                <h2 className="text-5xl font-display font-black uppercase italic tracking-tighter leading-none">{selectedProduct.name}</h2>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">MSRP</p>
                <p className="text-4xl font-display font-black italic text-primary">₹{selectedProduct.price}</p>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                 <Package className="text-primary" />
                 <h2 className="text-3xl font-display font-black uppercase italic tracking-tighter">Pharmaceutical Grade</h2>
              </div>
              <p className="text-zinc-500 text-lg font-light italic leading-relaxed mb-8">
                "{selectedProduct.description}"
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {Object.entries(selectedProduct.stats).map(([label, val]) => (
                  <div key={label} className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">{label}</p>
                    <p className="text-2xl font-display font-black text-white italic">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Selector */}
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Available Formulations</p>
              <div className="grid grid-cols-3 gap-3">
                {products.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    className={`p-4 rounded-2xl border transition-all text-center ${
                      selectedProduct.id === p.id 
                      ? 'bg-primary border-primary text-black' 
                      : 'bg-zinc-900 border-white/5 text-zinc-500 hover:border-white/20'
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase tracking-tight">{p.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Action */}
            <div className="mt-4 p-8 bg-black/40 rounded-[2.5rem] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 -mr-8 -mt-8 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <Sparkles size={80} />
              </div>
              <div>
                <h3 className="text-xl font-display font-black uppercase italic tracking-tight mb-1">Ready to ascend?</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Free priority shipping on all orders</p>
              </div>
              {user ? (
                <button 
                  onClick={handleOrder}
                  disabled={ordering}
                  className={`px-12 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-3 transition-all ${
                    ordered ? 'bg-green-600 text-white' : 'bg-primary text-white hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20'
                  }`}
                >
                  {ordering ? 'Processing...' : ordered ? <><Check size={18} /> Order Placed</> : <><IndianRupee size={16} /> Order Now</>}
                </button>
              ) : (
                <div className="px-8 py-4 bg-zinc-800 text-zinc-500 text-[10px] font-black uppercase tracking-widest rounded-xl">
                  Login to Order
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Global Store Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Check />, title: 'Certified Safe', desc: 'Third-party tested for banned substances.' },
            { icon: <Package />, title: 'Rapid Transit', desc: 'Dispatched within 12 hours from our hub.' },
            { icon: <Filter />, title: 'Bio-Avalaible', desc: 'Maximum absorption engineered formulas.' }
          ].map((feat, i) => (
            <div key={i} className="bg-white/2 border border-white/5 p-10 rounded-[2.5rem] group hover:bg-white/5 transition-colors text-center md:text-left">
              <div className="bg-primary/20 w-12 h-12 rounded-2xl flex items-center justify-center text-primary mb-6 mx-auto md:mx-0 group-hover:bg-primary group-hover:text-black transition-colors">
                {feat.icon}
              </div>
              <h4 className="text-xl font-display font-black uppercase italic italic mb-2">{feat.title}</h4>
              <p className="text-zinc-500 text-sm italic font-light">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
