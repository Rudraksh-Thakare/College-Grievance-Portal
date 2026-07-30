import { Link, useNavigate } from "react-router-dom";

function LoginNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#8B0D1A]">
      <div className="max-w-7xl mx-auto">
        <ul className="flex text-white text-[15px]">

          <li className="border-r border-[#a52a35]">
            <Link to="/" className="block px-9 py-4 hover:bg-[#730b15]">
              Home
            </Link>
          </li>

          <li className="border-r border-[#a52a35]">
            <Link to="/" className="block px-9 py-4 hover:bg-[#730b15]">
              About the Portal
            </Link>
          </li>

          <li className="border-r border-[#a52a35]">
            <Link to="/" className="block px-9 py-4 hover:bg-[#730b15]">
              Departments
            </Link>
          </li>

          <li className="bg-[#6b0812] border-r border-[#a52a35]">
            <Link to="/login" className="block px-9 py-4 font-semibold">
              Login
            </Link>
          </li>

          <li className="border-r border-[#a52a35]">
            <Link to="/register" className="block px-9 py-4 hover:bg-[#730b15]">
              Register
            </Link>
          </li>

          <li className="border-r border-[#a52a35]">
            <Link to="/track" className="block px-9 py-4 hover:bg-[#730b15]">
              Track Grievance
            </Link>
          </li>

          <li>
            <button
              onClick={() => {
                const el = document.getElementById("footer-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
                else navigate("/");
              }}
              className="block px-9 py-4 hover:bg-[#730b15]"
            >
              Contact Us
            </button>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default LoginNavbar;