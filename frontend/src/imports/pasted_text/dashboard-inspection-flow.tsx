Hay un problema crítico de flujo en DashboardInspeccion.tsx: cuando el 
operario confirma una alerta de emergencia, el sistema navega a /cierre 
y genera el certificado del lote como si la inspección hubiera terminado. 
Eso está incorrecto. Necesito que ese flujo cambie completamente.

═══════════════════════════════════════════════════
PARTE 1 — SEPARAR "RESOLVER ALERTA" DE "FIN DE INSPECCIÓN"
═══════════════════════════════════════════════════

REGLA FUNDAMENTAL:
- navegar a /cierre SOLO debe ocurrir cuando el operario presiona PARAR 
  y confirma el StopInspectionModal.
- El CriticalAlertModal NUNCA debe llevar a /cierre directamente.
- Después de resolver una alerta, la inspección CONTINÚA.

CAMBIOS EN DashboardInspeccion.tsx:

1. La función handleCriticalConfirm que actualmente hace navigate('/cierre') 
   debe cambiar completamente. El nuevo comportamiento según causeType:

   Si causeType === 'lente_sucio':
   → No navegar. Simplemente: setShowCriticalAlert(false), 
     setIsRunning(true), setIsPaused(false)
   → Agregar al log de eventos: "Lente limpiado — inspección reanudada"

   Si causeType === 'muchos_defectos':
   → No navegar. Simplemente: setShowCriticalAlert(false),
     setIsRunning(true), setIsPaused(false)
   → Agregar al log: "Alerta de defectos revisada — inspección reanudada"

   Si causeType === 'calibracion_perdida':
   → No navegar. Abrir el modal de recalibración inline en su lugar:
     setShowCriticalAlert(false), setShowRecalibracion(true)
   → Agregar al log: "Recalibración iniciada desde alerta"

   Si causeType === 'parada_manual' o undefined:
   → Este es el ÚNICO caso donde puede navegar, pero solo si el operario 
     lo decide explícitamente. En lugar de navegar directo, cerrar el 
     CriticalAlertModal y abrir el StopInspectionModal:
     setShowCriticalAlert(false), setShowStopModal(true)
   → El StopInspectionModal es quien tiene el botón de confirmar fin 
     y quien llama a navigate('/cierre') al confirmar.

2. Los botones del CriticalAlertModal deben renombrarse:
   - Botón izquierdo "SILENCIAR ALARMA": cambia texto a 
     "RESOLVER Y REANUDAR" — llama a onConfirm() (que ahora reanuda)
   - Botón derecho (el azul grande): según causeType:
     * lente_sucio → "LIMPIAR LENTE — STEP BY STEP" → llama onConfirm()
     * muchos_defectos → "REPORTAR FALSO POSITIVO" → llama onConfirm()
     * calibracion_perdida → "IR A RECALIBRAR" → llama onRecalibrar()
     * parada_manual → "VER RESUMEN Y DETENER" → llama onConfirm() 
       (que abrirá StopInspectionModal)
     * general → "RESOLVER Y CONTINUAR" → llama onConfirm()

3. handleStop (el StopInspectionModal) es el ÚNICO punto donde se llama:
   completeInspection(total, defectos) y luego navigate('/cierre')
   Esto ya debe existir. Verificar que sea así y no haya otro navigate('/cierre').

═══════════════════════════════════════════════════
PARTE 2 — REGISTRO DE EVENTOS DE PARADA PARA AQL JUSTO
═══════════════════════════════════════════════════

El problema del AQL: cuando ocurre una emergencia y se detectan muchos 
defectos, esos defectos pueden inflar artificialmente la tasa de defectos 
del lote. Necesitamos separar defectos "normales" de defectos durante 
"eventos de alerta".

CAMBIOS EN DashboardInspeccion.tsx:

1. Agrega estos nuevos estados:
   const [defectosEnAlerta, setDefectosEnAlerta] = useState(0)
   const [eventosDeAlerta, setEventosDeAlerta] = useState<Array<{
     tipo: string,
     inicio: number,
     fin: number | null,
     defectosRegistrados: number
   }>>([])
   const [alertaActivaDesde, setAlertaActivaDesde] = useState<number | null>(null)

2. Cuando se activa handleEmergencyStop():
   setAlertaActivaDesde(defectos)  // guarda el contador en el momento de la alerta

