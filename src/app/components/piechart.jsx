'use client'; // (if using Next.js App Router)

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ green = 60, red = 40}) {
  const data = {
    labels: ['Green Data', 'Red Data'],
    datasets: [
      {
        data: [green, red],
        backgroundColor: ['#22c55e', '#ef4444'], // Tailwind colors: green-500 & red-500
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
