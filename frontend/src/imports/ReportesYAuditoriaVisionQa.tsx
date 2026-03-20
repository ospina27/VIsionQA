import svgPaths from "./svg-zimq5xi1xb";
import imgAb6AXuC0Ke57EieCbzwVUwm8F6C2FbEnRzWLrgYEg4D5MqvnleuTnbGrkLixf5IdMyO0TDXvWBqDbt1SvCErS2BW5DEoALvfAjiF2Rij7CYGaE6SieTDc3E7RMkAh3D3ApqI2ZsAjhhGAhnGHzdi8T5Wtd2AYf1CCpVsNhj9X27TqIaqwFcNirCButHnKrfeQtca6PoiAYzqUuS3Xqtdwx8IMZtlreDfjOxSubg9D57W9JxNi9Wsc7U1K0Br1ZBpUMPf64M3W from "figma:asset/102d8045269fc3b66410018c3e7ed88d3b4bc3ca.png";
import imgAb6AXuBWsNcD0Fo5MYzzDnyPs0GokKQtvYiF2MxbuPTxYbwrQNxFbXty1PLje7C6NBmLmcwGbJVgS43VcU4ZpebmaMtfbN20QZnQ8ZwK5Ipp7BIc068MYmzBLsrFYbLpHcTdateEpoveUxVw5DXqHco61Um6Nv2NRox4SOgFcykRxSoilx3XWpCKw2ABvMb4Gqy3WhBhl7GDMkKQfZEnbI1YU8V2FRrpi6Hvd3DkbGiIg2MkwlJet6M5PbANbhvfjAmravBm35G from "figma:asset/40f41e4f77d2bba1c41886a1f133cbeb70de08be.png";
import imgAb6AXuDxGb8RmUhWhFDpXoR8SdBdGLuUpw8VJ8DnFqRFlLi4WtIRza6JhSaFtiIEoqVIhSjAihHc6Py8FdoCkkzjxM1K2BumK8BfAZui5TF6DSbR4ZfgSbdtushvOyxYn05MpXi05Brw7D0SNUpez6XIjcpxIo4Swl72BeWhZFqthOOn60U07YDf9JzzLViAFNyShHSmM0JvpBog0Kwg2Rr5Yf3SrrvfRKm7Xxi7DPt1ZuXksCh2TmDBRgYa3SXz943Q from "figma:asset/9412d956b92e1ba231b6f85d9585b6728ca2befa.png";
import imgAb6AXuCqYf1Ihna8ATwucpI1LK0TwVRnAkMOtle7F0OJSitf2XXEvNMn4QGlSu88T8R9BsPaUxSf8Wqrewsb8Qjhch1EZmtNmnEoVNtxgYvVoVlzXFnfOffJwk54ROJwbzUrXg6YTfAViuYSrh0NxImPo29P9QiwgYyPdJk583Fyj3YNlP2S2CTPziFlpopobrByf3IzWq25XDz2CjndkI7P1I7MnocJfqwZheN7ItZShPeHd3Q7DIqcuK2ZjkdGykEoYnoAw from "figma:asset/4fcb81a0ecfb49f86bfb80305150355d4b84ce86.png";

