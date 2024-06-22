// src/components/DroppableArea.jsx
import React from "react";
import { useDrop } from "react-dnd";

const DroppableArea = ({ onDrop, children, className }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "WIDGET",
    drop: (item) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={className}
      style={{ background: isOver ? "#e0e0e0" : "transparent" }}
    >
      {children}
    </div>
  );
};

export default DroppableArea;
