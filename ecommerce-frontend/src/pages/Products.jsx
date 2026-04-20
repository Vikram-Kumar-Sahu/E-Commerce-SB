import { useEffect, useState, useRef } from "react";
import API from "../api/axios";
import ProductCard from "../components/ProductCard";
import HeroSlider from "../components/HeroSlider";

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");
  const [loadCount, setLoadCount] = useState(8);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        const data = res.data;
        setProducts(data);
        const cats = [...new Set(data.map(p => p.category).filter(Boolean))];
        setCategories(cats);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredProducts = products
    .filter(p =>
      (selectedCategory === "all" || p.category === selectedCategory) &&
      (search === "" ||
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.brand?.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "newest") return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      return 0;
    });

  const visibleProducts = filteredProducts.slice(0, loadCount);
  const hasMore = loadCount < filteredProducts.length;
  const currentSortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label ?? "Featured";

  // Loader
  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-5">
        <div className="w-12 h-12 rounded-full border border-purple-300/20 border-t-purple-400 animate-spin"></div>
        <span className="text-[11px] font-bold tracking-[0.26em] uppercase text-white/25">
          Loading Collection
        </span>
        <div className="flex gap-1">
          <span className="w-1 h-1 rounded-full bg-purple-400/40 animate-bounce"></span>
          <span className="w-1 h-1 rounded-full bg-purple-400/40 animate-bounce delay-150"></span>
          <span className="w-1 h-1 rounded-full bg-purple-400/40 animate-bounce delay-300"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white relative">

      {/* Hero */}
      <HeroSlider />

      {/* Controls */}
      <div className="sticky top-0 z-[100] bg-[#080808]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-[clamp(16px,5vw,72px)] h-[52px] flex items-center gap-3">

          {/* Search */}
          <div className="relative flex-[0_0_clamp(160px,22vw,260px)]">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2"
                 width="13" height="13" stroke="rgba(255,255,255,0.22)">
              <circle cx="11" cy="11" r="7" strokeWidth="1.6"/>
              <path d="M16.5 16.5L21 21" strokeWidth="1.6"/>
            </svg>
            <input
              className="w-full h-8 bg-white/5 border border-white/10 rounded-sm pl-8 pr-2 text-[12px] text-white/70 outline-none focus:border-purple-400/40 focus:bg-purple-400/5"
              placeholder="Search shoes…"
              value={search}
              onChange={e => { setSearch(e.target.value); setLoadCount(8); }}
            />
          </div>

          {/* Categories */}
          <div className="flex gap-1 overflow-x-auto flex-1">
            <button
              onClick={() => { setSelectedCategory("all"); setLoadCount(8); }}
              className={`h-7 px-3 text-[10px] uppercase border rounded-sm ${
                selectedCategory === "all"
                  ? "bg-purple-400/10 border-purple-400 text-purple-400"
                  : "border-white/10 text-white/40 hover:bg-white/5"
              }`}
            >
              All
            </button>

            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setLoadCount(8); }}
                className={`h-7 px-3 text-[10px] uppercase border rounded-sm ${
                  selectedCategory === cat
                    ? "bg-purple-400/10 border-purple-400 text-purple-400"
                    : "border-white/10 text-white/40 hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          <span className="text-[10px] text-white/30 whitespace-nowrap">
            {filteredProducts.length} results
          </span>

          {/* Sort */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="h-7 px-3 text-[10px] uppercase border border-white/10 rounded-sm text-white/40 hover:bg-white/5"
            >
              {currentSortLabel}
            </button>

            {sortOpen && (
              <div className="absolute right-0 mt-2 bg-[#111] border border-white/10 rounded-sm">
                {SORT_OPTIONS.map(opt => (
                  <div
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                    className={`px-4 py-2 text-[11px] uppercase cursor-pointer ${
                      sortBy === opt.value
                        ? "text-purple-400"
                        : "text-white/40 hover:bg-white/5"
                    }`}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Section */}
      <div className="max-w-[1440px] mx-auto px-[clamp(16px,5vw,72px)] py-10">

        {/* Heading */}
        <h2 className="text-4xl font-black uppercase mb-6">
          {selectedCategory === "all" ? "Featured Collection" : `${selectedCategory} Shoes`}
        </h2>

        {/* Grid */}
        <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">

          {visibleProducts.length === 0 ? (
            <div className="col-span-full text-center py-20 text-white/40">
              No shoes found
            </div>
          ) : (
            visibleProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(id) => console.log("Added:", id)}
              />
            ))
          )}

        </div>

        {/* Load More */}
        {hasMore && (
          <div className="flex flex-col items-center mt-10 gap-4">
            <button
              onClick={() => setLoadCount(c => c + 8)}
              className="px-6 py-2 border border-purple-400 text-purple-400 uppercase text-sm hover:bg-purple-400/20"
            >
              Load More
            </button>
          </div>
        )}

      </div>
    </div>
  );
}