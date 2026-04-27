import { useState } from "react";
import { useNavigate } from "react-router";
import { Flame, Slash, X } from "lucide-react";
import { useInspectionFlow } from "../contexts/InspectionFlowContext";

export function ResumenPreInspeccion() {
  const navigate = useNavigate();
  const { startInspection } = useInspectionFlow();

  const handleStart = () => {
    startInspection();
    navigate("/inspeccion");
  };

  const defectos = [
    {
      id: "quemadura",
      title: "Quemadura Térmica",
      description: "Deformación por calor en el sellado",
      severity: "crítico",
      Icon: Flame,
    },
    {
      id: "raya",
      title: "Raya Profunda",
      description: "Daño estructural mayor a 2mm",
      severity: "medio",
      Icon: Slash,
    },
    {
      id: "tapa",
      title: "Tapa Defectuosa",
      description: "Rosca mal ajustada o sello roto",
      severity: "crítico",
      Icon: X,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <div className="bg-[rgba(30,64,175,0.8)] border-b border-[#3b82f6] px-6 py-8 md:py-10 text-center flex flex-col items-center justify-center">
        <div className="bg-[#3b82f6]/20 text-[#60a5fa] border border-[#3b82f6]/50 rounded-full px-4 py-1.5 text-sm font-bold tracking-widest uppercase mb-4">
          CRITERIOS
        </div>
        <h1 className="text-white text-3xl md:text-5xl font-['Space_Grotesk'] font-bold uppercase tracking-tight mb-2">
          CRITERIOS DE ANÁLISIS
        </h1>
        <p className="text-[#93c5fd] font-['Inter'] text-sm md:text-base">
          Revisa los criterios de defecto antes de iniciar la inspección
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12 flex flex-col justify-center">
        
        {/* Tarjetas de Defectos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-12">
          {defectos.map((defecto) => {
            return (
              <div 
                key={defecto.id} 
                className={`bg-[#1a1a1a] border-2 rounded-lg p-6 flex flex-col relative ${
                  defecto.severity === 'crítico' 
                    ? 'border-[#ef4444] shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                    : 'border-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                }`}
              >
                <div className="flex flex-row items-center text-left gap-5">
                  <div className={`p-4 rounded-full flex-shrink-0 ${
                    defecto.severity === 'crítico' 
                      ? 'bg-[#ef4444]/10 text-[#ef4444]' 
                      : 'bg-[#f59e0b]/10 text-[#f59e0b]'
                  }`}>
                    <defecto.Icon size={40} />
                  </div>
                  <div className="flex flex-col justify-center pr-8">
                    <h2 className="font-['Space_Grotesk'] font-bold text-[24px] leading-tight mb-1 text-white">
                      {defecto.title}
                    </h2>
                    <p className="text-[#71717a] font-['Inter'] text-[13px] line-clamp-2">
                      {defecto.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Acciones */}
        <div className="w-full max-w-lg mx-auto flex flex-col items-center">
          <button
            onClick={handleStart}
            className="w-full font-['Space_Grotesk'] font-bold rounded-lg py-6 text-xl md:text-2xl transition-all flex items-center justify-center gap-3 bg-[#10b981] hover:bg-[#059669] text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            ✓ ENTENDIDO — INICIAR INSPECCIÓN
          </button>
          
          <p className="text-[#a1a1aa] font-['Inter'] text-sm text-center mt-4">
            Confirma que conoces los criterios antes de iniciar
          </p>
        </div>

      </div>
    </div>
  );
}