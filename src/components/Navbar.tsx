import { useState, useRef, useEffect } from 'react';
import { Dumbbell, User, LogOut, ShieldCheck, Settings, Mail, Info, Menu, X as CloseIcon, LayoutGrid, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import AdminPortal from './AdminPortal';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Programs', href: '#programs', icon: <LayoutGrid size={18} /> },
  { name: 'Trainers', href: '#trainers', icon: <User size={18} /> },
  { name: 'Membership', href: '#membership', icon: <ShieldCheck size={18} /> },
  { name: 'Diet Plan', href: '#diet', icon: <Mail size={18} /> },
  { name: 'Tools', href: '#tools', icon: <Settings size={18} /> },
  { name: 'Shop', href: '#shop', icon: <Dumbbell size={18} /> },
];

export default function Navbar({ onNavigate }: { onNavigate?: (view: string) => void }) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center px-4 py-6">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <AdminPortal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      
      <a 
        href="#" 
        onClick={(e) => {
          e.preventDefault();
          onNavigate?.('Home');
        }}
        className="flex items-center gap-2 group"
      >
        <div className="bg-primary w-10 h-10 rounded-lg flex items-center justify-center text-black group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(220,38,38,0.3)]">
          <Dumbbell className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-display font-black tracking-tighter uppercase italic">FITZONE</span>
      </a>

      <nav className="hidden xl:flex gap-8 text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-500">
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            onClick={(e) => {
              const viewLinks = ['Tools', 'Membership', 'Diet Plan', 'Trainers', 'Shop'];
              if (viewLinks.includes(link.name)) {
                e.preventDefault();
                onNavigate?.(link.name);
              }
            }}
            className="hover:text-white transition-colors"
          >
            {link.name}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        {isAdmin && (
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="hidden lg:flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/20"
          >
            <ShieldCheck size={14} /> Portal
          </button>
        )}
        
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <div className="hidden md:flex flex-col items-end">
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
            </button>
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-64 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl z-[200] overflow-hidden"
                >
                  <div className="p-4 border-b border-white/5 bg-white/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Account Information</p>
                    <div className="flex items-center gap-3 mt-2">
                       {user.photoURL ? (
                        <img src={user.photoURL} className="w-8 h-8 rounded-full" alt="Profile" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                          <User size={14} className="text-zinc-500" />
                        </div>
                      )}
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-xs font-bold text-white truncate">{user.displayName || 'Anonymous'}</span>
                        <span className="text-[10px] text-zinc-500 truncate">{user.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <div className="group px-3 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all flex items-center gap-3 cursor-pointer">
                      <Settings size={14} className="group-hover:rotate-90 transition-transform" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Settings</span>
                    </div>
                    <div className="group px-3 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all flex items-center gap-3 cursor-pointer">
                      <Mail size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Personal Details</span>
                    </div>
                    <div className="group px-3 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all flex items-center gap-3 cursor-pointer">
                      <Info size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Username/Status</span>
                    </div>
                  </div>

                  <div className="p-2 border-t border-white/5 bg-white/2">
                    <button 
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full group px-3 py-3 text-primary hover:bg-primary/10 rounded-lg transition-all flex items-center gap-3"
                    >
                      <LogOut size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <button 
            onClick={() => setIsAuthOpen(true)}
            className="bg-white text-black text-[11px] font-bold px-6 py-3 rounded-full uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
          >
            Join
          </button>
        )}

        {/* 3-Line Menu Trigger */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-3 bg-zinc-900 border border-white/10 rounded-xl text-white hover:bg-zinc-800 transition-all shadow-lg"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Global Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[250]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-zinc-950 z-[300] shadow-2xl border-l border-white/5 flex flex-col p-8"
            >
              <div className="flex justify-between items-center mb-16">
                <span className="text-xl font-display font-black tracking-tighter uppercase italic text-primary">FITZONE MENU</span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 text-zinc-500 hover:text-white transition-colors"
                >
                  <CloseIcon size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-8 border-b border-white/5 pb-4">Navigation</p>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => {
                        const viewLinks = ['Tools', 'Membership', 'Diet Plan', 'Trainers', 'Shop'];
                        if (viewLinks.includes(link.name)) {
                          onNavigate?.(link.name);
                        }
                        setIsMenuOpen(false);
                      }}
                      className="group flex justify-between items-center p-4 rounded-2xl bg-white/2 border border-white/5 hover:bg-primary transition-all hover:border-primary text-zinc-400 hover:text-black overflow-hidden relative"
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <span className="opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all">
                          {link.icon}
                        </span>
                        <span className="text-[11px] font-black uppercase tracking-widest">{link.name}</span>
                      </div>
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-white/5">
                 <div className="flex items-center gap-4 text-zinc-600">
                    <Dumbbell size={20} />
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest leading-none">FitZone Global</p>
                        <p className="text-[8px] uppercase font-bold tracking-widest opacity-50 mt-1">24/7 Support Active</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
