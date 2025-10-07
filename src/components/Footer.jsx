import React from "react";
import { Button } from "./ui/button";
import { Languages } from "lucide-react";
const Footer = ({currentLanguage, setCurrentLanguage}) => {
   const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === "en" ? "ar" : "en");
  };

  return (
   <footer className="py-2 flex justify-center items-center">
  <div className="hidden md:flex items-center gap-4">
    <Button
      onClick={toggleLanguage}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Languages className="w-4 h-4" />
      {currentLanguage === "en" ? "العربية" : "English"}
    </Button>
  </div>
</footer>

  );
};

export default Footer;