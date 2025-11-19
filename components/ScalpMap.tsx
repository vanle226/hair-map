import React, { useState } from 'react';
import { ScalpZoneData, ZoneId, Gender } from '../types';
import { Info, Activity, AlertCircle, User, ArrowLeft, Clock, Sparkles, ArrowRight } from 'lucide-react';

const MALE_ZONES: ScalpZoneData[] = [
  {
    id: ZoneId.A,
    name: 'VÙNG A – Trán / Đường chân tóc trước',
    symptoms: 'Đường chân tóc lùi lên, hình chữ M nhẹ, tóc con nhỏ, yếu.',
    causes: 'Dấu hiệu sớm nhất của AGA nam. Rất nhạy với DHT. → Nếu vùng này lùi nhanh → khả năng AGA rất cao.',
  },
  {
    id: ZoneId.B,
    name: 'VÙNG B – Hai bên thái dương',
    symptoms: 'Mỏng rõ, “hói thái dương”, lõm tạo thành chữ M.',
    causes: 'Đây là vùng đặc trưng nhất của hói nam, Miniaturization mạnh. → Dấu hiệu Norwood 2–3.',
  },
  {
    id: ZoneId.C,
    name: 'Vùng C – Đỉnh đầu (Crown/Vertex)',
    symptoms: 'Xoáy đỉnh mỏng, thấy rõ da, hói vòng tròn.',
    causes: 'AGA nam dạng “hói đỉnh”, giảm lưu lượng máu vùng đỉnh. → Hói nam thường từ B → A → C.',
  },
  {
    id: ZoneId.D,
    name: 'Vùng D – Giữa đầu',
    symptoms: 'Mỏng dần khi bệnh tiến triển, kết nối vùng trán và vùng đỉnh thành 1 vùng thưa lớn.',
    causes: 'Xuất hiện từ Norwood 4–6. Thể hiện AGA mạnh / lâu năm.',
  },
  {
    id: ZoneId.E,
    name: 'Vùng E – Sau đầu & gáy',
    symptoms: 'Dày, khỏe, ít rụng.',
    causes: 'Đây là vùng kháng DHT. Dựa vào vùng này mà bác sĩ lấy tóc cấy. → Nếu vùng này vẫn khỏe nhưng A–D mỏng → 99% là AGA nam.',
  },
];

const FEMALE_ZONES: ScalpZoneData[] = [
  {
    id: 'F1',
    name: 'Vùng 1 – ĐƯỜNG RẼ GIỮA (Midline Parting)',
    when: 'Thường là vùng thưa sớm nhất trong rụng tóc kiểu nữ. Thấy rõ hơn sau vài tháng đến vài năm rụng kéo dài. Nhiều người để ý rõ hơn sau các giai đoạn stress kéo dài, sau sinh, tiền mãn kinh.',
    symptoms: 'Đường rẽ rộng dần theo thời gian, khó che da đầu. Nhiều tóc tơ, mảnh, sợi nhỏ xen lẫn sợi to. Khi chụp từ trên xuống hoặc soi đèn, vùng giữa đầu trông mỏng hơn hẳn hai bên.',
    causes: 'Gợi ý rụng tóc kiểu nữ do nội tiết & di truyền (FPHL) – nang tóc dần nhỏ lại. Thường liên quan tới nhạy cảm với androgen, thay đổi nội tiết. Nếu từng có giai đoạn rụng nhanh, nhiều, rồi đường rẽ vẫn không dày lại hoàn toàn → có thể là FPHL chồng thêm rụng theo đợt.',
  },
  {
    id: 'F2',
    name: 'Vùng 2 – ĐỈNH ĐẦU (Crown / Vertex)',
    when: 'Thường rõ hơn sau khi vùng đường rẽ đã bắt đầu thưa một thời gian. Khách hay phát hiện khi soi gương dưới ánh sáng mạnh hoặc xem ảnh chụp từ trên xuống.',
    symptoms: 'Vùng xoáy đỉnh dễ lộ da hơn các vùng khác. Tóc quanh đỉnh mảnh, khó tạo độ phồng. Cảm giác “tóc ít hẳn ở giữa đầu”, dù tổng thể vẫn còn tóc.',
    causes: 'Gợi ý rụng tóc kiểu nữ do nội tiết ở giai đoạn rõ hơn, với miniaturization lan tới vùng đỉnh. Vùng đỉnh có tuần hoàn tương đối kém. Nếu vùng đỉnh mỏng rõ nhưng vùng sau vẫn giữ tốt → rất phù hợp với pattern FPHL.',
  },
  {
    id: 'F3',
    name: 'Vùng 3 – VÙNG SAU (Occipital – gáy và hai bên sau)',
    when: 'Trong rụng tóc kiểu nữ (FPHL), vùng này thường rụng ít hơn rõ rệt so với phía trước. Nhiều khách cảm nhận: “Phía trước mỏng, nhưng gáy vẫn rất nhiều tóc”.',
    symptoms: 'Tóc ở gáy và hai bên sau dày hơn, sợi to hơn. Khi so sánh bằng tay hoặc ảnh, vùng sau giữ mật độ tốt hơn vùng đường rẽ và đỉnh.',
    causes: 'Đây là vùng ít nhạy cảm với nội tiết hơn, thường được bảo tồn trong rụng tóc kiểu nữ. Nếu vùng trước mỏng nhưng vùng sau còn dày → điển hình cho FPHL. Nếu vùng này cũng mỏng rõ → thường do yếu tố toàn thân (stress, thiếu chất...), không chỉ riêng FPHL.',
  },
];

