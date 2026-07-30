import HomeHeader from "../components/Header/HomeHeader";
import HomeNavbar from "../components/Navbar/HomeNavbar";
import NoticeBar from "../components/Header/NoticeBar";

import HeroSection from "../Home/HeroSection";
import StatisticsSection from "../Home/StatisticsSection";
import ProcessSection from "../Home/ProcessSection";
import DepartmentSection from "../Home/DepartmentSection";
import CTASection from "../Home/CTASection";
import HomeFooter from "../Home/HomeFooter";


function Home() {
  return (
    <div id="main-content" className="min-h-screen bg-[#faf7f7]">

      <HomeHeader />
      <HomeNavbar />
      <NoticeBar />

      <HeroSection />
      <StatisticsSection />
      <ProcessSection />
      <DepartmentSection />
      <CTASection />
      <HomeFooter />

    </div>
  );
}

export default Home;