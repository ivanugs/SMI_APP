import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { HomePage } from "../home/pages/HomePage";
import { useAuthStore } from "../hooks";
import { CreateUserPage } from "../admin/pages/CreateUserPage";

// Common
import { Spinner } from "../ui/components/Spinner";
import { HospitalesCercanosPage, HospitalesPage } from "../hospitales";
import { AsistenciaPage, ListUserPage, PacientePage } from "../admin";

export const AppRouter = () => {
  // const authStatus = 'authenticated';
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  // Todo ingresar una animación de carga
  if (status === "checking") {
    return <Spinner />;
  }

  return (
    <Routes>
      {status === "not-authenticated" ? (
        // Private routes
        <>
          <Route path="/auth/*" element={<LoginPage />} />
          <Route
            path="/server-status"
            element={<Navigate to="/server-status" />}
          />
          <Route path="/*" element={<Navigate to="/auth/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<HomePage />} />

          {/* Hospitals */}
          <Route path="/hospitales/" element={<HospitalesPage />} />
          <Route path="/hospitales/cercano" element={<HospitalesCercanosPage />} />
          {/* Admin */}
          <Route path="/usuarios/" element={<ListUserPage />} />
          <Route path="/usuarios/create" element={<CreateUserPage />} />
          <Route path="/pacientes/" element={<PacientePage />} />
          <Route path="/pacientes/asistencia" element={<AsistenciaPage />} />

          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
