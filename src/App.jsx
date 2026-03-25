import React, { useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, PlusCircle, LayoutDashboard, Settings, User, 
  TrendingUp, TrendingDown, Info, DollarSign, Send, 
  Search, Filter, Tag, ListOrdered, MoreVertical, Trash2
} from 'lucide-react';
import { GlobalContext, GlobalProvider } from './context/GlobalState';

// Components
import Balance from './components/Balance';
import IncomeExpenses from './components/IncomeExpenses';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import ChartSection from './components/ChartSection';

const AppContent = () => {
  const { getTransactions, currency, setCurrency } = useContext(GlobalContext);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currencies = [
    { symbol: '$', code: 'USD' },
    { symbol: '€', code: 'EUR' },
    { symbol: '£', code: 'GBP' },
    { symbol: '₹', code: 'INR' },
    { symbol: '¥', code: 'JPY' },
  ];

  const [isAddEntryGrey] = React.useState(false); // Simplified since state change wasn't requested for this session context

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Balance />
                <IncomeExpenses />
              </div>
              <div className="grid grid-cols-1 gap-8">
                 <ChartSection />
                 <TransactionList />
              </div>
            </div>
            <aside className="lg:col-span-4 sticky top-28 h-fit">
              <div className="space-y-6 shadow-2xl shadow-cyan-900/10">
                <div 
                  className={`rounded-3xl p-8 border transition-all duration-500 cursor-pointer ${
                    isAddEntryGrey 
                      ? 'bg-emerald-100 text-slate-900 border-emerald-300 shadow-2xl' 
                      : 'glass border-cyan-500/10 border-t-cyan-500/20'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2.5 rounded-xl transition-all bg-cyan-500/10 text-cyan-400">
                      <PlusCircle size={22} className="animate-pulse" />
                    </div>
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-cyan-400">
                      Add Entry
                    </h3>
                  </div>
                  <AddTransaction />
                </div>
                <div className="glass-accent rounded-3xl p-8 border border-cyan-500/10 bg-cyan-500/5">
                   <h4 className="font-semibold text-lg mb-2 text-cyan-400">Smart Advice</h4>
                   <p className="text-slate-400 text-sm leading-relaxed">Set a monthly limit and we'll alert you if your spending goes above it. Automate your savings for a better future.</p>
                </div>
              </div>
            </aside>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-slate-200 text-slate-900 rounded-3xl p-16 text-center shadow-2xl border border-slate-300">
             <div className="w-24 h-24 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><TrendingUp className="w-12 h-12 text-cyan-700" /></div>
             <h2 className="text-3xl font-bold mb-4">Advanced Analytics</h2>
             <p className="text-slate-600 max-w-lg mx-auto">This module will feature AI-driven trends, monthly comparisons, and detailed category breakdowns. Stay tuned!</p>
             <button onClick={() => setActiveTab('dashboard')} className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-bold shadow-lg active:scale-95">Back to Dashboard</button>
          </div>
        );
      case 'budgeting':
        return (
          <div className="bg-slate-200 text-slate-900 rounded-3xl p-16 text-center shadow-2xl border border-slate-300">
             <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><Wallet className="w-12 h-12 text-indigo-700" /></div>
             <h2 className="text-3xl font-bold mb-4">Budget Planning</h2>
             <p className="text-slate-600 max-w-lg mx-auto">Set savings goals, create weekly spend limits, and track your progress toward financial freedom. Coming soon!</p>
             <button onClick={() => setActiveTab('dashboard')} className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-bold shadow-lg active:scale-95">Back to Dashboard</button>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary font-['Outfit'] selection:bg-cyan-500/30 pb-12 overflow-x-hidden">
      {/* Side Panels */}
      <AnimatePresence>
        {(isSettingsOpen || isProfileOpen) && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => {setIsSettingsOpen(false); setIsProfileOpen(false)}} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
            <motion.div 
              initial={{ x: isProfileOpen ? '-100%' : '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: isProfileOpen ? '-100%' : '100%' }} 
              className={`fixed ${isProfileOpen ? 'left-0' : 'right-0'} top-0 h-full w-full max-sm z-[101] p-8 shadow-2xl overflow-y-auto transition-all duration-500 bg-linear-to-br from-blue-600 via-blue-700 to-indigo-900 text-white text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]`}
            >
               <div className="flex items-center justify-between mb-10">
                  <h2 className="text-2xl font-black flex items-center gap-3 text-white">
                    {isProfileOpen ? <User className="text-cyan-300" /> : <Settings className="text-cyan-400" />}
                    {isProfileOpen ? 'User Account' : 'Global Settings'}
                  </h2>
                  <button onClick={() => {setIsSettingsOpen(false); setIsProfileOpen(false)}} className="p-2 rounded-xl transition-colors font-bold hover:bg-white/10 text-white/60">✕</button>
               </div>
               <div className="space-y-6">
                  {isProfileOpen ? (
                    <div className="space-y-12">
                       <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                       >
                          <div className="w-32 h-32 bg-white/10 rounded-full mx-auto mb-6 border-4 border-white/20 flex items-center justify-center shadow-xl ring-8 ring-white/5 transition-transform hover:rotate-6 cursor-pointer"><User size={64} className="text-cyan-300" /></div>
                          <h3 className="text-3xl font-black text-white tracking-tight">Standard Member</h3>
                          <p className="text-lg text-white/60 font-semibold mt-1">Premium Financial Suite</p>
                       </motion.div>

                       <div className="space-y-6 flex flex-col items-center">
                          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 flex items-center gap-4 py-8 w-full max-w-5xl">Power Your Growth <div className="h-[2px] bg-white/10 grow rounded-full"></div></h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                             {[
                               { name: 'Starter Tier', price: '$0', features: ['Daily Backups', 'Basic Reports', 'Community Support'], color: 'amber' },
                               { name: 'Professional', price: '$12', features: ['AI Forecasting', 'Cloud Sync', 'Priority Help', 'No Ads'], color: 'cyan', hot: true },
                               { name: 'Ultimate Elite', price: '$35', features: ['Team Access', 'Custom API', 'Audit Logs', 'Dedicated Manager'], color: 'indigo' }
                             ].map((plan, index) => (
                               <motion.div 
                                 key={index}
                                 initial={{ opacity: 0, y: 30 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: 0.1 * index, duration: 0.5 }}
                                 whileHover={{ scale: 1.05, translateY: -10 }}
                                 className={`p-10 rounded-[40px] border-2 transition-all cursor-pointer group shadow-xl bg-white/5 backdrop-blur-md flex flex-col items-center border-white/10 hover:border-cyan-400 shadow-cyan-500/5 h-full`}
                               >
                                  <div className="flex flex-col items-center mb-8 gap-1">
                                     <h5 className={`font-black text-2xl mb-1 ${
                                        plan.color === 'amber' ? 'text-amber-400' : 
                                        plan.color === 'cyan' ? 'text-cyan-400' : 'text-indigo-400'
                                     }`}>{plan.name}</h5>
                                     <div className="flex items-baseline gap-1">
                                       <span className="text-4xl font-black text-white">{plan.price}</span>
                                       <span className="text-xs text-white/40 font-bold uppercase tracking-widest">/ Month</span>
                                     </div>
                                     {plan.hot && (
                                       <div className="mt-4 relative">
                                          <div className={`absolute inset-0 bg-amber-400 blur-xl opacity-30 animate-pulse`}></div>
                                          <span className={`relative px-5 py-2 bg-amber-400 text-slate-900 text-[10px] font-black rounded-full shadow-lg shadow-amber-500/40 uppercase tracking-widest`}>Best Value</span>
                                       </div>
                                     )}
                                  </div>
                                  <div className="grow w-full">
                                    <ul className="space-y-4 mb-10 w-full flex flex-col items-center text-center">
                                       {plan.features.map(f => (
                                         <li key={f} className="text-sm text-white/80 font-bold flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${
                                              plan.color === 'amber' ? 'bg-amber-400' : 
                                              plan.color === 'cyan' ? 'bg-cyan-400' : 'bg-indigo-400'
                                            } shadow-[0_0_10px_rgba(255,255,255,0.3)]`}></div> 
                                            {f}
                                         </li>
                                       ))}
                                    </ul>
                                  </div>
                                  <button onClick={() => alert(`Upgrading to ${plan.name}!`)} className={`w-full py-5 rounded-3xl text-[12px] font-black uppercase tracking-[0.15em] transition-all shadow-xl active:scale-95 ${
                                    plan.color === 'amber' 
                                      ? 'bg-white/10 text-white border border-white/20 hover:bg-white hover:text-blue-900' 
                                      : `bg-${plan.color}-400 text-slate-900 hover:scale-[1.05] shadow-${plan.color}-500/30`
                                  }`}>
                                     {plan.price === '$0' ? 'Start Free' : `Upgrade to ${plan.name}`}
                                  </button>
                               </motion.div>
                             ))}
                          </div>
                       </div>
                    </div>
                  ) : (
                    <div className="space-y-10">
                       <div className="p-10 bg-slate-950/40 backdrop-blur-xl rounded-[40px] border border-white/10 shadow-3xl">
                          <h4 className="font-black text-2xl mb-8 text-white flex items-center justify-center gap-4"><DollarSign size={28} className="text-cyan-300" /> Regional Currency</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                             {currencies.map((curr) => (
                               <motion.button 
                                 key={curr.code}
                                 whileHover={{ scale: 1.1 }}
                                 whileTap={{ scale: 0.9 }}
                                 onClick={() => setCurrency(curr)}
                                 className={`p-6 rounded-[30px] border-2 transition-all text-center flex flex-col items-center gap-3 ${
                                   currency.code === curr.code 
                                     ? 'bg-cyan-500 text-white border-white/40 shadow-[0_0_30px_rgba(34,211,238,0.4)]' 
                                     : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20 hover:text-white'
                                 }`}
                               >
                                  <span className="text-4xl font-black">{curr.symbol}</span>
                                  <span className="text-xs font-black tracking-[0.2em] uppercase">{curr.code}</span>
                               </motion.button>
                             ))}
                          </div>
                          <p className="mt-8 text-sm text-white/30 font-bold tracking-wide uppercase">All account values will be recalibrated.</p>
                       </div>

                       <div className="p-10 bg-slate-950/40 backdrop-blur-xl rounded-[40px] border border-white/10 shadow-3xl">
                          <h4 className="font-black text-2xl mb-8 text-white">System Diagnostics</h4>
                          <div className="space-y-6 text-left">
                             <div className="flex justify-between items-center py-4 border-b border-white/5">
                                <span className="text-lg font-bold text-white/50">Core Version</span>
                                <span className="text-lg font-black text-white italic tracking-tighter">v4.2.0-Elite</span>
                             </div>
                             <div className="flex justify-between items-center py-4 border-b border-white/5">
                                <span className="text-lg font-bold text-white/50">Compute Engine</span>
                                <span className="text-lg font-black text-cyan-400">Deep Blue AI</span>
                             </div>
                             <div className={`flex justify-between items-center py-4`}>
                                <span className="text-lg font-bold text-white/50">Node Status</span>
                                <span className="text-lg font-black text-emerald-400 flex items-center gap-3">
                                  <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)] animate-pulse"></div> Power Active
                                </span>
                             </div>
                          </div>
                       </div>
                    </div>
                  )}
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav className="sticky top-0 z-50 glass border-b border-cyan-500/10 mb-8 py-4">
        <div className="container-premium flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="p-2 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
              <Wallet className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Finance<span className="text-cyan-400">Track</span></h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-4 items-center lg:mr-8 text-sm font-bold">
               <button 
                onClick={() => setActiveTab('dashboard')} 
                className={`cursor-pointer flex items-center gap-2 transition-all px-5 py-2.5 rounded-2xl ${activeTab === 'dashboard' ? 'bg-slate-300 text-bg-dark shadow-[0_0_20px_rgba(200,200,200,0.2)]' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
               >
                 <LayoutDashboard size={18} /> Dashboard
               </button>
               <button 
                onClick={() => setActiveTab('analytics')} 
                className={`cursor-pointer flex items-center gap-2 transition-all px-5 py-2.5 rounded-2xl ${activeTab === 'analytics' ? 'bg-slate-300 text-bg-dark shadow-[0_0_20px_rgba(200,200,200,0.2)]' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
               >
                 <TrendingUp size={18} /> Analytics
               </button>
               <button 
                onClick={() => setActiveTab('budgeting')} 
                className={`cursor-pointer flex items-center gap-2 transition-all px-5 py-2.5 rounded-2xl ${activeTab === 'budgeting' ? 'bg-slate-300 text-bg-dark shadow-[0_0_20px_rgba(200,200,200,0.2)]' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
               >
                 <Wallet size={18} /> Budgeting
               </button>
            </div>
            <div className="flex items-center gap-3">
               <button onClick={() => setIsProfileOpen(true)} className="p-2.5 rounded-full hover:bg-slate-800 text-cyan-400 transition-all active:scale-95 border border-slate-800"><User size={18} /></button>
               <button onClick={() => setIsSettingsOpen(true)} className="p-2.5 rounded-full hover:bg-slate-800 text-cyan-400 transition-all active:scale-95 border border-slate-800"><Settings size={18} /></button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container-premium">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
};

const App = () => {
  return (
    <GlobalProvider>
       <AppContent />
    </GlobalProvider>
  );
};

export default App;
