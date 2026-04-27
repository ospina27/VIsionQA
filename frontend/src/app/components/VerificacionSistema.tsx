import { useState, useEffect, useCallback } from "react";
import {
  Wifi, Camera, Brain, HardDrive, Cpu,
  CheckCircle, XCircle, AlertTriangle, RefreshCw, Loader,
  ShieldCheck, Monitor, Clock,
} from "lucide-react";

type CheckStatus = "pending" | "checking" | "ok" | "warning" | "error";

interface SystemCheck {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  status: CheckStatus;
  detail: string;
  value?: string;
  required: boolean;
}

const initialChecks: SystemCheck[] = [
  {
    id: "red",
    label: "Conectividad de Red",
    sublabel: "Latencia y estabilidad de conexión",
    icon: Wifi,
    status: "pending",
    detail: "Verificando...",
    required: true,
  },
  {
    id: "camara",
    label: "Cámara de Inspección",
    sublabel: "Dispositivo de captura disponible",
    icon: Camera,
    status: "pending",
    detail: "Verificando...",
    required: true,
  },
  {
    id: "ia",
    label: "Modelo IA (YOLOv8)",
    sublabel: "Motor de detección de defectos",
    icon: Brain,
    status: "pending",
    detail: "Verificando...",
    required: true,
  },
  {
    id: "almacenamiento",
    label: "Almacenamiento Local",
    sublabel: "Espacio para registros y evidencias",
    icon: HardDrive,
    status: "pending",
    detail: "Verificando...",
    required: false,
  },
  {
    id: "rendimiento",
    label: "Rendimiento del Sistema",
    sublabel: "CPU y memoria disponibles",
    icon: Cpu,
    status: "pending",
    detail: "Verificando...",
    required: false,
  },
  {
    id: "permisos",
    label: "Permisos del Navegador",
    sublabel: "Acceso a cámara y notificaciones",
    icon: ShieldCheck,
    status: "pending",
    detail: "Verificando...",
    required: true,
  },
  {
    id: "latencia",
    label: "Latencia al Servidor",
    sublabel: "Tiempo de respuesta del backend",
    icon: Clock,
    status: "pending",
    detail: "Verificando...",
    required: false,
  },
];

// ── Simulate async checks ──────────────────────────────────────────────────

async function checkRed(): Promise<Partial<SystemCheck>> {
  await new Promise((r) => setTimeout(r, 700));
  const online = navigator.onLine;
  const latency = Math.floor(Math.random() * 60 + 8);
  if (!online) return { status: "error", detail: "Sin conexión a la red. Verifique el cable o Wi-Fi.", value: "OFFLINE" };
  if (latency > 50) return { status: "warning", detail: `Latencia elevada: ${latency} ms. La inspección puede verse afectada.`, value: `${latency} ms` };
  return { status: "ok", detail: `Red estable. Latencia: ${latency} ms`, value: `${latency} ms` };
}

async function checkCamara(): Promise<Partial<SystemCheck>> {
  await new Promise((r) => setTimeout(r, 1100));
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((d) => d.kind === "videoinput");
    if (cameras.length === 0)
      return { status: "error", detail: "No se detectaron cámaras. Conecte el dispositivo de inspección.", value: "0 cámaras" };
    return { status: "ok", detail: `${cameras.length} cámara(s) detectada(s). Dispositivo listo.`, value: `${cameras.length} disp.` };
  } catch {
    return { status: "warning", detail: "No se pudo enumerar dispositivos. Puede requerirse permiso de cámara.", value: "?" };
  }
}

async function checkIA(): Promise<Partial<SystemCheck>> {
  await new Promise((r) => setTimeout(r, 1800));
  const modelLoaded = Math.random() > 0.08; // 92% chance OK
  if (!modelLoaded)
    return { status: "error", detail: "El modelo YOLOv8 no responde. Reinicie el servicio de inferencia.", value: "OFFLINE" };
  const confidence = (Math.random() * 5 + 94).toFixed(1);
  return { status: "ok", detail: `Modelo YOLOv8 activo. Confianza: ${confidence}%. Inferencia lista.`, value: `${confidence}%` };
}

async function checkAlmacenamiento(): Promise<Partial<SystemCheck>> {
  await new Promise((r) => setTimeout(r, 600));
  try {
    if (navigator.storage && navigator.storage.estimate) {
      const { usage = 0, quota = 1 } = await navigator.storage.estimate();
      const pct = Math.round((usage / quota) * 100);
      const libre = ((quota - usage) / 1024 / 1024).toFixed(0);
      if (pct > 80) return { status: "warning", detail: `Almacenamiento al ${pct}% de capacidad. Libere espacio pronto.`, value: `${libre} MB libres` };
      return { status: "ok", detail: `Almacenamiento disponible: ${libre} MB (${100 - pct}% libre).`, value: `${libre} MB` };
    }
    return { status: "ok", detail: "Almacenamiento disponible.", value: "OK" };
  } catch {
    return { status: "ok", detail: "Almacenamiento local disponible.", value: "OK" };
  }
}

