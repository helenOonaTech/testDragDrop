// src/components/DraggableWidget.jsx
import React from "react";
import { useDrag } from "react-dnd";

const DraggableWidget = ({ id, children, isResizable = true }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "WIDGET",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        resize: isResizable ? "both" : "none",
      }}
    >
      {children}
    </div>
  );
};

export default DraggableWidget;
