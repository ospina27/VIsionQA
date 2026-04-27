import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Camera, Sun, Focus, CheckCircle, XCircle, AlertTriangle, RotateCcw } from "lucide-react";
import { useInspectionFlow } from "../contexts/InspectionFlowContext";
import { useModal } from "../contexts/ModalContext";
import { useAuth } from "../contexts/AuthContext";

export function Calibracion() {
  const [luz, setLuz] = useState(0);
  const [nitidez, setNitidez] = useState(0);
  const [calibrando, setCalibrando] = useState(true);
  const [inlineAlert, setInlineAlert] = useState<string | null>(null);
  const [intentos, setIntentos] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const { completeCalibration, loteData } = useInspectionFlow();
  const { showAlert, showConfirm } = useModal();
  const { isProductor } = useAuth();

  const runCalibration = () => {
    setLuz(0);
    setNitidez(0);
    setCalibrando(true);
    setInlineAlert(null);

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    intervalRef.current = setInterval(() => {
      setLuz((prev) => Math.min(prev + Math.random() * 20, 100));
      setNitidez((prev) => Math.min(prev + Math.random() * 15, 100));
    }, 200);

    timeoutRef.current = setTimeout(() => {
      setCalibrando(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }, 3000);
  };

  useEffect(() => {
    runCalibration();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const luzOk = luz > 85;
  const nitidezOk = nitidez > 85;
  const canStart = luzOk && nitidezOk && !calibrando;
  const calibracionFallida = !calibrando && !canStart;

  const handleLimpiarLente = () => {
    setInlineAlert("Visión Comprometida. Por favor, limpie el lente con el paño de microfibra.");
  };

  const handleRecalibrar = async () => {
    const ok = await showConfirm({
      title: "🔄 RECALIBRAR CÁMARA",
      message: "Se reiniciará el proceso de calibración automática.",
      detail: "Asegúrese de que las condiciones de iluminación sean correctas y que el lente esté limpio antes de reintentar.",
      type: "warning",
      confirmText: "SÍ, RECALIBRAR",
      cancelText: "CANCELAR",
    });
    if (!ok) return;
    setIntentos((prev) => prev + 1);
    runCalibration();
  };

  const handleIniciarInspeccion = async () => {
    if (calibrando) {
      await showAlert({
        title: "CALIBRACIÓN EN PROCESO",
        message: "Espere a que finalice la calibración automática antes de continuar.",
        type: "warning",
      });
      return;
    }
    if (!luzOk) {
      await showAlert({
        title: "CALIBRACIÓN INCOMPLETA",
        message: "El nivel de iluminación es insuficiente. No se puede iniciar la inspección.",
        detail: `Nivel actual: ${luz.toFixed(0)}% — Mínimo requerido: 85%. Verifique las condiciones de iluminación de la estación.`,
        type: "error",
      });
      return;
    }
    if (!nitidezOk) {
      await showAlert({
        title: "CALIBRACIÓN INCOMPLETA",
        message: "La nitidez de la cámara es insuficiente. No se puede iniciar la inspección.",
        detail: `Nitidez actual: ${nitidez.toFixed(0)}% — Mínimo requerido: 85%. Limpie el lente y reintente la calibración.`,
        type: "error",
      });
      return;
    }
    completeCalibration();
    navigate("/pre-inspeccion");
  };

  const handleCancelar = async () => {
    const ok = await showConfirm({
      title: "¿CANCELAR CALIBRACIÓN?",
      message: "Esto lo regresará a la configuración del lote. Los datos de calibración se perderán.",
      type: "warning",
      confirmText: "SÍ, CANCELAR",
      cancelText: "CONTINUAR CALIBRANDO",
    });
    if (ok) navigate("/setup");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Alert Banner inline */}
      {inlineAlert && (
        <div className="bg-[#ffb020] text-black px-6 py-5 flex items-center justify-between min-h-[64px]">
          <div className="flex items-center gap-4">
            <AlertTriangle size={28} />
            <span className="font-bold text-lg">{inlineAlert}</span>
          </div>
          <button
            onClick={() => setInlineAlert(null)}
            className="px-6 py-3 bg-black/20 hover:bg-black/30 rounded font-bold transition-colors"
          >
            Entendido
          </button>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-6xl w-full space-y-10">
          {/* Header */}
          <div className="text-center space-y-4">
            <Camera size={56} className="text-[#ff6b6b] mx-auto" />
            <h1 className="text-white text-5xl font-bold">CALIBRACIÓN DE CÁMARA</h1>
            <p className="text-gray-400 text-xl">
              {calibrando ? "Ajustando parámetros de captura..." : canStart ? "Sistema listo para inspección" : "Calibración insuficiente — reintente"}
            </p>
            {intentos > 0 && (
              <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#f59e0b]/40 px-4 py-2 rounded-lg">
                <RotateCcw size={14} className="text-[#f59e0b]" />
                <span className="text-[#f59e0b] font-['Space_Grotesk'] text-sm font-bold">
                  Intento #{intentos + 1}
                </span>
              </div>
            )}
            {loteData && (
              <div className="inline-block bg-[#1a1a1a] border border-gray-700 px-6 py-3 rounded-lg">
                <p className="text-[#3b82f6] font-['Space_Grotesk'] font-bold">
                  LOTE: {loteData.numeroLote}
                </p>
                <p className="text-[#a1a1aa] font-['Inter'] text-sm mt-1">
                  {!isProductor() && `${loteData.proveedor} • `}{loteData.formato}
                </p>
              </div>
            )}
          </div>

          {/* Camera Feed Simulation */}
          <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 relative flex items-center justify-center">
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="border border-gray-700/30" />
                ))}
              </div>
              <div className="relative">
                <div className={`w-32 h-32 border-4 rounded-full flex items-center justify-center transition-colors ${calibracionFallida ? "border-[#ef4444]" : canStart ? "border-[#10b981]" : "border-[#ff6b6b]"}`}>
                  <div className={`w-16 h-16 border-2 rounded-full transition-colors ${calibracionFallida ? "border-[#ef4444]" : canStart ? "border-[#10b981]" : "border-[#ff6b6b]"}`} />
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className={`w-1 h-24 mb-24 transition-colors ${calibracionFallida ? "bg-[#ef4444]" : canStart ? "bg-[#10b981]" : "bg-[#ff6b6b]"}`} />
                  <div className={`w-24 h-1 -ml-12 transition-colors ${calibracionFallida ? "bg-[#ef4444]" : canStart ? "bg-[#10b981]" : "bg-[#ff6b6b]"}`} />
                </div>
              </div>
              {calibrando && (
                <div className="absolute top-8 left-8 bg-black/70 px-6 py-4 rounded-lg">
                  <div className="text-yellow-400 font-bold text-lg flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                    CALIBRANDO...
                  </div>
                </div>
              )}
              {calibracionFallida && (
                <div className="absolute top-8 left-8 bg-black/70 px-6 py-4 rounded-lg">
                  <div className="text-[#ef4444] font-bold text-lg flex items-center gap-2">
                    <XCircle size={18} />
                    CALIBRACIÓN FALLIDA
                  </div>
                </div>
              )}
              {canStart && (
                <div className="absolute top-8 left-8 bg-black/70 px-6 py-4 rounded-lg">
                  <div className="text-[#10b981] font-bold text-lg flex items-center gap-2">
                    <CheckCircle size={18} />
                    CALIBRACIÓN OK
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Indicadores */}
          <div className="grid grid-cols-2 gap-8">
            {/* Luz */}
            <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Sun size={32} className={luzOk ? "text-green-500" : "text-gray-500"} />
                  <span className="text-white text-2xl font-bold">Iluminación</span>
                </div>
                {luzOk ? <CheckCircle size={32} className="text-green-500" /> : <XCircle size={32} className="text-gray-600" />}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-400">Nivel de Luz</span>
                  <span className={`font-bold ${luzOk ? "text-green-500" : "text-yellow-500"}`}>
                    {luz.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full transition-all rounded-full ${luzOk ? "bg-green-500" : "bg-yellow-500"}`}
                    style={{ width: `${luz}%` }}
                  />
                </div>
                <div className="text-sm text-gray-500 text-center mt-2">Mínimo requerido: 85%</div>
              </div>
            </div>

            {/* Nitidez */}
            <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Focus size={32} className={nitidezOk ? "text-green-500" : "text-gray-500"} />
                  <span className="text-white text-2xl font-bold">Nitidez</span>
                </div>
                {nitidezOk ? <CheckCircle size={32} className="text-green-500" /> : <XCircle size={32} className="text-gray-600" />}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-400">Calidad de Enfoque</span>
                  <span className={`font-bold ${nitidezOk ? "text-green-500" : "text-yellow-500"}`}>
                    {nitidez.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                  <div
                    className={`h-full transition-all rounded-full ${nitidezOk ? "bg-green-500" : "bg-yellow-500"}`}
                    style={{ width: `${nitidez}%` }}
                  />
                </div>
                <div className="text-sm text-gray-500 text-center mt-2">Mínimo requerido: 85%</div>
              </div>
            </div>
          </div>

          {/* Estado de validación — calibración fallida */}
          {calibracionFallida && (
            <div className="bg-[#ef4444]/10 border-2 border-[#ef4444] rounded-lg p-6 flex items-start gap-4">
              <AlertTriangle size={32} className="text-[#ef4444] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-[#ef4444] font-['Space_Grotesk'] font-bold text-xl mb-2">
                  CALIBRACIÓN INSUFICIENTE
                </h3>
                <p className="text-[#d4d4d8] font-['Inter'] mb-3">
                  Los parámetros no cumplen los requisitos mínimos (85% en ambos indicadores).
                  Verifique las condiciones de iluminación y limpie el lente antes de reintentar.
                </p>
                <div className="flex gap-3 flex-wrap text-sm">
                  {!luzOk && (
                    <span className="bg-[#ef4444]/20 border border-[#ef4444]/40 text-[#ef4444] px-3 py-1 rounded font-['Space_Grotesk'] font-bold">
                      ✗ Iluminación: {luz.toFixed(0)}% / 85%
                    </span>
                  )}
                  {!nitidezOk && (
                    <span className="bg-[#ef4444]/20 border border-[#ef4444]/40 text-[#ef4444] px-3 py-1 rounded font-['Space_Grotesk'] font-bold">
                      ✗ Nitidez: {nitidez.toFixed(0)}% / 85%
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Acciones */}
          <div className="flex gap-6">
            <button
              onClick={handleCancelar}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg py-6 text-xl transition-colors min-h-[80px]"
            >
              Cancelar
            </button>
            <button
              onClick={handleLimpiarLente}
              className="flex-1 bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold rounded-lg py-6 text-xl transition-colors min-h-[80px]"
            >
              Reportar Problema con Lente
            </button>

            {/* Botón RECALIBRAR — solo visible cuando la calibración falló */}
            {calibracionFallida && (
              <button
                onClick={handleRecalibrar}
                className="flex-1 bg-[#1d4ed8] hover:bg-[#1e40af] active:bg-[#1e3a8a] text-white font-['Space_Grotesk'] font-bold rounded-lg py-6 text-xl transition-colors min-h-[80px] flex items-center justify-center gap-3 border-2 border-[#3b82f6] shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                <RotateCcw size={26} />
                RECALIBRAR
              </button>
            )}

            <button
              onClick={handleIniciarInspeccion}
              disabled={!canStart}
              className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white font-bold rounded-lg py-6 text-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[80px]"
            >
              {canStart ? "Continuar a Criterios de Análisis" : calibrando ? "Calibrando..." : "Calibración Insuficiente"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}