async function checkRendimiento(): Promise<Partial<SystemCheck>> {
  await new Promise((r) => setTimeout(r, 900));
  const cores = navigator.hardwareConcurrency ?? 2;
  const mem = (navigator as any).deviceMemory ?? null;
  if (cores < 4 || (mem !== null && mem < 4)) {
    return { status: "warning", detail: `Recursos limitados: ${cores} núcleos, ${mem ?? "?"}GB RAM. Rendimiento puede ser reducido.`, value: `${cores} cores` };
  }
  return { status: "ok", detail: `Recursos suficientes: ${cores} núcleos, ${mem ?? "≥4"}GB RAM.`, value: `${cores} cores` };
}

async function checkPermisos(): Promise<Partial<SystemCheck>> {
  await new Promise((r) => setTimeout(r, 800));
  try {
    const cam = await navigator.permissions.query({ name: "camera" as PermissionName });
    if (cam.state === "denied")
      return { status: "error", detail: "Permiso de cámara denegado. Habilítelo en la configuración del navegador.", value: "DENEGADO" };
    if (cam.state === "granted")
      return { status: "ok", detail: "Permiso de cámara concedido. Acceso completo habilitado.", value: "CONCEDIDO" };
    return { status: "warning", detail: "Permiso de cámara pendiente. Se solicitará al iniciar inspección.", value: "PENDIENTE" };
  } catch {
    return { status: "ok", detail: "Permisos del sistema disponibles.", value: "OK" };
  }
}

async function checkLatencia(): Promise<Partial<SystemCheck>> {
  await new Promise((r) => setTimeout(r, 1200));
  const t0 = performance.now();
  try {
    await fetch("https://www.google.com/favicon.ico", { mode: "no-cors", cache: "no-store" });
    const ms = Math.round(performance.now() - t0);
    if (ms > 500) return { status: "warning", detail: `Latencia al servidor: ${ms} ms. Conexión lenta detectada.`, value: `${ms} ms` };
    return { status: "ok", detail: `Servidor accesible. Latencia: ${ms} ms.`, value: `${ms} ms` };
  } catch {
    const ms = Math.round(performance.now() - t0);
    return { status: "warning", detail: `No se pudo alcanzar el servidor externo (${ms} ms). Verifique acceso a internet.`, value: `${ms} ms` };
  }
}

const CHECK_FNS: Record<string, () => Promise<Partial<SystemCheck>>> = {
  red: checkRed,
  camara: checkCamara,
  ia: checkIA,
  almacenamiento: checkAlmacenamiento,
  rendimiento: checkRendimiento,
  permisos: checkPermisos,
  latencia: checkLatencia,
};

// ── Status helpers ─────────────────────────────────────────────────────────

function StatusIcon({ status }: { status: CheckStatus }) {
  if (status === "pending")  return <div className="w-6 h-6 rounded-full border-2 border-[#3f3f46]" />;
  if (status === "checking") return <Loader size={22} className="text-[#3b82f6] animate-spin" />;
  if (status === "ok")       return <CheckCircle size={22} className="text-[#10b981]" />;
  if (status === "warning")  return <AlertTriangle size={22} className="text-[#f59e0b]" />;
  return <XCircle size={22} className="text-[#ef4444]" />;
}

function statusColor(status: CheckStatus): string {
  if (status === "ok")       return "border-[#10b981]/30 bg-[#10b981]/5";
  if (status === "warning")  return "border-[#f59e0b]/30 bg-[#f59e0b]/5";
  if (status === "error")    return "border-[#ef4444]/30 bg-[#ef4444]/5";
  if (status === "checking") return "border-[#3b82f6]/30 bg-[#3b82f6]/5";
  return "border-[#27272a] bg-[#1a1a1a]";
}

