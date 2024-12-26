import { useState, useEffect } from "react";
import "./App.css"; // Tailwind 설정 포함
import HexagonRadar from "./HexagonRadar";

function App() {
  const [isAnalyze, setIsAnalyze] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [loadingText, setLoadingText] = useState("분석중"); // 로딩 텍스트 상태

  const handleAnalyze = () => {
    setIsLoading(true); // 로딩 상태 활성화
    setTimeout(() => {
      setIsAnalyze(true);
      setIsLoading(false); // 로딩 상태 비활성화
    }, 3000); // 3초 뒤에 분석 시작
  };

  useEffect(() => {
    if (!isLoading) return; // 로딩 중이 아닐 때는 텍스트 변경 중지

    let index = 0;
    const texts = ["분석중.", "분석중..", "분석중..."]; // 반복될 텍스트

    const interval = setInterval(() => {
      setLoadingText(texts[index]);
      index = (index + 1) % texts.length; // 인덱스 순환
    }, 500);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, [isLoading]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        {isAnalyze ? (
          <HexagonRadar setIsAnalyze={setIsAnalyze} />
        ) : (
          <button
            onClick={handleAnalyze}
            className={`px-6 py-3 font-bold rounded-lg transition ${
              isLoading
                ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-white animate-pulse"
                : "bg-primary text-white hover:bg-opacity-90"
            }`}
            disabled={isLoading} // 로딩 중일 때 버튼 비활성화
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="loader w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>{loadingText}</span>
              </div>
            ) : (
              "Start Analysis"
            )}
          </button>
        )}
      </div>
    </>
  );
}

export default App;
