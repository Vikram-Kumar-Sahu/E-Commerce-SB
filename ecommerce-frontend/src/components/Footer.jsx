import { Link } from "react-router-dom";
import { ShoppingBag, Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* BRAND */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <ShoppingBag className="w-6 h-6 text-purple-400" />
              <span className="text-white font-bold text-lg">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Shopie
                </span>
                <span>Shop</span>
              </span>
            </div>

            <p className="text-sm text-gray-400">
              Your one-stop shop for trendy fashion and lifestyle products.
            </p>

            {/* SOCIALS */}
            <div className="flex space-x-4 mt-4 text-lg">
              <a href="#" className="hover:text-purple-400">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-purple-400">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-purple-400">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/orders">Orders</Link>
            </div>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/#">Contact</Link>
              <Link to="#">FAQs</Link>
              <Link to="#">Privacy</Link>
              <Link to="#">Terms</Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <div className="flex flex-col space-y-3 text-sm text-gray-400">

              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>support@shopieshop.com</span>
              </div>

              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Kolkata, India</span>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
          © {currentYear} ShopieShop. All rights reserved.
        </div>

      </div>
    </footer>
  );
}