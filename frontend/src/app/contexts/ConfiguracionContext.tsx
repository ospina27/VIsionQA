import React, { createContext, useContext, useState, useEffect } from "react";
import { ConfiguracionSistema } from "../types/calidad";

interface ConfiguracionContextType {
  config: ConfiguracionSistema;
  actualizarConfig: (nuevaConfig: Partial<ConfiguracionSistema>) => void;
}

const ConfiguracionContext = createContext<ConfiguracionContextType | undefined>(undefined);

const defaultConfig: ConfiguracionSistema = {
  aqlPorcentaje: 1.0,
  nivelInspeccion: 'II',
  tipoInspeccion: 'NORMAL',
  umbralLenteSucio: 30,
  umbralFalloRed: 15,
  umbralLoteCritico: 2.5,
  tiempoLimiteRespuestaAlerta: 10
};

export function ConfiguracionProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ConfiguracionSistema>(() => {
    try {
      const saved = localStorage.getItem('visionqa_config');
      return saved ? { ...defaultConfig, ...JSON.parse(saved) } : defaultConfig;
    } catch {
      return defaultConfig;
    }
  });

  const actualizarConfig = (nuevaConfig: Partial<ConfiguracionSistema>) => {
    const updated = { ...config, ...nuevaConfig };
    setConfig(updated);
    try {
      localStorage.setItem('visionqa_config', JSON.stringify(updated));
    } catch {
      /* noop */
    }
  };

  return (
    <ConfiguracionContext.Provider value={{ config, actualizarConfig }}>
      {children}
    </ConfiguracionContext.Provider>
  );
}

export function useConfiguracion() {
  const context = useContext(ConfiguracionContext);
  if (!context) {
    throw new Error("useConfiguracion must be used within a ConfiguracionProvider");
  }
  return context;
}