interface ScalpMapProps {
  gender: Gender;
  onBack: () => void;
}

// Component to render simplified Norwood stages (Male)
const NorwoodVisual = ({ zoneId }: { zoneId: string }) => {
  const commonHead = (
    <>
      <defs>
        <linearGradient id="skin-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde6cf" />
          <stop offset="100%" stopColor="#eec09a" />
        </linearGradient>
        <filter id="inset-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feComponentTransfer in="SourceAlpha">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="2" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feFlood floodColor="rgb(0, 0, 0)" floodOpacity="0.1" />
          <feComposite in2="offsetblur" operator="in" />
          <feComposite in2="SourceAlpha" operator="in" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode />
          </feMerge>
        </filter>
      </defs>
      <path d="M 12 45 Q 8 50 12 60" fill="#eec09a" stroke="#eec09a" strokeWidth="2" />
      <path d="M 88 45 Q 92 50 88 60" fill="#eec09a" stroke="#eec09a" strokeWidth="2" />
      <ellipse cx="50" cy="52" rx="38" ry="44" fill="url(#skin-grad)" />
      <path d="M 48 10 L 50 6 L 52 10" fill="none" stroke="#dcb08a" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </>
  );

  const commonBackHead = (
    <>
       <defs>
        <linearGradient id="skin-grad-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde6cf" />
          <stop offset="100%" stopColor="#eec09a" />
        </linearGradient>
        <linearGradient id="hair-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#333" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
      <path d="M 20 40 Q 20 10 50 10 Q 80 10 80 40 L 80 80 Q 80 100 50 100 Q 20 100 20 80 Z" fill="url(#skin-grad-back)" />
      <path d="M 18 50 Q 10 55 18 65" fill="#eec09a" />
      <path d="M 82 50 Q 90 55 82 65" fill="#eec09a" />
    </>
  );

  const renderHair = () => {
    switch (zoneId) {
      case ZoneId.A:
        return (
          <>
            <path 
              d="M 14 45 C 14 35 16 25 25 20 Q 35 28 50 26 Q 65 28 75 20 C 84 25 86 35 86 45 C 86 75 75 90 50 90 C 25 90 14 75 14 45 Z" 
              fill="#2a2a2a" 
            />
            <text x="50" y="108" textAnchor="middle" className="text-[10px] fill-slate-500 font-medium">Mô phỏng: Norwood 2</text>
          </>
        );
      case ZoneId.B:
        return (
          <>
            <path 
              d="M 14 50 C 14 35 20 38 25 38 Q 35 48 50 30 Q 65 48 75 38 C 80 38 86 35 86 50 C 86 78 75 90 50 90 C 25 90 14 78 14 50 Z" 
              fill="#2a2a2a" 
            />
             <text x="50" y="108" textAnchor="middle" className="text-[10px] fill-slate-500 font-medium">Mô phỏng: Norwood 3</text>
          </>
        );
      case ZoneId.C:
        return (
          <>
            <path 
              d="M 14 50 C 14 35 20 38 25 38 Q 35 48 50 30 Q 65 48 75 38 C 80 38 86 35 86 50 C 86 78 75 90 50 90 C 25 90 14 78 14 50 Z" 
              fill="#2a2a2a" 
              mask="url(#bald-spot-mask)"
            />
            <mask id="bald-spot-mask">
               <rect x="0" y="0" width="100" height="100" fill="white" />
               <circle cx="50" cy="72" r="10" fill="black" filter="url(#blur-mask)" />
            </mask>
            <defs>
               <filter id="blur-mask">
                 <feGaussianBlur stdDeviation="1" />
               </filter>
            </defs>
            <text x="50" y="108" textAnchor="middle" className="text-[10px] fill-slate-500 font-medium">Mô phỏng: Norwood 4</text>
          </>
        );
      case ZoneId.D:
        return (
          <>
            <path 
              d="M 15 55 C 15 45 22 45 26 50 Q 30 65 30 75 C 30 85 38 92 50 92 C 62 92 70 85 70 75 Q 70 65 74 50 C 78 45 85 45 85 55 C 85 85 75 96 50 96 C 25 96 15 85 15 55 Z"
              fill="#2a2a2a" 
            />
            <text x="50" y="108" textAnchor="middle" className="text-[10px] fill-slate-500 font-medium">Mô phỏng: Norwood 6</text>
          </>
        );
      case ZoneId.E:
        return (
          <>
            {commonBackHead}
            <path 
               d="M 20 45 Q 20 10 50 5 Q 80 10 80 45 L 80 85 Q 80 90 50 95 Q 20 90 20 85 Z"
               fill="url(#hair-grad)"
            />
            <path d="M 30 90 Q 50 85 70 90" stroke="#1a1a1a" strokeWidth="0.5" fill="none" />
            <text x="50" y="115" textAnchor="middle" className="text-[10px] fill-slate-500 font-medium">Góc nhìn sau: Vùng an toàn</text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-24 h-28 flex-shrink-0 mx-auto mb-2">
      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-sm">
        {zoneId === ZoneId.E ? null : commonHead}
        {renderHair()}
      </svg>
    </div>
  );
};

// Visual for Female Overview (Ludwig Scale / Widening Part Progression)
const FemaleOverviewVisual = () => {
  const Head = ({ stage, label }: { stage: 1 | 2 | 3, label: string }) => (
    <div className="flex flex-col items-center gap-2 w-1/3">
      <svg viewBox="0 0 100 110" className="w-20 h-24 drop-shadow-sm">
         <defs>
          <linearGradient id={`skin-grad-f-${stage}`} x1="0" y1="0" x2="0" y2="1">
             <stop offset="0%" stopColor="#fde6cf" />
             <stop offset="100%" stopColor="#eec09a" />
          </linearGradient>
        </defs>
        {/* Face shape */}
        <ellipse cx="50" cy="55" rx="32" ry="38" fill={`url(#skin-grad-f-${stage})`} />
        {/* Hair base */}
        <path d="M 18 55 C 18 20 30 10 50 10 C 70 10 82 20 82 55 C 82 85 75 95 50 95 C 25 95 18 85 18 55 Z" fill="#2a2a2a" />
        {/* Parting Line - Changes based on stage */}
        {stage === 1 && (
           <path d="M 50 12 L 50 55" stroke="#fde6cf" strokeWidth="1" strokeLinecap="round" />
        )}
        {stage === 2 && (
           // Widening part - Christmas tree shape roughly
           <path d="M 49.5 12 L 50.5 12 L 51.5 55 L 48.5 55 Z" fill="#fde6cf" />
        )}
        {stage === 3 && (
           // Advanced thinning at crown
           <>
            <path d="M 48 12 L 52 12 L 54 55 L 46 55 Z" fill="#fde6cf" />
            <ellipse cx="50" cy="35" rx="6" ry="10" fill="#fde6cf" filter="blur(1.5px)" opacity="0.6" />
           </>
        )}
      </svg>
      <span className="text-[10px] font-medium text-slate-500 text-center leading-tight">{label}</span>
    </div>
  );

  return (
    <div className="flex justify-between items-center w-full px-2 py-2 relative">
       {/* Connecting Arrows */}
      <div className="absolute top-12 left-0 w-full flex justify-between px-16 opacity-30">
         <ArrowRight size={16} className="text-rose-400" />
         <ArrowRight size={16} className="text-rose-400" />
      </div>
      <Head stage={1} label="Bình thường" />
      <Head stage={2} label="Rẽ ngôi rộng" />
      <Head stage={3} label="Thưa đỉnh" />
    </div>
  );
};

// Visual for Female Head - Top Down
const FemaleHeadVisual = () => {
  return (
    <svg 
      viewBox="0 0 340 420" 
      className="absolute inset-0 w-full h-full drop-shadow-2xl"
      style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.15))' }}
    >
      <defs>
        <linearGradient id="fSkinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f5d0b0" />
          <stop offset="100%" stopColor="#eac09e" />
        </linearGradient>
        <linearGradient id="fHairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="40%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>

      {/* Ears */}
      <path d="M 25 190 C 5 180 5 250 25 260" fill="url(#fSkinGradient)" stroke="#dcb08a" strokeWidth="1" />
      <path d="M 315 190 C 335 180 335 250 315 260" fill="url(#fSkinGradient)" stroke="#dcb08a" strokeWidth="1" />

      {/* Head Shape Base (Dark Hair) */}
      <path 
        d="M 170 40 
           C 270 40 320 120 320 220 
           C 320 380 280 420 170 420 
           C 60 420 20 380 20 220 
           C 20 120 70 40 170 40 
           Z" 
        fill="url(#fHairGradient)" 
      />

      {/* Long Hair Texture flowing down */}
      <path d="M 20 250 Q 10 350 30 420" fill="url(#fHairGradient)" />
      <path d="M 320 250 Q 330 350 310 420" fill="url(#fHairGradient)" />

      {/* Forehead (Skin) */}
      <path 
        d="M 110 55 Q 170 35 230 55 C 240 60 230 30 170 30 C 110 30 100 60 110 55 Z" 
        fill="url(#fSkinGradient)"
      />

      {/* Parting Line Hint (Visual only) */}
      <line x1="170" y1="60" x2="170" y2="200" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />

      {/* Hair texture details */}
      <path d="M 170 60 Q 150 200 100 350" stroke="white" strokeOpacity="0.05" strokeWidth="1.5" fill="none" />
      <path d="M 170 60 Q 190 200 240 350" stroke="white" strokeOpacity="0.05" strokeWidth="1.5" fill="none" />

      {/* Nose Hint */}
      <path d="M 165 25 L 170 15 L 175 25" fill="#eac09e" opacity="0.8" />
    </svg>
  );
};


