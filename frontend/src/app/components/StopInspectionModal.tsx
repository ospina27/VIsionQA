import { AlertTriangle, X } from "lucide-react";

interface StopInspectionModalProps {
  onClose: () => void;
  onConfirm: () => void;
  totalUnits: number;
  defects: number;
  defectRate: string;
}

export function StopInspectionModal({ 
  onClose, 
  onConfirm, 
  totalUnits, 
  defects, 
  defectRate 
}: StopInspectionModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-[#1a1a1a] border-2 border-[#3b82f6] rounded-lg max-w-2xl w-full shadow-[0px_0px_40px_0px_rgba(59,130,246,0.3)]">
        {/* Header */}
        <div className="bg-[#2a2a2a] border-b-2 border-gray-800 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f59e0b]/20 border-2 border-[#f59e0b] rounded-lg flex items-center justify-center">
              <AlertTriangle size={28} className="text-[#f59e0b]" />
            </div>
            <div>
              <h2 className="text-white font-['Space_Grotesk'] font-bold text-2xl">
                CONFIRMAR FINALIZACIÓN
              </h2>
              <p className="text-[#71717a] font-['Inter'] text-sm">
                Detener inspección y generar certificación
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-6 space-y-4">
            <div className="text-[#a1a1aa] font-['Inter'] text-base leading-relaxed">
              ¿Está seguro que desea <span className="text-white font-bold">FINALIZAR la inspección del lote actual</span>?
            </div>
            
            <div className="border-t border-gray-700 pt-4 space-y-3">
              <div className="text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wider">
                Resumen de la Inspección:
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#0a0a0a] border border-gray-700 rounded p-4">
                  <div className="text-[#71717a] font-['Inter'] text-xs mb-1">
                    Unidades Inspeccionadas
                  </div>
                  <div className="text-white font-['Space_Grotesk'] font-bold text-2xl">
                    {totalUnits}
                  </div>
                </div>
                
                <div className="bg-[#0a0a0a] border border-gray-700 rounded p-4">
                  <div className="text-[#71717a] font-['Inter'] text-xs mb-1">
                    Defectos Detectados
                  </div>
                  <div className="text-[#f59e0b] font-['Space_Grotesk'] font-bold text-2xl">
                    {defects}
                  </div>
                </div>
                
                <div className="bg-[#0a0a0a] border border-gray-700 rounded p-4">
                  <div className="text-[#71717a] font-['Inter'] text-xs mb-1">
                    Tasa de Defectos
                  </div>
                  <div className="text-[#ef4444] font-['Space_Grotesk'] font-bold text-2xl">
                    {defectRate}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#3b82f6]/10 border border-[#3b82f6] rounded-lg p-4 flex items-start gap-3">
            <div className="text-[#3b82f6] font-['Inter'] text-sm leading-relaxed">
              <span className="font-bold">ACCIÓN AUTOMÁTICA:</span> Se generará el certificado de calidad ISO 2859-1 y se guardará el reporte completo en el sistema de trazabilidad.
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-[#2a2a2a] border-t-2 border-gray-800 px-8 py-6 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-['Space_Grotesk'] font-bold py-5 rounded-lg transition-colors min-h-[64px] text-lg"
          >
            CANCELAR
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-['Space_Grotesk'] font-bold py-5 rounded-lg transition-colors min-h-[64px] text-lg"
          >
            CONFIRMAR FINALIZACIÓN
          </button>
        </div>
      </div>
    </div>
  );
}
