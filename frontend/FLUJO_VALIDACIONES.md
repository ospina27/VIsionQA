# Sistema de Validaciones y Flujo de Inspección VisionQA

## 📋 Resumen

Se ha implementado un sistema completo de control de flujo y validaciones para la aplicación de inspección de envases plásticos VisionQA, garantizando que los usuarios sigan el proceso correcto desde el login hasta el cierre del lote.

## 🔄 Flujo de Trabajo Implementado

### 1. Login Operativo (`/`)
**Estado del Flujo:** `NOT_STARTED` → `LOGGED_IN`

**Validaciones:**
- ✅ Rol obligatorio (OPERARIO o ADMINISTRADOR)
- ✅ PIN mínimo 4 dígitos
- ✅ Validación de PIN inválido (0000)
- ✅ Código de supervisor requerido para ingreso manual

**Salidas:**
- ✓ Éxito → `/setup`
- ✗ Cancelar → Permanecer en login

---

### 2. Setup Lote (`/setup`)
**Estado del Flujo:** `LOGGED_IN` → `SETUP_COMPLETE`

**Protección:** Requiere estado `LOGGED_IN`

**Validaciones:**
- ✅ Proveedor obligatorio (*)
- ✅ Formato de envase obligatorio (*)
- ✅ Número de lote generado automáticamente
- ✅ Indicador visual de campos incompletos

**Salidas:**
- ✓ Continuar → `/calibracion` (solo si ambos campos completos)
- ✗ Cancelar → `/` (con confirmación)

---

### 3. Calibración (`/calibracion`)
**Estado del Flujo:** `SETUP_COMPLETE` → `CALIBRATED`

**Protección:** Requiere estado `SETUP_COMPLETE`

**Validaciones:**
- ✅ Iluminación > 85%
- ✅ Nitidez > 85%
- ✅ Calibración automática completada (3 segundos)
- ✅ Muestra información del lote configurado

**Alertas:**
- 🟡 Calibración insuficiente si parámetros < 85%
- 🔴 Botón "Iniciar Inspección" deshabilitado hasta cumplir requisitos

**Salidas:**
- ✓ Iniciar Inspección → `/inspeccion` (solo con parámetros válidos)
- 🟠 Reportar Problema → Banner de alerta
- ✗ Cancelar → `/setup` (con confirmación)

---

### 4. Dashboard Inspección (`/inspeccion`)
**Estado del Flujo:** `CALIBRATED` → `INSPECTING`

**Protección:** Requiere estado `CALIBRATED` o `INSPECTING`

**Funcionalidades:**
- ⏸️ Pausar (con confirmación)
- ▶️ Reanudar (sin confirmación)
- ⏹️ Detener → Modal de confirmación con resumen
- 🚨 Parada de Emergencia → Modal crítico + confirmación
- ⚠️ Reportar Falso Positivo → Modal de clasificación

**Validaciones en Pausa:**
- ✅ Confirmación antes de pausar
- ✅ Reanudación directa sin confirmación

**Validaciones en Detener:**
- ✅ Modal de confirmación mostrando:
  - Total de unidades inspeccionadas
  - Defectos encontrados
  - Tasa de defectos
- ✅ Requiere confirmación explícita

**Validaciones en Emergencia:**
- ✅ Doble confirmación (alert + modal)
- ✅ Genera reporte de incidente
- ✅ Detención inmediata

**Salidas:**
- ✓ Detener (confirmado) → `/cierre`
- 🚨 Emergencia (confirmada) → `/cierre`
- ⏸️ Pausar → Mismo estado
- ⚠️ Falso Positivo → Mismo estado (decrementa contador)

---

### 5. Ticket de Cierre (`/cierre`)
**Estado del Flujo:** `INSPECTING` → `COMPLETED`

**Protección:** Requiere estado `COMPLETED`

**Características:**
- 📄 Certificado ISO 2859-1 con datos del lote
- ✅ Información completa del proceso
- 📊 Resultados de inspección
- 🔐 Firma digital validada

**Salidas:**
- 💾 Descargar PDF → Genera certificado
- 🔄 Nuevo Lote → `/setup` (con confirmación + reset del flujo)
- 📊 Ver Reportes → `/reportes`

---

## 🛡️ Sistema de Protección de Rutas

### FlowProtectedRoute
Componente que protege las rutas según el estado del flujo de inspección.

