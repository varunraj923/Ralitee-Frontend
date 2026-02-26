import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData } from "../../redux/slices/authSlice";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Toast from "../Toast";
import { createAppTheme } from "../../constants/theme";
import { loginApi, registerApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";



/* -------------------- Shared Styling -------------------- */
const InputStyling =
  "w-full pl-11 pr-12 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all duration-300";

const RequiredLabel = ({ text }) => (
  <label className="block text-sm font-semibold text-[#3e2723] mb-2.5">
    {text} <span className="text-[#8B0000]">*</span>
  </label>
);

/* -------------------- Component -------------------- */
const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, role, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only redirect if we have a complete auth state (token, role, AND user)
    if (token && role && user) {
      if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/user/dashboard", { replace: true });
      }
    }
  }, [token, role, user, navigate]);
  const theme = createAppTheme("light");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //this prevent from multiple api calls
    if (loading) return;
    setLoading(true);

    try {
      if (isLogin) {
        const response = await loginApi({
          email: formData.email,
          password: formData.password,
        });

        const { token, user } = response.data;
        const role = user.role;

        dispatch(setAuthData({ token, role, user }));

        setToast({
          open: true,
          message: "Login successful!",
          severity: "success",
        });

        // Navigation is handled by the useEffect above when token/role updates

      } else {
        await registerApi({
          username: formData.username,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        setToast({
          open: true,
          message: "Account created successfully! Please sign in.",
          severity: "success",
        });
        // Switch to login after successful registration
        setIsLogin(true);
        setFormData({
          username: "",
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      setToast({
        open: true,
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
        severity: "error",
      });
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Main Container - Beige Background */}
      <div className="min-h-screen flex bg-[#f5f0e1] overflow-hidden">

        {/* LEFT SIDE - Forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-[#f5f0e1] z-10">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl shadow-[#cd9141]/20">
            {/* Logo */}
            <div className="mb-8 sm:mb-10 text-center flex flex-col items-center">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#8B0000] tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Ralitee
                </h1>
              </Box>
              <p className="text-sm font-medium text-[#c08d4b]">
                Welcome back to your fresh produce store
              </p>
            </div>

            {/* Heading */}
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-[#3e2723] mb-1">
                {isLogin ? "Sign in" : "Create account"}
              </h2>
              <p className="text-sm text-gray-500">
                {isLogin ? "Access your account to continue" : "Join our community today"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div
                  className="animate-in fade-in slide-in-from-top-2 duration-500"
                  style={{ animationDelay: "0.1s" }}
                >
                  <RequiredLabel text="Username" />
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="johndoe123"
                      className={InputStyling}
                    />
                  </div>
                </div>
              )}

              {/* Name field (Sign Up only) */}
              {!isLogin && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                  <RequiredLabel text="Full Name" />
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={InputStyling}
                    />
                  </div>
                </div>
              )}

              {/* Email field */}
              <div
                className="animate-in fade-in slide-in-from-top-2 duration-500"
                style={{ animationDelay: isLogin ? "0s" : "0.2s" }}
              >
                <RequiredLabel text="Email Address" />
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={InputStyling}
                  />
                </div>
              </div>

              {/* Password field */}
              <div
                className="animate-in fade-in slide-in-from-top-2 duration-500"
                style={{ animationDelay: isLogin ? "0.1s" : "0.3s" }}
              >
                <RequiredLabel text=" Password" />
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={InputStyling}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot")}
                    className="text-sm font-semibold text-[#8B0000] hover:text-[#5a0000] transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8B0000] text-white font-bold py-3.5 rounded-xl hover:bg-[#5a0000] active:scale-[0.98] transition-all shadow-md mt-4"
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Toggle Auth Mode */}
            <p className="text-center text-sm text-gray-600 mt-6 pt-6 border-t border-gray-100">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-[#c08d4b] font-bold hover:underline"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - Beautiful Warm Theme Illustration Section (Hidden on mobile) */}
        <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center bg-[#cd9141]">
          {/* Base gradient layer mimicking spices/sunsets */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#cd9141] via-[#8B0000]/80 to-[#5a1820]"></div>

          {/* Animated decorative blobs */}
          <div className="absolute top-10 right-10 w-96 h-96 bg-[#ffdb58]/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 left-10 w-80 h-80 bg-[#f5f0e1]/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/4 w-72 h-72 bg-[#5a1820]/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-10">
            {/* Visual Icon */}
            <div className="mb-10 relative">
              <div className="w-48 h-48 rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center transform rotate-3 animate-float transition-all hover:rotate-0">
                <div className="relative">
                  <span className="text-7xl">🌾</span>
                  <div className="absolute -bottom-4 -right-4 bg-[#f5f0e1] rounded-full w-14 h-14 flex items-center justify-center shadow-lg border-4 border-[#8B0000]">
                    <span className="text-[#8B0000] font-bold text-xl">✓</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text content */}
            <h3 className="text-4xl sm:text-5xl font-extrabold text-[#f5f0e1] mb-6 drop-shadow-md" style={{ fontFamily: "'Georgia', serif" }}>
              Pure & Authentic
            </h3>
            <p className="text-[#f5f0e1]/90 max-w-md text-lg leading-relaxed mb-10 font-medium drop-shadow">
              Experience the true taste of tradition with our hand-picked, organic produce delivered straight from the farms to your kitchen.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-lg mt-4 pt-8 border-t border-white/20">
              <div className="text-center group">
                <div className="text-3xl font-black text-white mb-1 group-hover:scale-110 transition-transform">100%</div>
                <div className="text-sm font-semibold text-[#f5f0e1]/80 uppercase tracking-wider">Organic</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-black text-white mb-1 group-hover:scale-110 transition-transform">24h</div>
                <div className="text-sm font-semibold text-[#f5f0e1]/80 uppercase tracking-wider">Fresh Delivery</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl font-black text-white mb-1 group-hover:scale-110 transition-transform">50k+</div>
                <div className="text-sm font-semibold text-[#f5f0e1]/80 uppercase tracking-wider">Happy Homes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleToastClose}
      />
    </ThemeProvider>
  );
};

export default LoginPage;
