import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Trash2, ShoppingBag, Coffee, Home, Zap, Heart, User, MoreVertical, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionList = () => {
  const { transactions, deleteTransaction, currency } = useContext(GlobalContext);
  const [isGrey, setIsGrey] = React.useState(false);

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'shopping': return <ShoppingBag className="w-5 h-5" />;
      case 'food': return <Coffee className="w-5 h-5" />;
      case 'rent': return <Home className="w-5 h-5" />;
      case 'utilities': return <Zap className="w-5 h-5" />;
      case 'health': return <Heart className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'shopping': return 'bg-purple-500/10 text-purple-400';
      case 'food': return 'bg-orange-500/10 text-orange-400';
      case 'rent': return 'bg-blue-500/10 text-blue-400';
      case 'utilities': return 'bg-yellow-500/10 text-yellow-400';
      case 'health': return 'bg-rose-500/10 text-rose-400';
      default: return 'bg-red-500/10 text-red-400';
    }
  };

  return (
    <div className={`space-y-4 p-6 rounded-3xl transition-all duration-500 ${isGrey ? 'bg-emerald-100 shadow-2xl' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 
          onClick={() => setIsGrey(!isGrey)}
          className={`text-xl font-bold cursor-pointer transition-colors ${isGrey ? 'text-slate-900' : 'bg-clip-text text-transparent bg-linear-to-r from-white to-cyan-400'}`}
        >
          Activity History
        </h3>
        <div className="flex gap-2">
           <button onClick={() => alert('Search feature coming soon!')} className={`p-2 rounded-lg transition-all ${isGrey ? 'bg-slate-300 text-slate-500 hover:text-cyan-700' : 'glass text-cyan-400/60 hover:text-cyan-400'}`}>
              <Search size={16} />
           </button>
           <button onClick={() => alert('Filter feature coming soon!')} className={`p-2 rounded-lg transition-all ${isGrey ? 'bg-slate-300 text-slate-500 hover:text-cyan-700' : 'glass text-cyan-400/60 hover:text-cyan-400'}`}>
              <Filter size={16} />
           </button>
        </div>
      </div>

      <div className="space-y-3">
        {transactions.length === 0 ? (
          <div className={`rounded-3xl p-12 text-center border border-dashed shadow-premium transition-all ${isGrey ? 'bg-slate-100 border-slate-300' : 'glass border-cyan-500/10'}`}>
             <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border ${isGrey ? 'bg-white border-slate-300' : 'bg-cyan-500/5 border-cyan-500/10'}`}>
                <Search className={`w-8 h-8 ${isGrey ? 'text-slate-400' : 'text-cyan-500/20'}`} />
             </div>
             <p className={`font-medium ${isGrey ? 'text-slate-600' : 'text-slate-400'}`}>No transactions yet recorded.</p>
             <p className={`text-sm mt-1 ${isGrey ? 'text-slate-500' : 'text-slate-500'}`}>Start by adding your first expense or income.</p>
          </div>
        ) : (
          <AnimatePresence>
            {transactions.map(transaction => (
              <motion.div
                key={transaction._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                layout
                className={`p-4 rounded-3xl border group flex items-center justify-between transition-all duration-300 border-r-4 ${
                  isGrey 
                    ? 'bg-white/60 border-slate-300 hover:bg-white hover:border-cyan-300 shadow-sm' 
                    : 'glass border-cyan-500/10 card-hover'
                } ${transaction.amount < 0 ? 'border-r-rose-500/40' : 'border-r-emerald-500/40'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${getCategoryColor(transaction.category)}`}>
                    {getCategoryIcon(transaction.category)}
                  </div>
                  <div>
                    <h5 className={`font-semibold transition-colors ${isGrey ? 'text-slate-800' : 'text-slate-100 group-hover:text-cyan-400'}`}>{transaction.text}</h5>
                    <p className={`text-xs capitalize ${isGrey ? 'text-slate-500' : 'text-slate-500'}`}>{transaction.category} • {new Date(transaction.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className={`font-bold text-lg ${transaction.amount < 0 ? (isGrey ? 'text-rose-700' : 'text-rose-400') : (isGrey ? 'text-emerald-700' : 'text-emerald-400')}`}>
                    {transaction.amount < 0 ? '-' : '+'}{currency.symbol}{Math.abs(transaction.amount).toFixed(2)}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => deleteTransaction(transaction._id)}
                      className={`p-2 rounded-xl transition-all duration-300 transform active:scale-90 opacity-0 group-hover:opacity-100 ${isGrey ? 'text-slate-400 hover:text-rose-600 hover:bg-rose-100/50' : 'text-slate-600 hover:text-rose-500 hover:bg-rose-500/10'}`}
                      title="Delete Entry"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button 
                      onClick={() => alert('Options for this transaction')}
                      className={`p-2 rounded-xl transition-all duration-300 opacity-0 group-hover:opacity-100 ${isGrey ? 'text-slate-400 hover:text-slate-700' : 'text-slate-600 hover:text-slate-300'}`}
                      title="More Options"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default TransactionList;
