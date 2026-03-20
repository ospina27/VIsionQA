# Sistema de Inspección Visual de Envases Plásticos - IA (YOLOv8)

## 📋 Descripción del Sistema

Aplicación industrial de inspección de calidad para envases plásticos mediante visión artificial (YOLOv8), diseñada específicamente para entornos de producción con operarios que usan guantes, sufren fatiga visual y trabajan en condiciones industriales exigentes.

### Cumplimiento Normativo
- **ISO 2859-1**: Nivel de Calidad Aceptable (AQL) 1.0%
- **Contraste**: WCAG AAA para accesibilidad
- **UX Industrial**: Botones mínimo 64x64px (Ley de Fitts)

---

## 🚀 Flujo de Navegación

### 1. **Login Operativo** (`/`)
- **Propósito**: Autenticación de operario mediante PIN
- **Características**:
  - Teclado numérico gigante (80px mínimo)
  - PIN de 4-6 dígitos
  - Opción de escaneo de carnet RFID
- **Siguiente paso**: Setup de Lote

### 2. **Setup de Lote** (`/setup`)
- **Propósito**: Configuración inicial del lote a inspeccionar
- **Campos**:
  - Selección de Proveedor (dropdown 80px)
  - Formato de Envase (dropdown 80px)
  - Número de Lote (auto-generado)
- **Siguiente paso**: Calibración de Cámara

### 3. **Calibración** (`/calibracion`)
- **Propósito**: Verificación de condiciones ópticas
- **Validaciones**:
  - ✅ Iluminación > 85%
  - ✅ Nitidez > 85%
- **Alertas**:
  - 🟡 Lente sucio
  - 🟡 Baja iluminación
- **Siguiente paso**: Dashboard Core (Inspección en Vivo)

### 4. **Dashboard Core** (`/inspeccion`) ⭐ PANTALLA PRINCIPAL
- **Propósito**: Inspección en tiempo real con IA
- **Layout**: 70% video en vivo | 30% panel de estadísticas
- **Características**:
  - Feed de cámara con Bounding Boxes en tiempo real
  - Detección de defectos: "Quemadura 92%", "Raya 88%"
  - Contadores gigantes: Total, Aceptados, Rechazados
  - Semáforo AQL: NORMAL (verde) / CRÍTICO (rojo)
  - Botones de acción prolongada (2 segundos):
    - ⏸️ Pausar Banda
    - ⏹️ Finalizar Lote
  - Botón flotante: ⚠️ Corregir IA (falsos positivos)

**Estados de Error en Dashboard:**
- 🟡 **Objeto Extraño**: Pausa automática + instrucción de retirada
- 🔴 **Lote Rechazado**: Pantalla roja completa + SOP de parada

### 5. **Criterios** (`/criterios`)
- **Propósito**: Diccionario visual de defectos
- **Contenido**:
  - Comparativas lado a lado: Aceptable vs Crítico
  - Fotos de referencia
  - Normativa ISO aplicable
  - Checklist de operador
  - Gráfico de tendencias térmicas

### 6. **Reportes** (`/reportes`)
- **Propósito**: Auditoría y evidencia forense
- **Secciones**:
  - Progreso de auditoría del lote activo
  - Tasa de defectos vs promedio
  - Galería de evidencia forense (fotos de defectos)
  - Tabla de garantía de proveedores
  - Exportación a PDF

### 7. **Ticket de Cierre** (`/cierre`)
- **Propósito**: Resumen final del lote inspeccionado
- **Información**:
  - ✅ Número de lote
  - ⏱️ Tiempo total: 2h 15m
  - 📊 Rendimiento: 98.5%
  - 📈 Total/Aceptados/Rechazados
  - 📄 Estado AQL: APROBADO
- **Acciones**:
  - 📥 Exportar Evidencia (PDF)
  - 🔄 Iniciar Nuevo Lote

---

## ⚠️ Sistema de Alertas y Errores

### Alertas Amarillas (Advertencia)
| Código | Descripción | Acción Requerida |
|--------|-------------|------------------|
| `LENS_DIRTY` | Lente sucio | Limpiar con paño de microfibra |
| `LOW_LIGHT` | Baja iluminación | Ajustar luces LED del túnel |
| `FOREIGN_OBJECT` | Objeto no identificado | Retirar de la banda |
| `MOTION_BLUR` | Imágenes borrosas | Reducir velocidad de banda |

### Alertas Naranjas (Críticas)
| Código | Descripción | Acción Requerida |
|--------|-------------|------------------|
| `OVERHEAT` | Sobrecalentamiento | Reducción automática de velocidad |
| `BATCH_CONFLICT` | Lote duplicado activo | Verificar estación |

### Alertas Rojas (Parada de Línea)
| Código | Descripción | Protocolo SOP |
|--------|-------------|---------------|
| `BATCH_REJECTED` | AQL superado | 1. Detener banda<br>2. Zona de cuarentena<br>3. Etiquetar NO CONFORME<br>4. Notificar Supervisor (Canal 3 radio) |

### Alertas Grises (Informativas)
| Código | Descripción | Permanente |
|--------|-------------|------------|
| `NETWORK_OFFLINE` | Modo sin conexión | ✅ Operación local autorizada |
| `MEMORY_FULL` | Memoria llena | ⚠️ Liberar espacio |

