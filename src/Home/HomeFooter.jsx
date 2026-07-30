import { Link, useNavigate } from "react-router-dom";

function HomeFooter() {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="footer-section" className="bg-[#870f18] text-white">


      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">


        {/* About Portal */}
        <div>

          <h3 className="font-bold text-lg mb-4">
            College Grievance Redressal Portal
          </h3>

          <p className="text-sm text-gray-200 leading-7">
            An official student grievance tracking system maintained
            by the Office of the Registrar for transparent,
            time-bound complaint resolution.
          </p>

        </div>



        {/* Quick Links */}
        <div>

          <h3 className="font-bold text-lg mb-4">
            Quick Links
          </h3>


          <ul className="space-y-3 text-sm text-gray-200">

            <li>
              <button onClick={() => scrollTo("process-section")} className="hover:underline hover:text-white transition">
                About the Portal
              </button>
            </li>

            <li>
              <button onClick={() => scrollTo("process-section")} className="hover:underline hover:text-white transition">
                Grievance Guidelines
              </button>
            </li>

            <li>
              <button onClick={() => scrollTo("department-section")} className="hover:underline hover:text-white transition">
                Departments
              </button>
            </li>

            <li>
              <button
                onClick={() => alert("FAQs\n\nQ: How long does resolution take?\nA: Most grievances are resolved within 7–10 working days.\n\nQ: Can I submit anonymously?\nA: Yes, the Lodge Grievance form has an anonymous option.\n\nQ: How do I track my complaint?\nA: Use the reference number provided at submission on the Track page.")}
                className="hover:underline hover:text-white transition"
              >
                FAQs
              </button>
            </li>

          </ul>

        </div>




        {/* Student Services */}
        <div>

          <h3 className="font-bold text-lg mb-4">
            Student Services
          </h3>


          <ul className="space-y-3 text-sm text-gray-200">

            <li>
              <Link to="/login" className="hover:underline hover:text-white transition">
                Login
              </Link>
            </li>

            <li>
              <Link to="/register" className="hover:underline hover:text-white transition">
                Register
              </Link>
            </li>

            <li>
              <Link to="/track" className="hover:underline hover:text-white transition">
                Track Grievance
              </Link>
            </li>

            <li>
              <button
                onClick={() => alert("Contact the Registrar:\n📍 Registrar's Office, Main Campus Building\n📞 1800-XXX-XXXX (Toll Free)\n✉️ grievance@college.edu.in\n\nOffice Hours: Mon–Sat, 9:00 AM – 5:30 PM")}
                className="hover:underline hover:text-white transition"
              >
                Contact Registrar
              </button>
            </li>

          </ul>

        </div>




        {/* Contact */}
        <div>

          <h3 className="font-bold text-lg mb-4">
            Contact
          </h3>


          <ul className="space-y-3 text-sm text-gray-200">

            <li>
              Registrar's Office, Main Campus Building
            </li>

            <li>
              Helpline: 1800-XXX-XXXX
            </li>

            <li>
              <a href="mailto:grievance@college.edu.in" className="hover:underline hover:text-white transition">
                grievance@college.edu.in
              </a>
            </li>

          </ul>

        </div>


      </div>



      {/* Bottom Bar */}
      <div className="border-t border-red-400/30">

        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between text-sm text-gray-200">


          <p>
            © 2026 College Grievance Redressal Portal. All Rights Reserved.
          </p>


          <p>
            Best viewed in Chrome, Firefox, Edge
          </p>


        </div>

      </div>


    </footer>
  );
}

export default HomeFooter;