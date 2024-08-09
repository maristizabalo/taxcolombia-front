import ContactSection from "../components/ContactSection";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Workflow from "../components/Workflow";

const HomePage = () => {

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <FeatureSection />
        <Workflow />
        <ContactSection  />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;