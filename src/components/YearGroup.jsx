
import React, { useState } from "react";
import EventCard from "./EventCard";

const YearGroup = ({ year, events, yearIndex, onItemClick, isEvenYear,currentLanguage = 'en'  }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const orderedEvents = isEvenYear ? [...events].reverse() : events;

  return (
    <div className="relative flex-shrink-0" style={{ width: "320px" }}>
      {/* Timeline dot */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full border-4 border-white shadow-xl z-20 animate-pulse"></div>
      
      {/* Year label */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent px-3 py-1 z-10 ${
          isEvenYear ? "bottom-20" : "top-20"
        }`}
      >
        {year}
      </div>

      {/* Events container */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 ${
          isEvenYear ? "bottom-full mb-32" : "top-full mt-32"
        } ${!isExpanded ? "hidden" : ""}`}
      >
        <div className="max-h-[500px] overflow-y-auto  space-y-4 px-2 custom-scrollbar-minimal">
          {orderedEvents.map((event, eventIndex) => (
            <EventCard
              key={event.id}
              event={event}
              eventIndex={eventIndex}
              totalEvents={events.length}
              onItemClick={onItemClick}
              isEvenYear={isEvenYear}
                          currentLanguage={currentLanguage}

            />
          ))}
        </div>
      </div>

      {/* Connector line */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-purple-500 to-indigo-500 ${
          isEvenYear ? "bottom-0 h-24" : "top-0 h-24"
        }`}
      ></div>
    </div>
  );
};

export default YearGroup;
