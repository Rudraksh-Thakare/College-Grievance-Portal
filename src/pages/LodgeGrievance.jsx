import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/useAuth";
import logo from "../assets/logo/logo.png";

const DEPARTMENTS = [
  "Academic Affairs", "Computer Science Dept.", "AIDS / AI-ML",
  "Civil Engineering", "Mechanical Engineering", "Electrical Engineering",
  "ENTC", "Robotics", "Hostel Administration", "Canteen Services",
  "Library", "Student Welfare", "Administration", "Finance & Accounts",
  "Sports & Co-curricular",
];

const CATEGORIES = [
  "Academic — Examination / Marks", "Academic — Attendance",
  "Hostel & Facilities", "Canteen & Food", "Library",
  "Staff Behaviour / Misconduct", "Infrastructure",
  "Financial / Fee Related", "Other",
];

function generateRefNo(dept) {
  // Extract initials from department name words (e.g. "Computer Science Dept." → "CSD")
  const words = dept.trim().split(/\s+/);
  const code  = words.map((w) => w[0]?.toUpperCase() || "").join("").slice(0, 3) || "GEN";
  const num   = Math.floor(1000 + Math.random() * 9000);
  return `REF/${new Date().getFullYear()}/${code}/${num}`;
}

function LodgeGrievance() {
  const navigate = useNavigate();
  const { currentUser, userProfile, logout } = useAuth();

  const [form, setForm] = useState({
    subject:     "",
    department:  "",
    category:    "",
    priority:    "Normal",
    description: "",
    anonymous:   false,
  });
  const [errors,    setErrors]    = useState({});
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refNo,     setRefNo]     = useState("");

  const validate = () => {
    const e = {};
    if (!form.subject.trim())      e.subject     = "Subject is required.";
    if (!form.department)          e.department  = "Select a department.";
    if (!form.category)            e.category    = "Select a category.";
    if (!form.description.trim() || form.description.trim().length < 30)
      e.description = "Description must be at least 30 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const ref = generateRefNo(form.department.toUpperCase());

      await addDoc(collection(db, "grievances"), {
        userId:      currentUser.uid,
        userEmail:   currentUser.email,
        studentName: form.anonymous ? "Anonymous" : (userProfile?.fullName || currentUser.email),
        studentId:   form.anonymous ? "—" : (userProfile?.studentId || "—"),
        refNo:       ref,
        subject:     form.subject,
        department:  form.department,
        category:    form.category,
        priority:    form.priority,
        description: form.description,
        anonymous:   form.anonymous,
        status:      "In Review",
        createdAt:   serverTimestamp(),
        timeline: [
          { step: "Grievance Filed",        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), done: true },
          { step: "Acknowledged by Office", date: "",  done: false },
          { step: "Assigned to Department", date: "",  done: false },
          { step: "Under Investigation",    date: "",  done: false },
          { step: "Resolved",               date: "",  done: false },
        ],
        remarks: "",
      });

      setRefNo(ref);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting grievance:", err);
      alert("Failed to submit grievance. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => { await logout(); navigate("/"); };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
        <div className="bg-white shadow-lg border border-gray-200 rounded-sm max-w-lg w-full overflow-hidden">
          <div className="bg-[#8b111c] text-white px-8 py-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✔</div>
            <h2 className="text-2xl font-bold font-serif">Grievance Submitted!</h2>
            <p className="text-sm mt-1 opacity-80">Your complaint has been registered successfully.</p>
          </div>
          <div className="px-8 py-6 text-center">
            <p className="text-gray-600 text-sm mb-3">Your reference number is:</p>
            <div className="bg-gray-100 border border-gray-300 px-6 py-3 font-bold font-mono text-[#8b111c] text-lg tracking-widest inline-block rounded-sm">
              {refNo}
            </div>
            <p className="text-xs text-gray-500 mt-4 leading-6">
              Save this reference number. Use it on the Track page to follow your grievance status anytime.
            </p>
            <div className="flex gap-3 justify-center mt-6">
              <button onClick={() => navigate("/dashboard")}
                className="bg-[#8b111c] text-white px-6 py-2 text-sm font-semibold hover:bg-[#6d0d16] transition">
                Go to Dashboard
              </button>
              <Link to="/track" state={{ refNo }}
                className="border border-[#8b111c] text-[#8b111c] px-6 py-2 text-sm font-semibold hover:bg-[#8b111c] hover:text-white transition">
                Track Status
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      {/* Top bar */}
      <div className="bg-[#7d0f17] text-white text-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2">
          <span>Office of the Registrar — Student Portal</span>
          <button onClick={() => navigate("/")} className="hover:underline">← Back to Home</button>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Logo" className="w-12 h-12" />
            <div>
              <p className="uppercase text-[11px] tracking-wide text-gray-500">College Grievance Redressal Portal</p>
              <h1 className="text-xl font-bold text-[#7d0f17] font-serif">Lodge a Grievance</h1>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/dashboard" className="border border-[#7d0f17] text-[#7d0f17] px-5 py-2 text-sm font-semibold hover:bg-[#7d0f17] hover:text-white transition">Dashboard</Link>
            <button onClick={handleLogout} className="bg-[#8b111c] text-white px-5 py-2 text-sm font-semibold hover:bg-[#6d0d16] transition">Logout</button>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-[#aa1622] shadow">
        <div className="max-w-7xl mx-auto">
          <ul className="flex items-center text-white text-[15px]">
            <li className="border-r border-red-800">
              <Link to="/dashboard" className="block px-8 py-3 hover:bg-[#7d0f17] transition">Dashboard</Link>
            </li>
            <li className="bg-[#7d0f17] border-r border-red-800">
              <span className="block px-8 py-3 font-semibold cursor-default">Lodge Grievance</span>
            </li>
            <li className="border-r border-red-800">
              <Link to="/track" className="block px-8 py-3 hover:bg-[#7d0f17] transition">Track Status</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="block px-8 py-3 hover:bg-[#7d0f17] transition">Logout</button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-[#f0e8e8] border-b border-[#ddd]">
        <div className="max-w-7xl mx-auto px-6 py-2 text-xs text-gray-600">
          <Link to="/" className="hover:underline text-[#8b111c]">Home</Link>
          <span className="mx-2">›</span>
          <Link to="/dashboard" className="hover:underline text-[#8b111c]">Dashboard</Link>
          <span className="mx-2">›</span>
          <span className="font-semibold">Lodge Grievance</span>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="bg-white border border-gray-200 shadow-sm">
          <div className="bg-[#8b111c] text-white px-6 py-4">
            <p className="text-xs uppercase tracking-widest opacity-80">Official Complaint Form</p>
            <h2 className="text-2xl font-serif font-bold mt-0.5">Lodge a New Grievance</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Grievance Subject <span className="text-red-600">*</span>
              </label>
              <input type="text" placeholder="Brief title of your complaint"
                value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#8b1c24]" />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>

            {/* Department + Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Concerned Department <span className="text-red-600">*</span>
                </label>
                <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#8b1c24]">
                  <option value="">-- Select Department --</option>
                  {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                </select>
                {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Category <span className="text-red-600">*</span>
                </label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#8b1c24]">
                  <option value="">-- Select Category --</option>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Priority Level</label>
              <div className="flex gap-4">
                {["Normal", "Urgent", "Critical"].map((p) => (
                  <label key={p} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input type="radio" name="priority" value={p}
                      checked={form.priority === p} onChange={() => setForm({ ...form, priority: p })}
                      className="accent-[#8b1c24]" />
                    <span className={
                      p === "Critical" ? "text-red-600 font-semibold" :
                      p === "Urgent"   ? "text-yellow-600 font-semibold" : "text-gray-700"
                    }>{p}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Detailed Description <span className="text-red-600">*</span>
              </label>
              <textarea rows={6}
                placeholder="Describe your grievance in detail (minimum 30 characters). Include relevant dates, names, and facts."
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#8b1c24] resize-none" />
              <p className="text-xs text-gray-400 text-right mt-1">{form.description.length} chars</p>
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Anonymous */}
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.anonymous}
                onChange={(e) => setForm({ ...form, anonymous: e.target.checked })}
                className="accent-[#8b1c24] w-4 h-4" />
              <span className="text-gray-700">Submit anonymously (your name will not be disclosed to the department)</span>
            </label>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 px-4 py-3 text-xs text-yellow-800 rounded-sm">
              ⚠ By submitting this form, you confirm that the information provided is accurate. Filing a false grievance may lead to disciplinary action.
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button type="submit" disabled={loading}
                className="bg-[#8b111c] hover:bg-[#6d0d16] disabled:opacity-60 text-white px-8 py-3 text-sm font-semibold transition flex items-center gap-2">
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>Submitting…</>
                ) : "Submit Grievance"}
              </button>
              <button type="button" onClick={() => navigate("/dashboard")}
                className="border border-gray-400 text-gray-600 px-8 py-3 text-sm font-semibold hover:bg-gray-100 transition">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-[#870f18] text-white mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between text-gray-200 text-xs">
          <p>© 2026 College Grievance Redressal Portal. All Rights Reserved.</p>
          <p>Best viewed in Chrome, Firefox, Edge</p>
        </div>
      </footer>
    </div>
  );
}

export default LodgeGrievance;
