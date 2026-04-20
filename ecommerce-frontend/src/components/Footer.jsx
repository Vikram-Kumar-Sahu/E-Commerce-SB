import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Zap, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const LINKS_SHOP = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Collection" },
  { to: "/cart", label: "Cart" },
  { to: "/orders", label: "Orders" },
];

const LINKS_SUPPORT = [
  { to: "#", label: "Contact Us" },
  { to: "#", label: "FAQs" },
  { to: "#", label: "Privacy Policy" },
  { to: "#", label: "Terms of Service" },
];

const CATEGORIES = [
  { to: "/products?cat=running", label: "Running" },
  { to: "/products?cat=jordan", label: "Jordan" },
  { to: "/products?cat=yeezy", label: "Yeezy" },
  { to: "/products?cat=lifestyle", label: "Lifestyle" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');

        .ft-root {
          background: #050505;
          border-top: 0.5px solid rgba(255,255,255,0.08);
          font-family: 'Barlow', sans-serif;
          color: rgba(255,255,255,0.4);
          position: relative;
          overflow: hidden;
        }

        /* Subtle purple glow top-left */
        .ft-root::before {
          content: '';
          position: absolute;
          top: -120px;
          left: -80px;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(192,132,252,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .ft-inner {
          position: relative;
          max-width: 1440px;
          margin: 0 auto;
          padding: clamp(48px, 6vw, 80px) clamp(16px, 5vw, 72px) 0;
        }

        /* Top grid */
        .ft-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1fr;
          gap: 40px clamp(24px, 4vw, 60px);
        }

        /* Brand col */
        .ft-brand-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 18px;
        }

        .ft-brand-icon {
          width: 30px;
          height: 30px;
          border: 0.5px solid rgba(192,132,252,0.4);
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(192,132,252,0.07);
        }

        .ft-brand-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 22px;
          font-weight: 900;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #fff;
        }

        .ft-brand-name span { color: #C084FC; }

        .ft-tagline {
          font-size: 13px;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255,255,255,0.32);
          max-width: 280px;
          margin-bottom: 24px;
          letter-spacing: 0.01em;
        }

        /* Social row */
        .ft-socials {
          display: flex;
          gap: 8px;
        }

        .ft-social-btn {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 2px;
          border: 0.5px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          font-size: 14px;
          transition: border-color 0.2s, background 0.2s, color 0.2s, transform 0.2s;
        }

        .ft-social-btn:hover {
          border-color: rgba(192,132,252,0.5);
          background: rgba(192,132,252,0.1);
          color: #C084FC;
          transform: translateY(-2px);
        }

        /* Column headings */
        .ft-col-heading {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.22);
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 0.5px solid rgba(255,255,255,0.07);
        }

        /* Nav links */
        .ft-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.02em;
          color: rgba(255,255,255,0.38);
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.2s, gap 0.2s;
        }

        .ft-link svg {
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.2s, transform 0.2s;
        }

        .ft-link:hover {
          color: rgba(255,255,255,0.8);
          gap: 10px;
        }

        .ft-link:hover svg {
          opacity: 1;
          transform: translateX(0);
        }

        .ft-link-list {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        /* Contact items */
        .ft-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.35);
          padding: 6px 0;
          line-height: 1.5;
        }

        .ft-contact-icon {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 2px;
          border: 0.5px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          flex-shrink: 0;
          margin-top: 1px;
        }

        /* Divider */
        .ft-rule {
          width: 100%;
          height: 0.5px;
          background: rgba(255,255,255,0.07);
          margin-top: 52px;
        }

        /* Bottom bar */
        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 0 20px;
          flex-wrap: wrap;
        }

        .ft-copy {
          font-family: 'Barlow', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.2);
        }

        .ft-copy span {
          color: rgba(192,132,252,0.5);
        }

        .ft-bottom-links {
          display: flex;
          gap: 20px;
        }

        .ft-bottom-link {
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.2);
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.2s;
        }

        .ft-bottom-link:hover { color: rgba(255,255,255,0.5); }

        /* Badge */
        .ft-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border: 0.5px solid rgba(192,132,252,0.2);
          border-radius: 2px;
          background: rgba(192,132,252,0.05);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(192,132,252,0.55);
        }

        .ft-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #C084FC;
          opacity: 0.6;
          animation: ft-pulse 2.4s ease-in-out infinite;
        }

        @keyframes ft-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.3); }
        }

        @media (max-width: 900px) {
          .ft-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 540px) {
          .ft-grid {
            grid-template-columns: 1fr;
          }
          .ft-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>

      <footer className="ft-root">
        <div className="ft-inner">

          <div className="ft-grid">

            {/* Brand */}
            <div>
              <Link to="/" className="ft-brand-logo">
                <div className="ft-brand-icon">
                  <Zap size={14} color="#C084FC" strokeWidth={2.5} />
                </div>
                <span className="ft-brand-name">Shopie<span>Shop</span></span>
              </Link>

              <p className="ft-tagline">
                Premium footwear curated for those who move with intention. 
                Style meets performance in every step.
              </p>

              <div className="ft-socials">
                <a href="#" className="ft-social-btn" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" className="ft-social-btn" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" className="ft-social-btn" aria-label="LinkedIn"><FaLinkedin /></a>
              </div>
            </div>

            {/* Shop */}
            <div>
              <p className="ft-col-heading">Shop</p>
              <div className="ft-link-list">
                {LINKS_SHOP.map(l => (
                  <Link key={l.to} to={l.to} className="ft-link">
                    <ArrowUpRight size={11} />
                    {l.label}
                  </Link>
                ))}
                <div style={{ marginTop: 8, paddingTop: 10, borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)", marginBottom: 8 }}>
                    Categories
                  </p>
                  {CATEGORIES.map(l => (
                    <Link key={l.to} to={l.to} className="ft-link">
                      <ArrowUpRight size={11} />
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Support */}
            <div>
              <p className="ft-col-heading">Support</p>
              <div className="ft-link-list">
                {LINKS_SUPPORT.map(l => (
                  <Link key={l.label} to={l.to} className="ft-link">
                    <ArrowUpRight size={11} />
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="ft-col-heading">Contact</p>

              <div className="ft-contact-item">
                <div className="ft-contact-icon">
                  <Mail size={12} color="rgba(192,132,252,0.55)" />
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 2 }}>Email</div>
                  support@shopieshop.com
                </div>
              </div>

              <div className="ft-contact-item">
                <div className="ft-contact-icon">
                  <Phone size={12} color="rgba(192,132,252,0.55)" />
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 2 }}>Phone</div>
                  +91 98765 43210
                </div>
              </div>

              <div className="ft-contact-item">
                <div className="ft-contact-icon">
                  <MapPin size={12} color="rgba(192,132,252,0.55)" />
                </div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 2 }}>Location</div>
                  Kolkata, India
                </div>
              </div>

              {/* Status badge */}
              <div style={{ marginTop: 20 }}>
                <span className="ft-badge">
                  <span className="ft-badge-dot" />
                  All systems online
                </span>
              </div>
            </div>

          </div>

          <div className="ft-rule" />

          <div className="ft-bottom">
            <p className="ft-copy">
              © {year} <span>ShopieShop</span>. All rights reserved.
            </p>
            <div className="ft-bottom-links">
              <Link to="#" className="ft-bottom-link">Privacy</Link>
              <Link to="#" className="ft-bottom-link">Terms</Link>
              <Link to="#" className="ft-bottom-link">Sitemap</Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}