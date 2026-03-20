import { useRouteError, useNavigate } from "react-router";
import { AlertTriangle, Home } from "lucide-react";

export function ErrorBoundary() {
  const error = useRouteError() as any;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-[#1c1b1b] border border-red-900/30 rounded-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          <AlertTriangle size={48} className="text-red-500" />
          <div>
            <h1 className="text-white font-['Space_Grotesk'] font-bold text-3xl">
              Error del Sistema
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {error?.status === 404 ? "Página no encontrada" : "Ha ocurrido un error"}
            </p>
          </div>
        </div>

        {error?.statusText && (
          <div className="bg-red-950/20 border border-red-900/30 rounded p-4 mb-6">
            <p className="text-red-400 font-['Liberation_Mono'] text-sm">
              {error.statusText}
            </p>
            {error?.data && (
              <p className="text-gray-500 text-xs mt-2 font-['Liberation_Mono']">
                {error.data.toString()}
              </p>
            )}
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded flex items-center justify-center gap-3 transition-colors"
        >
          <Home size={20} />
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}
