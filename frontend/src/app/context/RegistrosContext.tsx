import { createContext, useContext, useState, ReactNode } from "react";

export type TipoRegistro = 
  | "INICIO_LOTE" 
  | "FIN_LOTE" 
  | "PAUSA" 
  | "ALERTA" 
  | "CALIBRACION" 
  | "CONFIGURACION" 
  | "LOGIN" 
  | "LOGOUT"
  | "FALSO_POSITIVO"
  | "NOTIFICACION_SUPERVISOR";

export interface RegistroActividad {
  id: string;
  timestamp: Date | string;
  tipo: TipoRegistro;
  operario: string;
  descripcion: string;
  loteRelacionado?: string;
  razonFalsoPositivo?: string;
  paradaTipo?: 'PARADA_EMERGENCIA' | 'PARADA_NORMAL' | 'PAUSA' | 'RECALIBRACION';
  causa?: string;
  hora?: string;
  linea?: string;
  resuelta?: boolean;
}

interface RegistrosContextType {
  registros: RegistroActividad[];
  agregarRegistro: (registro: Omit<RegistroActividad, "id" | "timestamp">) => void;
  notificarSupervisor: (data: { tipo: 'PARADA_EMERGENCIA' | 'PARADA_NORMAL' | 'PAUSA' | 'RECALIBRACION'; operario: string; causa: string; lote: string; hora: string; linea: string }) => void;
  lotesHistorial: any[];
  operariosActividad: any[];
  calibracionesLog: any[];
  cambiosConfiguracion: any[];
}

const RegistrosContext = createContext<RegistrosContextType | undefined>(undefined);

