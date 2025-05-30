import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Filler,
  Legend,
  plugins,
  scales,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Filler,
  Legend
);
const LineChartOption = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid:{

        display: false,
      }
    },
    y: {
      begainAtzero:true,
      grid:{

        display: false,
      }
    },
  },
};

// Line Chart Component
const LineChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Data",
        data: [10, 1, 30, 25, 15, 40],
        fill: true,
        backgroundColor: "rgba(29, 129, 228, 0.2)", // light blue fill
        borderColor: "#1976d9", // MUI primary color
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return <Line data={data} options={options} />;
};

// Doughnut Chart Component
const DoughnutChart = () => {
  const data = {
    labels: ["Users", "Chats", "Messages"],
    datasets: [
      {
        label: "Usage Breakdown",
        data: [120, 80, 200],
        backgroundColor: ["#1976d2", "#4caf50", "#ff9800"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export { LineChart, DoughnutChart };
