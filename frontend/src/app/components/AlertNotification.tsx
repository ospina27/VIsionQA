import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { useNavigate } from "react-router";

interface AlertNotificationProps {
  show: boolean;
  message: string;
  severity: "CRÍTICA" | "ALTA" | "MEDIA";
  onDismiss: () => void;
}

export function AlertNotification({ show, message, severity, onDismiss }: AlertNotificationProps) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // Auto-dismiss after 10 seconds for non-critical alerts
      if (severity !== "CRÍTICA") {
        const timer = setTimeout(() => {
          handleDismiss();
        }, 10000);
        return () => clearTimeout(timer);
      }
    }
  }, [show, severity]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(), 300);
  };

  if (!show) return null;

  const colors = {
    CRÍTICA: {
      bg: "bg-[#ef4444]",
      border: "border-[#ef4444]",
      shadow: "shadow-[0px_0px_40px_0px_rgba(239,68,68,0.6)]"
    },
    ALTA: {
      bg: "bg-[#f59e0b]",
      border: "border-[#f59e0b]",
      shadow: "shadow-[0px_0px_40px_0px_rgba(245,158,11,0.6)]"
    },
    MEDIA: {
      bg: "bg-[#f1c100]",
      border: "border-[#f1c100]",
      shadow: "shadow-[0px_0px_40px_0px_rgba(241,193,0,0.6)]"
    }
  };

  const color = colors[severity];

  return (
    <div
      className={`fixed top-20 right-6 z-[60] transition-all duration-300 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      }`}
    >
      <div className={`${color.bg} ${color.shadow} border-2 ${color.border} rounded-lg p-6 max-w-md min-w-[400px] ${
        severity === "CRÍTICA" ? "animate-pulse" : ""
      }`}>
        <div className="flex items-start gap-4">
          <AlertTriangle size={28} className="text-white flex-shrink-0 mt-1" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-white font-['Space_Grotesk'] font-bold text-lg">
                ALERTA {severity}
              </h3>
            </div>
            <p className="text-white font-['Inter'] text-sm leading-relaxed mb-4">
              {message}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/alertas")}
                className="flex-1 bg-white hover:bg-gray-100 text-black font-['Space_Grotesk'] font-bold px-4 py-3 rounded transition-colors"
              >
                VER DETALLES
              </button>
              {severity !== "CRÍTICA" && (
                <button
                  onClick={handleDismiss}
                  className="px-4 py-3 bg-black/20 hover:bg-black/30 rounded transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
