// Orders.jsx — Dark Luxury Editorial · matches full site aesthetic
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const STATUS_CONFIG = {
  delivered:  { color: "#4ade80", bg: "rgba(74,222,128,0.09)",  border: "rgba(74,222,128,0.28)",  label: "Delivered"  },
  shipped:    { color: "#38bdf8", bg: "rgba(56,189,248,0.09)",  border: "rgba(56,189,248,0.28)",  label: "Shipped"    },
  processing: { color: "#fbbf24", bg: "rgba(251,191,36,0.09)",  border: "rgba(251,191,36,0.28)",  label: "Processing" },
  cancelled:  { color: "#fb7185", bg: "rgba(251,113,133,0.09)", border: "rgba(251,113,133,0.28)", label: "Cancelled"  },
  placed:     { color: "#C084FC", bg: "rgba(192,132,252,0.09)", border: "rgba(192,132,252,0.28)", label: "Placed"     },
};

const statusKey = s => (s?.toLowerCase() in STATUS_CONFIG ? s.toLowerCase() : "placed");

const STATUS_ICONS = {
  delivered:  <path d="M5 13l4 4L19 7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>,
  shipped:    <><path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-1" strokeWidth="1.6" strokeLinecap="round"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></>,
  processing: <><circle cx="12" cy="12" r="10" strokeWidth="1.5"/><path d="M12 6v6l4 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>,
  cancelled:  <><circle cx="12" cy="12" r="10" strokeWidth="1.5"/><path d="M15 9l-6 6M9 9l6 6" strokeWidth="1.5" strokeLinecap="round"/></>,
  placed:     <><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" strokeWidth="1.5"/><path d="M16 3H8L6 7h12l-2-4z" strokeWidth="1.5" strokeLinecap="round"/></>,
};

const formatDate = (d) => {
  if (!d) return "N/A";
  return new Date(d).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });
};

const TRACK_STEPS = ["Placed", "Processing", "Shipped", "Delivered"];
const stepIndex = s => {
  const map = { placed:0, processing:1, shipped:2, delivered:3 };
  return map[s?.toLowerCase()] ?? 0;
};

