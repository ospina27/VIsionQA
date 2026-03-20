import svgPaths from "./svg-rk6pytdbe9";
import imgPlasticoConQuemadura from "figma:asset/0044f6e468565bfbdd6844389322453a6294c4d6.png";
import imgPlasticoConDeformidad from "figma:asset/0f0653758b9b52a79209381cb2347ac500b40748.png";
import imgDetalleDeQuemadura from "figma:asset/bf6bc894fb7d4a9b7d2da6ef5ba86172537fe778.png";
import imgMicroFractura from "figma:asset/5559a5bdae4ec4d8661706199966d8e7fa562dd2.png";
import imgOperatorProfile from "figma:asset/253d981048a0d40ff8e6f890b3915f215e0f4a15.png";

function Heading1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[28px] not-italic relative shrink-0 text-[#e5e2e1] text-[20px] tracking-[-0.5px] w-full">
          <p className="mb-0">CONFIGURACIÓN DE</p>
          <p>EXPORTACIÓN</p>
        </div>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[16px] not-italic relative shrink-0 text-[#737373] text-[12px] tracking-[1.2px] uppercase w-full">
          <p className="mb-0">Ajuste los parámetros del</p>
          <p>documento</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder() {
  return (
    <div className="bg-[#1c1b1b] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[rgba(255,85,69,0.2)] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[8px] items-start pb-[26px] pt-[24px] px-[24px] relative w-full">
        <Heading1 />
        <Container />
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.pc296280} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="image fill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Svg />
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#ff5545] content-stretch flex flex-col items-start p-px relative rounded-[2px] shrink-0 size-[22px]" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <ImageFill />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[14px] tracking-[0.7px] uppercase w-[209.5px]">
        <p className="leading-[20px]">Incluir métricas de lote</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-[294.33px]" data-name="Label">
      <Input />
      <Container3 />
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.pc296280} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="image fill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Svg1 />
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#ff5545] content-stretch flex flex-col items-start p-px relative rounded-[2px] shrink-0 size-[22px]" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <ImageFill1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[75.94px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[40px] justify-center leading-[20px] not-italic relative shrink-0 text-[#e5e2e1] text-[14px] tracking-[0.7px] uppercase w-[181.39px]">
        <p className="mb-0">Incluir imágenes con</p>
        <p>Bounding Boxes</p>
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-[294.33px]" data-name="Label">
      <Input1 />
      <Container4 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.pc296280} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function ImageFill2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="image fill">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <Svg2 />
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#ff5545] content-stretch flex flex-col items-start p-px relative rounded-[2px] shrink-0 size-[22px]" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[2px]" />
      <ImageFill2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[14px] tracking-[0.7px] uppercase w-[158.22px]">
        <p className="leading-[20px]">Firma del Analista</p>
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0 w-[294.33px]" data-name="Label">
      <Input2 />
      <Container5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[14px] tracking-[0.7px] uppercase w-[255.28px]">
        <p className="leading-[20px]">Ocultar metadatos de sensor</p>
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Label">
      <div className="bg-[#353534] relative rounded-[2px] shrink-0 size-[20px]" data-name="Input">
        <div aria-hidden="true" className="absolute border border-[#ad8883] border-solid inset-0 pointer-events-none rounded-[2px]" />
      </div>
      <Container6 />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-end relative shrink-0 w-full" data-name="Container">
      <Label />
      <Label1 />
      <Label2 />
      <Label3 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#f1c100] text-[10px] tracking-[1px] uppercase w-[129.52px]">
        <p className="leading-[15px]">Aviso de Privacidad</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[42px] justify-center leading-[13.75px] not-italic relative shrink-0 text-[#e7bdb7] text-[11px] w-[211.45px]">
        <p className="mb-0">Este reporte contiene datos sensibles de</p>
        <p className="mb-0">producción. Al enviar al proveedor, se</p>
        <p>registrará su huella digital de acceso.</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[2.75px] items-start relative shrink-0 w-[211.45px]" data-name="Container">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-start relative w-full">
        <div className="relative shrink-0 size-[11.667px]" data-name="Icon">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.p3dc33e00} fill="var(--fill-0, #F1C100)" id="Icon" />
          </svg>
        </div>
        <Container8 />
      </div>
    </div>
  );
}

