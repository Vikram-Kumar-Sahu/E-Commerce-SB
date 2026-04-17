import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  AlertCircle,
  CheckCircle
} from "lucide-react";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    setLoading(true);
    API.get("/cart")
      .then((res) => {
        setCart(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setUpdating((prev) => ({ ...prev, [productId]: true }));

    try {
      await API.put(`/cart/item/${productId}?quantity=${newQuantity}`);
      fetchCart();
    } catch (error) {
      console.error(error);
      alert("Failed to update quantity");
    } finally {
      setUpdating((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const removeItem = async (productId) => {
    if (!window.confirm("Remove this item from your cart?")) return;

    setUpdating((prev) => ({ ...prev, [productId]: true }));

    try {
      await API.delete(`/cart/item/${productId}`);
      fetchCart();
    } catch (error) {
      console.error(error);
      alert("Failed to remove item");
    } finally {
      setUpdating((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const clearCart = async () => {
    if (!window.confirm("Clear entire cart?")) return;

    try {
      await API.delete("/cart/clear");
      fetchCart();
    } catch (error) {
      console.error(error);
      alert("Failed to clear cart");
    }
  };

  const placeOrder = async () => {
    if (!window.confirm("Place your order now?")) return;
    
    setPlacingOrder(true);
    try {
      await API.post("/order");
      alert("Order placed successfully! ✅");
      fetchCart();
      navigate("/orders");
    } catch (error) {
      console.error(error);
      alert("Failed to place order. Please try again. ❌");
    } finally {
      setPlacingOrder(false);
    }
  };

  const subtotal = cart?.items?.reduce(
    (sum, item) => sum + (item.totalPrice || item.price * item.quantity),
    0
  ) || 0;
  
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                <ShoppingCart className="w-8 h-8" />
                Your Shopping Cart
              </h1>
              <p className="text-white/80">
                {cart?.items?.length || 0} item{cart?.items?.length !== 1 ? 's' : ''} in your cart
              </p>
            </div>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {!cart?.items || cart.items.length === 0 ? (
          // Empty Cart State
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-16 h-16 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Table Header */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 bg-gray-50 px-6 py-4 border-b border-gray-200 text-sm font-semibold text-gray-600">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Price</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Cart Items */}
                <div className="divide-y divide-gray-200">
                  {cart.items.map((item) => (
                    <div key={item.productId} className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-4">
                            {/* Product Image */}
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              {item.imageUrl ? (
                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                              ) : (
                                <ShoppingCart className="w-8 h-8 text-purple-400" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                {item.name}
                              </h3>
                              {item.category && (
                                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                              )}
                              <button
                                onClick={() => removeItem(item.productId)}
                                disabled={updating[item.productId]}
                                className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 transition-colors disabled:opacity-50"
                              >
                                <Trash2 className="w-4 h-4" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between md:justify-center gap-4">
                          <div className="text-sm text-gray-500 md:hidden">Quantity:</div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              disabled={updating[item.productId] || item.quantity <= 1}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-medium">
                              {updating[item.productId] ? (
                                <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                              ) : (
                                item.quantity
                              )}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              disabled={updating[item.productId]}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between md:justify-end gap-4">
                          <div className="text-sm text-gray-500 md:hidden">Price:</div>
                          <div className="text-gray-600 font-medium">
                            ₹{typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                          </div>
                        </div>

                        {/* Total */}
                        <div className="flex items-center justify-between md:justify-end gap-4">
                          <div className="text-sm text-gray-500 md:hidden">Total:</div>
                          <div className="text-lg font-bold text-purple-600">
                            ₹{typeof item.totalPrice === 'number' ? item.totalPrice.toFixed(2) : (item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 text-sm flex items-center gap-2 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear Cart
                    </button>
                    <p className="text-sm text-gray-500">
                      {cart.items.length} item{cart.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (10%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Total</span>
                      <span className="text-2xl text-purple-600">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {shipping > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Free shipping on orders over ₹500</span>
                      <span>₹{(500 - subtotal).toFixed(2)} more needed</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((subtotal / 500) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Place Order Button */}
                <button
                  onClick={placeOrder}
                  disabled={placingOrder}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mb-4"
                >
                  {placingOrder ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Place Order
                    </>
                  )}
                </button>

                {/* Payment Methods */}
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2">Secure payments with</p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">Visa</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">Mastercard</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">PayPal</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">Razorpay</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">UPI</span>
                  </div>
                </div>

                {/* Guarantee Message */}
                <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <p className="text-xs text-green-600">
                    30-day money-back guarantee • Free returns • Secure checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}