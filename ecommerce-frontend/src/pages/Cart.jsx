// Cart.jsx — Dark Luxury Editorial · matches full site aesthetic
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Cart() {
  const [cart, setCart]             = useState(null);
  const [loading, setLoading]       = useState(true);
  const [updating, setUpdating]     = useState({});
  const [removing, setRemoving]     = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { fetchCart(); }, []);

  const fetchCart = () => {
    setLoading(true);
    API.get("/cart")
      .then(res => { setCart(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  };

  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    setUpdating(p => ({ ...p, [productId]: true }));
    try {
      await API.put(`/cart/item/${productId}?quantity=${newQty}`);
      fetchCart();
    } catch (e) { console.error(e); }
    finally { setUpdating(p => ({ ...p, [productId]: false })); }
  };

  const removeItem = async (productId) => {
    setRemoving(p => ({ ...p, [productId]: true }));
    try {
      await API.delete(`/cart/item/${productId}`);
      fetchCart();
    } catch (e) { console.error(e); }
    finally { setRemoving(p => ({ ...p, [productId]: false })); }
  };

  const clearCart = async () => {
    setConfirmClear(false);
    try { await API.delete("/cart/clear"); fetchCart(); }
    catch (e) { console.error(e); }
  };

  const placeOrder = async () => {
    setPlacingOrder(true);
    try {
      await API.post("/order");
      setOrderSuccess(true);
      fetchCart();
      setTimeout(() => navigate("/orders"), 2200);
    } catch (e) { console.error(e); }
    finally { setPlacingOrder(false); }
  };

  const subtotal = cart?.items?.reduce(
    (s, i) => s + (i.totalPrice || i.price * i.quantity), 0
  ) ?? 0;
  const shipping  = subtotal > 500 ? 0 : 50;
  const tax       = subtotal * 0.1;
  const total     = subtotal + shipping + tax;
  const freeShipPct = Math.min((subtotal / 500) * 100, 100);

  /* ── Loading ── */
  if (loading) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@300;400&display=swap');
        .ct-loader { min-height:100vh; background:#080808; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px; }
        .ct-ring { width:44px; height:44px; border-radius:50%; border:1px solid rgba(192,132,252,0.15); border-top-color:#C084FC; animation:ct-spin 0.9s linear infinite; }
        @keyframes ct-spin { to { transform:rotate(360deg); } }
        .ct-ring-label { font-family:'Barlow Condensed',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.26em; text-transform:uppercase; color:rgba(255,255,255,0.22); }
      `}</style>
      <div className="ct-loader">
        <div className="ct-ring" />
        <span className="ct-ring-label">Loading Cart</span>
      </div>
    </>
  );

  const items = cart?.items ?? [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing:border-box; }

        .ct-page { min-height:100vh; background:#080808; font-family:'Barlow',sans-serif; }

        /* ── Page header ── */
        .ct-header {
          border-bottom:0.5px solid rgba(255,255,255,0.06);
          padding:clamp(28px,4vw,52px) clamp(16px,5vw,72px) clamp(20px,3vw,36px);
        }
        .ct-header-inner { max-width:1440px; margin:0 auto; display:flex; align-items:flex-end; justify-content:space-between; flex-wrap:wrap; gap:16px; }
        .ct-eyebrow { font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.26em; text-transform:uppercase; color:rgba(192,132,252,0.6); display:block; margin-bottom:6px; }
        .ct-page-title { font-family:'Barlow Condensed',sans-serif; font-size:clamp(36px,5vw,64px); font-weight:900; letter-spacing:-0.01em; text-transform:uppercase; color:rgba(255,255,255,0.9); line-height:0.9; margin:0; }
        .ct-page-title em { font-style:normal; color:rgba(255,255,255,0.18); }
        .ct-item-count { font-family:'Barlow',sans-serif; font-size:12px; font-weight:300; color:rgba(255,255,255,0.28); margin-top:8px; letter-spacing:0.04em; }
        .ct-back-link { display:inline-flex; align-items:center; gap:7px; font-family:'Barlow Condensed',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:rgba(255,255,255,0.28); text-decoration:none; border-bottom:0.5px solid rgba(255,255,255,0.1); padding-bottom:2px; transition:color 0.2s,border-color 0.2s; white-space:nowrap; }
        .ct-back-link:hover { color:rgba(255,255,255,0.65); border-color:rgba(255,255,255,0.35); }

        /* ── Layout ── */
        .ct-body { max-width:1440px; margin:0 auto; padding:clamp(24px,3vw,48px) clamp(16px,5vw,72px); display:flex; gap:clamp(16px,2.5vw,32px); align-items:flex-start; flex-wrap:wrap; }
        .ct-items-col { flex:1 1 0; min-width:0; }
        .ct-summary-col { flex:0 0 clamp(280px,28vw,360px); position:sticky; top:20px; }

        /* ── Empty ── */
        .ct-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; padding:80px 20px; gap:14px; text-align:center; background:#0E0E0E; border:0.5px solid rgba(255,255,255,0.06); border-radius:3px; }
        .ct-empty-icon { width:56px; height:56px; border-radius:50%; background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.07); display:flex; align-items:center; justify-content:center; }
        .ct-empty-title { font-family:'Barlow Condensed',sans-serif; font-size:18px; font-weight:900; letter-spacing:0.06em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin:0; }
        .ct-empty-sub { font-size:12px; font-weight:300; color:rgba(255,255,255,0.18); margin:0; }
        .ct-start-btn { display:inline-flex; align-items:center; gap:7px; padding:10px 22px; border-radius:2px; background:rgba(192,132,252,0.1); border:0.5px solid rgba(192,132,252,0.38); color:#C084FC; font-family:'Barlow Condensed',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; text-decoration:none; margin-top:4px; transition:background 0.2s,transform 0.2s; }
        .ct-start-btn:hover { background:rgba(192,132,252,0.16); transform:translateY(-2px); }

        /* ── Cart table header ── */
        .ct-table-head { display:grid; grid-template-columns:1fr 100px 90px 90px 36px; gap:12px; padding:10px 16px; border-bottom:0.5px solid rgba(255,255,255,0.05); margin-bottom:2px; }
        .ct-th { font-family:'Barlow Condensed',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.2); }
        .ct-th.right { text-align:right; }
        .ct-th.center { text-align:center; }

        /* ── Cart item ── */
        .ct-item { background:#0E0E0E; border:0.5px solid rgba(255,255,255,0.06); border-radius:3px; margin-bottom:8px; overflow:hidden; transition:border-color 0.25s; }
        .ct-item:hover { border-color:rgba(255,255,255,0.12); }
        .ct-item.removing { opacity:0.4; pointer-events:none; transition:opacity 0.3s; }

        .ct-item-inner { display:grid; grid-template-columns:1fr 100px 90px 90px 36px; gap:12px; align-items:center; padding:14px 16px; }

        .ct-product-block { display:flex; align-items:center; gap:12px; min-width:0; }
        .ct-img { width:60px; height:60px; border-radius:2px; background:#141414; border:0.5px solid rgba(255,255,255,0.06); flex-shrink:0; overflow:hidden; }
        .ct-img img { width:100%; height:100%; object-fit:cover; display:block; }
        .ct-img-placeholder { width:100%; height:100%; display:flex; align-items:center; justify-content:center; }

        .ct-product-info { min-width:0; }
        .ct-product-cat { font-family:'Barlow Condensed',sans-serif; font-size:9px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(192,132,252,0.6); display:block; margin-bottom:3px; }
        .ct-product-name { font-family:'Barlow Condensed',sans-serif; font-size:15px; font-weight:800; text-transform:uppercase; letter-spacing:0.02em; color:rgba(255,255,255,0.88); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin:0 0 3px; }
        .ct-product-size { font-size:11px; font-weight:300; color:rgba(255,255,255,0.28); letter-spacing:0.06em; }

        /* Qty controls */
        .ct-qty { display:flex; align-items:center; justify-content:center; gap:6px; }
        .ct-qty-btn { width:26px; height:26px; border-radius:1px; background:transparent; border:0.5px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.45); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.16s; }
        .ct-qty-btn:hover:not(:disabled) { background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.25); color:rgba(255,255,255,0.8); }
        .ct-qty-btn:disabled { opacity:0.2; cursor:not-allowed; }
        .ct-qty-val { font-family:'Barlow Condensed',sans-serif; font-size:14px; font-weight:700; color:rgba(255,255,255,0.8); min-width:20px; text-align:center; }
        .ct-qty-spin { width:12px; height:12px; border-radius:50%; border:1.5px solid rgba(192,132,252,0.2); border-top-color:#C084FC; animation:ct-spin 0.8s linear infinite; margin:0 auto; }

        /* Price cells */
        .ct-price { font-family:'Barlow Condensed',sans-serif; font-size:14px; font-weight:600; color:rgba(255,255,255,0.4); text-align:right; }
        .ct-total { font-family:'Barlow Condensed',sans-serif; font-size:16px; font-weight:800; color:#fff; text-align:right; }

        /* Remove btn */
        .ct-remove-btn { width:30px; height:30px; border-radius:1px; background:transparent; border:0.5px solid transparent; color:rgba(255,255,255,0.18); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.16s; }
        .ct-remove-btn:hover { border-color:rgba(251,113,133,0.35); color:#fb7185; background:rgba(251,113,133,0.08); }

        /* Cart footer actions */
        .ct-footer { display:flex; align-items:center; justify-content:space-between; padding:12px 16px 0; margin-top:4px; }
        .ct-clear-btn { display:inline-flex; align-items:center; gap:6px; font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:rgba(255,255,255,0.2); background:none; border:none; cursor:pointer; padding:0; transition:color 0.18s; }
        .ct-clear-btn:hover { color:#fb7185; }

        /* Confirm clear */
        .ct-confirm { background:#111; border:0.5px solid rgba(251,113,133,0.3); border-radius:3px; padding:14px 16px; margin-bottom:8px; display:flex; align-items:center; gap:12px; flex-wrap:wrap; }
        .ct-confirm-text { font-size:12px; font-weight:300; color:rgba(255,255,255,0.4); flex:1; }
        .ct-confirm-yes { font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; padding:6px 14px; border-radius:1px; background:rgba(251,113,133,0.1); border:0.5px solid rgba(251,113,133,0.38); color:#fb7185; cursor:pointer; transition:background 0.16s; }
        .ct-confirm-yes:hover { background:rgba(251,113,133,0.18); }
        .ct-confirm-no { font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; padding:6px 14px; border-radius:1px; background:transparent; border:0.5px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.3); cursor:pointer; transition:all 0.16s; }
        .ct-confirm-no:hover { border-color:rgba(255,255,255,0.25); color:rgba(255,255,255,0.6); }

        /* ── Order summary ── */
        .ct-summary { background:#0E0E0E; border:0.5px solid rgba(255,255,255,0.07); border-radius:3px; padding:20px; }
        .ct-summary-title { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.22); margin:0 0 18px; }

        .ct-sum-row { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
        .ct-sum-label { font-size:12px; font-weight:300; color:rgba(255,255,255,0.3); letter-spacing:0.04em; }
        .ct-sum-val { font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:600; color:rgba(255,255,255,0.55); }
        .ct-sum-val.free { color:rgba(74,222,128,0.7); }

        .ct-sum-rule { height:0.5px; background:rgba(255,255,255,0.06); margin:12px 0; }

        .ct-sum-total-label { font-family:'Barlow Condensed',sans-serif; font-size:11px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.25); }
        .ct-sum-total-val { font-family:'Barlow Condensed',sans-serif; font-size:30px; font-weight:900; color:#fff; letter-spacing:-0.02em; line-height:1; }
        .ct-sum-total-cents { font-size:13px; font-weight:300; color:rgba(255,255,255,0.3); vertical-align:super; }

        /* Free shipping bar */
        .ct-ship-bar { margin:14px 0 18px; }
        .ct-ship-bar-meta { display:flex; justify-content:space-between; margin-bottom:6px; }
        .ct-ship-bar-hint { font-size:11px; font-weight:300; color:rgba(255,255,255,0.22); letter-spacing:0.03em; }
        .ct-ship-bar-need { font-family:'Barlow Condensed',sans-serif; font-size:10px; font-weight:600; letter-spacing:0.1em; color:rgba(192,132,252,0.55); }
        .ct-ship-track { height:2px; background:rgba(255,255,255,0.06); border-radius:1px; overflow:hidden; }
        .ct-ship-fill { height:100%; background:rgba(192,132,252,0.55); border-radius:1px; transition:width 0.45s ease; }

        /* Place order btn */
        .ct-order-btn { width:100%; display:flex; align-items:center; justify-content:center; gap:8px; padding:13px; border-radius:2px; background:rgba(192,132,252,0.12); border:0.5px solid rgba(192,132,252,0.42); color:#C084FC; font-family:'Barlow Condensed',sans-serif; font-size:13px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; cursor:pointer; position:relative; overflow:hidden; transition:background 0.2s,box-shadow 0.2s,transform 0.18s; box-shadow:0 0 20px rgba(140,0,255,0.12); margin-bottom:16px; }
        .ct-order-btn:hover:not(:disabled) { background:rgba(192,132,252,0.19); box-shadow:0 0 30px rgba(140,0,255,0.22); transform:translateY(-2px); }
        .ct-order-btn:active:not(:disabled) { transform:scale(0.98); }
        .ct-order-btn:disabled { opacity:0.45; cursor:not-allowed; }
        .ct-order-btn .ct-shimmer { position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent); transform:translateX(-100%); animation:ct-sh 1.6s ease-in-out infinite; }
        @keyframes ct-sh { to { transform:translateX(200%); } }
        .ct-btn-spin { width:13px; height:13px; border-radius:50%; border:1.5px solid rgba(192,132,252,0.2); border-top-color:#C084FC; animation:ct-spin 0.85s linear infinite; }

        /* Payment pills */
        .ct-payment { display:flex; flex-wrap:wrap; gap:5px; justify-content:center; margin-bottom:14px; }
        .ct-pay-pill { font-family:'Barlow Condensed',sans-serif; font-size:9px; font-weight:600; letter-spacing:0.14em; text-transform:uppercase; padding:4px 10px; border-radius:1px; background:rgba(255,255,255,0.04); border:0.5px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.3); }

        /* Guarantee */
        .ct-guarantee { display:flex; align-items:flex-start; gap:8px; background:rgba(74,222,128,0.05); border:0.5px solid rgba(74,222,128,0.14); border-radius:2px; padding:10px 12px; }
        .ct-guarantee-text { font-size:11px; font-weight:300; color:rgba(255,255,255,0.3); line-height:1.5; letter-spacing:0.02em; }

        /* Order success overlay */
        .ct-success { position:fixed; inset:0; z-index:200; background:rgba(8,8,8,0.92); backdrop-filter:blur(16px); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px; animation:ct-si 0.3s cubic-bezier(0.22,1,0.36,1); }
        @keyframes ct-si { from { opacity:0; } to { opacity:1; } }
        .ct-success-ring { width:60px; height:60px; border-radius:50%; background:rgba(74,222,128,0.08); border:0.5px solid rgba(74,222,128,0.3); display:flex; align-items:center; justify-content:center; animation:ct-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.1s both; }
        @keyframes ct-pop { from { transform:scale(0); } to { transform:scale(1); } }
        .ct-success-title { font-family:'Barlow Condensed',sans-serif; font-size:22px; font-weight:900; letter-spacing:0.06em; text-transform:uppercase; color:rgba(255,255,255,0.8); }
        .ct-success-sub { font-size:12px; font-weight:300; color:rgba(255,255,255,0.28); letter-spacing:0.06em; }

        /* Responsive */
        .ct-table-head, .ct-item-inner { grid-template-columns:1fr 90px 80px 80px 32px; }
        @media (max-width: 640px) {
          .ct-table-head { display:none; }
          .ct-item-inner { grid-template-columns:1fr auto; grid-template-rows:auto auto; gap:10px; }
          .ct-price { display:none; }
          .ct-qty { justify-content:flex-start; }
          .ct-total { text-align:left; }
          .ct-summary-col { flex:1 1 100%; position:static; }
        }
        @keyframes ct-spin { to { transform:rotate(360deg); } }
      `}</style>

      {/* Order success screen */}
      {orderSuccess && (
        <div className="ct-success">
          <div className="ct-success-ring">
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="ct-success-title">Order Placed</span>
          <span className="ct-success-sub">Redirecting to your orders…</span>
        </div>
      )}

      <div className="ct-page">
        {/* Header */}
        <div className="ct-header">
          <div className="ct-header-inner">
            <div>
              <span className="ct-eyebrow">Your Bag</span>
              <h1 className="ct-page-title">Shopping<br/><em>Cart</em></h1>
              <p className="ct-item-count">
                {items.length} item{items.length !== 1 ? "s" : ""} selected
              </p>
            </div>
            <Link to="/" className="ct-back-link">
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 12H5M12 5l-7 7 7 7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="ct-body">
          {/* Items column */}
          <div className="ct-items-col">
            {items.length === 0 ? (
              <div className="ct-empty">
                <div className="ct-empty-icon">
                  <svg width="22" height="22" fill="none" stroke="rgba(255,255,255,0.2)" viewBox="0 0 24 24">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="ct-empty-title">Your cart is empty</h2>
                <p className="ct-empty-sub">Browse the collection and add some kicks</p>
                <Link to="/" className="ct-start-btn">
                  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 12H5M12 5l-7 7 7 7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Start Shopping
                </Link>
              </div>
            ) : (
              <>
                {/* Table header */}
                <div className="ct-table-head">
                  <span className="ct-th">Product</span>
                  <span className="ct-th center">Qty</span>
                  <span className="ct-th right">Price</span>
                  <span className="ct-th right">Total</span>
                  <span className="ct-th" />
                </div>

                {/* Confirm clear */}
                {confirmClear && (
                  <div className="ct-confirm">
                    <span className="ct-confirm-text">Remove all items from your cart?</span>
                    <button className="ct-confirm-yes" onClick={clearCart}>Yes, clear</button>
                    <button className="ct-confirm-no" onClick={() => setConfirmClear(false)}>Cancel</button>
                  </div>
                )}

                {/* Items */}
                {items.map(item => (
                  <div
                    key={item.productId}
                    className={`ct-item${removing[item.productId] ? " removing" : ""}`}
                  >
                    <div className="ct-item-inner">
                      {/* Product */}
                      <div className="ct-product-block">
                        <div className="ct-img">
                          {item.imageUrl
                            ? <img src={item.imageUrl} alt={item.name} loading="lazy" />
                            : (
                              <div className="ct-img-placeholder">
                                <svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.1)" viewBox="0 0 24 24">
                                  <rect x="3" y="3" width="18" height="18" rx="1.5" strokeWidth="1"/>
                                </svg>
                              </div>
                            )
                          }
                        </div>
                        <div className="ct-product-info">
                          {item.category && <span className="ct-product-cat">{item.category}</span>}
                          <h3 className="ct-product-name">{item.name}</h3>
                          {item.size && <span className="ct-product-size">Size · US {item.size}</span>}
                        </div>
                      </div>

                      {/* Qty */}
                      <div className="ct-qty">
                        <button
                          className="ct-qty-btn"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={updating[item.productId] || item.quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M5 12h14" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                        <span className="ct-qty-val">
                          {updating[item.productId]
                            ? <span className="ct-qty-spin" />
                            : item.quantity
                          }
                        </span>
                        <button
                          className="ct-qty-btn"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          disabled={updating[item.productId]}
                          aria-label="Increase quantity"
                        >
                          <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>

                      {/* Unit price */}
                      <div className="ct-price">
                        ₹{typeof item.price === "number" ? item.price.toFixed(2) : item.price}
                      </div>

                      {/* Row total */}
                      <div className="ct-total">
                        ₹{typeof item.totalPrice === "number"
                          ? item.totalPrice.toFixed(2)
                          : (item.price * item.quantity).toFixed(2)}
                      </div>

                      {/* Remove */}
                      <button
                        className="ct-remove-btn"
                        onClick={() => removeItem(item.productId)}
                        disabled={removing[item.productId]}
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Footer */}
                <div className="ct-footer">
                  <button className="ct-clear-btn" onClick={() => setConfirmClear(true)}>
                    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Clear Cart
                  </button>
                  <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", color:"rgba(255,255,255,0.16)" }}>
                    {items.length} item{items.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Summary column */}
          {items.length > 0 && (
            <div className="ct-summary-col">
              <div className="ct-summary">
                <h2 className="ct-summary-title">Order Summary</h2>

                <div className="ct-sum-row">
                  <span className="ct-sum-label">Subtotal</span>
                  <span className="ct-sum-val">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="ct-sum-row">
                  <span className="ct-sum-label">Shipping</span>
                  <span className={`ct-sum-val${shipping === 0 ? " free" : ""}`}>
                    {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="ct-sum-row">
                  <span className="ct-sum-label">Tax (10%)</span>
                  <span className="ct-sum-val">₹{tax.toFixed(2)}</span>
                </div>

                {/* Free shipping progress */}
                {shipping > 0 && (
                  <div className="ct-ship-bar">
                    <div className="ct-ship-bar-meta">
                      <span className="ct-ship-bar-hint">Free shipping over ₹500</span>
                      <span className="ct-ship-bar-need">₹{(500 - subtotal).toFixed(0)} away</span>
                    </div>
                    <div className="ct-ship-track">
                      <div className="ct-ship-fill" style={{ width:`${freeShipPct}%` }} />
                    </div>
                  </div>
                )}

                <div className="ct-sum-rule" />

                <div className="ct-sum-row" style={{ alignItems:"flex-end" }}>
                  <span className="ct-sum-total-label">Total</span>
                  <span className="ct-sum-total-val">
                    ₹{total.toFixed(2).split(".")[0]}
                    <span className="ct-sum-total-cents">.{total.toFixed(2).split(".")[1]}</span>
                  </span>
                </div>

                <div className="ct-sum-rule" style={{ margin:"16px 0" }} />

                {/* Place order */}
                <button
                  className="ct-order-btn"
                  onClick={placeOrder}
                  disabled={placingOrder}
                >
                  {placingOrder && <span className="ct-shimmer" aria-hidden="true" />}
                  {placingOrder ? (
                    <>
                      <span className="ct-btn-spin" />
                      Processing
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="1" y="4" width="22" height="16" rx="2" strokeWidth="1.6"/>
                        <path d="M1 10h22" strokeWidth="1.6"/>
                      </svg>
                      Place Order
                    </>
                  )}
                </button>

                {/* Payment methods */}
                <div className="ct-payment">
                  {["Visa", "Mastercard", "PayPal", "Razorpay", "UPI"].map(m => (
                    <span key={m} className="ct-pay-pill">{m}</span>
                  ))}
                </div>

                {/* Guarantee */}
                <div className="ct-guarantee">
                  <svg width="13" height="13" fill="none" stroke="rgba(74,222,128,0.6)" viewBox="0 0 24 24" style={{ flexShrink:0, marginTop:1 }}>
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622C17.176 19.29 21 14.591 21 9c0-1.042-.133-2.052-.382-3.016z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="ct-guarantee-text">
                    30-day money-back guarantee · Free returns · Secure checkout
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}