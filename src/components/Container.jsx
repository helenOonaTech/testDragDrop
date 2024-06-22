import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import Grid from "@mui/material/Grid";
import SortableItem from "./SortableItem";

// const containerStyle = {
//   background: "#dadada",
//   padding: 10,
//   margin: 10,
//   minHeight: "50px",
//   minWidth: "50px",
//   display: "block",
// };

export default function Container(props) {
  const { id, items } = props;
  console.log(items, id);
  const { setNodeRef } = useDroppable({
    id,
  });
  let properties = {
    direction: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "20px",
  };
  const widths = [
    "120px",
    "200px",
    "170px",
    "110px",
    "190px",
    "190px",
    "290px",
  ];
  const heights = [
    "200px",
    "110px",
    "170px",
    "290px",
    "190px",
    "120px",
    "190px",
  ];

  let strategy = { strategy: rectSortingStrategy };
  let itemWidth = "140px";
  if (items.length === 0) {
    // properties = {
    //   direction: "column",
    //   justifyContent: "flex-start",
    //   alignItems: "stretch"
    // };
    // itemWidth = "300px";
    strategy = { strategy: verticalListSortingStrategy };
  }

  const content = (
    <div ref={setNodeRef} style={{ backgroundColor: "pink" }}>
      <Grid
        container
        spacing={5}
        {...properties}
        sx={{
          marginTop: 1,
          backgroundColor: "green",
          minWidth: "100%",
          minHeight: "150px",
        }}
      >
        {items.map((id, index) => (
          <SortableItem
            key={id}
            id={id}
            width={widths[index]}
            height={heights[index]}
          />
        ))}
      </Grid>
    </div>
  );
  console.log("strategy", strategy);
  const dom = (
    <SortableContext
      id={id}
      items={items}
      style={{ backgroundColor: "gray" }}
      {...strategy}
    >
      {content}
    </SortableContext>
  );
  return dom;
}
