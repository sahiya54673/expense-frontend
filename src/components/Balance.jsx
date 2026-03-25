import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Wallet, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const Balance = () => {
  const { transactions, currency } = useContext(GlobalContext);
  const [isGrey, setIsGrey] = React.useState(false);

  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      onClick={() => setIsGrey(!isGrey)}
      className={`rounded-3xl p-6 border transition-all duration-500 cursor-pointer shadow-premium ${
        isGrey 
          ? 'bg-emerald-100 text-slate-900 border-emerald-300 shadow-2xl scale-105 z-10' 
          : 'glass border-cyan-500/10 text-white'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <h4 className={`text-sm font-medium tracking-wide uppercase ${isGrey ? 'text-slate-500' : 'text-slate-400'}`}>Your Current Net Balance</h4>
        <div className={`p-2 rounded-lg transition-all ${isGrey ? 'bg-cyan-200/50 text-cyan-700' : 'bg-cyan-500/10 text-cyan-400'}`}>
          <Info size={16} />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl border ring-8 transition-all ${
          isGrey 
            ? 'bg-cyan-100/50 border-cyan-200 ring-cyan-100/30 text-cyan-700' 
            : 'bg-linear-to-tr from-cyan-500/10 to-transparent border-cyan-500/10 ring-cyan-500/5 text-cyan-400'
        }`}>
          <Wallet className="w-8 h-8 transition-transform duration-300" />
        </div>
        <div>
          <h2 className={`text-4xl font-bold tracking-tight transition-colors ${
            isGrey ? 'text-slate-900' : 'bg-clip-text text-transparent bg-linear-to-r from-white via-cyan-100 to-cyan-400'
          }`}>
            {currency.symbol}{total}
          </h2>
          <p className={`text-xs flex items-center gap-1 mt-1 font-medium ${isGrey ? 'text-slate-500' : 'text-slate-500'}`}>
             <span className={`inline-block w-2 h-2 rounded-full animate-pulse ${isGrey ? 'bg-cyan-500' : 'bg-cyan-500'}`}></span>
             Updated live with your transactions
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Balance;
