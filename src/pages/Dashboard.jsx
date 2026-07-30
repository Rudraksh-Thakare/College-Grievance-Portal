import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/useAuth";
import logo from "../assets/logo/logo.png";

function Dashboard() {
  const navigate             = useNavigate();
  const { currentUser, userProfile, logout } = useAuth();
  const [grievances, setGrievances] = useState([]);
  const [loading,    setLoading]    = useState(true);

  // Real-time listener for this user's grievances
  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "grievances"),
      where("userId", "==", currentUser.uid)
      // Note: orderBy("createdAt") requires a Firestore composite index.
      // We sort client-side instead to avoid index setup.
    );
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      // Sort client-side: newest first
      docs.sort((a, b) => {
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      });
      setGrievances(docs);
      setLoading(false);
    }, (err) => {
      console.error("Firestore error:", err);
      setLoading(false);
    });
    return unsub;
  }, [currentUser]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const statusColor = (status) => {
    if (status === "Resolved")  return "bg-green-100 text-green-700";
    if (status === "In Review") return "bg-yellow-100 text-yellow-700";
    if (status === "Escalated") return "bg-red-100 text-red-700";
    return "bg-blue-100 text-blue-700";
  };

  const counts = {
    total:    grievances.length,
    review:   grievances.filter((g) => g.status === "In Review").length,
    resolved: grievances.filter((g) => g.status === "Resolved").length,
    escalated: grievances.filter((g) => g.status === "Escalated").length,
  };

  const displayName = userProfile?.fullName || currentUser?.email || "Student";

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
              <h1 className="text-xl font-bold text-[#7d0f17] font-serif">Student Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right text-sm">
              <p className="font-semibold text-gray-800">Welcome, {displayName.split(" ")[0]}</p>
              <p className="text-gray-500 text-xs">{userProfile?.studentId || currentUser?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-[#8b111c] text-white px-5 py-2 text-sm font-semibold hover:bg-[#6d0d16] transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-[#aa1622] shadow">
        <div className="max-w-7xl mx-auto">
          <ul className="flex items-center text-white text-[15px]">
            <li className="bg-[#7d0f17] border-r border-red-800">
              <span className="block px-8 py-3 font-semibold cursor-default">Dashboard</span>
            </li>
            <li className="border-r border-red-800">
              <Link to="/lodge-grievance" className="block px-8 py-3 hover:bg-[#7d0f17] transition">Lodge Grievance</Link>
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
          <span className="font-semibold">Dashboard</span>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Grievances", value: counts.total,    color: "border-blue-400",   text: "text-blue-700" },
            { label: "In Review",        value: counts.review,   color: "border-yellow-400", text: "text-yellow-700" },
            { label: "Resolved",         value: counts.resolved, color: "border-green-400",  text: "text-green-700" },
            { label: "Escalated",        value: counts.escalated,color: "border-red-400",    text: "text-red-700" },
          ].map((stat, i) => (
            <div key={i} className={`bg-white border-l-4 ${stat.color} rounded shadow p-5`}>
              <p className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</p>
              <p className={`text-3xl font-bold mt-1 ${stat.text}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <Link to="/lodge-grievance"
            className="bg-[#8b111c] text-white px-6 py-3 text-sm font-semibold hover:bg-[#6d0d16] transition rounded-sm">
            + Lodge New Grievance
          </Link>
          <Link to="/track"
            className="border border-[#8b111c] text-[#8b111c] px-6 py-3 text-sm font-semibold hover:bg-[#8b111c] hover:text-white transition rounded-sm">
            Track by Reference No.
          </Link>
        </div>

        {/* Grievance Table */}
        <div className="bg-white shadow border border-gray-200 rounded-sm overflow-hidden">
          <div className="bg-[#8b111c] text-white px-6 py-4 flex justify-between items-center">
            <h2 className="font-bold text-lg">My Grievances</h2>
            <span className="text-xs opacity-70">Live • Firestore</span>
          </div>

          {loading ? (
            <div className="py-16 text-center text-gray-400">
              <div className="w-8 h-8 border-2 border-[#8b111c] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p>Loading your grievances…</p>
            </div>
          ) : grievances.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <p className="text-4xl mb-4">📋</p>
              <p className="text-lg font-medium">No grievances filed yet.</p>
              <Link to="/lodge-grievance"
                className="text-[#8b111c] font-semibold hover:underline mt-2 inline-block">
                File your first grievance →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs border-b">
                  <tr>
                    <th className="px-6 py-3 text-left">Reference No.</th>
                    <th className="px-6 py-3 text-left">Subject</th>
                    <th className="px-6 py-3 text-left">Department</th>
                    <th className="px-6 py-3 text-left">Filed On</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {grievances.map((g) => (
                    <tr key={g.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-mono text-xs text-gray-600">{g.refNo}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">{g.subject}</td>
                      <td className="px-6 py-4 text-gray-600">{g.department}</td>
                      <td className="px-6 py-4 text-gray-500">
                        {g.createdAt?.toDate
                          ? g.createdAt.toDate().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                          : "—"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(g.status)}`}>
                          {g.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link to="/track" state={{ refNo: g.refNo }}
                          className="text-[#8b111c] font-semibold text-xs hover:underline">
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-[#870f18] text-white text-sm mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between text-gray-200 text-xs">
          <p>© 2026 College Grievance Redressal Portal. All Rights Reserved.</p>
          <p>Best viewed in Chrome, Firefox, Edge</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
