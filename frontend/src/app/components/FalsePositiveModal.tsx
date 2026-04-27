import { X, Droplets, Sun, ShieldAlert, Play, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface FalsePositiveModalProps {
  onClose: () => void;
  onConfirm: (reason: string) => void;
  defectId: string;
}

const RAZONES = [
  {
    id: "Es Suciedad (Limpiable)",
    icon: Droplets,
    label: "SUCIEDAD LIMPIABLE",
    desc: "Partículas externas detectadas en superficie",
    color: "#3b82f6",
    activeBg: "bg-[#3b82f6]",
    activeBorder: "border-[#3b82f6]",
    idleIcon: "text-[#a1a1aa]",
  },
  {
    id: "Es Sombra/Reflejo",
    icon: Sun,
    label: "SOMBRA / REFLEJO",
    desc: "Artefacto visual por iluminación",
    color: "#f59e0b",
    activeBg: "bg-[#f59e0b]",
    activeBorder: "border-[#f59e0b]",
    idleIcon: "text-[#a1a1aa]",
  },
  {
    id: "Falsa Alarma (Envase Perfecto)",
    icon: ShieldAlert,
    label: "ENVASE PERFECTO",
    desc: "Error de detección — unidad cumple estándar",
    color: "#10b981",
    activeBg: "bg-[#10b981]",
    activeBorder: "border-[#10b981]",
    idleIcon: "text-[#ffb4aa]",
  },
];

export function FalsePositiveModal({ onClose, onConfirm, defectId }: FalsePositiveModalProps) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleConfirm = () => {
    if (selectedReason) {
      onConfirm(selectedReason);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4">
      <div className="bg-[#0e0e0e] border-2 border-[#f1c100] rounded-xl max-w-xl w-full shadow-[0_0_40px_rgba(241,193,0,0.2)] overflow-hidden">

        {/* Header */}
        <div className="bg-[#1a1a1a] border-b border-gray-800 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f1c100]/20 border-2 border-[#f1c100] rounded-lg flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={20} className="text-[#f1c100]" />
            </div>
            <div>
              <h2 className="text-white font-['Space_Grotesk'] font-bold text-base">
                REPORTE DE FALSO POSITIVO
              </h2>
              <div className="text-[#71717a] font-['Inter'] text-xs mt-0.5">
                Detección <span className="text-[#f1c100] font-['Liberation_Mono'] font-bold">{defectId}</span>
                {" "}— LÍNEA_04 / ESTACIÓN_10
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Vista de detección compacta */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg relative overflow-hidden h-[180px]">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-gray-600 font-['Liberation_Mono'] text-xs">
                CONTAINER_TYPE_A // THERMAL_SCAN_VIEW
              </div>
            </div>

            {/* Bounding Box */}
            <div
              className="absolute border-2 border-[#ff5545] rounded"
              style={{ left: "35%", top: "25%", width: "28%", height: "45%" }}
            >
              <div className="absolute -top-6 left-0 bg-[#ff5545] text-white px-2 py-0.5 text-[9px] font-bold whitespace-nowrap">
                AI: DEFECT_092 (CRACK)
              </div>
              <div className="absolute border-l-2 border-t-2 border-white left-0 top-0 w-2 h-2" />
              <div className="absolute border-r-2 border-b-2 border-white right-0 bottom-0 w-2 h-2" />
            </div>

            {/* Badges superpuestos */}
            <div className="absolute top-3 right-3 bg-black/80 px-3 py-1.5 rounded">
              <div className="text-gray-400 text-[9px] uppercase tracking-wide">Confidence</div>
              <div className="text-white font-['Space_Grotesk'] font-bold text-lg">84.2%</div>
            </div>
            <div className="absolute top-3 left-3 bg-black/80 px-3 py-1.5 rounded">
              <div className="text-gray-400 text-[9px] uppercase tracking-wide">Timestamp</div>
              <div className="text-[#f1c100] font-['Liberation_Mono'] text-xs">14:22:09.432</div>
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-red-900/60 border border-red-500 px-3 py-1 rounded">
              <ShieldAlert size={12} className="text-red-400" />
              <span className="text-white font-['Space_Grotesk'] font-bold text-[10px] uppercase">LÍNEA DETENIDA</span>
            </div>
          </div>

          {/* Motivo de clasificación */}
          <div>
            <p className="text-[#71717a] font-['Inter'] text-xs uppercase tracking-wide mb-2">
              Seleccione el motivo de clasificación manual:
            </p>
            <div className="grid grid-cols-3 gap-2">
              {RAZONES.map((r) => {
                const Icon = r.icon;
                const isSelected = selectedReason === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedReason(r.id)}
                    className={`rounded-xl p-4 transition-all flex flex-col items-center text-center min-h-[100px] justify-center gap-2 ${
                      isSelected
                        ? `${r.activeBg} border-2 ${r.activeBorder} shadow-lg`
                        : "bg-[#2a2a2a] border border-gray-700 hover:border-gray-500 hover:bg-[#333]"
                    }`}
                  >
                    <Icon size={24} className={isSelected ? "text-white" : r.idleIcon} />
                    <div className={`font-['Space_Grotesk'] font-bold text-[11px] leading-tight ${isSelected ? "text-white" : "text-white"}`}>
                      {r.label}
                    </div>
                    <div className={`text-[9px] leading-tight ${isSelected ? "text-white/80" : "text-[#71717a]"}`}>
                      {r.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 bg-[#2a2a2a] hover:bg-[#333] border border-gray-700 text-white font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px] text-sm"
            >
              DESCARTAR
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedReason}
              className={`flex-1 font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 min-h-[64px] text-sm ${
                selectedReason
                  ? "bg-[#f1c100] hover:bg-yellow-300 text-black shadow-[0_0_20px_rgba(241,193,0,0.3)]"
                  : "bg-[#2a2a2a] border border-gray-700 text-[#52525b] cursor-not-allowed"
              }`}
            >
              <Play size={18} className={selectedReason ? "text-black" : "text-[#52525b]"} />
              GUARDAR Y REANUDAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