export function RegistrosProvider({ children }: { children: ReactNode }) {
  const [registros, setRegistros] = useState<RegistroActividad[]>([
    {
      id: "ACT-2024-3421",
      timestamp: new Date(Date.now() - 600000),
      tipo: "ALERTA",
      operario: "Carlos Rodríguez - LEG-4482",
      descripcion: "Alerta de lente sucio resuelta. Limpieza realizada según SOP-CAM-01",
      loteRelacionado: "LT-2024-492"
    },
    {
      id: "ACT-2024-3420",
      timestamp: new Date(Date.now() - 1800000),
      tipo: "FIN_LOTE",
      operario: "Carlos Rodríguez - LEG-4482",
      descripcion: "Lote LT-2024-491 finalizado. Estado: APROBADO (0.61% defectos)",
      loteRelacionado: "LT-2024-491"
    },
    {
      id: "ACT-2024-3419",
      timestamp: new Date(Date.now() - 3600000),
      tipo: "INICIO_LOTE",
      operario: "Carlos Rodríguez - LEG-4482",
      descripcion: "Inicio de inspección lote LT-2024-491. Formato: Botella PET 500ml",
      loteRelacionado: "LT-2024-491"
    },
    {
      id: "ACT-2024-3418",
      timestamp: new Date(Date.now() - 5400000),
      tipo: "PAUSA",
      operario: "Carlos Rodríguez - LEG-4482",
      descripcion: "Pausa programada de 15 minutos activada"
    },
    {
      id: "ACT-2024-3417",
      timestamp: new Date(Date.now() - 7200000),
      tipo: "FIN_LOTE",
      operario: "Carlos Rodríguez - LEG-4482",
      descripcion: "Lote LT-2024-490 finalizado. Estado: APROBADO (0.71% defectos)",
      loteRelacionado: "LT-2024-490"
    },
    {
      id: "ACT-2024-3416",
      timestamp: new Date(Date.now() - 10800000),
      tipo: "ALERTA",
      operario: "Carlos Rodríguez - LEG-4482",
      descripcion: "⚠️ ALERTA CRÍTICA: Lote LT-2024-489 rechazado por superar AQL (3.8% defectos)",
      loteRelacionado: "LT-2024-489"
    }
  ]);

  const agregarRegistro = (registro: Omit<RegistroActividad, "id" | "timestamp">) => {
    const nuevoRegistro: RegistroActividad = {
      ...registro,
      id: `ACT-2024-${Math.floor(Math.random() * 10000)}`,
      timestamp: new Date()
    };
    
    setRegistros((prev) => [nuevoRegistro, ...prev]);
  };

  const notificarSupervisor = (data: { tipo: 'PARADA_EMERGENCIA' | 'PARADA_NORMAL' | 'PAUSA' | 'RECALIBRACION'; operario: string; causa: string; lote: string; hora: string; linea: string }) => {
    const nuevoRegistro: RegistroActividad = {
      id: `NOT-${Math.floor(Math.random() * 10000)}`,
      timestamp: new Date().toISOString(),
      tipo: "NOTIFICACION_SUPERVISOR",
      operario: data.operario,
      descripcion: `Notificación al supervisor: ${data.tipo} - ${data.causa}`,
      loteRelacionado: data.lote,
      paradaTipo: data.tipo,
      causa: data.causa,
      hora: data.hora,
      linea: data.linea,
      resuelta: false
    };
    
    setRegistros((prev) => [nuevoRegistro, ...prev]);
  };

  // Mock data para otras tabs
  const lotesHistorial = [
    {
      id: "LT-2024-492",
      proveedor: "INDUSTRIAS_CRESPO",
      operario: "Carlos Rodríguez",
      inicio: "12:25",
      fin: "13:45",
      unidades: 1650,
      defectos: 8,
      estado: "APROBADO",
      certificado: "CERT-2024-492"
    },
    {
      id: "LT-2024-491",
      proveedor: "PLASTICOS_DEL_SUR",
      operario: "Carlos Rodríguez",
      inicio: "10:35",
      fin: "12:10",
      unidades: 1980,
      defectos: 12,
      estado: "APROBADO",
      certificado: "CERT-2024-491"
    }
  ];

  const operariosActividad = [
    {
      legajo: "LEG-4482",
      nombre: "RODRÍGUEZ, CARLOS",
      rol: "Operario Línea Norte",
      turno: "TURNO_A",
      horasActivas: "6.5h",
      lotesCompletados: 3,
      alertasResueltas: 2,
      ultimaActividad: "Hace 10 min"
    }
  ];

  const calibracionesLog = [
    {
      id: "CAL-2024-189",
      fecha: "19 MAR 2026 - 10:45",
      dispositivo: "CAM_04_LÍNEA_NORTE",
      tecnico: "Silva, Jorge",
      tipo: "Calibración Preventiva",
      resultado: "APROBADO",
      proximaCalib: "26 MAR 2026"
    }
  ];

  const cambiosConfiguracion = [
    {
      id: "CFG-2024-084",
      fecha: "18 MAR 2026 - 14:30",
      parametro: "Umbral de Confianza YOLOv8",
      valorAnterior: "82%",
      valorNuevo: "85%",
      usuario: "González, María (Supervisor)",
      razon: "Reducir falsos positivos en envases transparentes PET"
    }
  ];

  return (
    <RegistrosContext.Provider value={{ 
      registros, 
      agregarRegistro,
      notificarSupervisor,
      lotesHistorial,
      operariosActividad,
      calibracionesLog,
      cambiosConfiguracion
    }}>
      {children}
    </RegistrosContext.Provider>
  );
}

export function useRegistros() {
  const context = useContext(RegistrosContext);
  if (!context) {
    // En desarrollo, muestra advertencia pero no lanza error
    console.warn("useRegistros se está usando fuera de RegistrosProvider. Esto puede causar problemas.");
    
    // Devuelve valores predeterminados seguros para evitar crashes
    return {
      registros: [],
      agregarRegistro: () => {
        console.warn("agregarRegistro llamado fuera del Provider - operación ignorada");
      },
      notificarSupervisor: () => {
        console.warn("notificarSupervisor llamado fuera del Provider - operación ignorada");
      },
      lotesHistorial: [],
      operariosActividad: [],
      calibracionesLog: [],
      cambiosConfiguracion: []
    };
  }
  return context;
}