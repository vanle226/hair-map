import React, { useState } from 'react';
import ScalpMap from './components/ScalpMap';
import { Gender } from './types';
import { User, Sparkles, ArrowRight } from 'lucide-react';

// SVG component for the Viet Beauty logo
const VietBeautyLogo = () => (
  <svg className="h-8 w-8" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Viet Beauty Logo">
    <defs>
      <clipPath id="leaf-right-half">
        <rect x="20" y="0" width="20" height="40" />
      </clipPath>
      <path 
        id="leaf-path"
        d="M20 1 C20 1, 1 12, 1 25 C1 40, 20 39, 20 39 S39 40, 39 25 C39 12, 20 1, 20 1 Z" 
      />
    </defs>
    
    {/* Filled right half */}
    <use href="#leaf-path" fill="#20C997" clipPath="url(#leaf-right-half)" />

    {/* Outline */}
    <use href="#leaf-path" stroke="#4A5568" strokeWidth="1.5" />

    {/* Veins */}
    <path d="M20 1 V39" stroke="#4A5568" strokeWidth="1.5" />
    {/* Left Veins */}
    <path d="M20 10 L8 15" stroke="#4A5568" strokeWidth="1.5" />
    <path d="M20 20 L5 23" stroke="#4A5568" strokeWidth="1.5" />
    <path d="M20 30 L8 28" stroke="#4A5568" strokeWidth="1.5" />
    {/* Right Veins */}
    <path d="M20 10 L32 15" stroke="#4A5568" strokeWidth="1.5" />
    <path d="M20 20 L35 23" stroke="#4A5568" strokeWidth="1.5" />
    <path d="M20 30 L32 28" stroke="#4A5568" strokeWidth="1.5" />
  </svg>
);

