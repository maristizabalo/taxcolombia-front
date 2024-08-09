import { Link as LinkScroll } from "react-scroll";

const HeroSection = () => {
  return (
    <div id="inicio" className="flex flex-col items-center mt-6 lg:mt-20 border-b border-neutral-800">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Bienvenido a
        <span className="bg-gradient-to-r from-yellow-700 to-[#1b5d3c] text-transparent bg-clip-text">
          {" "}
          Invertaxi
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Únete a nuestro equipo y conduce con nosotros. En Invertaxi, proporcionamos vehículos en óptimas condiciones y ofrecemos beneficios adicionales para conductores cumplidos. ¡Empieza hoy y disfruta de todas nuestras ventajas!
      </p>
      <div className="flex justify-center my-10">
        {/* <a
          href="#contacto"
          className="bg-gradient-to-r from-yellow-700 to-[#1b5d3c] py-3 px-4 mx-3 rounded-md"
        >
          Postúlate Ahora
        </a> */}
        <LinkScroll
          activeClass="active"
          to={"contacto"}
          spy={true}
          smooth={true}
          offset={-110}
          duration={500}
          className="bg-gradient-to-r from-yellow-700 to-[#1b5d3c] py-3 px-4 mx-3 rounded-md cursor-pointer"
        >
          Postúlate Ahora
        </LinkScroll>
      </div>
    </div>
  );
};

export default HeroSection;