function BackgroundVerticalBorder() {
  return (
    <div className="bg-[#2a2a2a] relative shrink-0 w-full" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[#f1c100] border-l-2 border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pl-[18px] pr-[16px] py-[16px] relative w-full">
        <Container7 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <BackgroundVerticalBorder />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[16px] relative shrink-0 w-[19px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 16">
        <g id="Container">
          <path d={svgPaths.pb36e280} fill="var(--fill-0, #5C0002)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-center px-[15.03px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[48px] justify-center leading-[24px] not-italic relative shrink-0 text-[#5c0002] text-[16px] text-center tracking-[-0.4px] w-[179.25px]">
        <p className="mb-0">GENERAR Y ENVIAR AL</p>
        <p>PROVEEDOR</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#ff5545] relative rounded-[2px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-center px-[24px] py-[20px] relative w-full">
          <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[2px] shadow-[0px_20px_25px_-5px_rgba(255,85,69,0.1),0px_8px_10px_-6px_rgba(255,85,69,0.1)]" data-name="Button:shadow" />
          <Container12 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[30px] justify-center leading-[15px] not-italic relative shrink-0 text-[#525252] text-[10px] text-center tracking-[2px] uppercase w-[193.94px]">
        <p className="mb-0">Destino: logistics-</p>
        <p>support@provider.global</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pt-[33px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Container14 />
    </div>
  );
}

function SectionLeftConfigurationPanel() {
  return (
    <div className="col-[1/span_4] content-stretch flex flex-col gap-[31px] items-start justify-self-stretch pb-[212.73px] relative row-1 self-start shrink-0" data-name="Section - Left: Configuration Panel">
      <BackgroundHorizontalBorder />
      <Container1 />
      <Container11 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black tracking-[-1.2px] w-[90.88px]">
        <p className="leading-[24px]">VisionQA</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[10px] uppercase w-[216.5px]">
        <p className="leading-[15px]">Soluciones de Calidad Industrial V4.2</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-[216.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative w-full">
        <Heading2 />
        <Container16 />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-black text-right uppercase w-[158.22px]">
        <p className="leading-[15px]">Reporte ID: #PDF-2024-08842</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[10px] text-right w-[132.69px]">
        <p className="leading-[15px]">Fecha: 24/05/2024 14:32:01</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-[158.22px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Container18 />
        <Container19 />
      </div>
    </div>
  );
}

function PdfHeader() {
  return (
    <div className="relative shrink-0 w-full" data-name="PDF Header">
      <div aria-hidden="true" className="absolute border-b-2 border-black border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-start justify-between pb-[26px] relative w-full">
        <Container15 />
        <Container17 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center py-[9px] relative shrink-0 w-full" data-name="Heading 1">
      <div aria-hidden="true" className="absolute border-[#e5e5e5] border-b border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black text-center tracking-[-0.5px] uppercase w-[312.47px]">
        <p className="leading-[28px]">REPORTE DE AUDITORÍA DE LOTE</p>
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9px] py-[8.5px] relative shrink-0 w-[183.25px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[10px] uppercase w-[63.5px]">
        <p className="leading-[normal]">Parámetro</p>
      </div>
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9px] py-[8.5px] relative shrink-0 w-[183.03px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[10px] uppercase w-[97.78px]">
        <p className="leading-[normal]">Valor Detectado</p>
      </div>
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9px] py-[8.5px] relative shrink-0 w-[83.39px]" data-name="Cell">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[10px] uppercase w-[40.73px]">
        <p className="leading-[normal]">Estado</p>
      </div>
    </div>
  );
}

function HeaderRow() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Header → Row">
      <Cell />
      <Cell1 />
      <Cell2 />
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-0.2px] px-[9px] py-[8.5px] relative shrink-0 w-[183.25px]" data-name="Data">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[11px] w-[111.16px]">
        <p className="leading-[normal]">Identificador de Lote</p>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-0.2px] px-[9px] py-[8.5px] relative shrink-0 w-[183.22px]" data-name="Data">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[11px] w-[111px]">
        <p className="leading-[normal]">Lote #B-8842-DELTA</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start mr-[-0.2px] px-[9px] py-[8.5px] relative shrink-0 w-[83.45px]" data-name="Data">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#16a34a] text-[11px] w-[41.3px]">
        <p className="leading-[normal]">VÁLIDO</p>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-start justify-center pr-[0.2px] relative shrink-0 w-full" data-name="Row">
      <Data />
      <Data1 />
      <Data2 />
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9px] py-[8.5px] relative shrink-0 w-[183px]" data-name="Data">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[11px] w-[72.97px]">
        <p className="leading-[normal]">Material Base</p>
      </div>
    </div>
  );
}

