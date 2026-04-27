import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Shield, AlertTriangle } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isAdmin } = useAuth();

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si se requiere admin pero el usuario no lo es, mostrar mensaje de acceso denegado
  if (requireAdmin && !isAdmin()) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#ef4444] rounded-lg p-8">
            <div className="flex items-start gap-6 mb-6">
              <div className="p-4 bg-[#ef4444]/20 rounded-lg">
                <AlertTriangle size={48} className="text-[#ef4444]" />
              </div>
              <div className="flex-1">
                <h1 className="text-white font-['Space_Grotesk'] font-bold text-3xl mb-3">
                  ACCESO DENEGADO
                </h1>
                <p className="text-[#a1a1aa] font-['Inter'] text-lg leading-relaxed">
                  Esta sección requiere permisos de <span className="text-[#8b5cf6] font-bold">ADMINISTRADOR</span>.
                </p>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield size={24} className="text-[#71717a]" />
                <h3 className="text-white font-['Space_Grotesk'] font-bold text-lg">
                  INFORMACIÓN DE USUARIO
                </h3>
              </div>
              <div className="space-y-2 text-[#a1a1aa] font-['Inter']">
                <p><strong className="text-white">Nombre:</strong> {user.nombre}</p>
                <p><strong className="text-white">Rol:</strong> <span className="text-[#3b82f6]">{user.rolAcceso}</span></p>
                {user.legajo && <p><strong className="text-white">Legajo:</strong> {user.legajo}</p>}
              </div>
            </div>

            <div className="bg-[#2a2a2a] border-l-4 border-[#f59e0b] rounded-lg p-5">
              <p className="text-[#d4d4d8] font-['Inter'] text-sm leading-relaxed">
                ⚠️ <strong>Solo los administradores</strong> pueden acceder a la configuración del sistema, 
                gestión de operarios, parámetros de calidad y estaciones VisionQA.
              </p>
              <p className="text-[#a1a1aa] font-['Inter'] text-sm mt-3">
                Si necesitas realizar cambios administrativos, contacta al supervisor de turno.
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => window.history.back()}
                className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-['Space_Grotesk'] font-bold py-4 px-6 rounded-lg transition-colors"
              >
                VOLVER ATRÁS
              </button>
              <button
                onClick={() => window.location.href = "/dashboard"}
                className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-gray-700 text-white font-['Space_Grotesk'] font-bold py-4 px-6 rounded-lg transition-colors"
              >
                IR AL DASHBOARD
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
