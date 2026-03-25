import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { PieChart, List, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartSection = () => {
  const { transactions } = useContext(GlobalContext);
  const [isGrey, setIsGrey] = React.useState(false);

  const expenses = transactions.filter(t => t.amount < 0);
  
  const categories = [...new Set(expenses.map(t => t.category))];
  const dataPoints = categories.map(cat => {
    return expenses
      .filter(t => t.category === cat)
      .reduce((acc, current) => acc + Math.abs(current.amount), 0);
  });

  const chartData = {
    labels: categories,
    datasets: [
      {
        data: dataPoints,
        backgroundColor: [
          'rgba(34, 211, 238, 0.7)',
          'rgba(99, 102, 241, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(14, 165, 233, 0.7)',
          'rgba(20, 184, 166, 0.7)',
          'rgba(129, 140, 248, 0.7)',
        ],
        borderColor: [
          'rgba(34, 211, 238, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(14, 165, 233, 1)',
          'rgba(20, 184, 166, 1)',
          'rgba(129, 140, 248, 1)',
        ],
        borderWidth: 2,
        hoverOffset: 15,
        spacing: 10,
        borderRadius: 8
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: isGrey ? '#475569' : '#94a3b8',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            family: 'Outfit',
            size: 13
          }
        }
      },
      tooltip: {
        backgroundColor: isGrey ? '#fff' : '#0f172a',
        titleColor: isGrey ? '#0f172a' : '#fff',
        bodyColor: isGrey ? '#475569' : '#94a3b8',
        borderColor: 'rgba(34, 211, 238, 0.1)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
            }
            return label;
          }
        }
      }
    },
    cutout: '75%',
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      onClick={() => setIsGrey(!isGrey)}
      className={`rounded-3xl p-8 border transition-all duration-500 cursor-pointer shadow-premium ${
        isGrey 
          ? 'bg-emerald-100 text-slate-900 border-emerald-300 shadow-2xl z-10' 
          : 'glass border-cyan-500/10 text-white'
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl transition-all ${isGrey ? 'bg-cyan-200/50 text-cyan-700' : 'bg-cyan-500/10 text-cyan-400'}`}>
            <PieChart size={22} />
          </div>
          <h3 className={`text-xl font-bold transition-colors ${isGrey ? 'text-slate-900' : 'bg-clip-text text-transparent bg-linear-to-r from-white to-cyan-400'}`}>Spending by Category</h3>
        </div>
        <div className={`hidden sm:flex items-center gap-2 text-sm font-medium ${isGrey ? 'text-slate-400' : 'text-slate-500'}`}>
           <TrendingUp size={16} /> Insight Active
        </div>
      </div>

      <div className="h-[300px] relative flex items-center justify-center">
        {dataPoints.length > 0 ? (
          <>
            <Doughnut data={chartData} options={chartOptions} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] text-center pointer-events-none">
              <span className={`text-xs font-medium uppercase tracking-widest block mb-1 ${isGrey ? 'text-slate-400' : 'text-slate-500'}`}>Top Expense</span>
              <span className={`text-2xl font-bold block ${isGrey ? 'text-slate-900' : 'text-white'}`}>
                {categories.length > 0 ? categories[dataPoints.indexOf(Math.max(...dataPoints))] : 'None'}
              </span>
            </div>
          </>
        ) : (
          <div className="text-center py-10 opacity-40">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isGrey ? 'bg-slate-100' : 'bg-slate-800'}`}>
              <List className={`w-8 h-8 ${isGrey ? 'text-slate-400' : 'text-slate-500'}`} />
            </div>
            <p className={`text-sm font-medium ${isGrey ? 'text-slate-400' : 'text-slate-400'}`}>Not enough data to display 📊</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChartSection;
