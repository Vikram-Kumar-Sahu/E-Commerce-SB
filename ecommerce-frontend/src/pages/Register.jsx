// Register.jsx — Dark Luxury Editorial · matches full site aesthetic
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const PASSWORD_CHECKS = [
  { label: "8+ characters",    test: v => v.length >= 8 },
  { label: "Uppercase letter", test: v => /[A-Z]/.test(v) },
  { label: "Number",           test: v => /[0-9]/.test(v) },
];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm]               = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState(false);
  const [focused, setFocused]         = useState("");
  const [agreed, setAgreed]           = useState(false);

  const pwStrength = PASSWORD_CHECKS.filter(c => c.test(form.password)).length;
  const strengthColors = ["rgba(251,113,133,0.7)", "#fbbf24", "#4ade80"];
  const strengthLabels = ["Weak", "Fair", "Strong"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!agreed) { setError("Please agree to the terms to continue."); return; }
    setLoading(true);
    try {
      await API.post("/auth/register", form);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1600);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .rg-page {
          min-height: 100vh;
          background: #080808;
          display: flex;
          font-family: 'Barlow', sans-serif;
        }

        /* Left panel */
        .rg-left {
          flex: 1 1 0;
          position: relative; overflow: hidden;
          display: none;
        }
        @media (min-width: 900px) { .rg-left { display: block; } }

        .rg-left-bg { position: absolute; inset: 0; background: #070C0A; }
        .rg-left-grid {
          position: absolute; inset: 0; opacity: 0.035;
          background-image: linear-gradient(rgba(56,189,248,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(56,189,248,1) 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .rg-left-glow {
          position: absolute; width: 520px; height: 520px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,130,255,0.16) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .rg-left-content {
          position: relative; z-index: 2; height: 100%;
          display: flex; flex-direction: column; justify-content: space-between;
          padding: 48px;
        }

        .rg-brand { display: flex; align-items: center; gap: 10px; }
        .rg-brand-mark {
          width: 36px; height: 36px; border-radius: 2px;
          background: rgba(56,189,248,0.1);
          border: 0.5px solid rgba(56,189,248,0.3);
          display: flex; align-items: center; justify-content: center;
        }
        .rg-brand-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px; font-weight: 900;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.85);
        }

        .rg-left-hero { flex: 1; display: flex; flex-direction: column; justify-content: center; }
        .rg-eyebrow-left {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.28em; text-transform: uppercase;
          color: rgba(56,189,248,0.6); margin-bottom: 14px;
        }
        .rg-title-left {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(48px, 5.5vw, 76px);
          font-weight: 900; line-height: 0.88;
          letter-spacing: -0.01em; text-transform: uppercase;
          color: rgba(255,255,255,0.9);
        }
        .rg-title-left em { font-style: normal; color: rgba(255,255,255,0.18); }
        .rg-sub-left {
          font-size: 13px; font-weight: 300;
          color: rgba(255,255,255,0.28);
          line-height: 1.7; margin-top: 20px; max-width: 340px;
        }

        /* Perks list */
        .rg-perks { margin-top: 36px; display: flex; flex-direction: column; gap: 10px; }
        .rg-perk { display: flex; align-items: center; gap: 10px; }
        .rg-perk-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(56,189,248,0.5); flex-shrink: 0;
        }
        .rg-perk-text {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        /* Right panel */
        .rg-right {
          flex: 0 0 clamp(340px, 48vw, 540px);
          display: flex; align-items: center; justify-content: center;
          padding: clamp(32px, 5vw, 52px) clamp(24px, 5vw, 60px);
          border-left: 0.5px solid rgba(255,255,255,0.05);
          position: relative;
          overflow-y: auto;
        }
        @media (max-width: 899px) {
          .rg-right { flex: 1 1 100%; border-left: none; }
        }

        .rg-form-wrap { width: 100%; max-width: 380px; }

        /* Form header */
        .rg-form-eyebrow {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.26em; text-transform: uppercase;
          color: rgba(56,189,248,0.6);
          display: block; margin-bottom: 8px;
        }
        .rg-form-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 900; letter-spacing: -0.01em;
          text-transform: uppercase; line-height: 0.9;
          color: rgba(255,255,255,0.9);
          margin-bottom: 6px;
        }
        .rg-form-title em { font-style: normal; color: rgba(255,255,255,0.18); }
        .rg-form-sub {
          font-size: 12px; font-weight: 300;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.03em; margin-bottom: 28px;
        }

        /* Error */
        .rg-error {
          display: flex; align-items: center; gap: 8px;
          background: rgba(251,113,133,0.07);
          border: 0.5px solid rgba(251,113,133,0.28);
          border-radius: 2px; padding: 10px 12px;
          margin-bottom: 16px;
          animation: rg-shake 0.4s cubic-bezier(0.36,0.07,0.19,0.97);
        }
        @keyframes rg-shake {
          10%,90% { transform: translateX(-2px); }
          20%,80% { transform: translateX(3px); }
          30%,50%,70% { transform: translateX(-3px); }
          40%,60% { transform: translateX(3px); }
        }
        .rg-error-text {
          font-size: 12px; font-weight: 300;
          color: rgba(251,113,133,0.85); letter-spacing: 0.02em;
        }

        /* Success overlay */
        .rg-success {
          position: absolute; inset: 0; z-index: 50;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 12px;
          background: rgba(8,8,8,0.94); backdrop-filter: blur(14px);
          animation: rg-si 0.28s ease;
        }
        @keyframes rg-si { from { opacity: 0; } to { opacity: 1; } }
        .rg-success-ring {
          width: 56px; height: 56px; border-radius: 50%;
          background: rgba(56,189,248,0.08);
          border: 0.5px solid rgba(56,189,248,0.3);
          display: flex; align-items: center; justify-content: center;
          animation: rg-pop 0.38s cubic-bezier(0.34,1.56,0.64,1) 0.06s both;
        }
        @keyframes rg-pop { from { transform: scale(0); } to { transform: scale(1); } }
        .rg-success-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 18px; font-weight: 900;
          letter-spacing: 0.08em; text-transform: uppercase;
          color: rgba(255,255,255,0.75);
        }
        .rg-success-sub {
          font-size: 11px; font-weight: 300;
          color: rgba(255,255,255,0.25); letter-spacing: 0.06em;
        }

        /* Fields */
        .rg-field { margin-bottom: 14px; }
        .rg-label {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.28);
          display: block; margin-bottom: 6px;
        }
        .rg-input-wrap { position: relative; }
        .rg-input-icon {
          position: absolute; left: 12px; top: 50%;
          transform: translateY(-50%);
          pointer-events: none; transition: color 0.2s;
        }
        .rg-input {
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
        .rg-input::placeholder { color: rgba(255,255,255,0.18); }
        .rg-input:focus {
          border-color: rgba(56,189,248,0.42);
          background: rgba(56,189,248,0.04);
        }
        .rg-input.error {
          border-color: rgba(251,113,133,0.42);
          background: rgba(251,113,133,0.04);
        }
        .rg-input-underline {
          height: 1px; margin-top: 0;
          background: rgba(56,189,248,0.5);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
          border-radius: 1px;
        }
        .rg-input-wrap:focus-within .rg-input-underline { transform: scaleX(1); }

        .rg-pw-toggle {
          position: absolute; right: 12px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,0.2);
          display: flex; align-items: center;
          transition: color 0.18s; padding: 0;
        }
        .rg-pw-toggle:hover { color: rgba(255,255,255,0.55); }

        /* Password strength */
        .rg-strength { margin-top: 8px; }
        .rg-strength-bars { display: flex; gap: 4px; margin-bottom: 5px; }
        .rg-strength-bar {
          flex: 1; height: 2px; border-radius: 1px;
          background: rgba(255,255,255,0.07);
          transition: background 0.3s;
        }
        .rg-strength-checks { display: flex; gap: 12px; flex-wrap: wrap; }
        .rg-strength-check {
          display: flex; align-items: center; gap: 4px;
          font-size: 10px; font-weight: 300;
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .rg-strength-check-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(255,255,255,0.15);
          transition: background 0.2s;
          flex-shrink: 0;
        }

        /* Terms */
        .rg-terms { display: flex; align-items: flex-start; gap: 9px; margin-bottom: 20px; margin-top: 4px; }
        .rg-checkbox {
          width: 14px; height: 14px; border-radius: 1px;
          border: 0.5px solid rgba(255,255,255,0.15);
          background: transparent; appearance: none; -webkit-appearance: none;
          cursor: pointer; position: relative; flex-shrink: 0; margin-top: 2px;
          transition: background 0.18s, border-color 0.18s;
        }
        .rg-checkbox:checked {
          background: rgba(56,189,248,0.2);
          border-color: rgba(56,189,248,0.5);
        }
        .rg-checkbox:checked::after {
          content: ''; position: absolute; top: 2px; left: 4px;
          width: 4px; height: 7px;
          border-right: 1.5px solid #38bdf8;
          border-bottom: 1.5px solid #38bdf8;
          transform: rotate(45deg);
        }
        .rg-terms-text {
          font-size: 11px; font-weight: 300;
          color: rgba(255,255,255,0.28); line-height: 1.6; letter-spacing: 0.03em;
        }
        .rg-terms-link {
          color: rgba(56,189,248,0.7); text-decoration: none;
          border-bottom: 0.5px solid rgba(56,189,248,0.25);
          padding-bottom: 1px; transition: color 0.18s;
        }
        .rg-terms-link:hover { color: #38bdf8; }

        /* Submit */
        .rg-submit {
          width: 100%; height: 46px; border-radius: 2px;
          background: rgba(56,189,248,0.1);
          border: 0.5px solid rgba(56,189,248,0.38);
          color: #38bdf8;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          position: relative; overflow: hidden;
          transition: background 0.2s, box-shadow 0.2s, transform 0.18s;
          box-shadow: 0 0 20px rgba(0,150,255,0.1);
          margin-bottom: 20px;
        }
        .rg-submit:hover:not(:disabled) {
          background: rgba(56,189,248,0.17);
          box-shadow: 0 0 28px rgba(0,150,255,0.2);
          transform: translateY(-2px);
        }
        .rg-submit:active:not(:disabled) { transform: scale(0.98); }
        .rg-submit:disabled { opacity: 0.4; cursor: not-allowed; }
        .rg-submit .rg-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.09), transparent);
          transform: translateX(-100%);
          animation: rg-sh 1.6s ease-in-out infinite;
        }
        @keyframes rg-sh { to { transform: translateX(200%); } }
        .rg-btn-spin {
          width: 13px; height: 13px; border-radius: 50%;
          border: 1.5px solid rgba(56,189,248,0.2);
          border-top-color: #38bdf8;
          animation: rg-spin 0.85s linear infinite;
        }
        @keyframes rg-spin { to { transform: rotate(360deg); } }

        /* Footer */
        .rg-divider {
          display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
        }
        .rg-divider-line { flex: 1; height: 0.5px; background: rgba(255,255,255,0.06); }
        .rg-divider-text {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.18);
        }
        .rg-footer-text {
          text-align: center; font-size: 12px; font-weight: 300;
          color: rgba(255,255,255,0.25); letter-spacing: 0.03em;
        }
        .rg-footer-link {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #38bdf8; text-decoration: none; margin-left: 6px;
          transition: opacity 0.18s;
        }
        .rg-footer-link:hover { opacity: 0.72; }

        /* Mobile brand */
        .rg-mobile-brand { display: flex; align-items: center; gap: 9px; margin-bottom: 28px; }
        @media (min-width: 900px) { .rg-mobile-brand { display: none; } }
        .rg-mobile-brand-mark {
          width: 30px; height: 30px; border-radius: 2px;
          background: rgba(56,189,248,0.1);
          border: 0.5px solid rgba(56,189,248,0.3);
          display: flex; align-items: center; justify-content: center;
        }
        .rg-mobile-brand-name {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 16px; font-weight: 900;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.8);
        }
      `}</style>

      <div className="rg-page">
        {/* Left panel */}
        <div className="rg-left">
          <div className="rg-left-bg" />
          <div className="rg-left-grid" />
          <div className="rg-left-glow" />
          <div className="rg-left-content">
            <div className="rg-brand">
              <div className="rg-brand-mark">
                <svg width="18" height="18" fill="none" stroke="#38bdf8" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="rg-brand-name">KickStore</span>
            </div>

            <div className="rg-left-hero">
              <span className="rg-eyebrow-left">Join the Club</span>
              <h2 className="rg-title-left">
                Your Next<br/>
                <em>Pair Awaits</em>
              </h2>
              <p className="rg-sub-left">
                Create your account and unlock access to exclusive drops, early releases, and member-only deals.
              </p>

              <div className="rg-perks">
                {[
                  "Early access to limited drops",
                  "Free shipping on first order",
                  "Exclusive member pricing",
                  "Order tracking & history",
                ].map((perk, i) => (
                  <div key={i} className="rg-perk">
                    <div className="rg-perk-dot" />
                    <span className="rg-perk-text">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:4, height:4, borderRadius:"50%", background:"rgba(56,189,248,0.4)" }} />
              <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:9, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.18)" }}>
                Join 50,000+ sneaker enthusiasts
              </span>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="rg-right">
          {success && (
            <div className="rg-success">
              <div className="rg-success-ring">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="rg-success-title">Account Created</span>
              <span className="rg-success-sub">Redirecting to login…</span>
            </div>
          )}

          <div className="rg-form-wrap">
            {/* Mobile brand */}
            <div className="rg-mobile-brand">
              <div className="rg-mobile-brand-mark">
                <svg width="14" height="14" fill="none" stroke="#38bdf8" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="rg-mobile-brand-name">KickStore</span>
            </div>

            <span className="rg-form-eyebrow">New Account</span>
            <h1 className="rg-form-title">
              Create<br/><em>Account</em>
            </h1>
            <p className="rg-form-sub">Join KickStore and start shopping today</p>

            {error && (
              <div className="rg-error">
                <svg width="13" height="13" fill="none" stroke="rgba(251,113,133,0.8)" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                  <path d="M12 8v4M12 16h.01" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <span className="rg-error-text">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="rg-field">
                <label className="rg-label" htmlFor="rg-name">Full Name</label>
                <div className="rg-input-wrap">
                  <span className="rg-input-icon">
                    <svg width="14" height="14" fill="none" stroke={focused === "name" ? "#38bdf8" : "rgba(255,255,255,0.22)"} viewBox="0 0 24 24">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="12" cy="7" r="4" strokeWidth="1.5"/>
                    </svg>
                  </span>
                  <input
                    id="rg-name" type="text" required
                    placeholder="John Doe"
                    value={form.name}
                    className="rg-input"
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused("")}
                    onChange={e => { setError(""); setForm({ ...form, name: e.target.value }); }}
                  />
                  <div className="rg-input-underline" />
                </div>
              </div>

              {/* Email */}
              <div className="rg-field">
                <label className="rg-label" htmlFor="rg-email">Email Address</label>
                <div className="rg-input-wrap">
                  <span className="rg-input-icon">
                    <svg width="14" height="14" fill="none" stroke={focused === "email" ? "#38bdf8" : "rgba(255,255,255,0.22)"} viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="1.5"/>
                      <path d="M22 6l-10 7L2 6" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <input
                    id="rg-email" type="email" required
                    placeholder="you@example.com"
                    value={form.email}
                    className="rg-input"
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused("")}
                    onChange={e => { setError(""); setForm({ ...form, email: e.target.value }); }}
                  />
                  <div className="rg-input-underline" />
                </div>
              </div>

              {/* Password */}
              <div className="rg-field">
                <label className="rg-label" htmlFor="rg-password">Password</label>
                <div className="rg-input-wrap">
                  <span className="rg-input-icon">
                    <svg width="14" height="14" fill="none" stroke={focused === "password" ? "#38bdf8" : "rgba(255,255,255,0.22)"} viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2" strokeWidth="1.5"/>
                      <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <input
                    id="rg-password" type={showPassword ? "text" : "password"} required
                    placeholder="Create a strong password"
                    value={form.password}
                    className="rg-input"
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused("")}
                    onChange={e => { setError(""); setForm({ ...form, password: e.target.value }); }}
                  />
                  <button
                    type="button" className="rg-pw-toggle"
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
                  <div className="rg-input-underline" />
                </div>

                {/* Password strength meter */}
                {form.password.length > 0 && (
                  <div className="rg-strength">
                    <div className="rg-strength-bars">
                      {[0,1,2].map(i => (
                        <div
                          key={i}
                          className="rg-strength-bar"
                          style={{ background: i < pwStrength ? strengthColors[pwStrength - 1] : undefined }}
                        />
                      ))}
                    </div>
                    <div className="rg-strength-checks">
                      {PASSWORD_CHECKS.map((c, i) => {
                        const pass = c.test(form.password);
                        return (
                          <div key={i} className="rg-strength-check" style={{ color: pass ? "rgba(74,222,128,0.7)" : "rgba(255,255,255,0.22)" }}>
                            <div className="rg-strength-check-dot" style={{ background: pass ? "rgba(74,222,128,0.7)" : undefined }} />
                            {c.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Terms */}
              <div className="rg-terms">
                <input
                  type="checkbox"
                  className="rg-checkbox"
                  id="rg-terms"
                  checked={agreed}
                  onChange={e => { setAgreed(e.target.checked); setError(""); }}
                />
                <label htmlFor="rg-terms" className="rg-terms-text">
                  I agree to the{" "}
                  <a href="/terms" className="rg-terms-link">Terms of Service</a>
                  {" "}and{" "}
                  <a href="/privacy" className="rg-terms-link">Privacy Policy</a>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="rg-submit"
                disabled={loading}
                aria-label="Create account"
              >
                {loading && <span className="rg-shimmer" aria-hidden="true" />}
                {loading ? (
                  <>
                    <span className="rg-btn-spin" />
                    Creating Account
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeWidth="1.7" strokeLinecap="round"/>
                      <circle cx="8.5" cy="7" r="4" strokeWidth="1.7"/>
                      <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                      <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                    </svg>
                    Create Account
                  </>
                )}
              </button>

              <div className="rg-divider">
                <div className="rg-divider-line" />
                <span className="rg-divider-text">or</span>
                <div className="rg-divider-line" />
              </div>

              <p className="rg-footer-text">
                Already have an account?
                <Link to="/login" className="rg-footer-link">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}