function Data4() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9px] py-[8.5px] relative shrink-0 w-[183.22px]" data-name="Data">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[11px] w-[106.44px]">
        <p className="leading-[normal]">HDPE Grado Médico</p>
      </div>
    </div>
  );
}

function Data5() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9px] py-[8.5px] relative shrink-0 w-[83.45px]" data-name="Data">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#16a34a] text-[11px] w-[41.3px]">
        <p className="leading-[normal]">VÁLIDO</p>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data3 />
      <Data4 />
      <Data5 />
    </div>
  );
}

function Data6() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9px] py-[8.5px] relative shrink-0 w-[183px]" data-name="Data">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[11px] w-[92.67px]">
        <p className="leading-[normal]">Tasa de Defectos</p>
      </div>
    </div>
  );
}

function Data7() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9px] py-[8.5px] relative shrink-0 w-[183.22px]" data-name="Data">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e2e1] text-[11px] w-[77.34px]">
        <p className="leading-[normal]">12.4% (Crítico)</p>
      </div>
    </div>
  );
}

function Data8() {
  return (
    <div className="content-stretch flex flex-col items-start px-[9px] py-[8.5px] relative shrink-0 w-[83.45px]" data-name="Data">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#dc2626] text-[11px] w-[34.28px]">
        <p className="leading-[normal]">FALLO</p>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Data6 />
      <Data7 />
      <Data8 />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Body">
      <Row />
      <Row1 />
      <Row2 />
    </div>
  );
}

function DataTableTable() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.5px] pt-[8.5px] relative shrink-0 w-full" data-name="Data Table → Table">
      <HeaderRow />
      <Body />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#a3a3a3] text-[10px] tracking-[1px] uppercase w-full">
        <p className="leading-[15px]">Evidencia Visual: Defectos Críticos (Quemaduras)</p>
      </div>
    </div>
  );
}

function PlasticoConQuemadura() {
  return (
    <div className="h-[128px] opacity-90 relative shrink-0 w-full" data-name="Plástico con quemadura">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[168.23%] left-0 max-w-none top-[-34.11%] w-full" src={imgPlasticoConQuemadura} />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-[#dc2626] left-[5px] top-[5px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[4px] relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-white w-[27.36px]">
          <p className="leading-[12px]">DEF_01</p>
        </div>
      </div>
    </div>
  );
}

function Image() {
  return (
    <div className="bg-[#fafafa] col-1 content-stretch flex flex-col items-start justify-self-stretch p-px relative row-1 self-start shrink-0" data-name="Image 1">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <PlasticoConQuemadura />
      <div className="absolute bg-[rgba(255,85,69,0.1)] inset-[25.38%_44.44%_43.85%_33.48%]" data-name="Overlay+Border">
        <div aria-hidden="true" className="absolute border-2 border-[#ff5545] border-solid inset-0 pointer-events-none" />
      </div>
      <Background />
    </div>
  );
}

function PlasticoConDeformidad() {
  return (
    <div className="h-[128px] opacity-90 relative shrink-0 w-full" data-name="Plástico con deformidad">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[168.23%] left-0 max-w-none top-[-34.12%] w-full" src={imgPlasticoConDeformidad} />
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="absolute bg-[#dc2626] left-[5px] top-[5px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[4px] relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-white w-[28.95px]">
          <p className="leading-[12px]">DEF_02</p>
        </div>
      </div>
    </div>
  );
}

