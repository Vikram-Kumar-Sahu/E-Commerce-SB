// Login.jsx — Dark Luxury Editorial · matches full site aesthetic
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm]               = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [rememberMe, setRememberMe]   = useState(false);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState(false);
  const [focused, setFocused]         = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      if (rememberMe && res.data.token) {
        localStorage.setItem("token", res.data.token);
      } else if (res.data.token) {
        sessionStorage.setItem("token", res.data.token);
      }
      setSuccess(true);
      setTimeout(() => navigate("/"), 1400);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-page {
          min-height: 100vh;
          background: #080808;
          display: flex;
          font-family: 'Barlow', sans-serif;
        }

        /* Left panel — decorative */
        .auth-left {
          flex: 1 1 0;
          position: relative;
          overflow: hidden;
          display: none;
        }
        @media (min-width: 900px) { .auth-left { display: block; } }

        .auth-left-bg {
          position: absolute; inset: 0;
          background: #0D0A1A;
        }
        .auth-left-grid {
          position: absolute; inset: 0; opacity: 0.04;
          background-image: linear-gradient(rgba(192,132,252,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(192,132,252,1) 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .auth-left-glow {
          position: absolute;
          width: 520px; height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(140,0,255,0.2) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .auth-left-content {
          position: relative; z-index: 2;
          height: 100%;
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: 48px;
        }
        .auth-brand {
          display: flex; align-items: center; gap: 10px;
        }
        .auth-brand-mark {
          width: 36px; height: 36px;
          border-radius: 2px;
          background: rgba(192,132,252,0.12);
          border: 0.5px solid rgba(192,132,252,0.35);
          display: flex; align-items: center; justify-content: center;
        }
        .auth-brand-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px; font-weight: 900;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.85);
        }
        .auth-left-hero { flex: 1; display: flex; flex-direction: column; justify-content: center; }
        .auth-left-eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: rgba(192,132,252,0.6);
          margin-bottom: 14px;
        }
        .auth-left-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(48px, 5.5vw, 76px);
          font-weight: 900; line-height: 0.88;
          letter-spacing: -0.01em; text-transform: uppercase;
          color: rgba(255,255,255,0.9);
        }
        .auth-left-title em { font-style: normal; color: rgba(255,255,255,0.18); }
        .auth-left-sub {
          font-size: 13px; font-weight: 300;
          color: rgba(255,255,255,0.28);
          line-height: 1.7; margin-top: 20px;
          max-width: 340px;
        }

        /* Floating shoe card decoration */
        .auth-shoe-card {
          background: #111;
          border: 0.5px solid rgba(255,255,255,0.07);
          border-radius: 3px;
          padding: 14px 16px;
          display: flex; align-items: center; gap: 12px;
          animation: auth-float 6s ease-in-out infinite;
        }
        @keyframes auth-float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        .auth-shoe-img {
          width: 52px; height: 52px;
          border-radius: 2px; background: #1a1a1a; overflow: hidden;
        }
        .auth-shoe-img img { width: 100%; height: 100%; object-fit: cover; }
        .auth-shoe-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 14px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.04em;
          color: rgba(255,255,255,0.8);
          margin-bottom: 3px;
        }
        .auth-shoe-price {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px; font-weight: 600;
          color: rgba(192,132,252,0.8);
        }
        .auth-shoe-badge {
          margin-left: auto; flex-shrink: 0;
          background: rgba(74,222,128,0.1);
          border: 0.5px solid rgba(74,222,128,0.3);
          border-radius: 1px; padding: 3px 8px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #4ade80;
        }

        /* Right panel — form */
        .auth-right {
          flex: 0 0 clamp(340px, 44vw, 520px);
          display: flex; align-items: center; justify-content: center;
          padding: clamp(32px, 5vw, 64px) clamp(24px, 5vw, 60px);
          border-left: 0.5px solid rgba(255,255,255,0.05);
          position: relative;
        }
        @media (max-width: 899px) {
          .auth-right { flex: 1 1 100%; border-left: none; }
        }

        .auth-form-wrap { width: 100%; max-width: 380px; }

        /* Form header */
        .auth-form-eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: rgba(192,132,252,0.6);
          display: block; margin-bottom: 8px;
        }
        .auth-form-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 900; letter-spacing: -0.01em;
          text-transform: uppercase; line-height: 0.9;
          color: rgba(255,255,255,0.9);
          margin-bottom: 6px;
        }
        .auth-form-title em { font-style: normal; color: rgba(255,255,255,0.18); }
        .auth-form-sub {
          font-size: 12px; font-weight: 300;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.03em;
          margin-bottom: 32px;
        }

        /* Error banner */
        .auth-error {
          display: flex; align-items: center; gap: 8px;
          background: rgba(251,113,133,0.08);
          border: 0.5px solid rgba(251,113,133,0.3);
          border-radius: 2px;
          padding: 10px 12px;
          margin-bottom: 18px;
          animation: auth-shake 0.4s cubic-bezier(0.36,0.07,0.19,0.97);
        }
        @keyframes auth-shake {
          10%,90% { transform: translateX(-2px); }
          20%,80% { transform: translateX(3px); }
          30%,50%,70% { transform: translateX(-3px); }
          40%,60% { transform: translateX(3px); }
        }
        .auth-error-text {
          font-size: 12px; font-weight: 300;
          color: rgba(251,113,133,0.85);
          letter-spacing: 0.02em;
        }

        /* Success overlay */
        .auth-success {
          position: absolute; inset: 0; z-index: 50;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 12px;
          background: rgba(8,8,8,0.94);
          backdrop-filter: blur(14px);
          animation: auth-si 0.28s ease;
        }
        @keyframes auth-si { from { opacity: 0; } to { opacity: 1; } }
        .auth-success-ring {
          width: 56px; height: 56px; border-radius: 50%;
          background: rgba(74,222,128,0.08);
          border: 0.5px solid rgba(74,222,128,0.3);
          display: flex; align-items: center; justify-content: center;
          animation: auth-pop 0.38s cubic-bezier(0.34,1.56,0.64,1) 0.06s both;
        }
        @keyframes auth-pop { from { transform: scale(0); } to { transform: scale(1); } }
        .auth-success-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px; font-weight: 900;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.75);
        }
        .auth-success-sub {
          font-size: 11px; font-weight: 300;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.06em;
        }

        /* Field group */
        .auth-field { margin-bottom: 16px; }
        .auth-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          display: block; margin-bottom: 6px;
        }
        .auth-input-wrap { position: relative; }
        .auth-input-icon {
          position: absolute; left: 12px; top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          transition: color 0.2s;
        }
        .auth-input {
          width: 100%; height: 44px;
          background: rgba(255,255,255,0.03);
          border: 0.5px solid rgba(255,255,255,0.1);
          border-radius: 2px;
          padding: 0 40px 0 38px;
          font-family: 'Barlow', sans-serif;
          font-size: 13px; font-weight: 300;
          color: rgba(255,255,255,0.8);
          letter-spacing: 0.03em;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          -webkit-appearance: none;
        }
        .auth-input::placeholder { color: rgba(255,255,255,0.18); }
        .auth-input:focus {
          border-color: rgba(192,132,252,0.45);
          background: rgba(192,132,252,0.04);
        }
        .auth-input.error {
          border-color: rgba(251,113,133,0.45);
          background: rgba(251,113,133,0.04);
        }

        .auth-pw-toggle {
          position: absolute; right: 12px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.2);
          display: flex; align-items: center;
          transition: color 0.18s; padding: 0;
        }
        .auth-pw-toggle:hover { color: rgba(255,255,255,0.55); }

        /* Field focus line */
        .auth-input-underline {
          height: 1px; margin-top: 0;
          background: rgba(192,132,252,0.5);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
          border-radius: 1px;
        }
        .auth-input-wrap:focus-within .auth-input-underline { transform: scaleX(1); }

        /* Options row */
        .auth-options {
          display: flex; align-items: center;
          justify-content: space-between;
          margin-bottom: 22px; margin-top: 4px;
        }
        .auth-remember {
          display: flex; align-items: center; gap: 8px;
          cursor: pointer;
        }
        .auth-checkbox {
          width: 14px; height: 14px;
          border-radius: 1px;
          border: 0.5px solid rgba(255,255,255,0.15);
          background: transparent;
          appearance: none; -webkit-appearance: none;
          cursor: pointer; position: relative;
          transition: background 0.18s, border-color 0.18s;
          flex-shrink: 0;
        }
        .auth-checkbox:checked {
          background: rgba(192,132,252,0.25);
          border-color: rgba(192,132,252,0.5);
        }
        .auth-checkbox:checked::after {
          content: '';
          position: absolute; top: 2px; left: 4px;
          width: 4px; height: 7px;
          border-right: 1.5px solid #C084FC;
          border-bottom: 1.5px solid #C084FC;
          transform: rotate(45deg);
        }
        .auth-remember-label {
          font-size: 11px; font-weight: 300;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.04em;
          user-select: none;
        }
        .auth-forgot {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(192,132,252,0.55);
          text-decoration: none;
          border-bottom: 0.5px solid rgba(192,132,252,0.2);
          padding-bottom: 1px;
          transition: color 0.18s, border-color 0.18s;
        }
        .auth-forgot:hover { color: #C084FC; border-color: rgba(192,132,252,0.5); }

        /* Submit button */
        .auth-submit {
          width: 100%; height: 46px;
          border-radius: 2px;
          background: rgba(192,132,252,0.12);
          border: 0.5px solid rgba(192,132,252,0.42);
          color: #C084FC;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          position: relative; overflow: hidden;
          transition: background 0.2s, box-shadow 0.2s, transform 0.18s;
          box-shadow: 0 0 20px rgba(140,0,255,0.12);
          margin-bottom: 20px;
        }
        .auth-submit:hover:not(:disabled) {
          background: rgba(192,132,252,0.19);
          box-shadow: 0 0 30px rgba(140,0,255,0.22);
          transform: translateY(-2px);
        }
        .auth-submit:active:not(:disabled) { transform: scale(0.98); }
        .auth-submit:disabled { opacity: 0.45; cursor: not-allowed; }
        .auth-submit .auth-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: translateX(-100%);
          animation: auth-sh 1.6s ease-in-out infinite;
        }
        @keyframes auth-sh { to { transform: translateX(200%); } }
        .auth-btn-spin {
          width: 13px; height: 13px; border-radius: 50%;
          border: 1.5px solid rgba(192,132,252,0.2);
          border-top-color: #C084FC;
          animation: auth-spin 0.85s linear infinite;
        }
        @keyframes auth-spin { to { transform: rotate(360deg); } }

        /* Divider */
        .auth-divider {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 20px;
        }
        .auth-divider-line {
          flex: 1; height: 0.5px;
          background: rgba(255,255,255,0.06);
        }
        .auth-divider-text {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.18);
        }

        /* Footer link */
        .auth-footer-text {
          text-align: center;
          font-size: 12px; font-weight: 300;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.03em;
        }
        .auth-footer-link {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #C084FC;
          text-decoration: none;
          margin-left: 6px;
          transition: opacity 0.18s;
        }
        .auth-footer-link:hover { opacity: 0.75; }

        /* Mobile brand */
        .auth-mobile-brand {
          display: flex; align-items: center; gap: 9px;
          margin-bottom: 28px;
        }
        @media (min-width: 900px) { .auth-mobile-brand { display: none; } }
        .auth-mobile-brand-mark {
          width: 30px; height: 30px; border-radius: 2px;
          background: rgba(192,132,252,0.12);
          border: 0.5px solid rgba(192,132,252,0.35);
          display: flex; align-items: center; justify-content: center;
        }
        .auth-mobile-brand-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 16px; font-weight: 900;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.8);
        }
      `}</style>

      <div className="auth-page">
        {/* Left decorative panel */}
        <div className="auth-left">
          <div className="auth-left-bg" />
          <div className="auth-left-grid" />
          <div className="auth-left-glow" />
          <div className="auth-left-content">
            {/* Brand */}
            <div className="auth-brand">
              <div className="auth-brand-mark">
                <svg width="18" height="18" fill="none" stroke="#C084FC" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="auth-brand-name">KickStore</span>
            </div>

            {/* Hero text */}
            <div className="auth-left-hero">
              <span className="auth-left-eyebrow">Premium Sneakers</span>
              <h2 className="auth-left-title">
                Step Into<br/>
                <em>The Future</em>
              </h2>
              <p className="auth-left-sub">
                Exclusive drops, iconic silhouettes, and premium kicks — all in one place.
              </p>

              {/* Floating product card */}
              <div className="auth-shoe-card" style={{ marginTop: 36, maxWidth: 300 }}>
                <div className="auth-shoe-img">
                  <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop" alt="Nike Air Max" />
                </div>
                <div>
                  <div className="auth-shoe-name">Air Max Pulse</div>
                  <div className="auth-shoe-price">$149.99</div>
                </div>
                <span className="auth-shoe-badge">New</span>
              </div>
            </div>

            {/* Bottom hint */}
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:4, height:4, borderRadius:"50%", background:"rgba(192,132,252,0.4)" }} />
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.18)" }}>
                Free shipping on orders over ₹500
              </span>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="auth-right">
          {/* Success overlay */}
          {success && (
            <div className="auth-success">
              <div className="auth-success-ring">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="auth-success-title">Welcome Back</span>
              <span className="auth-success-sub">Redirecting you now…</span>
            </div>
          )}

          <div className="auth-form-wrap">
            {/* Mobile brand */}
            <div className="auth-mobile-brand">
              <div className="auth-mobile-brand-mark">
                <svg width="14" height="14" fill="none" stroke="#C084FC" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="auth-mobile-brand-name">KickStore</span>
            </div>

            <span className="auth-form-eyebrow">Account</span>
            <h1 className="auth-form-title">
              Welcome<br/><em>Back</em>
            </h1>
            <p className="auth-form-sub">Sign in to your account to continue</p>

            {/* Error */}
            {error && (
              <div className="auth-error">
                <svg width="13" height="13" fill="none" stroke="rgba(251,113,133,0.8)" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                  <path d="M12 8v4M12 16h.01" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <span className="auth-error-text">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="auth-field">
                <label className="auth-label" htmlFor="login-email">Email Address</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">
                    <svg width="14" height="14" fill="none" stroke={focused === "email" ? "#C084FC" : "rgba(255,255,255,0.22)"} viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="1.5"/>
                      <path d="M22 6l-10 7L2 6" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <input
                    id="login-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    className={`auth-input${error ? " error" : ""}`}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    onChange={e => { setError(""); setForm({ ...form, email: e.target.value }); }}
                  />
                  <div className="auth-input-underline" />
                </div>
              </div>

              {/* Password */}
              <div className="auth-field">
                <label className="auth-label" htmlFor="login-password">Password</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">
                    <svg width="14" height="14" fill="none" stroke={focused === "password" ? "#C084FC" : "rgba(255,255,255,0.22)"} viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2" strokeWidth="1.5"/>
                      <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={form.password}
                    className={`auth-input${error ? " error" : ""}`}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused("")}
                    onChange={e => { setError(""); setForm({ ...form, password: e.target.value }); }}
                  />
                  <button
                    type="button"
                    className="auth-pw-toggle"
                    onClick={() => setShowPassword(s => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeWidth="1.5"/>
                        <circle cx="12" cy="12" r="3" strokeWidth="1.5"/>
                      </svg>
                    )}
                  </button>
                  <div className="auth-input-underline" />
                </div>
              </div>

              {/* Options */}
              <div className="auth-options">
                <label className="auth-remember">
                  <input
                    type="checkbox"
                    className="auth-checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                  />
                  <span className="auth-remember-label">Remember me</span>
                </label>
                <Link to="/forgot-password" className="auth-forgot">Forgot password?</Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
                aria-label="Sign in"
              >
                {loading && <span className="auth-shimmer" aria-hidden="true" />}
                {loading ? (
                  <>
                    <span className="auth-btn-spin" />
                    Signing In
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Sign In
                  </>
                )}
              </button>

              <div className="auth-divider">
                <div className="auth-divider-line" />
                <span className="auth-divider-text">or</span>
                <div className="auth-divider-line" />
              </div>

              <p className="auth-footer-text">
                Don't have an account?
                <Link to="/register" className="auth-footer-link">Create one</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}