function BackgroundDecoration() {
  return (
    <div className="absolute h-[1175px] left-0 opacity-5 overflow-clip top-0 w-[1280px]" data-name="Background Decoration">
      <div className="absolute bg-[#ef4444] blur-[75px] h-[470px] left-[-128px] rounded-[12px] top-[-117.5px] w-[512px]" data-name="Background+Blur" />
      <div className="absolute bg-[#f1c100] blur-[75px] bottom-[-117.5px] h-[352.5px] right-[-128px] rounded-[12px] w-[384px]" data-name="Background+Blur" />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start pr-[90.96px] relative shrink-0 uppercase" data-name="Paragraph">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[96px] justify-center leading-[48px] relative shrink-0 text-[#e5e2e1] text-[48px] tracking-[-2.4px] w-[539.44px]">
        <p className="mb-0">Reportes y Auditoría de</p>
        <p>Evidencias</p>
      </div>
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[40px] justify-center leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[14px] tracking-[1.4px] w-[558.59px]">
        <p className="mb-0">Métricas operativas consolidadas y evidencia forense para</p>
        <p>la verificación del cumplimiento de lotes.</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p3bae3440} fill="var(--fill-0, #09090B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white content-stretch flex gap-[14.54px] items-center pl-[32px] pr-[34.55px] py-[16px] relative rounded-[2px] shrink-0" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-[0_-0.02px_0_0] rounded-[2px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" data-name="Button:shadow" />
      <Container />
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[40px] justify-center leading-[20px] relative shrink-0 text-[#09090b] text-[14px] text-center tracking-[1.4px] uppercase w-[165.34px]">
        <p className="mb-0">Exportar Evidencia</p>
        <p>a PDF</p>
      </div>
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Header Section">
      <Paragraph />
      <Button />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[15px] not-italic relative shrink-0 text-[#71717a] text-[10px] tracking-[1px] uppercase w-full">
        <p className="mb-0">Tasa de</p>
        <p>Defectos</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[15px] not-italic relative shrink-0 text-[10px] text-[rgba(239,68,68,0.5)] uppercase w-full">
        <p className="mb-0">▲ 0.4% vs PROM-</p>
        <p>L</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] relative shrink-0 text-[#ef4444] text-[36px] w-[82.3px]">
        <p className="leading-[36px]">2.4%</p>
      </div>
      <Container3 />
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Margin">
      <Container2 />
    </div>
  );
}

function MetricCard() {
  return (
    <div className="bg-[#1c1b1b] col-3 justify-self-stretch relative row-1 self-start shrink-0" data-name="Metric Card 1">
      <div className="content-stretch flex flex-col items-start justify-between p-[24px] relative w-full">
        <Container1 />
        <Margin />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[15px] not-italic relative shrink-0 text-[#71717a] text-[10px] tracking-[1px] uppercase w-full">
        <p className="mb-0">Total</p>
        <p>Inspeccionado</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[15px] not-italic relative shrink-0 text-[#71717a] text-[10px] uppercase w-full">
        <p className="mb-0">Unidades en este</p>
        <p>Turno</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[36px] justify-center leading-[0] relative shrink-0 text-[36px] text-white w-[116.08px]">
        <p className="leading-[36px]">14,208</p>
      </div>
      <Container6 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0 w-full" data-name="Margin">
      <Container5 />
    </div>
  );
}

function MetricCard1() {
  return (
    <div className="bg-[#1c1b1b] col-4 justify-self-stretch relative row-1 self-start shrink-0" data-name="Metric Card 2">
      <div className="content-stretch flex flex-col items-start justify-between p-[24px] relative w-full">
        <Container4 />
        <Margin1 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Paragraph">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#5c0002] text-[10px] tracking-[1px] uppercase w-[95.47px]">
        <p className="leading-[15px]">Alerta Crítica</p>
      </div>
      <div className="relative shrink-0 size-[20px]" data-name="Icon">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
          <path d={svgPaths.p15ac6280} fill="var(--fill-0, #5C0002)" id="Icon" />
        </svg>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold justify-center leading-[22.5px] relative shrink-0 text-[#5c0002] text-[18px] uppercase w-full">
        <p className="mb-0">Desviación de Alineación</p>
        <p className="mb-0">Óptica Detectada en el</p>
        <p>Carril 03.</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[15px] relative shrink-0 w-full" data-name="Margin">
      <Container7 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#5c0002] content-stretch flex flex-col items-center justify-center px-[16px] py-[8px] relative rounded-[2px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#ff5545] text-[10px] text-center tracking-[1px] uppercase w-[193.52px]">
        <p className="leading-[15px]">VER REGISTROS DE CALIBRACIÓN</p>
      </div>
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[16px] relative shrink-0" data-name="Button:margin">
      <Button1 />
    </div>
  );
}

function ButtonMarginAlignFlexStart() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Button:margin:align-flex-start">
      <ButtonMargin />
    </div>
  );
}

function MetricCard2() {
  return (
    <div className="bg-[#ff5545] col-[5/span_2] justify-self-stretch relative rounded-[2px] row-1 self-start shrink-0" data-name="Metric Card 3">
      <div className="content-stretch flex flex-col items-start justify-between p-[24px] relative w-full">
        <Paragraph1 />
        <Margin2 />
        <ButtonMarginAlignFlexStart />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[10px] tracking-[1px] uppercase w-full">
        <p className="leading-[15px]">Auditoría de Lote Activo</p>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[24px] text-white uppercase w-full">
        <p className="leading-[32px]">#B-8842-Delta</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pb-[16px] relative w-full">
        <Container9 />
        <Heading1 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase w-[153.86px]">
        <p className="leading-[16px]">Progreso de Auditoría</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[#f1c100] text-[18px] w-[51.95px]">
        <p className="leading-[28px]">84.2%</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[153.86px]" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#27272a] flex-[1_0_0] h-[6px] min-h-px min-w-px overflow-clip relative rounded-[12px]" data-name="Background">
      <div className="absolute bg-[#f1c100] inset-[0_16.02%_0_0]" data-name="Background" />
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative w-full">
        <Container11 />
        <Background />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[61px] right-0 top-0 w-[66px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 61">
        <g id="Container" opacity="0.1">
          <path d={svgPaths.p3e251200} fill="var(--fill-0, #E5E2E1)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function ActiveAuditCard() {
  return (
    <div className="bg-[#1c1b1b] col-[1/span_2] justify-self-stretch relative row-1 self-start shrink-0" data-name="Active Audit Card">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-between pl-[28px] pr-[24px] py-[24px] relative w-full">
          <Container8 />
          <Container10 />
          <Container14 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f1c100] border-l-4 border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function BentoGridForBatchMetrics() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(6,minmax(0,1fr))] grid-rows-[_202.50px] relative shrink-0 w-full" data-name="Bento Grid for Batch Metrics">
      <MetricCard />
      <MetricCard1 />
      <MetricCard2 />
      <ActiveAuditCard />
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p3d1fd080} fill="var(--fill-0, #EF4444)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Heading 2">
      <Container16 />
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[20px] text-white tracking-[1px] uppercase w-[345.77px]">
        <p className="leading-[28px]">Evidencia Forense de Defectos</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p186f5ba0} fill="var(--fill-0, #A1A1AA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#2a2a2a] content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0" data-name="Button">
      <Container18 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[10px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 10">
        <g id="Container">
          <path d={svgPaths.p3c0a8800} fill="var(--fill-0, #A1A1AA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#27272a] content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0" data-name="Button">
      <Container19 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[7.99px] items-start relative shrink-0" data-name="Container">
      <Button2 />
      <Button3 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Container17 />
    </div>
  );
}

function Ab6AXuC0Ke57EieCbzwVUwm8F6C2FbEnRzWLrgYEg4D5MqvnleuTnbGrkLixf5IdMyO0TDXvWBqDbt1SvCErS2BW5DEoALvfAjiF2Rij7CYGaE6SieTDc3E7RMkAh3D3ApqI2ZsAjhhGAhnGHzdi8T5Wtd2AYf1CCpVsNhj9X27TqIaqwFcNirCButHnKrfeQtca6PoiAYzqUuS3Xqtdwx8IMZtlreDfjOxSubg9D57W9JxNi9Wsc7U1K0Br1ZBpUMPf64M3W() {
  return (
    <div className="h-[124.88px] relative shrink-0 w-full" data-name="AB6AXuC0Ke57EIECbzwV_uwm8f6c2fbEnRzWLrgYEg4d5MQVNLEUTnbGRKLixf5idMyO0tDXvWBq-Dbt1svCErS_2bW5DEoALvfAjiF2RIJ7cYGaE6sieTDc3E7RMkAH3D3apqI2zsAjhhGAhnGHzdi8t5wtd2aYf1cCpVsNhj9x27tqIaqwFCNirCButHnKrfeQtca6poiAYzq-uuS3XQTDWX8i_mZTLREDfjOxSUBG_9d57w9JXNi9wsc7U1K0BR1ZBp-U-m-Pf64m3w">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[177.77%] left-0 max-w-none top-[-38.89%] w-full" src={imgAb6AXuC0Ke57EieCbzwVUwm8F6C2FbEnRzWLrgYEg4D5MqvnleuTnbGrkLixf5IdMyO0TDXvWBqDbt1SvCErS2BW5DEoALvfAjiF2Rij7CYGaE6SieTDc3E7RMkAh3D3ApqI2ZsAjhhGAhnGHzdi8T5Wtd2AYf1CCpVsNhj9X27TqIaqwFcNirCButHnKrfeQtca6PoiAYzqUuS3Xqtdwx8IMZtlreDfjOxSubg9D57W9JxNi9Wsc7U1K0Br1ZBpUMPf64M3W} />
        </div>
        <div className="absolute bg-white inset-0 mix-blend-saturation" />
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="absolute bg-[#dc2626] content-stretch flex flex-col items-start left-[8px] px-[8px] py-[2px] rounded-[2px] top-[8px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[9px] tracking-[-0.45px] uppercase w-[111.8px]">
        <p className="leading-[13.5px]">DEFECTO_001A: Fractura</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] w-full">
        <Ab6AXuC0Ke57EieCbzwVUwm8F6C2FbEnRzWLrgYEg4D5MqvnleuTnbGrkLixf5IdMyO0TDXvWBqDbt1SvCErS2BW5DEoALvfAjiF2Rij7CYGaE6SieTDc3E7RMkAh3D3ApqI2ZsAjhhGAhnGHzdi8T5Wtd2AYf1CCpVsNhj9X27TqIaqwFcNirCButHnKrfeQtca6PoiAYzqUuS3Xqtdwx8IMZtlreDfjOxSubg9D57W9JxNi9Wsc7U1K0Br1ZBpUMPf64M3W />
        <Background1 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[10px] w-[84.02px]">
        <p className="leading-[15px]">ID: B8-4491-01</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#f87171] text-[10px] uppercase w-[41.09px]">
        <p className="leading-[15px]">CRÍTICO</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container24 />
      <Container25 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[19.5px] not-italic relative shrink-0 text-[#a1a1aa] text-[12px] uppercase w-full">
        <p className="mb-0">Microfractura detectada</p>
        <p className="mb-0">en el perímetro del</p>
        <p className="mb-0">sustrato. Probabilidad:</p>
        <p>99.4%</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
        <Container23 />
        <Container26 />
      </div>
    </div>
  );
}

function DefectCard() {
  return (
    <div className="bg-[#1c1b1b] col-1 justify-self-stretch relative row-1 self-start shrink-0" data-name="Defect Card 1">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <Container21 />
        <Container22 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(93,63,59,0.1)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Ab6AXuBWsNcD0Fo5MYzzDnyPs0GokKQtvYiF2MxbuPTxYbwrQNxFbXty1PLje7C6NBmLmcwGbJVgS43VcU4ZpebmaMtfbN20QZnQ8ZwK5Ipp7BIc068MYmzBLsrFYbLpHcTdateEpoveUxVw5DXqHco61Um6Nv2NRox4SOgFcykRxSoilx3XWpCKw2ABvMb4Gqy3WhBhl7GDMkKQfZEnbI1YU8V2FRrpi6Hvd3DkbGiIg2MkwlJet6M5PbANbhvfjAmravBm35G() {
  return (
    <div className="h-[124.88px] relative shrink-0 w-full" data-name="AB6AXuBWsNcD0Fo5mYzzDnyPS_0gokKQtvYiF2mxbuPTxYbwrQNxFbXTY1PLje7C6nBmLmcwGbJVg-s43vcU-4ZPEBMAMtfbN20qZn-q8ZwK5Ipp7bIc068MYmzBLsrFYbLPHcTDATEEpoveUxVw5dXqHco61UM6NV2nRox4s-OgFcykRxSOILX3XWpCKw2ABv-Mb4GQY3WhBhl7gDMkKQfZEnbI1_yU8v2fRrpi6Hvd3dkbGiIg2MkwlJET6m5PbANbhvfjAmravBm35g">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[177.77%] left-0 max-w-none top-[-38.89%] w-full" src={imgAb6AXuBWsNcD0Fo5MYzzDnyPs0GokKQtvYiF2MxbuPTxYbwrQNxFbXty1PLje7C6NBmLmcwGbJVgS43VcU4ZpebmaMtfbN20QZnQ8ZwK5Ipp7BIc068MYmzBLsrFYbLpHcTdateEpoveUxVw5DXqHco61Um6Nv2NRox4SOgFcykRxSoilx3XWpCKw2ABvMb4Gqy3WhBhl7GDMkKQfZEnbI1YU8V2FRrpi6Hvd3DkbGiIg2MkwlJet6M5PbANbhvfjAmravBm35G} />
        </div>
        <div className="absolute bg-white inset-0 mix-blend-saturation" />
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="absolute bg-[#dc2626] content-stretch flex flex-col items-start left-[8px] px-[8px] py-[2px] rounded-[2px] top-[8px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[9px] tracking-[-0.45px] uppercase w-[115px]">
        <p className="leading-[13.5px]">DEFECTO_042C: Oxidación</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] w-full">
        <Ab6AXuBWsNcD0Fo5MYzzDnyPs0GokKQtvYiF2MxbuPTxYbwrQNxFbXty1PLje7C6NBmLmcwGbJVgS43VcU4ZpebmaMtfbN20QZnQ8ZwK5Ipp7BIc068MYmzBLsrFYbLpHcTdateEpoveUxVw5DXqHco61Um6Nv2NRox4SOgFcykRxSoilx3XWpCKw2ABvMb4Gqy3WhBhl7GDMkKQfZEnbI1YU8V2FRrpi6Hvd3DkbGiIg2MkwlJet6M5PbANbhvfjAmravBm35G />
        <Background2 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[10px] w-[84.02px]">
        <p className="leading-[15px]">ID: B8-4491-24</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#f1c100] text-[10px] uppercase w-[71.64px]">
        <p className="leading-[15px]">ADVERTENCIA</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container30 />
      <Container31 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[19.5px] not-italic relative shrink-0 text-[#a1a1aa] text-[12px] uppercase w-full">
        <p className="mb-0">Oxidación superficial fuera</p>
        <p className="mb-0">de los niveles de</p>
        <p className="mb-0">tolerancia. Posible</p>
        <p>contaminación de lote.</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
        <Container29 />
        <Container32 />
      </div>
    </div>
  );
}

function DefectCard1() {
  return (
    <div className="bg-[#1c1b1b] col-2 justify-self-stretch relative row-1 self-start shrink-0" data-name="Defect Card 2">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <Container27 />
        <Container28 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(93,63,59,0.1)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Ab6AXuDxGb8RmUhWhFDpXoR8SdBdGLuUpw8VJ8DnFqRFlLi4WtIRza6JhSaFtiIEoqVIhSjAihHc6Py8FdoCkkzjxM1K2BumK8BfAZui5TF6DSbR4ZfgSbdtushvOyxYn05MpXi05Brw7D0SNUpez6XIjcpxIo4Swl72BeWhZFqthOOn60U07YDf9JzzLViAFNyShHSmM0JvpBog0Kwg2Rr5Yf3SrrvfRKm7Xxi7DPt1ZuXksCh2TmDBRgYa3SXz943Q() {
  return (
    <div className="h-[124.88px] relative shrink-0 w-full" data-name="AB6AXuDXGb8rmUhWhFDpXoR8SdBdGLuUpw8vJ8dnFq-_rFlLI4wtIRza6jhSAFtiIEoq_vIhSjAIHHc6Py8fdoCkkzjx_m1K2BumK8BfAZui5tF6dSB_R4ZfgSbdtushvOyxYn0-5MpXi_05brw7d0sNUpez6XIjcpxIO4SWL72BEWhZFqthOOn_6_0U07YDf9JzzLViA-fNyShHSmM0_JvpBog0kwg2rr5YF3srrvfR_km7xxi7dPt1ZuXksCh2TM-D-bRgYa3sXz943Q">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[177.77%] left-0 max-w-none top-[-38.89%] w-full" src={imgAb6AXuDxGb8RmUhWhFDpXoR8SdBdGLuUpw8VJ8DnFqRFlLi4WtIRza6JhSaFtiIEoqVIhSjAihHc6Py8FdoCkkzjxM1K2BumK8BfAZui5TF6DSbR4ZfgSbdtushvOyxYn05MpXi05Brw7D0SNUpez6XIjcpxIo4Swl72BeWhZFqthOOn60U07YDf9JzzLViAFNyShHSmM0JvpBog0Kwg2Rr5Yf3SrrvfRKm7Xxi7DPt1ZuXksCh2TmDBRgYa3SXz943Q} />
        </div>
        <div className="absolute bg-white inset-0 mix-blend-saturation" />
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="absolute bg-[#dc2626] content-stretch flex flex-col items-start left-[8px] px-[8px] py-[2px] rounded-[2px] top-[8px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[9px] tracking-[-0.45px] uppercase w-[109.36px]">
        <p className="leading-[13.5px]">DEFECTO_009B: Faltante</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] w-full">
        <Ab6AXuDxGb8RmUhWhFDpXoR8SdBdGLuUpw8VJ8DnFqRFlLi4WtIRza6JhSaFtiIEoqVIhSjAihHc6Py8FdoCkkzjxM1K2BumK8BfAZui5TF6DSbR4ZfgSbdtushvOyxYn05MpXi05Brw7D0SNUpez6XIjcpxIo4Swl72BeWhZFqthOOn60U07YDf9JzzLViAFNyShHSmM0JvpBog0Kwg2Rr5Yf3SrrvfRKm7Xxi7DPt1ZuXksCh2TmDBRgYa3SXz943Q />
        <Background3 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[10px] w-[84.02px]">
        <p className="leading-[15px]">ID: B8-4491-88</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#f87171] text-[10px] uppercase w-[41.09px]">
        <p className="leading-[15px]">CRÍTICO</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative w-full">
          <Container36 />
          <Container37 />
        </div>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[19.5px] not-italic relative shrink-0 text-[#a1a1aa] text-[12px] uppercase w-full">
        <p className="mb-0">Componente SMD faltante</p>
        <p className="mb-0">en la posición C12.</p>
        <p className="mb-0">Producción detenida en</p>
        <p>carril 2.</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
        <Container35 />
        <Container38 />
      </div>
    </div>
  );
}

function DefectCard2() {
  return (
    <div className="bg-[#1c1b1b] col-3 justify-self-stretch relative row-1 self-start shrink-0" data-name="Defect Card 3">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip p-px relative rounded-[inherit] w-full">
        <Container33 />
        <Container34 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(93,63,59,0.1)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Ab6AXuCqYf1Ihna8ATwucpI1LK0TwVRnAkMOtle7F0OJSitf2XXEvNMn4QGlSu88T8R9BsPaUxSf8Wqrewsb8Qjhch1EZmtNmnEoVNtxgYvVoVlzXFnfOffJwk54ROJwbzUrXg6YTfAViuYSrh0NxImPo29P9QiwgYyPdJk583Fyj3YNlP2S2CTPziFlpopobrByf3IzWq25XDz2CjndkI7P1I7MnocJfqwZheN7ItZShPeHd3Q7DIqcuK2ZjkdGykEoYnoAw() {
  return (
    <div className="h-[124.88px] relative shrink-0 w-full" data-name="AB6AXuCQYf1ihna8ATwucpI1lK0-TwVRnAkMOtle7f0O_jSitf2x_xEvNMn4_QGlSU88t-8r9BsPaUxSf8WQREWSB8qjhch1eZMTNmnEoVNtxgYvVOVlzXFnfOffJWK54r-oJWBZ-UrXG6YTfAViuYSrh0NXImPO29P9qiwgYyPDJk583Fyj3yNlP2S2cTPziFLPOPOBRByf3IzWQ25xDz2CjndkI7P1i7mnoc-jfqwZheN7ItZ-ShPeHd3q7dIqcuK2zjkdGykEOYnoAw">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute h-[177.77%] left-0 max-w-none top-[-38.89%] w-full" src={imgAb6AXuCqYf1Ihna8ATwucpI1LK0TwVRnAkMOtle7F0OJSitf2XXEvNMn4QGlSu88T8R9BsPaUxSf8Wqrewsb8Qjhch1EZmtNmnEoVNtxgYvVoVlzXFnfOffJwk54ROJwbzUrXg6YTfAViuYSrh0NxImPo29P9QiwgYyPdJk583Fyj3YNlP2S2CTPziFlpopobrByf3IzWq25XDz2CjndkI7P1I7MnocJfqwZheN7ItZShPeHd3Q7DIqcuK2ZjkdGykEoYnoAw} />
        </div>
        <div className="absolute bg-white inset-0 mix-blend-saturation" />
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="absolute bg-[#dc2626] content-stretch flex flex-col items-start left-[8px] px-[8px] py-[2px] rounded-[2px] top-[8px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[9px] tracking-[-0.45px] uppercase w-[115.2px]">
        <p className="leading-[13.5px]">DEFECTO_011X: Alineación</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="relative shrink-0 w-full z-[2]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] w-full">
        <Ab6AXuCqYf1Ihna8ATwucpI1LK0TwVRnAkMOtle7F0OJSitf2XXEvNMn4QGlSu88T8R9BsPaUxSf8Wqrewsb8Qjhch1EZmtNmnEoVNtxgYvVoVlzXFnfOffJwk54ROJwbzUrXg6YTfAViuYSrh0NxImPo29P9QiwgYyPdJk583Fyj3YNlP2S2CTPziFlpopobrByf3IzWq25XDz2CjndkI7P1I7MnocJfqwZheN7ItZShPeHd3Q7DIqcuK2ZjkdGykEoYnoAw />
        <Background4 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Mono:Regular',sans-serif] h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[10px] w-[84.02px]">
        <p className="leading-[15px]">ID: B8-4492-04</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#f87171] text-[10px] uppercase w-[41.09px]">
        <p className="leading-[15px]">CRÍTICO</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Container43 />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[19.5px] not-italic relative shrink-0 text-[#a1a1aa] text-[12px] uppercase w-full">
        <p className="mb-0">Desviación dimensional de</p>
        <p className="mb-0">+0.05mm en eje Y. Rechazo</p>
        <p>automático activado.</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0 w-full z-[1]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
        <Container41 />
        <Container44 />
      </div>
    </div>
  );
}

function DefectCard3() {
  return (
    <div className="bg-[#1c1b1b] col-4 justify-self-stretch relative row-1 self-start shrink-0" data-name="Defect Card 4">
      <div className="content-stretch flex flex-col isolate items-start overflow-clip pb-[20.5px] pt-px px-px relative rounded-[inherit] w-full">
        <Container39 />
        <Container40 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(93,63,59,0.1)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Container20() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[_259.88px] relative shrink-0 w-full" data-name="Container">
      <DefectCard />
      <DefectCard1 />
      <DefectCard2 />
      <DefectCard3 />
    </div>
  );
}

function SectionForensicDefectPhotogrammetry() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Section: Forensic Defect Photogrammetry">
      <Container15 />
      <Container20 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[18px] text-white tracking-[1.8px] uppercase w-[398.53px]">
        <p className="leading-[28px]">Auditoría de Garantía de Proveedor</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[10px] uppercase w-[393.45px]">
        <p className="leading-[15px]">Registro de fallas de subcomponentes para ejecución de garantías.</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="relative shrink-0 w-[398.53px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative w-full">
        <Heading2 />
        <Container46 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#a1a1aa] text-[10px] tracking-[1px] uppercase w-[78.67px]">
        <p className="leading-[15px]">Filtrar por:</p>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[15px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="SVG">
          <path d="M4.5 6L7.5 9L10.5 6" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.125" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill() {
  return (
    <div className="absolute content-stretch flex flex-col h-[32px] items-start justify-center left-0 overflow-clip pl-[148px] pr-[8px] py-[8.5px] top-0 w-[171px]" data-name="image fill">
      <Svg />
    </div>
  );
}

function Container49() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-start left-[16px] overflow-clip top-1/2" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[10px] uppercase w-[138.67px]">
        <p className="leading-[24px]">TODOS_LOS_PROVEEDORES</p>
      </div>
    </div>
  );
}

function Options() {
  return (
    <div className="bg-[#131313] h-[32px] relative shrink-0 w-[171px]" data-name="Options">
      <ImageFill />
      <Container49 />
    </div>
  );
}

function Container47() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <Container48 />
        <Options />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(93,63,59,0.1)] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[25px] pt-[24px] px-[24px] relative w-full">
          <Container45 />
          <Container47 />
        </div>
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-0.4px] px-[24px] py-[16px] relative shrink-0 w-[113.08px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[22px] justify-center leading-[normal] not-italic relative shrink-0 text-[#71717a] text-[9px] tracking-[0.9px] uppercase w-[51.11px]">
        <p className="mb-0">ID de</p>
        <p>Reclamo</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-0.4px] px-[24px] py-[16px] relative shrink-0 w-[116.34px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[22px] justify-center leading-[normal] not-italic relative shrink-0 text-[#71717a] text-[9px] tracking-[0.9px] uppercase w-[64.11px]">
        <p className="mb-0">Vínculo de</p>
        <p>Lote</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-0.4px] px-[24px] py-[21.5px] relative shrink-0 w-[156.33px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[9px] tracking-[0.9px] uppercase w-[63.09px]">
        <p className="leading-[normal]">Proveedor</p>
      </div>
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-0.4px] px-[24px] py-[21.5px] relative shrink-0 w-[147.77px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[9px] tracking-[0.9px] uppercase w-[86.31px]">
        <p className="leading-[normal]">Clase de Falla</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-0.4px] px-[24px] py-[16px] relative shrink-0 w-[143.81px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[22px] justify-center leading-[normal] not-italic relative shrink-0 text-[#71717a] text-[9px] tracking-[0.9px] uppercase w-[58.68px]">
        <p className="mb-0">Estado de</p>
        <p>Evidencia</p>
      </div>
    </div>
  );
}

function Cell5() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-0.4px] px-[24px] py-[16px] relative shrink-0 w-[137.98px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[22px] justify-center leading-[normal] not-italic relative shrink-0 text-[#71717a] text-[9px] tracking-[0.9px] uppercase w-[58.69px]">
        <p className="mb-0">Estado de</p>
        <p>Garantía</p>
      </div>
    </div>
  );
}

function Cell6() {
  return (
    <div className="content-stretch flex flex-col items-end mr-[-0.4px] px-[24px] py-[21.5px] relative shrink-0 w-[127.05px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[11px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[9px] text-right tracking-[0.9px] uppercase w-[41.11px]">
        <p className="leading-[normal]">Acción</p>
      </div>
    </div>
  );
}

function HeaderRow() {
  return (
    <div className="bg-[rgba(42,42,42,0.5)] content-stretch flex items-start justify-center pr-[0.4px] relative shrink-0 w-full" data-name="Header → Row">
      <Cell />
      <Cell1 />
      <Cell2 />
      <Cell3 />
      <Cell4 />
      <Cell5 />
      <Cell6 />
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[20px] relative shrink-0 w-[112.72px]" data-name="Data">
      <div className="flex flex-col font-['Liberation_Mono:Bold',sans-serif] h-[32px] justify-center leading-[16px] not-italic relative shrink-0 text-[#d4d4d8] text-[12px] w-[57.61px]">
        <p className="mb-0">CL-2024-</p>
        <p>001</p>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29px] pt-[27.5px] px-[24px] relative shrink-0 w-[116.34px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[12px] w-[50.89px]">
        <p className="leading-[16px]">#B-8842</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[29px] pt-[27.5px] px-[24px] relative shrink-0 w-[156.33px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-[89.05px]">
        <p className="leading-[16px]">CORE_TEK_INC</p>
      </div>
    </div>
  );
}

function ParagraphBackgroundBorder() {
  return (
    <div className="bg-[#18181b] h-[32px] relative rounded-[2px] shrink-0 w-[67.88px]" data-name="Paragraph+Background+Border">
      <div aria-hidden="true" className="absolute border border-[#27272a] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[11px] justify-center leading-[0] left-[9px] not-italic text-[#a1a1aa] text-[9px] top-[10.5px] uppercase w-[27.75px]">
        <p className="leading-[normal]">Falla</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[11px] justify-center leading-[0] left-0 not-italic text-[#a1a1aa] text-[9px] top-[21.5px] uppercase w-[58.88px]">
        <p className="leading-[normal]">Dieléctrica</p>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-start px-[24px] py-[20px] relative shrink-0 w-[147.77px]" data-name="Data">
      <ParagraphBackgroundBorder />
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[10px] uppercase w-[60.58px]">
        <p className="leading-[normal]">Verificado</p>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pl-[24px] relative shrink-0 w-[119.81px]" data-name="Data">
      <div className="bg-[#22c55e] rounded-[12px] shadow-[0px_0px_8px_0px_rgba(34,197,94,0.4)] shrink-0 size-[8px]" data-name="Background+Shadow" />
      <Container50 />
    </div>
  );
}

function Data5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24.5px] pl-[48px] pr-[24px] pt-[24px] relative shrink-0 w-[161.98px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[24px] justify-center leading-[normal] not-italic relative shrink-0 text-[#f1c100] text-[10px] uppercase w-[72.19px]">
        <p className="mb-0">Pendiente de</p>
        <p>Revisión</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex items-center justify-center pl-[14.63px] pr-[14.62px] relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[24px] justify-center leading-[normal] not-italic relative shrink-0 text-[#f87171] text-[10px] text-center uppercase w-[49.8px]">
        <p className="mb-0">Iniciar</p>
        <p>Reclamo</p>
      </div>
    </div>
  );
}

function Data6() {
  return (
    <div className="content-stretch flex flex-col items-end pb-[24.5px] pt-[24px] px-[24px] relative shrink-0 w-[127.05px]" data-name="Data">
      <Button4 />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-center justify-center mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <Data />
      <Data1 />
      <Data2 />
      <Data3 />
      <Data4 />
      <Data5 />
      <Data6 />
    </div>
  );
}

function Data7() {
  return (
    <div className="relative shrink-0 w-[112.72px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[20.5px] relative w-full">
        <div className="flex flex-col font-['Liberation_Mono:Bold',sans-serif] h-[32px] justify-center leading-[16px] not-italic relative shrink-0 text-[#d4d4d8] text-[12px] w-[57.61px]">
          <p className="mb-0">CL-2024-</p>
          <p>002</p>
        </div>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="relative shrink-0 w-[116.34px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[29px] pt-[28px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[12px] w-[50.67px]">
          <p className="leading-[16px]">#B-8839</p>
        </div>
      </div>
    </div>
  );
}

function Data9() {
  return (
    <div className="relative shrink-0 w-[156.33px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[29px] pt-[28px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-[108.33px]">
          <p className="leading-[16px]">ZENITH_SYSTEMS</p>
        </div>
      </div>
    </div>
  );
}

function ParagraphBackgroundBorder1() {
  return (
    <div className="bg-[#18181b] h-[32px] relative rounded-[2px] shrink-0 w-[58px]" data-name="Paragraph+Background+Border">
      <div aria-hidden="true" className="absolute border border-[#27272a] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[11px] justify-center leading-[0] left-[9px] not-italic text-[#a1a1aa] text-[9px] top-[10.5px] uppercase w-[32.73px]">
        <p className="leading-[normal]">Deriva</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[11px] justify-center leading-[0] left-0 not-italic text-[#a1a1aa] text-[9px] top-[21.5px] uppercase w-[49px]">
        <p className="leading-[normal]">Mecánica</p>
      </div>
    </div>
  );
}

function Data10() {
  return (
    <div className="relative shrink-0 w-[147.77px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[20.5px] relative w-full">
        <ParagraphBackgroundBorder1 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[10px] uppercase w-[60.58px]">
        <p className="leading-[normal]">Verificado</p>
      </div>
    </div>
  );
}

function Data11() {
  return (
    <div className="relative shrink-0 w-[119.81px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pl-[24px] relative w-full">
        <div className="bg-[#22c55e] rounded-[12px] shadow-[0px_0px_8px_0px_rgba(34,197,94,0.4)] shrink-0 size-[8px]" data-name="Background+Shadow" />
        <Container51 />
      </div>
    </div>
  );
}

function Data12() {
  return (
    <div className="relative shrink-0 w-[161.98px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[48px] pr-[24px] py-[30.5px] relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#22c55e] text-[10px] uppercase w-[54.67px]">
          <p className="leading-[normal]">Aceptado</p>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[10px] text-center uppercase w-[70.36px]">
        <p className="leading-[normal]">Completado</p>
      </div>
    </div>
  );
}

function Data13() {
  return (
    <div className="relative shrink-0 w-[127.05px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end px-[24px] py-[30.5px] relative w-full">
        <Button5 />
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-center justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(93,63,59,0.05)] border-solid border-t inset-0 pointer-events-none" />
      <Data7 />
      <Data8 />
      <Data9 />
      <Data10 />
      <Data11 />
      <Data12 />
      <Data13 />
    </div>
  );
}

function Data14() {
  return (
    <div className="relative shrink-0 w-[112.72px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[20px] relative w-full">
        <div className="flex flex-col font-['Liberation_Mono:Bold',sans-serif] h-[32px] justify-center leading-[16px] not-italic relative shrink-0 text-[#d4d4d8] text-[12px] w-[57.61px]">
          <p className="mb-0">CL-2023-</p>
          <p>994</p>
        </div>
      </div>
    </div>
  );
}

function Data15() {
  return (
    <div className="relative shrink-0 w-[116.34px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[28.5px] pt-[28px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[12px] w-[47.39px]">
          <p className="leading-[16px]">#B-8712</p>
        </div>
      </div>
    </div>
  );
}

function Data16() {
  return (
    <div className="relative shrink-0 w-[156.33px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[28.5px] pt-[28px] px-[24px] relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-[89.05px]">
          <p className="leading-[16px]">CORE_TEK_INC</p>
        </div>
      </div>
    </div>
  );
}

function ParagraphBackgroundBorder2() {
  return (
    <div className="bg-[#18181b] h-[32px] relative rounded-[2px] shrink-0 w-[74.09px]" data-name="Paragraph+Background+Border">
      <div aria-hidden="true" className="absolute border border-[#27272a] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[11px] justify-center leading-[0] left-[9px] not-italic text-[#a1a1aa] text-[9px] top-[10.5px] uppercase w-[65.09px]">
        <p className="leading-[normal]">Componente</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[11px] justify-center leading-[0] left-0 not-italic text-[#a1a1aa] text-[9px] top-[21.5px] uppercase w-[45.2px]">
        <p className="leading-[normal]">Faltante</p>
      </div>
    </div>
  );
}

function Data17() {
  return (
    <div className="relative shrink-0 w-[147.77px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[24px] py-[20px] relative w-full">
        <ParagraphBackgroundBorder2 />
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[26.02px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[24px] justify-center leading-[normal] not-italic relative shrink-0 text-[#e5e2e1] text-[10px] uppercase w-[54.39px]">
        <p className="mb-0">Falta</p>
        <p>Evidencia</p>
      </div>
    </div>
  );
}

function Data18() {
  return (
    <div className="relative shrink-0 w-[119.81px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.99px] items-center pl-[24px] relative w-full">
        <div className="bg-[#eab308] h-[8px] rounded-[12px] shadow-[0px_0px_8px_0px_rgba(234,179,8,0.4)] shrink-0 w-[7.41px]" data-name="Background+Shadow" />
        <Container52 />
      </div>
    </div>
  );
}

function Data19() {
  return (
    <div className="relative shrink-0 w-[161.98px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[30px] pl-[48px] pr-[24px] pt-[30.5px] relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#ef4444] text-[10px] uppercase w-[63.39px]">
          <p className="leading-[normal]">Rechazado</p>
        </div>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#f87171] text-[10px] text-center uppercase w-[54.73px]">
        <p className="leading-[normal]">Re-enviar</p>
      </div>
    </div>
  );
}

function Data20() {
  return (
    <div className="relative shrink-0 w-[127.05px]" data-name="Data">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-end pb-[30px] pt-[30.5px] px-[24px] relative w-full">
        <Button6 />
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex items-center justify-center mb-[-1px] pt-px relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(93,63,59,0.05)] border-solid border-t inset-0 pointer-events-none" />
      <Data14 />
      <Data15 />
      <Data16 />
      <Data17 />
      <Data18 />
      <Data19 />
      <Data20 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="Body">
      <Row />
      <Row1 />
      <Row2 />
    </div>
  );
}

function Table() {
  return (
    <div className="relative shrink-0 w-full" data-name="Table">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <HeaderRow />
        <Body />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[10px] tracking-[1px] uppercase w-[206.55px]">
        <p className="leading-[15px]">Mostrando 3 entradas activas</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[10px] text-center tracking-[1px] w-[47.45px]">
        <p className="leading-[15px]">Anterior</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[10px] text-center tracking-[1px] w-[54.5px]">
        <p className="leading-[15px]">Siguiente</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0" data-name="Container">
      <Button7 />
      <Button8 />
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(24,24,27,0.4)] relative shrink-0 w-full" data-name="Overlay">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between p-[16px] relative w-full">
          <Container53 />
          <Container54 />
        </div>
      </div>
    </div>
  );
}

function SectionSupplierAuditGuaranteeManagement() {
  return (
    <div className="bg-[#1c1b1b] content-stretch flex flex-col items-start p-px relative shrink-0 w-full" data-name="Section: Supplier Audit & Guarantee Management">
      <div aria-hidden="true" className="absolute border border-[rgba(93,63,59,0.05)] border-solid inset-0 pointer-events-none" />
      <HorizontalBorder />
      <Table />
      <Overlay />
    </div>
  );
}

function MainContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="Main Content">
      <div className="content-stretch flex flex-col gap-[40px] items-start pb-[48px] pt-[96px] px-[40px] relative w-full">
        <HeaderSection />
        <BentoGridForBatchMetrics />
        <SectionForensicDefectPhotogrammetry />
        <SectionSupplierAuditGuaranteeManagement />
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] relative shrink-0 text-[18px] text-white uppercase w-[124.78px]">
        <p className="leading-[28px]">VisionQA_v2.1</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="h-[10.5px] relative shrink-0 w-[18.5px]" data-name="Margin">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.5 10.5">
        <g id="Margin">
          <path d={svgPaths.p210dd580} fill="var(--fill-0, #71717A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#6b7280] text-[12px] uppercase w-full">
        <p className="leading-[normal]">ID_LOTE...</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="relative shrink-0 w-[192px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pb-[9px] pt-[8px] px-[12px] relative rounded-[inherit] w-full">
        <Container57 />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#0e0e0e] content-stretch flex items-center px-[17px] py-[7px] relative rounded-[2px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(93,63,59,0.2)] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <Margin3 />
      <Input />
    </div>
  );
}

function Container59() {
  return (
    <div className="h-[20.05px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20.05">
        <g id="Container">
          <path d={svgPaths.p3f50100} fill="var(--fill-0, #A1A1AA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container60() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p2816f2c0} fill="var(--fill-0, #A1A1AA)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-[#ff5545] content-stretch flex flex-col items-center justify-center px-[16px] py-[6px] relative rounded-[2px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#5c0002] text-[10px] text-center tracking-[1px] w-[101.17px]">
        <p className="leading-[15px]">ESCANEAR_NUEVO</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Container59 />
      <Container60 />
      <Button9 />
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Container">
      <BackgroundBorder />
      <Container58 />
    </div>
  );
}

function HeaderTopAppBar() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(24,24,27,0.8)] content-stretch flex h-[64px] items-center justify-between left-[256px] px-[24px] top-0 w-[1280px]" data-name="Header - TopAppBar">
      <Container55 />
      <Container56 />
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[20px] text-white tracking-[2px] uppercase w-full">
        <p className="leading-[28px]">VisionQA</p>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Space_Grotesk:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#71717a] text-[10px] tracking-[-0.5px] w-full">
        <p className="leading-[15px]">ESTACION_04</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[24px] relative w-full">
        <Container62 />
        <Container63 />
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[16px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
        <g id="Container">
          <path d={svgPaths.p3dfc3600} fill="var(--fill-0, #71717A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] relative shrink-0 text-[#71717a] text-[12px] tracking-[1.2px] uppercase w-[147.3px]">
        <p className="leading-[16px]">Transmisión en Vivo</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[24px] py-[16px] relative w-full">
          <Container65 />
          <Container66 />
        </div>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="h-[22px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 22">
        <g id="Container">
          <path d={svgPaths.p1cea1380} fill="var(--fill-0, #71717A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] relative shrink-0 text-[#71717a] text-[12px] tracking-[1.2px] uppercase w-[69.13px]">
        <p className="leading-[16px]">Criterios</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[24px] py-[16px] relative w-full">
          <Container67 />
          <Container68 />
        </div>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p4c2b800} fill="var(--fill-0, #EF4444)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container70() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] relative shrink-0 text-[#ef4444] text-[12px] tracking-[1.2px] uppercase w-[67.61px]">
          <p className="leading-[16px]">Reportes</p>
        </div>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="bg-[#27272a] relative shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#ef4444] border-l-4 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center pl-[28px] pr-[24px] py-[16px] relative w-full">
          <Container69 />
          <Container70 />
        </div>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="h-[24px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 24">
        <g id="Container">
          <path d={svgPaths.p1d4a2d00} fill="var(--fill-0, #71717A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[16px] justify-center leading-[0] relative shrink-0 text-[#71717a] text-[12px] tracking-[1.2px] uppercase w-[57.75px]">
        <p className="leading-[16px]">Sistema</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[24px] py-[16px] relative w-full">
          <Container71 />
          <Container72 />
        </div>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative w-full" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Margin">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center pt-[16px] relative size-full">
          <Container64 />
        </div>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-[#ff5545] relative rounded-[2px] shrink-0 w-full" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center py-[12px] relative w-full">
        <div className="flex flex-col font-['Space_Grotesk:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] relative shrink-0 text-[#5c0002] text-[10px] text-center tracking-[1px] w-[135.11px]">
          <p className="leading-[15px]">PARADA DE EMERGENCIA</p>
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder1() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(24,24,27,0.5)] border-solid border-t inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pb-[16px] pt-[17px] px-[16px] relative w-full">
        <Button10 />
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="h-[19px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 19">
        <g id="Container">
          <path d={svgPaths.p7555480} fill="var(--fill-0, #71717A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container75() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase w-[53.31px]">
        <p className="leading-[16px]">Alertas</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[24px] py-[12px] relative w-full">
          <Container74 />
          <Container75 />
        </div>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
        <g id="Container">
          <path d={svgPaths.p396ca1c0} fill="var(--fill-0, #71717A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[12px] uppercase w-[67.5px]">
        <p className="leading-[16px]">Registros</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[24px] py-[12px] relative w-full">
          <Container76 />
          <Container77 />
        </div>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Link4 />
      <Link5 />
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Margin">
      <Container73 />
    </div>
  );
}

function SideNavBar() {
  return (
    <div className="absolute bg-[#09090b] content-stretch flex flex-col h-[1175px] items-start left-0 shadow-[4px_0px_20px_0px_rgba(0,0,0,0.5)] top-0 w-[256px]" data-name="SideNavBar">
      <Container61 />
      <Margin4 />
      <HorizontalBorder1 />
      <Margin5 />
    </div>
  );
}

export default function ReportesYAuditoriaVisionQa() {
  return (
    <div className="bg-[#131313] content-stretch flex flex-col items-start pl-[256px] relative size-full" data-name="Reportes y Auditoría - VisionQA">
      <BackgroundDecoration />
      <MainContent />
      <HeaderTopAppBar />
      <SideNavBar />
    </div>
  );
}