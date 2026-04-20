import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Package, LogIn, LogOut, UserPlus, Menu, X, Zap } from "lucide-react";

const CENTER_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Read auth state — adjust this to match however your app stores the token/user
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const isActive = (path) => location.pathname === path;

  // Build right-side action links dynamically
  const rightLinks = [
    { to: "/cart",   label: "Cart",   icon: ShoppingCart },
    { to: "/orders", label: "Orders", icon: Package },
  ];

  if (isLoggedIn) {
    rightLinks.push({ to: null, label: "Logout", icon: LogOut, action: handleLogout });
  } else {
    rightLinks.push({ to: "/login",    label: "Login",    icon: LogIn });
    rightLinks.push({ to: "/register", label: "Register", icon: UserPlus, isRegister: true });
  }

  // All links for mobile (center + right merged)
  const mobileLinks = [
    ...CENTER_LINKS,
    ...rightLinks,
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');

        .nb * { box-sizing: border-box; }

        .nb {
          position: sticky;
          top: 0;
          z-index: 500;
          width: 100%;
          background: #080808;
          border-bottom: 0.5px solid rgba(255,255,255,0.07);
          font-family: 'Barlow Condensed', sans-serif;
          transition: box-shadow 0.3s, border-color 0.3s;
        }

        .nb.nb-scrolled {
          border-bottom-color: rgba(255,255,255,0.13);
          box-shadow: 0 8px 40px rgba(0,0,0,0.7);
        }

        .nb-row {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 clamp(16px, 5vw, 72px);
          height: 56px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        /* Logo */
        .nb-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .nb-logo-box {
          width: 30px;
          height: 30px;
          border-radius: 3px;
          border: 0.5px solid rgba(192,132,252,0.45);
          background: rgba(192,132,252,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, border-color 0.2s;
        }

        .nb-logo:hover .nb-logo-box {
          background: rgba(192,132,252,0.18);
          border-color: rgba(192,132,252,0.8);
        }

        .nb-logo-text {
          display: flex;
          flex-direction: column;
          gap: 1px;
          line-height: 1;
        }

        .nb-logo-eyebrow {
          font-family: 'Barlow', sans-serif;
          font-size: 8.5px;
          font-weight: 400;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
        }

        .nb-logo-name {
          font-size: 20px;
          font-weight: 900;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          color: #ffffff;
          line-height: 1;
        }

        .nb-logo-accent { color: #C084FC; }

        /* Center nav */
        .nb-center {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }

        .nb-cat {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          padding: 5px 14px;
          border-radius: 2px;
          border: 0.5px solid transparent;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
          white-space: nowrap;
        }

        .nb-cat:hover {
          color: rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.05);
        }

        .nb-cat.nb-active {
          color: #C084FC;
          background: rgba(192,132,252,0.09);
          border-color: rgba(192,132,252,0.3);
        }

        /* Right actions */
        .nb-right {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }

        .nb-action {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          padding: 5px 12px;
          border-radius: 2px;
          border: 0.5px solid transparent;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
          white-space: nowrap;
          background: none;
          cursor: pointer;
          font-family: 'Barlow Condensed', sans-serif;
        }

        .nb-action:hover {
          color: rgba(255,255,255,0.85);
          background: rgba(255,255,255,0.05);
        }

        .nb-action.nb-active {
          color: #C084FC;
          background: rgba(192,132,252,0.09);
          border-color: rgba(192,132,252,0.3);
        }

        .nb-action.nb-register {
          border-color: rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.55);
        }

        .nb-action.nb-register:hover {
          border-color: #C084FC;
          color: #C084FC;
          background: rgba(192,132,252,0.09);
        }

        .nb-action.nb-logout {
          color: rgba(255, 100, 100, 0.6);
          border-color: rgba(255, 100, 100, 0.15);
        }

        .nb-action.nb-logout:hover {
          color: #ff6464;
          background: rgba(255, 100, 100, 0.08);
          border-color: rgba(255, 100, 100, 0.35);
        }

        .nb-sep {
          width: 0.5px;
          height: 18px;
          background: rgba(255,255,255,0.1);
          flex-shrink: 0;
          margin: 0 2px;
        }

        /* Hamburger */
        .nb-burger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 2px;
          border: 0.5px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.55);
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
          flex-shrink: 0;
        }

        .nb-burger:hover {
          border-color: rgba(192,132,252,0.5);
          background: rgba(192,132,252,0.08);
          color: #C084FC;
        }

        /* Mobile panel */
        .nb-mobile {
          background: #0b0b0b;
          border-bottom: 0.5px solid rgba(255,255,255,0.06);
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s;
          position: sticky;
          top: 56px;
          z-index: 499;
        }

        .nb-mobile.nb-open {
          max-height: 500px;
          opacity: 1;
        }

        .nb-mobile-grid {
          max-width: 1440px;
          margin: 0 auto;
          padding: 12px clamp(16px, 5vw, 72px) 16px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px;
        }

        .nb-mobile-link {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.38);
          text-decoration: none;
          padding: 11px 14px;
          border-radius: 2px;
          border: 0.5px solid transparent;
          transition: all 0.2s;
          background: none;
          cursor: pointer;
          width: 100%;
        }

        .nb-mobile-link:hover {
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.75);
          border-color: rgba(255,255,255,0.08);
        }

        .nb-mobile-link.nb-active {
          background: rgba(192,132,252,0.08);
          border-color: rgba(192,132,252,0.25);
          color: #C084FC;
        }

        .nb-mobile-link.nb-logout-m {
          color: rgba(255, 100, 100, 0.55);
        }

        .nb-mobile-link.nb-logout-m:hover {
          color: #ff6464;
          background: rgba(255, 100, 100, 0.07);
          border-color: rgba(255, 100, 100, 0.2);
        }

        @media (max-width: 960px) {
          .nb-center { display: none; }
        }

        @media (max-width: 680px) {
          .nb-right { display: none; }
          .nb-burger { display: flex; }
        }
      `}</style>

      <nav className={`nb ${scrolled ? "nb-scrolled" : ""}`}>
        <div className="nb-row">

          {/* Logo */}
          <Link to="/" className="nb-logo">
            <div className="nb-logo-box">
              <Zap size={14} color="#C084FC" strokeWidth={2.5} />
            </div>
            <div className="nb-logo-text">
              <span className="nb-logo-eyebrow">Premium</span>
              <span className="nb-logo-name">
                Shopie<span className="nb-logo-accent">Shop</span>
              </span>
            </div>
          </Link>

          {/* Center */}
          <div className="nb-center">
            {CENTER_LINKS.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`nb-cat ${isActive(l.to) ? "nb-active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="nb-right">
            {rightLinks.map((l, i) => {
              const Icon = l.icon;
              const isLogoutBtn = l.label === "Logout";
              const showSep = i === 2 && !isLoggedIn; // sep before Login

              return (
                <span key={l.label} style={{ display: "contents" }}>
                  {showSep && <div className="nb-sep" />}
                  {l.action ? (
                    <button
                      onClick={l.action}
                      className={`nb-action nb-logout`}
                    >
                      <Icon size={12} strokeWidth={2} />
                      {l.label}
                    </button>
                  ) : (
                    <Link
                      to={l.to}
                      className={`nb-action ${isActive(l.to) ? "nb-active" : ""} ${l.isRegister ? "nb-register" : ""}`}
                    >
                      <Icon size={12} strokeWidth={2} />
                      {l.label}
                    </Link>
                  )}
                </span>
              );
            })}
          </div>

          {/* Burger */}
          <button
            className="nb-burger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={15} /> : <Menu size={15} />}
          </button>

        </div>
      </nav>

      {/* Mobile dropdown */}
      <div className={`nb-mobile ${menuOpen ? "nb-open" : ""}`}>
        <div className="nb-mobile-grid">
          {mobileLinks.map(l => {
            const Icon = l.icon;
            const isLogoutBtn = l.label === "Logout";

            return l.action ? (
              <button
                key={l.label}
                onClick={l.action}
                className="nb-mobile-link nb-logout-m"
              >
                {Icon && <Icon size={12} strokeWidth={2} />}
                {l.label}
              </button>
            ) : (
              <Link
                key={l.to + l.label}
                to={l.to}
                className={`nb-mobile-link ${isActive(l.to) ? "nb-active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {Icon && <Icon size={12} strokeWidth={2} />}
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}