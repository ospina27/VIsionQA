import { AlertTriangle, Camera, Wifi, HardDrive, Thermometer, Eye } from "lucide-react";

export type AlertType = 
  | "network_offline"
  | "memory_full"
  | "lens_dirty"
  | "low_light"
  | "motion_blur"
  | "overheat"
  | "foreign_object"
  | "batch_conflict";

interface SystemAlertsProps {
  alerts: AlertType[];
  onDismiss?: (alert: AlertType) => void;
}

export function SystemAlerts({ alerts, onDismiss }: SystemAlertsProps) {
  if (alerts.length === 0) return null;

  const alertConfig = {
    network_offline: {
      icon: Wifi,
      color: "bg-gray-600",
      text: "Modo Offline Activo. Operación local autorizada",
      dismissable: false,
    },
    memory_full: {
      icon: HardDrive,
      color: "bg-[#ff3b3b]",
      text: "Memoria Llena - Libere espacio o sincronice datos",
      dismissable: true,
    },
    lens_dirty: {
      icon: Camera,
      color: "bg-[#ffb020]",
      text: "Visión Comprometida. Por favor, limpie el lente con el paño de microfibra",
      dismissable: true,
    },
    low_light: {
      icon: Eye,
      color: "bg-[#ffb020]",
      text: "Iluminación Insuficiente. Ajuste las luces LED del túnel de inspección",
      dismissable: true,
    },
    motion_blur: {
      icon: Camera,
      color: "bg-orange-600",
      text: "Imágenes borrosas. Reduzca la velocidad de la banda",
      dismissable: true,
    },
    overheat: {
      icon: Thermometer,
      color: "bg-orange-600",
      text: "Dispositivo caliente. Reduciendo velocidad visual temporalmente",
      dismissable: false,
    },
    foreign_object: {
      icon: AlertTriangle,
      color: "bg-[#ffb020]",
      text: "Objeto no identificado en la línea. Retire el elemento de la banda para reanudar",
      dismissable: true,
    },
    batch_conflict: {
      icon: AlertTriangle,
      color: "bg-orange-600",
      text: "Atención: El Lote ya está activo en Estación 2",
      dismissable: true,
    },
  };

  return (
    <div className="space-y-2">
      {alerts.map((alertType) => {
        const config = alertConfig[alertType];
        const Icon = config.icon;

        return (
          <div
            key={alertType}
            className={`${config.color} text-white px-6 py-5 flex items-center justify-between min-h-[64px]`}
          >
            <div className="flex items-center gap-4">
              <Icon size={28} />
              <span className="font-bold text-lg">{config.text}</span>
            </div>
            {config.dismissable && onDismiss && (
              <button
                onClick={() => onDismiss(alertType)}
                className="px-6 py-3 bg-black/20 hover:bg-black/30 rounded font-bold transition-colors min-h-[50px]"
              >
                Cerrar
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
