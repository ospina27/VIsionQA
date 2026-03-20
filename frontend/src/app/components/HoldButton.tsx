import { useState, useRef, useEffect } from "react";

interface HoldButtonProps {
  children: React.ReactNode;
  onComplete: () => void;
  holdTime?: number;
  className?: string;
  variant?: "danger" | "primary" | "secondary";
}

export function HoldButton({ 
  children, 
  onComplete, 
  holdTime = 2000, 
  className = "",
  variant = "primary" 
}: HoldButtonProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const variants = {
    danger: "bg-[#ff3b3b] hover:bg-[#ff1f1f] text-white",
    primary: "bg-[#ff6b6b] hover:bg-[#ff5555] text-white",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white",
  };

  const startHold = () => {
    setIsHolding(true);
    startTimeRef.current = Date.now();
    
    intervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / holdTime) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        endHold();
        onComplete();
      }
    }, 16);
  };

  const endHold = () => {
    setIsHolding(false);
    setProgress(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <button
      onMouseDown={startHold}
      onMouseUp={endHold}
      onMouseLeave={endHold}
      onTouchStart={startHold}
      onTouchEnd={endHold}
      className={`
        relative overflow-hidden font-bold rounded-lg transition-all
        min-h-[64px] text-base
        ${variants[variant]}
        ${className}
      `}
    >
      <div 
        className="absolute left-0 top-0 h-full bg-white/20 transition-all"
        style={{ width: `${progress}%` }}
      />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {isHolding && <span className="text-sm">(Mantenga presionado)</span>}
      </span>
    </button>
  );
}
