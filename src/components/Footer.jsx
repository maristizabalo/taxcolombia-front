import { Phone, MapPin } from "lucide-react";
import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className=" text-neutral-300 py-10 w-full">
      <div className="mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Sección de Información de la Empresa */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mb-8 lg:mb-0">
            <h3 className="text-xl font-semibold text-white mb-4">Invertaxi</h3>
            <p className="mb-2 flex items-center">
              <MapPin className="mr-2" /> Calle 93 # 57 - 49
            </p>
            <p className="mb-2 flex items-center">
              <Phone className="mr-2" /> WhatsApp: 310 233 5832
            </p>
          </div>

          {/* Sección de Enlaces de Redes Sociales */}
          <div className="w-full sm:w-1/2 lg:w-1/3 mb-8 lg:mb-0 flex flex-col lg:flex-row items-start lg:items-center">
            <h3 className="text-md font-semibold text-white mb-4 lg:mb-0 lg:mr-6">
              Síguenos
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/invertaxi.taxcolombia"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white"
              >
                <FaFacebookF className="h-8 w-8" />
              </a>
              <a
                href="https://wa.me/573102335832"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-300 hover:text-white"
              >
                <FaWhatsapp className="h-8 w-8" /> {/* Icono de WhatsApp */}
              </a>
            </div>
          </div>
        </div>

        {/* Sección de Derechos Reservados */}
        <div className="mt-8 border-t border-neutral-700 pt-4">
          <p className="text-center text-neutral-500">
            &copy; {new Date().getFullYear()} Invertaxi. Developed by Maicol
            Aristizabal.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;