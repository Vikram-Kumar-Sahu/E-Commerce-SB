import { useState, useEffect, useRef, useCallback } from "react";

const slides = [
  {
    id: 1,
    title: "AIR MAX",
    titleAccent: "PULSE",
    subtitle: "Unleash Your Rhythm",
    description: "Responsive cushioning meets futuristic design. Experience the perfect blend of style and performance.",
    buttonText: "Shop Now",
    buttonLink: "/category/running",
    shoeModel: "Nike Air Max Pulse",
    price: "$149",
    cents: ".99",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop",
    tag: "Best Seller",
    palette: {
      bg: "#0D0A1A",
      accent: "#C084FC",
      accentDim: "#7C3AED",
      text: "#EDE9FE",
      tagBg: "rgba(192,132,252,0.15)",
      tagBorder: "rgba(192,132,252,0.4)",
      glow: "140,0,255",
    },
  },
  {
    id: 2,
    title: "ULTRA",
    titleAccent: "BOOST 23",
    subtitle: "Energy Returned",
    description: "The most responsive running shoe ever created. Feel the energy with every stride.",
    buttonText: "Discover More",
    buttonLink: "/category/running",
    shoeModel: "Adidas Ultra Boost 23",
    price: "$179",
    cents: ".99",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop",
    tag: "New Arrival",
    palette: {
      bg: "#030F1A",
      accent: "#38BDF8",
      accentDim: "#0369A1",
      text: "#E0F2FE",
      tagBg: "rgba(56,189,248,0.12)",
      tagBorder: "rgba(56,189,248,0.4)",
      glow: "0,150,255",
    },
  },
  {
    id: 3,
    title: "JORDAN",
    titleAccent: "RETRO 4",
    subtitle: "Legendary Style",
    description: "Step into history with the iconic silhouette that changed sneaker culture forever.",
    buttonText: "Shop Collection",
    buttonLink: "/category/jordan",
    shoeModel: "Air Jordan 4 Retro",
    price: "$214",
    cents: ".99",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&h=800&fit=crop",
    tag: "Limited Edition",
    palette: {
      bg: "#150800",
      accent: "#FB923C",
      accentDim: "#C2410C",
      text: "#FFF7ED",
      tagBg: "rgba(251,146,60,0.12)",
      tagBorder: "rgba(251,146,60,0.4)",
      glow: "255,100,0",
    },
  },
  {
    id: 4,
    title: "YEEZY",
    titleAccent: "350 V2",
    subtitle: "Future Forward",
    description: "Revolutionary design meets unparalleled comfort. A statement piece for the modern collector.",
    buttonText: "View Details",
    buttonLink: "/category/yeezy",
    shoeModel: "Yeezy Boost 350 V2",
    price: "$229",
    cents: ".99",
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=800&fit=crop",
    tag: "Iconic",
    palette: {
      bg: "#0A0A0A",
      accent: "#A3A3A3",
      accentDim: "#525252",
      text: "#F5F5F5",
      tagBg: "rgba(163,163,163,0.12)",
      tagBorder: "rgba(163,163,163,0.35)",
      glow: "180,180,180",
    },
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [dir, setDir] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const timerRef = useRef(null);

  const slide = slides[current];
  const prevSlide = prev !== null ? slides[prev] : null;

  const go = useCallback(
    (nextIdx, direction = 1) => {
      if (animating) return;
      setDir(direction);
      setPrev(current);
      setCurrent(nextIdx);
      setAnimating(true);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 700);
    },
    [current, animating]
  );

  const next = useCallback(() => {
    go((current + 1) % slides.length, 1);
  }, [current, go]);

  const prev2 = useCallback(() => {
    go((current - 1 + slides.length) % slides.length, -1);
  }, [current, go]);

  const goTo = useCallback(
    (idx) => {
      if (idx === current) return;
      go(idx, idx > current ? 1 : -1);
    },
    [current, go]
  );

  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [isPlaying, next]);

  const pauseAuto = () => {
    setIsPlaying(false);
    clearInterval(timerRef.current);
    setTimeout(() => setIsPlaying(true), 12000);
  };

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) {
      pauseAuto();
      diff > 0 ? next() : prev2();
    }
  };

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        fontFamily: "'Barlow Condensed', 'Anton', 'Impact', sans-serif",
        userSelect: "none",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap');

        .hs-root * { box-sizing: border-box; }

        .hs-slide {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform, opacity;
        }
        .hs-slide-enter-right { animation: hs-enter-r 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .hs-slide-enter-left  { animation: hs-enter-l 0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .hs-slide-exit-right  { animation: hs-exit-r  0.7s cubic-bezier(0.22,1,0.36,1) forwards; }
        .hs-slide-exit-left   { animation: hs-exit-l  0.7s cubic-bezier(0.22,1,0.36,1) forwards; }

        @keyframes hs-enter-r { from { transform: translateX(6%); opacity:0; } to { transform: translateX(0); opacity:1; } }
        @keyframes hs-enter-l { from { transform: translateX(-6%); opacity:0; } to { transform: translateX(0); opacity:1; } }
        @keyframes hs-exit-r  { from { transform: translateX(0); opacity:1; } to { transform: translateX(-6%); opacity:0; } }
        @keyframes hs-exit-l  { from { transform: translateX(0); opacity:1; } to { transform: translateX(6%); opacity:0; } }

        .hs-shoe-in { animation: hs-shoe-in 0.85s cubic-bezier(0.22,1,0.36,1) 0.1s both; }
        @keyframes hs-shoe-in {
          from { transform: translateX(60px) scale(0.88) rotate(-6deg); opacity:0; }
          to   { transform: translateX(0) scale(1) rotate(0deg); opacity:1; }
        }

        .hs-text-line { overflow: hidden; }
        .hs-text-line > span { display: block; }
        .hs-text-in-1 > span { animation: hs-text-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
        .hs-text-in-2 > span { animation: hs-text-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.32s both; }
        .hs-text-in-3 > span { animation: hs-text-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.44s both; }
        .hs-text-in-4 > span { animation: hs-text-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.52s both; }
        .hs-text-in-5 > span { animation: hs-text-up 0.65s cubic-bezier(0.22,1,0.36,1) 0.6s both; }
        @keyframes hs-text-up {
          from { transform: translateY(110%); opacity:0; }
          to   { transform: translateY(0); opacity:1; }
        }

        .hs-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 12px 28px; border-radius: 3px;
          font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 15px; letter-spacing: 0.12em;
          text-transform: uppercase; text-decoration: none;
          cursor: pointer; border: none; outline: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hs-btn:hover { transform: translateY(-2px); }
        .hs-btn:active { transform: translateY(0) scale(0.98); }

        .hs-nav-btn {
          position: absolute; top: 50%; z-index: 30;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.06);
          border: 0.5px solid rgba(255,255,255,0.14);
          color: #fff; border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s, transform 0.2s;
          backdrop-filter: blur(6px);
        }
        .hs-nav-btn:hover { background: rgba(255,255,255,0.14); transform: translateY(-50%) scale(1.08); }

        .hs-dot {
          border: none; cursor: pointer; padding: 0;
          border-radius: 0; background: rgba(255,255,255,0.22);
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .hs-dot.active { background: #fff; }

        .hs-progress {
          position: absolute; bottom: 0; left: 0; height: 2px;
          transform-origin: left;
          animation: hs-progress 6s linear forwards;
        }
        @keyframes hs-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        .hs-float { animation: hs-float 8s ease-in-out infinite; }
        @keyframes hs-float {
          0%,100% { transform: translateY(0px) rotate(-2deg); }
          50%      { transform: translateY(-18px) rotate(2deg); }
        }

        .hs-shoe-shine::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(125deg, rgba(255,255,255,0.18) 0%, transparent 50%);
          border-radius: 50%; pointer-events: none;
        }

        @media (max-width: 480px) {
          .hs-nav-btn { display: none !important; }
          .hs-description { display: none !important; }
        }
        @media (max-width: 767px) {
          .hs-layout { flex-direction: column !important; }
          .hs-text-col { width: 100% !important; padding: 0 20px 20px !important; align-items: center !important; text-align: center !important; }
          .hs-img-col { width: 100% !important; flex: none !important; }
          .hs-title-size { font-size: clamp(52px, 14vw, 88px) !important; line-height: 0.88 !important; }
          .hs-price-badge { right: 8px !important; top: 8px !important; }
          .hs-nav-btn { width: 36px !important; height: 36px !important; }
        }
      `}</style>

      <div
        className="hs-root"
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(420px, 56vw, 700px)",
          background: "#080808",
        }}
      >
        {/* Background layer — exits */}
        {prevSlide && (
          <div
            className={`hs-slide ${dir === 1 ? "hs-slide-exit-right" : "hs-slide-exit-left"}`}
            style={{ background: prevSlide.palette.bg, zIndex: 1 }}
          />
        )}

        {/* Background layer — enters */}
        <div
          className={`hs-slide ${animating ? (dir === 1 ? "hs-slide-enter-right" : "hs-slide-enter-left") : ""}`}
          style={{
            background: slide.palette.bg,
            zIndex: 2,
            opacity: 1,
          }}
        >
          {/* Noise texture */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.025 }} aria-hidden>
            <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
            <rect width="100%" height="100%" filter="url(#noise)"/>
          </svg>

          {/* Accent grid lines */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.04,
            backgroundImage: `linear-gradient(${slide.palette.accent} 1px, transparent 1px), linear-gradient(90deg, ${slide.palette.accent} 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }} />

          {/* Big glow blob behind shoe */}
          <div style={{
            position: "absolute",
            right: "15%", top: "50%",
            transform: "translate(50%, -50%)",
            width: "clamp(260px, 42vw, 600px)",
            height: "clamp(260px, 42vw, 600px)",
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(${slide.palette.glow},0.22) 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />

          {/* Main layout */}
          <div className="hs-layout" style={{
            position: "relative", zIndex: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            width: "100%", height: "100%",
            maxWidth: "1280px", margin: "0 auto",
            padding: "0 clamp(16px, 4vw, 60px)",
          }}>

            {/* Text column */}
            <div className="hs-text-col" style={{
              flex: "1 1 0",
              display: "flex", flexDirection: "column",
              alignItems: "flex-start", justifyContent: "center",
              gap: 0,
              paddingRight: "clamp(0px, 3vw, 40px)",
            }}>

              {/* Tag */}
              <div className="hs-text-line hs-text-in-1" style={{ marginBottom: 16 }}>
                <span style={{
                  display: "inline-block",
                  padding: "5px 14px",
                  border: `0.5px solid ${slide.palette.tagBorder}`,
                  background: slide.palette.tagBg,
                  borderRadius: 2,
                  color: slide.palette.accent,
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: "clamp(10px, 1.1vw, 12px)",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}>
                  {slide.tag}
                </span>
              </div>

              {/* Model name */}
              <div className="hs-text-line hs-text-in-2" style={{ marginBottom: 8 }}>
                <span style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: "clamp(11px, 1.1vw, 13px)",
                  fontWeight: 300,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                }}>
                  {slide.shoeModel}
                </span>
              </div>

              {/* Big title */}
              <div style={{ marginBottom: 10 }}>
                <div className="hs-text-line hs-text-in-3">
                  <span className="hs-title-size" style={{
                    fontSize: "clamp(56px, 9.5vw, 120px)",
                    lineHeight: 0.85,
                    fontWeight: 900,
                    letterSpacing: "-0.01em",
                    color: "rgba(255,255,255,0.95)",
                    textTransform: "uppercase",
                    display: "block",
                    fontFamily: "'Barlow Condensed', sans-serif",
                  }}>
                    {slide.title}
                  </span>
                </div>
                <div className="hs-text-line hs-text-in-3" style={{ marginTop: 2 }}>
                  <span className="hs-title-size" style={{
                    fontSize: "clamp(56px, 9.5vw, 120px)",
                    lineHeight: 0.85,
                    fontWeight: 900,
                    letterSpacing: "-0.01em",
                    color: slide.palette.accent,
                    textTransform: "uppercase",
                    display: "block",
                    fontFamily: "'Barlow Condensed', sans-serif",
                  }}>
                    {slide.titleAccent}
                  </span>
                </div>
              </div>

              {/* Subtitle */}
              <div className="hs-text-line hs-text-in-4" style={{ marginBottom: 12 }}>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "clamp(14px, 1.9vw, 22px)",
                  fontWeight: 300,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.55)",
                }}>
                  {slide.subtitle}
                </span>
              </div>

              {/* Description */}
              <div className="hs-text-line hs-text-in-4 hs-description" style={{ marginBottom: 28 }}>
                <span style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: "clamp(13px, 1.1vw, 15px)",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.4)",
                  maxWidth: 380,
                  display: "block",
                }}>
                  {slide.description}
                </span>
              </div>

              {/* Price + CTA */}
              <div className="hs-text-line hs-text-in-5" style={{ width: "100%" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                  {/* Price */}
                  <span style={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                    <span style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "clamp(28px, 3.8vw, 48px)",
                      fontWeight: 800,
                      color: "#fff",
                      letterSpacing: "-0.02em",
                    }}>
                      {slide.price}
                    </span>
                    <span style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: "clamp(13px, 1.2vw, 16px)",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.4)",
                    }}>
                      {slide.cents}
                    </span>
                  </span>

                  {/* Divider */}
                  <span style={{ width: 1, height: 36, background: "rgba(255,255,255,0.12)" }} />

                  {/* CTA */}
                  <a
                    href={slide.buttonLink}
                    className="hs-btn"
                    style={{
                      background: slide.palette.accent,
                      color: "#000",
                      boxShadow: `0 0 28px rgba(${slide.palette.glow},0.35)`,
                    }}
                  >
                    <span>{slide.buttonText}</span>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </span>
              </div>
            </div>

            {/* Image column */}
            <div className="hs-img-col" style={{
              flex: "0 0 clamp(240px, 42vw, 580px)",
              height: "clamp(260px, 44vw, 580px)",
              position: "relative",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {/* Decorative circle */}
              <div style={{
                position: "absolute",
                width: "78%", height: "78%",
                borderRadius: "50%",
                border: `0.5px solid rgba(${slide.palette.glow},0.14)`,
              }} />
              <div style={{
                position: "absolute",
                width: "92%", height: "92%",
                borderRadius: "50%",
                border: `0.5px solid rgba(${slide.palette.glow},0.07)`,
              }} />

              {/* Shoe image */}
              <div className="hs-shoe-in hs-float hs-shoe-shine" style={{
                position: "relative",
                width: "90%", height: "90%",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <img
                  src={slide.image}
                  alt={slide.shoeModel}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "contain",
                    filter: `drop-shadow(0 24px 48px rgba(${slide.palette.glow},0.45))`,
                    transform: "rotate(-8deg)",
                  }}
                />
              </div>

              {/* Price badge floating */}
              <div className="hs-price-badge" style={{
                position: "absolute", top: 16, right: 0,
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
                border: "0.5px solid rgba(255,255,255,0.14)",
                borderRadius: 3,
                padding: "8px 14px",
              }}>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 12, fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  display: "block",
                  marginBottom: 2,
                }}>Price</span>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 24, fontWeight: 800,
                  color: slide.palette.accent,
                  letterSpacing: "-0.01em",
                }}>{slide.price}<span style={{ fontSize: 13, fontWeight: 400, color: "rgba(255,255,255,0.3)" }}>{slide.cents}</span></span>
              </div>

              {/* Free shipping badge */}
              <div style={{
                position: "absolute", bottom: 20, left: 0,
                display: "flex", alignItems: "center", gap: 7,
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(8px)",
                border: "0.5px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
                padding: "6px 12px",
              }}>
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" stroke={slide.palette.accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 11, fontWeight: 400,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                }}>Free Shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nav buttons */}
        <button
          className="hs-nav-btn"
          onClick={() => { pauseAuto(); prev2(); }}
          style={{ left: "clamp(8px, 1.5vw, 20px)", width: 44, height: 44 }}
          aria-label="Previous"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          className="hs-nav-btn"
          onClick={() => { pauseAuto(); next(); }}
          style={{ right: "clamp(8px, 1.5vw, 20px)", width: 44, height: 44 }}
          aria-label="Next"
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Bottom bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          zIndex: 20,
          display: "flex", alignItems: "center",
          padding: "0 clamp(16px, 4vw, 60px) 18px",
          gap: 16,
        }}>
          {/* Slide index */}
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 13, fontWeight: 600,
            letterSpacing: "0.16em",
            color: "rgba(255,255,255,0.35)",
            minWidth: 44,
          }}>
            {String(current + 1).padStart(2, "0")} <span style={{ color: "rgba(255,255,255,0.14)" }}>/</span> {String(slides.length).padStart(2, "0")}
          </span>

          {/* Dots */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {slides.map((s, i) => (
              <button
                key={i}
                className={`hs-dot${i === current ? " active" : ""}`}
                onClick={() => { pauseAuto(); goTo(i); }}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === current ? 28 : 6,
                  height: 3,
                  background: i === current ? slide.palette.accent : "rgba(255,255,255,0.22)",
                }}
              />
            ))}
          </div>

          {/* Play/pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              marginLeft: "auto",
              background: "none", border: "none",
              cursor: "pointer", padding: 0,
              display: "flex", alignItems: "center", gap: 6,
              color: "rgba(255,255,255,0.3)",
              fontFamily: "'Barlow', sans-serif",
              fontSize: 11, letterSpacing: "0.14em",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor"/>
                <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor"/>
              </svg>
            ) : (
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
            <span style={{ display: "none" }}>{isPlaying ? "Pause" : "Play"}</span>
          </button>
        </div>

        {/* Progress bar */}
        {isPlaying && (
          <div
            key={`${current}-progress`}
            className="hs-progress"
            style={{
              zIndex: 21,
              background: slide.palette.accent,
              opacity: 0.7,
              width: "100%",
            }}
          />
        )}
      </div>
    </div>
  );
}