import { ReactNode } from "react";
import { Navigate, useNavigate } from "react-router";
import { useInspectionFlow } from "../contexts/InspectionFlowContext";
import { useAuth } from "../contexts/AuthContext";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

interface FlowProtectedRouteProps {
  children: ReactNode;
  requireState: "setup" | "verification" | "calibration" | "inspection" | "cierre";
}

export function FlowProtectedRoute({ children, requireState }: FlowProtectedRouteProps) {
  const {
    canAccessSetup,
    canAccessVerification,
    canAccessCalibration,
    canAccessInspection,
    canAccessCierre,
    flowState
  } = useInspectionFlow();

  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  // Leer también de localStorage para validación adicional
  const storedFlowState = localStorage.getItem('visionqa_flowState');

  // Los admins no están sujetos al flujo de inspección (no hacen inspecciones)
  // Pueden acceder libremente a sus rutas
  if (isAdmin()) {
    return <>{children}</>;
  }

  // Validar según el estado requerido
  let canAccess = false;
  let redirectTo = "/";
  let message = "";
  let buttonText = "CONTINUAR FLUJO CORRECTO";
  let steps: Array<{ label: string; completed: boolean }> = [];

  switch (requireState) {
    case "setup":
      canAccess = canAccessSetup();
      redirectTo = "/";
      message = "Debe iniciar sesión antes de configurar un lote";
      buttonText = "IR A INICIO DE SESIÓN";
      steps = [
        { label: "Iniciar Sesión",      completed: false },
        { label: "Configurar Lote",     completed: false },
        { label: "Verificar Sistema",   completed: false },
        { label: "Calibrar Cámara",     completed: false },
        { label: "Inspeccionar",        completed: false },
      ];
      break;

    case "verification":
      canAccess = canAccessVerification();
      redirectTo = "/setup";
      message = "Debe completar la configuración del lote antes de verificar el sistema";
      buttonText = "IR A CONFIGURAR LOTE";
      steps = [
        { label: "Iniciar Sesión",      completed: true },
        { label: "Configurar Lote",     completed: flowState === "SETUP_COMPLETE" || flowState === "VERIFIED" || flowState === "CALIBRATED" },
        { label: "Verificar Sistema",   completed: flowState === "VERIFIED" || flowState === "CALIBRATED" },
        { label: "Calibrar Cámara",     completed: false },
        { label: "Inspeccionar",        completed: false },
      ];
      break;

    case "calibration":
      canAccess = canAccessCalibration();
      redirectTo = "/verificacion";
      message = "Debe completar la verificación del sistema antes de calibrar la cámara";
      buttonText = "IR A VERIFICACIÓN";
      steps = [
        { label: "Iniciar Sesión",      completed: true },
        { label: "Configurar Lote",     completed: true },
        { label: "Verificar Sistema",   completed: flowState === "VERIFIED" || flowState === "CALIBRATED" },
        { label: "Calibrar Cámara",     completed: false },
        { label: "Inspeccionar",        completed: false },
      ];
      break;

    case "inspection":
      canAccess = canAccessInspection();
      redirectTo = "/calibracion";
      message = "Debe completar la calibración de la cámara antes de inspeccionar";
      buttonText = "IR A CALIBRACIÓN";
      steps = [
        { label: "Iniciar Sesión",      completed: true },
        { label: "Configurar Lote",     completed: true },
        { label: "Verificar Sistema",   completed: true },
        { label: "Calibrar Cámara",     completed: flowState === "CALIBRATED" || flowState === "INSPECTING" || flowState === "COMPLETED" },
        { label: "Inspeccionar",        completed: false },
      ];
      break;

    case "cierre":
      // Validación adicional: verificar también localStorage
      const isCompleted = flowState === "COMPLETED" || storedFlowState === "COMPLETED";
      canAccess = isCompleted;
      redirectTo = "/inspeccion";
      message = flowState === "INSPECTING"
        ? "La inspección aún está en curso. Debe DETENER la inspección antes de ver el ticket de cierre"
        : "Debe completar la inspección antes de ver el ticket de cierre";
      buttonText = flowState === "INSPECTING" ? "IR A DETENER INSPECCIÓN" : "IR A INSPECCIÓN";
      steps = [
        { label: "Iniciar Sesión",      completed: true },
        { label: "Configurar Lote",     completed: true },
        { label: "Verificar Sistema",   completed: true },
        { label: "Calibrar Cámara",     completed: true },
        { label: "Inspeccionar",        completed: isCompleted },
      ];
      break;
  }

  // Si puede acceder, mostrar el contenido
  if (canAccess) {
    return <>{children}</>;
  }

  // Si no puede acceder, mostrar pantalla de error con flujo
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#f59e0b] rounded-lg p-8">
          {/* Header de Error */}
          <div className="flex items-start gap-6 mb-8">
            <div className="p-4 bg-[#f59e0b]/20 rounded-lg">
              <AlertTriangle size={48} className="text-[#f59e0b]" />
            </div>
            <div className="flex-1">
              <h1 className="text-white font-['Space_Grotesk'] font-bold text-3xl mb-3">
                FLUJO INTERRUMPIDO
              </h1>
              <p className="text-[#a1a1aa] font-['Inter'] text-lg leading-relaxed">
                {message}
              </p>
            </div>
          </div>

          {/* Progreso del Flujo */}
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-6 mb-8">
            <h3 className="text-white font-['Space_Grotesk'] font-bold text-lg mb-6 flex items-center gap-2">
              <ArrowRight size={20} className="text-[#3b82f6]" />
              FLUJO DE TRABAJO REQUERIDO
            </h3>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step.completed
                      ? "bg-[#10b981]/20 border-[#10b981]"
                      : "bg-[#2a2a2a] border-gray-600"
                  }`}>
                    {step.completed ? (
                      <CheckCircle2 size={20} className="text-[#10b981]" />
                    ) : (
                      <span className="text-gray-400 font-bold">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={`font-['Space_Grotesk'] font-bold ${
                      step.completed ? "text-[#10b981]" : "text-[#a1a1aa]"
                    }`}>
                      {step.label}
                    </div>
                  </div>
                  {step.completed && (
                    <div className="text-[#10b981] font-['Inter'] text-xs font-bold">
                      ✓ COMPLETADO
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Información Adicional */}
          <div className="bg-[#2a2a2a] border-l-4 border-[#3b82f6] rounded-lg p-5 mb-8">
            <p className="text-[#d4d4d8] font-['Inter'] text-sm leading-relaxed">
              ℹ️ <strong>Sistema de Inspección Secuencial:</strong> VisionQA requiere que 
              complete cada paso del flujo en orden para garantizar la integridad del proceso de inspección 
              y cumplir con los estándares ISO 2859-1.
            </p>
          </div>

          {/* Ayuda adicional si está en inspección */}
          {requireState === "cierre" && flowState === "INSPECTING" && (
            <div className="bg-[#f59e0b]/10 border-l-4 border-[#f59e0b] rounded-lg p-5 mb-8">
              <p className="text-[#d4d4d8] font-['Inter'] text-sm leading-relaxed">
                ⚠️ <strong>Acción Requerida:</strong> Presione el botón <strong className="text-[#f59e0b]">"PARAR"</strong> en 
                la pantalla de inspección para finalizar el proceso y generar el certificado de calidad.
              </p>
            </div>
          )}

          {/* Botones de Acción */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate(redirectTo)}
              className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-['Space_Grotesk'] font-bold py-4 px-6 rounded-lg transition-colors min-h-[64px]"
            >
              {buttonText}
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-gray-700 text-white font-['Space_Grotesk'] font-bold py-4 px-6 rounded-lg transition-colors min-h-[64px]"
            >
              VOLVER AL INICIO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}