3. Cuando se resuelve la alerta (en handleCriticalConfirm):
   if (alertaActivaDesde !== null) {
     const defsDuranteAlerta = defectos - alertaActivaDesde
     setDefectosEnAlerta(prev => prev + defsDuranteAlerta)
     setEventosDeAlerta(prev => [...prev, {
       tipo: causeType ?? 'general',
       inicio: alertaActivaDesde,
       fin: defectos,
       defectosRegistrados: defsDuranteAlerta
     }])
     setAlertaActivaDesde(null)
   }

4. Calcula una tasa de defectos "ajustada" para el AQL final:
   const defectosAQL = Math.max(0, defectos - defectosEnAlerta)
   const defectRateAQL = ((defectosAQL / total) * 100).toFixed(1)
   
   Muestra en el panel derecho del dashboard, en el bloque de métricas 
   detalladas, una línea adicional:
   - Label: "Defectos para AQL" en color #71717a  
   - Valor: defectosAQL con texto gris (diferente al total de defectos)
   - Si defectosEnAlerta > 0, mostrar también:
     "(-{defectosEnAlerta} excluidos de alertas)" en text-xs #52525b

5. En handleStop, cuando se llama completeInspection, pasar los valores 
   ajustados en lugar de los brutos:
   completeInspection(total, defectosAQL)
   
   Esto hace que el TicketCierre y el certificado ISO usen la tasa de 
   defectos correcta que no está inflada por las alertas.

═══════════════════════════════════════════════════
PARTE 3 — MOSTRAR HISTORIAL DE ALERTAS EN EL TICKET DE CIERRE
═══════════════════════════════════════════════════

En TicketCierre.tsx, después de la sección "RESULTADOS DE INSPECCIÓN" 
y antes de "DECISIÓN: LOTE APROBADO/RECHAZADO", agrega una sección 
condicional que aparece SOLO si hubo eventos de alerta durante la 
inspección (es decir, si inspectionStats tiene información de alertas).

Para pasar esta información, en InspectionFlowContext.tsx agrega al 
tipo InspectionStats:
  eventosDeAlerta?: number   // cantidad de eventos de alerta ocurridos
  defectosExcluidos?: number // defectos excluidos del AQL por alertas

Y en completeInspection, agrega estos campos al objeto stats que se guarda.

Para pasar los valores desde DashboardInspeccion al contexto, modifica 
la llamada:
  completeInspection(total, defectosAQL, eventosDeAlerta.length, defectosEnAlerta)

Actualiza la firma de completeInspection en InspectionFlowContext para 
aceptar estos parámetros adicionales opcionales.

En TicketCierre, si inspectionStats.eventosDeAlerta > 0, mostrar:

Sección con fondo bg-[#1a1a1a] border border-[#f59e0b] rounded-lg p-4:
  - Título: "EVENTOS DURANTE INSPECCIÓN" en amarillo #f59e0b, 
    font-['Space_Grotesk'] font-bold text-xs uppercase
  - Fila: "Alertas activadas: {eventosDeAlerta}" en text-sm
  - Fila: "Defectos durante alertas: {defectosExcluidos} 
    (excluidos del cálculo AQL)" en text-sm text-[#a1a1aa]
  - Fila: "Defectos válidos para AQL: {total - defectosExcluidos}" 
    en text-sm text-white font-bold
  - Nota final en text-xs text-[#71717a]: 
    "Los defectos registrados durante eventos de alerta no penalizan 
    el resultado del lote según protocolo interno VisionQA v2.1"

Esto hace que el certificado sea honesto: muestra todos los números 
pero explica que los defectos de alertas están excluidos del AQL, 
protegiendo al lote de una calificación injusta.

═══════════════════════════════════════════════════
RESUMEN DE FLUJO CORRECTO DESPUÉS DE ESTOS CAMBIOS:
═══════════════════════════════════════════════════

Alerta de emergencia → CriticalAlertModal abre
  → Operario lee el SOP
  → Presiona botón de acción (limpiar lente / recalibrar / revisar envase)
  → Modal se cierra → Inspección CONTINÚA automáticamente
  → Los defectos durante la alerta se registran pero se excluyen del AQL

Fin real de inspección:
  → Operario presiona PARAR
  → StopInspectionModal muestra resumen (con defectos ajustados)
  → Operario confirma → navigate('/cierre')
  → TicketCierre muestra certificado con AQL justo

NUNCA debe existir otro navigate('/cierre') fuera del handleStop 
que viene del StopInspectionModal.

Mantén TypeScript estricto, no rompas imports existentes, y usa los 
contextos y componentes ya existentes en el proyecto.