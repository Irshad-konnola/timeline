import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            {/* Shell Logo - You can replace this with actual Shell logo */}
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Shell Qatar</h1>
              <p className="text-xs text-gray-500">Powering Progress</p>
            </div>
          </div>

          {/* Desktop Navigation - Only Timeline */}
          <nav className="hidden md:flex items-center">
            <a 
              href="#timeline-section" 
              className="text-gray-700 hover:text-indigo-600 font-medium transition-colors px-4 py-2"
            >
              Our Timeline
            </a>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`block h-0.5 w-6 bg-gray-600 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-600 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-600 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation - Only Timeline */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col">
              <a 
                href="#timeline-section" 
                className="text-gray-700 hover:text-indigo-600 font-medium py-2 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Timeline
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;