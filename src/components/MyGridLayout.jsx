import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
// import "./styles.css"; // Ensure this file includes your CSS

const ItemType = "BOX";

const DraggableBox = ({ id, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} className="box draggable-box" style={{ opacity }}>
      {children}
    </div>
  );
};

const DroppableArea = ({ onDrop, children }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => {
      onDrop(item.id);
    },
  });

  return (
    <div ref={drop} className="droppable-area">
      {children}
    </div>
  );
};

const GridArea = ({ layout, editMode, onDrop }) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item) => {
      onDrop(item.id);
    },
  });

  return (
    <div ref={drop} className="grid-area">
      <h2>Grid Area</h2>
      <GridLayout
        className="layout"
        layout={layout}
        cols={6}
        rowHeight={30}
        width={1200}
        isDraggable={editMode}
        isResizable={editMode}
      >
        {layout.map((box) => (
          <div key={box.i} className="box">
            <DraggableBox id={box.i}>Box {box.i}</DraggableBox>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

const MyGridLayout = () => {
  const initialLayout = [
    { i: "1", x: 0, y: 0, w: 1, h: 2 },
    { i: "2", x: 2, y: 0, w: 2, h: 2 },
    { i: "3", x: 4, y: 0, w: 3, h: 2 },
    { i: "4", x: 0, y: 2, w: 2, h: 2 },
    { i: "5", x: 2, y: 2, w: 1, h: 2 },
    { i: "6", x: 4, y: 2, w: 1, h: 2 },
  ];

  const [layout, setLayout] = useState(initialLayout);
  const [editMode, setEditMode] = useState(false);
  const [droppedItems, setDroppedItems] = useState([]); // Prepopulate with some box IDs

  const handleDropToArea = (id) => {
    if (!droppedItems.includes(id)) {
      setDroppedItems((prev) => [...prev, id]);
      setLayout((prevLayout) => prevLayout.filter((item) => item.i !== id));
    }
  };

  const handleDropToGrid = (id) => {
    if (!layout.some((item) => item.i === id)) {
      const newItem = initialLayout.find((item) => item.i === id);
      if (newItem) {
        setLayout((prevLayout) => [...prevLayout, newItem]);
      }
      setDroppedItems((prevItems) => prevItems.filter((item) => item !== id));
    }
  };

  const handleEditToggle = () => {
    setEditMode((prev) => !prev);
  };

  const handleSave = () => {
    console.log("Layout saved:", layout);
    console.log("Dropped items:", droppedItems);
    setEditMode(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <button onClick={handleEditToggle}>{editMode ? "Save" : "Edit"}</button>
        {editMode && <button onClick={handleSave}>Save</button>}
        <div className="container">
          {editMode && (
            <DroppableArea onDrop={handleDropToArea}>
              <h2>Drop Area</h2>
              {droppedItems.map((id) => (
                <DraggableBox key={id} id={id}>
                  Box {id}
                </DraggableBox>
              ))}
            </DroppableArea>
          )}

          <GridArea
            layout={layout}
            editMode={editMode}
            onDrop={handleDropToGrid}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default MyGridLayout;
