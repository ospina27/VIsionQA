export interface AQLResult {
  codigoLetra: string;
  tamanoMuestra: number;
  numeroAceptacion: number;
  numeroRechazo: number;
  decision: "APROBADO" | "RECHAZADO";
}

/**
 * Calcula los parámetros de muestreo según ISO 2859-1 (Nivel II, Inspección Normal, Muestreo Simple)
 * para un AQL específico (por defecto 1.0).
 */
export function calcularAQLMuestreo(
  totalLote: number,
  totalDefectuosas: number,
  aqlLimite: number = 1.0,
  nivelInspeccion: string = "II"
): AQLResult {
  // 1. Determinar el Código de Letra (Nivel II)
  let codigoLetra = "A";
  if (totalLote >= 2 && totalLote <= 8) codigoLetra = "A";
  else if (totalLote >= 9 && totalLote <= 15) codigoLetra = "B";
  else if (totalLote >= 16 && totalLote <= 25) codigoLetra = "C";
  else if (totalLote >= 26 && totalLote <= 50) codigoLetra = "D";
  else if (totalLote >= 51 && totalLote <= 90) codigoLetra = "E";
  else if (totalLote >= 91 && totalLote <= 150) codigoLetra = "F";
  else if (totalLote >= 151 && totalLote <= 280) codigoLetra = "G";
  else if (totalLote >= 281 && totalLote <= 500) codigoLetra = "H";
  else if (totalLote >= 501 && totalLote <= 1200) codigoLetra = "J";
  else if (totalLote >= 1201 && totalLote <= 3200) codigoLetra = "K";
  else if (totalLote >= 3201 && totalLote <= 10000) codigoLetra = "L";
  else if (totalLote >= 10001 && totalLote <= 35000) codigoLetra = "M";
  else if (totalLote >= 35001 && totalLote <= 150000) codigoLetra = "N";
  else if (totalLote >= 150001 && totalLote <= 500000) codigoLetra = "P";
  else if (totalLote >= 500001) codigoLetra = "Q";

  // 2. Determinar Tamaño de Muestra (n) y Criterios (Ac, Re) para AQL 1.0
  // NOTA: Para AQL 1.0, los códigos A, B, C y D tienen flecha hacia abajo apuntando al código E (n=13).
  // Mapeo directo simplificado de la norma para AQL 1.0, muestreo simple normal.
  let tamanoMuestra = 0;
  let numeroAceptacion = 0;
  let numeroRechazo = 1;

  switch (codigoLetra) {
    case "A":
    case "B":
    case "C":
    case "D":
    case "E":
      tamanoMuestra = 13;
      numeroAceptacion = 0;
      numeroRechazo = 1;
      break;
    case "F":
      tamanoMuestra = 20;
      numeroAceptacion = 0;
      numeroRechazo = 1; // En AQL 1.0, F(20) tiene Ac=0, Re=1 (flechas en algunas tablas, aproximamos 0,1)
      break;
    case "G":
      tamanoMuestra = 32;
      numeroAceptacion = 1;
      numeroRechazo = 2; // 32 * 0.01 = 0.32 -> Ac=1
      break;
    case "H":
      tamanoMuestra = 50;
      numeroAceptacion = 1;
      numeroRechazo = 2;
      break;
    case "J":
      tamanoMuestra = 80;
      numeroAceptacion = 2;
      numeroRechazo = 3;
      break;
    case "K":
      tamanoMuestra = 125;
      numeroAceptacion = 3;
      numeroRechazo = 4;
      break;
    case "L":
      tamanoMuestra = 200;
      numeroAceptacion = 5;
      numeroRechazo = 6;
      break;
    case "M":
      tamanoMuestra = 315;
      numeroAceptacion = 7;
      numeroRechazo = 8;
      break;
    case "N":
      tamanoMuestra = 500;
      numeroAceptacion = 10;
      numeroRechazo = 11;
      break;
    case "P":
      tamanoMuestra = 800;
      numeroAceptacion = 14;
      numeroRechazo = 15;
      break;
    case "Q":
      tamanoMuestra = 1250;
      numeroAceptacion = 21;
      numeroRechazo = 22;
      break;
  }

  // Regla especial: si el tamaño de muestra requerido es mayor que el lote, se inspecciona el 100%
  if (tamanoMuestra > totalLote) {
    tamanoMuestra = totalLote;
  }

  // 3. Decisión
  const decision = totalDefectuosas <= numeroAceptacion ? "APROBADO" : "RECHAZADO";

  return {
    codigoLetra,
    tamanoMuestra,
    numeroAceptacion,
    numeroRechazo,
    decision,
  };
}
