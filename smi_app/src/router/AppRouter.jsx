import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { HomePage } from "../home/pages/HomePage";
import { useAuthStore } from "../hooks";


// Common
import { Spinner } from "../ui/components/Spinner";

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

          {/* Proffers */}
          {/* <Route path="/rutas/" element={<ListProffer />} />
          <Route
            path="/propuestas/mis_propuestas"
            element={<ListMyProffer />}
          /> */}
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      )}

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
