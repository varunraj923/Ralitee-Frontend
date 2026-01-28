import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import Toast from "../Toast";
import { createAppTheme } from "../../constants/theme";
import { loginApi, registerApi } from "../../api/auth";
import { useDispatch } from "react-redux";
import { setAuthData } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

/* -------------------- Shared Styling -------------------- */
const InputStyling =
  "w-full pl-11 pr-12 py-3 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300";

const RequiredLabel = ({ text }) => (
  <label className="block text-sm font-semibold text-foreground mb-2.5">
    {text} <span className="text-red-500">*</span>
  </label>
);

/* -------------------- Component -------------------- */
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = createAppTheme("light");

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToastClose = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

        setTimeout(() => {
          role === "admin"
            ? navigate("/admin/dashboard", { replace: true })
            : navigate("/user/dashboard", { replace: true });
        }, 500);
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

        setIsLogin(true);
        setFormData({
          username: "",
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      setToast({
        open: true,
        message:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className="min-h-screen flex bg-background overflow-hidden">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-primary">Relitee</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Welcome back to your fresh produce store
              </p>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold mb-8">
              {isLogin ? "Sign in" : "Create account"}
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <>
                  <div>
                    <RequiredLabel text="Username" />
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        name="username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        className={InputStyling}
                      />
                    </div>
                  </div>

                  <div>
                    <RequiredLabel text="Full Name" />
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={InputStyling}
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <RequiredLabel text="Email Address" />
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={InputStyling}
                  />
                </div>
              </div>

              <div>
                <RequiredLabel text="Password" />
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={InputStyling}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot")}
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl hover:bg-blue-700 transition-all"
              >
                {loading ? (
                  <CircularProgress size={22} sx={{ color: "white" }} />
                ) : isLogin ? (
                  "Sign in"
                ) : (
                  "Create account"
                )}
              </button>
            </form>

            {/* Toggle */}
            <p className="text-center text-sm mt-8">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-600 font-semibold"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
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
