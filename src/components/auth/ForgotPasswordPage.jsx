import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock } from "lucide-react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import Toast from "../Toast";
import { createAppTheme } from "../../constants/theme";
import forgetpassword from "../../assets/images/forgetpassword2.png";
import { useNavigate } from "react-router-dom";
import { changePasswordApi } from "../../api/auth"; 

const InputStyling =
  "w-full pl-11 pr-15 py-3 border border-border rounded-xl bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300";

const RequiredLabel = ({ text }) => (
  <label className="block text-sm font-semibold text-foreground mb-2.5">
    {text} <span className="text-red-500">*</span>
  </label>
);

const KeyIcons = () => (
  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
);

const EyeIcons = ({ show, onToggle }) => {
  return (
    <button
      type="button"
      className="absolute right-6.5 top-1/2 -translate-y-1/2 text-muted-foreground"
      onClick={onToggle}
    >
      {show ? <EyeOff fontSize="small" /> : <Eye fontSize="small" />}
    </button>
  );
};

const ChangePasswordPage = () => {
  const theme = createAppTheme("light");

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = passwordData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setToast({
        open: true,
        message: "All fields are required",
        severity: "error",
      });
      return;
    }

    if (oldPassword === newPassword) {
      setToast({
        open: true,
        message: "New password should not be same as old password",
        severity: "error",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setToast({
        open: true,
        message: "New password and confirm password must match.",
        severity: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await changePasswordApi({
        oldPassword,
        newPassword,
      });

      setToast({
        open: true,
        message: response.data.message || "Password changed successfully",
        severity: "success",
      });

      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setToast({
        open: true,
        message:
          error.response?.data?.message || error.message || "Something went wrong",
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
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Relitee
                </h1>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Change Password
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter your current password and set a new one
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Old Password */}
              <div>
                <RequiredLabel text="Old Password" />
                <div className="relative">
                  <KeyIcons />
                  <input
                    type={showPassword.old ? "text" : "password"}
                    placeholder="Enter old password"
                    value={passwordData.oldPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        oldPassword: e.target.value,
                      })
                    }
                    required
                    className={InputStyling}
                  />
                  <EyeIcons
                    show={showPassword.old}
                    onToggle={() =>
                      setShowPassword({ ...showPassword, old: !showPassword.old })
                    }
                  />
                </div>
              </div>

              {/* New Password */}
              <div>
                <RequiredLabel text="New Password" />
                <div className="relative">
                  <KeyIcons />
                  <input
                    type={showPassword.new ? "text" : "password"}
                    placeholder="Enter new password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    required
                    className={InputStyling}
                  />
                  <EyeIcons
                    show={showPassword.new}
                    onToggle={() =>
                      setShowPassword({ ...showPassword, new: !showPassword.new })
                    }
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <RequiredLabel text="Confirm Password" />
                <div className="relative">
                  <KeyIcons />
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    className={InputStyling}
                  />
                  <EyeIcons
                    show={showPassword.confirm}
                    onToggle={() =>
                      setShowPassword({
                        ...showPassword,
                        confirm: !showPassword.confirm,
                      })
                    }
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
                  "Change Password"
                )}
              </button>
            </form>

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
              We’ll help you regain access to your account quickly and securely.
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

export default ChangePasswordPage;
