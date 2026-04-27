import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { SidebarVisionQA } from "../components/SidebarVisionQA";
import { CriticalAlertModal } from "../components/CriticalAlertModal";
import { FalsePositiveModal } from "../components/FalsePositiveModal";
import { StopInspectionModal } from "../components/StopInspectionModal";
import { HelpCenter } from "../components/HelpCenter";
import { NetworkStatus } from "../components/NetworkStatus";
import { useRegistros } from "../context/RegistrosContext";
import { useInspectionFlow } from "../contexts/InspectionFlowContext";
import { useAuth } from "../contexts/AuthContext";
import { useConfiguracion } from "../contexts/ConfiguracionContext";
import { AlertTriangle, Pause, Play, Square, X, RotateCcw, ClipboardList, Camera } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { calcularAQLMuestreo } from "../utils/aqlCalculator";

interface Defect {
  id: string;
  type: string;
  confidence: number;
  x: number;
  y: number;
}

export function DashboardInspeccion() {
  const [isRunning, setIsRunning] = useState(true);
  const [isPaused,  setIsPaused]  = useState(false);

  // ── Contadores persistentes: se leen desde localStorage si hay una inspección
  //    en curso guardada (recuperación post-corte de energía / recarga)
  const [total, setTotal] = useState<number>(() => {
    try {
      const savedState = localStorage.getItem("visionqa_flowState");
      const saved      = localStorage.getItem("visionqa_inspection_total");
      if (savedState === "INSPECTING" && saved) return parseInt(saved);
    } catch (e) { /* noop */ }
    return 0;
  });
  const [defectos, setDefectos] = useState<number>(() => {
    try {
      const savedState = localStorage.getItem("visionqa_flowState");
      const saved      = localStorage.getItem("visionqa_inspection_defectos");
      if (savedState === "INSPECTING" && saved) return parseInt(saved);
    } catch (e) { /* noop */ }
    return 0;
  });

  const [currentDefects, setCurrentDefects] = useState<Defect[]>([]);
  const [showCriticalAlert,  setShowCriticalAlert]  = useState(false);
  const [causeType,          setCauseType]          = useState<'lente_sucio' | 'muchos_defectos' | 'calibracion_perdida' | 'parada_manual' | 'general'>('general');
  const [showTestPanel,      setShowTestPanel]      = useState(false);
  const [showFalsePositive,  setShowFalsePositive]  = useState(false);
  const [showStopModal,      setShowStopModal]      = useState(false);
  const [showPauseModal,     setShowPauseModal]     = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showRecalibracion,  setShowRecalibracion]  = useState(false);
  const [pendingCierre,      setPendingCierre]      = useState(false);

  const [defectosEnAlerta, setDefectosEnAlerta] = useState(0);
  const [eventosDeAlerta, setEventosDeAlerta] = useState<Array<{
    tipo: string,
    inicio: number,
    fin: number | null,
    defectosRegistrados: number
  }>>([]);
  const [alertaActivaDesde, setAlertaActivaDesde] = useState<number | null>(null);

  // ── Recuperación post-corte ──────────────────────────────────────────────
  // isRecovered = true cuando el componente monta con flowState ya en INSPECTING
  // (corte de luz, recarga accidental) y hay contadores guardados
  const [isRecovered, setIsRecovered] = useState(false);

  const navigate = useNavigate();
  const { agregarRegistro, notificarSupervisor } = useRegistros();
  const { startInspection, completeInspection, loteData, flowState } = useInspectionFlow();
  const { user } = useAuth();
  const { config } = useConfiguracion();

  const startedRef = useRef(false);
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;

      let savedFlowState: string | null = null;
      let savedTotal: string | null = null;
      let sessionActive: string | null = null;

      try {
        savedFlowState = localStorage.getItem("visionqa_flowState");
        savedTotal     = localStorage.getItem("visionqa_inspection_total");
        sessionActive  = sessionStorage.getItem("visionqa_inspection_session");
      } catch (e) { /* noop */ }

      const isRecoveryScenario =
        savedFlowState === "INSPECTING" &&
        savedTotal !== null &&
        parseInt(savedTotal) > 0 &&
        !sessionActive;

      if (isRecoveryScenario) {
        setIsRecovered(true);
      } else if (savedFlowState !== "INSPECTING") {
        try {
          localStorage.removeItem("visionqa_inspection_total");
          localStorage.removeItem("visionqa_inspection_defectos");
        } catch (e) { /* noop */ }
        setTotal(0);
        setDefectos(0);
        startInspection();
      }

      try { sessionStorage.setItem("visionqa_inspection_session", "true"); } catch (e) { /* noop */ }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Persistir contadores en localStorage mientras corre la inspección ────
  useEffect(() => {
    if (flowState === "INSPECTING") {
      try {
        localStorage.setItem("visionqa_inspection_total",    String(total));
        localStorage.setItem("visionqa_inspection_defectos", String(defectos));
      } catch (e) { /* noop */ }
    }
  }, [total, defectos, flowState]);

  // ── Navegar a cierre cuando el flow se completa ──────────────────────────
  useEffect(() => {
    if (pendingCierre && flowState === "COMPLETED") navigate("/cierre");
  }, [pendingCierre, flowState, navigate]);

  const defectRate    = total > 0 ? ((defectos / total) * 100).toFixed(1) : "0.0";
  const defectosAQL = Math.max(0, defectos - defectosEnAlerta);
  const defectRateAQL = total > 0 ? ((defectosAQL / total) * 100).toFixed(1) : "0.0";
  const operarioName  = user?.nombre   ?? "F. RODRÍGUEZ";
  const operarioLeg   = user?.legajo   ?? "LEG-4782";

  const isAbastecedor = user?.tipoOrg === 'ABASTECEDOR';
  const loteSize = loteData?.tamanoLote || total;
  
  const aqlResult = isAbastecedor && loteData?.tamanoLote 
    ? calcularAQLMuestreo(loteData.tamanoLote, defectosAQL, config.aqlPorcentaje, config.nivelInspeccion)
    : null;

  const getTrafficStatus = () => {
    if (isAbastecedor && aqlResult) {
      if (defectosAQL >= aqlResult.numeroRechazo) return "red";
      if (defectosAQL === aqlResult.numeroAceptacion && aqlResult.numeroAceptacion > 0) return "yellow";
      return "green";
    } else {
      const productorRate = loteSize > 0 ? (defectosAQL / loteSize) * 100 : 0;
      if (productorRate > config.umbralLoteCritico) return "red";
      if (productorRate > config.aqlPorcentaje) return "yellow";
      return "green";
    }
  };
  const trafficStatus = getTrafficStatus();
  
  const displayRate = isAbastecedor ? defectRate : (loteSize > 0 ? (defectos / loteSize) * 100 : 0).toFixed(1);

  // ── Simulación de detección ──────────────────────────────────────────────
  useEffect(() => {
    if (!isRunning || isPaused) return;
    const interval = setInterval(() => {
      setTotal((p) => p + 1);
      if (Math.random() > 0.985) {
        const d: Defect = {
          id:         Date.now().toString(),
          type:       Math.random() > 0.5 ? "QUEMADURA_TÉRMICA" : "RAYA_PROFUNDA",
          confidence: 84 + Math.random() * 15,
          x:          25 + Math.random() * 50,
          y:          33 + Math.random() * 35,
        };
        setDefectos((p) => p + 1);
        setCurrentDefects([d]);
      } else {
        setCurrentDefects([]);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleConfirmStop = () => {
    const defectosAQL = Math.max(0, defectos - defectosEnAlerta);
    const defectRateAQL = total > 0 ? ((defectosAQL / total) * 100).toFixed(1) : "0.0";

    notificarSupervisor({
      tipo: 'PARADA_NORMAL',
      causa: `Fin de turno manual. Total: ${total} uds, Defectos: ${defectosAQL}`,
      operario: user?.nombre ?? 'OPERARIO',
      lote: 'LT-2024-492',
      hora: new Date().toLocaleTimeString('es-AR', {hour12: false}),
      linea: 'LÍNEA_04'
    });
    
    setIsRunning(false); setIsPaused(false); setShowStopModal(false);
    agregarRegistro({
      tipo: "FIN_LOTE",
      operario: `${operarioName} - ${operarioLeg}`,
      descripcion: `✅ Inspección finalizada. Lote: ${loteData?.numeroLote ?? "N/A"} — ${total} uds, ${defectosAQL} defectos (${defectRateAQL}%).`,
      loteRelacionado: loteData?.numeroLote ?? "N/A",
    });
    try { sessionStorage.removeItem("visionqa_inspection_session"); } catch (e) { /* noop */ }
    completeInspection(total, defectosAQL, eventosDeAlerta.length, defectosEnAlerta);
    setPendingCierre(true);
  };

  const handleRevisarEnvase = () => {
    setIsPaused(true);
    setIsRunning(false);
    
    if (alertaActivaDesde !== null) {
      const defsDuranteAlerta = defectos - alertaActivaDesde;
      setDefectosEnAlerta(prev => prev + defsDuranteAlerta);
      setAlertaActivaDesde(null);
    }
    
    notificarSupervisor({
      tipo: 'PARADA_EMERGENCIA',
      causa: 'Muchos defectos detectados — Operario pausó para revisión manual',
      operario: user?.nombre ?? 'OPERARIO',
      lote: loteData?.numeroLote ?? 'LT-SIN-DATOS',
      hora: new Date().toLocaleTimeString('es-AR', {hour12: false}),
      linea: 'LÍNEA_04'
    });
    
    setShowCriticalAlert(false);
  };

  const handleCriticalConfirm = () => {
    if (alertaActivaDesde !== null) {
      const defsDuranteAlerta = defectos - alertaActivaDesde;
      setDefectosEnAlerta(prev => prev + defsDuranteAlerta);
      setEventosDeAlerta(prev => [...prev, {
        tipo: causeType ?? 'general',
        inicio: alertaActivaDesde,
        fin: defectos,
        defectosRegistrados: defsDuranteAlerta
      }]);
      setAlertaActivaDesde(null);
    }

    if (causeType === 'lente_sucio') {
      setShowCriticalAlert(false);
      setIsRunning(true);
      setIsPaused(false);
      
      notificarSupervisor({
        tipo: 'PARADA_EMERGENCIA',
        causa: 'Lente limpiado — inspección reanudada',
        operario: user?.nombre ?? 'OPERARIO',
        lote: 'LT-2024-492',
        hora: new Date().toLocaleTimeString('es-AR', {hour12: false}),
        linea: 'LÍNEA_04'
      });
      
      agregarRegistro({
        tipo: "ALERTA",
        operario: `${operarioName} - ${operarioLeg}`,
        descripcion: `Lente limpiado — inspección reanudada. Lote: ${loteData?.numeroLote ?? "N/A"}`,
        loteRelacionado: loteData?.numeroLote ?? "N/A",
      });
      return;
    }

    if (causeType === 'muchos_defectos') {
      setShowCriticalAlert(false);
      setIsRunning(true);
      setIsPaused(false);
      agregarRegistro({
        tipo: "ALERTA",
        operario: `${operarioName} - ${operarioLeg}`,
        descripcion: `Alerta de defectos revisada — inspección reanudada. Lote: ${loteData?.numeroLote ?? "N/A"}`,
        loteRelacionado: loteData?.numeroLote ?? "N/A",
      });
      return;
    }

    if (causeType === 'parada_manual' || causeType === 'general') {
      setShowCriticalAlert(false);
      setShowStopModal(true);
      return;
    }

    // Default fallback (should not hit this due to above checks or other handlers like handleRecalibrar)
    setShowCriticalAlert(false);
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (!isPaused) {
      notificarSupervisor({
        tipo: 'PAUSA',
        causa: 'Pausa manual activada por el operario',
        operario: user?.nombre ?? 'OPERARIO',
        lote: 'LT-2024-492',
        hora: new Date().toLocaleTimeString('es-AR', {hour12: false}),
        linea: 'LÍNEA_04'
      });
    }
    setIsPaused(true); 
    setShowPauseModal(false);
  };

  // Exposed for programmatic or manual triggering of emergency
  const handleEmergencyStop = () => {
    setAlertaActivaDesde(defectos);
    notificarSupervisor({
      tipo: 'PARADA_EMERGENCIA',
      causa: 'Umbral crítico superado — activación manual de emergencia',
      operario: user?.nombre ?? 'OPERARIO',
      lote: 'LT-2024-492',
      hora: new Date().toLocaleTimeString('es-AR', {hour12: false}),
      linea: 'LÍNEA_04'
    });
    setCauseType('muchos_defectos');
    setIsRunning(false);
    setIsPaused(false);
    setShowCriticalAlert(true);
  };

  const handleRecalibrar = () => {
    setShowCriticalAlert(false);
    setIsRunning(true);
    setIsPaused(false);
    
    notificarSupervisor({
      tipo: 'RECALIBRACION',
      causa: 'Recalibración completada — inspección reanudada',
      operario: user?.nombre ?? 'OPERARIO',
      lote: 'LT-2024-492',
      hora: new Date().toLocaleTimeString('es-AR', {hour12: false}),
      linea: 'LÍNEA_04'
    });
  };

  const trafficColors = {
    red:    { bg: "#ef4444", glow: "rgba(239,68,68,0.6)"   },
    yellow: { bg: "#f1c100", glow: "rgba(241,193,0,0.6)"   },
    green:  { bg: "#10b981", glow: "rgba(16,185,129,0.6)"  },
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">

      {/* ── Header full-width fijo ── */}
      <header className="fixed top-0 left-0 right-0 h-14 xl:h-16 z-50 bg-[rgba(30,64,175,0.92)] backdrop-blur-xl border-b-2 border-[rgba(59,130,246,0.3)] shadow-[0_0_24px_rgba(59,130,246,0.2)] flex items-center justify-between px-3 xl:px-6">
        <div className="flex items-center gap-2 xl:gap-3 min-w-0">
          <span className="text-white font-['Space_Grotesk'] font-bold text-base xl:text-lg flex-shrink-0">VisionQA</span>
          <div className="hidden sm:flex bg-[rgba(16,185,129,0.15)] border border-[rgba(16,185,129,0.25)] rounded px-2 py-0.5">
            <span className="text-[#10b981] font-['Inter'] font-bold text-[9px] xl:text-[10px] tracking-wider whitespace-nowrap">EN VIVO</span>
          </div>
          {/* Estado de red en tiempo real */}
          <NetworkStatus />
        </div>

        <div className="flex items-center gap-2 xl:gap-3 flex-shrink-0">
          <HelpCenter />
          <div className="hidden md:flex bg-[#2a2a2a] border border-gray-700 px-2 xl:px-3 py-1 rounded">
            <span className="text-[#3b82f6] font-['Liberation_Mono'] font-bold text-xs xl:text-sm whitespace-nowrap">
              {loteData?.numeroLote ?? "LT-2024-492"}
            </span>
          </div>
        </div>
      </header>

      <SidebarVisionQA active="transmision" />

      {/* ── Área principal ── */}
      <div className="flex-1 flex flex-col ml-16 xl:ml-56 pt-14 xl:pt-16 overflow-hidden">

        {/* ── Banner de recuperación post-corte ── */}
        {isRecovered && (
          <div className="flex-shrink-0 bg-[#1a1200] border-b-2 border-[#f59e0b] px-4 py-3 flex items-center justify-between gap-3 z-10">
            <div className="flex items-center gap-3 min-w-0">
              <RotateCcw size={18} className="text-[#f59e0b] flex-shrink-0 animate-spin" style={{ animationDuration: "3s" }} />
              <div className="min-w-0">
                <span className="text-[#f59e0b] font-['Space_Grotesk'] font-bold text-sm">
                  INSPECCIÓN RECUPERADA
                </span>
                <span className="text-[#a1a1aa] font-['Inter'] text-xs ml-2">
                  Se detectó una interrupción previa. Datos restaurados: {total.toLocaleString()} uds / {defectos} defectos ({defectRate}%)
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsRecovered(false)}
              className="p-1.5 hover:bg-white/10 rounded transition-colors flex-shrink-0"
              title="Cerrar aviso"
            >
              <X size={16} className="text-[#71717a]" />
            </button>
          </div>
        )}

        {/* ── Cuerpo: cámara + panel ── */}
        <div className="flex-1 flex overflow-hidden">

          {/* ── Feed de Cámara ── */}
          <div className="flex-1 bg-[#0e0e0e] relative overflow-hidden">
            <img
              alt="Inspección de envases plásticos"
              className="absolute inset-0 w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1608745167260-e15bc0e0521f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFzdGljJTIwYm90dGxlJTIwcXVhbGl0eSUyMGluc3BlY3Rpb24lMjBtYWNyb3xlbnwxfHx8fDE3NzQwNTY3MTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/15 to-black/40" />

            {currentDefects.map((d) => (
              <div
                key={d.id}
                className="absolute border-2 border-[#ff5545] rounded shadow-[0_0_20px_rgba(255,85,69,0.4)]"
                style={{ left: `${d.x}%`, top: `${d.y}%`, width: "clamp(120px,14%,195px)", height: "clamp(80px,10%,128px)" }}
              >
                <div className="absolute -top-5 left-0 bg-[#ff5545] text-white px-2 py-0.5 text-[9px] font-bold font-['Inter'] tracking-tight uppercase whitespace-nowrap">
                  {d.type} {d.confidence.toFixed(0)}%
                </div>
                <div className="absolute border-l-2 border-t-2 border-white left-0 top-0 w-2 h-2" />
                <div className="absolute border-r-2 border-b-2 border-white right-0 bottom-0 w-2 h-2" />
              </div>
            ))}

            {currentDefects.length === 0 && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-600/50 px-4 py-2">
                <span className="text-[#e5e2e1] font-['Inter'] text-sm xl:text-base">APROBADO_VÁLIDO_0.98</span>
              </div>
            )}

            {isPaused && (
              <div className="absolute inset-0 bg-black/65 flex items-center justify-center z-10">
                <div className="text-center space-y-4">
                  <div className="text-[#f1c100] font-['Space_Grotesk'] font-bold text-3xl xl:text-5xl animate-pulse">
                    ⏸ PAUSADO
                  </div>
                  <button
                    onClick={() => setIsPaused(false)}
                    className="bg-[#f1c100] hover:bg-yellow-300 text-black font-['Space_Grotesk'] font-bold px-6 xl:px-8 py-4 rounded-lg text-base xl:text-lg min-h-[64px] transition-colors"
                  >
                    ▶ REANUDAR INSPECCIÓN
                  </button>
                </div>
              </div>
            )}

            <div className="absolute bottom-4 left-4 flex gap-2 xl:gap-3">
              <div className="backdrop-blur-md bg-black/60 px-3 py-1.5 flex items-center gap-2 rounded">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isPaused ? "bg-[#f1c100]" : "bg-[#10b981] animate-pulse"}`} />
                <span className="text-[#e5e2e1] font-['Space_Grotesk'] font-bold text-[9px] xl:text-[10px] tracking-wider">CAM_04_LÍNEA_NORTE</span>
              </div>
              <div className="backdrop-blur-md bg-black/60 px-3 py-1.5 rounded">
                <span className="text-[#a1a1aa] font-['Space_Grotesk'] font-bold text-[9px] xl:text-[10px]">
                  FPS: {isPaused ? "0.0" : "60.2"}
                </span>
              </div>
            </div>
          </div>

          {/* ── Panel de Control ── */}
          <div className="w-56 lg:w-64 xl:w-72 bg-[#1c1b1b] border-l border-[rgba(39,39,42,0.3)] flex flex-col overflow-y-auto flex-shrink-0">

            {/* Semáforo */}
            <div className="m-3 p-3 xl:p-4 bg-[#2a2a2a] rounded border-l-4 border-[#ffb4ab] flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-[#71717a] font-['Space_Grotesk'] font-bold text-[10px] tracking-wider uppercase">ESTADO_LOTE</div>
                  <div className={`font-['Space_Grotesk'] font-bold text-base xl:text-xl mt-0.5 ${
                    trafficStatus === "red" ? "text-[#ffb4ab]" :
                    trafficStatus === "yellow" ? "text-[#f1c100]" : "text-green-500"
                  }`}>
                    {trafficStatus === "red" ? "RECHAZADO" : trafficStatus === "yellow" ? "ADVERTENCIA" : "VÁLIDO"}
                  </div>
                  {isAbastecedor && aqlResult ? (
                    <>
                      <div className="text-[#71717a] font-['Inter'] text-[10px] mt-0.5">Muestra requerida: n={aqlResult.tamanoMuestra} unidades</div>
                      <div className="text-[#71717a] font-['Inter'] text-[10px] mt-0.5">Ac={aqlResult.numeroAceptacion} Re={aqlResult.numeroRechazo}</div>
                    </>
                  ) : (
                    <div className="text-[#71717a] font-['Inter'] text-[10px] mt-0.5">Tasa: {displayRate}%</div>
                  )}
                </div>
                <AlertTriangle size={20} className={
                  trafficStatus === "red" ? "text-[#ffb4ab]" :
                  trafficStatus === "yellow" ? "text-[#f1c100]" : "text-green-500"
                } />
              </div>
              <div className="bg-black/40 rounded py-2.5 flex justify-center gap-3">
                {(["red","yellow","green"] as const).map((c) => {
                  const isActive = trafficStatus === c;
                  const { bg, glow } = trafficColors[c];
                  return (
                    <div
                      key={c}
                      className="w-10 h-10 xl:w-12 xl:h-12 rounded-lg flex items-center justify-center transition-all"
                      style={isActive
                        ? { backgroundColor: bg, boxShadow: `0 0 20px ${glow}` }
                        : { backgroundColor: "#27272a", opacity: 0.2 }}
                    >
                      <div className="w-6 h-6 xl:w-7 xl:h-7 border-2 border-white/20 rounded-lg" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Botones Pausar / Parar */}
            <div className="px-3 pb-3 flex gap-2 flex-shrink-0">
              <button
                onClick={() => isPaused ? setIsPaused(false) : setShowPauseModal(true)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 xl:py-4 rounded border transition-colors min-h-[64px] hover:opacity-80 ${
                  isPaused ? "bg-[#f1c100] border-[#f1c100]" : "bg-[#2a2a2a] border-[#f1c100]/30"
                }`}
              >
                {isPaused
                  ? <Play size={20} className="text-black" />
                  : <Pause size={20} className="text-[#f1c100]" />}
                <span className={`font-['Space_Grotesk'] font-bold text-[11px] xl:text-xs uppercase ${isPaused ? "text-black" : "text-[#f1c100]"}`}>
                  {isPaused ? "Reanudar" : "Pausar"}
                </span>
              </button>
              <button
                onClick={() => setShowStopModal(true)}
                className="flex-1 flex flex-col items-center justify-center gap-1 py-3 xl:py-4 rounded border border-[#ef4444]/30 bg-[#2a2a2a] hover:bg-[#3a2020] transition-colors min-h-[64px]"
              >
                <Square size={20} className="text-[#ef4444]" />
                <span className="text-[#ef4444] font-['Space_Grotesk'] font-bold text-[11px] xl:text-xs uppercase">Parar</span>
              </button>
            </div>

            {/* Criterios Sheet */}
            <div className="px-3 pb-3 flex-shrink-0">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="w-full flex items-center justify-center gap-2 py-3 xl:py-4 rounded border border-[#3b82f6]/30 bg-[#2a2a2a] hover:bg-[#333] transition-colors min-h-[64px]">
                    <span className="text-xl">📋</span>
                    <span className="text-[#3b82f6] font-['Space_Grotesk'] font-bold text-[11px] xl:text-xs uppercase">Criterios</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#1c1b1b] border-l border-[rgba(39,39,42,0.3)] p-0 text-white sm:max-w-sm w-full">
                  <SheetHeader className="p-4 xl:p-6 border-b border-[rgba(39,39,42,0.3)]">
                    <SheetTitle className="text-white font-['Space_Grotesk'] text-lg xl:text-xl uppercase tracking-wide">Criterios de Defecto</SheetTitle>
                  </SheetHeader>
                  <div className="p-4 xl:p-6 flex flex-col gap-4">
                    <div className="flex gap-4 bg-[#2a2a2a] p-4 rounded-xl border border-gray-700/50 items-center">
                      <div className="w-12 h-12 rounded-full bg-[#ef4444]/20 flex items-center justify-center flex-shrink-0 border border-[#ef4444]/30">
                        <div className="w-5 h-5 rounded-full bg-[#ef4444]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-['Space_Grotesk'] font-bold text-sm xl:text-base truncate">Quemadura Térmica</div>
                        <div className="text-[#a1a1aa] font-['Inter'] text-xs xl:text-sm leading-tight mt-1">Mancha oscura en el envase por exceso de calor.</div>
                      </div>
                    </div>
                    <div className="flex gap-4 bg-[#2a2a2a] p-4 rounded-xl border border-gray-700/50 items-center">
                      <div className="w-12 h-12 rounded-full bg-[#3b82f6]/20 flex items-center justify-center flex-shrink-0 border border-[#3b82f6]/30">
                        <div className="w-5 h-5 rounded-full bg-[#3b82f6]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-['Space_Grotesk'] font-bold text-sm xl:text-base truncate">Raya Profunda</div>
                        <div className="text-[#a1a1aa] font-['Inter'] text-xs xl:text-sm leading-tight mt-1">Corte o marca visible en la superficie del envase.</div>
                      </div>
                    </div>
                    <div className="flex gap-4 bg-[#2a2a2a] p-4 rounded-xl border border-gray-700/50 items-center">
                      <div className="w-12 h-12 rounded-full bg-[#f59e0b]/20 flex items-center justify-center flex-shrink-0 border border-[#f59e0b]/30">
                        <div className="w-5 h-5 rounded-full bg-[#f59e0b]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-['Space_Grotesk'] font-bold text-sm xl:text-base truncate">Deformación de Cuerpo</div>
                        <div className="text-[#a1a1aa] font-['Inter'] text-xs xl:text-sm leading-tight mt-1">Forma alterada del envase, abolladuras o asimetrías evidentes.</div>
                      </div>
                    </div>
                    <div className="flex gap-4 bg-[#2a2a2a] p-4 rounded-xl border border-gray-700/50 items-center">
                      <div className="w-12 h-12 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center flex-shrink-0 border border-[#8b5cf6]/30">
                        <div className="w-5 h-5 rounded-full bg-[#8b5cf6]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-['Space_Grotesk'] font-bold text-sm xl:text-base truncate">Tapa Defectuosa</div>
                        <div className="text-[#a1a1aa] font-['Inter'] text-xs xl:text-sm leading-tight mt-1">Rosca mal ajustada, sello roto o daño en tapa.</div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Reportar Falso Positivo */}
            <button
              onClick={() => setShowFalsePositive(true)}
              className="mx-3 mb-3 bg-[#2a2a2a] border border-[#ffb4aa]/30 rounded py-3 xl:py-4 px-3 flex flex-col items-center gap-1.5 hover:bg-[#333] transition-colors flex-shrink-0 min-h-[64px]"
            >
              <AlertTriangle size={20} className="text-[#ffb4aa]" />
              <span className="text-[#e5e2e1] font-['Space_Grotesk'] font-bold text-[11px] xl:text-xs tracking-wider uppercase text-center">Falso Positivo</span>
              <span className="text-[#71717a] font-['Inter'] text-[9px]">ID: #4492-AX</span>
            </button>

            {/* ACCIÓN RÁPIDA (Contextual) */}
            {currentDefects.length > 0 && (() => {
              const type = currentDefects[0].type.toUpperCase();
              let btnClass = "";
              let btnText = "";
              let onClick = () => {};

              if (type.includes('THERMAL') || type.includes('QUEMADURA')) {
                btnClass = "bg-[#f59e0b] text-black hover:bg-[#d97706]";
                btnText = "⚡ PARAR Y VERIFICAR SELLADORA";
                onClick = handleEmergencyStop;
              } else if (type.includes('SCRATCH') || type.includes('RAYA')) {
                btnClass = "bg-[#3b82f6] text-white hover:bg-[#2563eb]";
                btnText = "✓ MARCAR COMO FALSO POSITIVO";
                onClick = () => setShowFalsePositive(true);
              } else if (type.includes('DEFORM')) {
                btnClass = "bg-[#ef4444] text-white hover:bg-[#dc2626]";
                btnText = "🛑 DETENER LÍNEA";
                onClick = () => setShowStopModal(true);
              } else {
                return null;
              }

              return (
                <div className="mx-3 mb-3 flex-shrink-0 animate-in fade-in duration-300">
                  <div className="text-[#71717a] font-['Space_Grotesk'] font-bold text-[10px] tracking-wider uppercase mb-1.5">
                    ACCIÓN RÁPIDA
                  </div>
                  <button
                    onClick={onClick}
                    className={`w-full min-h-[64px] font-bold font-['Space_Grotesk'] rounded-lg transition-colors px-2 text-xs xl:text-sm ${btnClass}`}
                  >
                    {btnText}
                  </button>
                </div>
              );
            })()}

            {/* Métricas rápidas */}
            <div className="px-3 pb-3 grid grid-cols-2 gap-2 flex-shrink-0">
              <div className="bg-[#2a2a2a] rounded p-3">
                <div className="text-[#71717a] font-['Space_Grotesk'] font-bold text-[9px] xl:text-[10px] tracking-wider uppercase">Insp.</div>
                <div className="text-[#f1c100] font-['Space_Grotesk'] font-bold text-lg xl:text-2xl">&lt;0.5s</div>
              </div>
              <div className="bg-[#2a2a2a] rounded p-3">
                <div className="text-[#71717a] font-['Space_Grotesk'] font-bold text-[9px] xl:text-[10px] tracking-wider uppercase">Conf.</div>
                <div className="text-white font-['Space_Grotesk'] font-bold text-lg xl:text-2xl">99.4%</div>
              </div>
            </div>

            {/* Métricas detalladas */}
            <div className="px-3 pb-3 flex flex-col gap-1.5 flex-shrink-0">
              {[
                { label: "Uds / Hora", value: total.toLocaleString(),  color: "text-[#d4d4d8]" },
                { label: "Defectos",   value: `${defectRate}%`,         color: "text-[#ffb4ab]" },
                { label: "Operario",   value: operarioName.split(" ")[0].toUpperCase() + " " + (operarioName.split(" ")[1]?.[0] ?? ""), color: "text-[#d4d4d8]" },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-[rgba(24,24,27,0.5)] px-2.5 py-2 rounded flex items-center justify-between gap-2">
                  <span className="text-[#71717a] font-['Inter'] font-bold text-[10px] uppercase truncate">{label}</span>
                  <span className={`${color} font-['Liberation_Mono'] text-xs flex-shrink-0`}>{value}</span>
                </div>
              ))}
              
              <div className="bg-[rgba(24,24,27,0.5)] px-2.5 py-2 rounded flex items-center justify-between gap-2 mt-1">
                <span className="text-[#71717a] font-['Inter'] font-bold text-[10px] uppercase truncate">Defectos para AQL {config.aqlPorcentaje}%</span>
                <div className="flex flex-col items-end">
                  <span className="text-gray-400 font-['Liberation_Mono'] text-xs">{defectRateAQL}%</span>
                  {defectosEnAlerta > 0 && (
                    <span className="text-xs text-[#52525b] mt-0.5">(-{defectosEnAlerta} excluidos de alertas)</span>
                  )}
                </div>
              </div>
            </div>

            {/* Telemetría */}
            <div className="px-3 pb-4 pt-3 border-t border-[#27272a] flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#f1c100]" />
                <span className="text-[#a1a1aa] font-['Space_Grotesk'] font-bold text-[9px] xl:text-[10px] tracking-wider uppercase">TELEMETRÍA</span>
              </div>
              <div className="text-[#52525b] font-['Liberation_Mono'] text-[9px] xl:text-[10px] space-y-1 leading-relaxed">
                <div><span className="text-[#3b3b3b]">[14:22:01]</span><span className="text-[#71717a]"> OBJETO_DETECTADO</span></div>
                <div><span className="text-[#3b3b3b]">[14:22:01]</span><span className="text-[#71717a]"> THERMAL_BURN_DETECTED</span></div>
                <div><span className="text-[#3b3b3b]">[14:22:02]</span><span className="text-[#ffb4ab]"> DIVERTER_ARM_ACTIVATE</span></div>
                <div><span className="text-[#3b3b3b]">[14:22:04]</span><span className="text-[#71717a]"> REGISTRO: SUCCESS</span></div>
              </div>
            </div>

            {/* Panel de prueba TEMPORAL */}
            <div className="mt-auto px-3 pb-3 flex-shrink-0">
              {!showTestPanel ? (
                <button 
                  onClick={() => setShowTestPanel(true)}
                  className="w-full text-[#52525b] font-['Inter'] text-[10px] py-2 hover:bg-[#1a1a1a] transition-colors rounded"
                >
                  🧪 PROBAR ALERTAS
                </button>
              ) : (
                <div className="flex flex-col gap-2 p-2 bg-[#1a1a1a] border border-gray-800 rounded">
                  <button 
                    onClick={() => { setCauseType('lente_sucio'); setShowCriticalAlert(true); }}
                    className="w-full text-xs font-['Inter'] font-bold py-1.5 bg-[#f59e0b]/20 text-[#f59e0b] hover:bg-[#f59e0b]/30 rounded transition-colors"
                  >
                    Simular: Lente sucio
                  </button>
                  <button 
                    onClick={() => { setCauseType('muchos_defectos'); setShowCriticalAlert(true); }}
                    className="w-full text-xs font-['Inter'] font-bold py-1.5 bg-[#f97316]/20 text-[#f97316] hover:bg-[#f97316]/30 rounded transition-colors"
                  >
                    Simular: Muchos defectos
                  </button>
                  <button 
                    onClick={() => { setCauseType('calibracion_perdida'); setShowCriticalAlert(true); }}
                    className="w-full text-xs font-['Inter'] font-bold py-1.5 bg-[#ef4444]/20 text-[#ef4444] hover:bg-[#ef4444]/30 rounded transition-colors"
                  >
                    Simular: Calibración perdida
                  </button>
                  <button 
                    onClick={() => { setCauseType('parada_manual'); setShowCriticalAlert(true); }}
                    className="w-full text-xs font-['Inter'] font-bold py-1.5 bg-[#3b82f6]/20 text-[#3b82f6] hover:bg-[#3b82f6]/30 rounded transition-colors"
                  >
                    Simular: Parada manual
                  </button>
                  <button 
                    onClick={() => setShowTestPanel(false)}
                    className="w-full text-[10px] text-[#52525b] hover:text-[#a1a1aa] mt-1 transition-colors"
                  >
                    ✕ cerrar panel
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ══ MODALES ══ */}

      {showStopModal && (
        <StopInspectionModal
          onClose={() => setShowStopModal(false)}
          onConfirm={handleConfirmStop}
          totalUnits={total}
          defects={defectosAQL}
          defectRate={defectRateAQL}
        />
      )}

      {showPauseModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-[#1a1a1a] border-2 border-[#f1c100] rounded-xl max-w-md w-full shadow-[0_0_40px_rgba(241,193,0,0.3)]">
            <div className="bg-[#222] border-b border-gray-800 px-6 py-5 flex items-center justify-between rounded-t-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f1c100]/20 border-2 border-[#f1c100] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Pause size={26} className="text-[#f1c100]" />
                </div>
                <div>
                  <h2 className="text-white font-['Space_Grotesk'] font-bold text-xl">PAUSAR INSPECCIÓN</h2>
                  <p className="text-[#71717a] font-['Inter'] text-xs mt-0.5">El contador se detendrá temporalmente</p>
                </div>
              </div>
              <button onClick={() => setShowPauseModal(false)} className="p-2 text-gray-500 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="text-[#a1a1aa] font-['Inter'] text-base leading-relaxed">
                ¿Pausar la inspección del lote{" "}
                <span className="text-white font-bold">{loteData?.numeroLote ?? "actual"}</span>?
                La cinta transportadora se detendrá y el sistema quedará en espera.
              </p>
            </div>
            <div className="bg-[#222] border-t border-gray-800 px-6 py-5 flex gap-3 rounded-b-xl">
              <button onClick={() => setShowPauseModal(false)} className="flex-1 bg-[#2a2a2a] hover:bg-[#333] border border-gray-700 text-white font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px]">
                CANCELAR
              </button>
              <button onClick={handlePause} className="flex-1 bg-[#f1c100] hover:bg-yellow-300 text-black font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px]">
                CONFIRMAR PAUSA
              </button>
            </div>
          </div>
        </div>
      )}

      {showEmergencyModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-[#1a1a1a] border-4 border-[#ef4444] rounded-xl max-w-md w-full shadow-[0_0_60px_rgba(239,68,68,0.5)]">
            <div className="bg-[#ef4444]/10 border-b-2 border-[#ef4444] px-6 py-5 flex items-center justify-between rounded-t-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#ef4444] rounded-xl flex items-center justify-center flex-shrink-0 animate-pulse">
                  <AlertTriangle size={30} className="text-white" />
                </div>
                <div>
                  <h2 className="text-[#ef4444] font-['Space_Grotesk'] font-bold text-xl">PARADA DE EMERGENCIA</h2>
                  <p className="text-[#71717a] font-['Inter'] text-xs mt-0.5">Acción crítica — requiere confirmación</p>
                </div>
              </div>
              <button onClick={() => setShowEmergencyModal(false)} className="p-2 text-gray-500 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="px-6 py-5 space-y-3">
              <p className="text-[#a1a1aa] font-['Inter'] text-base leading-relaxed">
                Esta acción <span className="text-[#ef4444] font-bold">detendrá inmediatamente la inspección</span> y generará un reporte de incidente.
              </p>
              <div className="bg-[#ef4444]/10 border border-[#ef4444] rounded-lg p-3">
                <p className="text-[#ef4444] font-['Inter'] text-sm font-bold">
                  El lote quedará marcado como DETENIDO POR EMERGENCIA en el sistema de trazabilidad.
                </p>
              </div>
            </div>
            <div className="bg-[#222] border-t border-gray-800 px-6 py-5 flex gap-3 rounded-b-xl">
              <button onClick={() => setShowEmergencyModal(false)} className="flex-1 bg-[#2a2a2a] hover:bg-[#333] border border-gray-700 text-white font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px]">
                CANCELAR
              </button>
              <button
                onClick={() => { setAlertaActivaDesde(defectos); setShowEmergencyModal(false); setIsRunning(false); setIsPaused(false); setShowCriticalAlert(true); }}
                className="flex-1 bg-[#ef4444] hover:bg-red-600 text-white font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px]"
              >
                CONFIRMAR EMERGENCIA
              </button>
            </div>
          </div>
        </div>
      )}

      {showCriticalAlert && (
        <CriticalAlertModal
          onClose={() => setShowCriticalAlert(false)}
          onConfirm={handleCriticalConfirm}
          onRecalibrar={handleRecalibrar}
          onRevisarEnvase={handleRevisarEnvase}
          causeType={causeType}
        />
      )}

      {showFalsePositive && (
        <FalsePositiveModal
          onClose={() => setShowFalsePositive(false)}
          onConfirm={(reason: string) => {
            setDefectos((p) => Math.max(0, p - 1));
            agregarRegistro({
              tipo: "FALSO_POSITIVO",
              operario: `${operarioName} - ${operarioLeg}`,
              descripcion: `✅ Falso positivo corregido: ${reason}. Detección #4492-AX anulada.`,
              loteRelacionado: loteData?.numeroLote ?? "N/A",
              razonFalsoPositivo: reason,
            });
          }}
          defectId="#4492-AX"
        />
      )}

      {showRecalibracion && (
        <RecalibrationDialog
          open={showRecalibracion}
          onComplete={() => {
            setShowRecalibracion(false);
            setIsRunning(true);
            setIsPaused(false);
          }}
        />
      )}
    </div>
  );
}

function RecalibrationDialog({ open, onComplete }: { open: boolean; onComplete: () => void }) {
  const [ilu, setIlu] = useState(0);
  const [nit, setNit] = useState(0);

  useEffect(() => {
    if (!open) {
      setIlu(0);
      setNit(0);
      return;
    }
    const interval = setInterval(() => {
      setIlu(prev => {
        if (prev >= 100) return 100;
        return prev + (100 / (3000 / 50));
      });
      setNit(prev => {
        if (prev >= 100) return 100;
        return prev + (100 / (3000 / 50));
      });
    }, 50);
    return () => clearInterval(interval);
  }, [open]);

  const isReady = ilu >= 100 && nit >= 100;

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent 
        className="bg-[#1a1a1a] border border-[#3b82f6] [&>button]:hidden sm:max-w-md p-0 overflow-hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="px-6 pt-6 pb-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#3b82f6]/10 flex items-center justify-center border border-[#3b82f6]/30">
              <Camera className="w-8 h-8 text-[#3b82f6]" />
            </div>
            <div className="space-y-1 text-center">
              <DialogTitle className="text-white font-['Space_Grotesk'] text-xl tracking-wide">
                RECALIBRACIÓN DE CÁMARA
              </DialogTitle>
              <DialogDescription className="text-[#a1a1aa] font-['Inter'] text-sm">
                Ajustando parámetros sin interrumpir el lote activo
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-6 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-['Inter'] font-medium">
              <span className="text-white">Iluminación</span>
              <span className="text-[#3b82f6] font-mono">{Math.round(ilu)}%</span>
            </div>
            <div className="h-2 bg-[#2a2a2a] rounded overflow-hidden">
              <div 
                className="h-full bg-[#3b82f6] transition-all duration-75 ease-linear"
                style={{ width: `${ilu}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-['Inter'] font-medium">
              <span className="text-white">Nitidez</span>
              <span className="text-[#3b82f6] font-mono">{Math.round(nit)}%</span>
            </div>
            <div className="h-2 bg-[#2a2a2a] rounded overflow-hidden">
              <div 
                className="h-full bg-[#3b82f6] transition-all duration-75 ease-linear"
                style={{ width: `${nit}%` }}
              />
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 pt-2">
          <button
            disabled={!isReady}
            onClick={onComplete}
            className={`w-full py-4 rounded font-['Space_Grotesk'] font-bold text-[13px] tracking-wide transition-colors uppercase ${
              isReady 
                ? 'bg-[#10b981] text-white hover:bg-[#059669] shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                : 'bg-[#2a2a2a] text-[#71717a] cursor-not-allowed'
            }`}
          >
            {isReady ? "✓ CALIBRACIÓN COMPLETA — REANUDAR INSPECCIÓN" : "CALIBRANDO..."}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}