// Zalo button using the corrected embedded PNG image
const ZaloButton = () => (
  <a
    href="https://zalo.me/0342503497"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 group"
    aria-label="Chat với chúng tôi qua Zalo"
  >
    <img
      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMi43ODIgMC4xNjYwMTZIMjcuMTk5QzMzLjI2NTMgMC4xNjYwMTYgMzYuODEwMyAxLjA1NzAxIDM5Ljk1NzIgMi43NDQyMUM0My4xMDQxIDQuNDMxNCA0NS41ODc1IDYuODk1ODUgNDcuMjU1NyAxMC4wNDI4QzQ4Ljk0MjkgMTMuMTg5NyA0OS44MzM5IDE2LjczNDcgNDkuODMzOSAyMi44MDFWMjcuMTk5MUM0OS44MzM5IDMzLjI2NTQgNDguOTQyOSAzNi44MTA0IDQ3LjI1NTcgMzkuOTU3M0M0NS41Njg1IDQzLjEwNDIgNDMuMTA0MSA0NS41ODc3IDM5Ljk1NzIgNDcuMjU1OUMzNi44MTAzIDQ4Ljk0MzEgMzMuMjY1MyA0OS44MzQxIDI3LjE5OSA0OS44MzQxSDIyLjgwMDlDMTYuNzM0NiA0OS44MzQxIDEzLjE4OTYgNDguOTQzMSAxMC4wNDI3IDQ3LjI1NTlDNi44OTU4MyA0NS41Njg3IDQuNDEyNDMgNDMuMTA0MiAyLjc0NDIgMzkuOTU3M0MxLjA1NyAzNi44MTA0IDAuMTY2MDE2IDMzLjI2NTQgMC4xNjYwMTYgMjcuMTk5MVYyMi44MDFDMC4xNjYwMTYgMTYuNzM0NyAxLjA1NyAxMy4xODk3IDIuNzQ0MiAxMC4wNDI4QzQuNDMxMzkgNi44OTU4NSA2Ljg5NTgzIDQuNDEyNDUgMTAuMDQyNyAyLjc0NDIxQzEzLjE3MDcgMS4wNTcwMSAxNi43MzQ2IDAuMTY2MDE2IDIyLjc4MiAwLjE2NjAxNloiIGZpbGw9IiMwMDY4RkYiLz4KPHBhdGggb3BhY2l0eT0iMC4xMiIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00OS44MzM2IDI2LjQ3MzZWMjcuMTk5NEM0OS44MzM2IDMzLjI2NTcgNDguOTQyNyAzNi44MTA3IDQ3LjI1NTUgMzkuOTU3NkM0NS41NjgzIDQzLjEwNDUgNDMuMTAzOCA0NS41ODc5IDM5Ljk1NjkgNDcuMjU2MkMzNi44MSA0OC45NDM0IDMzLjI2NSA0OS44MzQ0IDI3LjE5ODcgNDkuODM0NEgyMi44MDA3QzE3LjgzNjkgNDkuODM0NCAxNC41NjEyIDQ5LjIzNzggMTEuODEwNCA0OC4wOTY2TDcuMjc1MzkgNDMuNDI2N0w0OS44MzM2IDI2LjQ3MzZaIiBmaWxsPSIjMDAxQTMzIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNy43NzkgNDMuNTg5MkMxMC4xMDE5IDQzLjg0NiAxMy4wMDYxIDQzLjE4MzYgMTUuMDY4MiA0Mi4xODI1QzI0LjAyMjUgNDcuMTMxOCAzOC4wMTk3IDQ2Ljg5NTQgNDYuNDkyMyA0MS40NzMyQzQ2LjgyMDkgNDAuOTgwMyA0Ny4xMjc5IDQwLjQ2NzcgNDcuNDEyOCAzOS45MzYzQzQ5LjEwNjIgMzYuNzc3OSA1MC4wMDA0IDMzLjIyIDUwLjAwMDQgMjcuMTMxNlYyMi43MTc1QzUwLjAwMDQgMTYuNjI5IDQ5LjEwNjIgMTMuMDcxMSA0Ny40MTI4IDkuOTEyNzNDNDUuNzM4NSA2Ljc1NDM2IDQzLjI0NjEgNC4yODA5MyA0MC4wODc3IDIuNTg3NThDMzYuOTI5MyAwLjg5NDIzOSAzMy4zNzE0IDAgMjcuMjgzIDBIMjIuODQ5OUMxNy42NjQ0IDAgMTQuMjk4MiAwLjY1Mjc1NCAxMS40Njk5IDEuODk4OTNDMTEuMzE1MyAyLjAzNzM3IDExLjE2MzYgMi4xNzgxOCAxMS4wMTUxIDIuMzIxMzVDMi43MTczNCAxMC4zMjAzIDIuMDg2NTggMjcuNjU5MyA5LjEyMjc5IDM3LjA3ODJDOS4xMzA2NCAzNy4wOTIxIDkuMTM5MzMgMzcuMTA2MSA5LjE0ODg5IDM3LjEyMDNDMTAuMjMzNCAzOC43MTg1IDkuMTg2OTQgNDEuNTE1NCA3LjU1MDY4IDQzLjE1MTZDNy4yODQzMSA0My4zOTkgNy4zNzk0NCA0My41NTEyIDcuNzc5IDQzLjU4OTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjAuNTYzMiAxN0gxMC44MzgyVjE5LjA4NTNIMTcuNTg2OUwxMC45MzI5IDI3LjMzMTdDMTAuNzI0NCAyNy42MzUgMTAuNTcyOCAyNy45MTk0IDEwLjU3MjggMjguNTYzOVYyOS4wOTQ3SDE5Ljc0OEMyMC4yMDMgMjkuMDk0NyAyMC41ODIyIDI4LjcxNTYgMjAuNTgyMiAyOC4yNjA2VjI3LjE0MjFIMTMuNDkyMkwxOS43NDggMTkuMjkzOEMxOS44NDI4IDE5LjE4MDEgMjAuMDEzNCAxOC45NzE2IDIwLjA4OTMgMTguODc2OEwyMC4xMjcyIDE4LjgxOTlDMjAuNDg3NCAxOC4yODkxIDIwLjU2MzIgMTcuODM0MSAyMC41NjMyIDE3LjI4NDRWMTdaIiBmaWxsPSIjMDA2OEZGIi8+CjxwYXRoIGQ9Ik0zMi45NDE2IDI5LjA5NDdIMzQuMzI1NVYxN0gzMi4yNDAyVjI4LjM5MzNDMzIuMjQwMiAyOC43NzI1IDMyLjU0MzUgMjkuMDk0NyAzMi45NDE2IDI5LjA5NDdaIiBmaWxsPSIjMDA2OEZGIi8+CjxwYXRoIGQ9Ik0yNS44MTQgMTkuNjkyNEMyMy4xOTc5IDE5LjY5MjQgMjEuMDc0NyAyMS44MTU2IDIxLjA3NDcgMjQuNDMxN0MyMS4wNzQ3IDI3LjA0NzggMjMuMTk3OSAyOS4xNzEgMjUuODE0IDI5LjE3MUMyOC40MzAxIDI5LjE3MSAzMC41NTMzIDI3LjA0NzggMzAuNTUzMyAyNC40MzE3QzMwLjU3MjMgMjEuODE1NiAyOC40NDkxIDE5LjY5MjQgMjUuODE0IDE5LjY5MjRaTTI1LjgxNCAyNy4yMTg0QzI0LjI3ODUgMjcuMjE4NCAyMy4wMjczIDI1Ljk2NzIgMjMuMDI3MyAyNC40MzE3QzIzLjAyNzMgMjIuODk2MiAyNC4yNzg1IDIxLjY0NSAyNS44MTQgMjEuNjQ1QzI3LjM0OTUgMjEuNjQ1IDI4LjYwMDcgMjIuODk2MiAyOC42MDA3IDI0LjQzMTdDMjguNjAwNyAyNS45NjcyIDI3LjM2ODUgMjcuMjE4NCAyNS44MTQgMjcuMjE4NFoiIGZpbGw9IiMwMDY4RkYiLz4KPHBhdGggZD0iTTQwLjQ4NjcgMTkuNjE2MkMzNy44NTE2IDE5LjYxNjIgMzUuNzA5NSAyMS43NTg0IDM1LjcwOTUgMjQuMzkzNEMzNS43MDk1IDI3LjAyODUgMzcuODUxNiAyOS4xNzA3IDQwLjQ4NjcgMjkuMTcwN0M0My4xMjE3IDI5LjE3MDcgNDUuMjYzOSAyNy4wMjg1IDQ1LjI2MzkgMjQuMzkzNEM0NS4yNjM5IDIxLjc1ODQgNDMuMTIxNyAxOS42MTYyIDQwLjQ4NjcgMTkuNjE2MlpNNDAuNDg2NyAyNy4yMTgxQzM4LjkzMjIgMjcuMjE4MSAzNy42ODEgMjUuOTY2OSAzNy42ODEgMjQuNDEyNEMzNy42ODEgMjIuODU3OSAzOC45MzIyIDIxLjYwNjcgNDAuNDg2NyAyMS42MDY3QzQyLjA0MTIgMjEuNjA2NyA0My4yOTI0IDIyLjg1NzkgNDMuMjkyNCAyNC40MTI0QzQzLjI5MjQgMjUuOTY2OSA0Mi4wNDEyIDI3LjIxODEgNDAuNDg2NyAyNy4yMTgxWiIgZmlsbD0iIzAwNjhGRiIvPgo8cGF0aCBkPSJNMjkuNDU2MiAyOS4wOTQ0SDMwLjU3NDdWMTkuOTU3SDI4LjYyMjFWMjguMjc5M0MyOC42MjIxIDI4LjcxNTMgMjkuMDAxMiAyOS4wOTQ0IDI5LjQ1NjIgMjkuMDk0NFoiIGZpbGw9IiMwMDY4RkYiLz4KPC9zdmc+Cg=="
      alt="Zalo Logo"
      className="w-16 h-16 rounded-2xl shadow-xl transition-transform group-hover:scale-110"
    />
  </a>
);

