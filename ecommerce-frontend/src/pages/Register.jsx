import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/register", form);
      console.log("REGISTER RESPONSE:", res.data);

      alert("Registration successful ✅");
      navigate("/login"); // redirect to login after success
    } catch (err) {
      console.error(err);
      alert("Registration failed ❌");
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
            Create Account
          </h2>
          <p className="text-gray-500 mt-1">
            Sign up to get started
          </p>
        </div>

        {/* Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
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
                  placeholder="Create a password"
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

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full bg-purple-600 text-white
                py-2.5 rounded-lg font-semibold
                hover:bg-purple-700
                transition
                disabled:opacity-70
              "
            >
              {loading ? "Creating account..." : "Register"}
            </button>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500">
              Already have an account?
              <Link
                to="/login"
                className="text-purple-600 font-medium ml-1 hover:underline"
              >
                Login
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}