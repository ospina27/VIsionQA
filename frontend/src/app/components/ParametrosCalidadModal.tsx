import React, { useState, useEffect } from "react";
import { ParametrosCalidad } from "../types/calidad";
import { useModal } from "../contexts/ModalContext";
import { calcularAQLMuestreo } from "../utils/aqlCalculator";
import { AlertTriangle, Info, Check, X } from "lucide-react";

interface ParametrosCalidadModalProps {
  onClose: () => void;
  onSave: (params: ParametrosCalidad) => void;
  currentParams: ParametrosCalidad;
}

export function ParametrosCalidadModal({ onClose, onSave, currentParams }: ParametrosCalidadModalProps) {
  const { showConfirm } = useModal();
  const [params, setParams] = useState<ParametrosCalidad>(currentParams);

  // Rangos de lote a mostrar
  const rangosLote = [
    { label: "51 - 90 unidades", valor: 90 },
    { label: "91 - 150 unidades", valor: 150 },
    { label: "151 - 280 unidades", valor: 280 },
    { label: "281 - 500 unidades", valor: 500 },
    { label: "501 - 1200 unidades", valor: 1200 },
    { label: "1201 - 3200 unidades", valor: 3200 },
    { label: "3201 - 10000 unidades", valor: 10000 },
  ];

  const handleSave = async () => {
    const confirm = await showConfirm({
      title: "¿CONFIRMAR CAMBIO DE PARÁMETROS?",
      message: `Está a punto de modificar el AQL al ${params.aqlPorcentaje}%. Esto cambiará automáticamente los límites de aceptación (Ac) y rechazo (Re) en todas las inspecciones futuras.`,
      detail: "Los lotes en curso NO se verán afectados. El nuevo AQL aplicará a partir del próximo lote configurado. Este cambio también se reflejará en los reportes PDF generados desde ahora.",
      type: "warning",
      confirmText: "SÍ, APLICAR CAMBIOS",
      cancelText: "REVISAR ANTES"
    });

    if (confirm) {
      onSave(params);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-white font-['Space_Grotesk'] font-bold text-2xl">Parámetros de Calidad</h2>
            <p className="text-[#a1a1aa] font-['Inter'] text-sm mt-1">Configuración global según ISO 2859-1</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 font-['Inter']">
          
          {/* SECCIÓN 1: AQL CONFIGURADO */}
          <section>
            <h3 className="text-white font-['Space_Grotesk'] font-bold text-lg mb-4">AQL — Nivel de Calidad Aceptable</h3>
            <div className="space-y-3">
              <label className="block text-[#a1a1aa] text-sm">AQL (%)</label>
              <input
                type="number"
                min="0.065"
                max="6.5"
                step="0.001"
                value={params.aqlPorcentaje}
                onChange={(e) => setParams({ ...params, aqlPorcentaje: parseFloat(e.target.value) || 0 })}
                className="w-full bg-[#0a0a0a] border border-gray-700 rounded-lg p-3 text-white font-['Liberation_Mono'] focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] outline-none"
              />
              <div className="bg-[#3b82f6]/10 border border-[#3b82f6]/30 rounded p-3 flex gap-3 text-[#d4d4d8] text-sm">
                <Info size={18} className="text-[#3b82f6] shrink-0 mt-0.5" />
                <p>
                  El valor recomendado por ISO 2859-1 para inspección de envases industriales es 1.0%. Valores más bajos son más estrictos. Valores válidos según la norma: 0.065 / 0.10 / 0.15 / 0.25 / 0.40 / 0.65 / 1.0 / 1.5 / 2.5 / 4.0 / 6.5
                </p>
              </div>
            </div>
          </section>

          {/* SECCIÓN 2: NIVEL DE INSPECCIÓN */}
          <section>
            <label className="block text-white font-['Space_Grotesk'] font-bold text-lg mb-4">Nivel de Inspección ISO 2859-1</label>
            <div className="flex gap-3">
              {(['I', 'II', 'III'] as const).map(nivel => (
                <button
                  key={nivel}
                  onClick={() => setParams({ ...params, nivelInspeccion: nivel })}
                  className={`flex-1 py-3 rounded-lg font-bold border transition-colors ${
                    params.nivelInspeccion === nivel 
                      ? "bg-[#3b82f6] border-[#3b82f6] text-white" 
                      : "bg-[#2a2a2a] border-gray-700 text-[#a1a1aa] hover:bg-[#3a3a3a]"
                  }`}
                >
                  Nivel {nivel}
                </button>
              ))}
            </div>
            <p className="text-xs text-[#71717a] mt-3">
              Nivel I: Muestra reducida (menor costo, menor confianza) • Nivel II: Estándar recomendado para uso general • Nivel III: Muestra ampliada (mayor costo, mayor confianza)
            </p>
          </section>

          {/* SECCIÓN 3: TIPO DE INSPECCIÓN */}
          <section>
            <label className="block text-white font-['Space_Grotesk'] font-bold text-lg mb-4">Tipo de Inspección</label>
            <div className="flex gap-3">
              {(['NORMAL', 'ESTRICTA', 'REDUCIDA'] as const).map(tipo => (
                <button
                  key={tipo}
                  onClick={() => setParams({ ...params, tipoInspeccion: tipo })}
                  className={`flex-1 py-3 rounded-lg font-bold border transition-colors capitalize ${
                    params.tipoInspeccion === tipo 
                      ? "bg-[#3b82f6] border-[#3b82f6] text-white" 
                      : "bg-[#2a2a2a] border-gray-700 text-[#a1a1aa] hover:bg-[#3a3a3a]"
                  }`}
                >
                  {tipo.toLowerCase()}
                </button>
              ))}
            </div>
            <p className="text-xs text-[#71717a] mt-3">
              Normal: Uso estándar. Estricta: Aplica cuando lotes anteriores fallaron. Reducida: Solo cuando el historial de calidad es excelente.
            </p>
          </section>

          {/* SECCIÓN 4: LÍMITES CALCULADOS */}
          <section>
            <h3 className="text-white font-['Space_Grotesk'] font-bold text-lg mb-1">Límites de Aceptación y Rechazo — Calculados automáticamente</h3>
            <p className="text-xs text-[#71717a] mb-4">
              Estos valores son determinados por la norma ISO 2859-1 según el AQL y el nivel de inspección. No son editables directamente.
            </p>
            
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#1e3a8a] text-white font-bold">
                  <tr>
                    <th className="px-4 py-3">Tamaño de Lote</th>
                    <th className="px-4 py-3">Código</th>
                    <th className="px-4 py-3">n (muestra)</th>
                    <th className="px-4 py-3">Ac</th>
                    <th className="px-4 py-3">Re</th>
                  </tr>
                </thead>
                <tbody className="bg-[#0a0a0a]">
                  {rangosLote.map((rango, idx) => {
                    const calc = calcularAQLMuestreo(
                      rango.valor,
                      0,
                      params.aqlPorcentaje,
                      params.nivelInspeccion
                    );
                    
                    return (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#141414]"}>
                        <td className="px-4 py-3 text-white">{rango.label}</td>
                        <td className="px-4 py-3 text-[#a1a1aa] font-['Liberation_Mono'] font-bold">{calc.codigoLetra}</td>
                        <td className="px-4 py-3 text-white font-['Liberation_Mono']">{calc.tamanoMuestra}</td>
                        <td className="px-4 py-3 text-[#10b981] font-bold font-['Liberation_Mono']">{calc.numeroAceptacion}</td>
                        <td className="px-4 py-3 text-[#ef4444] font-bold font-['Liberation_Mono']">{calc.numeroRechazo}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* SECCIÓN 5: LISTA DE PARÁMETROS QUE AFECTAN EL AQL */}
          <section>
            <h3 className="text-white font-['Space_Grotesk'] font-bold text-lg mb-4">Variables que intervienen en el cálculo</h3>
            <ul className="space-y-2 text-sm text-[#d4d4d8]">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-1.5 shrink-0" />
                <p><span className="font-bold text-white">AQL %</span> — Nivel de calidad aceptable configurado (editable arriba)</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-1.5 shrink-0" />
                <p><span className="font-bold text-white">Tamaño del lote (N)</span> — Lo ingresa el operario/analista al configurar el lote</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-1.5 shrink-0" />
                <p><span className="font-bold text-white">Nivel de inspección (I/II/III)</span> — Determina el tamaño de muestra</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-1.5 shrink-0" />
                <p><span className="font-bold text-white">Tipo de inspección (Normal/Estricta/Reducida)</span> — Ajusta los límites</p>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-1.5 shrink-0" />
                <p><span className="font-bold text-white">Tipo de organización</span> — Productor usa 100% del lote, Abastecedor usa muestra</p>
              </li>
            </ul>
          </section>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 flex justify-end gap-3 bg-[#141414] rounded-b-lg">
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white font-bold rounded-lg transition-colors font-['Space_Grotesk'] text-sm"
          >
            CANCELAR
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-3 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold rounded-lg transition-colors font-['Space_Grotesk'] text-sm"
          >
            GUARDAR PARÁMETROS
          </button>
        </div>
      </div>
    </div>
  );
}