---

## 🎨 Sistema de Diseño

### Paleta de Colores (Alta Accesibilidad)
```css
/* Fondos */
--bg-primary: #0a0a0a      /* Fondo principal (Dark Mode) */
--bg-secondary: #1a1a1a    /* Tarjetas y paneles */
--bg-tertiary: #2a2a2a     /* Hover states */

/* Estados */
--success: #10b981         /* Aprobado/Normal */
--warning: #ffb020         /* Advertencia */
--error: #ff3b3b          /* Crítico/Rechazo */
--primary: #ff6b6b        /* Acción principal */

/* Grises */
--gray-900: #0a0a0a
--gray-800: #1a1a1a
--gray-700: #2a2a2a
--gray-600: #3a3a3a
--gray-500: #5a5a5a
--gray-400: #8a8a8a
```

### Tipografía
- **Tamaño base**: 16px (ajustable por dispositivo)
- **Tamaños grandes**: 24px - 48px para lecturas rápidas
- **Contraste**: AAA (mínimo 7:1)

### Espaciado y Tamaños
```css
/* Botones Primarios */
min-height: 64px          /* Mínimo para guantes */
min-height: 80px          /* Acciones críticas */

/* Padding interno */
px-6 py-4                 /* Estándar */
px-8 py-6                 /* Grande */

/* Margen entre botones */
gap-4                     /* 16px */
gap-6                     /* 24px */
```

---

## 🔧 Componentes Reutilizables

### `<NumPad />`
Teclado numérico gigante para entrada de PIN
- Tamaño de teclas: 80px × 80px
- Botones: 0-9, C (clear), ← (delete)

### `<HoldButton />`
Botón de acción prolongada (2 segundos)
- Barra de progreso visual
- Previene toques accidentales
- Variantes: primary, secondary, danger

### `<AlertBanner />`
Banner de alertas superiores
- Tipos: error, warning, info, offline, memory
- Iconos consistentes
- Texto en negrita legible

### `<Sidebar />`
Navegación lateral fija
- Íconos + texto (nunca solo íconos)
- Botón de emergencia permanente abajo
- Altura mínima de items: 64px

### `<CriticalErrorModal />`
Modal de pantalla completa para errores críticos
- Fondo rojo 100%
- Instrucciones SOP numeradas
- Requiere PIN de supervisor

### `<SystemAlerts />`
Gestor de múltiples alertas simultáneas
- Apilamiento vertical
- Prioridad por color
- Dismissable/permanente según tipo

---

## 📱 Diseño Responsivo

### Tablets (Dispositivo Objetivo)
- **Resolución**: 1024×768 - 1920×1080
- **Orientación**: Landscape (horizontal)
- **Interacción**: Touch con guantes

### Desktop (Dashboard Admin)
- **Resolución**: 1920×1080+
- **Características adicionales**: Exportación, gráficas, tablas

---

## 🔐 Seguridad y Privacidad

- ✅ No recolecta PII (Información Personal Identificable)
- ✅ Operación local sin requerir internet
- ✅ Autenticación por PIN de 4-6 dígitos
- ✅ Evidencia fotográfica encriptada para auditoría

---

## 🎯 Casos de Uso Principales

### Caso 1: Inspección Normal
1. Login con PIN → Setup → Calibración → Inspección
2. La IA detecta defectos en tiempo real
3. Contadores se actualizan automáticamente
4. Al finalizar turno: Finalizar Lote → Exportar PDF

### Caso 2: Detección de Falso Positivo
1. Operario ve detección incorrecta en pantalla
2. Pulsa "⚠️ Corregir IA"
3. Selecciona tipo: "Mancha de Suciedad" o "Sombra/Reflejo"
4. Deposita envase en canasta azul de reentrenamiento

### Caso 3: Lote Rechazado (AQL Superado)
1. Sistema detecta tasa de defectos > 1.0%
2. **Pantalla roja completa** con alerta sonora
3. Muestra SOP de parada de línea:
   - Detener banda
   - Zona de cuarentena
   - Etiquetar NO CONFORME
   - Notificar supervisor
4. Requiere PIN de supervisor para continuar
5. Genera reporte automático

### Caso 4: Objeto Extraño en Banda
1. IA detecta objeto no reconocido
2. Pausa automática de la banda
3. Alerta amarilla: "Retire elemento"
4. Operario limpia banda
5. Reanuda manualmente

---

## 📊 Métricas Clave

- **Velocidad de Inspección**: < 0.5 segundos por unidad
- **Confianza de IA**: 99.4% promedio
- **Capacidad**: 4,280 unidades/hora
- **AQL Objetivo**: ≤ 1.0% defectos
- **Uptime**: 99.5% (con modo offline)

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18.3, TypeScript
- **Routing**: React Router v7
- **Estilos**: Tailwind CSS v4
- **Íconos**: Lucide React
- **IA (Simulada)**: YOLOv8 (detección de objetos en tiempo real)

---

## 📞 Soporte

Para problemas técnicos:
- 📻 Radio Canal 3: Supervisor de Calidad
- 🔴 Botón "PARADA DE EMERGENCIA" (sidebar inferior)

---

**Versión del Sistema**: v2.1  
**Última Actualización**: 2026-03-19  
**Normativa**: ISO 2859-1 | AQL 1.0%
