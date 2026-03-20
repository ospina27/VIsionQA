import svgPaths from "./svg-u79rcszk11";
import imgGradient from "figma:asset/19d1d55fbd4b807ba5270711a2806b056c85ab31.png";

function DataTextureBackground() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start justify-center mix-blend-overlay opacity-5" data-name="DATA TEXTURE BACKGROUND">
      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Gradient">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgGradient} />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[288px] justify-center leading-[96px] not-italic relative shrink-0 text-[96px] text-center text-white tracking-[-4.8px] w-[799.58px]">
        <p className="mb-0">ALERTA DE PARO:</p>
        <p className="mb-0 text-[#ff5545]">UMBRAL CRÍTICO</p>
        <p className="text-[#ff5545]">SUPERADO</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Regular',sans-serif] h-[32px] justify-center leading-[0] not-italic relative shrink-0 text-[#fecaca] text-[24px] text-center tracking-[0.6px] uppercase w-[938.72px]">
        <p className="leading-[32px]">3 Quemaduras críticas detectadas consecutivamente en la Línea 04</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center py-[24px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-gradient-to-r flex-[1_0_0] from-[rgba(127,29,29,0)] h-px min-h-px min-w-px to-[rgba(127,29,29,0)] via-1/2 via-[rgba(127,29,29,0.5)]" data-name="Horizontal Divider" />
      <Container1 />
      <div className="bg-gradient-to-r flex-[1_0_0] from-[rgba(127,29,29,0)] h-px min-h-px min-w-px to-[rgba(127,29,29,0)] via-1/2 via-[rgba(127,29,29,0.5)]" data-name="Horizontal Divider" />
    </div>
  );
}

function MainText() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[16px] items-start left-1/2 top-[272px] w-[799.58px]" data-name="MAIN TEXT">
      <Heading />
      <Container />
    </div>
  );
}

function Container2() {
  return (
    <div className="opacity-70 relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#ffb4aa] text-[10px] tracking-[1px] uppercase w-full">
          <p className="leading-[15px]">ID_SENSOR</p>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full">
          <p className="leading-[28px]">THERM-09-A</p>
        </div>
      </div>
    </div>
  );
}

function OverlayVerticalBorderOverlayBlur() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(69,10,10,0.4)] col-1 justify-self-stretch relative row-1 self-start shrink-0" data-name="Overlay+VerticalBorder+OverlayBlur">
      <div aria-hidden="true" className="absolute border-[#ff5545] border-l-4 border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pl-[20px] pr-[16px] py-[16px] relative w-full">
        <Container2 />
        <Container3 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="opacity-70 relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#ffb4aa] text-[10px] tracking-[1px] uppercase w-full">
          <p className="leading-[15px]">MARCA_TIEMPO</p>
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full">
          <p className="leading-[28px]">14:52:03:09</p>
        </div>
      </div>
    </div>
  );
}

function OverlayVerticalBorderOverlayBlur1() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(69,10,10,0.4)] col-2 justify-self-stretch relative row-1 self-start shrink-0" data-name="Overlay+VerticalBorder+OverlayBlur">
      <div aria-hidden="true" className="absolute border-[#ff5545] border-l-4 border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pl-[20px] pr-[16px] py-[16px] relative w-full">
        <Container4 />
        <Container5 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="opacity-70 relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#ffb4aa] text-[10px] tracking-[1px] uppercase w-full">
          <p className="leading-[15px]">SEVERIDAD</p>
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white uppercase w-full">
          <p className="leading-[28px]">CRÍTICO</p>
        </div>
      </div>
    </div>
  );
}

function OverlayVerticalBorderOverlayBlur2() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(69,10,10,0.4)] col-3 justify-self-stretch relative row-1 self-start shrink-0" data-name="Overlay+VerticalBorder+OverlayBlur">
      <div aria-hidden="true" className="absolute border-[#ff5545] border-l-4 border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pl-[20px] pr-[16px] py-[16px] relative w-full">
        <Container6 />
        <Container7 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="opacity-70 relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#ffb4aa] text-[10px] tracking-[1px] uppercase w-full">
          <p className="leading-[15px]">PROTOCOLO_ACTIVO</p>
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-white w-full">
          <p className="leading-[28px]">PARO-E-04</p>
        </div>
      </div>
    </div>
  );
}

