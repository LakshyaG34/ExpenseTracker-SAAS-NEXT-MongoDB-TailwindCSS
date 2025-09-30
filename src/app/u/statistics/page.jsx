'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const expenses = useSelector((state) => state.expenses.list);

  let totalIncome = 0;
  let totalExpense = 0;

  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].type === 'income') {
      totalIncome += expenses[i].amount;
    } else if (expenses[i].type === 'expense') {
      totalExpense += expenses[i].amount;
    }
  }

  if (totalIncome === 0 && totalExpense === 0) {
    return <div className="text-center text-gray-500">No data to show</div>
  }

  // now feed those values into the chart:
  const data = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ['#22c55e', '#ef4444'], // green/red
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#374151', // Tailwind gray-700
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-64 h-64">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
