import { Outlet } from "react-router";
import { AuthProvider } from "../contexts/AuthContext";
import { ConfiguracionProvider } from "../contexts/ConfiguracionContext";
import { InspectionFlowProvider } from "../contexts/InspectionFlowContext";
import { RegistrosProvider } from "../context/RegistrosContext";
import { ModalProvider } from "../contexts/ModalContext";
import { OfflineBanner } from "./OfflineBanner";

export function RootLayout() {
  return (
    <ConfiguracionProvider>
      <AuthProvider>
        <InspectionFlowProvider>
          <RegistrosProvider>
            <ModalProvider>
              <Outlet />
              {/* Banner global de conectividad — visible en todas las rutas */}
              <OfflineBanner />
            </ModalProvider>
          </RegistrosProvider>
        </InspectionFlowProvider>
      </AuthProvider>
    </ConfiguracionProvider>
  );
}