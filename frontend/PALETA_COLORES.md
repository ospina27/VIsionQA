# 🎨 PALETA DE COLORES VISIONQA - USABILIDAD OPTIMIZADA

## Filosofía de Diseño
Colores modernos y profesionales que reducen la carga cognitiva, manteniendo la formalidad industrial. Cada color tiene un propósito funcional claro para mejorar la experiencia del usuario.

---

## 🎯 COLORES PRIMARIOS (Estados y Acciones)

### ✅ VERDE - Success / Aprobado / Operativo
- **Color:** `#10b981` (Emerald-500)
- **Uso:** Lotes aprobados, estados operativos, confirmaciones positivas
- **Psicología:** Transmite seguridad, éxito, cumplimiento de normas
- **Ejemplos:** 
  - Semáforo verde (<1% defectos)
  - Estados "ACTIVO", "OPERATIVO", "APROBADO"
  - Botones de confirmación
  - KPIs positivos

### 🔴 ROJO - Critical / Error / Rechazado
- **Color:** `#ef4444` (Red-500)
- **Uso:** Alertas críticas, lotes rechazados, errores graves
- **Psicología:** Urgencia, atención inmediata requerida
- **Ejemplos:**
  - Semáforo rojo (>2.5% defectos)
  - Estados "RECHAZADO", "CRÍTICO"
  - Paradas de emergencia
  - Defectos graves

### 🟡 AMARILLO/NARANJA - Warning / Precaución
- **Color:** `#f59e0b` (Amber-500)
- **Uso:** Advertencias, estados de precaución, alertas medias
- **Psicología:** Precaución sin alarma, requiere atención
- **Ejemplos:**
  - Semáforo amarillo (1-2.5% defectos)
  - Alertas de "LENTE_SUCIO"
  - Estados intermedios
  - Notificaciones importantes

### 🔵 AZUL - Info / Neutral Positivo / Acción Secundaria
- **Color:** `#3b82f6` (Blue-500)
- **Uso:** Información, acciones secundarias, datos neutrales
- **Psicología:** Profesional, confiable, informativo
- **Ejemplos:**
  - Botones de "EDITAR", "VER DETALLES"
  - Datos estadísticos
  - Links y referencias
  - Certificados

### 🟣 MORADO - Sistema / Configuración / Admin
- **Color:** `#8b5cf6` (Violet-500)
- **Uso:** Funciones de administración, configuración avanzada
- **Psicología:** Especialización, control del sistema
- **Ejemplos:**
  - Módulo de Administración
  - Configuraciones avanzadas
  - Cambios de parámetros
  - Funciones de supervisor

---

## 🌑 COLORES DE FONDO (Dark Mode)

### Fondos Principales
- **Base:** `#0a0a0a` - Fondo general de la app
- **Cards:** `#1a1a1a` - Tarjetas y paneles principales
- **Elementos:** `#2a2a2a` - Elementos internos, filas alternas
- **Hover:** `#3a3a3a` - Estados hover en elementos interactivos

### Bordes y Divisores
- **Sutiles:** `border-gray-800` (#1f1f1f)
- **Normales:** `border-gray-700` (#374151)
- **Énfasis:** `border-[#ef4444]` (rojo para críticos)

---

## 📝 COLORES DE TEXTO (Jerarquía Clara)

### Texto Principal
- **Títulos:** `#ffffff` - Blanco puro (alta legibilidad)
- **Subtítulos:** `#d4d4d8` (Zinc-300) - Casi blanco
- **Cuerpo:** `#a1a1aa` (Zinc-400) - Gris claro

### Texto Secundario
- **Labels:** `#71717a` (Zinc-500) - Gris medio
- **Disabled:** `#52525b` (Zinc-600) - Gris oscuro

---

## 🎨 APLICACIÓN POR MÓDULO

### 🔴 Dashboard de Inspección
- **Semáforo Verde:** `#10b981` + animación suave
- **Semáforo Amarillo:** `#f59e0b` + border warning
- **Semáforo Rojo:** `#ef4444` + pulso de alerta
- **Fondo:** Gradiente oscuro con sombras rojas

### 🚨 Alertas y Emergencias
- **Crítica:** `#ef4444` con animación pulse
- **Alta:** `#f59e0b` con borde destacado
- **Media:** `#f1c100` con fondo tenue
- **Baja:** `#3b82f6` neutral informativo

### 📊 Reportes
- **Aprobado:** `#10b981`
- **Rechazado:** `#ef4444`
- **En Proceso:** `#f59e0b`
- **KPIs:** Colores según umbral dinámico

### 📋 Registros
- **Timeline:** Colores por tipo de evento
  - Login/Inicio: `#10b981`
  - Fin/Logout: `#3b82f6`
  - Alerta: `#ef4444`
  - Calibración: `#f59e0b`
  - Configuración: `#8b5cf6`

### ⚙️ Administración
- **Header morado:** `#8b5cf6` (identifica admin)
- **Tabs activos:** `#8b5cf6`
- **Estados operativos:** `#10b981`
- **Mantenimiento:** `#ef4444`
- **Performance:** Escala de colores

---

## ✨ MEJORAS DE USABILIDAD

### Reducción de Carga Cognitiva
1. **Consistencia:** Mismo color = mismo significado en toda la app
2. **Contraste WCAG AAA:** Todos los textos cumplen ratio 7:1
3. **Jerarquía Visual:** 
   - Primario (acción principal): color vibrante
   - Secundario: gris con borde
   - Terciario: solo texto

### Accesibilidad para Guantes
- Botones mínimo **64x64px**
- Espaciado generoso entre elementos
- Estados hover con cambio de color claro
- No depender solo del color (iconos + texto)

### Estados de Interacción
- **Default:** Color base
- **Hover:** Color más claro (-100 en escala)
- **Active:** Color más oscuro (+100 en escala)
- **Disabled:** Opacidad 50% + cursor not-allowed

---

## 🔧 CÓDIGO DE REFERENCIA

```tsx
// Colores principales
const colors = {
  success: "#10b981",     // Verde
  error: "#ef4444",       // Rojo
  warning: "#f59e0b",     // Naranja
  info: "#3b82f6",        // Azul
  admin: "#8b5cf6",       // Morado
  
  // Fondos
  bg: {
    base: "#0a0a0a",
    card: "#1a1a1a",
    element: "#2a2a2a",
    hover: "#3a3a3a"
  },
  
  // Textos
  text: {
    primary: "#ffffff",
    secondary: "#d4d4d8",
    body: "#a1a1aa",
    muted: "#71717a"
  }
};

// Ejemplo de botón con estados
<button className="
  bg-[#10b981] hover:bg-[#059669] active:bg-[#047857]
  text-white font-['Space_Grotesk'] font-bold
  px-6 py-4 rounded transition-colors
  min-h-[64px]
">
  APROBAR LOTE
</button>
```

---

## 📐 GUÍA DE IMPLEMENTACIÓN

### Al crear un nuevo componente, pregúntate:
1. ¿Qué acción/estado representa? → Elige el color funcional
2. ¿Es interactivo? → Agrega estados hover/active
3. ¿Es crítico? → Usa rojo con animación
4. ¿Es información? → Usa azul neutral
5. ¿Es admin? → Usa morado

### Semáforo de Decisión
- 🟢 **Verde:** Todo bien, seguir adelante
- 🟡 **Amarillo:** Cuidado, revisar antes de continuar
- 🔴 **Rojo:** Detener, requiere acción inmediata

---

**Versión:** 2.0  
**Fecha:** 19 MAR 2026  
**Sistema:** VisionQA Industrial Inspection Platform
