import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Mail, PenSquare, Package, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout, isAuthenticated } = useAuth();

  const scrollToHowItWorks = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("how-it-works")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    } else {
      document.getElementById("how-it-works")?.scrollIntoView({
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-indigo-100/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="h-9 w-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold tracking-tight text-gray-900">
                Letter<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Flow</span>
              </span>
              <span className="text-[10px] text-gray-400 -mt-0.5">
                Anonymous Letters
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={scrollToHowItWorks}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                location.pathname === "/" && location.hash === "#how-it-works"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
              }`}
            >
              How it works
            </button>
          </nav>

          {/* DESKTOP AUTH */}
          <div className="hidden md:flex items-center gap-2">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm hover:shadow"
                >
                  Log in
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm hover:shadow"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/orders")}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                    isActive("/orders")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
                  }`}
                >
                  <Package className="h-4 w-4" />
                  Orders
                </button>

                {user?.role === "admin" && (
                  <button
                    onClick={() => navigate("/admin")}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                      isActive("/admin")
                        ? "text-purple-600 bg-purple-50"
                        : "text-gray-600 hover:text-purple-600 hover:bg-purple-50/50"
                    }`}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Admin
                  </button>
                )}

                <div className="flex items-center gap-3 ml-2 pl-2 border-l border-gray-200">
                  <span className="text-sm font-medium text-gray-700">
                    Hi, {user?.name?.split(' ')[0] || 'User'}
                  </span>
                  
                  <button
                    onClick={logout}
                    className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}

            <button
              onClick={() => navigate("/write")}
              className="ml-2 px-5 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm hover:shadow flex items-center gap-2"
            >
              <PenSquare className="h-4 w-4" />
              Write Letter
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-indigo-100/20 bg-white/95 backdrop-blur-md">
          <div className="px-4 py-3 space-y-1">
            
            {isAuthenticated && (
              <div className="px-4 py-3 mb-2">
                <span className="text-sm font-medium text-gray-900">
                  Hi, {user?.name}
                </span>
              </div>
            )}

            <button
              onClick={scrollToHowItWorks}
              className="w-full px-4 py-3 text-left text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all"
            >
              How it works
            </button>

            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Log in
                </button>

                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/orders");
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all flex items-center gap-3"
                >
                  <Package className="h-4 w-4" />
                  My Orders
                </button>

                {user?.role === "admin" && (
                  <button
                    onClick={() => {
                      navigate("/admin");
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-purple-50/50 rounded-lg transition-all flex items-center gap-3"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Admin Panel
                  </button>
                )}

                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                >
                  Logout
                </button>
              </>
            )}

            <button
              onClick={() => {
                navigate("/write");
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-3"
            >
              <PenSquare className="h-4 w-4" />
              Write a Letter
            </button>
          </div>
        </div>
      )}
    </header>
  );
}