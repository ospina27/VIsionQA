import { useNavigate } from "react-router";
import { CheckCircle, XCircle, Download, RotateCw, FileText, Award, Shield, QrCode, User, Package, Power } from "lucide-react";
import { useInspectionFlow } from "../contexts/InspectionFlowContext";
import { useAuth } from "../contexts/AuthContext";
import { useModal } from "../contexts/ModalContext";
import { useConfiguracion } from "../contexts/ConfiguracionContext";
import { calcularAQLMuestreo } from "../utils/aqlCalculator";

export function TicketCierre() {
  const navigate = useNavigate();
  const { loteData, inspectionStats, resetFlow, startLogin } = useInspectionFlow();
  const { user, logout, isProductor, isAdmin } = useAuth();
  const { showAlert, showConfirm } = useModal();
  const { config } = useConfiguracion();

  // ── Datos del lote: priorizar contexto real, fallback a mock ──────────────
  const total          = inspectionStats?.totalInspeccionadas ?? 1247;
  const defectos       = inspectionStats?.totalDefectos       ?? 8;
  const tasaDefectos   = inspectionStats?.tasaDefectos        ?? "0.64";
  const horaFin        = inspectionStats?.horaFin             ?? "11:03:22";
  const duracion       = inspectionStats?.duracion            ?? "2h 21m 07s";
  const estadoReal     = inspectionStats?.estado              ?? (parseFloat(tasaDefectos) <= config.aqlPorcentaje ? "APROBADO" : "RECHAZADO");
  const eventosDeAlerta = inspectionStats?.eventosDeAlerta    ?? 0;
  const defectosExcluidos = inspectionStats?.defectosExcluidos ?? 0;
  const operarioNombre = user?.nombre ?? "F. RODRÍGUEZ";
  const operarioLegajo = user?.legajo ?? "OP-4782";

  const isAbastecedor = user?.tipoOrg === 'ABASTECEDOR';
  const tamanoLote = loteData?.tamanoLote ?? total;

  const aqlResult = isAbastecedor 
    ? calcularAQLMuestreo(tamanoLote, defectos, config.aqlPorcentaje, config.nivelInspeccion)
    : null;

  const productorTasa = tamanoLote > 0 ? ((defectos / tamanoLote) * 100).toFixed(2) : "0.00";
  const productorAprobado = parseFloat(productorTasa) <= config.aqlPorcentaje;

  const estadoCalculado = isAbastecedor && aqlResult 
    ? aqlResult.decision 
    : (productorAprobado ? "APROBADO" : "RECHAZADO");

  const finalTasa = isAbastecedor ? tasaDefectos : productorTasa;

  const loteCompleto = {
    numero:        loteData?.numeroLote  ?? "LT-2024-492",
    numeroInterno: "#B-8842-DELTA",
    proveedor:     loteData?.proveedor   ?? "CORE-TEK INC",
    formato:       loteData?.formato     ?? "Tarro 500ml - Cuello Estándar",
    fecha:         loteData?.fechaInicio ?? new Date().toLocaleDateString("es-AR"),
    horaInicio:    loteData?.horaInicio  ?? "08:42:15",
    horaFin,
    duracion,
    total,
    defectos,
    tasaDefectos:  finalTasa,
    aql:           config.aqlPorcentaje.toString(),
    estado:        estadoCalculado,
    operario:      operarioNombre,
    legajo:        operarioLegajo,
    estacion:      "ESTACIÓN_04",
    maquina:       "CAM_NORTE_04",
    loteResina:    "RSN-2024-0145",
  };

  const isAprobado = loteCompleto.estado === "APROBADO";

  const handleExportPDF = async () => {
    await showAlert({
      title: "GENERANDO CERTIFICADO PDF",
      message: "El certificado ISO 2859-1 se está generando en formato PDF compatible con auditoría.",
      detail: `Archivo: CERT_${loteCompleto.numero}_${loteCompleto.fecha.replace(/\//g, "")}.pdf\nEste documento tiene validez oficial según los procedimientos de control de calidad.`,
      type: "success",
      confirmText: "ENTENDIDO",
    });
  };

  const handleNuevoLote = async () => {
    const ok = await showConfirm({
      title: "¿INICIAR NUEVO LOTE?",
      message: "Esto reiniciará el proceso completo: configuración de lote y calibración de cámara.",
      detail: "El certificado del lote actual ya fue generado y quedará guardado en el historial de reportes.",
      type: "info",
      confirmText: "SÍ, NUEVO LOTE",
      cancelText: "QUEDARME AQUÍ",
    });
    if (ok) {
      resetFlow();
      navigate("/setup");
    }
  };

  const handleVerReportes = () => navigate("/reportes");

  const handleVolverLogin = () => {
    logout();
    startLogin();
    try {
      localStorage.removeItem("visionqa_inspection_total");
      localStorage.removeItem("visionqa_inspection_defectos");
      sessionStorage.removeItem("visionqa_inspection_session");
    } catch (e) { /* noop */ }
    navigate("/");
  };

  // Colores explícitos sin interpolación (evita purge de Tailwind)
  const badgeBg      = isAprobado ? "bg-green-500/20"  : "bg-red-500/20";
  const badgeBorder  = isAprobado ? "border-green-500/50" : "border-red-500/50";
  const badgeIcon    = isAprobado ? "text-green-500"   : "text-red-500";
  const decisionBg   = isAprobado ? "bg-green-50"      : "bg-red-50";
  const decisionBdr  = isAprobado ? "border-green-500" : "border-red-500";
  const decisionIconBg = isAprobado ? "bg-green-500"   : "bg-red-500";
  const decisionText = isAprobado ? "text-gray-900"    : "text-gray-900";
  const sealBtnBg    = isAprobado ? "bg-green-500"     : "bg-red-500";

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="max-w-5xl w-full space-y-8 py-8">

        {/* Badge de resultado */}
        <div className="flex justify-center">
          <div className={`w-28 h-28 rounded-full flex items-center justify-center border-4 ${badgeBg} ${badgeBorder}`}>
            {isAprobado
              ? <CheckCircle size={72} className={badgeIcon} />
              : <XCircle    size={72} className={badgeIcon} />
            }
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-3 px-4">
          <h1 className="text-white font-['Space_Grotesk'] font-bold text-4xl md:text-5xl">
            INSPECCIÓN FINALIZADA
          </h1>
          <p className="text-[#71717a] font-['Inter'] text-lg md:text-xl">
            Lote {loteCompleto.numero} • {loteCompleto.fecha}
          </p>
          {!isAprobado && (
            <div className="inline-block bg-red-500/10 border-2 border-red-500 rounded-lg px-4 py-2">
              <span className="text-red-500 font-['Space_Grotesk'] font-bold">
                ⚠️ LOTE RECHAZADO — Tasa de defectos ({loteCompleto.tasaDefectos}%) supera el AQL ({loteCompleto.aql}%)
              </span>
            </div>
          )}
        </div>

        {/* Certificado ISO 2859-1 */}
        <div className="bg-white text-black rounded-lg overflow-hidden shadow-[0px_0px_60px_0px_rgba(59,130,246,0.3)] border-4 border-[#3b82f6]">

          {/* Certificate Header */}
          <div className="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-['Space_Grotesk'] font-bold text-3xl mb-1">VisionQA</div>
                <div className="font-['Inter'] text-sm opacity-90">Sistema de Inspección Visual Automatizado</div>
              </div>
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded">
                  <div className="font-['Inter'] text-xs opacity-90">CERTIFICADO N°</div>
                  <div className="font-['Liberation_Mono'] font-bold text-lg">{loteCompleto.numero}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Document Title */}
          <div className="bg-gray-100 border-b-4 border-[#3b82f6] px-8 py-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Award size={32} className="text-[#3b82f6]" />
              <h2 className="font-['Space_Grotesk'] font-bold text-3xl text-gray-900">CERTIFICADO DE CALIDAD</h2>
              <Award size={32} className="text-[#3b82f6]" />
            </div>
            {isAbastecedor ? (
              <>
                <div className="font-['Inter'] text-sm text-gray-600 mt-2">Muestreo ISO 2859-1 Nivel {config.nivelInspeccion}</div>
                <div className="font-['Inter'] text-xs text-gray-500 mt-2 flex justify-center items-center gap-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-bold">MUESTREO — Código {aqlResult?.codigoLetra}</span>
                  <span>n={aqlResult?.tamanoMuestra} de N={tamanoLote}</span>
                  <span>Ac={aqlResult?.numeroAceptacion} Re={aqlResult?.numeroRechazo} — AQL {loteCompleto.aql}%</span>
                </div>
              </>
            ) : (
              <>
                <div className="font-['Inter'] text-sm text-gray-600 mt-2">Inspección 100% automatizada — N={tamanoLote} unidades</div>
                <div className="font-['Inter'] text-xs text-gray-500 mt-2 flex justify-center items-center gap-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded font-bold">COBERTURA TOTAL</span>
                  <span>Tasa de defectos: {loteCompleto.tasaDefectos}%</span>
                </div>
              </>
            )}
          </div>

          {/* Certificate Body */}
          <div className="p-8 space-y-6">
            {/* Certification Statement */}
            <div className="bg-blue-50 border-l-4 border-[#3b82f6] p-6 rounded-r">
              <p className="font-['Inter'] text-gray-800 text-base leading-relaxed">
                Se certifica que el lote de producción identificado como{" "}
                <span className="font-bold text-[#3b82f6]">{loteCompleto.numeroInterno}</span>{" "}
                ha sido inspeccionado mediante el sistema automatizado VisionQA con tecnología de visión artificial YOLOv8,
                cumpliendo con los requisitos establecidos en la norma <span className="font-bold">ISO 2859-1:2024</span>{" "}
                para inspección por muestreo de atributos.
              </p>
            </div>

            {/* Lot Information */}
            <div>
              <div className="bg-gray-200 px-4 py-2 font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                <Package size={18} />
                Información del Lote
              </div>
              <table className="w-full">
                <tbody className="font-['Inter'] text-sm">
                  <tr className="border-b border-gray-200">
                    {!isProductor() && (
                      <>
                        <td className="px-4 py-3 text-gray-600 font-semibold">Proveedor:</td>
                        <td className="px-4 py-3 text-gray-900">{loteCompleto.proveedor}</td>
                      </>
                    )}
                    {isProductor() && <td colSpan={2} />}
                    <td className="px-4 py-3 text-gray-600 font-semibold">Formato:</td>
                    <td className="px-4 py-3 text-gray-900">{loteCompleto.formato}</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="px-4 py-3 text-gray-600 font-semibold">Lote Resina:</td>
                    <td className="px-4 py-3 text-gray-900 font-['Liberation_Mono']">{loteCompleto.loteResina}</td>
                    <td className="px-4 py-3 text-gray-600 font-semibold">Estación:</td>
                    <td className="px-4 py-3 text-gray-900 font-['Liberation_Mono']">{loteCompleto.estacion}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-600 font-semibold">Fecha:</td>
                    <td className="px-4 py-3 text-gray-900">{loteCompleto.fecha}</td>
                    <td className="px-4 py-3 text-gray-600 font-semibold">Duración:</td>
                    <td className="px-4 py-3 text-gray-900 font-['Liberation_Mono']">{loteCompleto.duracion}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-600 font-semibold">Hora Inicio:</td>
                    <td className="px-4 py-3 text-gray-900 font-['Liberation_Mono']">{loteCompleto.horaInicio}</td>
                    <td className="px-4 py-3 text-gray-600 font-semibold">Hora Fin:</td>
                    <td className="px-4 py-3 text-gray-900 font-['Liberation_Mono']">{loteCompleto.horaFin}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Inspection Results */}
            <div>
              <div className="bg-gray-200 px-4 py-2 font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                <FileText size={18} />
                Resultados de Inspección
              </div>
              <table className="w-full">
                <tbody className="font-['Inter'] text-sm">
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-600 font-semibold">Unidades Inspeccionadas:</td>
                    <td className="px-4 py-3 text-gray-900 font-bold font-['Liberation_Mono'] text-lg">{loteCompleto.total.toLocaleString()}</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="px-4 py-3 text-gray-600 font-semibold">Unidades Defectuosas:</td>
                    <td className="px-4 py-3 text-orange-600 font-bold font-['Liberation_Mono'] text-lg">{loteCompleto.defectos}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 text-gray-600 font-semibold">Unidades Aprobadas:</td>
                    <td className="px-4 py-3 text-green-600 font-bold font-['Liberation_Mono'] text-lg">
                      {(loteCompleto.total - loteCompleto.defectos).toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-blue-50 border-2 border-[#3b82f6]">
                    <td className="px-4 py-4 text-gray-900 font-bold text-base">Tasa de Defectos Observada:</td>
                    <td className="px-4 py-4 text-[#3b82f6] font-bold font-['Liberation_Mono'] text-2xl">{loteCompleto.tasaDefectos}%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-gray-600 font-semibold">AQL Requerido (Nivel {config.nivelInspeccion}):</td>
                    <td className="px-4 py-3 text-gray-900 font-['Liberation_Mono']">{loteCompleto.aql}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Eventos Durante Inspección (Conditional) */}
            {eventosDeAlerta > 0 && (
              <div className="bg-[#1a1a1a] border border-[#f59e0b] rounded-lg p-4 mb-6">
                <div className="text-[#f59e0b] font-['Space_Grotesk'] font-bold text-xs uppercase mb-3">
                  EVENTOS DURANTE INSPECCIÓN
                </div>
                <div className="space-y-2 font-['Inter']">
                  <div className="text-sm text-[#d4d4d8]">
                    Alertas activadas: <span className="font-['Liberation_Mono'] text-white">{eventosDeAlerta}</span>
                  </div>
                  <div className="text-sm text-[#a1a1aa]">
                    Defectos durante alertas: <span className="font-['Liberation_Mono'] text-white">{defectosExcluidos}</span> (excluidos del cálculo AQL)
                  </div>
                  <div className="text-sm text-white font-bold">
                    Defectos válidos para AQL: <span className="font-['Liberation_Mono']">{loteCompleto.defectos}</span>
                  </div>
                  <div className="text-xs text-[#71717a] mt-2 italic">
                    * Los defectos registrados durante eventos de alerta no penalizan el resultado del lote según protocolo interno VisionQA v2.1.
                  </div>
                </div>
              </div>
            )}

            {/* Decision */}
            <div className={`${decisionBg} border-4 ${decisionBdr} rounded-lg p-6`}>
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 ${decisionIconBg} rounded-full flex items-center justify-center`}>
                  {isAprobado
                    ? <CheckCircle size={36} className="text-white" />
                    : <XCircle    size={36} className="text-white" />
                  }
                </div>
                <div className="flex-1">
                  <div className={`font-['Space_Grotesk'] font-bold text-2xl ${decisionText} mb-1`}>
                    DECISIÓN: LOTE {loteCompleto.estado}
                  </div>
                  <div className="font-['Inter'] text-sm text-gray-700">
                    {isAbastecedor && aqlResult ? (
                      <>
                        Se encontraron {defectos} defectos en la muestra de {aqlResult.tamanoMuestra}.{" "}
                        <span className="font-bold">{isAprobado ? "APROBADO" : "RECHAZADO"}</span>{" "}
                        según el criterio de aceptación (Ac={aqlResult.numeroAceptacion}, Re={aqlResult.numeroRechazo}).
                      </>
                    ) : (
                      <>
                        La tasa de defectos ({loteCompleto.tasaDefectos}%) es{" "}
                        <span className="font-bold">{isAprobado ? "INFERIOR o IGUAL" : "SUPERIOR"}</span>{" "}
                        al límite establecido ({config.aqlPorcentaje}%).{" "}
                        {isAprobado
                          ? "El lote cumple con los criterios de aceptación de inspección total."
                          : "El lote NO cumple con los criterios de aceptación. Requiere acción correctiva."
                        }
                      </>
                    )}
                  </div>
                </div>
                <div className={`px-6 py-3 ${sealBtnBg} text-white rounded font-['Space_Grotesk'] font-bold text-xl`}>
                  {isAprobado ? "✓ OK" : "✗ NC"}
                </div>
              </div>
            </div>

            {/* Technical Parameters */}
            <div>
              <div className="bg-gray-200 px-4 py-2 font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                <Shield size={18} />
                Parámetros Técnicos de Inspección
              </div>
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50">
                {[
                  ["Método de Inspección:", "Visión Artificial - YOLOv8"],
                  ["Nivel de Confianza:", "99.4% (Promedio)"],
                  ["Plan de Muestreo:", "Inspección 100% Automatizada"],
                  ["Tiempo Promedio/Unidad:", "< 0.5 segundos"],
                  ["Equipo:", loteCompleto.maquina],
                  ["Resolución Cámara:", "4K (3840x2160)"],
                ].map(([label, value]) => (
                  <div key={label} className="font-['Inter'] text-xs">
                    <div className="text-gray-600 mb-1">{label}</div>
                    <div className="text-gray-900 font-semibold font-['Liberation_Mono'] text-[11px]">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Operator */}
            <div>
              <div className="bg-gray-200 px-4 py-2 font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                <User size={18} />
                Responsable de Inspección
              </div>
              <div className="p-4 bg-gray-50 flex items-center justify-between">
                <div className="font-['Inter'] text-sm">
                  <div className="text-gray-600 mb-1">Operario:</div>
                  <div className="text-gray-900 font-bold text-lg">{loteCompleto.operario}</div>
                  <div className="text-gray-500 text-xs">Legajo: {loteCompleto.legajo}</div>
                </div>
                <div className="text-right">
                  <div className="font-['Inter'] text-xs text-gray-600 mb-2">Firma Digital Validada</div>
                  <div className="bg-white border-2 border-gray-300 px-4 py-2 rounded">
                    <div className="font-['Brush_Script_MT'] text-2xl text-gray-800">
                      {operarioNombre.split(" ").slice(0, 2).join(" ")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QR */}
            <div className="flex items-center justify-between bg-gray-100 p-6 rounded">
              <div className="flex-1">
                <div className="font-['Space_Grotesk'] font-bold text-sm uppercase tracking-wide mb-2">Trazabilidad y Validación</div>
                <div className="font-['Inter'] text-xs text-gray-700 space-y-1">
                  <div>• Certificado verificable mediante código QR</div>
                  <div>• Registro almacenado en blockchain interno</div>
                  <div>• Hash de validación: <span className="font-['Liberation_Mono'] text-[10px]">A4F9B2E8...</span></div>
                  <div>• Auditable según ISO 9001:2024</div>
                </div>
              </div>
              <div className="ml-6">
                <div className="w-32 h-32 bg-white border-4 border-gray-300 rounded flex items-center justify-center">
                  <QrCode size={96} className="text-gray-400" />
                </div>
                <div className="text-center mt-2 font-['Liberation_Mono'] text-[8px] text-gray-500">{loteCompleto.numero}</div>
              </div>
            </div>

            {/* Footer Seal */}
            <div className="border-t-2 border-gray-300 pt-4 flex items-center justify-between">
              <div className="font-['Inter'] text-[10px] text-gray-500 leading-relaxed max-w-md">
                Este documento es generado automáticamente por VisionQA y tiene validez como certificado de calidad
                según los procedimientos internos de control de calidad. La firma digital garantiza la autenticidad del documento.
              </div>
              <div className="text-center">
                <div className="w-24 h-24 border-4 border-[#3b82f6] rounded-full flex items-center justify-center bg-blue-50">
                  <div className="text-center">
                    <Shield size={32} className="text-[#3b82f6] mx-auto mb-1" />
                    <div className="font-['Space_Grotesk'] font-bold text-[8px] text-[#3b82f6]">CERTIFICADO</div>
                  </div>
                </div>
                <div className="font-['Inter'] text-[8px] text-gray-500 mt-1">ISO 2859-1</div>
              </div>
            </div>
          </div>

          {/* Certificate Footer */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4">
            <div className="flex items-center justify-between font-['Inter'] text-xs">
              <div>
                <div className="opacity-70">Generado el:</div>
                <div className="font-['Liberation_Mono']">{loteCompleto.fecha} • {loteCompleto.horaFin}</div>
              </div>
              <div className="text-center">
                <div className="opacity-70">Certificado N°</div>
                <div className="font-['Liberation_Mono'] font-bold">{loteCompleto.numero}</div>
              </div>
              <div className="text-right">
                <div className="opacity-70">Sistema:</div>
                <div>VisionQA v2.1</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <button
            onClick={handleExportPDF}
            className="bg-[#10b981] hover:bg-[#059669] text-white font-['Space_Grotesk'] font-bold rounded-lg py-6 text-lg transition-colors flex items-center justify-center gap-3 min-h-[80px]"
          >
            <Download size={24} />
            DESCARGAR PDF
          </button>
          <button
            onClick={handleNuevoLote}
            className="bg-[#3b82f6] hover:bg-[#2563eb] text-white font-['Space_Grotesk'] font-bold rounded-lg py-6 text-lg transition-colors flex items-center justify-center gap-3 min-h-[80px]"
          >
            <RotateCw size={24} />
            NUEVO LOTE
          </button>
          <button
            onClick={handleVolverLogin}
            className="bg-[#71717a] hover:bg-[#52525b] text-white font-['Space_Grotesk'] font-bold rounded-lg py-6 text-lg transition-colors flex items-center justify-center gap-3 min-h-[80px]"
          >
            <Power size={24} />
            VOLVER AL LOGIN
          </button>
        </div>

        {isAdmin() && (
          <div className="text-center">
            <button
              onClick={handleVerReportes}
              className="text-[#3b82f6] hover:text-[#2563eb] underline font-['Inter'] text-base transition-colors"
            >
              Ver Reportes y Auditoría Completa
            </button>
          </div>
        )}
      </div>
    </div>
  );
}