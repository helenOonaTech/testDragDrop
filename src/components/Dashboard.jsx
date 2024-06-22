// src/components/Dashboard.jsx
// import React, { useState } from "react";
// import GridLayout from "react-grid-layout";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
// // import "./Dashboard.css";

// const Dashboard = () => {
//   const [layout, setLayout] = useState([
//     { i: "a", x: 1, y: 0, w: 2, h: 2 },
//     { i: "b", x: 2, y: 0, w: 2, h: 2 },
//     { i: "c", x: 4, y: 0, w: 2, h: 2 },
//   ]);
//   const [isEditable, setIsEditable] = useState(true);
//   const [sideSection, setSideSection] = useState([]);

//   const onLayoutChange = (newLayout) => {
//     console.log(newLayout);

//     setLayout(newLayout);
//   };

//   const handleSave = () => {
//     setIsEditable(false);
//   };

//   const handleEdit = () => {
//     setIsEditable(true);
//   };
//   console.log(layout);
//   const moveToSideSection = (itemId) => {
//     console.log("moveToSideSection");
//     setSideSection([...sideSection, itemId]);
//     setLayout(layout.filter((item) => item.i !== itemId));
//   };

//   const moveToMainSection = (itemId) => {
//     console.log("moveToMainSection");

//     const newItem = { i: itemId, x: 0, y: Infinity, w: 2, h: 2 };
//     setLayout([...layout, newItem]);
//     setSideSection(sideSection.filter((id) => id !== itemId));
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="controls">
//         {isEditable ? (
//           <button onClick={handleSave}>Save</button>
//         ) : (
//           <button onClick={handleEdit}>Edit</button>
//         )}
//       </div>
//       <div className="main-section">
//         <GridLayout
//           className="layout"
//           layout={layout}
//           onLayoutChange={onLayoutChange}
//           cols={12}
//           rowHeight={30}
//           width={1200}
//           isDraggable={isEditable}
//           isResizable={isEditable}
//         >
//           {layout.map((item) => (
//             <div
//               key={item.i}
//               className="widget"
//               style={{ position: "relative !important" }}
//             >
//               {item.i}
//               {isEditable && (
//                 <button
//                   onClick={() => moveToSideSection(item.i)}
//                   className="remove-btn"
//                   style={{ position: "absolute", zIndex: "10000" }}
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//           ))}
//         </GridLayout>
//       </div>
//       {isEditable && (
//         <div className="side-section">
//           <h3>Side Section</h3>
//           {sideSection.map((itemId) => (
//             <div key={itemId} className="side-widget">
//               {itemId}
//               <button
//                 onClick={() => moveToMainSection(itemId)}
//                 className="add-btn"
//               >
//                 Add
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// src/components/Dashboard.jsx
// src/components/Dashboard.jsx
// src/components/Dashboard.jsx
// src/components/Dashboard.jsx
// import React, { useState } from "react";
// import GridLayout from "react-grid-layout";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
// // import './Dashboard.css';
// import DraggableWidget from "./DraggableWidget";
// import DroppableArea from "./DroppableArea";

// const Dashboard = () => {
//   const [layout, setLayout] = useState([
//     { i: "a", x: 0, y: 0, w: 2, h: 2 },
//     { i: "b", x: 2, y: 0, w: 2, h: 2 },
//     { i: "c", x: 4, y: 0, w: 2, h: 2 },
//   ]);
//   const [isEditable, setIsEditable] = useState(true);
//   const [sideSection, setSideSection] = useState([]);

//   const onLayoutChange = (newLayout) => {
//     setLayout(newLayout);
//   };

//   const handleSave = () => {
//     setIsEditable(false);
//   };

//   const handleEdit = () => {
//     setIsEditable(true);
//   };

//   const handleDropToSideSection = (id) => {
//     console.log(";handleDropToSideSection");
//     if (!sideSection.includes(id)) {
//       setSideSection([...sideSection, id]);
//       setLayout(layout.filter((item) => item.i !== id));
//     }
//   };