const App: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col font-sans">
      
      <header className="w-full bg-white shadow-sm border-b border-slate-100 py-4 z-10">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Hair Analysis Tool</h1>
            <p className="text-slate-500 text-sm">Công cụ trực quan hóa sức khỏe da đầu</p>
          </div>
          <div className="flex items-center gap-4">
            {selectedGender && (
              <button 
                onClick={() => setSelectedGender(null)}
                className="text-sm text-slate-500 hover:text-rose-500 font-medium transition-colors"
              >
                Đổi giới tính
              </button>
            )}
            <a href="https://minoxidil.com.vn/" target="_blank" rel="noopener noreferrer" title="Visit Viet Beauty">
              <VietBeautyLogo />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        {!selectedGender ? (
          // SELECTION SCREEN
          <div className="max-w-4xl w-full animate-fadeIn">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-3">Chọn đối tượng phân tích</h2>
              <p className="text-slate-500">Đặc điểm rụng tóc và vùng da đầu có sự khác biệt giữa Nam và Nữ</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4">
              {/* Male Card */}
              <button
                onClick={() => setSelectedGender('male')}
                className="group relative overflow-hidden bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:border-blue-300 hover:shadow-blue-100/50 transition-all duration-300 text-left flex flex-col items-center md:items-start"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <User size={32} strokeWidth={2.5} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                  Nam giới
                </h3>
                <p className="text-slate-500 mb-6 text-center md:text-left">
                  Phân tích theo mô hình rụng tóc hói kiểu nam (Androgenetic Alopecia), chữ M, hói đỉnh.
                </p>
                
                <div className="mt-auto flex items-center gap-2 text-blue-600 font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  BẮT ĐẦU <ArrowRight size={16} />
                </div>
              </button>

              {/* Female Card */}
              <button
                onClick={() => setSelectedGender('female')}
                className="group relative overflow-hidden bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:border-rose-300 hover:shadow-rose-100/50 transition-all duration-300 text-left flex flex-col items-center md:items-start"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>

                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-rose-500 group-hover:text-white transition-colors duration-300">
                  <Sparkles size={32} strokeWidth={2.5} />
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-rose-600 transition-colors">
                  Nữ giới
                </h3>
                <p className="text-slate-500 mb-6 text-center md:text-left">
                  Phân tích theo mô hình rụng tóc lan tỏa, thưa đỉnh và đường rẽ ngôi (Ludwig Scale).
                </p>

                <div className="mt-auto flex items-center gap-2 text-rose-600 font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  BẮT ĐẦU <ArrowRight size={16} />
                </div>
              </button>
            </div>
          </div>
        ) : (
          // MAP COMPONENT WRAPPER
          <div className="w-full animate-fadeIn">
            <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-0 px-4">
              <p className="text-slate-600 leading-relaxed">
                Công cụ này giúp bạn hình dung rõ hơn về kiểu rụng tóc hói.
                <br />
                Nếu bạn có sợi tóc mảnh dần, khó mọc, hãy chọn vị trí tương ứng trên bản đồ da đầu. Dựa trên đó, bạn sẽ hiểu mình có xu hướng rụng tóc kiểu AGA ở giai đoạn nào.
              </p>
            </div>
            <ScalpMap 
              gender={selectedGender} 
              onBack={() => setSelectedGender(null)} 
            />
          </div>
        )}
      </main>

      <footer className="w-full py-6 text-center text-slate-400 text-xs">
        <p>© {new Date().getFullYear()} Scalp Health Visualizer. Disclaimer: For informational purposes only.</p>
      </footer>
      
      <ZaloButton />
    </div>
  );
};

export default App;
