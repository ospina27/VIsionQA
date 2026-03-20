import { createBrowserRouter } from "react-router";
import { LoginOperativo } from "./pages/LoginOperativo";
import { SetupLote } from "./pages/SetupLote";
import { Calibracion } from "./pages/Calibracion";
import { DashboardCore } from "./pages/DashboardCoreResponsive";
import { DashboardInspeccion } from "./pages/DashboardInspeccion";
import { TicketCierre } from "./pages/TicketCierre";
import { DashboardAdmin } from "./pages/DashboardAdmin";
import { Reportes } from "./pages/Reportes";
import { Registros } from "./pages/Registros";
import { Criterios } from "./pages/Criterios";
import { Administracion } from "./pages/Administracion";
import { Alertas } from "./pages/Alertas";
import { ErrorBoundary } from "./components/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginOperativo,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/setup",
    Component: SetupLote,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/calibracion",
    Component: Calibracion,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/inspeccion",
    Component: DashboardInspeccion,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard",
    Component: DashboardInspeccion,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard-old",
    Component: DashboardCore,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/cierre",
    Component: TicketCierre,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/criterios",
    Component: Criterios,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/reportes",
    Component: Reportes,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/reportes-old",
    Component: DashboardAdmin,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/registros",
    Component: Registros,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/admin",
    Component: Administracion,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/emergencia",
    Component: Alertas,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/alertas",
    Component: Alertas,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    Component: ErrorBoundary,
  },
]);