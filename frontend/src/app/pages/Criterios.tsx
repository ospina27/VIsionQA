import { SidebarVisionQA } from "../components/SidebarVisionQA";
import { ChevronLeft, ChevronRight, AlertTriangle, CheckCircle, Camera, BookOpen } from "lucide-react";

export function Criterios() {
  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <SidebarVisionQA active="criterios" />
      
      <div className="flex-1 flex flex-col ml-64 pt-16">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 h-16 backdrop-blur-xl bg-[rgba(30,64,175,0.8)] border-b-2 border-[rgba(59,130,246,0.3)] shadow-[0px_0px_30px_0px_rgba(59,130,246,0.2)] flex items-center justify-between px-6 z-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-white font-['Space_Grotesk'] font-bold text-lg">
                VisionQA
              </div>
              <div className="bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] rounded-sm px-2 py-0.5">
                <div className="text-[#3b82f6] font-['Inter'] font-bold text-[10px]">
                  DICCIONARIO_VISUAL
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white font-['Space_Grotesk'] font-bold px-6 py-3 rounded transition-colors">
              <Camera size={18} />
              ESCANEAR NUEVO
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-8">
          <div className="grid grid-cols-[1fr_auto] gap-8">
            {/* Main Content */}
            <div className="space-y-8">
              {/* Header Section */}
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-6">
                <div className="flex items-center gap-4 mb-2">
                  <BookOpen size={32} className="text-[#3b82f6]" />
                  <h1 className="text-white font-['Space_Grotesk'] font-bold text-3xl">
                    GUÍA DE DEFECTOS
                  </h1>
                  <span className="px-4 py-2 bg-[#10b981]/20 text-[#10b981] text-sm font-bold rounded border border-[#10b981]">
                    MODO_ACTIVO
                  </span>
                </div>
                <p className="text-[#71717a] font-['Inter'] text-sm">
                  CATEGORÍA: INYECCIÓN_PLÁSTICA // Norma ISO-9001-2024
                </p>
              </div>

              {/* Defect Examples */}
              <div className="grid grid-cols-2 gap-8">
                {/* Aceptable */}
                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg overflow-hidden">
                  <div className="relative">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-4 py-2 bg-[#f59e0b] text-black font-bold rounded inline-block">
                        ACEPTABLE
                      </span>
                    </div>
                    <div className="bg-[#2a2a2a] aspect-square flex items-center justify-center border-b-2 border-gray-700">
                      <span className="text-gray-500 font-['Inter'] text-sm">[Imagen de ejemplo]</span>
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <h3 className="text-white font-['Space_Grotesk'] font-bold text-2xl">
                      QUEMADURA ACEPTABLE
                    </h3>
                    <p className="text-[#a1a1aa] font-['Inter'] text-base leading-relaxed">
                      Defecto superficial. Coloración amarillenta o marrón leve que no excede 
                      los 2mm de diámetro. Sin deformación estructural en el sellado.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-[#2a2a2a] border border-gray-700 rounded text-sm font-bold text-[#f59e0b]">
                          DIÁMETRO &lt; 2MM
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-[#2a2a2a] border border-gray-700 rounded text-sm font-bold text-[#f59e0b]">
                          PROF_CERO
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Crítica */}
                <div className="bg-[#1a1a1a] border-2 border-[#ef4444] rounded-lg overflow-hidden">
                  <div className="relative">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-4 py-2 bg-[#ef4444] text-white font-bold rounded inline-block">
                        CRÍTICA
                      </span>
                    </div>
                    <div className="bg-[#2a2a2a] aspect-square flex items-center justify-center border-b-2 border-[#ef4444]">
                      <span className="text-gray-500 font-['Inter'] text-sm">[Imagen de ejemplo]</span>
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <h3 className="text-white font-['Space_Grotesk'] font-bold text-2xl">
                      QUEMADURA CRÍTICA
                    </h3>
                    <p className="text-[#a1a1aa] font-['Inter'] text-base leading-relaxed">
                      Carbonización severa. Presencia de hollín o perforación por exceso 
                      térmico. Compromete la integridad del envase y la inocuidad del contenido.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-[#ef4444]/20 border border-[#ef4444] rounded text-sm font-bold text-[#ef4444]">
                          RECHAZO_INMEDIATO
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-[#ef4444]/20 border border-[#ef4444] rounded text-sm font-bold text-[#ef4444]">
                          HOLLÍN_DETECTADO
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-center gap-6">
                <button className="px-10 py-6 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-gray-700 text-white font-['Space_Grotesk'] font-bold rounded-lg flex items-center gap-3 transition-colors min-h-[80px]">
                  <ChevronLeft size={28} />
                  ANTERIOR CRITERIO
                </button>
                <button className="px-10 py-6 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-gray-700 text-white font-['Space_Grotesk'] font-bold rounded-lg flex items-center gap-3 transition-colors min-h-[80px]">
                  SIGUIENTE CRITERIO
                  <ChevronRight size={28} />
                </button>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="w-96 space-y-8">
              {/* Normativa */}
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-8 space-y-6">
                <h3 className="text-white font-['Space_Grotesk'] font-bold text-2xl">
                  NORMATIVA DE CALIDAD
                </h3>
                
                <div className="border-l-4 border-[#f59e0b] pl-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-[#10b981]" />
                    <span className="text-white font-['Space_Grotesk'] font-bold">ISO-9001-2024</span>
                  </div>
                  <h4 className="text-white font-['Space_Grotesk'] font-bold text-lg">
                    PROTOCOLO DE INYECCIÓN TÉRMICA
                  </h4>
                  <p className="text-[#a1a1aa] font-['Inter'] text-sm leading-relaxed">
                    Toda pieza con marcas de quemado nivel 2 (Aceptable) debe ser segregada 
                    para inspección manual aleatoria (AQL 0.65).
                  </p>
                </div>

                <div className="border-l-4 border-[#ef4444] pl-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <AlertTriangle size={20} className="text-[#ef4444]" />
                    <span className="text-white font-['Space_Grotesk'] font-bold">ALERTA_PARO</span>
                  </div>
                  <h4 className="text-white font-['Space_Grotesk'] font-bold text-lg">
                    UMBRAL DE DEFECTO CRÍTICO
                  </h4>
                  <p className="text-[#a1a1aa] font-['Inter'] text-sm leading-relaxed">
                    La detección de 3 unidades consecutivas con "Quemadura Crítica" requiere 
                    el paro inmediato de la línea 04 y recalibración de boquillas.
                  </p>
                </div>
              </div>

              {/* Checklist */}
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-8 space-y-6">
                <h3 className="text-white font-['Space_Grotesk'] font-bold text-xl">
                  CHECKLIST DE OPERADOR
                </h3>
                
                <div className="space-y-4">
                  <label className="flex items-center gap-4 p-4 bg-[#0a0a0a] border border-gray-700 rounded cursor-pointer hover:bg-[#151515] transition-colors min-h-[64px]">
                    <input 
                      type="checkbox" 
                      className="w-6 h-6 rounded border-2 border-gray-600"
                      defaultChecked
                    />
                    <span className="text-white font-['Inter'] text-base">
                      VERIFICAR PRESIÓN DE CÁMARA
                    </span>
                  </label>

                  <label className="flex items-center gap-4 p-4 bg-[#0a0a0a] border border-gray-700 rounded cursor-pointer hover:bg-[#151515] transition-colors min-h-[64px]">
                    <input 
                      type="checkbox" 
                      className="w-6 h-6 rounded border-2 border-gray-600"
                      defaultChecked
                    />
                    <span className="text-white font-['Inter'] text-base">
                      LIMPIAR SENSORES DE VISIÓN
                    </span>
                  </label>

                  <label className="flex items-center gap-4 p-4 bg-[#0a0a0a] border border-gray-700 rounded cursor-pointer hover:bg-[#151515] transition-colors min-h-[64px]">
                    <input 
                      type="checkbox" 
                      className="w-6 h-6 rounded border-2 border-gray-600"
                    />
                    <span className="text-white font-['Inter'] text-base">
                      CONFIRMAR LOTE DE RESINA
                    </span>
                  </label>
                </div>
              </div>

              {/* Análisis de Tendencias */}
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-['Space_Grotesk'] font-bold text-xl">
                    ANÁLISIS DE TENDENCIAS
                  </h3>
                  <div className="w-3 h-3 bg-[#ef4444] rounded-full animate-pulse" />
                </div>
                
                <div className="space-y-2">
                  <div className="text-[#71717a] font-['Inter'] text-sm">
                    VARIACIÓN TÉRMICA DETECTADA EN LOS ÚLTIMOS 90 MIN.
                  </div>
                  
                  <div className="h-32 flex items-end gap-2">
                    {[45, 55, 68, 72, 85, 92, 98].map((height, i) => (
                      <div 
                        key={i}
                        className={`flex-1 rounded-t transition-all ${
                          i === 6 ? 'bg-[#ef4444]' : 'bg-[#3b82f6]'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
