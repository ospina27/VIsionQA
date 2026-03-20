import { X } from "lucide-react";

interface NumPadProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function NumPad({ value, onChange, onSubmit }: NumPadProps) {
  const handleNumber = (num: string) => {
    if (value.length < 6) {
      onChange(value + num);
    }
  };

  const handleDelete = () => {
    onChange(value.slice(0, -1));
  };

  const handleClear = () => {
    onChange("");
  };

  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "←"];

  return (
    <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-md mx-auto">
      {buttons.map((btn) => {
        if (btn === "C") {
          return (
            <button
              key={btn}
              onClick={handleClear}
              className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-bold rounded-lg transition-colors min-h-[64px] md:min-h-[80px] text-xl md:text-2xl"
            >
              {btn}
            </button>
          );
        }
        if (btn === "←") {
          return (
            <button
              key={btn}
              onClick={handleDelete}
              className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-bold rounded-lg transition-colors min-h-[64px] md:min-h-[80px] flex items-center justify-center"
            >
              <X size={28} className="md:w-8 md:h-8" />
            </button>
          );
        }
        return (
          <button
            key={btn}
            onClick={() => handleNumber(btn)}
            className="bg-gray-800 hover:bg-gray-700 active:bg-gray-600 text-white font-bold rounded-lg transition-colors min-h-[64px] md:min-h-[80px] text-xl md:text-2xl"
          >
            {btn}
          </button>
        );
      })}
      <button
        onClick={onSubmit}
        className="col-span-3 bg-[#10b981] hover:bg-[#059669] active:bg-[#047857] text-white font-bold rounded-lg transition-colors min-h-[64px] md:min-h-[80px] text-lg md:text-xl mt-2 md:mt-4"
      >
        CONFIRMAR
      </button>
    </div>
  );
}