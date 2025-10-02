import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Modal = ({ item, onClose, currentLanguage = "en" }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";

      // Merge images and videos into one list with type info
      const media = [];
      if (item.contentPics && item.contentPics.length > 0) {
        media.push(
          ...item.contentPics.map((pic) => ({ type: "image", src: pic }))
        );
      }
      if (item.contentVideos && item.contentVideos.length > 0) {
        media.push(
          ...item.contentVideos.map((vid) => ({ type: "video", src: vid }))
        );
      }
      setMediaList(media);
      setCurrentMediaIndex(0);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [item]);

  if (!item) return null;

  const getTitle = () => {
    return currentLanguage === "ar" && item.titleLocLang
      ? item.titleLocLang
      : item.title;
  };

  const getContents = () => {
    return currentLanguage === "ar" && item.contentLocLang
      ? item.contentLocLang
      : item.contents;
  };

  const handleNext = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaList.length);
  };

  const handlePrev = () => {
    setCurrentMediaIndex(
      (prev) => (prev - 1 + mediaList.length) % mediaList.length
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div
        className={`bg-white rounded-3xl border-2 border-purple-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-300 ${
          currentLanguage === "ar" ? "text-right" : "text-left"
        }`}
        style={{ direction: currentLanguage === "ar" ? "rtl" : "ltr" }}
      >
        <div className="p-8">
          {/* Header */}
          <div
            className={`flex justify-between items-start mb-6 ${
              currentLanguage === "ar" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`flex items-center gap-4 ${
                currentLanguage === "ar" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {getTitle()}
              </h2>
              <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full text-sm font-semibold text-purple-700">
                {item.year}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 transition-colors hover:rotate-90 duration-300"
            >
              <X size={28} />
            </button>
          </div>

          {/* Media carousel */}
          {mediaList.length > 0 && (
            <div className="relative mb-6">
              {mediaList[currentMediaIndex].type === "image" ? (
                <img
                  src={mediaList[currentMediaIndex].src}
                  alt={getTitle()}
                  className="w-full h-80 object-cover rounded-2xl border-2 border-purple-100 shadow-lg"
                />
              ) : (
                <video
                  src={mediaList[currentMediaIndex].src}
                  controls
                  className="w-full max-h-[400px] object-contain rounded-2xl border-2 border-purple-100 shadow-lg"
                />
              )}

              {mediaList.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          )}

          {/* Content text */}
          <p className="text-gray-700 leading-relaxed text-lg">
            {getContents()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
  