function Image1() {
  return (
    <div className="bg-[#fafafa] col-2 content-stretch flex flex-col items-start justify-self-stretch p-px relative row-1 self-start shrink-0" data-name="Image 2">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <PlasticoConDeformidad />
      <div className="absolute bg-[rgba(255,85,69,0.1)] inset-[43.85%_25.23%_25.38%_56.37%]" data-name="Overlay+Border">
        <div aria-hidden="true" className="absolute border-2 border-[#ff5545] border-solid inset-0 pointer-events-none" />
      </div>
      <Background1 />
    </div>
  );
}

function DetalleDeQuemadura() {
  return (
    <div className="h-[128px] opacity-90 relative shrink-0 w-full" data-name="Detalle de quemadura">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[168.23%] left-0 max-w-none top-[-34.11%] w-full" src={imgDetalleDeQuemadura} />
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="absolute bg-[#dc2626] left-[5px] top-[5px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[4px] relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-white w-[29.08px]">
          <p className="leading-[12px]">DEF_03</p>
        </div>
      </div>
    </div>
  );
}

function Image2() {
  return (
    <div className="bg-[#fafafa] col-1 content-stretch flex flex-col items-start justify-self-stretch p-px relative row-2 self-start shrink-0" data-name="Image 3">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <DetalleDeQuemadura />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(255,85,69,0.1)] left-[calc(50%-0.02px)] size-[32px] top-1/2" data-name="Overlay+Border">
        <div aria-hidden="true" className="absolute border-2 border-[#ff5545] border-solid inset-0 pointer-events-none" />
      </div>
      <Background2 />
    </div>
  );
}

function MicroFractura() {
  return (
    <div className="h-[128px] opacity-90 relative shrink-0 w-full" data-name="Micro-fractura">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute h-[168.23%] left-0 max-w-none top-[-34.12%] w-full" src={imgMicroFractura} />
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="absolute bg-[#dc2626] left-[5px] top-[5px]" data-name="Background">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[4px] relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[8px] text-white w-[29.31px]">
          <p className="leading-[12px]">DEF_04</p>
        </div>
      </div>
    </div>
  );
}

function Image3() {
  return (
    <div className="bg-[#fafafa] col-2 content-stretch flex flex-col items-start justify-self-stretch p-px relative row-2 self-start shrink-0" data-name="Image 4">
      <div aria-hidden="true" className="absolute border border-[#e5e5e5] border-solid inset-0 pointer-events-none" />
      <MicroFractura />
      <div className="-translate-x-1/2 absolute bg-[rgba(255,85,69,0.1)] bottom-[47.95%] left-[calc(50%-28px)] top-[33.58%] w-[56px]" data-name="Overlay+Border">
        <div aria-hidden="true" className="absolute border-2 border-[#ff5545] border-solid inset-0 pointer-events-none" />
      </div>
      <Background3 />
    </div>
  );
}

function Container21() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[__130px_130px] relative shrink-0 w-full" data-name="Container">
      <Image />
      <Image1 />
      <Image2 />
      <Image3 />
    </div>
  );
}

function EvidenceGrid() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pt-[8px] relative shrink-0 w-full" data-name="Evidence Grid">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-0 right-0 top-[17px]" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Regular_Italic',sans-serif] h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#404040] text-[12px] text-right w-[65.33px]">
        <p className="leading-[12px]">A. Valenzuela</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-0 right-[-0.01px] top-[33px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[9px] text-black text-right tracking-[-0.225px] uppercase w-[93.13px]">
        <p className="leading-[13.5px]">Analista Senior QC</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col items-end left-0 right-0 top-[46.5px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#a3a3a3] text-[8px] text-right w-[57.77px]">
        <p className="leading-[12px]">ID: QC-992388</p>
      </div>
    </div>
  );
}

