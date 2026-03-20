import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { AlertBanner } from "../components/AlertBanner";
import { HoldButton } from "../components/HoldButton";
import { CriticalErrorModal } from "../components/CriticalErrorModal";
import { NetworkStatus } from "../components/NetworkStatus";
import { 
  Pause, 
  Play, 
  StopCircle, 
  AlertTriangle,
  Bell,
  HelpCircle,
  X,
  Menu
} from "lucide-react";

interface Defect {
  id: string;
  type: string;
  confidence: number;
  x: number;
  y: number;
}

export function DashboardCore() {
  const [isRunning, setIsRunning] = useState(true);
  const [total, setTotal] = useState(1205);
  const [aceptados, setAceptados] = useState(1190);
  const [rechazados, setRechazados] = useState(15);
  const [currentDefects, setCurrentDefects] = useState<Defect[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);
  const [showCriticalError, setShowCriticalError] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"warning" | "error">("warning");
  const navigate = useNavigate();

  const aqlRate = ((rechazados / total) * 100).toFixed(1);
  const aqlStatus = parseFloat(aqlRate) <= 1.0 ? "NORMAL" : "CRÍTICO";

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTotal((prev) => prev + 1);
      
      if (Math.random() > 0.98) {
        setRechazados((prev) => prev + 1);
        setCurrentDefects([
          {
            id: Date.now().toString(),
            type: Math.random() > 0.5 ? "Quemadura" : "Raya",
            confidence: 85 + Math.random() * 15,
            x: 20 + Math.random() * 60,
            y: 20 + Math.random() * 60,
          },
        ]);
      } else {
        setAceptados((prev) => prev + 1);
        setCurrentDefects([]);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handlePauseBanda = () => {
    setIsRunning(!isRunning);
  };

  const handleFinalizarLote = () => {
    navigate("/cierre");
  };

  const handleObjetoExtrano = () => {
    setAlertType("warning");
    setAlert("Objeto no identificado en la línea. Retire el elemento de la banda para reanudar");
    setIsRunning(false);
  };

  const handleLoteRechazado = () => {
    setShowCriticalError(true);
    setIsRunning(false);
  };

  const handleCriticalConfirm = () => {
    setShowCriticalError(false);
    navigate("/cierre");
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Sidebar - Hidden on mobile by default */}
      <div className={`fixed lg:relative inset-y-0 left-0 z-30 transform transition-transform duration-300 lg:translate-x-0 ${
        showSidebar ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar station="ESTACIÓN_08" />
      </div>

      {/* Overlay for mobile sidebar */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#1a1a1a] border-b border-gray-800 px-3 md:px-5 lg:px-6 py-2 md:py-3 flex items-center justify-between min-h-[64px] md:min-h-[72px]">
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4 overflow-x-auto">
            <button 
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden p-2 hover:bg-[#2a2a2a] rounded transition-colors"
            >
              <Menu size={24} className="text-gray-400" />
            </button>
            <h2 className="text-white text-base md:text-lg lg:text-xl font-bold whitespace-nowrap">INSPECCIÓN_VISUAL</h2>
            <span className="px-2 md:px-3 py-1 bg-[#ff3b3b] text-white text-xs md:text-sm font-bold rounded whitespace-nowrap">
              EN_VIVO
            </span>
            <div className="hidden md:block">
              <NetworkStatus />
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button className="p-2 md:p-3 hover:bg-[#2a2a2a] rounded transition-colors">
              <Bell size={18} className="text-gray-400 md:w-5 md:h-5" />
            </button>
            <button 
              onClick={() => setShowHelp(true)}
              className="p-2 md:p-3 hover:bg-[#2a2a2a] rounded transition-colors"
            >
              <HelpCircle size={18} className="text-gray-400 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Alert Banner */}
        {alert && (
          <AlertBanner
            type={alertType}
            message={alert}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Main Content - Responsive Layout */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Video Feed */}
          <div className="flex-1 p-3 md:p-4 lg:p-6 overflow-hidden flex flex-col gap-3">
            {/* EMERGENCY STOP - Siempre visible */}
            <div className="bg-gradient-to-r from-red-900 to-red-700 border-4 border-red-500 rounded-lg p-3 shadow-2xl">
              <HoldButton
                onComplete={handlePauseBanda}
                variant={isRunning ? "danger" : "primary"}
                className="w-full"
              >
                {isRunning ? (
                  <>
                    <Pause size={28} className="md:w-8 md:h-8" />
                    <span className="text-lg md:text-xl font-black">PARADA DE EMERGENCIA</span>
                  </>
                ) : (
                  <>
                    <Play size={28} className="md:w-8 md:h-8" />
                    <span className="text-lg md:text-xl font-black">REANUDAR INSPECCIÓN</span>
                  </>
                )}
              </HoldButton>
            </div>

            {/* Video Feed */}
            <div className="flex-1 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border-2 border-gray-700 relative overflow-hidden">
              {/* Simulated Container */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="relative w-full max-w-2xl aspect-[4/3]">
                  <div className="w-full h-full bg-gray-600 rounded-lg border-4 border-gray-500 shadow-2xl" />
                  
                  {/* Bounding Boxes */}
                  {currentDefects.map((defect) => (
                    <div
                      key={defect.id}
                      className="absolute border-2 md:border-4 border-[#ff3b3b] rounded"
                      style={{
                        left: `${defect.x}%`,
                        top: `${defect.y}%`,
                        width: "60px",
                        height: "45px",
                      }}
                    >
                      <div className="absolute -top-6 md:-top-8 left-0 bg-[#ff3b3b] text-white px-2 md:px-3 py-1 text-xs md:text-sm font-bold whitespace-nowrap">
                        {defect.type.toUpperCase()} {defect.confidence.toFixed(0)}%
                      </div>
                    </div>
                  ))}

                  {/* Approved Label */}
                  {currentDefects.length === 0 && (
                    <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-3 md:px-6 py-1 md:py-2 rounded font-bold text-sm md:text-base whitespace-nowrap">
                      APROBADO_VÁLIDO
                    </div>
                  )}
                </div>
              </div>

              {/* Status Indicators */}
              <div className="absolute top-3 md:top-4 left-3 md:left-4 space-y-2">
                <div className="bg-black/70 px-3 py-1.5 rounded flex items-center gap-2">
                  <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${isRunning ? "bg-green-500 animate-pulse" : "bg-yellow-500"}`} />
                  <span className="text-white font-bold text-sm">
                    {isRunning ? "EN VIVO" : "PAUSADO"}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons - Compactos */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowCorrection(true)}
                className="flex-1 px-3 py-3 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded transition-colors flex items-center justify-center gap-2 text-sm min-h-[64px]"
              >
                <AlertTriangle size={20} />
                <span>Corregir IA</span>
              </button>
              
              <button
                onClick={handleObjetoExtrano}
                className="flex-1 px-3 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded transition-colors text-sm min-h-[64px]"
              >
                Objeto Extraño
              </button>

              <button
                onClick={handleLoteRechazado}
                className="flex-1 px-3 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded transition-colors text-sm min-h-[64px]"
              >
                Simular Rechazo
              </button>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="lg:w-80 xl:w-96 bg-[#1a1a1a] border-t lg:border-t-0 lg:border-l border-gray-800 p-3 md:p-4 lg:p-6 space-y-4 md:space-y-6 overflow-y-auto max-h-[40vh] lg:max-h-none">
            {/* Batch Status */}
            <div className="space-y-2">
              <div className="text-gray-400 text-xs md:text-sm">ESTADO DEL LOTE</div>
              <div className={`text-xl md:text-2xl lg:text-3xl font-bold ${
                aqlStatus === "NORMAL" ? "text-green-500" : "text-red-500"
              }`}>
                LOTE {aqlStatus}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-[#0a0a0a] rounded-lg p-4 md:p-6 space-y-4 md:space-y-6">
              <div>
                <div className="text-gray-400 text-xs md:text-sm mb-2">TOTAL</div>
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{total}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <div className="text-gray-400 text-xs md:text-sm mb-2">ACEPTADOS</div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-500">{aceptados}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs md:text-sm mb-2">RECHAZADOS</div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-red-500">{rechazados}</div>
                </div>
              </div>
            </div>

            {/* AQL Indicator */}
            <div className="bg-[#0a0a0a] rounded-lg p-4 md:p-6">
              <div className="text-gray-400 text-xs md:text-sm mb-2">TASA DE DEFECTOS</div>
              <div className={`text-2xl md:text-3xl lg:text-4xl font-bold ${
                parseFloat(aqlRate) <= 1.0 ? "text-green-500" : "text-red-500"
              }`}>
                {aqlRate}%
              </div>
              <div className="mt-3 md:mt-4 text-gray-400 text-xs">
                Límite AQL: 1.0% (ISO 2859-1)
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-[#0a0a0a] rounded-lg p-4 md:p-6 space-y-3 md:space-y-4 text-sm md:text-base">
              <div className="flex justify-between">
                <span className="text-gray-400">INSPECCIÓN</span>
                <span className="text-yellow-400 font-bold">&lt; 0.5s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">CONFIANZA</span>
                <span className="text-green-500 font-bold">99.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">UNIDADES/H</span>
                <span className="text-white font-bold">4,280</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">OPERARIO</span>
                <span className="text-white font-bold">F. RODRÍGUEZ</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 md:space-y-4 pt-2 md:pt-4">
              <HoldButton
                onComplete={handlePauseBanda}
                variant={isRunning ? "secondary" : "primary"}
                className="w-full"
              >
                {isRunning ? (
                  <>
                    <Pause size={20} className="md:w-6 md:h-6" />
                    Pausar Banda
                  </>
                ) : (
                  <>
                    <Play size={20} className="md:w-6 md:h-6" />
                    Reanudar Banda
                  </>
                )}
              </HoldButton>

              <HoldButton
                onComplete={handleFinalizarLote}
                variant="danger"
                className="w-full"
              >
                <StopCircle size={20} className="md:w-6 md:h-6" />
                Finalizar Lote
              </HoldButton>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Error Modal */}
      {showCriticalError && (
        <CriticalErrorModal
          onClose={() => setShowCriticalError(false)}
          onConfirm={handleCriticalConfirm}
        />
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 md:p-8 z-50 overflow-y-auto">
          <div className="bg-[#1a1a1a] rounded-lg max-w-5xl w-full my-8">
            <div className="sticky top-0 bg-[#1a1a1a] border-b border-gray-800 px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
              <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold">Guía Visual de Defectos</h3>
              <button 
                onClick={() => setShowHelp(false)}
                className="p-2 md:p-3 hover:bg-gray-800 rounded transition-colors"
              >
                <X size={24} className="text-gray-400 md:w-7 md:h-7" />
              </button>
            </div>
            
            <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {/* Aceptable */}
              <div className="bg-green-900/30 border-2 border-green-500 rounded-lg p-4 md:p-6">
                <div className="inline-block px-3 md:px-4 py-1 md:py-2 bg-green-500 text-white font-bold rounded mb-3 md:mb-4 text-sm md:text-base">
                  ACEPTABLE
                </div>
                <h4 className="text-white text-lg md:text-xl font-bold mb-3">Quemadura Aceptable</h4>
                <div className="bg-gray-700 h-32 md:h-48 rounded mb-3 md:mb-4 flex items-center justify-center text-gray-400 text-sm">
                  [Imagen de referencia]
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  Defecto superficial. Coloración amarillenta o marrón leve que no excede los 2mm de diámetro. 
                  Sin deformación estructural.
                </p>
              </div>

              {/* Rechazo */}
              <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-4 md:p-6">
                <div className="inline-block px-3 md:px-4 py-1 md:py-2 bg-red-500 text-white font-bold rounded mb-3 md:mb-4 text-sm md:text-base">
                  RECHAZO
                </div>
                <h4 className="text-white text-lg md:text-xl font-bold mb-3">Quemadura Crítica</h4>
                <div className="bg-gray-700 h-32 md:h-48 rounded mb-3 md:mb-4 flex items-center justify-center text-gray-400 text-sm">
                  [Imagen de referencia]
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                  Carbonización severa. Presencia de hollín o perforación. 
                  Compromete la integridad del envase.
                </p>
              </div>
            </div>

            <div className="p-4 md:p-8 pt-0">
              <button
                onClick={() => setShowHelp(false)}
                className="w-full bg-[#ff6b6b] hover:bg-[#ff5555] text-white font-bold rounded-lg py-4 md:py-6 text-base md:text-xl transition-colors min-h-[64px] md:min-h-[80px]"
              >
                Cerrar y Volver a Inspección
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Correction Modal */}
      {showCorrection && (
        <div className="fixed bottom-4 md:bottom-8 left-4 md:left-1/2 md:-translate-x-1/2 right-4 md:right-auto bg-[#1a1a1a] border-2 border-yellow-500 rounded-lg p-4 md:p-6 shadow-2xl z-50 md:max-w-2xl">
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-white text-lg md:text-xl font-bold">Reportar Falso Positivo</h4>
            <p className="text-gray-400 text-sm md:text-base">Seleccione el tipo de error:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 md:py-5 px-4 md:px-6 rounded transition-colors min-h-[64px] text-sm md:text-base">
                Mancha de Suciedad
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 md:py-5 px-4 md:px-6 rounded transition-colors min-h-[64px] text-sm md:text-base">
                Sombra/Reflejo
              </button>
            </div>
            <p className="text-yellow-400 text-xs md:text-sm font-bold">
              → Deposite el envase en la canasta azul
            </p>
            <button
              onClick={() => setShowCorrection(false)}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 md:py-4 rounded transition-colors text-sm md:text-base"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}