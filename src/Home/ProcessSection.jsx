function ProcessSection() {
  return (
    <section id="process-section" className="bg-[#faf7f7] py-16">

      <div className="max-w-7xl mx-auto px-6">


        {/* Heading */}
        <div className="text-center mb-12">

          <h2 className="text-3xl font-bold text-[#7d1019]">
            How the Grievance Process Works
          </h2>

          <p className="mt-3 text-gray-600">
            A simple and transparent process to resolve student concerns
          </p>

        </div>



        {/* Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">



          {/* Step 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-[#8b111c]">

            <div className="w-14 h-14 mx-auto rounded-full bg-[#8b111c] text-white flex items-center justify-center text-xl font-bold">
              01
            </div>

            <h3 className="mt-5 font-bold text-lg text-gray-800">
              Register Grievance
            </h3>

            <p className="mt-3 text-sm text-gray-600 leading-6">
              Submit your complaint through the online grievance portal.
            </p>

          </div>





          {/* Step 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-[#8b111c]">

            <div className="w-14 h-14 mx-auto rounded-full bg-[#8b111c] text-white flex items-center justify-center text-xl font-bold">
              02
            </div>

            <h3 className="mt-5 font-bold text-lg text-gray-800">
              Review & Assign
            </h3>

            <p className="mt-3 text-sm text-gray-600 leading-6">
              Your grievance is reviewed and forwarded to the concerned department.
            </p>

          </div>





          {/* Step 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-[#8b111c]">

            <div className="w-14 h-14 mx-auto rounded-full bg-[#8b111c] text-white flex items-center justify-center text-xl font-bold">
              03
            </div>

            <h3 className="mt-5 font-bold text-lg text-gray-800">
              Resolution Process
            </h3>

            <p className="mt-3 text-sm text-gray-600 leading-6">
              The department investigates and works towards resolving the issue.
            </p>

          </div>






          {/* Step 4 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-[#8b111c]">

            <div className="w-14 h-14 mx-auto rounded-full bg-[#8b111c] text-white flex items-center justify-center text-xl font-bold">
              04
            </div>

            <h3 className="mt-5 font-bold text-lg text-gray-800">
              Track & Close
            </h3>

            <p className="mt-3 text-sm text-gray-600 leading-6">
              Students can track status and receive final resolution updates.
            </p>

          </div>



        </div>

      </div>

    </section>
  );
}

export default ProcessSection;