//   const handleDropToMainSection = (id) => {
//     console.log(";handleDropToMainSection");
//     const newItem = { i: id, x: 0, y: Infinity, w: 2, h: 2 };
//     setLayout([...layout, newItem]);
//     setSideSection(sideSection.filter((itemId) => itemId !== id));
//   };

//   const renderMainSection = () => (
//     <DroppableArea onDrop={handleDropToMainSection} className="main-section">
//       <GridLayout
//         className="layout"
//         layout={layout}
//         onLayoutChange={onLayoutChange}
//         cols={12}
//         rowHeight={30}
//         width={1200}
//         isDraggable={isEditable}
//         isResizable={isEditable}
//       >
//         {layout.map((item) => (
//           <div key={item.i} className="widget">
//             <DraggableWidget id={item.i}>{item.i}</DraggableWidget>
//           </div>
//         ))}
//       </GridLayout>
//     </DroppableArea>
//   );

//   const renderSideSection = () => (
//     <div className="side-section">
//       <h3>Side Section</h3>
//       <DroppableArea onDrop={handleDropToSideSection}>
//         {sideSection.map((itemId) => (
//           <div key={itemId} className="side-widget">
//             <DraggableWidget id={itemId} isResizable={false}>
//               {itemId}
//             </DraggableWidget>
//           </div>
//         ))}
//       </DroppableArea>
//     </div>
//   );

//   return (
//     <div className="dashboard-container">
//       <div className="controls">
//         {isEditable ? (
//           <button onClick={handleSave}>Save</button>
//         ) : (
//           <button onClick={handleEdit}>Edit</button>
//         )}
//       </div>
//       {renderMainSection()}
//       {isEditable && renderSideSection()}
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ItemType = {
  WIDGET: "widget",
};

const Widget = ({ item, isEditable, moveToSideSection }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.WIDGET,
    item: { id: item.i },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="widget"
      style={{
        position: "relative !important",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {item.i}
      {isEditable && (
        <button
          onClick={() => moveToSideSection(item.i)}
          className="remove-btn"
          style={{ position: "absolute", zIndex: "10000" }}
        >
          Remove
        </button>
      )}
    </div>
  );
};

const SideSection = ({ sideSection, moveToMainSection }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType.WIDGET,
    drop: (draggedItem) => moveToMainSection(draggedItem.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="side-section" ref={drop} style={{ backgroundColor: isOver ? "#e0e0e0" : "#fff" }}>
      <h3>Side Section</h3>
      {sideSection.map((itemId) => (
        <div key={itemId} className="side-widget">
          {itemId}
          <button onClick={() => moveToMainSection(itemId)} className="add-btn">
            Add
          </button>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const [layout, setLayout] = useState([
    { i: "a", x: 1, y: 0, w: 2, h: 2 },
    { i: "b", x: 2, y: 0, w: 2, h: 2 },
    { i: "c", x: 4, y: 0, w: 2, h: 2 },
  ]);
  const [isEditable, setIsEditable] = useState(true);
  const [sideSection, setSideSection] = useState([]);

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const handleSave = () => {
    setIsEditable(false);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const moveToSideSection = (itemId) => {
    setSideSection([...sideSection, itemId]);
    setLayout(layout.filter((item) => item.i !== itemId));
  };

  const moveToMainSection = (itemId) => {
    const newItem = { i: itemId, x: 0, y: Infinity, w: 2, h: 2 };
    setLayout([...layout, newItem]);
    setSideSection(sideSection.filter((id) => id !== itemId));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="dashboard-container">
        <div className="controls">
          {isEditable ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </div>
        <div className="main-section">
          <GridLayout
            className="layout"
            layout={layout}
            onLayoutChange={onLayoutChange}
            cols={12}
            rowHeight={30}
            width={1200}
            isDraggable={isEditable}
            isResizable={isEditable}
          >
            {layout.map((item) => (
              <Widget
                key={item.i}
                item={item}
                isEditable={isEditable}
                moveToSideSection={moveToSideSection}
              />
            ))}
          </GridLayout>
        </div>
        {isEditable && (
          <SideSection
            sideSection={sideSection}
            moveToMainSection={moveToMainSection}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default Dashboard;
