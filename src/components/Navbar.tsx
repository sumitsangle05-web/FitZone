import { useState } from 'react';
import { Dumbbell, User, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import AdminPortal from './AdminPortal';

const navLinks = [
  { name: 'Programs', href: '#programs' },
  { name: 'Trainers', href: '#trainers' },
  { name: 'Membership', href: '#membership' },
  { name: 'Diet Plan', href: '#diet' },
  { name: 'Tools', href: '#tools' },
];

export default function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();

  return (
    <header className="flex justify-between items-center px-4 py-6">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <AdminPortal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      
      <a href="#" className="flex items-center gap-2 group">
        <div className="bg-primary w-10 h-10 rounded-lg flex items-center justify-center text-black group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(220,38,38,0.3)]">
          <Dumbbell className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-display font-black tracking-tighter uppercase italic">FITZONE</span>
      </a>

      <nav className="hidden lg:flex gap-8 text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500">
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} className="hover:text-white transition-colors">{link.name}</a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="hidden md:flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/20"
          >
            <ShieldCheck size={14} /> Admin Portal
          </button>
        )}
        
        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-white leading-none truncate max-w-[100px]">{user.displayName || 'Athlete'}</span>
              <span className="text-[8px] text-zinc-500 uppercase font-bold tracking-widest">{user.email?.split('@')[0]}</span>
            </div>
            {user.photoURL ? (
              <img src={user.photoURL} className="w-10 h-10 rounded-full border border-white/10" alt="Profile" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">
                <User size={18} className="text-zinc-500" />
              </div>
            )}
            <button 
              onClick={() => logout()}
              className="p-2 text-zinc-500 hover:text-primary transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsAuthOpen(true)}
            className="bg-white text-black text-[11px] font-bold px-6 py-3 rounded-full uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
          >
            Join Now
          </button>
        )}
      </div>
    </header>
  );
}
