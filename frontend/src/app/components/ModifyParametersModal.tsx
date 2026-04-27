import { X, Save, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useModal } from "../contexts/ModalContext";

interface ModifyParametersModalProps {
  onClose: () => void;
  onSave: (params: { aql: number; rechazo: number; advertencia: number }) => void;
}

export function ModifyParametersModal({ onClose, onSave }: ModifyParametersModalProps) {
  const [aql, setAql] = useState(1.0);
  const [rechazo, setRechazo] = useState(2.5);
  const [advertencia, setAdvertencia] = useState(1.0);
  const { showAlert } = useModal();

  const handleSave = async () => {
    onSave({ aql, rechazo, advertencia });
    await showAlert({
      title: "PARÁMETROS ACTUALIZADOS",
      message: "Los cambios se aplicarán a todas las estaciones VisionQA activas.",
      detail: `AQL Establecido: ${aql}%\nUmbral de Advertencia: ${advertencia}%\nUmbral de Rechazo Automático: ${rechazo}%`,
      type: "success",
      confirmText: "ENTENDIDO",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-8">
      <div className="bg-[#0e0e0e] max-w-4xl w-full rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#1a1a1a] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-[#8b5cf6]" />
            <div>
              <h2 className="text-white font-['Space_Grotesk'] font-bold text-xl">
                MODIFICAR PARÁMETROS DE CALIDAD
              </h2>
              <div className="text-[#71717a] font-['Inter'] text-xs mt-1">
                ISO 2859-1 // NIVEL DE INSPECCIÓN II
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
          {/* Warning Banner */}
          <div className="bg-gradient-to-r from-[#f59e0b]/20 to-[#ef4444]/20 border-l-4 border-[#f59e0b] rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertTriangle size={24} className="text-[#f59e0b] flex-shrink-0" />
            <div className="text-[#d4d4d8] font-['Inter'] text-sm">
              <strong>ATENCIÓN:</strong> Los cambios en estos parámetros afectan el criterio de aprobación/rechazo de lotes.
              Solo personal autorizado debe modificar estos valores.
            </div>
          </div>

          {/* Parameters Form */}
          <div className="space-y-6">
            {/* AQL */}
            <div>
              <label className="block text-[#71717a] font-['Space_Grotesk'] font-bold text-sm uppercase mb-3">
                AQL (Acceptable Quality Limit)
              </label>
              <div className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.1"
                    value={aql}
                    onChange={(e) => setAql(parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#8b5cf6]"
                  />
                  <div className="bg-[#8b5cf6] text-white font-['Space_Grotesk'] font-bold text-2xl px-6 py-3 rounded min-w-[120px] text-center">
                    {aql.toFixed(1)}%
                  </div>
                </div>
                <div className="text-[#a1a1aa] font-['Inter'] text-sm">
                  Nivel máximo aceptable de defectos para aprobar un lote según ISO 2859-1
                </div>
              </div>
            </div>

            {/* Umbral de Advertencia */}
            <div>
              <label className="block text-[#71717a] font-['Space_Grotesk'] font-bold text-sm uppercase mb-3">
                Umbral de Advertencia (Luz Amarilla)
              </label>
              <div className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.1"
                    value={advertencia}
                    onChange={(e) => setAdvertencia(parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#f1c100]"
                  />
                  <div className="bg-[#f1c100] text-black font-['Space_Grotesk'] font-bold text-2xl px-6 py-3 rounded min-w-[120px] text-center">
                    {advertencia.toFixed(1)}%
                  </div>
                </div>
                <div className="text-[#a1a1aa] font-['Inter'] text-sm">
                  Tasa de defectos que activa la luz amarilla del semáforo
                </div>
              </div>
            </div>

            {/* Umbral de Rechazo */}
            <div>
              <label className="block text-[#71717a] font-['Space_Grotesk'] font-bold text-sm uppercase mb-3">
                Umbral de Rechazo Automático (Luz Roja)
              </label>
              <div className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <input
                    type="range"
                    min="1.0"
                    max="10.0"
                    step="0.1"
                    value={rechazo}
                    onChange={(e) => setRechazo(parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#ef4444]"
                  />
                  <div className="bg-[#ef4444] text-white font-['Space_Grotesk'] font-bold text-2xl px-6 py-3 rounded min-w-[120px] text-center">
                    {rechazo.toFixed(1)}%
                  </div>
                </div>
                <div className="text-[#a1a1aa] font-['Inter'] text-sm">
                  Tasa de defectos que activa rechazo automático del lote
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 rounded transition-colors uppercase tracking-wider"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold py-4 rounded transition-colors flex items-center justify-center gap-3 uppercase tracking-wider"
            >
              <Save size={20} />
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}