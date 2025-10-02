import React, { useState } from "react";
import Header from "./components/Header";
import TimelineSection from "./components/TimelineSection";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import './App.css';
import timelineData from "./timelineData.json"; // remove this if using api for fetching
const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en'); 

  // const [logo, setLogo] = useState(null) state to store api data

// data fetching using api call
  // useEffect(() => {
  //   const fetchTimelineData = async () => {
  //     try {
  //       // 👇 Replace this URL with your real API endpoint
  //       const response = await fetch("https://example.com/api/timeline");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch timeline data");
  //       }
  //       const data = await response.json();
  //       setLogo(data);
  //     } catch (error) {
  //       console.error("Error fetching timeline data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTimelineData();
  // }, []);

  return (
    <div className="min-h-screen">
      <Header currentLanguage={currentLanguage} 
        setCurrentLanguage={setCurrentLanguage}
        institutionLogos={timelineData.institutionLogos}  // institutionLogos={logo.institutionLogos}
        />
      <TimelineSection 
        onItemClick={setSelectedItem} 
        currentLanguage={currentLanguage} 
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