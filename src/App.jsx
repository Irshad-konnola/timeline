import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TimelineSection from "./components/TimelineSection";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import './App.css';

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en'); 

  return (
    <div className="min-h-screen">
      <Header  />
      <Hero />
      <TimelineSection 
        onItemClick={setSelectedItem} 
        currentLanguage={currentLanguage} 
        setCurrentLanguage={setCurrentLanguage}
      />
      <Footer />
      <Modal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default App;