import ContactSection from "../components/ContactSection";
import FeatureSection from "../components/FeatureSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Workflow from "../components/Workflow";
import { useRef } from "react";

const HomePage = () => {
  const sections = {
    inicio: useRef(null),
    servicios: useRef(null),
    contacto: useRef(null),
  };

  return (
    <>
      <Navbar sections={sections} />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection ref={sections.inicio} />
        <FeatureSection ref={sections.servicios} />
        <Workflow />
        <ContactSection ref={sections.contacto} />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;