const ScalpMap: React.FC<ScalpMapProps> = ({ gender, onBack }) => {
  const [activeZoneId, setActiveZoneId] = useState<string | null>(null);

  const ZONES = gender === 'male' ? MALE_ZONES : FEMALE_ZONES;
  const activeZone = ZONES.find((z) => z.id === activeZoneId);

  const handleEnter = (id: string) => setActiveZoneId(id);
  const handleLeave = () => setActiveZoneId(null);

  const getZoneClasses = (id: string) => {
    const isActive = activeZoneId === id;
    return `absolute transition-all duration-300 ease-in-out cursor-pointer border flex items-center justify-center text-xs font-bold backdrop-blur-[1px]
      ${isActive 
        ? 'bg-rose-500/80 border-white text-white shadow-[0_0_25px_rgba(244,63,94,0.8)] z-20 scale-105' 
        : 'bg-white/5 border-white/20 text-white/60 hover:bg-rose-500/30 hover:border-rose-300/80 hover:text-white hover:z-10'
      }`;
  };

  const renderMapOverlays = () => {
    if (gender === 'male') {
      return (
        <>
          {/* Zone A: Frontal */}
          <div className={`${getZoneClasses(ZoneId.A)} top-[10%] left-[22%] w-[56%] h-[15%] rounded-t-[3rem] rounded-b-xl`} onMouseEnter={() => handleEnter(ZoneId.A)} onMouseLeave={handleLeave}>A</div>
          {/* Zone B: Temples */}
          <div className={`${getZoneClasses(ZoneId.B)} top-[26%] left-[8%] w-[20%] h-[24%] rounded-tl-2xl rounded-br-xl`} onMouseEnter={() => handleEnter(ZoneId.B)} onMouseLeave={handleLeave}>B</div>
          <div className={`${getZoneClasses(ZoneId.B)} top-[26%] right-[8%] w-[20%] h-[24%] rounded-tr-2xl rounded-bl-xl`} onMouseEnter={() => handleEnter(ZoneId.B)} onMouseLeave={handleLeave}>B</div>
          {/* Zone D: Mid-Scalp */}
          <div className={`${getZoneClasses(ZoneId.D)} top-[26%] left-[30%] w-[40%] h-[26%] rounded-2xl`} onMouseEnter={() => handleEnter(ZoneId.D)} onMouseLeave={handleLeave}>D</div>
          {/* Zone C: Crown */}
          <div className={`${getZoneClasses(ZoneId.C)} top-[54%] left-[22%] w-[56%] h-[24%] rounded-[50%]`} onMouseEnter={() => handleEnter(ZoneId.C)} onMouseLeave={handleLeave}>C</div>
          {/* Zone E: Occipital/Back */}
          <div className={`${getZoneClasses(ZoneId.E)} bottom-[6%] left-[15%] w-[70%] h-[16%] rounded-b-[4rem] rounded-t-xl`} onMouseEnter={() => handleEnter(ZoneId.E)} onMouseLeave={handleLeave}>E</div>
        </>
      );
    } else {
      return (
        <>
          {/* Zone 1: Midline Parting (Vertical strip center) */}
          <div className={`${getZoneClasses('F1')} top-[12%] left-[40%] w-[20%] h-[45%] rounded-full`} onMouseEnter={() => handleEnter('F1')} onMouseLeave={handleLeave}>1</div>
          
          {/* Zone 2: Crown / Vertex (Circle around vertex) */}
          <div className={`${getZoneClasses('F2')} top-[40%] left-[25%] w-[50%] h-[28%] rounded-[50%]`} onMouseEnter={() => handleEnter('F2')} onMouseLeave={handleLeave}>2</div>
          
          {/* Zone 3: Occipital / Back (Bottom area) */}
          <div className={`${getZoneClasses('F3')} bottom-[5%] left-[15%] w-[70%] h-[25%] rounded-b-[4rem] rounded-t-2xl`} onMouseEnter={() => handleEnter('F3')} onMouseLeave={handleLeave}>3</div>
        </>
      );
    }
  };

  const renderIdleContent = () => {
    if (gender === 'male') {
      return (
        <div className="text-center space-y-5 py-2">
           <div className="mx-auto w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <Info size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">BẢN ĐỒ RỤNG TÓC HÓI (NAM)</h3>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Kiến thức tổng quát</p>
            </div>
            <div className="text-left bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm space-y-2 text-slate-600 shadow-sm">
              <p className="font-bold text-slate-700 mb-2 text-base">Đặc điểm rụng tóc hói (Nam):</p>
              <ul className="space-y-2.5">
                <li className="flex gap-2 items-start"><span className="text-rose-500 font-bold mt-0.5">→</span><span>Thường bắt đầu từ trán – thái dương</span></li>
                <li className="flex gap-2 items-start"><span className="text-rose-500 font-bold mt-0.5">→</span><span>Sau đó lan ra đỉnh đầu</span></li>
                <li className="flex gap-2 items-start"><span className="text-rose-500 font-bold mt-0.5">→</span><span>Tạo hình chữ M hoặc hói đỉnh.</span></li>
              </ul>
            </div>
            <p className="text-slate-400 text-xs italic">Di chuột vào từng vùng trên hình để xem chi tiết.</p>
        </div>
      );
    } else {
       return (
        <div className="text-center space-y-4 py-2">
           <div className="mx-auto w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-400">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">BẢN ĐỒ RỤNG TÓC HÓI (NỮ)</h3>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Female Pattern Hair Loss (FPHL)</p>
            </div>

            {/* Female Overview Visual */}
            <div className="bg-slate-50 py-3 px-2 rounded-lg border border-slate-100">
               <FemaleOverviewVisual />
            </div>

            <div className="text-left bg-white p-4 rounded-lg border border-slate-100 text-sm space-y-3 text-slate-600 shadow-sm">
              <p className="font-bold text-slate-700 text-base">Đặc điểm FPHL:</p>
              <ul className="space-y-2">
                <li className="flex gap-2 items-start"><span className="text-rose-500 font-bold mt-0.5">1.</span><span><b>Không lùi trán mạnh</b>. Tóc mỏng dần ở đường rẽ và đỉnh đầu, sợi tóc ngày càng nhỏ (miniaturization).</span></li>
                <li className="flex gap-2 items-start"><span className="text-rose-500 font-bold mt-0.5">2.</span><span><b>Vùng gáy giữ tốt</b>. Đây là điểm đặc trưng để phân biệt FPHL.</span></li>
              </ul>
              <div className="bg-amber-50 p-3 rounded text-amber-800 text-xs leading-relaxed border border-amber-100">
                 <span className="font-bold text-amber-600 block mb-1 uppercase flex items-center gap-1"><AlertCircle size={12}/> Lưu ý quan trọng:</span>
                 Nữ rất dễ nhầm FPHL với rụng <b>Telogen Effluvium</b> vì cả hai đều gây thưa lan tỏa. Khác nhau ở tốc độ rụng và kích thước sợi (FPHL sợi nhỏ đi, Telogen sợi vẫn to).
              </div>
            </div>
            <p className="text-slate-400 text-xs italic">Di chuột hoặc chạm vào từng vùng để xem chi tiết.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto p-2 lg:p-8 gap-8 lg:gap-16 font-sans animate-fadeIn">
      
      <button 
        onClick={onBack}
        className="lg:hidden self-start mb-2 flex items-center gap-2 text-slate-500 hover:text-rose-600 text-sm font-medium"
      >
        <ArrowLeft size={16} /> Quay lại
      </button>

      {/* Left Side: The Map Visualization */}
      <div className="relative flex-shrink-0 group select-none mt-4 lg:mt-0">
        
        {/* Interactive Container */}
        <div className="relative w-[320px] h-[400px] sm:w-[340px] sm:h-[420px]">
          
          {/* Render SVG based on gender */}
          {gender === 'male' ? (
            <svg 
            viewBox="0 0 340 420" 
            className="absolute inset-0 w-full h-full drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.15))' }}
          >
            <defs>
              <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f5d0b0" />
                <stop offset="100%" stopColor="#eac09e" />
              </linearGradient>
              <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="50%" stopColor="#1a1a1a" />
                <stop offset="100%" stopColor="#0a0a0a" />
              </linearGradient>
            </defs>
            <path d="M 25 190 C 5 180 5 250 25 260" fill="url(#skinGradient)" stroke="#dcb08a" strokeWidth="1"/>
            <path d="M 315 190 C 335 180 335 250 315 260" fill="url(#skinGradient)" stroke="#dcb08a" strokeWidth="1"/>
            <path d="M 100 60 Q 170 40 240 60 C 260 70 240 30 170 30 C 100 30 80 70 100 60 Z" fill="url(#skinGradient)"/>
            <path d="M 170 50 C 260 50 315 120 315 220 C 315 330 250 400 170 400 C 90 400 25 330 25 220 C 25 120 80 50 170 50 Z" fill="url(#hairGradient)" stroke="#333" strokeWidth="1"/>
            <path d="M 170 55 Q 160 150 150 250" stroke="white" strokeOpacity="0.05" strokeWidth="1.5" fill="none" />
            <path d="M 180 60 Q 190 150 200 250" stroke="white" strokeOpacity="0.05" strokeWidth="1.5" fill="none" />
            <path d="M 140 70 Q 110 160 90 230" stroke="white" strokeOpacity="0.05" strokeWidth="1.5" fill="none" />
            <path d="M 200 70 Q 230 160 250 230" stroke="white" strokeOpacity="0.05" strokeWidth="1.5" fill="none" />
            <path d="M 165 25 L 170 15 L 175 25" fill="#eac09e" opacity="0.8" />
          </svg>
          ) : (
            <FemaleHeadVisual />
          )}

          {/* Render Overlays */}
          {renderMapOverlays()}
          
        </div>
        
        <p className="text-center text-slate-400 text-sm mt-6 lg:hidden">
          Chạm vào vùng bất kỳ để xem chi tiết
        </p>
      </div>

      {/* Right Side: Info Card */}
      <div className="flex-1 w-full max-w-md">
        <div className={`
          bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-500
          ${activeZoneId ? 'ring-2 ring-rose-100 translate-x-0 opacity-100' : 'ring-0'}
        `}>
          
          {/* Card Header */}
          <div className={`p-6 border-b border-slate-100 transition-colors duration-300 ${activeZoneId ? 'bg-rose-50' : 'bg-slate-50'}`}>
             {activeZone ? (
                <div className="flex items-center gap-3">
                  <div className="bg-rose-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-md flex-shrink-0">
                    {activeZone.id.startsWith('F') ? activeZone.id.replace('F','') : activeZone.id}
                  </div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-800 leading-tight">{activeZone.name}</h2>
                </div>
             ) : (
               <div className="flex items-center gap-3">
                  <div className="bg-slate-200 text-slate-500 w-10 h-10 rounded-full flex items-center justify-center shadow-inner flex-shrink-0">
                    <User size={20} />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-600">{gender === 'male' ? 'Tổng quan Nam giới' : 'Tổng quan Nữ giới'}</h2>
               </div>
             )}
          </div>

          {/* Card Body */}
          <div className="p-6 min-h-[320px] flex flex-col justify-center">
            {activeZone ? (
              <div className="space-y-5 animate-fadeIn">
                
                {/* Visual Representation (Male only currently) */}
                {gender === 'male' && (
                  <div className="flex justify-center bg-slate-50 py-4 rounded-lg border border-slate-100">
                     <NorwoodVisual zoneId={activeZone.id} />
                  </div>
                )}

                {/* Female: When does it happen? */}
                {activeZone.when && (
                   <div className="space-y-1">
                   <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm uppercase tracking-wide">
                      <Clock size={14} />
                      <span>Vùng này thường rụng khi nào?</span>
                   </div>
                   <p className="text-slate-700 text-sm md:text-base leading-relaxed pl-6 border-l-2 border-amber-200">
                     {activeZone.when}
                   </p>
                </div>
                )}

                {/* Symptoms Section */}
                <div className="space-y-1">
                   <div className="flex items-center gap-2 text-rose-600 font-semibold text-sm uppercase tracking-wide">
                      <AlertCircle size={14} />
                      <span>Triệu chứng / Đặc điểm</span>
                   </div>
                   <p className="text-slate-700 text-sm md:text-base leading-relaxed pl-6 border-l-2 border-rose-200">
                     {activeZone.symptoms}
                   </p>
                </div>

                {/* Causes/Meaning Section */}
                <div className="space-y-1">
                   <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm uppercase tracking-wide">
                      <Activity size={14} />
                      <span>Gợi ý nguyên nhân</span>
                   </div>
                   <p className="text-slate-600 text-sm md:text-base leading-relaxed pl-6 border-l-2 border-indigo-200">
                     {activeZone.causes}
                   </p>
                </div>

              </div>
            ) : (
              renderIdleContent()
            )}
          </div>
          
          {/* Card Footer */}
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
             <span>Scalp Analysis Map</span>
             <span>v2.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScalpMap;