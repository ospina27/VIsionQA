import { RouterProvider } from 'react-router';
import { router } from './routes';

/**
 * Los providers (AuthProvider, InspectionFlowProvider, RegistrosProvider)
 * viven en RootLayout, DENTRO del árbol del router.
 * Esto garantiza que React Router v7 (data mode) pueda acceder a los
 * contextos desde cualquier componente de ruta.
 */
export default function App() {
  return <RouterProvider router={router} />;
}
