import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const CAPTCHA_POOL = [
  "7K3RB", "9T4XL", "M2QW8", "P5JHD", "Z6NYF",
  "B8RTA", "K1VXP", "E4LZQ", "D7WCN", "G3SMU",
];

function generateCaptcha() {
  return CAPTCHA_POOL[Math.floor(Math.random() * CAPTCHA_POOL.length)];
}

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [activeTab,    setActiveTab]    = useState("student");
  const [email,        setEmail]        = useState("");
  const [password,     setPassword]     = useState("");
  const [captchaCode,  setCaptchaCode]  = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [rememberMe,   setRememberMe]   = useState(false);
  const [errors,       setErrors]       = useState({});
  const [loginError,   setLoginError]   = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading,      setLoading]      = useState(false);

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setCaptchaInput("");
  };

  const validate = () => {
    const e = {};
    if (!email.trim())         e.email    = "Email is required.";
    if (!password)             e.password = "Password is required.";
    if (!captchaInput.trim())  e.captcha  = "Please enter the CAPTCHA code.";
    else if (captchaInput.toUpperCase() !== captchaCode)
      e.captcha = "Incorrect CAPTCHA. Please try again.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    if (!validate()) return;

    try {
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.code === "auth/user-not-found"    ? "No account found with this email." :
        err.code === "auth/wrong-password"    ? "Incorrect password. Please try again." :
        err.code === "auth/invalid-email"     ? "Invalid email address." :
        err.code === "auth/invalid-credential"? "Invalid email or password." :
        err.code === "auth/too-many-requests" ? "Too many failed attempts. Please try again later." :
        "Login failed. Please check your credentials.";
      setLoginError(msg);
      refreshCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Password reset link will be sent to your registered college email.\nPlease contact the IT helpdesk if you don't receive it.");
  };

  const tabs = [
    { id: "student", label: "Student" },
    { id: "staff",   label: "Dept. Staff" },
    { id: "admin",   label: "Admin" },
  ];

  return (
    <div className="bg-white border border-gray-300">
      {/* Maroon header */}
      <div className="bg-[#8b1c24] px-6 py-4 text-white">
        <p className="text-xs uppercase tracking-widest opacity-80">Secure Login</p>
        <h2 className="text-2xl font-serif font-bold mt-0.5">Sign In to Continue</h2>
      </div>

      <div className="px-6 py-6 space-y-5">

        {/* Tabs */}
        <div className="flex border border-gray-300 rounded overflow-hidden text-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setErrors({});
                setLoginError("");
                setEmail("");
                setPassword("");
                refreshCaptcha();
              }}
              className={`flex-1 py-2 font-semibold transition ${
                activeTab === tab.id
                  ? "bg-[#8b1c24] text-white"
                  : "text-gray-700 border-l border-gray-300 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Global login error */}
          {loginError && (
            <div className="bg-red-50 border border-red-300 text-red-700 text-xs px-4 py-3 rounded flex items-start gap-2">
              <span>❌</span>
              <span>{loginError}</span>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              {activeTab === "student" ? "College Email ID" : "Official Email ID"}{" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@college.edu.in"
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#8b1c24]"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#8b1c24] pr-16"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Captcha */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Enter Code Shown Below <span className="text-red-600">*</span>
            </label>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gray-100 border border-gray-300 px-5 py-2 font-bold tracking-[4px] text-[#8b1c24] text-sm select-none font-mono">
                {captchaCode.split("").join(" ")}
              </div>
              <button
                type="button"
                onClick={refreshCaptcha}
                className="text-sm text-[#8b1c24] font-semibold flex items-center gap-1 hover:underline"
              >
                ↻ Refresh
              </button>
            </div>
            <input
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              placeholder="Enter the code above"
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#8b1c24]"
            />
            {errors.captcha && <p className="text-red-500 text-xs mt-1">{errors.captcha}</p>}
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#8b1c24]"
              />
              Keep me signed in
            </label>
            <button type="button" onClick={handleForgotPassword} className="text-[#8b1c24] font-semibold hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8b1c24] hover:bg-[#72151c] disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 font-semibold text-sm transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Signing In…
              </>
            ) : "Login to Portal"}
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-gray-700">
          New student?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-[#8b1c24] font-semibold hover:underline"
          >
            Register here
          </button>
        </p>
      </div>

      {/* Footer note */}
      <div className="border-t border-gray-200 px-6 py-4 text-center">
        <p className="text-xs text-gray-500">
          This is an official portal. Unauthorized access is a punishable offence under the institute's IT policy.
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
