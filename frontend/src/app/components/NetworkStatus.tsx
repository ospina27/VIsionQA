import { Wifi, WifiOff, Cloud } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useConfiguracion } from "../contexts/ConfiguracionContext";

// Lectura segura de navigator.onLine
function getOnlineStatus(): boolean {
  try {
    return typeof navigator !== "undefined" ? navigator.onLine : true;
  } catch (e) {
    return true;
  }
}

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(getOnlineStatus);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const { config } = useConfiguracion();
  const offlineTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleOnline = () => {
      if (offlineTimerRef.current) {
        clearTimeout(offlineTimerRef.current);
        offlineTimerRef.current = null;
      }
      setIsOnline(true);
    };

    const handleOffline = () => {
      // Disparar modo offline después del tiempo configurado
      offlineTimerRef.current = setTimeout(() => {
        setIsOnline(false);
      }, config.umbralFalloRed * 1000);
    };

    try {
      window.addEventListener("online",  handleOnline);
      window.addEventListener("offline", handleOffline);
    } catch (e) { /* entorno sin window */ }

    // Network Information API
    try {
      const conn = (navigator as any).connection
        || (navigator as any).mozConnection
        || (navigator as any).webkitConnection;

      if (conn) {
        const handleChange = () => {
          setIsSlowConnection(
            conn.effectiveType === "2g" ||
            conn.effectiveType === "slow-2g" ||
            conn.downlink < 0.5
          );
        };
        handleChange();
        conn.addEventListener("change", handleChange);
      }
    } catch (e) { /* API no disponible */ }

    return () => {
      try {
        window.removeEventListener("online",  handleOnline);
        window.removeEventListener("offline", handleOffline);
        const conn = (navigator as any).connection;
        if (conn) conn.removeEventListener("change", () => {});
      } catch (e) { /* noop */ }
      if (offlineTimerRef.current) clearTimeout(offlineTimerRef.current);
    };
  }, [config.umbralFalloRed]);

  // Indicador de sincronización al volver la conexión
  useEffect(() => {
    if (isOnline) {
      setIsSyncing(true);
      const t = setTimeout(() => setIsSyncing(false), 3000);
      return () => clearTimeout(t);
    }
  }, [isOnline]);

  return { isOnline, isSlowConnection, isSyncing };
}

// Componente visual compacto para headers
export function NetworkStatus() {
  const { isOnline, isSlowConnection, isSyncing } = useNetworkStatus();

  return (
    <div className="flex items-center gap-2">
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs ${
        !isOnline
          ? "bg-orange-900/30 text-orange-400"
          : isSlowConnection
          ? "bg-yellow-900/30 text-yellow-400"
          : "bg-green-900/30 text-green-500"
      }`}>
        {isOnline
          ? <Wifi size={14} className={isSyncing ? "animate-pulse" : ""} />
          : <WifiOff size={14} />}
        <span className="font-bold whitespace-nowrap hidden sm:inline">
          {!isOnline ? "SIN RED" : isSlowConnection ? "RED LENTA" : "EN LÍNEA"}
        </span>
      </div>

      {isSyncing && isOnline && (
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-900/30 text-blue-400">
          <Cloud size={14} className="animate-pulse" />
          <span className="text-xs font-bold whitespace-nowrap">SINCRONIZANDO...</span>
        </div>
      )}
    </div>
  );
}