Modifica CriticalAlertModal.tsx para limpiar los botones según
el tipo de emergencia, y asegúrate en DashboardInspeccion.tsx
que resolver una emergencia NUNCA genere PDF ni navegue a /cierre.

═══════════════════════════════════════════════════
PARTE 1 — BOTONES DEL MODAL SEGÚN causeType
═══════════════════════════════════════════════════

El modal recibe prop causeType. Según su valor, los botones
de acción deben ser:

── causeType === 'lente_sucio' ──────────────────────
Eliminar botones: "SILENCIAR ALARMA" y "LIMPIAR LENTE — STEP BY STEP"
Dejar UN SOLO botón abajo a la derecha:
  Texto: "REANUDAR TRANSMISIÓN"
  Color: bg-[#10b981] text-white
  Acción: onConfirm()  (que en el dashboard reanuda la inspección)

── causeType === 'muchos_defectos' ──────────────────
Eliminar botones: "RESOLVER Y REANUDAR" y cualquier botón de
"REPORTAR FALSO POSITIVO"
Dejar UN SOLO botón:
  Texto: "PAUSAR Y REVISAR ENVASE"
  Color: bg-[#f59e0b] text-black
  Acción: onRevisarEnvase()  (nueva prop opcional)

Dentro del SOP de muchos_defectos, agregar un mensaje de pausa
visible en el cuerpo del modal (entre los pasos y el botón):
  div con bg-[#f59e0b]/10 border border-[#f59e0b] rounded p-3:
  "⏸ INSPECCIÓN PAUSADA — Se recomienda detener la banda físicamente
   y revisar el último envase antes de reanudar"

── causeType === 'calibracion_perdida' ──────────────
Eliminar botones: "IR A RECALIBRAR AHORA" y "RESOLVER Y REANUDAR"
Dejar UN SOLO botón:
  Texto: "RECALIBRAR CÁMARA"
  Color: bg-[#3b82f6] text-white
  Acción: onRecalibrar()  (ya existe como prop)

── causeType === 'parada_manual' ────────────────────
Este botón eliminarlo, la para manual solo se va a realizar desde el botón ya existente de pausar

── causeType === 'general' o undefined ──────────────
Mantener los dos botones originales del modal sin cambios.

Agrega la nueva prop al tipo:
  onRevisarEnvase?: () => void

═══════════════════════════════════════════════════
PARTE 2 — DashboardInspeccion.tsx: resolver sin PDF
═══════════════════════════════════════════════════

Agrega la función handleRevisarEnvase:
  const handleRevisarEnvase = () => {
    setIsPaused(true)
    setIsRunning(false)
    // El modal ya muestra el mensaje de pausa internamente
    // Al hacer clic en el botón del modal, el modal se cierra
    // y la inspección queda pausada. El operario la reanuda
    // manualmente con el botón REANUDAR del aside.
    if (alertaActivaDesde !== null) {
      const defsDuranteAlerta = defectos - alertaActivaDesde
      setDefectosEnAlerta(prev => prev + defsDuranteAlerta)
      setAlertaActivaDesde(null)
    }
    notificarSupervisor({
      tipo: 'PARADA_EMERGENCIA',
      causa: 'Muchos defectos detectados — Operario pausó para revisión manual',
      operario: user?.nombre ?? 'OPERARIO',
      lote: loteData?.numeroLote ?? 'LT-SIN-DATOS',
      hora: new Date().toLocaleTimeString('es-AR', {hour12: false}),
      linea: 'LÍNEA_04'
    })
    setShowCriticalAlert(false)
  }

Pasa la prop al modal:
  onRevisarEnvase={handleRevisarEnvase}

VERIFICAR Y CORREGIR: En handleCriticalConfirm para causeType
'lente_sucio', la acción debe ser SOLO:
  setShowCriticalAlert(false)
  setIsRunning(true)
  setIsPaused(false)
  // registrar resolución
  notificarSupervisor({ tipo: 'PARADA_EMERGENCIA', 
    causa: 'Lente limpiado — inspección reanudada', ... })
  
  NO debe llamar navigate('/cierre') ni completeInspection() bajo
  ninguna circunstancia. Verifica que esto sea así.

Para causeType 'calibracion_perdida', al terminar la recalibración
inline (cuando el operario presiona "CALIBRACIÓN COMPLETA — REANUDAR"):
  setShowRecalibracion(false)
  setIsRunning(true)
  setIsPaused(false)
  notificarSupervisor({ tipo: 'RECALIBRACION',
    causa: 'Recalibración completada — inspección reanudada', ... })
  
  NO navegar a /cierre.

REGLA ABSOLUTA: navigate('/cierre') y completeInspection() SOLO
pueden llamarse desde handleStop (el que viene de StopInspectionModal
cuando el operario presiona PARAR y confirma). Ninguna otra función
puede invocarlos. Revisa todo el archivo y elimina cualquier otra
llamada a navigate('/cierre') que no venga de handleStop.

═══════════════════════════════════════════════════
PARTE 3 — FINALIZAR TURNO: logout sin reporte
═══════════════════════════════════════════════════

En SidebarVisionQA.tsx, el botón "Cerrar Sesión" debe cambiar para:
1. Verificar si hay una inspección activa leyendo localStorage:
   const flowState = localStorage.getItem('visionqa_flowState')
   if (flowState === 'INSPECTING') {
     // Mostrar mensaje: no puedes cerrar sesión con inspección activa
     // Usar showConfirm si está disponible, o alert simple
     return
   }
2. Si no hay inspección activa: llamar logout() y navigate('/')
3. NO generar ningún reporte al cerrar sesión

El reporte PDF SOLO se genera desde TicketCierre cuando el operario
llega ahí después de confirmar el StopInspectionModal.