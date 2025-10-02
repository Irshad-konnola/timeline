import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const EventCard = ({ event, eventIndex, totalEvents, onItemClick, isEvenYear, currentLanguage = 'en' }) => {
  const isLastEvent = eventIndex === totalEvents - 1;
  const adjustedIndex = isEvenYear ? totalEvents - 1 - eventIndex : eventIndex;
  const isAlternate = adjustedIndex % 2 === 1;

  // Get the appropriate text based on current language
  const getTitle = () => {
    return currentLanguage === 'ar' && event.titleLocLang 
      ? event.titleLocLang 
      : event.title;
  };

  const getContents = () => {
    return currentLanguage === 'ar' && event.contentLocLang 
      ? event.contentLocLang 
      : event.contents;
  };

  return (
    <div className={`relative ${!isLastEvent ? "mb-8" : ""} `}>
      {!isLastEvent && (
        <div className="absolute left-1/2 top-full transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-purple-500 to-indigo-500"></div>
      )}

      <div 
        className={`group bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-purple-100 p-6 w-80 shadow-lg hover:shadow-2xl hover:border-purple-300 transition-all duration-300 hover:-translate-y-1 ${
          currentLanguage === 'ar' ? 'text-right' : 'text-left'
        }`}
        style={{ 
          marginLeft: currentLanguage === 'ar' ? '0' : '1rem',
          marginRight: currentLanguage === 'ar' ? '1rem' : '0',
          direction: currentLanguage === 'ar' ? 'rtl' : 'ltr'
        }}
      >
        <div className={`flex items-start gap-3 mb-4 ${
          isAlternate ? "flex-row-reverse" : "flex-row"
        }`}>
          {event.titlePic && (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
              <img
                src={event.titlePic}
                alt={getTitle()}
                className="w-6 h-6 object-contain"
              />
            </div>
          )}
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {getTitle()}
          </h3>
        </div>

        <p className="text-sm text-gray-600 mb-5 leading-relaxed">
          {getContents().substring(0, 140)}...
        </p>

        <div className={`${isAlternate ? "text-left" : "text-right"}`}>
          <Button
            onClick={() => onItemClick(event)}
            className="group/btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
          >
            {currentLanguage === 'en' ? 'View Details' : 'عرض التفاصيل'}
            <ChevronRight className={`w-4 h-4 group-hover/btn:translate-x-1 transition-transform ${
              currentLanguage === 'ar' ? 'rotate-180' : ''
            }`} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;