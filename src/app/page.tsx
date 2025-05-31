"use client";

import { useState, useEffect, useRef } from "react";
import { HiOutlineBackspace } from "react-icons/hi"; // 백스페이스 아이콘 임포트
import { FaCalculator } from "react-icons/fa"; // 계산기 아이콘 임포트

export default function Home() {
  const [amount, setAmount] = useState(0); // 현재 금액 상태
  const [history, setHistory] = useState<{ change: number; total: number }[]>([]); // 변경 내역 저장 (변경 금액 + 결과 금액)
  const historyEndRef = useRef<HTMLDivElement>(null);

  // 스크롤을 항상 최신 내역으로 이동시키는 함수
  const scrollToBottom = () => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 내역이 변경될 때마다 스크롤 이동
  useEffect(() => {
    scrollToBottom();
  }, [history]);

  // 페이지 로드 시 저장된 데이터 불러오기
  useEffect(() => {
    const savedAmount = localStorage.getItem('calculatorAmount');
    const savedHistory = localStorage.getItem('calculatorHistory');
    
    if (savedAmount) {
      setAmount(Number(savedAmount));
    }
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // 금액을 더하거나 빼는 함수 및 내역 기록
  const handleUpdateAmount = (value: number) => {
    const newAmount = amount + value;
    setAmount(newAmount);
    const newHistory = [...history, { change: value, total: newAmount }];
    setHistory(newHistory);
    
    // localStorage에 저장
    localStorage.setItem('calculatorAmount', newAmount.toString());
    localStorage.setItem('calculatorHistory', JSON.stringify(newHistory));
  };

  // 버튼 클릭 이벤트 핸들러
  const handleButtonClick = (e: React.MouseEvent, value: number) => {
    e.preventDefault();
    e.stopPropagation();
    handleUpdateAmount(value);
  };

  // 전체 클리어
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAmount(0);
    setHistory([]);
    localStorage.removeItem('calculatorAmount');
    localStorage.removeItem('calculatorHistory');
  };

  // 마지막 작업 취소 (백스페이스 역할)
  const handleUndoLast = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (history.length > 0) {
      const newHistory = history.slice(0, -1);
      const previousAmount = newHistory.length > 0 ? newHistory[newHistory.length - 1].total : 0;
      setAmount(previousAmount);
      setHistory(newHistory);
      
      localStorage.setItem('calculatorAmount', previousAmount.toString());
      localStorage.setItem('calculatorHistory', JSON.stringify(newHistory));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-orange-100 to-orange-300 p-2 sm:p-4" style={{ fontFamily: 'Paperlogy, sans-serif' }}>

      {/* 핸드폰 모양 컨테이너 */}
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-3xl shadow-2xl p-3 sm:p-6 flex flex-col items-center mb-4 sm:mb-8">
         {/* 제목 영역 */}
        <div className="flex items-center mb-4 sm:mb-6">
          <FaCalculator className="text-orange-400 text-3xl sm:text-4xl mr-2" />
          <h1 className="text-2xl sm:text-4xl font-extrabold text-orange-400 drop-shadow-md">불티나 계산기</h1>
        </div>

        {/* 계산기 본체 (흰색 영역) */}
        <div className="w-full bg-white rounded-xl shadow-md flex flex-col items-center p-3 sm:p-6 mb-4 sm:mb-6 mb-auto">
          {/* 내역 표시 영역 */}
          <div className="w-full h-24 sm:h-32 overflow-y-auto border border-gray-300 rounded p-2 mb-3 sm:mb-4 text-sm text-gray-800 font-mono">
            {history.map((entry, index) => (
              <div key={index} className="flex justify-between">
                <span>{entry.change > 0 ? '+' : ''}{entry.change.toLocaleString()}</span>
                <span>{entry.total.toLocaleString()}원</span>
              </div>
            ))}
            <div ref={historyEndRef} />
          </div>

          {/* 결과 표시 영역 */}
          <div className="text-3xl sm:text-4xl font-mono text-orange-600 mb-6 sm:mb-8 break-words text-center w-full">
            {amount.toLocaleString()}원
          </div>

          {/* 금액 버튼 영역 (좌우 2열 그리드) */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4 w-full mb-3 sm:mb-4">
            {/* 좌측: 덧셈 버튼 */}
            <div className="flex flex-col gap-2 sm:gap-4">
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white text-xl rounded-lg py-2 font-bold shadow-md flex items-center justify-end px-4"
                onClick={(e) => handleButtonClick(e, 10000)}
              >
                 +10,000원
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white text-xl rounded-lg py-2 font-bold shadow-md flex items-center justify-end px-4"
                onClick={(e) => handleButtonClick(e, 5000)}
              >
                 +5,000원
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white text-xl rounded-lg py-2 font-bold shadow-md flex items-center justify-end px-4"
                onClick={(e) => handleButtonClick(e, 1000)}
              >
                 +1,000원
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white text-xl rounded-lg py-2 font-bold shadow-md flex items-center justify-end px-4"
                onClick={(e) => handleButtonClick(e, 500)}
              >
                 +500원
              </button>
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white text-xl rounded-lg py-2 font-bold shadow-md flex items-center justify-end px-4"
                onClick={(e) => handleButtonClick(e, 100)}
              >
                 +100원
              </button>
            </div>

            {/* 우측: 뺄셈 버튼 */}
            <div className="flex flex-col gap-2 sm:gap-4">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white text-xl rounded-lg py-2 font-bold shadow-md flex items-center justify-end px-4"
                onClick={(e) => handleButtonClick(e, -10000)}
              >
                 -10,000원
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white text-xl rounded-lg py-2 font-bold shadow-md flex items-center justify-end px-4"
                onClick={(e) => handleButtonClick(e, -5000)}
              >
                 -5,000원
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white text-xl rounded-lg py-2 font-bold shadow-md flex items-center justify-end px-4"
                onClick={(e) => handleButtonClick(e, -1000)}
              >
                 -1,000원
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white text-xl rounded-lg py-2 font-bold shadow-md flex items-center justify-end px-4"
                onClick={(e) => handleButtonClick(e, -500)}
              >
                 -500원
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white text-xl rounded-lg py-2 font-bold shadow-md flex items-center justify-end px-4"
                onClick={(e) => handleButtonClick(e, -100)}
              >
                 -100원
              </button>
            </div>
          </div>

          {/* 제어 버튼 영역 (아래에 별도 배치) */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <button
              className="bg-red-500 hover:bg-red-600 text-white text-xl rounded-lg py-2 font-bold shadow-md"
              onClick={(e) => handleClear(e)}
            >
              C
            </button>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-2xl rounded-lg py-2 font-bold shadow-md flex items-center justify-center"
              onClick={(e) => handleUndoLast(e)}
            >
              <HiOutlineBackspace />
            </button>
          </div>

        </div>

      </div>

      {/* 광고 단위 코드 */}
      <ins className="adsbygoogle"
           style={{ display: 'block', minHeight: '100px' }}
           data-ad-client="ca-pub-3297361889610977"
           data-ad-slot="4608762560"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
      </script>

    </div>
  );
}
