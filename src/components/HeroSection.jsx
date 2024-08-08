import { forwardRef } from "react";

const HeroSection = forwardRef((props, ref) => {
  return (
    <div ref={ref} id="inicio" className="flex flex-col items-center mt-6 lg:mt-20 border-b border-neutral-800">
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
        <a
          href="#"
          className="bg-gradient-to-r from-yellow-700 to-[#1b5d3c] py-3 px-4 mx-3 rounded-md"
        >
          Postúlate Ahora
        </a>
        <a href="#" className="py-3 px-4 mx-3 rounded-md border">
          Más Información
        </a>
      </div>
      {/* <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}
    </div>
  );
});

export default HeroSection;