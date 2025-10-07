

import React, { useState, useEffect, useRef } from "react";
import YearGroup from "./YearGroup";
import timelineData from "../timeLineData.json"; // remove this file if using api call for data fetching

const TimelineSection = ({ onItemClick, currentLanguage }) => {
  const [currentTimelineData, setCurrentTimelineData] = useState(timelineData);
  const [editingYear, setEditingYear] = useState(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const directionRef = useRef(1); // 1 for right, -1 for left

  const cardHeight = 220;
  const gapBetweenCards = 32;
  const yearLabelSpace = 80;
  const connectorLineHeight = 96;
  const safetyMargin = 20;

  const totalCardsHeight = cardHeight * 2;
  const topPadding =
    yearLabelSpace + connectorLineHeight + totalCardsHeight + safetyMargin;

  const handleEditClose = () => {
    setEditingYear(null);
  };

  // Initial vertical center scroll to show timeline
  useEffect(() => {
    const section = document.getElementById("timeline-section");
    if (!section) return;

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTo =
      sectionTop + sectionHeight / 2 - windowHeight / 2;

    window.scrollTo({
      top: scrollTo,
      behavior: "smooth",
    });
  }, []);

  // Auto-scroll animation
  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (!container || !currentTimelineData?.timeline) return;

  //   const scrollSpeed = 0.5; 
  //   const maxScroll = container.scrollWidth - container.clientWidth;

  //   const animateScroll = () => {
  //     if (directionRef.current === 1) {
  //       scrollPositionRef.current += scrollSpeed;
  //       if (scrollPositionRef.current >= maxScroll) {
  //         scrollPositionRef.current = maxScroll;
  //         directionRef.current = -1;
  //       }
  //     } else {
  //       scrollPositionRef.current -= scrollSpeed;
  //       if (scrollPositionRef.current <= 0) {
  //         scrollPositionRef.current = 0;
  //         directionRef.current = 1;
  //       }
  //     }

  //     container.scrollLeft = scrollPositionRef.current;
  //     animationRef.current = requestAnimationFrame(animateScroll);
  //   };

  //   const timeoutId = setTimeout(() => {
  //     animationRef.current = requestAnimationFrame(animateScroll);
  //   }, 100);

  //   return () => {
  //     clearTimeout(timeoutId);
  //     if (animationRef.current) {
  //       cancelAnimationFrame(animationRef.current);
  //     }
  //   };
  // }, [currentTimelineData]);
// Auto-scroll animation with pause on user interaction
useEffect(() => {
  const container = containerRef.current;
  if (!container || !currentTimelineData?.timeline) return;

  const scrollSpeed = 0.5; 
  const maxScroll = container.scrollWidth - container.clientWidth;

  let isPaused = false;

  const animateScroll = () => {
    if (!isPaused) {
      if (directionRef.current === 1) {
        scrollPositionRef.current += scrollSpeed;
        if (scrollPositionRef.current >= maxScroll) {
          scrollPositionRef.current = maxScroll;
          directionRef.current = -1;
        }
      } else {
        scrollPositionRef.current -= scrollSpeed;
        if (scrollPositionRef.current <= 0) {
          scrollPositionRef.current = 0;
          directionRef.current = 1;
        }
      }

      container.scrollLeft = scrollPositionRef.current;
    }
    animationRef.current = requestAnimationFrame(animateScroll);
  };

  // 👉 Pause/resume handlers
  const pauseScroll = () => {
    isPaused = true;
  };
  const resumeScroll = () => {
    isPaused = false;
  };

  // Attach listeners
  container.addEventListener("mousedown", pauseScroll);
  container.addEventListener("mouseup", resumeScroll);
  container.addEventListener("mouseleave", resumeScroll);
  container.addEventListener("touchstart", pauseScroll, { passive: true });
  container.addEventListener("touchend", resumeScroll);

  // Kick off animation
  animationRef.current = requestAnimationFrame(animateScroll);

  return () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    container.removeEventListener("mousedown", pauseScroll);
    container.removeEventListener("mouseup", resumeScroll);
    container.removeEventListener("mouseleave", resumeScroll);
    container.removeEventListener("touchstart", pauseScroll);
    container.removeEventListener("touchend", resumeScroll);
  };
}, [currentTimelineData]);

  return (
    <section
      id="timeline-section"
      className="relative min-h-screen overflow-hidden"
    >
      {/* 🔹 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/petropillar_qatar.mp4" type="video/mp4" />
      </video>

      {/* 🔹 Dark Overlay (optional for readability) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 🔹 Foreground Content */}
      <div className="relative z-10 container mx-auto px-4 py-10">
        <div
          ref={containerRef}
          className="relative overflow-x-auto overflow-y-visible scrollbar-hide"
          style={{
            paddingTop: `${topPadding}px`,
            paddingBottom: `${topPadding}px`,
            scrollBehavior: "auto",
          }}
        >
          <div
            className="flex items-center relative mx-auto min-w-max"
            style={{ width: `${currentTimelineData?.timeline?.length * 320}px` }}
          >
            {/* Central Guide Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform -translate-y-1/2 shadow-lg z-10"></div>

            {currentTimelineData?.timeline?.map((yearBlock, index) => (
              <div key={yearBlock.year} className="relative group">
                <YearGroup
                  year={yearBlock.year}
                  events={yearBlock.events}
                  yearIndex={index}
                  onItemClick={onItemClick}
                  isEvenYear={index % 2 === 0}
                  currentLanguage={currentLanguage}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TimelineSection;
