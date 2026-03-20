import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Camera, Sun, Focus, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export function Calibracion() {
  const [luz, setLuz] = useState(0);
  const [nitidez, setNitidez] = useState(0);
  const [calibrando, setCalibrando] = useState(true);
  const [alert, setAlert] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate calibration
    const timer = setInterval(() => {
      setLuz((prev) => {
        const next = prev + Math.random() * 20;
        return next > 100 ? 100 : next;
      });
      setNitidez((prev) => {
        const next = prev + Math.random() * 15;
        return next > 100 ? 100 : next;
      });
    }, 200);

    const completeTimer = setTimeout(() => {
      setCalibrando(false);
      clearInterval(timer);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, []);

  const luzOk = luz > 85;
  const nitidezOk = nitidez > 85;
  const canStart = luzOk && nitidezOk && !calibrando;

  const handleLimpiarLente = () => {
    setAlert("Visión Comprometida. Por favor, limpie el lente con el paño de microfibra");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Alert Banner */}
      {alert && (
        <div className="bg-[#ffb020] text-black px-6 py-5 flex items-center justify-between min-h-[64px]">
          <div className="flex items-center gap-4">
            <AlertTriangle size={28} />
            <span className="font-bold text-lg">{alert}</span>
          </div>
          <button
            onClick={() => setAlert(null)}
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
            <h1 className="text-white text-5xl font-bold">
              CALIBRACIÓN DE CÁMARA
            </h1>
            <p className="text-gray-400 text-xl">
              {calibrando 
                ? "Ajustando parámetros de captura..." 
                : "Sistema listo para inspección"
              }
            </p>
          </div>

          {/* Camera Feed Simulation */}
          <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 relative flex items-center justify-center">
              {/* Crosshair Grid */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="border border-gray-700/30" />
                ))}
              </div>

              {/* Center Crosshair */}
              <div className="relative">
                <div className="w-32 h-32 border-4 border-[#ff6b6b] rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-[#ff6b6b] rounded-full" />
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-1 h-24 bg-[#ff6b6b] mb-24" />
                  <div className="w-24 h-1 bg-[#ff6b6b] -ml-12" />
                </div>
              </div>

              {/* Status Overlay */}
              {calibrando && (
                <div className="absolute top-8 left-8 bg-black/70 px-6 py-4 rounded-lg">
                  <div className="text-yellow-400 font-bold text-lg flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                    CALIBRANDO...
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Validation Indicators */}
          <div className="grid grid-cols-2 gap-8">
            {/* Luz */}
            <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Sun size={32} className={luzOk ? "text-green-500" : "text-gray-500"} />
                  <span className="text-white text-2xl font-bold">Iluminación</span>
                </div>
                {luzOk ? (
                  <CheckCircle size={32} className="text-green-500" />
                ) : (
                  <XCircle size={32} className="text-gray-600" />
                )}
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
                    className={`h-full transition-all rounded-full ${
                      luzOk ? "bg-green-500" : "bg-yellow-500"
                    }`}
                    style={{ width: `${luz}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Nitidez */}
            <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Focus size={32} className={nitidezOk ? "text-green-500" : "text-gray-500"} />
                  <span className="text-white text-2xl font-bold">Nitidez</span>
                </div>
                {nitidezOk ? (
                  <CheckCircle size={32} className="text-green-500" />
                ) : (
                  <XCircle size={32} className="text-gray-600" />
                )}
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
                    className={`h-full transition-all rounded-full ${
                      nitidezOk ? "bg-green-500" : "bg-yellow-500"
                    }`}
                    style={{ width: `${nitidez}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-6">
            <button
              onClick={handleLimpiarLente}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg py-6 text-xl transition-colors min-h-[80px]"
            >
              Reportar Problema con Lente
            </button>
            <button
              onClick={() => navigate("/inspeccion")}
              disabled={!canStart}
              className="flex-1 bg-[#ff6b6b] hover:bg-[#ff5555] text-white font-bold rounded-lg py-6 text-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[80px]"
            >
              {canStart ? "Iniciar Inspección" : "Esperando Calibración..."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}