import { X, AlertTriangle, AlertCircle, Wifi, WifiOff, HardDrive } from "lucide-react";

interface AlertBannerProps {
  type: "error" | "warning" | "info" | "offline" | "memory";
  message: string;
  onClose?: () => void;
  permanent?: boolean;
}

export function AlertBanner({ type, message, onClose, permanent = false }: AlertBannerProps) {
  const styles = {
    error: "bg-[#ff3b3b] text-white",
    warning: "bg-[#ffb020] text-black",
    info: "bg-gray-700 text-white",
    offline: "bg-gray-600 text-white",
    memory: "bg-[#ff3b3b] text-white",
  };

  const icons = {
    error: AlertCircle,
    warning: AlertTriangle,
    info: AlertCircle,
    offline: WifiOff,
    memory: HardDrive,
  };

  const Icon = icons[type];

  return (
    <div className={`${styles[type]} px-6 py-4 flex items-center justify-between min-h-[64px]`}>
      <div className="flex items-center gap-4">
        <Icon size={24} />
        <span className="font-bold text-lg">{message}</span>
      </div>
      {!permanent && onClose && (
        <button
          onClick={onClose}
          className="p-2 hover:bg-black/20 rounded transition-colors"
        >
          <X size={24} />
        </button>
      )}
    </div>
  );
}
