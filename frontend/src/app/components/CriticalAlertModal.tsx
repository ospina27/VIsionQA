import { useState, useEffect } from "react";
import { AlertTriangle, Bell, CheckCircle, RefreshCcw } from "lucide-react";
import { useRegistros } from "../context/RegistrosContext";

const causeMensaje: Record<string, string> = {
  lente_sucio: "LENTE DE CÁMARA SUCIO DETECTADO — VISIÓN COMPROMETIDA EN LÍNEA 04",
  muchos_defectos: "UMBRAL AQL SUPERADO — MÚLTIPLES DEFECTOS DETECTADOS CONSECUTIVAMENTE",
  calibracion_perdida: "PÉRDIDA DE CALIBRACIÓN — CÁMARA DESALINEADA EN LÍNEA 04",
  parada_manual: "PARADA MANUAL ACTIVADA POR EL OPERARIO",
  general: "3 QUEMADURAS CRÍTICAS DETECTADAS CONSECUTIVAMENTE EN LA LÍNEA 04"
};

const causeTitulo: Record<string, { linea1: string; linea2: string; linea3?: string }> = {
  lente_sucio: {
    linea1: "ALERTA:",
    linea2: "LENTE SUCIO",
    linea3: "DETECTADO"
  },
  muchos_defectos: {
    linea1: "ALERTA DE PARO:",
    linea2: "DEFECTOS EN",
    linea3: "UMBRAL CRÍTICO"
  },
  calibracion_perdida: {
    linea1: "ALERTA:",
    linea2: "CALIBRACIÓN",
    linea3: "PERDIDA"
  },
  parada_manual: {
    linea1: "PARADA",
    linea2: "MANUAL",
  },
  general: {
    linea1: "ALERTA DE PARO:",
    linea2: "UMBRAL CRÍTICO",
    linea3: "SUPERADO"
  }
};

interface CriticalAlertModalProps {
  onClose: () => void;
  onConfirm: () => void;
  onRecalibrar?: () => void;
  onRevisarEnvase?: () => void;
  causeType?: 'lente_sucio' | 'muchos_defectos' | 'calibracion_perdida' | 'parada_manual' | 'general';
}

