import { X, Droplets, Sun, ShieldAlert, Play } from "lucide-react";

interface FalsePositiveModalProps {
  onClose: () => void;
  defectId: string;
}

export function FalsePositiveModal({ onClose, defectId }: FalsePositiveModalProps) {
  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-8">
      <div className="bg-[#0e0e0e] max-w-5xl w-full rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#1a1a1a] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-[#f1c100]" />
            <div>
              <h2 className="text-white font-['Space_Grotesk'] font-bold text-xl">
                CLASIFICACIÓN MANUAL - REPORTE DE FALSO POSITIVO
              </h2>
              <div className="text-[#71717a] font-['Inter'] text-xs mt-1">
                LÍNEA_04 // ESTACIÓN_10
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded transition-colors"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="p-8">
          {/* Main Image Display */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg mb-6 relative overflow-hidden h-[400px]">
            <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
              <div className="text-gray-600 font-['Liberation_Mono'] text-sm">
                CONTAINER_TYPE_A // THERMAL_SCAN_VIEW
              </div>
            </div>
            
            {/* Bounding Box Overlay */}
            <div 
              className="absolute border-2 border-[#ff5545] rounded"
              style={{
                left: "35%",
                top: "30%",
                width: "30%",
                height: "40%",
              }}
            >
              <div className="absolute -top-8 left-0 bg-[#ff5545] text-white px-3 py-1 font-bold text-sm">
                AI_DETECTED: DEFECT_092 (CRACK)
              </div>
            </div>

            {/* Confidence Score */}
            <div className="absolute top-4 right-4 bg-black/70 px-4 py-2 rounded">
              <div className="text-gray-400 text-xs mb-1">CONFIDENCE SCORE</div>
              <div className="text-white text-3xl font-bold">84.2%</div>
            </div>

            {/* Timestamp */}
            <div className="absolute top-4 left-4 bg-black/70 px-4 py-2 rounded">
              <div className="text-gray-400 text-xs mb-1">TIMESTAMP</div>
              <div className="text-[#f1c100] text-lg font-['Liberation_Mono']">
                2023-10-27 14:22:09.432
              </div>
            </div>

            {/* Status Badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-red-900/50 border border-red-500 px-4 py-2 rounded">
              <ShieldAlert size={16} className="text-red-400" />
              <span className="text-white font-bold text-sm uppercase">
                ESTADO DE LÍNEA: DETENIDA
              </span>
            </div>
          </div>

          {/* Classification Options */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button className="bg-[#2a2a2a] hover:bg-[#353535] border border-gray-700 rounded-lg p-6 transition-colors group">
              <Droplets size={32} className="text-gray-400 mb-3 mx-auto" />
              <div className="text-white font-bold text-center mb-2 uppercase">
                Es Suciedad (Limpiable)
              </div>
              <div className="text-gray-500 text-xs text-center">
                Partículas externas detectadas en superficie
              </div>
            </button>

            <button className="bg-[#2a2a2a] hover:bg-[#353535] border border-gray-700 rounded-lg p-6 transition-colors group">
              <Sun size={32} className="text-gray-400 mb-3 mx-auto" />
              <div className="text-white font-bold text-center mb-2 uppercase">
                Es Sombra/Reflejo
              </div>
              <div className="text-gray-500 text-xs text-center">
                Artefacto visual por iluminación de la cámara
              </div>
            </button>

            <button className="bg-[#353534] hover:bg-[#3d3c3b] border-2 border-[#5d3f3b] rounded-lg p-6 transition-colors group">
              <ShieldAlert size={32} className="text-[#ffb4aa] mb-3 mx-auto" />
              <div className="text-[#ffb4aa] font-bold text-center mb-2 uppercase">
                Falsa Alarma (Envase Perfecto)
              </div>
              <div className="text-gray-400 text-xs text-center">
                Error de detección. Unidad cumple estándar
              </div>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded transition-colors uppercase tracking-wider"
            >
              Descartar Reporte
            </button>
            <button className="flex-1 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold py-4 rounded transition-colors flex items-center justify-center gap-3 uppercase tracking-wider">
              <Play size={20} />
              Guardar y Reanudar Línea
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}