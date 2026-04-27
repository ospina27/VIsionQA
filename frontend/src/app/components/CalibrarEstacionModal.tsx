import { useState, useEffect } from "react";
import { X, Camera, CheckCircle, AlertTriangle, RefreshCw, Zap } from "lucide-react";

interface CalibrarEstacionModalProps {
  estacion: { id: string; modelo: string; estado: string };
  onClose: () => void;
  onCalibrado: (estacionId: string) => void;
}

type Paso = "precheck" | "calibrando" | "resultado";

interface PreCheck {
  label: string;
  ok: boolean;
  detalle: string;
}

export function CalibrarEstacionModal({ estacion, onClose, onCalibrado }: CalibrarEstacionModalProps) {
  const [paso, setPaso] = useState<Paso>("precheck");
  const [progreso, setProgreso] = useState(0);
  const [resultado, setResultado] = useState<"ok" | "error" | null>(null);
  const [cancelado, setCancelado] = useState(false);

  const preChecks: PreCheck[] = [
    { label: "Conexión cámara principal", ok: true, detalle: "CAM_NORTE_04 — 4K activa" },
    { label: "Fuente de luz uniforme", ok: true, detalle: "LED Array 6500K — OK" },
    { label: "Modelo YOLOv8 cargado", ok: true, detalle: "v8.2.1-industrial — GPU" },
    { label: "Banda transportadora detenida", ok: estacion.estado === "OPERATIVO", detalle: estacion.estado === "OPERATIVO" ? "Detenida correctamente" : "⚠ Verificar manualmente" },
    { label: "Temperatura cámara", ok: true, detalle: "42°C — dentro del rango" },
  ];

  const todosOk = preChecks.every((c) => c.ok);

  useEffect(() => {
    if (paso !== "calibrando" || cancelado) return;
    const interval = setInterval(() => {
      setProgreso((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setResultado(Math.random() > 0.1 ? "ok" : "error");
          setPaso("resultado");
          return 100;
        }
        return p + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [paso, cancelado]);

  const handleIniciarCalibracion = () => {
    setProgreso(0);
    setResultado(null);
    setCancelado(false);
    setPaso("calibrando");
  };

  const handleCancelar = () => {
    setCancelado(true);
    setPaso("precheck");
    setProgreso(0);
  };

  const handleConfirmar = () => {
    onCalibrado(estacion.id);
    onClose();
  };

  const etapas = [
    { label: "Análisis de imagen base", rango: [0, 20] },
    { label: "Ajuste de exposición", rango: [20, 40] },
    { label: "Calibración focal", rango: [40, 60] },
    { label: "Distorsión de lente", rango: [60, 80] },
    { label: "Validación final YOLOv8", rango: [80, 100] },
  ];

  const etapaActual = etapas.findIndex((e) => progreso >= e.rango[0] && progreso < e.rango[1]);

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-[150] p-4">
      <div className="bg-[#1a1a1a] border-2 border-[#8b5cf6] rounded-xl max-w-xl w-full shadow-[0_0_40px_rgba(139,92,246,0.25)] max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-[#222] border-b border-gray-800 px-6 py-5 flex items-center justify-between flex-shrink-0 rounded-t-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#8b5cf6]/20 border-2 border-[#8b5cf6] rounded-xl flex items-center justify-center flex-shrink-0">
              <Camera size={24} className="text-[#8b5cf6]" />
            </div>
            <div>
              <h2 className="text-white font-['Space_Grotesk'] font-bold text-xl">CALIBRAR ESTACIÓN</h2>
              <p className="text-[#8b5cf6] font-['Liberation_Mono'] font-bold text-sm mt-0.5">{estacion.id} — {estacion.modelo}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">

          {/* Indicador de paso */}
          <div className="flex items-center gap-2">
            {(["precheck", "calibrando", "resultado"] as Paso[]).map((p, i) => (
              <div key={p} className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-['Space_Grotesk'] font-bold transition-all ${
                  paso === p
                    ? "bg-[#8b5cf6] text-white"
                    : (["precheck", "calibrando", "resultado"] as Paso[]).indexOf(paso) > i
                    ? "bg-[#8b5cf6]/30 text-[#8b5cf6]"
                    : "bg-[#2a2a2a] text-[#52525b]"
                }`}>
                  {i + 1}. {p === "precheck" ? "PRE-CHECK" : p === "calibrando" ? "CALIBRACIÓN" : "RESULTADO"}
                </div>
                {i < 2 && <div className={`h-0.5 w-6 ${(["precheck", "calibrando", "resultado"] as Paso[]).indexOf(paso) > i ? "bg-[#8b5cf6]" : "bg-[#2a2a2a]"}`} />}
              </div>
            ))}
          </div>

          {/* PASO 1: Pre-check */}
          {paso === "precheck" && (
            <div className="space-y-3">
              <h3 className="text-[#a1a1aa] font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wide">
                Verificación de condiciones previas
              </h3>
              {preChecks.map((check, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border ${check.ok ? "bg-[#10b981]/5 border-[#10b981]/30" : "bg-[#f59e0b]/5 border-[#f59e0b]/30"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${check.ok ? "bg-[#10b981]/20" : "bg-[#f59e0b]/20"}`}>
                    {check.ok
                      ? <CheckCircle size={18} className="text-[#10b981]" />
                      : <AlertTriangle size={18} className="text-[#f59e0b]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-['Space_Grotesk'] font-bold text-sm">{check.label}</div>
                    <div className={`font-['Inter'] text-xs mt-0.5 ${check.ok ? "text-[#10b981]" : "text-[#f59e0b]"}`}>{check.detalle}</div>
                  </div>
                </div>
              ))}

              {!todosOk && (
                <div className="bg-[#f59e0b]/10 border border-[#f59e0b]/40 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle size={18} className="text-[#f59e0b] flex-shrink-0 mt-0.5" />
                  <p className="text-[#d4d4d8] font-['Inter'] text-sm">Resuelva las advertencias antes de calibrar para garantizar resultados óptimos.</p>
                </div>
              )}
            </div>
          )}

          {/* PASO 2: Calibrando */}
          {paso === "calibrando" && (
            <div className="space-y-6">
              {/* Progreso principal */}
              <div className="bg-[#2a2a2a] border border-[#8b5cf6]/30 rounded-xl p-6 text-center">
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#27272a" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke="#8b5cf6" strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${progreso * 2.638} ${264 - progreso * 2.638}`}
                      className="transition-all duration-100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-['Space_Grotesk'] font-bold text-2xl">{progreso}%</span>
                  </div>
                </div>
                <div className="text-[#8b5cf6] font-['Space_Grotesk'] font-bold animate-pulse">CALIBRANDO...</div>
                <div className="text-[#71717a] font-['Inter'] text-xs mt-1">
                  {etapaActual >= 0 ? etapas[etapaActual].label : "Validación final YOLOv8"}
                </div>
              </div>

              {/* Etapas */}
              <div className="space-y-2">
                {etapas.map((e, i) => {
                  const completada = progreso >= e.rango[1];
                  const activa = progreso >= e.rango[0] && progreso < e.rango[1];
                  return (
                    <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activa ? "bg-[#8b5cf6]/15 border border-[#8b5cf6]/30" : completada ? "bg-[#10b981]/5" : "opacity-40"}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${completada ? "bg-[#10b981]" : activa ? "bg-[#8b5cf6] animate-pulse" : "bg-[#2a2a2a] border border-gray-700"}`}>
                        {completada && <CheckCircle size={12} className="text-white" />}
                        {activa && <RefreshCw size={10} className="text-white animate-spin" />}
                      </div>
                      <span className={`font-['Inter'] text-sm ${completada ? "text-[#10b981]" : activa ? "text-white" : "text-[#52525b]"}`}>{e.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PASO 3: Resultado */}
          {paso === "resultado" && (
            <div className="space-y-5">
              <div className={`rounded-xl border-2 p-8 text-center ${resultado === "ok" ? "bg-[#10b981]/10 border-[#10b981]" : "bg-[#ef4444]/10 border-[#ef4444]"}`}>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${resultado === "ok" ? "bg-[#10b981]/20" : "bg-[#ef4444]/20"}`}>
                  {resultado === "ok"
                    ? <CheckCircle size={44} className="text-[#10b981]" />
                    : <AlertTriangle size={44} className="text-[#ef4444]" />}
                </div>
                <div className={`font-['Space_Grotesk'] font-bold text-2xl mb-2 ${resultado === "ok" ? "text-[#10b981]" : "text-[#ef4444]"}`}>
                  {resultado === "ok" ? "CALIBRACIÓN EXITOSA" : "CALIBRACIÓN FALLIDA"}
                </div>
                <div className="text-[#a1a1aa] font-['Inter'] text-sm">
                  {resultado === "ok"
                    ? `${estacion.id} calibrada correctamente. Próxima calibración recomendada en 8 horas.`
                    : "Error en validación de lente. Contacte al técnico de mantenimiento."}
                </div>
              </div>

              {resultado === "ok" && (
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Nitidez", value: `${(94 + Math.random() * 5).toFixed(1)}%`, color: "text-[#10b981]" },
                    { label: "Distorsión", value: `${(0.1 + Math.random() * 0.3).toFixed(2)}%`, color: "text-[#3b82f6]" },
                    { label: "Score IA", value: `${(97 + Math.random() * 2).toFixed(1)}%`, color: "text-[#8b5cf6]" },
                  ].map((m) => (
                    <div key={m.label} className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-4 text-center">
                      <div className="text-[#71717a] text-xs mb-1 uppercase">{m.label}</div>
                      <div className={`font-['Space_Grotesk'] font-bold text-xl ${m.color}`}>{m.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {resultado === "error" && (
                <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-5">
                  <div className="text-[#ef4444] font-['Space_Grotesk'] font-bold text-sm mb-3">LOG DE ERROR</div>
                  <div className="text-[#52525b] font-['Liberation_Mono'] text-[10px] space-y-1">
                    <div><span className="text-[#3b3b3b]">[ERR-4401]</span> Lens distortion exceed threshold (2.1%)</div>
                    <div><span className="text-[#3b3b3b]">[ERR-4402]</span> YOLOv8 confidence score below 90%</div>
                    <div><span className="text-[#3b3b3b]">[INFO]</span> Reattempting calibration sequence...</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#222] border-t border-gray-800 px-6 py-5 flex gap-3 flex-shrink-0 rounded-b-xl">
          {paso === "precheck" && (
            <>
              <button onClick={onClose} className="flex-1 bg-[#2a2a2a] hover:bg-[#333] border border-gray-700 text-white font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px]">
                CANCELAR
              </button>
              <button
                onClick={handleIniciarCalibracion}
                className="flex-1 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px] flex items-center justify-center gap-2"
              >
                <Zap size={20} />
                INICIAR CALIBRACIÓN
              </button>
            </>
          )}
          {paso === "calibrando" && (
            <button onClick={handleCancelar} className="flex-1 bg-[#2a2a2a] hover:bg-[#3a2020] border border-[#ef4444]/30 text-[#ef4444] font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px]">
              CANCELAR CALIBRACIÓN
            </button>
          )}
          {paso === "resultado" && (
            <>
              {resultado === "error" && (
                <button onClick={handleIniciarCalibracion} className="flex-1 bg-[#2a2a2a] hover:bg-[#333] border border-gray-700 text-white font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px] flex items-center justify-center gap-2">
                  <RefreshCw size={18} /> REINTENTAR
                </button>
              )}
              <button
                onClick={resultado === "ok" ? handleConfirmar : onClose}
                className={`flex-1 text-white font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px] flex items-center justify-center gap-2 ${resultado === "ok" ? "bg-[#10b981] hover:bg-[#059669]" : "bg-[#2a2a2a] hover:bg-[#333] border border-gray-700"}`}
              >
                {resultado === "ok" ? <><CheckCircle size={20} /> CONFIRMAR Y CERRAR</> : "CERRAR"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
