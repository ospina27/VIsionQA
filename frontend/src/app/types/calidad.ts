export interface ConfiguracionSistema {
  aqlPorcentaje: number;
  nivelInspeccion: 'I' | 'II' | 'III';
  tipoInspeccion: 'NORMAL' | 'ESTRICTA' | 'REDUCIDA';
  umbralLenteSucio: number;
  umbralFalloRed: number;
  umbralLoteCritico: number;
  tiempoLimiteRespuestaAlerta: number;
}

export type ParametrosCalidad = Pick<ConfiguracionSistema, 'aqlPorcentaje' | 'nivelInspeccion' | 'tipoInspeccion'>;