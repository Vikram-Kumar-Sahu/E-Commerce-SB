import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ShoppingBag, 
  ShoppingCart, 
  Package, 
  LogIn, 
  UserPlus,
  Menu,
  X 
} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Products", icon: ShoppingBag },
    { to: "/cart", label: "Cart", icon: ShoppingCart },
    { to: "/orders", label: "Orders", icon: Package },
    { to: "/login", label: "Login", icon: LogIn },
    { to: "/register", label: "Register", icon: UserPlus },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Shop Name */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white font-bold text-xl md:text-2xl hover:opacity-90 transition-opacity"
          >
            <ShoppingBag className="w-6 h-6 md:w-7 md:h-7" />
            <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
              ShopieShop
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-white text-purple-600 shadow-md"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-sm border-t border-white/20">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? "text-purple-600" : "text-gray-500"}`} />
                  <span className="font-medium">{link.label}</span>
                  {active && (
                    <div className="ml-auto w-1.5 h-8 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Optional: Cart Badge - Uncomment and implement cart count logic */}
      {/* <div className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {cartCount}
      </div> */}
    </nav>
  );
}