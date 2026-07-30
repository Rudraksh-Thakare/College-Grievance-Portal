import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/useAuth";
import logo from "../assets/logo/logo.png";

function TrackGrievance() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { currentUser, userProfile, logout } = useAuth();

  const [refInput, setRefInput] = useState(location.state?.refNo || "");
  const [result,   setResult]   = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading,  setLoading]  = useState(false);

  // Auto-search if coming from Dashboard "View Details" or Lodge success
  useEffect(() => {
    if (location.state?.refNo) handleSearch(null, location.state.refNo);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e, overrideRef) => {
    if (e) e.preventDefault();
    const searchRef = (overrideRef || refInput).trim();
    if (!searchRef) return;

    try {
      setLoading(true);
      setNotFound(false);
      setResult(null);

      const q    = query(collection(db, "grievances"), where("refNo", "==", searchRef));
      const snap = await getDocs(q);

      if (snap.empty) {
        setNotFound(true);
      } else {
        const data = { id: snap.docs[0].id, ...snap.docs[0].data() };
        setResult(data);
      }
    } catch (err) {
      console.error("Search error:", err);
      alert("Failed to search. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => { await logout(); navigate("/"); };

  const statusColor = (status) => {
    if (status === "Resolved")  return "bg-green-100 text-green-700";
    if (status === "In Review") return "bg-yellow-100 text-yellow-700";
    if (status === "Escalated") return "bg-red-100 text-red-700";
    return "bg-blue-100 text-blue-700";
  };

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
              <h1 className="text-xl font-bold text-[#7d0f17] font-serif">Track Grievance Status</h1>
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
            <li className="border-r border-red-800">
              <Link to="/lodge-grievance" className="block px-8 py-3 hover:bg-[#7d0f17] transition">Lodge Grievance</Link>
            </li>
            <li className="bg-[#7d0f17] border-r border-red-800">
              <span className="block px-8 py-3 font-semibold cursor-default">Track Status</span>
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
          <span className="font-semibold">Track Grievance</span>
        </div>
      </div>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-8">
        {/* Search */}
        <div className="bg-white border border-gray-200 shadow-sm mb-6">
          <div className="bg-[#8b111c] text-white px-6 py-4">
            <p className="text-xs uppercase tracking-widest opacity-80">Reference Lookup — Firestore</p>
            <h2 className="text-xl font-serif font-bold">Track Your Grievance</h2>
          </div>
          <form onSubmit={handleSearch} className="p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Enter Grievance Reference Number <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-3">
              <input type="text" value={refInput}
                onChange={(e) => setRefInput(e.target.value)}
                placeholder="e.g. REF/2026/CSE/1042"
                className="flex-1 border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-[#8b1c24] font-mono" />
              <button type="submit" disabled={loading}
                className="bg-[#8b111c] hover:bg-[#6d0d16] disabled:opacity-60 text-white px-8 py-2.5 text-sm font-semibold transition flex items-center gap-2">
                {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : null}
                {loading ? "Searching…" : "Search"}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              💡 Enter the reference number received after lodging your grievance.
            </p>
          </form>
        </div>

        {/* Not found */}
        {notFound && (
          <div className="bg-red-50 border border-red-200 px-6 py-4 text-sm text-red-700 rounded-sm mb-6">
            ❌ No grievance found with reference number <strong className="font-mono">{refInput}</strong>. Please check and try again.
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white border border-gray-200 shadow-sm">
            <div className="bg-gray-50 border-b px-6 py-4 flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-400 font-mono">{result.refNo}</p>
                <h3 className="font-bold text-lg text-gray-800 mt-0.5">{result.subject}</h3>
                {result.anonymous && (
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Anonymous Submission</span>
                )}
              </div>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold shrink-0 ${statusColor(result.status)}`}>
                {result.status}
              </span>
            </div>

            <div className="px-6 py-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm border-b">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Department</p>
                <p className="font-semibold text-gray-700 mt-0.5">{result.department}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Category</p>
                <p className="font-semibold text-gray-700 mt-0.5">{result.category}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Priority</p>
                <p className={`font-semibold mt-0.5 ${
                  result.priority === "Critical" ? "text-red-600" :
                  result.priority === "Urgent"   ? "text-yellow-600" : "text-gray-700"
                }`}>{result.priority}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Filed On</p>
                <p className="font-semibold text-gray-700 mt-0.5">
                  {result.createdAt?.toDate
                    ? result.createdAt.toDate().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                    : "—"}
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="px-6 py-5">
              <h4 className="font-bold text-sm text-gray-700 mb-4 uppercase tracking-wide">Resolution Timeline</h4>
              <div className="space-y-3">
                {(result.timeline || []).map((t, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold
                      ${t.done ? "bg-[#8b111c] text-white" : "bg-gray-200 text-gray-400"}`}>
                      {t.done ? "✓" : "○"}
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <span className={`text-sm ${t.done ? "text-gray-800 font-medium" : "text-gray-400"}`}>{t.step}</span>
                      <span className="text-xs text-gray-400">{t.date || "—"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Remarks */}
            {result.remarks && (
              <div className="mx-6 mb-4 bg-blue-50 border border-blue-200 px-4 py-3 rounded-sm text-xs text-blue-800">
                <span className="font-bold">Official Remarks: </span>{result.remarks}
              </div>
            )}

            {/* Description */}
            <div className="mx-6 mb-6 bg-gray-50 border border-gray-200 px-4 py-3 rounded-sm text-xs text-gray-700">
              <p className="font-bold mb-1 text-gray-600 uppercase tracking-wide">Your Description</p>
              <p className="leading-5">{result.description}</p>
            </div>

            <div className="border-t px-6 py-4 flex gap-3">
              <Link to="/lodge-grievance"
                className="bg-[#8b111c] text-white px-5 py-2 text-xs font-semibold hover:bg-[#6d0d16] transition">
                + Lodge New Grievance
              </Link>
              <Link to="/dashboard"
                className="border border-gray-300 text-gray-600 px-5 py-2 text-xs font-semibold hover:bg-gray-100 transition">
                Back to Dashboard
              </Link>
            </div>
          </div>
        )}
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

export default TrackGrievance;
