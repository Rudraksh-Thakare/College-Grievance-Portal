import { Link, useNavigate } from "react-router-dom";

function HomeNavbar() {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="bg-[#aa1622] shadow">
      <div className="max-w-7xl mx-auto">
        <ul className="flex items-center text-white text-[15px]">

          {/* Home */}
          <li className="bg-[#7d0f17] border-r border-red-800">
            <Link
              to="/"
              className="block px-8 py-4 font-semibold"
            >
              Home
            </Link>
          </li>

          {/* About */}
          <li className="border-r border-red-800">
            <button
              onClick={() => scrollTo("process-section")}
              className="block px-8 py-4 hover:bg-[#7d0f17] transition"
            >
              About the Portal
            </button>
          </li>

          {/* Departments */}
          <li className="border-r border-red-800">
            <button
              onClick={() => scrollTo("department-section")}
              className="block px-8 py-4 hover:bg-[#7d0f17] transition"
            >
              Departments
            </button>
          </li>

          {/* Track */}
          <li className="border-r border-red-800">
            <button
              onClick={() => navigate("/track")}
              className="block px-8 py-4 hover:bg-[#7d0f17] transition"
            >
              Track Grievance
            </button>
          </li>

          {/* Guidelines */}
          <li className="border-r border-red-800">
            <button
              onClick={() => scrollTo("process-section")}
              className="block px-8 py-4 hover:bg-[#7d0f17] transition"
            >
              Guidelines
            </button>
          </li>

          {/* Contact */}
          <li>
            <button
              onClick={() => scrollTo("footer-section")}
              className="block px-8 py-4 hover:bg-[#7d0f17] transition"
            >
              Contact Us
            </button>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default HomeNavbar;