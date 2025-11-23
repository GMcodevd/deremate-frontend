import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";

const PrivateRoute = () => {
  const { isUserLogged } = useAuth();
  const token = localStorage.getItem("token");

  // Si no hay token o el usuario no está logueado, redirige
  if (!isUserLogged || !token) {
    return <Navigate to="/login" replace />;
  }

  // Si todo está bien, renderiza el contenido protegido
  return <Outlet />;
};

export default PrivateRoute;
