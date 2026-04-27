import { useState } from "react";
import { X, User, Save, AlertTriangle } from "lucide-react";

interface Operario {
  id: string;
  nombre: string;
  turno: string;
  estacion: string;
  estado: string;
}

type ModoModal = "editar" | "agregar" | "suspender";

interface GestionOperarioModalProps {
  modo: ModoModal;
  operario?: Operario;
  onClose: () => void;
  onSave: (operario: Operario) => void;
  onSuspender?: (id: string) => void;
}

const ESTACIONES = ["ESTACIÓN_01", "ESTACIÓN_02", "ESTACIÓN_03", "ESTACIÓN_04"];
const TURNOS = ["A", "B", "C"];
const ESTADOS = ["ACTIVO", "DESCANSO"];

export function GestionOperarioModal({
  modo,
  operario,
  onClose,
  onSave,
  onSuspender,
}: GestionOperarioModalProps) {
  const [form, setForm] = useState<Operario>(
    operario ?? {
      id: `LEG-${Math.floor(4000 + Math.random() * 999)}`,
      nombre: "",
      turno: "A",
      estacion: "ESTACIÓN_01",
      estado: "ACTIVO",
    }
  );

  const [errors, setErrors] = useState<Partial<Record<keyof Operario, string>>>({});

  const handleChange = (field: keyof Operario, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof Operario, string>> = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (form.nombre.trim().length < 3) e.nombre = "Mínimo 3 caracteres";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onSave(form);
    onClose();
  };

  const handleSuspender = () => {
    if (operario && onSuspender) {
      onSuspender(operario.id);
      onClose();
    }
  };

  const isSuspender = modo === "suspender";
  const isAgregar = modo === "agregar";

  const titleMap = {
    editar: "EDITAR OPERARIO",
    agregar: "AGREGAR OPERARIO",
    suspender: "SUSPENDER OPERARIO",
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-[150] p-4">
      <div className={`bg-[#1a1a1a] border-2 ${isSuspender ? "border-[#ef4444]" : "border-[#3b82f6]"} rounded-xl max-w-lg w-full shadow-[0_0_40px_rgba(59,130,246,0.2)] max-h-[90vh] overflow-hidden flex flex-col`}>

        {/* Header */}
        <div className="bg-[#222] border-b border-gray-800 px-6 py-5 flex items-center justify-between flex-shrink-0 rounded-t-xl">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${isSuspender ? "bg-[#ef4444]/20 border-[#ef4444]" : "bg-[#3b82f6]/20 border-[#3b82f6]"} border-2 rounded-xl flex items-center justify-center flex-shrink-0`}>
              {isSuspender
                ? <AlertTriangle size={24} className="text-[#ef4444]" />
                : <User size={24} className="text-[#3b82f6]" />}
            </div>
            <div>
              <h2 className="text-white font-['Space_Grotesk'] font-bold text-xl">{titleMap[modo]}</h2>
              <p className="text-[#71717a] font-['Inter'] text-xs mt-0.5">
                {isSuspender ? "Esta acción inhabilitará al operario temporalmente" : "Sistema de gestión de personal VisionQA"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6">
          {isSuspender ? (
            <div className="space-y-5">
              <div className="bg-[#ef4444]/10 border-2 border-[#ef4444] rounded-xl p-5">
                <p className="text-[#d4d4d8] font-['Inter'] text-base leading-relaxed">
                  Va a suspender al operario{" "}
                  <span className="text-white font-bold">{operario?.nombre}</span>{" "}
                  (Legajo: <span className="text-[#ef4444] font-['Liberation_Mono'] font-bold">{operario?.id}</span>).
                </p>
                <p className="text-[#a1a1aa] font-['Inter'] text-sm mt-3">
                  El operario no podrá acceder al sistema hasta que sea reactivado por un Administrador.
                </p>
              </div>
              <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-5 space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#71717a] font-['Inter'] text-sm">Legajo</span>
                  <span className="text-white font-['Liberation_Mono'] font-bold">{operario?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717a] font-['Inter'] text-sm">Turno</span>
                  <span className="text-white font-['Space_Grotesk'] font-bold">TURNO {operario?.turno}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#71717a] font-['Inter'] text-sm">Estación</span>
                  <span className="text-white font-['Space_Grotesk'] font-bold">{operario?.estacion}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Legajo (readonly en edición) */}
              <div>
                <label className="block text-[#a1a1aa] font-['Inter'] text-xs mb-2 uppercase tracking-wide">
                  Legajo {!isAgregar && <span className="text-[#52525b] ml-1">(no editable)</span>}
                </label>
                <input
                  type="text"
                  value={form.id}
                  disabled={!isAgregar}
                  onChange={(e) => handleChange("id", e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-gray-700 text-white font-['Liberation_Mono'] font-bold rounded-lg px-4 py-3 outline-none min-h-[52px] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Nombre */}
              <div>
                <label className="block text-[#a1a1aa] font-['Inter'] text-xs mb-2 uppercase tracking-wide">
                  Nombre Completo <span className="text-[#ef4444]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="APELLIDO, NOMBRE"
                  value={form.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value.toUpperCase())}
                  className={`w-full bg-[#1a1a1a] border ${errors.nombre ? "border-[#ef4444]" : "border-gray-700 hover:border-gray-500 focus:border-[#3b82f6]"} text-white font-['Inter'] rounded-lg px-4 py-3 outline-none transition-colors min-h-[52px]`}
                />
                {errors.nombre && (
                  <p className="text-[#ef4444] font-['Inter'] text-xs mt-1">{errors.nombre}</p>
                )}
              </div>

              {/* Turno + Estación */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#a1a1aa] font-['Inter'] text-xs mb-2 uppercase tracking-wide">Turno</label>
                  <div className="flex gap-2">
                    {TURNOS.map((t) => (
                      <button
                        key={t}
                        onClick={() => handleChange("turno", t)}
                        className={`flex-1 py-3 rounded-lg font-['Space_Grotesk'] font-bold transition-colors min-h-[52px] ${
                          form.turno === t
                            ? "bg-[#3b82f6] text-white"
                            : "bg-[#2a2a2a] border border-gray-700 text-[#71717a] hover:border-gray-500"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#a1a1aa] font-['Inter'] text-xs mb-2 uppercase tracking-wide">Estado</label>
                  <div className="flex gap-2">
                    {ESTADOS.map((e) => (
                      <button
                        key={e}
                        onClick={() => handleChange("estado", e)}
                        className={`flex-1 py-3 rounded-lg font-['Space_Grotesk'] font-bold text-xs transition-colors min-h-[52px] ${
                          form.estado === e
                            ? e === "ACTIVO" ? "bg-[#10b981] text-white" : "bg-[#f59e0b] text-black"
                            : "bg-[#2a2a2a] border border-gray-700 text-[#71717a] hover:border-gray-500"
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Estación */}
              <div>
                <label className="block text-[#a1a1aa] font-['Inter'] text-xs mb-2 uppercase tracking-wide">Estación Asignada</label>
                <div className="grid grid-cols-2 gap-2">
                  {ESTACIONES.map((est) => (
                    <button
                      key={est}
                      onClick={() => handleChange("estacion", est)}
                      className={`py-3 px-4 rounded-lg font-['Space_Grotesk'] font-bold text-sm transition-colors min-h-[52px] text-left ${
                        form.estacion === est
                          ? "bg-[#3b82f6]/20 border-2 border-[#3b82f6] text-[#3b82f6]"
                          : "bg-[#2a2a2a] border border-gray-700 text-[#71717a] hover:border-gray-500"
                      }`}
                    >
                      {est}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#222] border-t border-gray-800 px-6 py-5 flex gap-3 flex-shrink-0 rounded-b-xl">
          <button
            onClick={onClose}
            className="flex-1 bg-[#2a2a2a] hover:bg-[#333] border border-gray-700 text-white font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px]"
          >
            CANCELAR
          </button>
          <button
            onClick={isSuspender ? handleSuspender : handleSave}
            className={`flex-1 text-white font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px] flex items-center justify-center gap-2 ${
              isSuspender
                ? "bg-[#ef4444] hover:bg-red-600"
                : "bg-[#3b82f6] hover:bg-[#2563eb]"
            }`}
          >
            {isSuspender ? (
              <><AlertTriangle size={20} /> CONFIRMAR SUSPENSIÓN</>
            ) : (
              <><Save size={20} /> {isAgregar ? "AGREGAR OPERARIO" : "GUARDAR CAMBIOS"}</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
