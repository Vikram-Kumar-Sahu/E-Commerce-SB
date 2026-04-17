import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { 
  Package, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  Truck, 
  XCircle,
  Eye,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    API.get("/order")
      .then((res) => {
        console.log("ORDERS:", res.data);
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-purple-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-purple-100 text-purple-700';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading your orders...</p>
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
                <Package className="w-8 h-8" />
                My Orders
              </h1>
              <p className="text-white/80">
                {orders.length} order{orders.length !== 1 ? 's' : ''} placed
              </p>
            </div>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all duration-200 w-fit"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Orders Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {orders.length === 0 ? (
          // Empty Orders State
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-16 h-16 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
              <p className="text-gray-500 mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Order #{order.orderId}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Status Badge */}
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="text-sm font-semibold capitalize">{order.status?.toLowerCase() || 'Placed'}</span>
                      </div>
                      
                      {/* Total Amount */}
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="text-xl font-bold text-purple-600">₹{order.totalAmount?.toFixed(2)}</p>
                      </div>
                      
                      {/* Expand/Collapse Button */}
                      <button
                        onClick={() => setExpandedOrder(expandedOrder === order.orderId ? null : order.orderId)}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"
                      >
                        {expandedOrder === order.orderId ? (
                          <>
                            <ChevronUp className="w-4 h-4" />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            View Details
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Items (Expandable) */}
                {expandedOrder === order.orderId && (
                  <div className="px-6 py-4 animate-fade-in">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-purple-600" />
                      Order Items
                    </h3>
                    
                    <div className="space-y-3">
                      {order.items?.map((item) => (
                        <div
                          key={item.productId}
                          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            {/* Product Image Placeholder */}
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              {item.imageUrl ? (
                                <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover rounded-lg" />
                              ) : (
                                <Package className="w-6 h-6 text-purple-400" />
                              )}
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-1">
                                {item.productName}
                              </h4>
                              <p className="text-sm text-gray-500">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between md:justify-end gap-6">
                            <div>
                              <p className="text-sm text-gray-500">Price</p>
                              <p className="font-medium text-gray-700">₹{item.price?.toFixed(2)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Total</p>
                              <p className="font-bold text-purple-600">₹{item.totalPrice?.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 p-4 bg-purple-50 rounded-xl">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-purple-600" />
                          <span className="text-sm text-gray-600">Payment Method:</span>
                          <span className="text-sm font-medium text-gray-800">Cash on Delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck className="w-5 h-5 text-purple-600" />
                          <span className="text-sm text-gray-600">Delivery Status:</span>
                          <span className="text-sm font-medium capitalize text-gray-800">{order.status?.toLowerCase()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <Eye className="w-4 h-4" />
                        Track Order
                      </button>
                      {order.status?.toLowerCase() === 'delivered' && (
                        <button className="flex items-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                          Write a Review
                        </button>
                      )}
                      {order.status?.toLowerCase() === 'processing' && (
                        <button className="flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}