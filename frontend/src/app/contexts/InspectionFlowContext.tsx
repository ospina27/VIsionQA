import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";

export type FlowState =
  | "NOT_STARTED"
  | "LOGGED_IN"
  | "SETUP_COMPLETE"
  | "VERIFIED"
  | "CALIBRATED"
  | "INSPECTING"
  | "COMPLETED";

interface LoteData {
  proveedor: string;
  formato: string;
  numeroLote: string;
  tamanoLote: number;
  fechaInicio?: string;
  horaInicio?: string;
}

export interface InspectionStats {
  totalInspeccionadas: number;
  totalDefectos: number;
  tasaDefectos: string;   // ej: "0.64"
  horaFin: string;
  duracion: string;
  estado: "APROBADO" | "RECHAZADO";
  eventosDeAlerta?: number;
  defectosExcluidos?: number;
}

interface InspectionFlowContextType {
  flowState: FlowState;
  loteData: LoteData | null;
  inspectionStats: InspectionStats | null;

  startLogin: () => void;
  completeLogin: () => void;
  completeSetup: (proveedor: string, formato: string, tamanoLote: number) => void;
  completeVerification: () => void;
  completeCalibration: () => void;
  startInspection: () => void;
  /** Llama con total/defectos para persistir estadísticas reales en el ticket de cierre */
  completeInspection: (total?: number, defectos?: number, eventosDeAlerta?: number, defectosExcluidos?: number) => void;
  resetFlow: () => void;

  canAccessSetup: () => boolean;
  canAccessVerification: () => boolean;
  canAccessCalibration: () => boolean;
  canAccessInspection: () => boolean;
  canAccessCierre: () => boolean;
}

// ── helpers ─────────────────────────────────────────────────────────────────

