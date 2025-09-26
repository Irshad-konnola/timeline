import React, { useState } from "react";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import timelineData from "./timeLineData.json";

const YearGroup = ({ year, events, yearIndex, onItemClick, isEvenYear }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasMultipleEvents = events.length > 1;

  return (
    <div className="relative flex-shrink-0" style={{ width: "320px" }}>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full border-4 border-white shadow-lg z-20"></div>
      
      {/* Year Label */}
      <div className={`absolute left-1/2 transform -translate-x-1/2 text-xl font-bold text-gray-900 bg-white px-2 z-10 ${
        isEvenYear ? "bottom-20" : "top-20"
      }`}>
        {year}
      </div>


      {/* Events Container */}
      <div className={`absolute left-1/2 transform -translate-x-1/2 ${
        isEvenYear ? "bottom-full mb-24" : "top-full mt-24"
      } ${!isExpanded ? "hidden" : ""}`}>
        {events.map((event, eventIndex) => (
          <EventCard
            key={event.id}
            event={event}
            eventIndex={eventIndex}
            totalEvents={events.length}
            onItemClick={onItemClick}
            isEvenYear={isEvenYear}
          />
        ))}
      </div>

      {/* Connecting lines */}
      <div className={`absolute left-1/2 transform -translate-x-1/2 w-px bg-black ${
        isEvenYear ? "bottom-0 h-24" : "top-0 h-24"
      }`}></div>
    </div>
  );
};

const EventCard = ({ event, eventIndex, totalEvents, onItemClick, isEvenYear }) => {
  const isFirstEvent = eventIndex === 0;
  const isLastEvent = eventIndex === totalEvents - 1;

  return (
    <div className={`relative ${!isLastEvent ? "mb-8" : ""}`}>
      {/* Connector line between events */}
      {!isLastEvent && (
        <div className="absolute left-1/2 top-full transform -translate-x-1/2 w-px h-8 bg-black"></div>
      )}

      {/* Card */}
      <div className="bg-white border-4 border-black p-4 w-80 shadow-lg hover:shadow-xl transition-shadow duration-300 ml-4">
        <div className="flex items-start gap-3 mb-3">
          {event.titlePic && (
            <img
              src={event.titlePic}
              alt={event.title}
              className="w-8 h-8 object-contain"
            />
          )}
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {event.title}
          </h3>
        </div>

        <p className="text-sm text-gray-700 mb-4 leading-relaxed">
          {event.contents.substring(0, 140)}...
        </p>

        <div className="text-right">
          <button
            onClick={() => onItemClick(event)}
            className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

const Modal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white border-4 border-black max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
              <p className="text-lg font-semibold text-gray-600">{item.year}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Image */}
        {/* Media Content */}
{item.contentPic && (
  <img
    src={item.contentPic}
    alt={item.title}
    className="w-full h-64 object-cover border-2 border-gray-300 mb-4"
  />
)}

{item.contentVideo && (
  <video
    src={item.contentVideo}
    controls
    className="w-full max-h-[400px] object-contain border-2 border-gray-300 mb-4"
  />
)}


          {/* Content */}
          <p className="text-gray-800 leading-relaxed text-lg">
            {item.contents}
          </p>
        </div>
      </div>
    </div>
  );
};

const Timeline = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const maxEventsInYear = Math.max(...timelineData.map(year => year.events.length));
  const topPadding = 200 + (maxEventsInYear * 200); 

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 py-20">
          Timeline of Innovation
        </h1>

        <div 
          className="relative overflow-x-auto overflow-y-visible"
          style={{ 
            paddingTop: `${topPadding}px`,
            paddingBottom: `${topPadding}px` 
          }}
        >
          {/* Main Timeline Line */}
          <div
            className="flex items-center relative mx-auto"
            style={{ width: `${timelineData.length * 320}px` }}
          >
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-black transform -translate-y-1/2"></div>

            {timelineData.map((yearBlock, index) => (
              <YearGroup
                key={yearBlock.year}
                year={yearBlock.year}
                events={yearBlock.events}
                yearIndex={index}
                onItemClick={setSelectedItem}
                isEvenYear={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};

export default Timeline;