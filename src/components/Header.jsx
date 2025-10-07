import React, { useState } from "react";
import { Button } from "./ui/button";
import { Edit, Languages } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { useNavigate } from "react-router-dom";
const Header = ({ currentLanguage, setCurrentLanguage,institutionLogos }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // const toggleLanguage = () => {
  //   setCurrentLanguage(currentLanguage === "en" ? "ar" : "en");
  // };

    const handleRoute = () => {
navigate('/plant-layout')
  };
  const handleLogoClick = () => {
navigate('/')
  };
  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
           <div className="flex items-center space-x-3">
  <div className="w-10 h-10 flex items-center justify-center">
    <img
        onClick={handleLogoClick}

      src={institutionLogos?.[0]}
      alt="Institution Logo"
      className="w-10 h-10 object-contain "
    />
  </div>
  <div>
    <h1 className="text-xl font-bold text-gray-900">Shell Qatar</h1>
    <p className="text-xs text-gray-500">Powering Progress</p>
  </div>
</div>
<div>

  <p
    onClick={handleRoute}
    className="cursor-pointer text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200"
  >
    Plant Layout
  </p></div>
            {/* Desktop Buttons */}
            {/* <div className="hidden md:flex items-center gap-4">
              <Button
                onClick={toggleLanguage}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Languages className="w-4 h-4" />
                {currentLanguage === "en" ? "العربية" : "English"}
              </Button>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="group/btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
              >
                <Edit className="w-4 h-4 mr-2" />
                Update Timeline
              </Button>
            </div> */}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span
                  className={`block h-0.5 w-6 bg-gray-600 transition-transform ${
                    isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-gray-600 transition-opacity ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-gray-600 transition-transform ${
                    isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col gap-3">
                {/* <Button
                  onClick={toggleLanguage}
                  variant="outline"
                  className="flex items-center gap-2 w-full justify-center"
                >
                  <Languages className="w-4 h-4" />
                  {currentLanguage === "en" ? "العربية" : "English"}
                </Button>
                <Button
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsMenuOpen(false); // close menu when opening modal
                  }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Update Timeline
                </Button> */}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  <DialogContent className="border-2 border-purple-400 shadow-lg">
          <DialogHeader>
            <DialogTitle>Update Timeline</DialogTitle>
            <DialogDescription>
              Use this link to manage timeline updates:
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <a
              href="http://localhost:5173/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 underline font-medium"
            >
              http://localhost:5173/
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
