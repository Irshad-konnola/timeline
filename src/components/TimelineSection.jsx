// import React, { useState } from "react";
// import YearGroup from "./YearGroup";
// import timelineData from "../timelineData.json";
// import TimelineForm from "./TimelineForm";
// import { Button } from "./ui/button";
// import { Edit, Languages } from "lucide-react";

// const TimelineSection = ({ onItemClick, currentLanguage, setCurrentLanguage }) => {
//   const [currentTimelineData, setCurrentTimelineData] = useState(timelineData);
//   const [editingYear, setEditingYear] = useState(null);
//   const [isAddFormOpen, setIsAddFormOpen] = useState(false);

//   const maxEventsInYear = Math.max(...currentTimelineData.map(year => year.events.length));

//   const cardHeight = 220;
//   const gapBetweenCards = 32;
//   const yearLabelSpace = 80;
//   const connectorLineHeight = 96;
//   const safetyMargin = 20;

//   const totalCardsHeight = (cardHeight * 2);
//   const topPadding = yearLabelSpace + connectorLineHeight + totalCardsHeight + safetyMargin;

//   const getYearData = (year) => {
//     return currentTimelineData.find(item => item.year === year);
//   };

//   const handleEditClose = () => {
//     setEditingYear(null);
//   };

//   const toggleLanguage = () => {
//     setCurrentLanguage(currentLanguage === 'en' ? 'ar' : 'en');
//   };

//   return (
//     <section id="timeline-section" className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-indigo-50 py-20">
//       <div className="container mx-auto px-4">
//         <div className="flex items-start   justify-between mb-16">
//           <div>
//             <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-left">
//               Shell Qatar
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl text-left">
//               Navigate through the milestones that shaped our story
//             </p>
//           </div>

//           <div className="flex  items-center gap-4">
//             {/* Language Toggle Button */}
//             <Button
//               onClick={toggleLanguage}
//               variant="outline"
//               className="flex items-center gap-2"
//             >
//               <Languages className="w-4 h-4" />
//               {currentLanguage === 'en' ? 'العربية' : 'English'}
//             </Button>
// <div>
//  <Button className="group/btn bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2">
//               <Edit className="w-4 h-4 mr-2" />
//               Update Timeline
//             </Button>
// </div>
//             {/* Add Form button */}
//             {/* <div className="flex-shrink-0">
//               <TimelineForm
//                 timelineData={currentTimelineData}
//                 setTimelineData={setCurrentTimelineData}
//                 onClose={() => setIsAddFormOpen(false)}
//                 currentLanguage={currentLanguage}
//               />
//             </div> */}
//           </div>
//         </div>

//         <div
//           className="relative overflow-x-auto overflow-y-visible"
//           style={{
//             paddingTop: `${topPadding}px`,
//             paddingBottom: `${topPadding}px`
//           }}
//         >
//           <div
//             className="flex items-center relative mx-auto"
//             style={{ width: `${currentTimelineData.length * 320}px` }}
//           >
//             <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform -translate-y-1/2 shadow-lg"></div>

//             {currentTimelineData.map((yearBlock, index) => (
//               <div key={yearBlock.year} className="relative group">
//                 <YearGroup
//                   year={yearBlock.year}
//                   events={yearBlock.events}
//                   yearIndex={index}
//                   onItemClick={onItemClick}
//                   isEvenYear={index % 2 === 0}
//                   currentLanguage={currentLanguage}
//                 />

//                 {/* More events notification */}
//                 {yearBlock.events.length > 2 && (
//                   <div className={`absolute left-1/2 transform -translate-x-1/2 ${
//                     index % 2 === 0
//                       ? 'top-[calc(100%+10px)]'
//                       : 'bottom-[calc(100%+10px)]'
//                   }`}>
//                     <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg flex items-center gap-1 animate-pulse">
//                       <span>
//                         {currentLanguage === 'en'
//                           ? `+${yearBlock.events.length - 2} more`
//                           : `+${yearBlock.events.length - 2} المزيد`
//                         }
//                       </span>
//                     </div>
//                     {/* Arrow indicator */}
//                     <div className={`absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-transparent ${
//                       index % 2 === 0
//                         ? 'border-t-4 border-t-indigo-600 -top-1'
//                         : 'border-b-4 border-b-indigo-600 -bottom-1'
//                     }`}></div>
//                   </div>
//                 )}

//                 {/* Edit button - separate from the form */}
//                 <button
//                   onClick={() => setEditingYear(yearBlock.year)}
//                   className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
//                 >
//                   <Edit className="w-4 h-4 text-gray-600" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Edit Form - rendered separately */}
//         {/* {editingYear && (
//           <TimelineForm
//             timelineData={currentTimelineData}
//             setTimelineData={setCurrentTimelineData}
//             editData={getYearData(editingYear)}
//             onClose={handleEditClose}
//             currentLanguage={currentLanguage}
//           />
//         )} */}
//       </div>
//     </section>
//   );
// };

// export default TimelineSection;
import React, { useState } from "react";
import YearGroup from "./YearGroup";
import timelineData from "../timelineData.json"; // remove this file if using api call for data fetching

const TimelineSection = ({ onItemClick, currentLanguage }) => {
  const [currentTimelineData, setCurrentTimelineData] = useState(timelineData); //   const [currentTimelineData, setCurrentTimelineData] = useState(null);

  const [editingYear, setEditingYear] = useState(null);

  // const maxEventsInYear = Math.max(
  //   ...currentTimelineData.map((year) => year.events.length)
  // );

  const cardHeight = 220;
  const gapBetweenCards = 32;
  const yearLabelSpace = 80;
  const connectorLineHeight = 96;
  const safetyMargin = 20;

  const totalCardsHeight = cardHeight * 2;
  const topPadding =
    yearLabelSpace + connectorLineHeight + totalCardsHeight + safetyMargin;

  // const getYearData = (year) => {
  //   return currentTimelineData.find((item) => item.year === year);
  // };

  //  useEffect(() => {
  //   const fetchTimelineData = async () => {
  //     try {
  //       // Replace this URL with currect url
  //       const response = await fetch("https://example.com/api/timeline");
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch timeline data");
  //       }
  //       const data = await response.json();
  //       setCurrentTimelineData(data);
  //     } catch (error) {
  //       console.error("Error fetching timeline data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTimelineData();
  // }, []);

  const handleEditClose = () => {
    setEditingYear(null);
  };

  return (
    <section
      id="timeline-section"
      className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-indigo-50 py-10"
    >
      <div className="container mx-auto px-4 ">
        <div
          className="relative overflow-x-auto overflow-y-visible"
          style={{
            paddingTop: `${topPadding}px`,
            paddingBottom: `${topPadding}px`,
          }}
        >
          <div
            className="flex items-center relative mx-auto"
            style={{ width: `${currentTimelineData?.timeline?.length * 320}px` }}
          >
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform -translate-y-1/2 shadow-lg"></div>

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
    </section>
  );
};

export default TimelineSection;
