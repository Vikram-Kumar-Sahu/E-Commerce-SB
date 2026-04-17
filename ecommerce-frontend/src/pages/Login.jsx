import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Mail, Lock, Eye, EyeOff, LogIn, ShoppingBag } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      console.log(res.data);
      
      // Store token if remember me is checked
      if (rememberMe && res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      
      alert("Login Successful!");
      navigate("/"); // Redirect to home page after login
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login Failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    
    <div className="w-full max-w-md">
      
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome Back
        </h2>
        <p className="text-gray-500 mt-1">
          Login to continue shopping
        </p>
      </div>

      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="
                  w-full pl-10 pr-3 py-2.5
                  border rounded-lg
                  focus:ring-2 focus:ring-purple-500
                  outline-none transition
                "
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="
                  w-full pl-10 pr-10 py-2.5
                  border rounded-lg
                  focus:ring-2 focus:ring-purple-500
                  outline-none transition
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-purple-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-purple-600 text-white
              py-2.5 rounded-lg font-semibold
              hover:bg-purple-700
              transition
              flex items-center justify-center gap-2
            "
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                <LogIn size={18} />
                Login
              </>
            )}
          </button>

          {/* Divider */}
          <div className="text-center text-sm text-gray-500">
            Don’t have an account?
            <Link
              to="/register"
              className="text-purple-600 font-medium ml-1 hover:underline"
            >
              Sign up
            </Link>
          </div>

        </form>
      </div>
    </div>
  </div>
);
}