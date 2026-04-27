import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";

// ── Tipos ──────────────────────────────────────────────────────────────────────

type ModalType = "info" | "warning" | "error" | "success";

interface AlertConfig {
  title: string;
  message: string;
  detail?: string;
  type?: ModalType;
  confirmText?: string;
}

interface ConfirmConfig {
  title: string;
  message: string;
  detail?: string;
  type?: "warning" | "danger" | "info";
  confirmText?: string;
  cancelText?: string;
}

interface ActiveModal {
  kind: "alert" | "confirm";
  config: AlertConfig | ConfirmConfig;
  resolve: (value: boolean) => void;
}

interface ModalContextType {
  /** Muestra un aviso (solo botón Aceptar). Devuelve Promise<void>. */
  showAlert: (config: AlertConfig) => Promise<void>;
  /** Muestra una confirmación (Cancelar + Confirmar). Devuelve Promise<boolean>. */
  showConfirm: (config: ConfirmConfig) => Promise<boolean>;
}

// ── Contexto ───────────────────────────────────────────────────────────────────

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// ── Helpers de estilo ──────────────────────────────────────────────────────────

function getTypeStyles(type: ModalType | "danger") {
  switch (type) {
    case "success":
      return {
        border: "border-[#10b981]",
        icon: <CheckCircle size={32} className="text-[#10b981]" />,
        iconBg: "bg-[#10b981]/20",
        confirmBtn: "bg-[#10b981] hover:bg-[#059669]",
      };
    case "warning":
      return {
        border: "border-[#f59e0b]",
        icon: <AlertTriangle size={32} className="text-[#f59e0b]" />,
        iconBg: "bg-[#f59e0b]/20",
        confirmBtn: "bg-[#f59e0b] hover:bg-[#d97706] text-black",
      };
    case "error":
    case "danger":
      return {
        border: "border-[#ef4444]",
        icon: <XCircle size={32} className="text-[#ef4444]" />,
        iconBg: "bg-[#ef4444]/20",
        confirmBtn: "bg-[#ef4444] hover:bg-red-600",
      };
    default: // info
      return {
        border: "border-[#3b82f6]",
        icon: <Info size={32} className="text-[#3b82f6]" />,
        iconBg: "bg-[#3b82f6]/20",
        confirmBtn: "bg-[#3b82f6] hover:bg-[#2563eb]",
      };
  }
}

// ── Provider ───────────────────────────────────────────────────────────────────

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ActiveModal | null>(null);

  const showAlert = useCallback((config: AlertConfig): Promise<void> => {
    return new Promise((resolve) => {
      setModal({
        kind: "alert",
        config,
        resolve: () => resolve(true),
      });
    });
  }, []);

  const showConfirm = useCallback((config: ConfirmConfig): Promise<boolean> => {
    return new Promise((resolve) => {
      setModal({
        kind: "confirm",
        config,
        resolve,
      });
    });
  }, []);

  const handleClose = (value: boolean) => {
    modal?.resolve(value);
    setModal(null);
  };

  return (
    <ModalContext.Provider value={{ showAlert, showConfirm }}>
      {children}

      {/* ── Renderer de modal ── */}
      {modal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
          <div
            className={`bg-[#1a1a1a] border-2 ${
              getTypeStyles((modal.config as ConfirmConfig).type ?? (modal.config as AlertConfig).type ?? "info").border
            } rounded-xl max-w-lg w-full shadow-2xl`}
          >
            {/* Header */}
            <div className="bg-[#222] border-b border-gray-800 px-7 py-5 flex items-center justify-between rounded-t-xl">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    getTypeStyles(
                      (modal.config as ConfirmConfig).type ??
                        (modal.config as AlertConfig).type ??
                        "info"
                    ).iconBg
                  }`}
                >
                  {
                    getTypeStyles(
                      (modal.config as ConfirmConfig).type ??
                        (modal.config as AlertConfig).type ??
                        "info"
                    ).icon
                  }
                </div>
                <h2 className="text-white font-['Space_Grotesk'] font-bold text-xl leading-tight">
                  {modal.config.title}
                </h2>
              </div>
              <button
                onClick={() => handleClose(false)}
                className="p-2 text-gray-500 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="px-7 py-6 space-y-4">
              <p className="text-[#d4d4d8] font-['Inter'] text-base leading-relaxed">
                {modal.config.message}
              </p>
              {modal.config.detail && (
                <div
                  className={`border rounded-lg p-4 ${
                    getTypeStyles(
                      (modal.config as ConfirmConfig).type ??
                        (modal.config as AlertConfig).type ??
                        "info"
                    ).border
                  } bg-white/5`}
                >
                  <p className="text-[#a1a1aa] font-['Inter'] text-sm leading-relaxed">
                    {modal.config.detail}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-7 pb-6 flex gap-3">
              {modal.kind === "confirm" && (
                <button
                  onClick={() => handleClose(false)}
                  className="flex-1 bg-[#2a2a2a] hover:bg-[#333] border border-gray-700 text-white font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px] text-base"
                >
                  {(modal.config as ConfirmConfig).cancelText ?? "CANCELAR"}
                </button>
              )}
              <button
                onClick={() => handleClose(true)}
                className={`flex-1 text-white font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px] text-base ${
                  getTypeStyles(
                    (modal.config as ConfirmConfig).type ??
                      (modal.config as AlertConfig).type ??
                      "info"
                  ).confirmBtn
                }`}
              >
                {modal.kind === "confirm"
                  ? ((modal.config as ConfirmConfig).confirmText ?? "CONFIRMAR")
                  : ((modal.config as AlertConfig).confirmText ?? "ACEPTAR")}
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    // Fallback seguro para preview aislado de Figma Make
    console.warn(
      "[VisionQA] useModal llamado fuera de ModalProvider. " +
      "Usando fallback de desarrollo."
    );
    return {
      showAlert:   (_config: AlertConfig): Promise<void> => Promise.resolve(),
      showConfirm: (_config: ConfirmConfig): Promise<boolean> => Promise.resolve(false),
    };
  }
  return ctx;
}