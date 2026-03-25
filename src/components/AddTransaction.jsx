import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Send, DollarSign, Tag, Info, ListOrdered } from 'lucide-react';
import { motion } from 'framer-motion';

const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('General');
  const [type, setType] = useState('expense');

  const { addTransaction, currency } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const signedAmount = type === 'expense' ? -Math.abs(amount) : Math.abs(amount);

    const newTransaction = {
      text,
      amount: signedAmount,
      category,
      type
    }

    addTransaction(newTransaction);
    
    // Reset form
    setText('');
    setAmount('');
    setCategory('General');
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2 group">
        <label htmlFor="text" className="text-sm font-medium text-slate-500 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
           <Tag size={16} /> Label
        </label>
        <div className="relative">
          <input 
            className="w-full bg-slate-900/50 border border-cyan-500/10 rounded-2xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/30 transition-all card-hover"
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="e.g. Salary, Rent" 
            required
          />
        </div>
      </div>

      <div className="space-y-2 group">
        <label htmlFor="amount" className="text-sm font-medium text-slate-500 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
           <span className="font-bold text-lg">{currency.symbol}</span> Amount ({currency.code})
        </label>
        <div className="relative">
          <input 
            className="w-full bg-slate-900/50 border border-cyan-500/10 rounded-2xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/30 transition-all card-hover"
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder={`0.00 ${currency.code}`} 
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 group">
          <label className="text-sm font-medium text-slate-500 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
             <ListOrdered size={16} /> Category
          </label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-900/50 border border-cyan-500/10 rounded-2xl py-3 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 cursor-pointer card-hover"
          >
            <option className="bg-slate-900 text-white" value="General">General</option>
            <option className="bg-slate-900 text-white" value="Food">Food & Dining</option>
            <option className="bg-slate-900 text-white" value="Shopping">Shopping</option>
            <option className="bg-slate-900 text-white" value="Rent">Rent & Housing</option>
            <option className="bg-slate-900 text-white" value="Utilities">Utilities</option>
            <option className="bg-slate-900 text-white" value="Health">Healthcare</option>
          </select>
        </div>

        <div className="space-y-2 group">
          <label className="text-sm font-medium text-slate-500 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
             <Info size={16} /> Type
          </label>
          <div className="flex bg-slate-900/50 p-1 rounded-2xl border border-cyan-500/10 h-[50px]">
             <button 
               type="button"
               onClick={() => setType('expense')}
               className={`flex-1 rounded-xl text-sm font-bold transition-all ${type === 'expense' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'text-slate-500 hover:text-rose-400'}`}
             >
               Exp
             </button>
             <button 
               type="button"
               onClick={() => setType('income')}
               className={`flex-1 rounded-xl text-sm font-bold transition-all ${type === 'income' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-emerald-400'}`}
             >
               Inc
             </button>
          </div>
        </div>
      </div>

      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-linear-to-r from-cyan-500 to-indigo-600 text-white font-bold py-4 rounded-2xl shadow-premium flex items-center justify-center gap-3 mt-4 hover:shadow-cyan-500/30 transition-shadow duration-300"
      >
        <Send size={18} className="rotate-45 -translate-y-0.5" /> Post Transaction
      </motion.button>
    </form>
  );
}

export default AddTransaction;
