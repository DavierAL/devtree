import { useLocation } from "react-router-dom";
import HomeNavigation from "./nav/HomeNavigation";
import AdminNavigation from "./nav/AdminNavigation";
import Logo from "./Logo";
import type { JSX } from "react";

export default function Header(): JSX.Element {
  const location = useLocation();
  const path = location.pathname;

  const showHomeNav = path === "/" || path.startsWith("/auth");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Logo />
        </div>

        <nav className="flex items-center gap-3">
          {showHomeNav ? <HomeNavigation /> : <AdminNavigation />}
        </nav>
      </div>
    </header>
  );
}