function OverlayVerticalBorderOverlayBlur3() {
  return (
    <div className="backdrop-blur-[6px] bg-[rgba(69,10,10,0.4)] col-4 justify-self-stretch relative row-1 self-start shrink-0" data-name="Overlay+VerticalBorder+OverlayBlur">
      <div aria-hidden="true" className="absolute border-[#ff5545] border-l-4 border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start pl-[20px] pr-[16px] py-[16px] relative w-full">
        <Container8 />
        <Container9 />
      </div>
    </div>
  );
}

function TechnicalTelemetryOverlayAsimmetricData() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-[_75px] max-w-[896px] relative shrink-0 w-full" data-name="TECHNICAL TELEMETRY OVERLAY (ASIMMETRIC DATA)">
      <OverlayVerticalBorderOverlayBlur />
      <OverlayVerticalBorderOverlayBlur1 />
      <OverlayVerticalBorderOverlayBlur2 />
      <OverlayVerticalBorderOverlayBlur3 />
    </div>
  );
}

function TechnicalTelemetryOverlayAsimmetricDataMargin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[64px] max-w-[896px] pt-[48px] right-[64px] top-[656px]" data-name="TECHNICAL TELEMETRY OVERLAY (ASIMMETRIC DATA):margin">
      <TechnicalTelemetryOverlayAsimmetricData />
    </div>
  );
}

function GiantIconWithGlow() {
  return (
    <div className="h-[190px] relative shrink-0 w-[220px]" data-name="GIANT ICON WITH GLOW">
      <div className="absolute inset-[-42.11%_-36.36%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 380 350">
          <g id="GIANT ICON WITH GLOW">
            <g filter="url(#filter0_f_18_90)" id="Background+Blur" opacity="0.3">
              <rect fill="var(--fill-0, #DC2626)" height="190" width="220" x="80" y="80" />
            </g>
            <path d={svgPaths.p33b57800} fill="var(--fill-0, #FF5545)" id="Icon" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="350" id="filter0_f_18_90" width="380" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_18_90" stdDeviation="40" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function GiantIconWithGlowMargin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[392px] pb-[32px] top-0" data-name="GIANT ICON WITH GLOW:margin">
      <GiantIconWithGlow />
    </div>
  );
}

