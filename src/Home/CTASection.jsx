import { useNavigate } from "react-router-dom";

function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#fff6f6] py-14">

      <div className="max-w-7xl mx-auto px-6 text-center">


        <h2 className="text-3xl md:text-4xl font-bold text-[#7f111b]">
          Every Student Has The Right to Be Heard.
        </h2>


        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm leading-6">
          Register on the portal to lodge your first grievance and receive an
          official reference number.
        </p>



        <div className="mt-8 flex justify-center gap-4">


          {/* Register Button */}
          <button
            onClick={() => navigate("/register")}
            className="
            bg-[#a91524]
            text-white
            px-8
            py-3
            text-sm
            font-semibold
            rounded-sm
            hover:bg-[#8b111c]
            transition
            "
          >
            Register Now
          </button>



          {/* Login Button */}
          <button
            onClick={() => navigate("/login")}
            className="
            bg-white
            text-[#8b111c]
            border
            border-[#8b111c]
            px-8
            py-3
            text-sm
            font-semibold
            rounded-sm
            hover:bg-[#8b111c]
            hover:text-white
            transition
            "
          >
            Existing User Login
          </button>


        </div>


      </div>


    </section>
  );
}

export default CTASection;