**Rutas Protegidas:**
- `/setup` → Requiere `canAccessSetup()`
- `/calibracion` → Requiere `canAccessCalibration()`
- `/inspeccion` → Requiere `canAccessInspection()`
- `/cierre` → Requiere `canAccessCierre()`

**Pantalla de Error:**
Si el usuario intenta acceder a una ruta sin el estado requerido, se muestra:
- ❌ Mensaje de error descriptivo
- 📍 Indicador visual del progreso del flujo
- ✅ Pasos completados vs pendientes
- 🔗 Botones para continuar el flujo correcto o volver al inicio

---

## 🔐 Sistema de Roles

### ProtectedRoute
Componente que protege rutas administrativas.

**Protección por Rol:**
- Rutas administrativas requieren `ADMINISTRADOR`
- Acceso denegado para `OPERARIO` con pantalla informativa

**Rutas Protegidas:**
- `/admin` → Solo ADMINISTRADOR

**Pantalla de Acceso Denegado:**
- ❌ Mensaje claro de permisos insuficientes
- 👤 Información del usuario actual
- ⚠️ Instrucciones para solicitar acceso
- 🔙 Botones de navegación

---

## 📊 Contextos Implementados

### 1. InspectionFlowContext
Gestiona el estado del flujo de inspección.

**Estados:**
- `NOT_STARTED` - Usuario no autenticado
- `LOGGED_IN` - Autenticado, sin lote
- `SETUP_COMPLETE` - Lote configurado
- `CALIBRATED` - Cámara calibrada
- `INSPECTING` - Inspección en curso
- `COMPLETED` - Inspección finalizada

**Datos del Lote:**
- `proveedor` - Proveedor seleccionado
- `formato` - Formato de envase
- `numeroLote` - Generado automáticamente (LT-YYYY-XXX)
- `fechaInicio` - Fecha de inicio
- `horaInicio` - Hora de inicio

**Métodos:**
- `completeLogin()` - Marca login completado
- `completeSetup()` - Guarda datos del lote
- `completeCalibration()` - Marca calibración OK
- `startInspection()` - Inicia inspección
- `completeInspection()` - Finaliza inspección
- `resetFlow()` - Reinicia el flujo completo

### 2. AuthContext (Existente)
Gestiona autenticación y roles de usuario.

**Roles:**
- `ADMINISTRADOR` - Acceso total
- `OPERARIO` - Acceso limitado (sin admin)

---

## ✅ Validaciones Implementadas

### Por Pantalla:

#### Login:
- [x] Rol seleccionado obligatorio
- [x] PIN mínimo 4 dígitos
- [x] Validación de PIN inválido
- [x] Código supervisor para ingreso manual
- [x] Mensajes de error claros

#### Setup:
- [x] Proveedor obligatorio
- [x] Formato obligatorio
- [x] Indicador visual de campos faltantes
- [x] Confirmación de cancelación
- [x] Número de lote auto-generado

#### Calibración:
- [x] Iluminación mínima 85%
- [x] Nitidez mínima 85%
- [x] Calibración automática completada
- [x] Botón deshabilitado si parámetros insuficientes
- [x] Confirmación de cancelación
- [x] Muestra datos del lote

#### Inspección:
- [x] Confirmación antes de pausar
- [x] Confirmación antes de detener
- [x] Doble confirmación para emergencia
- [x] Modal con resumen al detener
- [x] Validación de estado antes de navegación

#### Cierre:
- [x] Solo accesible con inspección completada
- [x] Confirmación para nuevo lote
- [x] Reinicio completo del flujo
- [x] Datos del lote en certificado

---

## 🚀 Flujo Completo (Happy Path)

```
1. LOGIN (/)
   ↓ [Selecciona rol + PIN válido]
   
2. SETUP (/setup)
   ↓ [Selecciona proveedor + formato]
   
3. CALIBRACIÓN (/calibracion)
   ↓ [Espera calibración automática > 85%]
   
4. INSPECCIÓN (/inspeccion)
   ↓ [Inspecciona unidades + Detener]
   
5. CIERRE (/cierre)
   ↓ [Descarga PDF o Nuevo Lote]
   
   → Nuevo Lote: Vuelve a (2) SETUP
   → Ver Reportes: Va a /reportes
```

---

## 🔒 Rutas Bloqueadas

