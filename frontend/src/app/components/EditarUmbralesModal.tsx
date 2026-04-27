import { useState } from "react";
import { X, Camera, WifiOff, AlertTriangle, Clock } from "lucide-react";
import { ConfiguracionSistema } from "../types/calidad";
import { toast } from "sonner";

interface EditarUmbralesModalProps {
  currentConfig: ConfiguracionSistema;
  onSave: (partial: Partial<ConfiguracionSistema>) => void;
  onClose: () => void;
}

export function EditarUmbralesModal({ currentConfig, onSave, onClose }: EditarUmbralesModalProps) {
  const [form, setForm] = useState({
    umbralLenteSucio: currentConfig.umbralLenteSucio,
    umbralFalloRed: currentConfig.umbralFalloRed,
    umbralLoteCritico: currentConfig.umbralLoteCritico,
    tiempoLimiteRespuestaAlerta: currentConfig.tiempoLimiteRespuestaAlerta,
  });

  const handleChange = (field: keyof typeof form, value: number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(form);
    toast.success("Umbrales actualizados — Aplicados en todas las estaciones", {
      duration: 2000,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-[150] p-4">
      <div className="bg-[#1a1a1a] border-2 border-[#8b5cf6] rounded-xl max-w-4xl w-full shadow-[0_0_40px_rgba(139,92,246,0.25)] max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-[#222] border-b border-gray-800 px-6 py-5 flex items-center justify-between flex-shrink-0 rounded-t-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#8b5cf6]/20 border-2 border-[#8b5cf6] rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={24} className="text-[#8b5cf6]" />
            </div>
            <div>
              <h2 className="text-white font-['Space_Grotesk'] font-bold text-xl uppercase">Configuración de Alertas y Umbrales</h2>
              <p className="text-[#71717a] font-['Inter'] text-xs mt-0.5">Estos parámetros se aplican en tiempo real a todas las estaciones activas.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* TARJETA 1 */}
          <div className="bg-[#2a2a2a] border border-[#f59e0b]/30 rounded-xl p-5 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <Camera size={20} className="text-[#f59e0b]" />
              <h3 className="text-white font-['Space_Grotesk'] font-bold uppercase">Umbral — Lente Sucio</h3>
            </div>
            <p className="text-[#a1a1aa] font-['Inter'] text-sm mb-4 min-h-[40px]">
              Tiempo máximo sin detectar envases antes de asumir que el lente está sucio y disparar la alerta.
            </p>
            <div className="mt-auto">
              <label className="block text-[#a1a1aa] font-['Inter'] text-xs mb-2 uppercase tracking-wide">
                Segundos
              </label>
              <input
                type="number"
                min={5}
                max={120}
                step={5}
                value={form.umbralLenteSucio}
                onChange={(e) => handleChange("umbralLenteSucio", parseFloat(e.target.value) || 0)}
                className="w-full bg-[#1a1a1a] border border-gray-700 hover:border-gray-500 focus:border-[#8b5cf6] text-white font-['Liberation_Mono'] font-bold text-lg rounded-lg px-4 py-3 outline-none transition-colors mb-3"
              />
              <p className="text-xs text-[#71717a] font-['Inter']">
                Rango recomendado: 20–45 segundos. Valores muy bajos generan falsas alarmas. Valores muy altos retrasan la detección.
              </p>
            </div>
          </div>

          {/* TARJETA 2 */}
          <div className="bg-[#2a2a2a] border border-[#ef4444]/30 rounded-xl p-5 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <WifiOff size={20} className="text-[#ef4444]" />
              <h3 className="text-white font-['Space_Grotesk'] font-bold uppercase">Umbral — Fallo de Red</h3>
            </div>
            <p className="text-[#a1a1aa] font-['Inter'] text-sm mb-4 min-h-[40px]">
              Tiempo máximo de pérdida de conexión antes de activar el modo offline y notificar al administrador.
            </p>
            <div className="mt-auto">
              <label className="block text-[#a1a1aa] font-['Inter'] text-xs mb-2 uppercase tracking-wide">
                Segundos
              </label>
              <input
                type="number"
                min={5}
                max={60}
                step={5}
                value={form.umbralFalloRed}
                onChange={(e) => handleChange("umbralFalloRed", parseFloat(e.target.value) || 0)}
                className="w-full bg-[#1a1a1a] border border-gray-700 hover:border-gray-500 focus:border-[#8b5cf6] text-white font-['Liberation_Mono'] font-bold text-lg rounded-lg px-4 py-3 outline-none transition-colors mb-3"
              />
              <p className="text-xs text-[#71717a] font-['Inter']">
                Rango recomendado: 10–20 segundos. La inspección continúa en modo offline. Este umbral controla cuándo se genera la alerta.
              </p>
            </div>
          </div>

          {/* TARJETA 3 */}
          <div className="bg-[#2a2a2a] border border-[#ef4444]/30 rounded-xl p-5 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle size={20} className="text-[#ef4444]" />
              <h3 className="text-white font-['Space_Grotesk'] font-bold uppercase">Umbral — Lote Crítico</h3>
            </div>
            <p className="text-[#a1a1aa] font-['Inter'] text-sm mb-4 min-h-[40px]">
              Porcentaje de defectos en tiempo real que activa la alerta de UMBRAL CRÍTICO SUPERADO en el dashboard.
            </p>
            <div className="mt-auto">
              <label className="block text-[#a1a1aa] font-['Inter'] text-xs mb-2 uppercase tracking-wide">
                % de defectos
              </label>
              <input
                type="number"
                min={0.5}
                max={10}
                step={0.5}
                value={form.umbralLoteCritico}
                onChange={(e) => handleChange("umbralLoteCritico", parseFloat(e.target.value) || 0)}
                className="w-full bg-[#1a1a1a] border border-gray-700 hover:border-gray-500 focus:border-[#8b5cf6] text-white font-['Liberation_Mono'] font-bold text-lg rounded-lg px-4 py-3 outline-none transition-colors mb-3"
              />
              <p className="text-xs text-[#71717a] font-['Inter']">
                Este umbral es independiente del AQL. Se recomienda configurarlo igual o por encima del AQL para evitar falsas paradas. Valor actual AQL: {currentConfig.aqlPorcentaje}%
              </p>
            </div>
          </div>

          {/* TARJETA 4 */}
          <div className="bg-[#2a2a2a] border border-[#8b5cf6]/30 rounded-xl p-5 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <Clock size={20} className="text-[#8b5cf6]" />
              <h3 className="text-white font-['Space_Grotesk'] font-bold uppercase">Tiempo Límite de Respuesta</h3>
            </div>
            <p className="text-[#a1a1aa] font-['Inter'] text-sm mb-4 min-h-[40px]">
              Tiempo máximo que tiene el operario o analista para resolver una alerta antes de que escale a CRÍTICA en el panel del administrador.
            </p>
            <div className="mt-auto">
              <label className="block text-[#a1a1aa] font-['Inter'] text-xs mb-2 uppercase tracking-wide">
                Minutos
              </label>
              <input
                type="number"
                min={1}
                max={60}
                step={1}
                value={form.tiempoLimiteRespuestaAlerta}
                onChange={(e) => handleChange("tiempoLimiteRespuestaAlerta", parseFloat(e.target.value) || 0)}
                className="w-full bg-[#1a1a1a] border border-gray-700 hover:border-gray-500 focus:border-[#8b5cf6] text-white font-['Liberation_Mono'] font-bold text-lg rounded-lg px-4 py-3 outline-none transition-colors mb-3"
              />
              <div className="bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 rounded p-3 text-[#d4d4d8] font-['Inter'] text-xs leading-relaxed">
                ⏱ Cuando una alerta lleva más de este tiempo sin resolverse, cambia automáticamente a estado CRÍTICA en el panel de alertas y se resalta en rojo para que el administrador actúe directamente.
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#222] border-t border-gray-800 px-6 py-5 flex gap-3 flex-shrink-0 rounded-b-xl">
          <button
            onClick={onClose}
            className="flex-1 bg-[#2a2a2a] hover:bg-[#333] border border-gray-700 text-white font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px]"
          >
            CANCELAR
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px]"
          >
            APLICAR UMBRALES
          </button>
        </div>
      </div>
    </div>
  );
}
