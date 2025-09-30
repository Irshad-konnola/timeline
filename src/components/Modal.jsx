import React, { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({ item, onClose, currentLanguage = 'en' }) => {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [item]);

  if (!item) return null;

  // Get the appropriate text based on current language
  const getTitle = () => {
    return currentLanguage === 'ar' && item.titleLocLang 
      ? item.titleLocLang 
      : item.title;
  };

  const getContents = () => {
    return currentLanguage === 'ar' && item.contentLocLang 
      ? item.contentLocLang 
      : item.contents;
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div 
        className={`bg-white rounded-3xl border-2 border-purple-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-300 ${
          currentLanguage === 'ar' ? 'text-right' : 'text-left'
        }`}
        style={{ direction: currentLanguage === 'ar' ? 'rtl' : 'ltr' }}
      >
        <div className="p-8">
          <div className={`flex justify-between items-start mb-6 ${
            currentLanguage === 'ar' ? 'flex-row-reverse' : 'flex-row'
          }`}>
            <div className={`flex items-center gap-4 ${
              currentLanguage === 'ar' ? 'flex-row-reverse' : 'flex-row'
            }`}>
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

          {item.contentPic && (
            <img
              src={item.contentPic}
              alt={getTitle()}
              className="w-full h-80 object-cover rounded-2xl border-2 border-purple-100 mb-6 shadow-lg"
            />
          )}

          {item.contentVideo && (
            <video
              src={item.contentVideo}
              controls
              className="w-full max-h-[400px] object-contain rounded-2xl border-2 border-purple-100 mb-6 shadow-lg"
            />
          )}

          <p className="text-gray-700 leading-relaxed text-lg">
            {getContents()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;