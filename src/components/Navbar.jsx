import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/invertaxi_logo.png";
import { navItems } from "../constants";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    const toggleNavbar = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };

    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
            <div className="container px-4 mx-auto relative lg:text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <img className="h-10 w-35 mr-2" src={logo} alt="Logo" />
                    </div>
                    <ul className="hidden lg:flex ml-14 space-x-12">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <a href={item.href}>{item.label}</a>
                            </li>
                        ))}
                    </ul>
                    <div className="hidden lg:flex justify-center space-x-12 items-center">
                        {/* <a href="#" className="py-2 px-3 border rounded-md">
              Sign In
            </a> */}
                        <Link to="/login">
                            <a
                                className="bg-gradient-to-r from-yellow-700 to-[#1b5d3c] py-2 px-3 rounded-md"
                            >
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
                                    <a href={item.href}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                        <div className="flex space-x-6">
                        <Link to="/login">
                            <a
                                className="py-2 px-3 rounded-md bg-gradient-to-r from-yellow-700 to-[#1b5d3c]"
                            >
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