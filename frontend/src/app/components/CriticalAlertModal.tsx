import { AlertTriangle, Bell, CheckCircle } from "lucide-react";

interface CriticalAlertModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export function CriticalAlertModal({ onClose, onConfirm }: CriticalAlertModalProps) {
  return (
    <div className="fixed inset-0 bg-[#131313] z-[100] flex flex-col">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-red-900 via-gray-900 to-black" />

      {/* Header - Emergency Override */}
      <div className="absolute top-0 left-0 right-0 backdrop-blur-xl bg-[rgba(10,10,10,0.8)] border-b-2 border-[rgba(127,29,29,0.3)] shadow-[0px_0px_30px_0px_rgba(255,59,48,0.2)] px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <AlertTriangle size={24} className="text-[#ef4444]" />
          <div className="text-[#ef4444] font-['Liberation_Serif'] font-bold text-xl tracking-[2px] uppercase">
            SISTEMA CRÍTICO
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-[rgba(220,38,38,0.2)] border border-[#ef4444] px-3 py-1">
            <div className="text-[#ef4444] font-['Liberation_Serif'] font-bold text-sm tracking-tight">
              CÓDIGO_ERROR: 0x44-QC
            </div>
          </div>
          <AlertTriangle size={38} className="text-gray-500" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-32 relative">
        {/* Giant Icon with Glow */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[220px] h-[190px]">
          <svg viewBox="0 0 220 190" className="w-full h-full">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="40" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <rect x="0" y="0" width="220" height="190" fill="#DC2626" opacity="0.3" filter="url(#glow)"/>
            <path
              d="M110,20 L200,170 L20,170 Z"
              fill="#FF5545"
            />
            <rect x="100" y="70" width="20" height="50" fill="#1a1a1a" rx="2"/>
            <circle cx="110" cy="140" r="8" fill="#1a1a1a"/>
          </svg>
        </div>

        {/* Central Alert Text */}
        <div className="max-w-4xl w-full relative" style={{ marginTop: "200px" }}>
          <div className="text-center space-y-4">
            <div className="font-['Liberation_Serif'] text-white text-8xl leading-[96px] tracking-[-4.8px]">
              <p className="mb-0">ALERTA DE PARO:</p>
              <p className="mb-0 text-[#ff5545]">UMBRAL CRÍTICO</p>
              <p className="text-[#ff5545]">SUPERADO</p>
            </div>

            <div className="flex items-center gap-4 justify-center py-6">
              <div className="flex-1 max-w-sm h-px bg-gradient-to-r from-transparent via-[rgba(127,29,29,0.5)] to-transparent" />
              <div className="text-[#fecaca] font-['Liberation_Serif'] text-2xl tracking-[0.6px] uppercase text-center opacity-70">
                3 Quemaduras críticas detectadas consecutivamente en la Línea 04
              </div>
              <div className="flex-1 max-w-sm h-px bg-gradient-to-r from-transparent via-[rgba(127,29,29,0.5)] to-transparent" />
            </div>
          </div>

          {/* Technical Telemetry Grid */}
          <div className="grid grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            <div className="backdrop-blur-md bg-[rgba(69,10,10,0.4)] border-l-4 border-[#ff5545] p-4">
              <div className="text-[#ffb4aa] font-['Inter'] font-bold text-[10px] tracking-wider uppercase opacity-70 mb-1">
                ID_SENSOR
              </div>
              <div className="text-white font-['Liberation_Serif'] font-bold text-xl">
                THERM-09-A
              </div>
            </div>

            <div className="backdrop-blur-md bg-[rgba(69,10,10,0.4)] border-l-4 border-[#ff5545] p-4">
              <div className="text-[#ffb4aa] font-['Inter'] font-bold text-[10px] tracking-wider uppercase opacity-70 mb-1">
                MARCA_TIEMPO
              </div>
              <div className="text-white font-['Liberation_Serif'] font-bold text-xl">
                14:52:03:09
              </div>
            </div>

            <div className="backdrop-blur-md bg-[rgba(69,10,10,0.4)] border-l-4 border-[#ff5545] p-4">
              <div className="text-[#ffb4aa] font-['Inter'] font-bold text-[10px] tracking-wider uppercase opacity-70 mb-1">
                SEVERIDAD
              </div>
              <div className="text-white font-['Liberation_Serif'] font-bold text-xl uppercase">
                CRÍTICO
              </div>
            </div>

            <div className="backdrop-blur-md bg-[rgba(69,10,10,0.4)] border-l-4 border-[#ff5545] p-4">
              <div className="text-[#ffb4aa] font-['Inter'] font-bold text-[10px] tracking-wider uppercase opacity-70 mb-1">
                PROTOCOLO_ACTIVO
              </div>
              <div className="text-white font-['Liberation_Serif'] font-bold text-xl">
                PARO-E-04
              </div>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="absolute bottom-32 right-10">
          <div className="bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] px-4 py-2 rotate-2">
            <div className="text-black font-['Liberation_Serif'] font-bold text-base">
              LÍNEA 04: BLOQUEADA
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-24 backdrop-blur-[20px] bg-[rgba(23,23,23,0.9)] border-t-2 border-[rgba(220,38,38,0.5)] shadow-[0px_-10px_40px_0px_rgba(0,0,0,0.8)] flex pt-0.5 z-10">
        <button
          onClick={onClose}
          className="flex-1 bg-[#262626] flex items-center justify-center gap-4 hover:bg-[#2d2d2d] transition-colors"
        >
          <Bell size={25} className="text-[#ef4444]" />
          <div className="text-[#ef4444] font-['Liberation_Serif'] font-bold text-lg tracking-[0.9px] uppercase">
            SILENCIAR ALARMA
          </div>
        </button>

        <button
          onClick={onConfirm}
          className="flex-1 bg-[#dc2626] flex items-center justify-center gap-4 border-l-2 border-[rgba(127,29,29,0.5)] pl-0.5 hover:bg-[#b91c1c] transition-colors"
        >
          <CheckCircle size={25} className="text-white" />
          <div className="text-white font-['Liberation_Serif'] font-bold text-lg tracking-[0.9px] uppercase">
            CONFIRMAR DESPEJE DE LÍNEA
          </div>
        </button>
      </div>
    </div>
  );
}