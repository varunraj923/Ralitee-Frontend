import { useState } from "react";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import Toast from "../Toast";
import { createAppTheme } from "../../constants/theme";
import forgetpassword from "../../assets/images/forgetpassword2.png";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../../api/auth";

const InputStyling =
  "w-full pl-11 pr-4 py-3 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300";

const ForgotPasswordPage = () => {
  const theme = createAppTheme("light");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!email) {
      setToast({
        open: true,
        message: "Email is required",
        severity: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await forgotPasswordApi({ email });
      setToast({
        open: true,
        message: response.data.message || "Reset link sent!",
        severity: "success",
      });
      setEmailSent(true);
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

      <div className="min-h-screen flex flex-col lg:flex-row bg-background overflow-hidden">
        {/* Left Side (Form) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-primary">Relitee</h1>
            </div>

            {!emailSent ? (
              <>
                {/* Heading */}
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    Forgot Password?
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Enter your email address and we'll send you a link to reset
                    your password.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2.5">
                      Email Address{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={InputStyling}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl hover:bg-blue-700 transition disabled:opacity-70"
                  >
                    {loading ? (
                      <CircularProgress size={24} sx={{ color: "white" }} />
                    ) : (
                      "Send Reset Link"
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Check Your Email
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We've sent a password reset link to{" "}
                  <strong className="text-foreground">{email}</strong>. Click
                  the link in the email to create a new password.
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  The link will expire in 15 minutes. If you don't see the
                  email, check your spam folder.
                </p>
                <button
                  onClick={() => {
                    setEmailSent(false);
                    setEmail("");
                  }}
                  className="text-sm font-semibold text-primary hover:text-primary/80 underline"
                >
                  Didn't receive it? Try again
                </button>
              </div>
            )}

            {/* Back to login */}
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
              >
                <ArrowLeft size={16} />
                Back to Sign in
              </button>
            </div>
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10 order-2 lg:order-none mt-10 lg:mt-0">
          <div className="w-full max-w-md">
            <img
              src={forgetpassword}
              alt="Forgot Password Illustration"
              className="max-w-full object-contain animate-float"
            />
            <p className="mt-6 text-muted-foreground text-center">
              We'll help you regain access to your account quickly and securely.
            </p>
          </div>
        </div>
      </div>

      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </ThemeProvider>
  );
};

export default ForgotPasswordPage;