function calcDuration(start?: string, end?: string): string {
  if (!start || !end) return "—";
  try {
    const [sh, sm, ss] = start.split(":").map(Number);
    const [eh, em, es] = end.split(":").map(Number);
    let secs = (eh * 3600 + em * 60 + es) - (sh * 3600 + sm * 60 + ss);
    if (secs < 0) secs += 86400;
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h}h ${m}m ${String(s).padStart(2, "0")}s`;
  } catch (e) {
    return "—";
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

const InspectionFlowContext = createContext<InspectionFlowContextType | undefined>(undefined);

export function InspectionFlowProvider({ children }: { children: ReactNode }) {
  const [flowState, setFlowState] = useState<FlowState>(() => {
    try {
      const saved = localStorage.getItem("visionqa_flowState");
      return (saved as FlowState) || "NOT_STARTED";
    } catch (e) {
      return "NOT_STARTED";
    }
  });

  const [loteData, setLoteData] = useState<LoteData | null>(() => {
    try {
      const saved = localStorage.getItem("visionqa_loteData");
      return saved ? JSON.parse(saved) : null;
    } catch (e) { return null; }
  });

  const [inspectionStats, setInspectionStats] = useState<InspectionStats | null>(() => {
    try {
      const saved = localStorage.getItem("visionqa_inspectionStats");
      return saved ? JSON.parse(saved) : null;
    } catch (e) { return null; }
  });

  useEffect(() => {
    try { localStorage.setItem("visionqa_flowState", flowState); } catch (e) { /* noop */ }
  }, [flowState]);

  useEffect(() => {
    try {
      if (loteData) localStorage.setItem("visionqa_loteData", JSON.stringify(loteData));
      else localStorage.removeItem("visionqa_loteData");
    } catch (e) { /* noop */ }
  }, [loteData]);

  useEffect(() => {
    try {
      if (inspectionStats) localStorage.setItem("visionqa_inspectionStats", JSON.stringify(inspectionStats));
      else localStorage.removeItem("visionqa_inspectionStats");
    } catch (e) { /* noop */ }
  }, [inspectionStats]);

  // ── Transiciones ────────────────────────────────────────────���─────────────

  const startLogin = useCallback(() => {
    setFlowState("NOT_STARTED");
    setLoteData(null);
    setInspectionStats(null);
    try {
      localStorage.removeItem("visionqa_flowState");
      localStorage.removeItem("visionqa_loteData");
      localStorage.removeItem("visionqa_inspectionStats");
      localStorage.removeItem("visionqa_inspection_total");
      localStorage.removeItem("visionqa_inspection_defectos");
    } catch (e) { /* noop */ }
  }, []);

  const completeLogin = useCallback(() => {
    setFlowState("LOGGED_IN");
  }, []);

  const completeSetup = useCallback((proveedor: string, formato: string, tamanoLote: number) => {
    const numeroLote = `LT-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000) + 100}`;
    const now = new Date();
    setLoteData({
      proveedor,
      formato,
      numeroLote,
      tamanoLote,
      fechaInicio: now.toLocaleDateString("es-AR"),
      horaInicio: now.toLocaleTimeString("es-AR", { hour12: false }),
    });
    setFlowState("SETUP_COMPLETE");
  }, []);

  const completeVerification = useCallback(() => {
    setFlowState("VERIFIED");
  }, []);

  const completeCalibration = useCallback(() => {
    setFlowState("CALIBRATED");
  }, []);

  const startInspection = useCallback(() => {
    setFlowState("INSPECTING");
    try { localStorage.setItem("visionqa_flowState", "INSPECTING"); } catch (e) { /* noop */ }
  }, []);

  const completeInspection = useCallback(
    (total?: number, defectos?: number, eventosDeAlerta?: number, defectosExcluidos?: number) => {
      if (total !== undefined && defectos !== undefined) {
        const safeDef   = Math.max(0, defectos);
        const safeTotal = Math.max(1, total);
        const tasa      = ((safeDef / safeTotal) * 100).toFixed(2);
        const horaFin   = new Date().toLocaleTimeString("es-AR", { hour12: false });

        let horaInicio: string | undefined;
        try {
          const ld = localStorage.getItem("visionqa_loteData");
          horaInicio = ld ? JSON.parse(ld).horaInicio : undefined;
        } catch (e) { /* noop */ }

        const stats: InspectionStats = {
          totalInspeccionadas: safeTotal,
          totalDefectos:       safeDef,
          tasaDefectos:        tasa,
          horaFin,
          duracion: calcDuration(horaInicio, horaFin),
          estado:   parseFloat(tasa) <= 1.0 ? "APROBADO" : "RECHAZADO",
          eventosDeAlerta,
          defectosExcluidos
        };
        setInspectionStats(stats);
        try {
          localStorage.setItem("visionqa_inspectionStats", JSON.stringify(stats));
        } catch (e) { /* noop */ }
      }

      try {
        localStorage.removeItem("visionqa_inspection_total");
        localStorage.removeItem("visionqa_inspection_defectos");
        localStorage.setItem("visionqa_flowState", "COMPLETED");
      } catch (e) { /* noop */ }
      setFlowState("COMPLETED");
    },
    []
  );

  const resetFlow = useCallback(() => {
    setFlowState("LOGGED_IN");
    setLoteData(null);
    setInspectionStats(null);
    try {
      localStorage.setItem("visionqa_flowState", "LOGGED_IN");
      localStorage.removeItem("visionqa_loteData");
      localStorage.removeItem("visionqa_inspectionStats");
      localStorage.removeItem("visionqa_inspection_total");
      localStorage.removeItem("visionqa_inspection_defectos");
    } catch (e) { /* noop */ }
  }, []);

  // ── Validaciones ──────────────────────────────────────────────────────────

  const canAccessSetup = useCallback(() =>
    flowState === "LOGGED_IN" || flowState === "SETUP_COMPLETE", [flowState]);

  const canAccessVerification = useCallback(() =>
    flowState === "SETUP_COMPLETE" || flowState === "VERIFIED", [flowState]);

  const canAccessCalibration = useCallback(() =>
    flowState === "VERIFIED" || flowState === "CALIBRATED", [flowState]);

  const canAccessInspection = useCallback(() =>
    flowState === "CALIBRATED" || flowState === "INSPECTING" || flowState === "COMPLETED", [flowState]);

  const canAccessCierre = useCallback(() => {
    try {
      const stored = localStorage.getItem("visionqa_flowState");
      return flowState === "COMPLETED" || stored === "COMPLETED";
    } catch (e) {
      return flowState === "COMPLETED";
    }
  }, [flowState]);

  return (
    <InspectionFlowContext.Provider value={{
      flowState, loteData, inspectionStats,
      startLogin, completeLogin, completeSetup, completeVerification, completeCalibration,
      startInspection, completeInspection, resetFlow,
      canAccessSetup, canAccessVerification, canAccessCalibration, canAccessInspection, canAccessCierre,
    }}>
      {children}
    </InspectionFlowContext.Provider>
  );
}

export function useInspectionFlow() {
  const context = useContext(InspectionFlowContext);
  if (context === undefined) {
    // Fallback seguro para preview aislado de Figma Make
    console.warn(
      "[VisionQA] useInspectionFlow llamado fuera de InspectionFlowProvider. " +
      "Usando fallback de desarrollo."
    );
    return {
      flowState:        "NOT_STARTED" as FlowState,
      loteData:         null,
      inspectionStats:  null,
      startLogin:       () => {},
      completeLogin:    () => {},
      completeSetup:    (_p: string, _f: string, _t: number) => {},
      completeVerification: () => {},
      completeCalibration: () => {},
      startInspection:  () => {},
      completeInspection: (_t?: number, _d?: number) => {},
      resetFlow:        () => {},
      canAccessSetup:        () => false,
      canAccessVerification: () => false,
      canAccessCalibration:  () => false,
      canAccessInspection:   () => false,
      canAccessCierre:       () => false,
    };
  }
  return context;
}