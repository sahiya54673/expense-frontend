import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

const IncomeExpenses = () => {
  const { transactions, currency } = useContext(GlobalContext);
  const [isIncomeGrey, setIsIncomeGrey] = React.useState(false);
  const [isExpenseGrey, setIsExpenseGrey] = React.useState(false);

  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  return (
    <>
      {/* Income Card */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ y: -5 }}
        onClick={() => setIsIncomeGrey(!isIncomeGrey)}
        className={`rounded-3xl p-6 border transition-all duration-500 cursor-pointer shadow-premium ${
          isIncomeGrey 
            ? 'bg-emerald-100 text-slate-900 border-emerald-300 shadow-2xl scale-105 z-10' 
            : 'glass border-cyan-500/10 text-white'
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          <h4 className={`text-sm font-medium tracking-wide uppercase ${isIncomeGrey ? 'text-slate-500' : 'text-slate-400'}`}>Total Revenue</h4>
          <div className={`p-2 rounded-lg transition-all ${isIncomeGrey ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-500/10 text-emerald-400'}`}>
            <ArrowUpRight size={16} />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl border ring-8 transition-all ${
            isIncomeGrey 
              ? 'bg-emerald-50 border-emerald-100 ring-emerald-50 text-emerald-600' 
              : 'bg-linear-to-tr from-emerald-500/10 to-transparent border-emerald-500/10 ring-emerald-500/5 text-emerald-400'
          }`}>
            <TrendingUp className="w-8 h-8 transition-transform duration-300" />
          </div>
          <div>
            <h2 className={`text-3xl font-bold tracking-tight ${isIncomeGrey ? 'text-emerald-600' : 'text-emerald-400'}`}>
              +{currency.symbol}{income}
            </h2>
            <p className={`text-xs font-medium mt-1 ${isIncomeGrey ? 'text-slate-500' : 'text-slate-400'}`}>
              Active Earnings
            </p>
          </div>
        </div>
      </motion.div>

      {/* Expense Card */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ y: -5 }}
        onClick={() => setIsExpenseGrey(!isExpenseGrey)}
        className={`rounded-3xl p-6 border transition-all duration-500 cursor-pointer shadow-premium ${
          isExpenseGrey 
            ? 'bg-emerald-100 text-slate-900 border-emerald-300 shadow-2xl scale-105 z-10' 
            : 'glass border-cyan-500/10 text-white'
        }`}
      >
        <div className="flex justify-between items-start mb-4">
          <h4 className={`text-sm font-medium tracking-wide uppercase ${isExpenseGrey ? 'text-slate-500' : 'text-slate-400'}`}>Total Spending</h4>
          <div className={`p-2 rounded-lg transition-all ${isExpenseGrey ? 'bg-rose-100 text-rose-600' : 'bg-rose-500/10 text-rose-400'}`}>
            <ArrowDownRight size={16} />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl border ring-8 transition-all ${
            isExpenseGrey 
              ? 'bg-rose-50 border-rose-100 ring-rose-50 text-rose-600' 
              : 'bg-linear-to-tr from-rose-500/10 to-transparent border-rose-500/10 ring-rose-500/5 text-rose-400'
          }`}>
            <TrendingDown className="w-8 h-8 transition-transform duration-300" />
          </div>
          <div>
            <h2 className={`text-3xl font-bold tracking-tight ${isExpenseGrey ? 'text-rose-600' : 'text-rose-400'}`}>
              -{currency.symbol}{expense}
            </h2>
            <p className={`text-xs font-medium mt-1 ${isExpenseGrey ? 'text-slate-500' : 'text-slate-400'}`}>
              All Disbursements
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default IncomeExpenses;