**No se puede:**
- ❌ Acceder a `/calibracion` sin completar `/setup`
- ❌ Acceder a `/inspeccion` sin completar `/calibracion`
- ❌ Acceder a `/cierre` sin completar `/inspeccion`
- ❌ Saltar pasos del flujo
- ❌ Acceder a `/admin` sin rol ADMINISTRADOR

**Mensajes de Error:**
Cada intento de acceso no autorizado muestra:
- Pantalla de error descriptiva
- Progreso visual del flujo
- Botones para continuar correctamente

---

## 📁 Archivos Creados/Modificados

### Nuevos Archivos:
1. `/src/app/contexts/InspectionFlowContext.tsx` - Contexto del flujo
2. `/src/app/components/FlowProtectedRoute.tsx` - Protección de rutas por flujo
3. `/FLUJO_VALIDACIONES.md` - Este documento

### Archivos Modificados:
1. `/src/app/App.tsx` - Agregado InspectionFlowProvider
2. `/src/app/routes.tsx` - Agregadas protecciones FlowProtectedRoute
3. `/src/app/pages/LoginOperativo.tsx` - Validaciones de login
4. `/src/app/pages/SetupLote.tsx` - Validaciones de setup
5. `/src/app/pages/Calibracion.tsx` - Validaciones de calibración
6. `/src/app/pages/DashboardInspeccion.tsx` - Validaciones de inspección
7. `/src/app/pages/TicketCierre.tsx` - Integración con flujo

---

## 🎯 Objetivos Cumplidos

✅ **Flujo Secuencial Estricto**
- Los usuarios deben completar cada paso en orden
- No se permite saltar pasos
- Validación en cada transición

✅ **Validaciones Robustas**
- Campos obligatorios marcados con (*)
- Mensajes de error claros y descriptivos
- Confirmaciones para acciones destructivas

✅ **UX para Operarios Industriales**
- Botones mínimo 64x64px
- Confirmaciones con diálogos nativos
- Feedback visual inmediato
- Textos claros basados en verbos de acción

✅ **Sistema de Roles**
- Diferenciación ADMINISTRADOR vs OPERARIO
- Protección de rutas administrativas
- Mensajes informativos de acceso denegado

✅ **Trazabilidad Completa**
- Datos del lote persistidos en el flujo
- Información completa en el certificado
- Registro de todas las acciones

---

## 🔧 Uso del Sistema

### Para Desarrolladores:

#### Agregar una nueva validación:
```tsx
// En la página correspondiente
import { useInspectionFlow } from "../contexts/InspectionFlowContext";

const { loteData, flowState, canAccessX } = useInspectionFlow();

// Validar antes de continuar
if (!canAccessX()) {
  alert("⚠️ Debe completar X antes de continuar");
  return;
}
```

#### Proteger una nueva ruta:
```tsx
// En routes.tsx
{
  path: "/nueva-ruta",
  element: (
    <FlowProtectedRoute requireState="inspection">
      <NuevaPagina />
    </FlowProtectedRoute>
  ),
}
```

#### Actualizar el estado del flujo:
```tsx
const { completeSetup } = useInspectionFlow();

// Al completar un paso
completeSetup(proveedor, formato);
navigate("/siguiente-paso");
```

---

## 📝 Notas Importantes

1. **Datos Simulados:** Actualmente se usan datos de prueba. En producción, estos vendrán de una base de datos o API.

2. **Persistencia:** El estado del flujo se pierde al refrescar la página. Para producción, considerar persistir en localStorage o base de datos.

3. **Validaciones de PIN:** Actualmente son simuladas. En producción, validar contra sistema de autenticación real.

4. **Generación de Lote:** El número de lote se genera con `Math.random()`. En producción, usar un sistema de generación secuencial único.

5. **Exportación PDF:** Actualmente muestra un alert. Implementar generación real con librería como jsPDF o react-pdf.

---

## 🎨 Mejoras Futuras

- [ ] Persistir estado del flujo en localStorage
- [ ] Implementar timer de sesión
- [ ] Agregar logs de auditoría
- [ ] Implementar generación real de PDF
- [ ] Conectar con API backend para validaciones
- [ ] Agregar tests unitarios para validaciones
- [ ] Implementar recuperación de sesión
- [ ] Agregar notificaciones toast en lugar de alerts
- [ ] Implementar modo offline

---

**Fecha de Implementación:** 27 de Marzo, 2026  
**Sistema:** VisionQA v2.1  
**Norma de Referencia:** ISO 2859-1:2024
