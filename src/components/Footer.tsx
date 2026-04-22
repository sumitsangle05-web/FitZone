import { motion } from 'motion/react';
import { Dumbbell, Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="text-[10px] text-zinc-600 flex justify-between items-center px-4 py-8 uppercase tracking-[0.2em] font-bold">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span>FitZone Gym © {new Date().getFullYear()}</span>
      </div>
      <div className="hidden sm:block">Join the elite 1%</div>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
      </div>
    </footer>
  );
}
