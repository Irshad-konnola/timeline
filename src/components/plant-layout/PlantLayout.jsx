import React, { useState } from "react";
import plantJson from "./PlantData.json";
import Modal from "../Modal";

const { plantData } = plantJson;

const hotspotPositions = {
  1: { top: "8.2%", left: "50%" },
  2: { top: "21.9%", left: "69.9%" },
  3: { top: "49%", left: "69%" },
  4: { top: "34.2%", left: "37.3%" },
  5: { top: "28.6%", left: "44.3%" },
  6: { top: "41.5%", left: "50%" },
  7: { top: "23%", left: "27%" },
  8: { top: "41%", left: "28.7%" },
  9: { top: "66%", left: "54.5%" },
  10: { top: "78.8%", left: "53.6%" },
};

const PlantLayout = ({ currentLanguage = "en" }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className=" mx-auto grid grid-cols-2 gap-6 calc(100vh - 2rem)">
        {/* Left Column - Plant Image */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center h-full">
          <div className="relative w-full max-h-full flex items-center justify-center">
            <img
              src="/final_layout_new.png"
              alt="Plant Layout"
              className="w-full h-auto rounded-lg"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/800x500/4a6572/ffffff?text=Plant+Layout+Diagram";
              }}
            />

            {/* Hotspots */}
            {plantData.map((block) => (
              <div
                key={block.id}
                className="absolute w-10 h-10 rounded-full cursor-pointer flex justify-center items-center font-bold text-white transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg hover:shadow-xl"
                style={{
                  top: hotspotPositions[block.id].top,
                  left: hotspotPositions[block.id].left,
                  transform: "translate(-50%, -50%)",
                }}
                onClick={() => setSelectedItem(block)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform =
                    "translate(-50%, -50%) scale(1.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform =
                    "translate(-50%, -50%) scale(1)";
                }}
              >
                {block.id}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Details List */}
        <div className="bg-white rounded-xl shadow-lg p-6 h-full overflow-y-auto">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
            Plant Components
          </h2>

          <div className="space-y-2">
            {plantData.map((item) => (
              <div
                key={item.id}
                className="border-l-4 border-indigo-500 pl-4 py-2 hover:bg-indigo-50 transition-colors duration-200 cursor-pointer rounded-r-lg"
                onClick={() => setSelectedItem(item)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs">
                    {item.id}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {currentLanguage === "en"
                      ? item.title
                      : item.titleLocLang || item.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed ml-11">
                  {currentLanguage === "en"
                    ? item.description
                    : item.descriptionLocLang || item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <Modal
          item={{
            ...selectedItem,
            contentsDetail: selectedItem.descriptionDetail,
            contentsDetailLocLang: selectedItem.descriptionDetailLocLang,
          }}
          onClose={() => setSelectedItem(null)}
          currentLanguage={currentLanguage}
        />
      )}
    </div>
  );
};

export default PlantLayout;
