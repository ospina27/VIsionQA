import { Wifi, WifiOff, Cloud, CloudOff } from "lucide-react";
import { useState, useEffect } from "react";

export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    // Simulate random offline states
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsOnline(false);
        setTimeout(() => setIsOnline(true), 5000);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOnline) {
      setIsSyncing(true);
      setTimeout(() => setIsSyncing(false), 2000);
    }
  }, [isOnline]);

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* Network Status */}
      <div className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1 md:py-2 rounded text-xs md:text-sm ${
        isOnline ? "bg-green-900/30 text-green-500" : "bg-red-900/30 text-red-500"
      }`}>
        {isOnline ? (
          <Wifi size={16} className={`md:w-5 md:h-5 ${isSyncing ? "animate-pulse" : ""}`} />
        ) : (
          <WifiOff size={16} className="md:w-5 md:h-5" />
        )}
        <span className="font-bold whitespace-nowrap hidden sm:inline">
          {isOnline ? "EN LÍNEA" : "SIN CONEXIÓN"}
        </span>
      </div>

      {/* Sync Status */}
      {isSyncing && (
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded bg-blue-900/30 text-blue-400">
          <Cloud size={20} className="animate-pulse" />
          <span className="text-sm font-bold whitespace-nowrap">SINCRONIZANDO...</span>
        </div>
      )}

      {!isOnline && (
        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded bg-gray-700 text-gray-300">
          <CloudOff size={20} />
          <span className="text-sm font-bold whitespace-nowrap">MODO LOCAL</span>
        </div>
      )}
    </div>
  );
}