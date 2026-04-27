import { useState } from "react";
import { X, Database, Save, CheckCircle } from "lucide-react";

interface NuevoProveedorData {
  nombre: string;
  categoria: string;
  rating: string;
  contacto: string;
  notas: string;
}

interface NuevoProveedorModalProps {
  onClose: () => void;
  onSave: (data: NuevoProveedorData) => void;
}

const CATEGORIAS = ["MATERIA PRIMA", "COMPONENTES", "ADITIVOS", "SERVICIOS"];
const RATINGS = [
  { value: "A", label: "A — Excelente", color: "text-[#10b981]", activeBg: "bg-[#10b981]" },
  { value: "B", label: "B — Bueno", color: "text-[#3b82f6]", activeBg: "bg-[#3b82f6]" },
  { value: "C", label: "C — Regular", color: "text-[#f59e0b]", activeBg: "bg-[#f59e0b]" },
];

export function NuevoProveedorModal({ onClose, onSave }: NuevoProveedorModalProps) {
  const [form, setForm] = useState<NuevoProveedorData>({
    nombre: "",
    categoria: "MATERIA PRIMA",
    rating: "A",
    contacto: "",
    notas: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof NuevoProveedorData, string>>>({});
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof NuevoProveedorData, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof NuevoProveedorData, string>> = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (form.nombre.trim().length < 4) e.nombre = "Mínimo 4 caracteres";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSaved(true);
    setTimeout(() => {
      onSave(form);
      onClose();
    }, 900);
  };

  const nextId = `PROV-${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-[150] p-4">
      <div className="bg-[#1a1a1a] border-2 border-[#10b981] rounded-xl max-w-lg w-full shadow-[0_0_40px_rgba(16,185,129,0.2)] max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-[#222] border-b border-gray-800 px-6 py-5 flex items-center justify-between flex-shrink-0 rounded-t-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#10b981]/20 border-2 border-[#10b981] rounded-xl flex items-center justify-center flex-shrink-0">
              <Database size={24} className="text-[#10b981]" />
            </div>
            <div>
              <h2 className="text-white font-['Space_Grotesk'] font-bold text-xl">NUEVO PROVEEDOR</h2>
              <p className="text-[#71717a] font-['Inter'] text-xs mt-0.5">Registro de proveedor homologado VisionQA</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {saved ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 gap-4">
            <div className="w-20 h-20 bg-[#10b981]/20 border-2 border-[#10b981] rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle size={44} className="text-[#10b981]" />
            </div>
            <p className="text-white font-['Space_Grotesk'] font-bold text-xl">PROVEEDOR REGISTRADO</p>
            <p className="text-[#10b981] font-['Liberation_Mono'] font-bold">{nextId}</p>
          </div>
        ) : (
          <>
            {/* Body */}
            <div className="overflow-y-auto flex-1 p-6 space-y-5">
              {/* ID generado automáticamente */}
              <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-4 flex items-center justify-between">
                <span className="text-[#71717a] font-['Inter'] text-sm">ID generado automáticamente:</span>
                <span className="text-[#10b981] font-['Liberation_Mono'] font-bold">{nextId}</span>
              </div>

              {/* Nombre */}
              <div>
                <label className="block text-[#a1a1aa] font-['Inter'] text-xs mb-2 uppercase tracking-wide">
                  Nombre del Proveedor <span className="text-[#ef4444]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ej: PLÁSTICOS_DEL_SUR"
                  value={form.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value.toUpperCase().replace(/ /g, "_"))}
                  className={`w-full bg-[#1a1a1a] border ${errors.nombre ? "border-[#ef4444]" : "border-gray-700 hover:border-gray-500 focus:border-[#10b981]"} text-white font-['Liberation_Mono'] rounded-lg px-4 py-3 outline-none transition-colors min-h-[52px]`}
                />
                {errors.nombre && (
                  <p className="text-[#ef4444] font-['Inter'] text-xs mt-1">{errors.nombre}</p>
                )}
              </div>

              {/* Categoría */}
              <div>
                <label className="block text-[#a1a1aa] font-['Inter'] text-xs mb-2 uppercase tracking-wide">Categoría</label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIAS.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleChange("categoria", cat)}
                      className={`py-3 px-4 rounded-lg font-['Space_Grotesk'] font-bold text-sm transition-colors min-h-[52px] ${
                        form.categoria === cat
                          ? "bg-[#10b981]/20 border-2 border-[#10b981] text-[#10b981]"
                          : "bg-[#2a2a2a] border border-gray-700 text-[#71717a] hover:border-gray-500"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-[#a1a1aa] font-['Inter'] text-xs mb-2 uppercase tracking-wide">Rating Inicial</label>
                <div className="grid grid-cols-3 gap-3">
                  {RATINGS.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => handleChange("rating", r.value)}
                      className={`py-4 rounded-xl font-['Space_Grotesk'] font-bold text-sm transition-all min-h-[64px] flex flex-col items-center justify-center gap-1 ${
                        form.rating === r.value
                          ? `${r.activeBg} text-white shadow-lg`
                          : "bg-[#2a2a2a] border border-gray-700 text-[#71717a] hover:border-gray-500"
                      }`}
                    >
                      <span className="text-2xl">{r.value}</span>
                      <span className="text-[10px] opacity-80">{r.label.split("—")[1]?.trim()}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contacto */}
              <div>
                <label className="block text-[#a1a1aa] font-['Inter'] text-xs mb-2 uppercase tracking-wide">Contacto Comercial</label>
                <input
                  type="text"
                  placeholder="nombre@empresa.com"
                  value={form.contacto}
                  onChange={(e) => handleChange("contacto", e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-gray-700 hover:border-gray-500 focus:border-[#10b981] text-white font-['Inter'] rounded-lg px-4 py-3 outline-none transition-colors min-h-[52px]"
                />
              </div>

              {/* Notas */}
              <div>
                <label className="block text-[#a1a1aa] font-['Inter'] text-xs mb-2 uppercase tracking-wide">Notas de Homologación</label>
                <textarea
                  placeholder="Observaciones, condiciones contractuales, certificaciones..."
                  value={form.notas}
                  onChange={(e) => handleChange("notas", e.target.value)}
                  rows={3}
                  className="w-full bg-[#1a1a1a] border border-gray-700 hover:border-gray-500 focus:border-[#10b981] text-white font-['Inter'] text-sm rounded-lg px-4 py-3 outline-none transition-colors resize-none"
                />
              </div>
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
                onClick={handleSave}
                className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white font-['Space_Grotesk'] font-bold py-4 rounded-xl transition-colors min-h-[64px] flex items-center justify-center gap-2"
              >
                <Save size={20} />
                REGISTRAR PROVEEDOR
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