function SectionCentralAlertCore() {
  return (
    <div className="h-[779px] max-w-[1024px] relative shrink-0 w-[1024px]" data-name="Section - CENTRAL ALERT CORE">
      <MainText />
      <TechnicalTelemetryOverlayAsimmetricDataMargin />
      <GiantIconWithGlowMargin />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[16px] py-[8px] relative" data-name="Background">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]" data-name="Overlay+Shadow" />
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[24px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[182.251px]">
        <p className="leading-[24px]">LÍNEA 04: BLOQUEADA</p>
      </div>
    </div>
  );
}

function StatusIndicatorOverlap() {
  return (
    <div className="absolute bottom-[124.28px] content-stretch flex flex-col items-start right-[39.37px]" data-name="STATUS INDICATOR OVERLAP">
      <div className="flex h-[47.453px] items-center justify-center relative shrink-0 w-[215.516px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21" } as React.CSSProperties}>
        <div className="flex-none rotate-2">
          <Background />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[23.75px] relative shrink-0 w-[27.5px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27.5 23.75">
        <g id="Container">
          <path d={svgPaths.p27eaa780} fill="var(--fill-0, #EF4444)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#ef4444] text-[20px] tracking-[2px] uppercase w-[211.72px]">
        <p className="leading-[28px]">SISTEMA CRÍTICO</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative">
        <Container11 />
        <Container12 />
      </div>
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[rgba(220,38,38,0.2)] content-stretch flex flex-col items-start px-[13px] py-[5px] relative shrink-0" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[#ef4444] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#ef4444] text-[14px] tracking-[-0.7px] w-[163.03px]">
        <p className="leading-[20px]">CÓDIGO_ERROR: 0x44-QC</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[35px] relative shrink-0 w-[38px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 38 35">
        <g id="Container">
          <path d={svgPaths.p20833b00} fill="var(--fill-0, #737373)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative">
        <OverlayBorder />
        <Container14 />
      </div>
    </div>
  );
}

function HeaderTopAppBarEmergencyOverride() {
  return (
    <div className="absolute backdrop-blur-[12px] bg-[rgba(10,10,10,0.8)] content-stretch flex items-center justify-between left-0 pb-[18px] pt-[16px] px-[24px] right-0 top-0" data-name="Header - TOP APP BAR (EMERGENCY OVERRIDE)">
      <div aria-hidden="true" className="absolute border-[rgba(127,29,29,0.3)] border-b-2 border-solid inset-0 pointer-events-none shadow-[0px_0px_30px_0px_rgba(255,59,48,0.2)]" />
      <Container10 />
      <Container13 />
    </div>
  );
}

function MainFullScreenTakeoverContainer() {
  return (
    <div className="min-h-[1024px] relative shrink-0 w-full" data-name="Main - FULL SCREEN TAKEOVER CONTAINER">
      <div className="flex flex-col items-center justify-center min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center min-h-[inherit] px-[24px] py-[122.5px] relative w-full">
          <DataTextureBackground />
          <SectionCentralAlertCore />
          <StatusIndicatorOverlap />
          <HeaderTopAppBarEmergencyOverride />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 size-[24.75px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.75 24.75">
        <g id="Container">
          <path d={svgPaths.p13909720} fill="var(--fill-0, #EF4444)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[#ef4444] text-[18px] text-center tracking-[0.9px] uppercase w-[198.94px]">
        <p className="leading-[28px]">SILENCIAR ALARMA</p>
      </div>
    </div>
  );
}

function ButtonInactiveStateNeutralAction() {
  return (
    <div className="bg-[#262626] flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Button - INACTIVE STATE (NEUTRAL ACTION)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center justify-center relative size-full">
        <Container15 />
        <Container16 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 size-[25px]" data-name="Container">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Container">
          <path d={svgPaths.p340d3e80} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative">
        <div className="flex flex-col font-['Liberation_Serif:Bold',sans-serif] h-[28px] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-white tracking-[0.9px] uppercase w-[311.94px]">
          <p className="leading-[28px]">CONFIRMAR DESPEJE DE LÍNEA</p>
        </div>
      </div>
    </div>
  );
}

function ButtonActiveStateCriticalAction() {
  return (
    <div className="bg-[#dc2626] flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Button - ACTIVE STATE (CRITICAL ACTION)">
      <div aria-hidden="true" className="absolute border-[rgba(127,29,29,0.5)] border-l-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center justify-center pl-[2px] relative size-full">
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function NavBottomNavBarInteractiveButtons() {
  return (
    <div className="absolute backdrop-blur-[20px] bg-[rgba(23,23,23,0.9)] bottom-0 h-[96px] left-0 right-0" data-name="Nav - BOTTOM NAV BAR (INTERACTIVE BUTTONS)">
      <div className="content-stretch flex items-start overflow-clip pt-[2px] relative rounded-[inherit] size-full">
        <ButtonInactiveStateNeutralAction />
        <ButtonActiveStateCriticalAction />
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(220,38,38,0.5)] border-solid border-t-2 inset-0 pointer-events-none shadow-[0px_-10px_40px_0px_rgba(0,0,0,0.8)]" />
    </div>
  );
}

export default function AlertaDeParadaDeEmergencia() {
  return (
    <div className="bg-[#131313] content-stretch flex flex-col items-start relative size-full" data-name="Alerta de Parada de Emergencia">
      <MainFullScreenTakeoverContainer />
      <NavBottomNavBarInteractiveButtons />
    </div>
  );
}