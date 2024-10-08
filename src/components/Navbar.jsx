import { Menu, X } from "lucide-react";
import logo from "../assets/invertaxi_logo.png";
import { navItems } from "../constants";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Link as LinkScroll } from "react-scroll";

const Navbar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };

    // const sections = {
    //     inicio: useRef(null),
    //     servicios: useRef(null),
    //     contacto: useRef(null),
    // };

    // const scrollToSection = (section) => {
    //     const sectionElement = sections[section]?.current;
    //     if (sectionElement) {
    //         // Desplazar el elemento a la vista
    //         sectionElement.scrollIntoView({ behavior: "smooth", block: "start" });

    //         // Ajustar el desplazamiento después de un breve retraso
    //         setTimeout(() => {
    //             // Ajustar la posición de la vista añadiendo un margen superior
    //             window.scrollBy({ top: 100, behavior: "smooth" });
    //         }, 1); // Puedes ajustar el tiempo según sea necesario
    //     } else {
    //         console.error(`No se pudo encontrar la sección: ${section}`);
    //     }
    //     setMobileDrawerOpen(false); // Cerrar el drawer móvil
    // };

    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
            <div className="container px-4 mx-auto relative lg:text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <img className="h-10 w-35 mr-2" src={logo} alt="Logo" />
                    </div>
                    <ul className="hidden lg:flex ml-14 space-x-12">
                        {navItems.map((item, index) => (
                            <li key={index} className="nav-item">
                                {/* <LinkScroll to={`#${item.href}`} spy={true} smooth={true} offset={50} duration={500} onClick={toggleNavbar}>
                                    
                                </LinkScroll> */}
                                <LinkScroll
                                    activeClass="active"
                                    to={item.href}
                                    spy={true}
                                    smooth={true}
                                    offset={-110}
                                    duration={500}
                                    className="cursor-pointer"
                                // onSetActive={handleSetActive}
                                >
                                    {item.label}
                                </LinkScroll>
                                {/* <a
                                    href={`#${item.href}`}
                                    onClick={() => scrollToSection(item.href.substring(1))}
                                >
                                    
                                </a> */}
                            </li>
                        ))}
                    </ul>
                    <div className="hidden lg:flex justify-center space-x-12 items-center">
                        <Link to="/login">
                            <a className="bg-gradient-to-r from-yellow-700 to-[#1b5d3c] py-2 px-3 rounded-md">
                                Iniciar Sesión
                            </a>
                        </Link>
                    </div>
                    <div className="lg:hidden md:flex flex-col justify-end">
                        <button onClick={toggleNavbar}>
                            {mobileDrawerOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
                {mobileDrawerOpen && (
                    <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
                        <ul>
                            {navItems.map((item, index) => (
                                <li key={index} className="py-4">
                                    {/* <LinkScroll to={`#${item.href}`} spy={true} smooth={true} offset={50} duration={500} onClick={toggleNavbar}>
                                        {item.label}
                                    </LinkScroll> */}
                                    <LinkScroll
                                        activeClass="active"
                                        to={item.href}
                                        spy={true}
                                        smooth={true}
                                        offset={-110}
                                        duration={500}
                                        className="cursor-pointer"
                                    // onSetActive={handleSetActive}
                                    >
                                        {item.label}
                                    </LinkScroll>
                                    {/* <a
                                        href={`#${item.href}`}
                                        onClick={() => scrollToSection(item.href.substring(1))}
                                    >
                                        {item.label}
                                    </a> */}
                                </li>
                            ))}
                        </ul>
                        <div className="flex space-x-6">
                            <Link to="/login">
                                <a className="py-2 px-3 rounded-md bg-gradient-to-r from-yellow-700 to-[#1b5d3c]">
                                    Iniciar Sesión
                                </a>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;