function AnalystSignature() {
  return (
    <div className="absolute bottom-[48.01px] h-[58.5px] right-[48px] w-[192px]" data-name="Analyst Signature">
      <div aria-hidden="true" className="absolute border-black border-solid border-t inset-0 pointer-events-none" />
      <Container22 />
      <Container23 />
      <Container24 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bottom-[24.01px] content-stretch flex flex-col items-start left-[48px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[12px] justify-center leading-[0] not-italic relative shrink-0 text-[#a3a3a3] text-[8px] w-[190.2px]">
        <p className="leading-[12px]">Generado automáticamente por VisualQA. © 2024</p>
      </div>
    </div>
  );
}

function PaperSheetA4RatioAspect() {
  return (
    <div className="bg-white flex-[1_0_0] h-full max-w-[700px] min-h-px min-w-px relative shadow-[0px_10px_30px_0px_rgba(0,0,0,0.5)]" data-name="Paper Sheet (A4 Ratio aspect-[1/1.41])">
      <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[inherit] p-[48px] relative size-full">
        <PdfHeader />
        <Heading />
        <DataTableTable />
        <EvidenceGrid />
        <AnalystSignature />
        <Container25 />
      </div>
    </div>
  );
}

function SectionRightA4PreviewSimulation() {
  return (
    <div className="bg-[rgba(23,23,23,0.4)] col-[5/span_8] h-[852.98px] justify-self-stretch relative row-1 shrink-0" data-name="Section - Right: A4 Preview Simulation">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start justify-center p-[40px] relative size-full">
          <PaperSheetA4RatioAspect />
        </div>
      </div>
    </div>
  );
}

function MainContentCanvas() {
  return (
    <div className="relative shrink-0 w-full" data-name="Main Content Canvas">
      <div className="gap-x-[40px] gap-y-[40px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[_852.98px] p-[32px] relative w-full">
        <SectionLeftConfigurationPanel />
        <SectionRightA4PreviewSimulation />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#ef4444] text-[12px] tracking-[0.6px] uppercase w-full">
        <p className="leading-[16px]">OPERATOR_01</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[10px] tracking-[-0.5px] uppercase w-full">
        <p className="leading-[15px]">Sección de Planta B</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start px-[24px] relative w-full">
        <Container27 />
        <Container28 />
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[32px] relative w-full">
        <Container26 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p20793584} fill="var(--fill-0, #737373)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[12px] tracking-[0.6px] uppercase w-[129.19px]">
        <p className="leading-[16px]">Panel de Control</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative w-full">
          <Container29 />
          <Container30 />
        </div>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[18.506px] relative shrink-0 w-[18.032px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.0318 18.5059">
        <g id="Container">
          <path d={svgPaths.p26ad4c00} fill="var(--fill-0, #737373)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[56.52px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[32px] justify-center leading-[16px] not-italic relative shrink-0 text-[#737373] text-[12px] tracking-[0.6px] uppercase w-[114.46px]">
        <p className="mb-0">Estadísticas de</p>
        <p>Máquina</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative w-full">
          <Container31 />
          <Container32 />
        </div>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
        <g id="Container">
          <path d={svgPaths.p1b03ba00} fill="var(--fill-0, #F87171)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container34() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#f87171] text-[12px] tracking-[0.6px] uppercase w-[154.86px]">
          <p className="leading-[16px]">Registros de Calidad</p>
        </div>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="bg-[#262626] relative shrink-0 w-full" data-name="Link">
      <div aria-hidden="true" className="absolute border-[#ef4444] border-l-4 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[28px] pr-[24px] py-[12px] relative w-full">
          <Container33 />
          <Container34 />
        </div>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p3bae3440} fill="var(--fill-0, #737373)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[12px] tracking-[0.6px] uppercase w-[67.69px]">
        <p className="leading-[16px]">Reportes</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative w-full">
          <Container35 />
          <Container36 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Nav">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Link />
        <Link1 />
        <Link2 />
        <Link3 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[18px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 18">
        <g id="Container">
          <path d={svgPaths.p20cc9b00} fill="var(--fill-0, #737373)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[12px] text-center tracking-[0.6px] uppercase w-[61.22px]">
        <p className="leading-[16px]">Soporte</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative w-full">
          <Container37 />
          <Container38 />
        </div>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p3e9df400} fill="var(--fill-0, #737373)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[12px] text-center tracking-[0.6px] uppercase w-[103.69px]">
        <p className="leading-[16px]">Cerrar Sesión</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center px-[24px] py-[12px] relative w-full">
          <Container39 />
          <Container40 />
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#171717] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start pt-[17px] relative w-full">
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

function AsideSideNavBarSegment() {
  return (
    <div className="absolute bg-[#0a0a0a] content-stretch flex flex-col h-[1024px] items-start justify-between left-0 pb-[24px] pr-px pt-[80px] top-0 w-[256px]" data-name="Aside - SideNavBar Segment">
      <div aria-hidden="true" className="absolute border-[rgba(38,38,38,0.3)] border-r border-solid inset-0 pointer-events-none" />
      <Margin />
      <Nav />
      <HorizontalBorder />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#ef4444] text-[20px] tracking-[2px] uppercase w-[121.58px]">
        <p className="leading-[28px]">VisualQA</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#a3a3a3] text-[12px] tracking-[1.2px] uppercase w-[259px]">
        <p className="leading-[16px]">PREVISUALIZACIÓN DE EXPORTACIÓN</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Container42 />
      <div className="bg-[#262626] h-[24px] shrink-0 w-px" data-name="Vertical Divider" />
      <Container43 />
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p164b49c0} fill="var(--fill-0, #A3A3A3)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0" data-name="Button">
      <Container45 />
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20.1px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1 20">
        <g id="Container">
          <path d={svgPaths.p3cdadd00} fill="var(--fill-0, #A3A3A3)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative shrink-0" data-name="Button">
      <Container46 />
    </div>
  );
}

function OperatorProfile() {
  return (
    <div className="max-w-[32px] relative shrink-0 size-[30px]" data-name="Operator Profile">
      <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-[-3.33%] max-w-none size-[106.67%] top-[-3.33%]" src={imgOperatorProfile} />
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#262626] relative rounded-[12px] shrink-0 size-[32px]" data-name="Background+Border">
      <div className="content-stretch flex items-center justify-center overflow-clip p-px relative rounded-[inherit] size-full">
        <OperatorProfile />
      </div>
      <div aria-hidden="true" className="absolute border border-[#404040] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Button3 />
      <Button4 />
      <BackgroundBorder />
    </div>
  );
}

function HeaderTopAppBarSegment() {
  return (
    <div className="absolute backdrop-blur-[6px] bg-[rgba(23,23,23,0.8)] content-stretch flex h-[64px] items-center justify-between left-0 px-[24px] top-0 w-[1280px]" data-name="Header - TopAppBar Segment">
      <Container41 />
      <Container44 />
    </div>
  );
}

function Container47() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[15px] justify-center leading-[0] not-italic relative shrink-0 text-[#a3a3a3] text-[10px] tracking-[1px] uppercase w-[253.44px]">
          <p className="leading-[15px]">Sistema Conectado / MOTOR_PDF: LISTO</p>
        </div>
      </div>
    </div>
  );
}

function ContextualInfoFloatingElement() {
  return (
    <div className="absolute bg-[#171717] bottom-[24px] content-stretch flex gap-[8px] items-center p-[13px] right-[24px] rounded-[12px]" data-name="Contextual Info Floating Element">
      <div aria-hidden="true" className="absolute border border-[#262626] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[12px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]" data-name="Contextual Info Floating Element:shadow" />
      <div className="bg-[#ff5545] rounded-[12px] shrink-0 size-[8px]" data-name="Background" />
      <Container47 />
    </div>
  );
}

export default function VistaPreviaExportarEvidenciaAPdf() {
  return (
    <div className="bg-[#131313] content-stretch flex flex-col items-start pb-[43.02px] pl-[256px] pt-[64px] relative size-full" data-name="Vista Previa: Exportar Evidencia a PDF">
      <MainContentCanvas />
      <AsideSideNavBarSegment />
      <HeaderTopAppBarSegment />
      <ContextualInfoFloatingElement />
    </div>
  );
}