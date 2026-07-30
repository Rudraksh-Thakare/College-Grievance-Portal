import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const CAPTCHA_POOL = [
  "9T4XL", "7K3RB", "M2QW8", "P5JHD", "Z6NYF",
  "B8RTA", "K1VXP", "E4LZQ", "D7WCN", "G3SMU",
];

function generateCaptcha() {
  return CAPTCHA_POOL[Math.floor(Math.random() * CAPTCHA_POOL.length)];
}

const RegistrationForm = () => {
  const navigate  = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName:        "",
    studentId:       "",
    email:           "",
    department:      "Computer Science",
    year:            "1st Year",
    password:        "",
    confirmPassword: "",
    captchaInput:    "",
    agreeTerms:      false,
  });

  const [captchaCode,  setCaptchaCode]  = useState(generateCaptcha());
  const [errors,       setErrors]       = useState({});
  const [firebaseError, setFirebaseError] = useState("");
  const [showPass,     setShowPass]     = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);
  const [loading,      setLoading]      = useState(false);

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setForm((f) => ({ ...f, captchaInput: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim())       e.fullName       = "Full name is required.";
    if (!form.studentId.trim())      e.studentId      = "Student ID is required.";
    if (!form.email.trim())          e.email          = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.password)              e.password       = "Password is required.";
    else if (form.password.length < 8) e.password     = "Password must be at least 8 characters.";
    if (!form.confirmPassword)       e.confirmPassword = "Please confirm your password.";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match.";
    if (!form.captchaInput.trim())   e.captcha        = "Please enter the CAPTCHA code.";
    else if (form.captchaInput.toUpperCase() !== captchaCode)
      e.captcha = "Incorrect CAPTCHA. Please refresh and try again.";
    if (!form.agreeTerms)            e.agreeTerms     = "You must agree to the Terms & Conditions.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFirebaseError("");
    if (!validate()) return;

    try {
      setLoading(true);
      await register({
        fullName:   form.fullName,
        studentId:  form.studentId,
        email:      form.email,
        department: form.department,
        year:       form.year,
        password:   form.password,
      });
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.code === "auth/email-already-in-use" ? "An account with this email already exists. Please login instead." :
        err.code === "auth/invalid-email"         ? "Invalid email address format." :
        err.code === "auth/weak-password"         ? "Password is too weak. Use at least 8 characters." :
        "Registration failed. Please try again.";
      setFirebaseError(msg);
    } finally {
      setLoading(false);
    }
  };

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div className="bg-white border border-gray-300 shadow-sm w-full">
      {/* Header */}
      <div className="bg-[#8b1c24] px-6 py-5 text-white">
        <p className="uppercase text-xs tracking-widest opacity-80">New Registration</p>
        <h2 className="text-3xl font-serif font-bold mt-1">Student Registration Form</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6">

        {/* Firebase error */}
        {firebaseError && (
          <div className="mb-5 bg-red-50 border border-red-300 text-red-700 text-xs px-4 py-3 rounded flex items-start gap-2">
            <span>❌</span>
            <span>{firebaseError}</span>
          </div>
        )}

        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-[14px]">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="As per college records"
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
              className="mt-2 w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b1c24]"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="font-semibold text-[14px]">
              Student ID <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 21CS1042"
              value={form.studentId}
              onChange={(e) => update("studentId", e.target.value)}
              className="mt-2 w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b1c24]"
            />
            {errors.studentId && <p className="text-red-500 text-xs mt-1">{errors.studentId}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="mt-5">
          <label className="font-semibold text-[14px]">
            College Email ID <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            placeholder="name@college.edu.in"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="mt-2 w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b1c24]"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Department + Year */}
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div>
            <label className="font-semibold text-[14px]">
              Department <span className="text-red-600">*</span>
            </label>
            <select
              value={form.department}
              onChange={(e) => update("department", e.target.value)}
              className="mt-2 w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#8b1c24]"
            >
              <option>Computer Science</option>
              <option>AIDS</option>
              <option>AI/ML</option>
              <option>Civil Engineering</option>
              <option>Mechanical Engineering</option>
              <option>Electrical Engineering</option>
              <option>ENTC</option>
              <option>Robotics</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-[14px]">
              Year of Study <span className="text-red-600">*</span>
            </label>
            <select
              value={form.year}
              onChange={(e) => update("year", e.target.value)}
              className="mt-2 w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-[#8b1c24]"
            >
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>
        </div>

        {/* Passwords */}
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div>
            <label className="font-semibold text-[14px]">
              Password <span className="text-red-600">*</span>
            </label>
            <div className="relative mt-2">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Minimum 8 characters"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b1c24] pr-14"
              />
              <button type="button" onClick={() => setShowPass((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700">
                {showPass ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="font-semibold text-[14px]">
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <div className="relative mt-2">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b1c24] pr-14"
              />
              <button type="button" onClick={() => setShowConfirm((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700">
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>

        {/* Captcha */}
        <div className="mt-6">
          <label className="block text-[14px] font-semibold mb-2">
            Enter Code Shown Below <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center gap-4">
            <div className="border border-gray-300 bg-gray-100 px-6 py-3 text-xl font-bold tracking-[8px] select-none text-[#8b1c24] font-mono">
              {captchaCode.split("").join(" ")}
            </div>
            <button type="button" onClick={refreshCaptcha} className="text-[#8b1c24] text-sm font-semibold hover:underline">
              ↻ Refresh
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter the code above"
            value={form.captchaInput}
            onChange={(e) => update("captchaInput", e.target.value)}
            className="mt-4 w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b1c24]"
          />
          {errors.captcha && <p className="text-red-500 text-xs mt-1">{errors.captcha}</p>}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 mt-6">
          <input
            type="checkbox"
            checked={form.agreeTerms}
            onChange={(e) => update("agreeTerms", e.target.checked)}
            className="mt-1 w-4 h-4 accent-[#8b1c24] cursor-pointer"
          />
          <p className="text-sm text-gray-600 leading-6">
            I agree to the{" "}
            <button type="button"
              onClick={() => alert("Terms & Conditions:\nAll information provided must be accurate. Misuse of the portal may result in disciplinary action.")}
              className="text-[#8b1c24] font-semibold hover:underline">
              Terms & Conditions
            </button>
            {" "}and{" "}
            <button type="button"
              onClick={() => alert("Privacy Policy:\nYour data is stored securely and used only for grievance resolution purposes.")}
              className="text-[#8b1c24] font-semibold hover:underline">
              Privacy Policy
            </button>.
          </p>
        </div>
        {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}

        {/* Register Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-[#8b1c24] hover:bg-[#74161d] disabled:opacity-60 disabled:cursor-not-allowed transition duration-300 text-white py-3 rounded-md font-semibold text-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Creating Account…
            </>
          ) : "Register Account"}
        </button>

        {/* Login link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button type="button" onClick={() => navigate("/login")}
              className="text-[#8b1c24] font-semibold hover:underline">
              Login Here
            </button>
          </p>
        </div>

        <div className="text-center px-6 py-4">
          <p className="text-xs text-gray-400 leading-relaxed">
            This is an official portal. Providing false information during registration may lead to disciplinary action.
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;