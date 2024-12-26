import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const HexagonRadar = ({ setIsAnalyze }) => {
  const data = {
    labels: [
      "Part 1",
      "Part 2",
      "Part 3",
      "Part 4",
      "Part 5",
      "Part 6",
      "Part 7",
    ], // 꼭지점 이름
    datasets: [
      {
        label: "합격자 평균",
        data: [40, 60, 80, 90, 80, 60, 40],
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
      {
        label: "Lyght님의 점수",
        data: [25, 25, 45, 55, 35, 35, 25],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        ticks: {
          display: false, // 값 레이블 제거
        },
        grid: {
          color: "#666", // 회색 줄
        },
        angleLines: {
          color: "#666", // 꼭지점 연결 선 회색
        },
        min: 0,
        max: 100,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white", // 범례 텍스트 색상
        },
      },
    },
  };

  return (
    <div
      onClick={() => setIsAnalyze(false)} // 클릭 시 setIsAnalyze를 false로 설정
      className="flex flex-col justify-center items-center h-screen bg-black cursor-pointer"
    >
      <Radar data={data} options={options} width={600} height={600} />
      {/* 분석률 텍스트 */}
      <p className="mt-6 text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-yellow-300 to-red-500 bg-clip-text text-transparent animate-gradient">
        AI가 분석한 Lyght님의 합격률은 현재 74%입니다.
      </p>
    </div>
  );
};

export default HexagonRadar;