function valueBadge(status: CheckStatus, value?: string) {
  if (!value) return null;
  const cls =
    status === "ok"      ? "bg-[#10b981]/20 text-[#10b981] border-[#10b981]/40" :
    status === "warning" ? "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/40" :
    status === "error"   ? "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/40" :
                           "bg-[#3b82f6]/20 text-[#3b82f6] border-[#3b82f6]/40";
  return (
    <span className={`px-2 py-0.5 rounded border text-xs font-['Liberation_Mono'] font-bold ${cls}`}>
      {value}
    </span>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function VerificacionSistema() {
  const [checks, setChecks]         = useState<SystemCheck[]>(initialChecks);
  const [running, setRunning]       = useState(false);
  const [completed, setCompleted]   = useState(false);
  const [timestamp, setTimestamp]   = useState<string | null>(null);

  const updateCheck = useCallback((id: string, partial: Partial<SystemCheck>) => {
    setChecks((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...partial } : c))
    );
  }, []);

  const runChecks = useCallback(async () => {
    setRunning(true);
    setCompleted(false);
    setTimestamp(null);
    setChecks(initialChecks.map((c) => ({ ...c, status: "pending", detail: "En espera...", value: undefined })));

    // Run each check sequentially with slight overlap
    const ids = initialChecks.map((c) => c.id);
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      updateCheck(id, { status: "checking", detail: "Verificando..." });
      try {
        const result = await CHECK_FNS[id]();
        updateCheck(id, result);
      } catch {
        updateCheck(id, { status: "error", detail: "Error inesperado durante la verificación.", value: "ERR" });
      }
      // Small delay between checks
      if (i < ids.length - 1) await new Promise((r) => setTimeout(r, 150));
    }

    setRunning(false);
    setCompleted(true);
    setTimestamp(new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
  }, [updateCheck]);

  // Auto-run on mount
  useEffect(() => {
    runChecks();
  }, []);

  const okCount      = checks.filter((c) => c.status === "ok").length;
  const warnCount    = checks.filter((c) => c.status === "warning").length;
  const errorCount   = checks.filter((c) => c.status === "error").length;
  const totalRequired = checks.filter((c) => c.required).length;
  const requiredOk    = checks.filter((c) => c.required && c.status === "ok").length;
  const canStart      = completed && checks.filter((c) => c.required && c.status === "error").length === 0;

  const overallStatus: CheckStatus =
    errorCount > 0  ? "error" :
    warnCount > 0   ? "warning" :
    completed       ? "ok" :
    running         ? "checking" : "pending";

  return (
    <div className="space-y-6">

      {/* ── Overall Status Banner ── */}
      <div className={`rounded-lg border-2 p-5 flex items-center justify-between transition-all ${
        overallStatus === "ok"       ? "border-[#10b981] bg-[#10b981]/10" :
        overallStatus === "warning"  ? "border-[#f59e0b] bg-[#f59e0b]/10" :
        overallStatus === "error"    ? "border-[#ef4444] bg-[#ef4444]/10" :
        overallStatus === "checking" ? "border-[#3b82f6] bg-[#3b82f6]/10" :
                                       "border-[#27272a] bg-[#1a1a1a]"
      }`}>
        <div className="flex items-center gap-4">
          {overallStatus === "checking" && <Loader size={28} className="text-[#3b82f6] animate-spin flex-shrink-0" />}
          {overallStatus === "ok"       && <CheckCircle size={28} className="text-[#10b981] flex-shrink-0" />}
          {overallStatus === "warning"  && <AlertTriangle size={28} className="text-[#f59e0b] flex-shrink-0" />}
          {overallStatus === "error"    && <XCircle size={28} className="text-[#ef4444] flex-shrink-0" />}
          {overallStatus === "pending"  && <Monitor size={28} className="text-[#71717a] flex-shrink-0" />}
          <div>
            <div className={`font-['Space_Grotesk'] font-bold text-lg ${
              overallStatus === "ok"       ? "text-[#10b981]" :
              overallStatus === "warning"  ? "text-[#f59e0b]" :
              overallStatus === "error"    ? "text-[#ef4444]" :
              overallStatus === "checking" ? "text-[#3b82f6]" : "text-[#71717a]"
            }`}>
              {overallStatus === "checking" && "VERIFICANDO SISTEMA..."}
              {overallStatus === "ok"       && "SISTEMA LISTO — TODOS LOS CHEQUEOS PASARON"}
              {overallStatus === "warning"  && "SISTEMA CON ADVERTENCIAS — PUEDE CONTINUAR CON PRECAUCIÓN"}
              {overallStatus === "error"    && "SISTEMA CON ERRORES CRÍTICOS — NO SE PUEDE INICIAR"}
              {overallStatus === "pending"  && "EN ESPERA DE VERIFICACIÓN"}
            </div>
            <div className="text-[#71717a] font-['Inter'] text-sm mt-0.5">
              {completed
                ? `${okCount} OK · ${warnCount} advertencias · ${errorCount} errores · Obligatorios: ${requiredOk}/${totalRequired}`
                : "Analizando los componentes del sistema de inspección..."
              }
              {timestamp && <span className="ml-3 text-[#52525b]">— Última verificación: {timestamp}</span>}
            </div>
          </div>
        </div>

        <button
          onClick={runChecks}
          disabled={running}
          className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-[#3f3f46] text-white font-['Space_Grotesk'] font-bold px-5 py-3 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px] min-w-[160px]"
        >
          <RefreshCw size={18} className={running ? "animate-spin" : ""} />
          {running ? "VERIFICANDO..." : "RE-VERIFICAR"}
        </button>
      </div>

      {/* ── Check Grid ── */}
      <div className="grid grid-cols-1 gap-3">
        {checks.map((check) => {
          const Icon = check.icon;
          return (
            <div
              key={check.id}
              className={`rounded-lg border-2 p-5 flex items-center gap-5 transition-all duration-300 ${statusColor(check.status)}`}
            >
              {/* Icon */}
              <div className={`p-3 rounded-lg flex-shrink-0 ${
                check.status === "ok"       ? "bg-[#10b981]/20" :
                check.status === "warning"  ? "bg-[#f59e0b]/20" :
                check.status === "error"    ? "bg-[#ef4444]/20" :
                check.status === "checking" ? "bg-[#3b82f6]/20" : "bg-[#27272a]"
              }`}>
                <Icon size={22} className={
                  check.status === "ok"       ? "text-[#10b981]" :
                  check.status === "warning"  ? "text-[#f59e0b]" :
                  check.status === "error"    ? "text-[#ef4444]" :
                  check.status === "checking" ? "text-[#3b82f6]" : "text-[#52525b]"
                } />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-white font-['Space_Grotesk'] font-bold text-base">{check.label}</span>
                  {check.required && (
                    <span className="px-2 py-0.5 bg-[#1e3a8a] border border-[#3b82f6]/30 text-[#93c5fd] text-[10px] font-bold rounded">
                      OBLIGATORIO
                    </span>
                  )}
                  {valueBadge(check.status, check.value)}
                </div>
                <div className="text-[#71717a] font-['Inter'] text-xs mb-1">{check.sublabel}</div>
                <div className={`font-['Inter'] text-sm ${
                  check.status === "ok"       ? "text-[#6ee7b7]" :
                  check.status === "warning"  ? "text-[#fcd34d]" :
                  check.status === "error"    ? "text-[#fca5a5]" :
                  check.status === "checking" ? "text-[#93c5fd]" : "text-[#52525b]"
                }`}>
                  {check.detail}
                </div>
              </div>

              {/* Status icon */}
              <div className="flex-shrink-0">
                <StatusIcon status={check.status} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Summary Footer ── */}
      {completed && (
        <div className={`rounded-lg border-2 p-5 flex items-center justify-between ${
          canStart
            ? "border-[#10b981]/40 bg-[#10b981]/5"
            : "border-[#ef4444]/40 bg-[#ef4444]/5"
        }`}>
          <div className="flex items-center gap-4">
            {canStart
              ? <CheckCircle size={24} className="text-[#10b981] flex-shrink-0" />
              : <XCircle size={24} className="text-[#ef4444] flex-shrink-0" />
            }
            <div>
              <div className={`font-['Space_Grotesk'] font-bold text-base ${canStart ? "text-[#10b981]" : "text-[#ef4444]"}`}>
                {canStart
                  ? "SISTEMA APTO PARA INICIAR TURNO"
                  : "SISTEMA NO APTO — CORRIJA LOS ERRORES CRÍTICOS ANTES DE INICIAR"
                }
              </div>
              <div className="text-[#71717a] font-['Inter'] text-xs mt-0.5">
                {canStart
                  ? `${warnCount > 0 ? `${warnCount} advertencia(s) no crítica(s) detectada(s). ` : ""}Puede proceder con la calibración de cámara.`
                  : `${errorCount} error(es) crítico(s) impiden el inicio. Llame al soporte técnico.`
                }
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="text-right">
              <div className="text-[#52525b] font-['Space_Grotesk'] text-xs uppercase mb-1">Resultado</div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-[#10b981]/20 border border-[#10b981]/30 text-[#10b981] text-xs font-bold rounded">{okCount} OK</span>
                {warnCount > 0 && <span className="px-3 py-1 bg-[#f59e0b]/20 border border-[#f59e0b]/30 text-[#f59e0b] text-xs font-bold rounded">{warnCount} AVISO</span>}
                {errorCount > 0 && <span className="px-3 py-1 bg-[#ef4444]/20 border border-[#ef4444]/30 text-[#ef4444] text-xs font-bold rounded">{errorCount} ERROR</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}