import { Link, useNavigate, useLocation } from "react-router-dom";
import { SITE_NAME } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ui/ThemeToggle";
import GooeyNav from "./GooeyNav";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  // Define navigation items based on auth state
  const navItems = user
    ? [
        { href: "/explore", label: "Explore" },
        { href: "/upload", label: "Upload" },
        { href: "/my-components", label: "My Components" },
        { href: "/collection", label: "Collection" },
        { href: "/learning", label: "Learning" },
      ]
    : [{ href: "/explore", label: "Explore" }];

  // Update active index based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const index = navItems.findIndex((item) => item.href === currentPath);
    if (index !== -1) {
      setActiveNavIndex(index);
    }
  }, [location.pathname, navItems.length]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavClick = (index, item) => {
    setActiveNavIndex(index);
    navigate(item.href);
  };

  return (
    <header className="w-full border-b border-theme surface backdrop-blur-md sticky top-0 z-40 bg-light-bg/80 dark:bg-dark-bg/80">
      <nav className="w-full max-w-[1920px] mx-auto px-6 flex items-center justify-between py-3">
        <Link
          to={user ? "/home" : "/explore"}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <img
            src="/logo.png"
            alt="Nirmaan UI Logo"
            className="h-8 w-8 object-contain"
          />
          <span className="font-bold text-2xl bg-gradient-signature bg-clip-text text-transparent">
            Nm
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {/* Gooey Navigation */}
          <GooeyNav
            items={navItems}
            initialActiveIndex={activeNavIndex}
            onItemClick={handleNavClick}
            animationTime={500}
            particleCount={12}
            particleDistances={[80, 8]}
          />

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 pl-4 border-l border-light-border dark:border-dark-border">
            {user && (
              <span className="text-sm text-secondary">
                Hi, <span className="text-accent font-medium">{user.name}</span>
              </span>
            )}

            <ThemeToggle />

            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md text-sm font-medium text-neon-red hover:bg-neon-red/10 transition-all"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium hover:bg-light-surface dark:hover:bg-dark-surface transition-colors"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-accent px-4 py-2 text-sm">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
