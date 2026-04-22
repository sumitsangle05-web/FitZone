import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Plus, X, Trash2, Check, AlertCircle, Dumbbell, ShieldCheck, Mail, Calendar, Download } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, getDocs, addDoc, deleteDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export default function AdminPortal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'members' | 'bookings' | 'management'>('members');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Trainer form state
  const [trainerName, setTrainerName] = useState('');
  const [trainerRole, setTrainerRole] = useState('');
  const [trainerImg, setTrainerImg] = useState('');
  const [trainerSpecialty, setTrainerSpecialty] = useState('');

  useEffect(() => {
    if (isOpen && isAdmin) {
      fetchData();
    }
  }, [isOpen, isAdmin]);

  const handleExportCSV = () => {
    if (users.length === 0) return;

    const headers = ['Name', 'Email', 'Join Date'];
    const rows = users.map(u => [
      u.displayName || 'Anonymous',
      u.email,
      u.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `fitzone_members_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const usersSnap = await getDocs(collection(db, 'users'));
      setUsers(usersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      
      const bookingsSnap = await getDocs(query(collection(db, 'bookings'), orderBy('createdAt', 'desc')));
      setBookings(bookingsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTrainer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'trainers'), {
        name: trainerName,
        role: trainerRole,
        img: trainerImg,
        specialty: trainerSpecialty,
        createdAt: serverTimestamp(),
      });
      setTrainerName('');
      setTrainerRole('');
      setTrainerImg('');
      setTrainerSpecialty('');
      alert('Trainer added successfully! They will now appear in the Trainers section.');
    } catch (err) {
      setError('Failed to add trainer');
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-[80vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-zinc-900/50">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-display font-black uppercase italic tracking-tight">Admin Control Center</h2>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">System Overrides & Management</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar Tabs */}
              <div className="w-48 border-r border-white/5 p-4 flex flex-col gap-2">
                {[
                  { id: 'members', label: 'Members', icon: <Users size={16} /> },
                  { id: 'bookings', label: 'Bookings', icon: <Calendar size={16} /> },
                  { id: 'management', label: 'Add Data', icon: <Plus size={16} /> },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-zinc-500 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {activeTab === 'members' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-sm font-black uppercase tracking-widest text-primary">Registered Athletes ({users.length})</h3>
                      <button 
                        onClick={handleExportCSV}
                        className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-white/10 transition-all text-zinc-400 hover:text-white"
                      >
                        <Download size={14} /> Export CSV
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {users.map(u => (
                        <div key={u.id} className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">
                              {u.photoURL ? <img src={u.photoURL} className="rounded-full" /> : <Users size={18} className="text-zinc-600" />}
                            </div>
                            <div>
                              <p className="text-sm font-bold">{u.displayName || 'Anonymous Athlete'}</p>
                              <p className="text-[10px] text-zinc-500 font-mono">{u.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                             <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest">Joined</p>
                             <p className="text-[10px] font-bold">{u.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'bookings' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Upcoming Sessions</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {bookings.map(b => (
                        <div key={b.id} className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar size={12} className="text-primary" />
                              <p className="text-xs font-black uppercase tracking-widest">{b.trainerName}</p>
                            </div>
                            <p className="text-[10px] text-zinc-400">{b.userEmail} — {b.workoutType}</p>
                          </div>
                          <div className="text-right">
                            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded ${
                              b.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                              b.status === 'confirmed' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                            }`}>
                              {b.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'management' && (
                  <div className="max-w-md">
                    <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Add New Trainer</h3>
                    <form onSubmit={handleAddTrainer} className="space-y-4">
                      <div>
                        <label className="block text-[10px] uppercase font-black text-zinc-500 mb-2">Trainer Name</label>
                        <input
                          type="text"
                          value={trainerName}
                          onChange={(e) => setTrainerName(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm focus:border-primary focus:outline-none"
                          placeholder="e.g. Marcus Thorne"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-black text-zinc-500 mb-2">Role/Title</label>
                        <input
                          type="text"
                          value={trainerRole}
                          onChange={(e) => setTrainerRole(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm focus:border-primary focus:outline-none"
                          placeholder="e.g. Strength Specialist"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-black text-zinc-500 mb-2">Image URL</label>
                        <input
                          type="url"
                          value={trainerImg}
                          onChange={(e) => setTrainerImg(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm focus:border-primary focus:outline-none"
                          placeholder="https://unsplash.com/..."
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-black text-zinc-500 mb-2">Specialty</label>
                        <input
                          type="text"
                          value={trainerSpecialty}
                          onChange={(e) => setTrainerSpecialty(e.target.value)}
                          className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm focus:border-primary focus:outline-none"
                          placeholder="e.g. Powerlifting, Fat Loss"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-primary-dark transition-all disabled:opacity-50"
                      >
                        {loading ? 'Adding...' : 'Register Trainer'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
