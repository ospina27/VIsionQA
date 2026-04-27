import { createContext, useContext, useState, ReactNode } from "react";

export type RolAcceso = "ADMINISTRADOR" | "ANALISTA_CALIDAD" | "OPERARIO";
export type TipoOrganizacion = "ABASTECEDOR" | "PRODUCTOR";

interface User {
  id: string;
  nombre: string;
  rolAcceso: RolAcceso;
  tipoOrg: TipoOrganizacion;
  legajo?: string;
}

interface AuthContextType {
  user: User | null;
  login: (id: string, nombre: string, rolAcceso: RolAcceso, tipoOrg: TipoOrganizacion, legajo?: string) => void;
  logout: () => void;
  isAdmin: () => boolean;
  isAnalista: () => boolean;
  isOperario: () => boolean;
  isProductor: () => boolean;
  isAbastecedor: () => boolean;
  canAccessTransmision: () => boolean;
  canAccessReportes: () => boolean;
  canAccessSistema: () => boolean;
  canManageProveedores: () => boolean;
  needsProveedorSelection: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem("visionqa_user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const login = (id: string, nombre: string, rolAcceso: RolAcceso, tipoOrg: TipoOrganizacion, legajo?: string) => {
    const u: User = { id, nombre, rolAcceso, tipoOrg, legajo };
    setUser(u);
    try { localStorage.setItem("visionqa_user", JSON.stringify(u)); } catch (e) { /* noop */ }
  };

  const logout = () => {
    setUser(null);
    try { localStorage.removeItem("visionqa_user"); } catch (e) { /* noop */ }
  };

  const isAdmin = () => user?.rolAcceso === "ADMINISTRADOR";
  const isAnalista = () => user?.rolAcceso === "ANALISTA_CALIDAD";
  const isOperario = () => user?.rolAcceso === "OPERARIO";
  const isProductor = () => user?.tipoOrg === "PRODUCTOR";
  const isAbastecedor = () => user?.tipoOrg === "ABASTECEDOR";

  // Permisos de acceso a pestañas
  const canAccessTransmision = () => isOperario() || isAnalista();
  const canAccessReportes = () => isAdmin();
  const canAccessSistema = () => isAdmin();

  // Permisos específicos de funcionalidades
  const canManageProveedores = () => isAdmin() && isAbastecedor();
  const needsProveedorSelection = () => isAbastecedor();

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAdmin,
      isAnalista,
      isOperario,
      isProductor,
      isAbastecedor,
      canAccessTransmision,
      canAccessReportes,
      canAccessSistema,
      canManageProveedores,
      needsProveedorSelection
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // Fallback seguro para el preview de componentes de Figma Make (render en iframe aislado)
    console.warn(
      "[VisionQA] useAuth llamado fuera de AuthProvider. " +
      "Usando fallback de desarrollo — esto NO ocurrirá en el flujo real de la app."
    );
    return {
      user: null as null,
      login: (_id: string, _nombre: string, _rolAcceso: RolAcceso, _tipoOrg: TipoOrganizacion, _legajo?: string) => {},
      logout: () => {},
      isAdmin:    () => false,
      isAnalista: () => false,
      isOperario: () => false,
      isProductor: () => false,
      isAbastecedor: () => false,
      canAccessTransmision: () => false,
      canAccessReportes: () => false,
      canAccessSistema: () => false,
      canManageProveedores: () => false,
      needsProveedorSelection: () => false,
    };
  }
  return context;
}