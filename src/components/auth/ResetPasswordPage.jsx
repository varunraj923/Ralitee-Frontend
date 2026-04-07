import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import Toast from "../Toast";
import { createAppTheme } from "../../constants/theme";
import forgetpassword from "../../assets/images/forgetpassword2.png";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordApi } from "../../api/auth";

const InputStyling =
    "w-full pl-11 pr-15 py-3 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent transition-all duration-300";

const RequiredLabel = ({ text }) => (
    <label className="block text-sm font-semibold text-[#3e2723] mb-2.5">
        {text} <span className="text-[#8B0000]">*</span>
    </label>
);

const KeyIcons = () => (
    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
);

const EyeIcons = ({ show, onToggle }) => (
    <button
        type="button"
        className="absolute right-6.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
        onClick={onToggle}
    >
        {show ? <EyeOff fontSize="small" /> : <Eye fontSize="small" />}
    </button>
);

const ResetPasswordPage = () => {
    const theme = createAppTheme("light");
    const { token } = useParams();
    const navigate = useNavigate();

    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState({
        new: false,
        confirm: false,
    });

    const [loading, setLoading] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);

    const [toast, setToast] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        const { newPassword, confirmPassword } = passwordData;

        if (!newPassword || !confirmPassword) {
            setToast({
                open: true,
                message: "All fields are required",
                severity: "error",
            });
            return;
        }

        if (newPassword.length < 6) {
            setToast({
                open: true,
                message: "Password must be at least 6 characters",
                severity: "error",
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            setToast({
                open: true,
                message: "Passwords do not match",
                severity: "error",
            });
            return;
        }

        setLoading(true);

        try {
            const response = await resetPasswordApi(token, {
                password: newPassword,
            });

            setToast({
                open: true,
                message: response.data.message || "Password reset successfully!",
                severity: "success",
            });

            setResetSuccess(true);
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

            <div className="min-h-screen flex flex-col lg:flex-row bg-[#f5f0e1] overflow-hidden">
                {/* Left Side (Form) */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10 bg-[#f5f0e1]">
                    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl shadow-[#cd9141]/20">
                        {/* Logo */}
                        <div className="mb-10 text-center flex flex-col items-center">
                            <div className="flex items-center gap-2 mb-2">
                                <h1 className="text-3xl font-extrabold text-[#8B0000] tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
                                    Ralitee
                                </h1>
                            </div>
                        </div>

                        {!resetSuccess ? (
                            <>
                                {/* Heading */}
                                <div className="mb-8 text-center">
                                    <h2 className="text-2xl font-bold text-[#3e2723] mb-2">
                                        Create New Password
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Enter your new password below. Make sure it's strong and
                                        memorable.
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">
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
                                                    setShowPassword({
                                                        ...showPassword,
                                                        new: !showPassword.new,
                                                    })
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
                                        className="w-full bg-[#8B0000] text-white font-bold py-3.5 rounded-xl hover:bg-[#5a0000] active:scale-[0.98] transition-all shadow-md mt-4 disabled:opacity-70"
                                    >
                                        {loading ? (
                                            <CircularProgress size={24} sx={{ color: "white" }} />
                                        ) : (
                                            "Reset Password"
                                        )}
                                    </button>
                                </form>
                            </>
                        ) : (
                            /* Success State */
                            <div className="text-center py-8">
                                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                                    <ShieldCheck className="w-8 h-8 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-[#3e2723] mb-3">
                                    Password Reset!
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Your password has been changed successfully. You can now log in
                                    with your new password.
                                </p>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="w-full bg-[#8B0000] text-white font-bold py-3.5 rounded-xl hover:bg-[#5a0000] transition shadow-md"
                                >
                                    Go to Login
                                </button>
                            </div>
                        )}

                        {/* Back to login */}
                        <div className="mt-8 text-center pt-6 border-t border-gray-100">
                            <button
                                onClick={() => navigate("/login")}
                                className="inline-flex items-center gap-2 text-sm font-bold text-[#c08d4b] hover:text-[#a0743b] transition-colors"
                            >
                                <ArrowLeft size={16} />
                                Back to Sign In
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side (Image - Updated Background) */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10 order-2 lg:order-none mt-10 lg:mt-0 bg-[#f5f0e1]">
                    <div className="w-full max-w-md">
                        <img
                            src={forgetpassword}
                            alt="Reset Password Illustration"
                            className="max-w-full object-contain animate-float drop-shadow-2xl"
                        />
                        <p className="mt-6 text-gray-600 text-center font-medium">
                            Almost there! Set a strong new password for your account.
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

export default ResetPasswordPage;