export function CriticalAlertModal({ onClose, onConfirm, onRecalibrar, onRevisarEnvase, causeType = 'general' }: CriticalAlertModalProps) {
  const [isRecalibrating, setIsRecalibrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { agregarRegistro } = useRegistros();

  const handleRecalibrationStart = () => {
    setIsRecalibrating(true);
    setProgress(0);
    
    // Simulate calibration progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random progress increment between 2 and 8
        const increment = Math.floor(Math.random() * 7) + 2;
        return Math.min(100, prev + increment);
      });
    }, 150);
  };

  const handleRecalibrationComplete = () => {
    // Registramos la calibración como notificacion de alerta resuelta
    agregarRegistro({
      tipo: "NOTIFICACION_SUPERVISOR",
      operario: "Sistema de Calibración",
      descripcion: "Calibración restaurada. Los parámetros de visión de la cámara han vuelto a los valores óptimos (0.92 precision).",
      paradaTipo: "RECALIBRACION",
      causa: "Pérdida de Calibración - CÁMARA DESALINEADA",
      linea: "LÍNEA 04",
      resuelta: true,
      horaResolucion: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
    } as any);

    setTimeout(() => {
      if (onRecalibrar) {
        onRecalibrar();
      } else {
        onConfirm();
      }
    }, 500); // Pequeña pausa al 100% para que se vea el progreso completo
  };

  useEffect(() => {
    if (isRecalibrating && progress >= 100) {
      handleRecalibrationComplete();
    }
  }, [progress, isRecalibrating]);

  const getSopConfig = () => {
    switch (causeType) {
      case 'lente_sucio':
        return {
          borderColor: 'border-[#f59e0b]',
          textColor: 'text-[#f59e0b]',
          steps: [
            "Presionar PAUSAR en el dashboard",
            "Tomar el paño de microfibra del kit (cajón derecho)",
            "Limpiar lente con movimientos circulares suaves",
            "Verificar que la imagen esté nítida en pantalla",
            "Presionar REANUDAR para continuar"
          ]
        };
      case 'muchos_defectos':
        return {
          borderColor: 'border-[#f97316]',
          textColor: 'text-[#f97316]',
          steps: [
            "Esto puede ser un defecto real o un error del sistema — NO detener aún",
            "Revisar físicamente el último envase detectado",
            "Si el defecto es real: pausar y confirmar",
            "Si fue error del sistema: el sistema reanudará automáticamente"
          ],
          message: "⏸ INSPECCIÓN PAUSADA — Se recomienda detener la banda físicamente y revisar el último envase antes de reanudar"
        };
      case 'calibracion_perdida':
        return {
          borderColor: 'border-[#ef4444]',
          textColor: 'text-[#ef4444]',
          steps: [
            "Detener la línea con el botón CONFIRMAR DESPEJE",
            "Ir a Calibración en el menú lateral izquierdo",
            "Ejecutar calibración automática (3 segundos)",
            "Si la calibración falla: llamar a técnico Ext. 4420"
          ]
        };
      case 'parada_manual':
        return null;
      case 'general':
        return null;
      default:
        return null;
    }
  };

  const sopConfig = getSopConfig();
  const titulo = causeTitulo[causeType ?? 'general'];

  const bottomButton: Record<string, { text: string; className: string; icon: any; onClick: () => void }> = {
    lente_sucio: {
      text: "REANUDAR TRANSMISIÓN",
      className: "bg-[#10b981] hover:bg-[#059669]",
      icon: CheckCircle,
      onClick: onConfirm
    },
    muchos_defectos: {
      text: "PAUSAR Y REVISAR ENVASE",
      className: "bg-[#f59e0b] hover:bg-[#d97706]",
      icon: Bell,
      onClick: onRevisarEnvase || onConfirm
    },
    calibracion_perdida: {
      text: "RECALIBRAR CÁMARA",
      className: "bg-[#3b82f6] hover:bg-[#2563eb]",
      icon: CheckCircle,
      onClick: handleRecalibrationStart
    },
    parada_manual: {
      text: "CONFIRMAR PARADA MANUAL",
      className: "bg-[#3b82f6] hover:bg-[#2563eb]",
      icon: CheckCircle,
      onClick: onConfirm
    },
    general: {
      text: "RESOLVER Y CONTINUAR",
      className: "bg-[#dc2626] hover:bg-[#b91c1c]",
      icon: CheckCircle,
      onClick: onConfirm
    }
  };

  const btn = bottomButton[causeType ?? 'general'];
  const BtnIcon = btn.icon;

  return (
    <div className="fixed inset-0 bg-[#131313] z-[100] flex flex-col">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-red-900 via-gray-900 to-black pointer-events-none" />

      {/* Header - Emergency Override */}
      <div className="absolute top-0 left-0 right-0 backdrop-blur-xl bg-[rgba(10,10,10,0.8)] border-b-2 border-[rgba(127,29,29,0.3)] shadow-[0px_0px_30px_0px_rgba(255,59,48,0.2)] px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <AlertTriangle size={24} className="text-[#ef4444]" />
          <div className="text-[#ef4444] font-['Liberation_Serif'] font-bold text-xl tracking-[2px] uppercase">
            SISTEMA CRÍTICO
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-[rgba(220,38,38,0.2)] border border-[#ef4444] px-3 py-1 hidden sm:block">
            <div className="text-[#ef4444] font-['Liberation_Serif'] font-bold text-sm tracking-tight">
              CÓDIGO_ERROR: 0x44-QC
            </div>
          </div>
          <AlertTriangle size={38} className="text-gray-500" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start overflow-y-auto px-4 sm:px-8 pt-24 pb-28 gap-6 z-0">
        {!isRecalibrating ? (
          <>
            {/* Giant Icon with Glow */}
            <div className="w-32 h-28 sm:w-44 sm:h-36 flex-shrink-0 mx-auto mt-2">
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
            <div className="w-full max-w-3xl mx-auto text-center">
              <div className="text-center space-y-4">
                <div className="font-['Liberation_Serif'] text-white text-5xl sm:text-7xl md:text-8xl leading-tight tracking-[-4.8px]">
                  <p className="mb-0">{titulo.linea1}</p>
                  <p className="mb-0 text-[#ff5545]">{titulo.linea2}</p>
                  {titulo.linea3 && <p className="text-[#ff5545]">{titulo.linea3}</p>}
                </div>

                <div className="flex items-center gap-4 justify-center py-6">
                  <div className="flex-1 max-w-sm h-px bg-gradient-to-r from-transparent via-[rgba(127,29,29,0.5)] to-transparent" />
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-[#fecaca] font-['Liberation_Serif'] text-lg sm:text-2xl tracking-[0.6px] uppercase text-center opacity-70">
                      {causeMensaje[causeType ?? 'general']}
                    </div>
                  </div>
                  <div className="flex-1 max-w-sm h-px bg-gradient-to-r from-transparent via-[rgba(127,29,29,0.5)] to-transparent" />
                </div>
              </div>

              {/* Technical Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2 max-w-4xl mx-auto w-full">
                <div className="backdrop-blur-md bg-[rgba(69,10,10,0.4)] border-l-4 border-[#ff5545] p-3 sm:p-4 text-left">
                  <div className="text-[#ffb4aa] font-['Inter'] font-bold text-[10px] tracking-wider uppercase opacity-70 mb-1">
                    ID_SENSOR
                  </div>
                  <div className="text-white font-['Liberation_Serif'] font-bold text-base sm:text-xl">
                    THERM-09-A
                  </div>
                </div>

                <div className="backdrop-blur-md bg-[rgba(69,10,10,0.4)] border-l-4 border-[#ff5545] p-3 sm:p-4 text-left">
                  <div className="text-[#ffb4aa] font-['Inter'] font-bold text-[10px] tracking-wider uppercase opacity-70 mb-1">
                    MARCA_TIEMPO
                  </div>
                  <div className="text-white font-['Liberation_Serif'] font-bold text-base sm:text-xl">
                    14:52:03:09
                  </div>
                </div>

                <div className="backdrop-blur-md bg-[rgba(69,10,10,0.4)] border-l-4 border-[#ff5545] p-3 sm:p-4 text-left">
                  <div className="text-[#ffb4aa] font-['Inter'] font-bold text-[10px] tracking-wider uppercase opacity-70 mb-1">
                    SEVERIDAD
                  </div>
                  <div className="text-white font-['Liberation_Serif'] font-bold text-base sm:text-xl uppercase">
                    CRÍTICO
                  </div>
                </div>

                <div className="backdrop-blur-md bg-[rgba(69,10,10,0.4)] border-l-4 border-[#ff5545] p-3 sm:p-4 text-left">
                  <div className="text-[#ffb4aa] font-['Inter'] font-bold text-[10px] tracking-wider uppercase opacity-70 mb-1">
                    PROTOCOLO_ACTIVO
                  </div>
                  <div className="text-white font-['Liberation_Serif'] font-bold text-base sm:text-xl">
                    PARO-E-04
                  </div>
                </div>
              </div>

              {/* QUÉ DEBES HACER AHORA Section */}
              {sopConfig && causeType !== 'general' && (
                <div className={`w-full max-w-2xl mx-auto mt-8 bg-[#1a1a1a] border-l-4 ${sopConfig.borderColor} p-4 sm:p-6 shadow-lg z-20 relative text-left`}>
                  <h3 className={`font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wider mb-4 ${sopConfig.textColor}`}>
                    QUÉ DEBES HACER AHORA
                  </h3>
                  <ul className="space-y-3">
                    {sopConfig.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className={`font-['Liberation_Mono'] font-bold text-sm mt-0.5 ${sopConfig.textColor}`}>
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                        <span className="font-['Inter'] text-xs sm:text-sm text-[#d4d4d8] leading-relaxed">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  {'message' in sopConfig && sopConfig.message && (
                    <div className="mt-6 bg-[#f59e0b]/10 border border-[#f59e0b] rounded p-3 text-[#f59e0b] font-['Inter'] text-sm leading-snug">
                      {sopConfig.message}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center flex-1 mt-10">
            <RefreshCcw size={80} className="text-[#3b82f6] animate-spin mb-8" />
            <h2 className="font-['Space_Grotesk'] text-white text-4xl sm:text-5xl font-bold mb-4 tracking-tight text-center">
              RECALIBRANDO CÁMARA
            </h2>
            <p className="text-[#a1a1aa] font-['Inter'] text-xl mb-12 text-center">
              Ajustando parámetros de visión y alineación automática...
            </p>
            
            <div className="w-full max-w-xl bg-gray-800 rounded-full h-6 mb-4 overflow-hidden border border-gray-700 relative">
              <div 
                className="bg-[#3b82f6] h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              >
                {/* Highlight effect */}
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-white/20 w-full animate-pulse" />
              </div>
            </div>
            
            <div className="flex justify-between w-full max-w-xl px-2">
              <span className="text-[#3b82f6] font-['Liberation_Mono'] font-bold text-xl">{progress}%</span>
              <span className="text-gray-400 font-['Inter']">Operación en curso</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 backdrop-blur-[20px] bg-[rgba(23,23,23,0.9)] border-t-2 border-[rgba(220,38,38,0.5)] z-10">
        {!isRecalibrating ? (
          <button
            onClick={btn.onClick}
            className={`w-full h-full flex items-center justify-center gap-3 sm:gap-4 transition-colors ${btn.className}`}
          >
            <BtnIcon size={22} className="text-white flex-shrink-0" />
            <span className="text-white font-['Liberation_Serif'] font-bold text-base sm:text-lg tracking-[0.9px] uppercase">
              {btn.text}
            </span>
          </button>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
            <span className="text-gray-400 font-['Space_Grotesk'] font-bold tracking-wider animate-pulse">
              POR FAVOR ESPERE...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}