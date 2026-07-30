import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-16">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">


        {/* Left Content */}
        <div>

          <span className="inline-block bg-[#8b111c] text-white text-xs font-semibold px-4 py-1 rounded-sm">
            GOVERNMENT-STYLE GRIEVANCE REGISTRY
          </span>


          <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight text-[#8b111c]">
            A formal channel to raise, track, and resolve student grievances.
          </h1>


          <p className="mt-5 text-gray-600 leading-7 text-sm max-w-lg">
            File a complaint against any department with full transparency.
            Every grievance receives a unique reference number and moves
            through a documented resolution process — right up to escalation,
            if required.
          </p>


          <div className="mt-7 flex gap-4">

            <button
              onClick={() => navigate("/lodge-grievance")}
              className="
                bg-[#a91524]
                text-white
                px-6
                py-3
                text-sm
                font-semibold
                rounded-sm
                hover:bg-[#8b111c]
                transition
              "
            >
              Lodge a Grievance
            </button>


            <button
              onClick={() => navigate("/track")}
              className="
                border
                border-[#a91524]
                text-[#8b111c]
                px-6
                py-3
                text-sm
                font-semibold
                rounded-sm
                hover:bg-[#a91524]
                hover:text-white
                transition
              "
            >
              Track Application Status
            </button>

          </div>


          <div className="mt-5 text-xs text-gray-500 border-l-4 border-[#a91524] pl-3">
            Helpline: 1800-XXX-XXXX (Toll Free) | Mon–Sat, 9:00 AM – 5:30 PM
          </div>


        </div>



        {/* Right Card */}
        <div className="
          bg-white
          shadow-md
          border
          border-gray-100
          rounded-sm
          overflow-hidden
          max-w-md
          ml-auto
          w-full
        ">


          <div className="
            bg-[#8b111c]
            text-white
            px-5
            py-3
            flex
            justify-between
            text-sm
            font-semibold
          ">
            <span>Recent Case Activity</span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
              Live
            </span>
          </div>



          <div className="p-5 space-y-5">


            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">
                  REF/2026/HOS/1897
                </p>
                <p className="text-sm font-semibold">
                  Hostel Administration
                </p>
              </div>

              <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                In Review
              </span>
            </div>



            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">
                  REF/2026/CSE/1042
                </p>
                <p className="text-sm font-semibold">
                  Computer Science Dept.
                </p>
              </div>

              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                Resolved
              </span>
            </div>




            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400">
                  REF/2026/CAN/0921
                </p>
                <p className="text-sm font-semibold">
                  Canteen Services
                </p>
              </div>

              <span className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full">
                Escalated
              </span>
            </div>


          </div>



          <button
            onClick={() => navigate("/track")}
            className="w-full border-t px-5 py-3 text-xs text-center text-gray-500 hover:bg-gray-50 transition"
          >
            Have a reference number?{" "}
            <span className="text-[#8b111c] font-semibold">
              Check status here →
            </span>
          </button>


        </div>


      </div>

    </section>
  );
}

export default HeroSection;