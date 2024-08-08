import { MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <div className="mt-20 border-b border-neutral-800 pb-10">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        Contacta con{" "}
        <span className="bg-gradient-to-r from-yellow-700 to-[#1b5d3c] text-transparent bg-clip-text">
          Invertaxi
        </span>
      </h2>
      <div className="flex flex-wrap mt-10">
        <div className="w-full lg:w-1/2 px-4">
          <form className="bg-neutral-900 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl text-yellow-700 mb-6">Formulario de Contacto</h3>
            <div className="mb-4">
              <label className="block text-white text-sm mb-2" htmlFor="name">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                className="w-full p-3 rounded-md bg-neutral-800 text-white border border-neutral-700"
                placeholder="Tu nombre"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm mb-2" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-3 rounded-md bg-neutral-800 text-white border border-neutral-700"
                placeholder="Tu correo electrónico"
              />
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm mb-2" htmlFor="message">
                Mensaje
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-3 rounded-md bg-neutral-800 text-white border border-neutral-700"
                placeholder="Tu mensaje"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-700 to-[#1b5d3c] py-3 px-6 rounded-md text-white"
            >
              Enviar
            </button>
          </form>
        </div>
        <div className="w-full lg:w-1/2 px-4 mt-10 lg:mt-0">
          <div className="relative w-full h-[400px]">
            {/* <iframe
              title="Ubicación de Invertaxi"
              src=""
              className="absolute inset-0 w-full h-full border-0 rounded-lg"
              allowFullScreen
            ></iframe> */}
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d248.53172601358955!2d-74.06484540504448!3d4.68147166333575!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1723090446886!5m2!1ses!2sco" 
            title="Ubicación de Invertaxi"
            className="absolute inset-0 w-full h-full border-0 rounded-lg" 
            allowfullscreen
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute top-2 right-2 bg-neutral-900 text-white p-2 rounded-full">
              <MapPin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ContactSection;