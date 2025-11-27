import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend,
  Filler
);

const Graph = ({ graphData }) => {
  const labels = graphData?.map((item) => `${item.clickDate}`);
  const userPerDaya = graphData?.map((item) => item.count);

  const data = {
    labels:
      graphData.length > 0
        ? labels
        : Array(12).fill(""),
    datasets: [
      {
        label: "Clicks",
        data:
          graphData.length > 0
            ? userPerDaya
            : [1, 2, 3, 5, 7, 8, 9, 8, 6, 4, 2, 1],
        backgroundColor: "rgba(79, 70, 229, 0.7)", // Indigo
        borderRadius: 8,
        barThickness: 26,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#334155",
          font: { weight: 600 },
        },
      },
      tooltip: {
        backgroundColor: "#1e293b", // slate-800
        titleColor: "#f1f5f9",
        bodyColor: "#e2e8f0",
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(203, 213, 225, 0.35)", // lighter grid
        },
        ticks: {
          color: "#475569",
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: "#475569",
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graph;
