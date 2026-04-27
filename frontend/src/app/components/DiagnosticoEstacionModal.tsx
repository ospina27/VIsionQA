import { useState, useEffect } from "react";
import { X, Activity, Cpu, Wifi, Camera, RefreshCw, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

interface DiagnosticoEstacionModalProps {
  estacion: { id: string; modelo: string; estado: string; uptime: string; ultimaCalib: string; lotes: number };
  onClose: () => void;
}

function randomInRange(min: number, max: number) {
  return Math.round((min + Math.random() * (max - min)) * 10) / 10;
}

interface LogEntry {
  ts: string;
  level: "INFO" | "WARN" | "ERR";
  msg: string;
}

const LOGS_BASE: LogEntry[] = [
  { ts: "14:21:02", level: "INFO", msg: "YOLOv8 inference OK — 0.34ms" },
  { ts: "14:20:58", level: "INFO", msg: "Frame captured CAM_NORTE_04 — 4K" },
  { ts: "14:20:45", level: "WARN", msg: "GPU temp 78°C — within limits" },
  { ts: "14:20:30", level: "INFO", msg: "Heartbeat OK — server ping 2ms" },
  { ts: "14:19:55", level: "INFO", msg: "Model v8.2.1 loaded on GPU:0" },
  { ts: "14:19:30", level: "ERR",  msg: "Retry connection — resolved in 120ms" },
  { ts: "14:18:44", level: "INFO", msg: "Calibration verified — score 97.2%" },
  { ts: "14:17:20", level: "INFO", msg: "Batch 24 started — 0 errors" },
];

interface Metric {
  label: string;
  value: number;
  unit: string;
  max: number;
  color: string;
  warnAt: number;
  critAt: number;
}

export function DiagnosticoEstacionModal({ estacion, onClose }: DiagnosticoEstacionModalProps) {
  const isOperativo = estacion.estado === "OPERATIVO";

  const [metrics, setMetrics] = useState<Metric[]>([
    { label: "CPU", value: randomInRange(12, 35), unit: "%", max: 100, color: "#3b82f6", warnAt: 70, critAt: 90 },
    { label: "GPU", value: randomInRange(55, 80), unit: "%", max: 100, color: "#8b5cf6", warnAt: 80, critAt: 95 },
    { label: "RAM", value: randomInRange(30, 60), unit: "%", max: 100, color: "#10b981", warnAt: 75, critAt: 90 },
    { label: "GPU TEMP", value: randomInRange(65, 78), unit: "°C", max: 100, color: "#f59e0b", warnAt: 75, critAt: 90 },
  ]);
  const [latencia, setLatencia] = useState(randomInRange(1, 5));
  const [fps, setFps] = useState(randomInRange(58, 61));
  const [inferencia, setInferencia] = useState(randomInRange(0.30, 0.45));
  const [refreshing, setRefreshing] = useState(false);

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setMetrics([
        { label: "CPU", value: randomInRange(12, 35), unit: "%", max: 100, color: "#3b82f6", warnAt: 70, critAt: 90 },
        { label: "GPU", value: randomInRange(55, 80), unit: "%", max: 100, color: "#8b5cf6", warnAt: 80, critAt: 95 },
        { label: "RAM", value: randomInRange(30, 60), unit: "%", max: 100, color: "#10b981", warnAt: 75, critAt: 90 },
        { label: "GPU TEMP", value: randomInRange(65, 78), unit: "°C", max: 100, color: "#f59e0b", warnAt: 75, critAt: 90 },
      ]);
      setLatencia(randomInRange(1, 5));
      setFps(randomInRange(58, 61));
      setInferencia(randomInRange(0.30, 0.45));
      setRefreshing(false);
    }, 800);
  };

  // Auto-refresh cada 5 segundos
  useEffect(() => {
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBarColor = (m: Metric) => {
    if (m.value >= m.critAt) return "#ef4444";
    if (m.value >= m.warnAt) return "#f59e0b";
    return m.color;
  };

  const getStatusIcon = (m: Metric) => {
    if (m.value >= m.critAt) return <XCircle size={14} className="text-[#ef4444]" />;
    if (m.value >= m.warnAt) return <AlertTriangle size={14} className="text-[#f59e0b]" />;
    return <CheckCircle size={14} className="text-[#10b981]" />;
  };

  const getLevelColor = (level: LogEntry["level"]) => {
    if (level === "ERR")  return "text-[#ef4444]";
    if (level === "WARN") return "text-[#f59e0b]";
    return "text-[#52525b]";
  };

  const healthChecks = [
    { label: "Cámara principal", ok: isOperativo, detalle: isOperativo ? "CAM_NORTE_04 — activa 4K" : "Sin señal" },
    { label: "Comunicación servidor", ok: latencia < 10, detalle: `Latencia: ${latencia.toFixed(1)}ms` },
    { label: "Modelo YOLOv8", ok: isOperativo, detalle: isOperativo ? "v8.2.1 cargado en GPU" : "Modelo offline" },
    { label: "Sistema de archivos", ok: true, detalle: "Escritura logs: OK" },
  ];

  const overallHealth = healthChecks.every((h) => h.ok) && metrics.every((m) => m.value < m.critAt);

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-[150] p-4">
      <div className="bg-[#1a1a1a] border-2 border-[#3b82f6] rounded-xl max-w-2xl w-full shadow-[0_0_40px_rgba(59,130,246,0.2)] max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-[#222] border-b border-gray-800 px-6 py-5 flex items-center justify-between flex-shrink-0 rounded-t-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#3b82f6]/20 border-2 border-[#3b82f6] rounded-xl flex items-center justify-center flex-shrink-0">
              <Activity size={24} className="text-[#3b82f6]" />
            </div>
            <div>
              <h2 className="text-white font-['Space_Grotesk'] font-bold text-xl">DIAGNÓSTICO</h2>
              <p className="text-[#3b82f6] font-['Liberation_Mono'] font-bold text-sm mt-0.5">{estacion.id} — {estacion.modelo}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={refresh}
              className={`p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors ${refreshing ? "animate-spin" : ""}`}
              title="Actualizar"
            >
              <RefreshCw size={18} />
            </button>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">

          {/* Estado global */}
          <div className={`flex items-center justify-between p-4 rounded-xl border-2 ${overallHealth ? "bg-[#10b981]/10 border-[#10b981]" : "bg-[#ef4444]/10 border-[#ef4444]"}`}>
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${overallHealth ? "bg-[#10b981] animate-pulse" : "bg-[#ef4444] animate-pulse"}`} />
              <span className="text-white font-['Space_Grotesk'] font-bold">
                ESTADO GENERAL: {overallHealth ? "SALUDABLE" : "ATENCIÓN REQUERIDA"}
              </span>
            </div>
            <div className="text-[#71717a] font-['Inter'] text-xs">Uptime: {estacion.uptime}</div>
          </div>

          {/* Métricas de sistema */}
          <div>
            <h3 className="text-[#a1a1aa] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wide mb-3 flex items-center gap-2">
              <Cpu size={14} /> RECURSOS DEL SISTEMA
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((m) => (
                <div key={m.label} className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">{m.label}</span>
                    {getStatusIcon(m)}
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="font-['Space_Grotesk'] font-bold text-2xl" style={{ color: getBarColor(m) }}>
                      {m.value}
                    </span>
                    <span className="text-[#71717a] text-sm mb-0.5">{m.unit}</span>
                  </div>
                  <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(m.value, 100)}%`, backgroundColor: getBarColor(m) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Métricas de cámara e IA */}
          <div>
            <h3 className="text-[#a1a1aa] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wide mb-3 flex items-center gap-2">
              <Camera size={14} /> RENDIMIENTO CÁMARA / IA
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "FPS Captura", value: fps.toFixed(1), unit: "fps", color: "#3b82f6" },
                { label: "Inferencia", value: inferencia.toFixed(2), unit: "ms", color: "#10b981" },
                { label: "Latencia Red", value: latencia.toFixed(1), unit: "ms", color: latencia > 8 ? "#f59e0b" : "#10b981" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-4 text-center">
                  <div className="text-[#71717a] text-xs mb-1 uppercase">{stat.label}</div>
                  <div className="font-['Space_Grotesk'] font-bold text-2xl" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-[#52525b] text-xs">{stat.unit}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Health checks */}
          <div>
            <h3 className="text-[#a1a1aa] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wide mb-3 flex items-center gap-2">
              <Wifi size={14} /> CONECTIVIDAD Y SERVICIOS
            </h3>
            <div className="space-y-2">
              {healthChecks.map((h, i) => (
                <div key={i} className={`flex items-center gap-4 p-3 rounded-lg ${h.ok ? "bg-[#10b981]/5" : "bg-[#ef4444]/5"}`}>
                  {h.ok
                    ? <CheckCircle size={16} className="text-[#10b981] flex-shrink-0" />
                    : <XCircle size={16} className="text-[#ef4444] flex-shrink-0" />}
                  <span className="text-white font-['Inter'] text-sm flex-1">{h.label}</span>
                  <span className={`font-['Liberation_Mono'] text-xs ${h.ok ? "text-[#10b981]" : "text-[#ef4444]"}`}>{h.detalle}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Log de eventos */}
          <div>
            <h3 className="text-[#a1a1aa] font-['Space_Grotesk'] font-bold text-xs uppercase tracking-wide mb-3 flex items-center gap-2">
              <Activity size={14} /> LOG DE EVENTOS RECIENTES
            </h3>
            <div className="bg-[#0e0e0e] border border-gray-800 rounded-xl p-4 space-y-1.5 font-['Liberation_Mono'] text-[10px] max-h-40 overflow-y-auto">
              {LOGS_BASE.map((log, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-[#3b3b3b] flex-shrink-0">[{log.ts}]</span>
                  <span className={`flex-shrink-0 font-bold ${getLevelColor(log.level)}`}>[{log.level}]</span>
                  <span className="text-[#71717a]">{log.msg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info adicional */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Última calibración", value: estacion.ultimaCalib },
              { label: "Lotes completados hoy", value: String(estacion.lotes) },
              { label: "Modelo IA activo", value: "YOLOv8-v8.2.1" },
              { label: "Resolución", value: "4K (3840×2160)" },
            ].map((info) => (
              <div key={info.label} className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-3">
                <div className="text-[#71717a] font-['Inter'] text-xs mb-1">{info.label}</div>
                <div className="text-white font-['Space_Grotesk'] font-bold text-sm">{info.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#222] border-t border-gray-800 px-6 py-5 flex gap-3 flex-shrink-0 rounded-b-xl">
          <button
            onClick={refresh}
            className="flex-1 bg-[#2a2a2a] hover:bg-[#333] border border-gray-700 text-white font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px] flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
            ACTUALIZAR DATOS
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px]"
          >
            CERRAR
          </button>
        </div>
      </div>
    </div>
  );
}
