import { useState } from "react";
import { HelpCircle, X, ChevronDown, ChevronUp, Wifi, WifiOff, AlertTriangle, Camera, CheckCircle } from "lucide-react";

export function HelpCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      category: "OPERACIÓN DEL SISTEMA",
      icon: Camera,
      question: "¿Cómo inicio una nueva inspección de lote?",
      answer: "PASO A PASO:\n\n1. En la pantalla de Login, ingresa tu CARNET DE OPERARIO (8 dígitos)\n2. Si olvidaste el carnet, presiona 'OLVIDO CARNET' y espera autorización del supervisor\n3. Una vez autenticado, llegarás al DASHBOARD DE INSPECCIÓN\n4. En la barra superior verás 'LOTE: LT-2024-XXX' (se carga automáticamente)\n5. La transmisión comienza EN VIVO inmediatamente\n6. El sistema detecta defectos en tiempo real con YOLOv8\n7. Monitorea el SEMÁFORO DE ESTADO (verde/amarillo/rojo) en el panel derecho\n\nNOTA: No necesitas presionar 'Iniciar' - la inspección comienza automáticamente al ingresar."
    },
    {
      id: 2,
      category: "OPERACIÓN DEL SISTEMA",
      icon: CheckCircle,
      question: "¿Qué significan los colores del semáforo de estado?",
      answer: "SEMÁFORO DE 3 LUCES (ubicado en panel derecho):\n\n🟢 LUZ VERDE - \"VÁLIDO\"\n• Tasa de defectos: < 1.0%\n• El lote CUMPLE con AQL 1.0% (ISO 2859-1)\n• Puedes continuar sin preocupaciones\n\n🟡 LUZ AMARILLA - \"ADVERTENCIA\"\n• Tasa de defectos: entre 1.0% y 2.5%\n• El lote está cerca del límite crítico\n• ACCIÓN: Verifica que no haya falsos positivos reportándolos\n\n🔴 LUZ ROJA - \"RECHAZADO\"\n• Tasa de defectos: > 2.5%\n• El lote NO CUMPLE con AQL y será rechazado\n• ACCIÓN: Al presionar 'PARAR', el certificado mostrará RECHAZO automático\n\nEl semáforo actualiza en tiempo real según las unidades inspeccionadas."
    },
    {
      id: 3,
      category: "OPERACIÓN DEL SISTEMA",
      icon: AlertTriangle,
      question: "¿Cuándo debo usar el botón 'PARAR' vs 'PAUSAR'?",
      answer: "BOTONES EN PANEL LATERAL DERECHO:\n\n🟡 BOTÓN 'PAUSAR' (amarillo con ícono ||):\n• Detiene TEMPORALMENTE la inspección\n• Los datos NO se pierden\n• Cambia a 'REANUDAR' (ícono ▶)\n• ÚSALO PARA: Limpiar lente, ajustar banda, verificar muestra\n• La telemetría se pausa en el último registro\n\n🔴 BOTÓN 'PARAR' (rojo con ícono ■):\n• FINALIZA completamente la inspección del lote\n• Abre modal de confirmación mostrando: Total de unidades, Defectos, Tasa\n• Al confirmar, genera CERTIFICADO ISO 2859-1 automáticamente\n• Te redirige a la pantalla 'TICKET DE CIERRE'\n• NO puedes reanudar - el lote se cierra permanentemente\n\nÚSALO SOLO CUANDO:\n✅ El lote esté completo\n✅ Necesites generar el certificado de calidad\n✅ Haya emergencia crítica (daño severo al sistema)"
    },
    {
      id: 4,
      category: "FALSOS POSITIVOS",
      icon: AlertTriangle,
      question: "¿Qué es un falso positivo y cómo lo reporto?",
      answer: "FALSO POSITIVO: El sistema marca un envase como defectuoso (aparece bounding box rojo) pero visualmente está correcto.\n\nPASOS PARA REPORTAR (panel derecho):\n\n1. Localiza el botón 'REPORTAR FALSO POSITIVO' (con ícono de triángulo)\n2. Verifica el ID_EVENTO mostrado (ej: #4492-AX)\n3. Presiona el botón - se abre modal de confirmación\n4. Selecciona la RAZÓN del falso positivo:\n   • Es Suciedad (Limpiable)\n   • Es Sombra/Reflejo  \n   • Falsa Alarma (Envase Perfecto)\n5. Presiona 'GUARDAR Y REANUDAR LÍNEA'\n\nEFECTO INMEDIATO:\n✅ El contador de defectos se ajusta (-1 defecto)\n✅ La tasa de defectos se recalcula\n✅ El semáforo puede cambiar de rojo/amarillo a verde\n✅ El evento se registra en 'Registros' para análisis\n✅ La línea se reanuda automáticamente"
    },
    {
      id: 5,
      category: "FALSOS POSITIVOS",
      icon: Camera,
      question: "¿Por qué el sistema detecta reflejos o sombras como defectos?",
      answer: "CAUSAS COMUNES DE FALSOS POSITIVOS:\n\n💡 REFLEJOS DE LUZ:\n• Envases muy transparentes o brillantes reflejan luces LED\n• El modelo YOLOv8 puede confundir el reflejo con quemadura\n• Más común en envases PET transparentes\n\n☁️ SOMBRAS EN LA BANDA:\n• Objetos cercanos proyectan sombras sobre los envases\n• Se detectan como rayas o manchas oscuras\n• Más frecuente cuando la banda se detiene bruscamente\n\n🔍 LENTE SUCIO:\n• Polvo o residuos en la cámara CAM_04_LÍNEA_NORTE\n• Genera artefactos en la imagen\n• Revisa el indicador 'FPS' en esquina inferior izquierda (debe ser ~60)\n\nSOLUCIÓN:\n1. REPORTA el falso positivo inmediatamente\n2. Si es RECURRENTE (3+ veces en 10 min):\n   • Presiona 'PAUSAR'\n   • Limpia el lente con paño de microfibra\n   • Verifica iluminación de la estación\n   • Presiona 'REANUDAR'\n3. Si persiste: Usa el botón de EMERGENCIA (triángulo rojo en header) y solicita mantenimiento"
    },
    {
      id: 6,
      category: "CAÍDAS DE INTERNET",
      icon: WifiOff,
      question: "¿Qué hago si se cae la conexión a internet durante la inspección?",
      answer: "✅ LA INSPECCIÓN CONTINÚA SIN PROBLEMAS\n\nVisionQA funciona 100% OFFLINE durante la inspección activa:\n\n🟢 LO QUE SIGUE FUNCIONANDO:\n• Detección de defectos en tiempo real (YOLOv8 local)\n• Semáforo de estado (verde/amarillo/rojo)\n• Contador de unidades/hora\n• Telemetría en vivo (panel inferior derecho)\n• Botones PAUSAR/PARAR/REPORTAR FALSO POSITIVO\n• Generación de certificado ISO al presionar PARAR\n\n❌ LO QUE NO FUNCIONA:\n• Sincronización con servidor central\n• Notificaciones remotas a supervisores\n• Acceso a 'Reportes' de lotes anteriores (solo el actual)\n• Descarga de actualizaciones de modelo\n\nQUÉ HACER:\n1. NO hagas nada - continúa operando normalmente\n2. Los datos se guardan en la tablet localmente\n3. Cuando vuelva internet, verás un ícono de sincronización\n4. El sistema subirá automáticamente todos los registros\n\nCAPACIDAD OFFLINE: Hasta 50 lotes completos sin conexión"
    },
    {
      id: 7,
      category: "CAÍDAS DE INTERNET",
      icon: Wifi,
      question: "¿Se pierden los datos del lote actual si no hay internet?",
      answer: "NO. TODOS LOS DATOS SE GUARDAN LOCALMENTE.\n\n📊 DATOS PROTEGIDOS EN LA TABLET:\n• Estadísticas del lote (unidades, defectos, tasa)\n• Capturas de cada defecto detectado (bounding boxes)\n• ID_EVENTO de falsos positivos reportados\n• Registro de tiempo (timestamps en telemetría)\n• Operario asignado (ej: F. RODRIGUEZ)\n• Lote inspeccionado (ej: LT-2024-492)\n• Certificado ISO 2859-1 generado al presionar PARAR\n\nAL VOLVER LA CONEXIÓN:\n✅ Sincronización automática (sin intervención tuya)\n✅ Los datos aparecen en 'Reportes' → pestaña 'Auditoría'\n✅ El certificado se sube al servidor central\n✅ Los supervisores reciben notificaciones pendientes\n\nVERIFICACIÓN:\n• Ve a 'Registros' (botón en sidebar)\n• Busca tu lote por código (LT-2024-XXX)\n• Si tiene ícono de nube gris: Pendiente de sincronización\n• Si tiene ícono de check verde: Ya sincronizado\n\nNO cierres la tablet bruscamente - déjala sincronizar cuando vuelva internet."
    },
    {
      id: 8,
      category: "EMERGENCIAS",
      icon: AlertTriangle,
      question: "¿Cuándo debo presionar el botón de EMERGENCIA (triángulo rojo)?",
      answer: "BOTÓN DE EMERGENCIA (esquina superior derecha del header):\n\n⚠️ ÚSALO SOLO EN ESTOS CASOS CRÍTICOS:\n\n1. LOTE CRÍTICAMENTE DAÑADO:\n   • >10 defectos consecutivos en menos de 1 minuto\n   • Producto masivamente defectuoso desde el inicio\n   • El semáforo está en ROJO desde el inicio\n\n2. FALLO DEL SISTEMA:\n   • El FPS cae por debajo de 30 (visible en panel inferior izquierdo)\n   • La cámara deja de responder\n   • Aparece mensaje 'STREAM_ERROR'\n\n3. PELIGRO FÍSICO:\n   • Banda transportadora atascada con producto acumulándose\n   • Detección de humo/olor a quemado\n   • Objeto extraño cayó dentro del sistema de inspección\n\nQUÉ SUCEDE AL PRESIONARLO:\n🔴 Se detiene INMEDIATAMENTE la inspección\n🔴 Aparece modal 'ALERTA CRÍTICA - LÍNEA DETENIDA'\n🔴 Se genera reporte de emergencia automático\n🔴 El supervisor recibe notificación PUSH instantánea\n🔴 Te redirige al 'TICKET DE CIERRE' con estado EMERGENCIA\n\nNOTA: NO lo uses para pausas normales - usa el botón 'PAUSAR' amarillo en su lugar."
    }
  ];

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <>
      {/* Botón integrado en header - Se posiciona donde lo llames */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-[#3b82f6] hover:bg-[#2563eb] rounded-lg shadow-[0px_2px_10px_0px_rgba(59,130,246,0.4)] flex items-center justify-center transition-all hover:scale-105"
        aria-label="Centro de Ayuda"
      >
        <HelpCircle size={24} className="text-white" />
      </button>

      {/* Panel Lateral de Ayuda */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ margin: 0, padding: 0 }}
        >
          {/* Overlay - Click para cerrar */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-xl" 
            onClick={() => setIsOpen(false)}
            style={{ zIndex: 1 }}
          />
          
          {/* Modal Panel - Centrado */}
          <div 
            className="relative bg-[#0e0e0e] border-4 border-[#3b82f6] rounded-2xl shadow-[0px_0px_100px_0px_rgba(59,130,246,0.8)] overflow-hidden flex flex-col"
            style={{ 
              width: '90vw', 
              maxWidth: '1000px', 
              height: '95vh',
              maxHeight: '1200px',
              zIndex: 2,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Panel */}
            <div className="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] border-b-4 border-[#60a5fa] px-8 py-6 flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <HelpCircle size={28} className="text-white" />
                </div>
                <div>
                  <h2 className="text-white font-['Space_Grotesk'] font-bold text-3xl mb-1">
                    CENTRO DE AYUDA
                  </h2>
                  <p className="text-[#bfdbfe] font-['Inter'] text-base">
                    Guías rápidas para operarios de piso
                  </p>
                </div>
              </div>
            </div>

            {/* Contenido Scrollable */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6" style={{ scrollbarWidth: 'thin' }}>
              {/* Intro Banner */}
              <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-l-4 border-[#3b82f6] rounded-lg p-5">
                <h3 className="text-white font-['Space_Grotesk'] font-bold text-lg mb-2">
                  📖 Preguntas Frecuentes
                </h3>
                <p className="text-[#a1a1aa] font-['Inter'] text-sm">
                  Haz clic en cualquier pregunta para expandir la respuesta detallada. Estas guías fueron diseñadas para entornos industriales rudos sin acceso a internet.
                </p>
              </div>

              {/* FAQs by Category */}
              {["OPERACIÓN DEL SISTEMA", "FALSOS POSITIVOS", "CAÍDAS DE INTERNET", "EMERGENCIAS"].map((category) => (
                <div key={category} className="space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-[#3b82f6] to-transparent" />
                    <h4 className="text-[#3b82f6] font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wider">
                      {category}
                    </h4>
                    <div className="h-[2px] flex-1 bg-gradient-to-l from-[#3b82f6] to-transparent" />
                  </div>

                  {faqs.filter(faq => faq.category === category).map((faq) => {
                    const Icon = faq.icon;
                    const isExpanded = expandedFAQ === faq.id;

                    return (
                      <div
                        key={faq.id}
                        className={`bg-[#1a1a1a] border-2 rounded-lg overflow-hidden transition-all ${
                          isExpanded ? "border-[#3b82f6]" : "border-gray-800"
                        }`}
                      >
                        <button
                          onClick={() => toggleFAQ(faq.id)}
                          className="w-full flex items-center justify-between p-5 hover:bg-[#2a2a2a] transition-colors"
                        >
                          <div className="flex items-center gap-4 flex-1 text-left">
                            <div className={`flex-shrink-0 p-3 rounded-lg ${
                              isExpanded ? "bg-[#3b82f6]/20" : "bg-gray-800"
                            }`}>
                              <Icon size={20} className={isExpanded ? "text-[#3b82f6]" : "text-gray-400"} />
                            </div>
                            <h5 className={`font-['Space_Grotesk'] font-bold text-base ${
                              isExpanded ? "text-[#3b82f6]" : "text-white"
                            }`}>
                              {faq.question}
                            </h5>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            {isExpanded ? (
                              <ChevronUp size={20} className="text-[#3b82f6]" />
                            ) : (
                              <ChevronDown size={20} className="text-gray-400" />
                            )}
                          </div>
                        </button>

                        {isExpanded && (
                          <div className="px-5 pb-5 pt-0">
                            <div className="bg-[#2a2a2a] rounded-lg p-5 border-l-4 border-[#3b82f6]">
                              <div className="text-[#d4d4d8] font-['Inter'] text-sm leading-relaxed whitespace-pre-line">
                                {faq.answer}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Footer Contact */}
              <div className="bg-gradient-to-r from-[#1e40af]/20 to-[#3b82f6]/20 border border-[#3b82f6] rounded-lg p-5 mt-8">
                <h4 className="text-white font-['Space_Grotesk'] font-bold text-lg mb-2">
                  ¿Necesitas más ayuda?
                </h4>
                <p className="text-[#a1a1aa] font-['Inter'] text-sm mb-4">
                  Si tu problema no está resuelto aquí, contacta al supervisor de turno o al equipo técnico.
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-['Space_Grotesk'] font-bold py-3 px-4 rounded transition-colors">
                    LLAMAR SUPERVISOR
                  </button>
                  <button className="flex-1 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-gray-700 text-white font-['Space_Grotesk'] font-bold py-3 px-4 rounded transition-colors">
                    SOPORTE TÉCNICO
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Fijo con Botón Cerrar */}
            <div className="bg-[#0e0e0e] border-t-2 border-[#1e40af] p-6 flex-shrink-0">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-[#1e40af] hover:bg-[#1d4ed8] border-2 border-[#60a5fa] text-white font-['Space_Grotesk'] font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:scale-[1.02] min-h-[56px]"
                aria-label="Cerrar Centro de Ayuda"
              >
                <X size={28} className="text-white" strokeWidth={3} />
                <span className="text-xl uppercase tracking-wider">CERRAR AYUDA</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}