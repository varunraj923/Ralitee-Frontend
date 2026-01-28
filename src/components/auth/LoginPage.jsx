import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Toast from "../Toast"
import { createAppTheme } from "../../constants/theme"
import { loginApi, registerApi } from "../../api/auth"
import { useDispatch } from "react-redux";
import { setAuthData } from "../../redux/slices/authSlice"
import { useNavigate } from "react-router-dom";





const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" })
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  })
  const theme = createAppTheme("light")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleToastClose = () => {
    setToast({ ...toast, open: false })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
     if (isLogin) {
  const response = await loginApi({
    email: formData.email,
    password: formData.password,
  });

const role = response.data.user.role;

dispatch(
  setAuthData({
    token: response.data.token,
    role,
    user: response.data.user,
  })
);

// ✅ redirect based on role
if (role === "admin") {
  navigate("/admin/dashboard");
} else {
  navigate("/");
}


      } else {
        // Register API call
        const response = await registerApi({
          username: formData.username,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        })
        setToast({
          open: true,
          message: "Account created successfully! Please sign in.",
          severity: "success",
        })
        // Switch to login after successful registration
        setIsLogin(true)
        setFormData({
          username: "",
          name: "",
          email: "",
          password: "",
        })
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred"
      setToast({
        open: true,
        message: errorMessage,
        severity: "error",
      })
      console.error("Auth error:", error)
    } finally {
      setLoading(false)
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen flex bg-background overflow-hidden">
        {/* Left Side - Form Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 relative z-10">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-8 sm:mb-12 animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Relitee
                </h1>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Welcome back to your fresh produce store</p>
            </div>

            {/* Heading with gradient */}
            <div className="mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {isLogin ? "Sign in" : "Create account"}
              </h2>
              <p className="text-sm text-muted-foreground">{isLogin ? "Access your account" : "Join our community"}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {!isLogin && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-500" style={{ animationDelay: "0.1s" }}>
                  <label className="block text-sm font-semibold text-foreground mb-2.5">Username</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="johndoe123"
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
              )}

              {/* Name field (Sign Up only) */}
              {!isLogin && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                  <label className="block text-sm font-semibold text-foreground mb-2.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
              )}

              {/* Email field */}
              <div
                className="animate-in fade-in slide-in-from-top-2 duration-500"
                style={{ animationDelay: isLogin ? "0s" : "0.2s" }}
              >
                <label className="block text-sm font-semibold text-foreground mb-2.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password field */}
              <div
                className="animate-in fade-in slide-in-from-top-2 duration-500"
                style={{ animationDelay: isLogin ? "0.1s" : "0.3s" }}
              >
                <label className="block text-sm font-semibold text-foreground mb-2.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-11 py-3 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password (Login only) */}
              {isLogin && (
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-3.5 px-4 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 mt-8 sm:mt-10 text-base disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (isLogin ? "Signing in..." : "Creating account...") : (isLogin ? "Sign in" : "Create account")}
              </button>
            </form>

            {/* Toggle Auth Mode */}
            <p className="text-center text-sm text-muted-foreground mt-8 pt-6 border-t border-border">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>

        {/* Right Side - Beautiful Gradient Illustration Section (Hidden on mobile) */}
        <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-blue-50 to-primary/5 dark:from-primary/20 dark:via-slate-900 dark:to-primary/10"></div>

          {/* Animated gradient blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-8">
            {/* Shopping illustration container */}
            <div className="mb-8 relative">
              <div className="w-40 h-40 rounded-3xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl animate-float">
                {/* Shopping cart with gradient */}
                <svg className="w-28 h-28 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m10 0a2 2 0 100 4 2 2 0 000-4m0 0l1.9-11h3.6"
                  />
                </svg>

                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 bg-primary rounded-full w-14 h-14 flex items-center justify-center text-white font-bold shadow-lg animate-bounce">
                  <span className="text-xl">✓</span>
                </div>
              </div>
            </div>

            {/* Text content */}
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Fresh & Organic</h3>
            <p className="text-muted-foreground max-w-sm text-base leading-relaxed mb-8">
              Quality produce delivered fresh to your doorstep. Shop from trusted farms and support sustainable
              agriculture.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 w-full mt-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">500k+</div>
                <div className="text-xs text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                <div className="text-xs text-muted-foreground">Fast Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">100%</div>
                <div className="text-xs text-muted-foreground">Organic</div>
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
  )
}

export default LoginPage