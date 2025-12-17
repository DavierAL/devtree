import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AuthLayout from "./layouts/AuthLayot";
import AppLayout from "./layouts/AppLayout";
import LinkTreeView from "./views/LinkTreeView";
import ProfileView from "./views/ProfileView";
import HomeView from "./views/HomeView";
import PublicProfileView from "./views/PublicProfileView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<HomeView />} />

        {/* Rutas de autenticación */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>

        {/* Rutas del área de administración */}
        <Route path="/admin" element={<AppLayout />}>
          <Route index={true} element={<LinkTreeView />} />
          <Route path="profile" element={<ProfileView />} />
        </Route>

        {/* Ruta pública de perfil - debe ir al final para no interferir con otras rutas */}
        <Route path="/:handle" element={<PublicProfileView />} />
      </Routes>
    </BrowserRouter>
  );
}
