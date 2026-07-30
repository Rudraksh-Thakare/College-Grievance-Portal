function DepartmentSection() {

  const departments = [
    {
      icon: "📚",
      title: "Academic Affairs",
      desc: "Issues related to academics, examinations and curriculum."
    },
    {
      icon: "👥",
      title: "Student Welfare",
      desc: "Support related to student facilities and activities."
    },
    {
      icon: "🏢",
      title: "Administration",
      desc: "Administrative services and official concerns."
    },
    {
      icon: "🏠",
      title: "Hostel & Facilities",
      desc: "Concerns related to hostel and campus facilities."
    }
  ];


  return (
    <section id="department-section" className="bg-white py-16">

      <div className="max-w-7xl mx-auto px-6">


        {/* Heading */}
        <div className="text-center mb-12">

          <h2 className="text-3xl font-bold text-[#7d1019]">
            Departments Covered
          </h2>

          <p className="mt-3 text-gray-600">
            Your grievances are handled by the concerned departments
          </p>

        </div>



        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">


          {departments.map((dept, index) => (

            <div
              key={index}
              className="bg-[#faf7f7] rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
            >

              <div className="w-16 h-16 mx-auto rounded-full bg-[#8b111c] text-white flex items-center justify-center text-2xl">
                {dept.icon}
              </div>


              <h3 className="mt-5 text-lg font-bold text-gray-800">
                {dept.title}
              </h3>


              <p className="mt-3 text-sm text-gray-600 leading-6">
                {dept.desc}
              </p>


            </div>

          ))}


        </div>


      </div>

    </section>
  );
}

export default DepartmentSection;