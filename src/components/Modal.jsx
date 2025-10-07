import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Modal = ({ item, onClose, currentLanguage = "en" }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mediaList, setMediaList] = useState([]);
  const [autoSlide, setAutoSlide] = useState(true);

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

  // Auto slide effect
  useEffect(() => {
    if (!autoSlide || mediaList.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % mediaList.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [mediaList.length, autoSlide]);

  if (!item) return null;

  const getTitle = () => {
    return currentLanguage === "ar" && item.titleLocLang
      ? item.titleLocLang
      : item.title;
  };

  const getContentsDetail = () => {
    return currentLanguage === "ar" && item.contentsDetailLocLang
      ? item.contentsDetailLocLang
      : item.contentsDetail || item.contents; // Fallback to contents if details not available
  };

  const handleNext = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaList.length);
    setAutoSlide(false); // Stop auto-slide when user manually navigates
  };

  const handlePrev = () => {
    setCurrentMediaIndex(
      (prev) => (prev - 1 + mediaList.length) % mediaList.length
    );
    setAutoSlide(false); // Stop auto-slide when user manually navigates
  };

  const toggleAutoSlide = () => {
    setAutoSlide(!autoSlide);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div
        className={`bg-white rounded-3xl border-2 border-purple-200 max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-300 ${
          currentLanguage === "ar" ? "text-right" : "text-left"
        }`}
        style={{ direction: currentLanguage === "ar" ? "rtl" : "ltr" }}
      >
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div
            className={`flex justify-between items-start mb-6 ${
              currentLanguage === "ar" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`flex items-center gap-4 flex-wrap ${
                currentLanguage === "ar" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div className="flex items-center gap-3">
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {getTitle()}
                </h2>
                {/* QR Code - Conditionally rendered */}
                {item.qrCode && (
                  <div className="flex-shrink-0">
                    <img
                      src={item.qrCode}
                      alt="QR Code"
                      className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg border border-gray-300 shadow-sm"
                      title="Scan for more information"
                    />
                  </div>
                )}
              </div>
              <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full text-sm font-semibold text-purple-700">
                {item.year}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 transition-colors hover:rotate-90 duration-300 flex-shrink-0"
            >
              <X size={28} />
            </button>
          </div>

          {/* Two Column Layout */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 ${
              currentLanguage === "ar" ? "lg:grid-flow-row-dense" : ""
            }`}
          >
            {/* Media Section - Left */}
            {mediaList.length > 0 && (
              <div className="space-y-4">
                {/* Media carousel */}
                <div className="relative">
                  {mediaList[currentMediaIndex].type === "image" ? (
                    <img
                      src={mediaList[currentMediaIndex].src}
                      alt={getTitle()}
                      className="w-full h-64 lg:h-80 object-cover rounded-2xl border-2 border-purple-100 shadow-lg"
                    />
                  ) : (
                    <video
                      src={mediaList[currentMediaIndex].src}
                      controls
                      className="w-full h-64 lg:h-80 object-cover rounded-2xl border-2 border-purple-100 shadow-lg"
                    />
                  )}

                  {mediaList.length > 1 && (
                    <>
                      <button
                        onClick={handlePrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={handleNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
                      >
                        <ChevronRight size={24} />
                      </button>

                      {/* Auto-slide toggle */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                        <button
                          onClick={toggleAutoSlide}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                            autoSlide
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 text-gray-700"
                          }`}
                        >
                          {autoSlide ? "Auto: ON" : "Auto: OFF"}
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Media indicators */}
                {mediaList.length > 1 && (
                  <div className="flex justify-center gap-2">
                    {mediaList.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentMediaIndex(index);
                          setAutoSlide(false);
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === currentMediaIndex
                            ? "bg-purple-600 scale-110"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Content Detail Section - Right */}
            <div
              className={`flex flex-col ${
                mediaList.length === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div
                className={`text-gray-700 leading-relaxed text-base lg:text-lg h-full overflow-y-auto max-h-[400px] lg:max-h-[500px] p-4 bg-gray-50 rounded-2xl border border-gray-200 ${
                  currentLanguage === "ar"
                    ? "text-right lg:text-right"
                    : "text-left lg:text-left"
                }`}
              >
                <p className="whitespace-pre-line">{getContentsDetail()}</p>
              </div>

          
            </div>
          </div>

          {/* Mobile responsive note */}
          <div className="mt-6 text-center lg:hidden">
            <p className="text-sm text-gray-500">
              💡 Tip: Rotate your device for better reading experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;