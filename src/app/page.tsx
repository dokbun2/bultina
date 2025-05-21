"use client";

import { useState } from "react";
import { HiOutlineBackspace } from "react-icons/hi"; // 백스페이스 아이콘 임포트
import { FaCalculator } from "react-icons/fa"; // 계산기 아이콘 임포트

export default function Home() {
  const [amount, setAmount] = useState(0); // 현재 금액 상태
  const [history, setHistory] = useState<{ change: number; total: number }[]>([]); // 변경 내역 저장 (변경 금액 + 결과 금액)

  // 금액을 더하거나 빼는 함수 및 내역 기록
  const handleUpdateAmount = (value: number) => {
    const newAmount = amount + value;
    setAmount(newAmount);
    setHistory([...history, { change: value, total: newAmount }]);
  };

  // 전체 클리어
  const handleClear = () => {
    setAmount(0);
    setHistory([]);
  };

  // 마지막 작업 취소 (백스페이스 역할)
  const handleUndoLast = () => {
    if (history.length > 0) {
      const newHistory = history.slice(0, -1); // 마지막 항목 제거
      const previousAmount = newHistory.length > 0 ? newHistory[newHistory.length - 1].total : 0; // 이전 단계의 총 금액
      setAmount(previousAmount);
      setHistory(newHistory);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-orange-100 to-orange-300 p-4 font-paperlogy">

      {/* 핸드폰 모양 컨테이너 */}
      <div className="w-full bg-gray-800 rounded-3xl shadow-2xl p-6 flex flex-col items-center mb-8">
         {/* 제목 영역 (컨테이너 안으로 이동)*/}
        <div className="flex items-center mb-6">
          <FaCalculator className="text-orange-400 text-4xl mr-2" /> {/* 계산기 아이콘 */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-400 drop-shadow-md">불티나 계산기</h1>
        </div>

        {/* 계산기 본체 (흰색 영역) */}
        <div className="w-full bg-white rounded-xl shadow-md flex flex-col items-center p-6 mb-6">
          {/* 내역 표시 영역 */}
          <div className="w-full h-32 overflow-y-auto border border-gray-300 rounded p-2 mb-4 text-sm text-gray-800 font-mono">
            {history.map((entry, index) => (
              <div key={index} className="flex justify-between">
                <span>{entry.change > 0 ? '+' : ''}{entry.change.toLocaleString()}</span>
                <span>{entry.total.toLocaleString()}원</span>
              </div>
            ))}
          </div>

          {/* 결과 표시 영역 */}
          <div className="text-4xl font-mono text-orange-600 mb-8 break-words text-center w-full">
            {amount.toLocaleString()}원
          </div>

          {/* 금액 버튼 영역 (좌우 2열 그리드) */}
          <div className="grid grid-cols-2 gap-4 w-full mb-4">
            {/* 좌측: 덧셈 버튼 */}
            <div className="flex flex-col gap-4">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white text-xl rounded-lg py-4 font-bold shadow-md flex items-center justify-center"
                onClick={() => handleUpdateAmount(100)}
              >
                 +100원
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white text-xl rounded-lg py-4 font-bold shadow-md flex items-center justify-center"
                onClick={() => handleUpdateAmount(500)}
              >
                 +500원
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white text-xl rounded-lg py-4 font-bold shadow-md flex items-center justify-center"
                onClick={() => handleUpdateAmount(1000)}
              >
                 +1,000원
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white text-xl rounded-lg py-4 font-bold shadow-md flex items-center justify-center"
                onClick={() => handleUpdateAmount(5000)}
              >
                 +5,000원
              </button>
            </div>

            {/* 우측: 뺄셈 버튼 */}
            <div className="flex flex-col gap-4">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white text-xl rounded-lg py-4 font-bold shadow-md flex items-center justify-center"
                onClick={() => handleUpdateAmount(-100)}
              >
                 -100원
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white text-xl rounded-lg py-4 font-bold shadow-md flex items-center justify-center"
                onClick={() => handleUpdateAmount(-500)}
              >
                 -500원
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white text-xl rounded-lg py-4 font-bold shadow-md flex items-center justify-center"
                onClick={() => handleUpdateAmount(-1000)}
              >
                 -1,000원
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white text-xl rounded-lg py-4 font-bold shadow-md flex items-center justify-center"
                onClick={() => handleUpdateAmount(-5000)}
              >
                 -5,000원
              </button>
            </div>
          </div>

          {/* 제어 버튼 영역 (아래에 별도 배치) */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <button
              className="bg-red-500 hover:bg-red-600 text-white text-xl rounded-lg py-4 font-bold shadow-md"
              onClick={handleClear}
            >
              C
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-2xl rounded-lg py-4 font-bold shadow-md flex items-center justify-center"
              onClick={handleUndoLast}
            >
              <HiOutlineBackspace />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
