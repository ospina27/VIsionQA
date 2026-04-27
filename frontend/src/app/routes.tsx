import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { LoginOperativo } from "./pages/LoginOperativo";
import { SetupLote } from "./pages/SetupLote";
import { VerificacionPreturno } from "./pages/VerificacionPreturno";
import { Calibracion } from "./pages/Calibracion";
import { ResumenPreInspeccion } from "./pages/ResumenPreInspeccion";
import { DashboardCore } from "./pages/DashboardCoreResponsive";
import { DashboardInspeccion } from "./pages/DashboardInspeccion";
import { TicketCierre } from "./pages/TicketCierre";
import { DashboardAdmin } from "./pages/DashboardAdmin";
import { Reportes } from "./pages/Reportes";
import { Criterios } from "./pages/Criterios";
import { Administracion } from "./pages/Administracion";
import { Alertas } from "./pages/Alertas";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ProtectedErrorBoundary } from "./components/ProtectedErrorBoundary";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { FlowProtectedRoute } from "./components/FlowProtectedRoute";

export const router = createBrowserRouter([
  {
    // RootLayout es la raíz que provee TODOS los contextos dentro del árbol
    // del router. Esto soluciona el problema de React Router v7 donde los
    // providers externos a RouterProvider no son accesibles desde las rutas.
    Component: RootLayout,
    errorElement: <ProtectedErrorBoundary />,
    children: [
      {
        path: "/",
        Component: LoginOperativo,
      },
      {
        path: "/setup",
        element: (
          <FlowProtectedRoute requireState="setup">
            <SetupLote />
          </FlowProtectedRoute>
        ),
      },
      {
        path: "/verificacion",
        element: (
          <FlowProtectedRoute requireState="verification">
            <VerificacionPreturno />
          </FlowProtectedRoute>
        ),
      },
      {
        path: "/calibracion",
        element: (
          <FlowProtectedRoute requireState="calibration">
            <Calibracion />
          </FlowProtectedRoute>
        ),
      },
      {
        path: "/pre-inspeccion",
        element: (
          <FlowProtectedRoute requireState="calibration">
            <ResumenPreInspeccion />
          </FlowProtectedRoute>
        ),
      },
      {
        path: "/inspeccion",
        element: (
          <FlowProtectedRoute requireState="inspection">
            <DashboardInspeccion />
          </FlowProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <FlowProtectedRoute requireState="inspection">
            <DashboardInspeccion />
          </FlowProtectedRoute>
        ),
      },
      {
        path: "/dashboard-old",
        Component: DashboardCore,
      },
      {
        path: "/cierre",
        element: (
          <FlowProtectedRoute requireState="cierre">
            <TicketCierre />
          </FlowProtectedRoute>
        ),
      },
      {
        path: "/criterios",
        Component: Criterios,
      },
      {
        path: "/reportes",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <Reportes />
          </ProtectedRoute>
        ),
      },
      {
        path: "/reportes-old",
        Component: DashboardAdmin,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <Administracion />
          </ProtectedRoute>
        ),
      },
      {
        path: "/emergencia",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <Alertas />
          </ProtectedRoute>
        ),
      },
      {
        path: "/alertas",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <Alertas />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        Component: ErrorBoundary,
      },
    ],
  },
]);