export default function Orders() {
  const [orders, setOrders]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [expanded, setExpanded]     = useState(null);

  useEffect(() => {
    API.get("/order")
      .then(res => { setOrders(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  /* ── Loading ── */
  if (loading) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@300;400&display=swap');
        .od-loader { min-height:100vh; background:#080808; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; }
        .od-ring { width:44px; height:44px; border-radius:50%; border:1px solid rgba(192,132,252,0.15); border-top-color:#C084FC; animation:od-spin 0.9s linear infinite; }
        @keyframes od-spin { to { transform:rotate(360deg); } }
        .od-ring-label { font-family:'Barlow Condensed',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.26em; text-transform:uppercase; color:rgba(255,255,255,0.22); }
      `}</style>
      <div className="od-loader">
        <div className="od-ring" />
        <span className="od-ring-label">Loading Orders</span>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing:border-box; }

        .od-page { min-height:100vh; background:#080808; font-family:'Barlow',sans-serif; }

        /* ── Header ── */
        .od-header { border-bottom:0.5px solid rgba(255,255,255,0.06); padding:clamp(28px,4vw,52px) clamp(16px,5vw,72px) clamp(20px,3vw,36px); }
        .od-header-inner { max-width:1440px; margin:0 auto; display:flex; align-items:flex-end; justify-content:space-between; flex-wrap:wrap; gap:16px; }
        .od-eyebrow { font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.26em; text-transform:uppercase; color:rgba(192,132,252,0.6); display:block; margin-bottom:6px; }
        .od-page-title { font-family:'Barlow Condensed',sans-serif; font-size:clamp(36px,5vw,64px); font-weight:900; letter-spacing:-0.01em; text-transform:uppercase; color:rgba(255,255,255,0.9); line-height:0.9; margin:0; }
        .od-page-title em { font-style:normal; color:rgba(255,255,255,0.18); }
        .od-order-count { font-family:'Barlow',sans-serif; font-size:12px; font-weight:300; color:rgba(255,255,255,0.28); margin-top:8px; letter-spacing:0.04em; }
        .od-shop-link { display:inline-flex; align-items:center; gap:7px; font-family:'Barlow Condensed',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:rgba(255,255,255,0.28); text-decoration:none; border-bottom:0.5px solid rgba(255,255,255,0.1); padding-bottom:2px; transition:color 0.2s,border-color 0.2s; white-space:nowrap; }
        .od-shop-link:hover { color:rgba(255,255,255,0.65); border-color:rgba(255,255,255,0.35); }

        /* ── Body ── */
        .od-body { max-width:1440px; margin:0 auto; padding:clamp(24px,3vw,48px) clamp(16px,5vw,72px); }

        /* ── Empty ── */
        .od-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:80px 20px; gap:14px; text-align:center; background:#0E0E0E; border:0.5px solid rgba(255,255,255,0.06); border-radius:3px; }
        .od-empty-icon { width:56px; height:56px; border-radius:50%; background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.07); display:flex; align-items:center; justify-content:center; }
        .od-empty-title { font-family:'Barlow Condensed',sans-serif; font-size:18px; font-weight:900; letter-spacing:0.06em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin:0; }
        .od-empty-sub { font-size:12px; font-weight:300; color:rgba(255,255,255,0.18); margin:0; }
        .od-shop-btn { display:inline-flex; align-items:center; gap:7px; padding:10px 22px; border-radius:2px; background:rgba(192,132,252,0.1); border:0.5px solid rgba(192,132,252,0.38); color:#C084FC; font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; text-decoration:none; margin-top:4px; transition:background 0.2s,transform 0.2s; }
        .od-shop-btn:hover { background:rgba(192,132,252,0.17); transform:translateY(-2px); }

        /* ── Order card ── */
        .od-card { background:#0E0E0E; border:0.5px solid rgba(255,255,255,0.07); border-radius:3px; margin-bottom:10px; overflow:hidden; transition:border-color 0.28s; }
        .od-card:hover { border-color:rgba(255,255,255,0.13); }

        /* Card header */
        .od-card-header { padding:16px 18px; display:flex; align-items:center; gap:14px; flex-wrap:wrap; cursor:pointer; user-select:none; }

        .od-order-num-block { flex:1 1 0; min-width:0; }
        .od-order-id { font-family:'Barlow Condensed',sans-serif; font-size:18px; font-weight:900; letter-spacing:0.01em; text-transform:uppercase; color:rgba(255,255,255,0.85); margin:0 0 3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .od-order-date { display:flex; align-items:center; gap:5px; font-size:11px; font-weight:300; color:rgba(255,255,255,0.28); letter-spacing:0.04em; }

        .od-status-pill { display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:2px; font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; flex-shrink:0; }

        .od-amount-block { text-align:right; flex-shrink:0; }
        .od-amount-label { font-family:'Barlow Condensed',sans-serif; font-size:9px; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.2); display:block; margin-bottom:2px; }
        .od-amount-val { font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:900; letter-spacing:-0.01em; color:#fff; }
        .od-amount-cents { font-family:'Barlow',sans-serif; font-size:11px; font-weight:300; color:rgba(255,255,255,0.3); vertical-align:super; }

        .od-toggle-btn { width:32px; height:32px; border-radius:1px; background:transparent; border:0.5px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.3); display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all 0.18s; }
        .od-card-header:hover .od-toggle-btn { background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.18); color:rgba(255,255,255,0.6); }
        .od-toggle-btn svg { transition:transform 0.3s; }
        .od-toggle-btn.open svg { transform:rotate(180deg); }

        /* Divider */
        .od-card-rule { height:0.5px; background:rgba(255,255,255,0.05); margin:0 18px; }

        /* Expanded body */
        .od-card-body { padding:18px; animation:od-expand 0.28s cubic-bezier(0.22,1,0.36,1); }
        @keyframes od-expand { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }

        /* Progress tracker */
        .od-tracker { display:flex; align-items:center; margin-bottom:22px; }
        .od-track-step { display:flex; flex-direction:column; align-items:center; gap:5px; flex:1; }
        .od-track-dot { width:10px; height:10px; border-radius:50%; background:rgba(255,255,255,0.08); border:0.5px solid rgba(255,255,255,0.12); transition:all 0.3s; flex-shrink:0; }
        .od-track-dot.done { background:rgba(192,132,252,0.4); border-color:rgba(192,132,252,0.6); }
        .od-track-dot.current { background:#C084FC; border-color:#C084FC; box-shadow:0 0 8px rgba(192,132,252,0.5); }
        .od-track-label { font-family:'Barlow Condensed',sans-serif; font-size:9px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:rgba(255,255,255,0.22); white-space:nowrap; }
        .od-track-label.done { color:rgba(192,132,252,0.65); }
        .od-track-label.current { color:#C084FC; }
        .od-track-line { flex:1; height:0.5px; background:rgba(255,255,255,0.07); margin:0 4px; margin-bottom:14px; position:relative; overflow:hidden; }
        .od-track-line-fill { position:absolute; inset:0; background:rgba(192,132,252,0.45); transform-origin:left; transition:transform 0.5s ease; }

        /* Items section */
        .od-items-label { font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin:0 0 10px; }

        .od-item { display:flex; align-items:center; gap:12px; padding:12px 14px; background:#111; border:0.5px solid rgba(255,255,255,0.05); border-radius:2px; margin-bottom:6px; }
        .od-item:last-child { margin-bottom:0; }
        .od-item-img { width:50px; height:50px; border-radius:2px; background:#141414; flex-shrink:0; overflow:hidden; }
        .od-item-img img { width:100%; height:100%; object-fit:cover; display:block; }
        .od-item-img-placeholder { width:100%; height:100%; display:flex; align-items:center; justify-content:center; }
        .od-item-info { flex:1; min-width:0; }
        .od-item-name { font-family:'Barlow Condensed',sans-serif; font-size:14px; font-weight:800; text-transform:uppercase; letter-spacing:0.02em; color:rgba(255,255,255,0.82); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin:0 0 3px; }
        .od-item-qty { font-size:11px; font-weight:300; color:rgba(255,255,255,0.28); letter-spacing:0.04em; }
        .od-item-prices { text-align:right; flex-shrink:0; }
        .od-item-unit { font-size:11px; font-weight:300; color:rgba(255,255,255,0.28); display:block; margin-bottom:2px; }
        .od-item-total { font-family:'Barlow Condensed',sans-serif; font-size:15px; font-weight:800; color:rgba(255,255,255,0.8); }

        /* Meta row */
        .od-meta-row { display:flex; flex-wrap:wrap; gap:10px; margin-top:14px; padding-top:14px; border-top:0.5px solid rgba(255,255,255,0.05); }
        .od-meta-pill { display:inline-flex; align-items:center; gap:6px; padding:6px 12px; background:#111; border:0.5px solid rgba(255,255,255,0.07); border-radius:1px; font-family:'Barlow Condensed',sans-serif; font-size:9px; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:rgba(255,255,255,0.3); }

        /* Action buttons */
        .od-actions { display:flex; flex-wrap:wrap; gap:8px; margin-top:14px; }
        .od-action-btn { display:inline-flex; align-items:center; gap:6px; padding:8px 16px; border-radius:1px; font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; cursor:pointer; transition:all 0.18s; border:0.5px solid; }
        .od-action-btn.primary { background:rgba(192,132,252,0.1); border-color:rgba(192,132,252,0.38); color:#C084FC; }
        .od-action-btn.primary:hover { background:rgba(192,132,252,0.17); transform:translateY(-1px); }
        .od-action-btn.outline { background:transparent; border-color:rgba(255,255,255,0.1); color:rgba(255,255,255,0.35); }
        .od-action-btn.outline:hover { background:rgba(255,255,255,0.04); border-color:rgba(255,255,255,0.22); color:rgba(255,255,255,0.65); }
        .od-action-btn.danger { background:transparent; border-color:rgba(251,113,133,0.28); color:rgba(251,113,133,0.65); }
        .od-action-btn.danger:hover { background:rgba(251,113,133,0.08); border-color:rgba(251,113,133,0.45); color:#fb7185; }

        @keyframes od-spin { to { transform:rotate(360deg); } }

        @media (max-width:600px) {
          .od-card-header { gap:10px; }
          .od-amount-block { display:none; }
        }
      `}</style>

      <div className="od-page">
        {/* Header */}
        <div className="od-header">
          <div className="od-header-inner">
            <div>
              <span className="od-eyebrow">Account</span>
              <h1 className="od-page-title">My<br/><em>Orders</em></h1>
              <p className="od-order-count">
                {orders.length} order{orders.length !== 1 ? "s" : ""} placed
              </p>
            </div>
            <Link to="/" className="od-shop-link">
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 12H5M12 5l-7 7 7 7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="od-body">
          {orders.length === 0 ? (
            <div className="od-empty">
              <div className="od-empty-icon">
                <svg width="22" height="22" fill="none" stroke="rgba(255,255,255,0.2)" viewBox="0 0 24 24">
                  <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8L6 7h12l-2-4z" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="od-empty-title">No orders yet</h2>
              <p className="od-empty-sub">Your order history will appear here</p>
              <Link to="/" className="od-shop-btn">
                <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 12H5M12 5l-7 7 7 7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Start Shopping
              </Link>
            </div>
          ) : (
            orders.map(order => {
              const sk       = statusKey(order.status);
              const sc       = STATUS_CONFIG[sk];
              const isOpen   = expanded === order.orderId;
              const stepIdx  = stepIndex(order.status);
              const amtStr   = order.totalAmount?.toFixed(2) ?? "0.00";
              const [amtInt, amtCents] = amtStr.split(".");

              return (
                <div key={order.orderId} className="od-card">
                  {/* Card header — clickable */}
                  <div
                    className="od-card-header"
                    onClick={() => setExpanded(isOpen ? null : order.orderId)}
                    role="button"
                    aria-expanded={isOpen}
                    tabIndex={0}
                    onKeyDown={e => e.key === "Enter" && setExpanded(isOpen ? null : order.orderId)}
                  >
                    {/* Status icon */}
                    <svg width="18" height="18" fill="none" stroke={sc.color} viewBox="0 0 24 24" style={{ flexShrink:0, opacity:0.8 }}>
                      {STATUS_ICONS[sk]}
                    </svg>

                    {/* Order ID + date */}
                    <div className="od-order-num-block">
                      <h3 className="od-order-id">Order #{order.orderId}</h3>
                      <div className="od-order-date">
                        <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.5"/>
                          <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        {formatDate(order.createdAt)}
                      </div>
                    </div>

                    {/* Status pill */}
                    <div
                      className="od-status-pill"
                      style={{ background:sc.bg, border:`0.5px solid ${sc.border}`, color:sc.color }}
                    >
                      <span style={{ width:5, height:5, borderRadius:"50%", background:sc.color, display:"inline-block", flexShrink:0 }} />
                      {sc.label}
                    </div>

                    {/* Total */}
                    <div className="od-amount-block">
                      <span className="od-amount-label">Total</span>
                      <span className="od-amount-val">
                        ₹{amtInt}
                        <span className="od-amount-cents">.{amtCents}</span>
                      </span>
                    </div>

                    {/* Toggle */}
                    <div className={`od-toggle-btn${isOpen ? " open" : ""}`}>
                      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Expanded */}
                  {isOpen && (
                    <>
                      <div className="od-card-rule" />
                      <div className="od-card-body">

                        {/* Progress tracker — only for non-cancelled */}
                        {sk !== "cancelled" && (
                          <div className="od-tracker">
                            {TRACK_STEPS.map((step, i) => {
                              const isDone    = stepIdx > i;
                              const isCurrent = stepIdx === i;
                              const isLast    = i === TRACK_STEPS.length - 1;
                              return (
                                <div key={step} style={{ display:"flex", alignItems:"center", flex: isLast ? "0 0 auto" : 1 }}>
                                  <div className="od-track-step">
                                    <div className={`od-track-dot${isCurrent ? " current" : isDone ? " done" : ""}`} />
                                    <span className={`od-track-label${isCurrent ? " current" : isDone ? " done" : ""}`}>{step}</span>
                                  </div>
                                  {!isLast && (
                                    <div className="od-track-line" style={{ flex:1 }}>
                                      <div className="od-track-line-fill" style={{ transform:`scaleX(${isDone ? 1 : 0})` }} />
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Items */}
                        <p className="od-items-label">
                          {order.items?.length ?? 0} item{order.items?.length !== 1 ? "s" : ""}
                        </p>

                        {order.items?.map(item => (
                          <div key={item.productId} className="od-item">
                            <div className="od-item-img">
                              {item.imageUrl
                                ? <img src={item.imageUrl} alt={item.productName} loading="lazy" />
                                : (
                                  <div className="od-item-img-placeholder">
                                    <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.1)" viewBox="0 0 24 24">
                                      <rect x="3" y="3" width="18" height="18" rx="1.5" strokeWidth="1"/>
                                    </svg>
                                  </div>
                                )
                              }
                            </div>
                            <div className="od-item-info">
                              <h4 className="od-item-name">{item.productName}</h4>
                              <span className="od-item-qty">
                                Qty · {item.quantity}
                                {item.size && ` · Size US ${item.size}`}
                              </span>
                            </div>
                            <div className="od-item-prices">
                              <span className="od-item-unit">₹{item.price?.toFixed(2)} each</span>
                              <span className="od-item-total">₹{item.totalPrice?.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}

                        {/* Meta row */}
                        <div className="od-meta-row">
                          <div className="od-meta-pill">
                            <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <rect x="1" y="4" width="22" height="16" rx="2" strokeWidth="1.6"/>
                              <path d="M1 10h22" strokeWidth="1.6"/>
                            </svg>
                            Cash on Delivery
                          </div>
                          <div className="od-meta-pill">
                            <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-1" strokeWidth="1.6" strokeLinecap="round"/>
                              <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
                            </svg>
                            {sc.label}
                          </div>
                          <div className="od-meta-pill" style={{ marginLeft:"auto" }}>
                            <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 8v4l3 3" strokeWidth="1.6" strokeLinecap="round"/>
                            </svg>
                            {formatDate(order.createdAt)}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="od-actions">
                          <button className="od-action-btn primary">
                            <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="1.6"/>
                              <circle cx="12" cy="11" r="3" strokeWidth="1.6"/>
                            </svg>
                            Track Order
                          </button>

                          {sk === "delivered" && (
                            <button className="od-action-btn outline">
                              <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeWidth="1.5"/>
                              </svg>
                              Write Review
                            </button>
                          )}

                          {sk === "processing" && (
                            <button className="od-action-btn danger">
                              <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                                <path d="M15 9l-6 6M9 9l6 6" strokeWidth="1.5" strokeLinecap="round"/>
                              </svg>
                              Cancel Order
                            </button>
                          )}

                          <button className="od-action-btn outline">
                            <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Invoice
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}