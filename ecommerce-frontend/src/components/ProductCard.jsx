import { useState } from "react";
import API from "../api/axios";

export default function ProductCard({ product, onAddToCart }) {
  const [addingToCart, setAddingToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const sizes = product.sizes?.length
    ? product.sizes
    : [6, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12];

  const handleAddToCart = async () => {
    if (!selectedSize) return;

    setAddingToCart(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      await API.post("/cart", {
        productId: product.id,
        quantity: 1,
        size: selectedSize,
      });

      setAddedFeedback(true);
      setTimeout(() => setAddedFeedback(false), 2000);

      if (onAddToCart) onAddToCart(product.id);
    } catch (error) {
      alert("Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const rawPrice =
    typeof product.price === "number"
      ? product.price.toFixed(2)
      : String(product.price ?? "0.00");

  const [dollars, cents] = rawPrice.split(".");

  return (
    <article className="relative bg-[#0C0C0C] border border-white/10 rounded-sm overflow-hidden flex flex-col transition hover:-translate-y-1 hover:border-white/20">

      {/* SUCCESS OVERLAY */}
      {addedFeedback && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-2 bg-black/90 backdrop-blur-md">
          <div className="w-12 h-12 rounded-full border border-green-400/40 bg-green-400/10 flex items-center justify-center">
            ✓
          </div>
          <span className="text-xs uppercase tracking-widest text-white/50">
            Added to Cart
          </span>
          {selectedSize && (
            <span className="text-[10px] text-purple-400 uppercase">
              Size {selectedSize}
            </span>
          )}
        </div>
      )}

      {/* IMAGE */}
      <div className="relative aspect-square bg-[#111] overflow-hidden group">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#111] via-[#1a1a1a] to-[#111]" />
        )}

        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            onLoad={() => setImgLoaded(true)}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300";
              setImgLoaded(true);
            }}
            className={`w-full h-full object-cover transition duration-500 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            } group-hover:scale-105`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20">
            No Image
          </div>
        )}

        {/* BADGES */}
        {product.discount && (
          <span className="absolute top-2 left-2 text-[9px] px-2 py-1 border border-red-400/40 text-red-400 bg-red-400/10 uppercase">
            -{product.discount}%
          </span>
        )}

        {product.isNew && (
          <span className="absolute top-2 right-2 text-[9px] px-2 py-1 border border-green-400/40 text-green-400 bg-green-400/10 uppercase">
            New
          </span>
        )}

        {/* ACTIONS */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => setWishlisted(!wishlisted)}
            className="w-8 h-8 bg-black/80 border border-white/20 flex items-center justify-center"
          >
            ❤️
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="p-4 flex flex-col flex-1">

        {/* CATEGORY */}
        <div className="text-[10px] uppercase text-purple-400/70 mb-1">
          {product.category}
        </div>

        {/* NAME */}
        <h3 className="text-lg font-bold uppercase text-white truncate">
          {product.name}
        </h3>

        {/* MODEL */}
        <p className="text-xs text-white/40 mb-3 truncate">
          {product.model}
        </p>

        {/* SIZES */}
        <div className="flex flex-wrap gap-1 mb-3">
          {sizes.map((s) => {
            const isOos = product.outOfStock?.includes(s);
            return (
              <button
                key={s}
                disabled={isOos}
                onClick={() => setSelectedSize(s)}
                className={`text-xs px-2 py-1 border ${
                  selectedSize === s
                    ? "border-purple-400 text-purple-400"
                    : "border-white/20 text-white/40"
                } ${isOos && "opacity-20 line-through"}`}
              >
                {s}
              </button>
            );
          })}
        </div>

        {/* PRICE */}
        <div className="flex justify-between items-center mt-auto">
          <div>
            <span className="text-2xl font-bold">${dollars}</span>
            <span className="text-sm text-white/40">.{cents}</span>

            {product.oldPrice && (
              <div className="text-xs line-through text-white/30">
                ${product.oldPrice}
              </div>
            )}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleAddToCart}
            disabled={addingToCart}
            className="px-4 py-2 border border-purple-400 text-purple-400 text-xs uppercase hover:bg-purple-400/20 transition"
          >
            {addingToCart ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}