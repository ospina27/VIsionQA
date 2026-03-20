import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { SidebarVisionQA } from "../components/SidebarVisionQA";
import { CriticalAlertModal } from "../components/CriticalAlertModal";
import { FalsePositiveModal } from "../components/FalsePositiveModal";
import { Camera, AlertTriangle, X, Pause, Play, Square } from "lucide-react";

interface Defect {
  id: string;
  type: string;
  confidence: number;
  x: number;
  y: number;
}

export function DashboardInspeccion() {
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [total, setTotal] = useState(1000);
  const [defectos, setDefectos] = useState(8);
  const [currentDefects, setCurrentDefects] = useState<Defect[]>([]);
  const [showCriticalAlert, setShowCriticalAlert] = useState(false);
  const [showFalsePositive, setShowFalsePositive] = useState(false);
  const navigate = useNavigate();

  const defectRate = ((defectos / total) * 100).toFixed(1);

  // Traffic light status based on defect rate
  // Verde: < 1%, Amarillo: 1-2.5%, Rojo: > 2.5%
  const getTrafficLightStatus = () => {
    const rate = (defectos / total) * 100;
    if (rate < 1.0) return "green";
    if (rate >= 1.0 && rate <= 2.5) return "yellow";
    return "red";
  };

  const trafficStatus = getTrafficLightStatus();

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const interval = setInterval(() => {
      setTotal((prev) => prev + 1);
      
      // Probabilidad de detectar defecto (ajustable)
      if (Math.random() > 0.985) {
        const newDefect: Defect = {
          id: Date.now().toString(),
          type: Math.random() > 0.5 ? "QUEMADURA_TÉRMICA" : "RAYA_PROFUNDA",
          confidence: 84 + Math.random() * 15,
          x: 25 + Math.random() * 50,
          y: 33 + Math.random() * 35,
        };
        setDefectos((prev) => prev + 1);
        setCurrentDefects([newDefect]);
      } else {
        setCurrentDefects([]);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [isRunning, isPaused, defectos, total]);

  const handleEmergencyStop = () => {
    setShowCriticalAlert(true);
    setIsRunning(false);
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleCriticalConfirm = () => {
    setShowCriticalAlert(false);
    navigate("/cierre");
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <SidebarVisionQA active="transmision" />
      
      {/* Main Canvas */}
      <div className="flex-1 flex pt-[64px]">
        {/* Camera Feed Section (70%) */}
        <div className="flex-1 bg-[#0e0e0e] relative">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-60">
            <img 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-saturation" 
              src="figma:asset/05cc5752f2107558418604601b9ebbb31ce376b5.png"
              style={{ filter: "saturate(0.2)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-gray-800/50" />
            <div className="absolute inset-0 border-16 border-[rgba(24,24,27,0.4)]" />
            <div 
              className="absolute inset-0 opacity-10"
              style={{ 
                backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,85,69,1) 0%, rgba(255,85,69,0) 35%)" 
              }}
            />
          </div>

          {/* Bounding Box - Defect Detection */}
          {currentDefects.map((defect) => (
            <div
              key={defect.id}
              className="absolute border-2 border-[#ff5545] rounded shadow-[0px_0px_20px_0px_rgba(255,85,69,0.4)]"
              style={{
                left: `${defect.x}%`,
                top: `${defect.y}%`,
                width: "195px",
                height: "128px",
              }}
            >
              <div className="absolute -top-[20px] left-0 bg-[#ff5545] text-white px-2 py-0.5 text-[10px] font-bold font-['Inter'] tracking-tight uppercase">
                {defect.type} {defect.confidence.toFixed(0)}%
              </div>
              <div className="absolute border-l-2 border-t-2 border-white left-0 top-0 w-2 h-2" />
              <div className="absolute border-r-2 border-b-2 border-white right-0 bottom-0 w-2 h-2" />
            </div>
          ))}

          {/* Approved Label */}
          {currentDefects.length === 0 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-600/50 px-4 py-2">
              <div className="text-[#e5e2e1] font-['Inter'] text-base">
                APROBADO_VÁLIDO_0.98
              </div>
            </div>
          )}

          {/* Feed Status Overlays */}
          <div className="absolute bottom-6 left-6 flex gap-4">
            <div className="backdrop-blur-md bg-black/60 px-4 py-2 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <div className="text-[#e5e2e1] font-['Space_Grotesk'] font-bold text-[10px] tracking-wider">
                CAM_04_LÍNEA_NORTE
              </div>
            </div>
            <div className="backdrop-blur-md bg-black/60 px-4 py-2">
              <div className="text-[#a1a1aa] font-['Space_Grotesk'] font-bold text-[10px]">
                FPS: 60.2
              </div>
            </div>
          </div>
        </div>

        {/* Aside - Control Panel (30%) */}
        <div className="w-[307px] bg-[#1c1b1b] relative border-l border-[rgba(39,39,42,0.3)] flex flex-col">
          {/* Traffic Light Indicator */}
          <div className="p-5 bg-[#2a2a2a] rounded-sm m-4 border-l-4 border-[#ffb4ab] flex-shrink-0">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-[#71717a] font-['Space_Grotesk'] font-bold text-[11px] tracking-wider uppercase mb-1.5">
                  ESTADO_DEL_LOTE
                </div>
                <div className={`font-['Space_Grotesk'] font-bold text-xl ${
                  trafficStatus === "red" ? "text-[#ffb4ab]" : 
                  trafficStatus === "yellow" ? "text-[#f1c100]" : 
                  "text-green-500"
                }`}>
                  {trafficStatus === "red" ? "RECHAZADO" : 
                   trafficStatus === "yellow" ? "ADVERTENCIA" : 
                   "VÁLIDO"}
                </div>
                <div className="text-[#71717a] font-['Inter'] text-xs mt-1">
                  Tasa: {defectRate}%
                </div>
              </div>
              <AlertTriangle size={22} className={
                trafficStatus === "red" ? "text-[#ffb4ab]" : 
                trafficStatus === "yellow" ? "text-[#f1c100]" : 
                "text-green-500"
              } />
            </div>

            {/* Traffic Light - Horizontal */}
            <div className="bg-[rgba(9,9,11,0.5)] rounded-sm py-3 flex flex-row justify-center gap-4">
              {/* Red Light */}
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all ${
                trafficStatus === "red" 
                  ? "bg-[#ef4444] shadow-[0px_0px_24px_0px_rgba(239,68,68,0.6)]" 
                  : "bg-[#27272a] opacity-20"
              }`}>
                <div className="w-9 h-9 border-2 border-white/20 rounded-lg" />
              </div>
              {/* Yellow Light */}
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all ${
                trafficStatus === "yellow" 
                  ? "bg-[#f1c100] shadow-[0px_0px_24px_0px_rgba(241,193,0,0.6)]" 
                  : "bg-[#27272a] opacity-20"
              }`}>
                <div className="w-9 h-9 border-2 border-white/20 rounded-lg" />
              </div>
              {/* Green Light */}
              <div className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all ${
                trafficStatus === "green" 
                  ? "bg-[#10b981] shadow-[0px_0px_24px_0px_rgba(16,185,129,0.6)]" 
                  : "bg-[#27272a] opacity-20"
              }`}>
                <div className="w-9 h-9 border-2 border-white/20 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Control Buttons - Pause/Stop */}
          <div className="px-4 pb-4 flex gap-2 flex-shrink-0">
            <button
              onClick={handlePause}
              className={`flex-1 ${isPaused ? 'bg-[#f1c100]' : 'bg-[#353534]'} border border-[#5d3f3b] py-4 flex items-center justify-center gap-2 hover:opacity-80 transition-opacity min-h-[64px]`}
            >
              {isPaused ? <Play size={20} className="text-black" /> : <Pause size={20} className="text-[#f1c100]" />}
              <span className={`${isPaused ? 'text-black' : 'text-[#f1c100]'} font-['Space_Grotesk'] font-bold text-sm uppercase`}>
                {isPaused ? 'Reanudar' : 'Pausar'}
              </span>
            </button>
            <button
              onClick={handleStop}
              className="flex-1 bg-[#353534] border border-[#5d3f3b] py-4 flex items-center justify-center gap-2 hover:bg-[#3d3c3b] transition-colors min-h-[64px]"
            >
              <Square size={20} className="text-[#ef4444]" />
              <span className="text-[#ef4444] font-['Space_Grotesk'] font-bold text-sm uppercase">
                Parar
              </span>
            </button>
          </div>

          {/* Action Button - Report False Positive */}
          <button
            onClick={() => setShowFalsePositive(true)}
            className="mx-4 mb-4 bg-[#353534] border border-[#5d3f3b] py-5 px-3 flex flex-col items-center gap-2 hover:bg-[#3d3c3b] transition-colors flex-shrink-0 min-h-[76px]"
          >
            <AlertTriangle size={24} className="text-[#ffb4aa]" />
            <div className="text-[#e5e2e1] font-['Space_Grotesk'] font-bold text-sm tracking-wider uppercase text-center leading-tight">
              Reportar Falso Positivo
            </div>
            <div className="text-[#71717a] font-['Inter'] text-[10px] text-center">
              ID_EVENTO: #4492-AX
            </div>
          </button>

          {/* Real-time Counter */}
          <div className="px-4 pb-4 grid grid-cols-2 gap-3 flex-shrink-0">
            <div className="bg-[#2a2a2a] p-4">
              <div className="text-[#71717a] font-['Space_Grotesk'] font-bold text-[10px] tracking-wider uppercase">
                Inspección
              </div>
              <div className="text-[#f1c100] font-['Space_Grotesk'] font-bold text-2xl leading-7">
                &lt; 0.5s
              </div>
            </div>
            <div className="bg-[#2a2a2a] p-4">
              <div className="text-[#71717a] font-['Space_Grotesk'] font-bold text-[10px] tracking-wider uppercase">
                Confianza
              </div>
              <div className="text-white font-['Space_Grotesk'] font-bold text-2xl leading-7">
                99.4%
              </div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="px-4 pb-4 flex flex-col gap-2 flex-shrink-0">
            <div className="bg-[rgba(24,24,27,0.4)] px-3 py-2 flex items-center justify-between">
              <span className="text-[#71717a] font-['Inter'] font-bold text-[11px] uppercase">Unidades / Hora</span>
              <span className="text-[#d4d4d8] font-['Liberation_Mono'] text-sm">{total}</span>
            </div>
            <div className="bg-[rgba(24,24,27,0.4)] px-3 py-2 flex items-center justify-between">
              <span className="text-[#71717a] font-['Inter'] font-bold text-[11px] uppercase">Tasa de Defectos</span>
              <span className="text-[#ffb4ab] font-['Liberation_Mono'] text-sm">{defectRate}%</span>
            </div>
            <div className="bg-[rgba(24,24,27,0.4)] px-3 py-2 flex items-center justify-between">
              <span className="text-[#71717a] font-['Inter'] font-bold text-[11px] uppercase">Operario</span>
              <span className="text-[#d4d4d8] font-['Liberation_Mono'] text-sm">F. RODRIGUEZ</span>
            </div>
          </div>

          {/* Real-time Log Widget */}
          <div className="px-4 pt-4 border-t border-[#27272a] flex-shrink-0 min-h-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#f1c100]" />
              <div className="text-[#a1a1aa] font-['Space_Grotesk'] font-bold text-[11px] tracking-wider uppercase">
                TELEMETRÍA EN VIVO
              </div>
            </div>
            <div className="text-[#52525b] font-['Liberation_Mono'] text-[10px] space-y-1 leading-tight">
              <div><span>[14:22:01]</span><span className="text-[#71717a]"> OBJETO_DETECTADO</span></div>
              <div>
                <div><span>[14:22:01]</span><span className="text-[#71717a]"> ANÁLISIS_ESCANEO:</span></div>
                <div className="text-[#71717a]">THERMAL_BURN_DETECTED</div>
              </div>
              <div>
                <div><span>[14:22:02]</span><span className="text-[#ffb4ab]"> ACCIÓN_SISTEMA:</span></div>
                <div className="text-[#ffb4ab]">DIVERTER_ARM_ACTIVATE</div>
              </div>
              <div><span>[14:22:04]</span><span className="text-[#71717a]"> CARGA_REGISTRO: SUCCESS</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-16 backdrop-blur-xl bg-[rgba(30,64,175,0.8)] border-b-2 border-[rgba(59,130,246,0.3)] shadow-[0px_0px_30px_0px_rgba(59,130,246,0.2)] flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="text-white font-['Space_Grotesk'] font-bold text-lg">
              VisionQA
            </div>
            <div className="bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] rounded-sm px-2 py-0.5">
              <div className="text-[#10b981] font-['Inter'] font-bold text-[10px]">
                TRANSMISIÓN_EN_VIVO
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-[#2a2a2a] border border-gray-700 px-3 py-1 rounded">
            <div className="text-[#3b82f6] font-['Liberation_Mono'] font-bold text-sm">
              LOTE: LT-2024-492
            </div>
          </div>
          <button 
            onClick={handleEmergencyStop}
            className="p-2 hover:bg-[#ef4444]/20 rounded transition-colors"
          >
            <AlertTriangle size={32} className="text-[#ef4444]" />
          </button>
        </div>
      </div>

      {/* Modals */}
      {showCriticalAlert && (
        <CriticalAlertModal
          onClose={() => setShowCriticalAlert(false)}
          onConfirm={handleCriticalConfirm}
        />
      )}

      {showFalsePositive && (
        <FalsePositiveModal
          onClose={() => setShowFalsePositive(false)}
          defectId="#4492-AX"
        />
      )}
    </div>
  );
}