// import {
//   DndContext,
//   DragOverlay,
//   KeyboardSensor,
//   PointerSensor,
//   TouchSensor,
//   closestCorners,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { useState } from "react";

import MyGridLayout from "./components/MyGridLayout";

// import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
// import { isMobile } from "react-device-detect";

// // import { Item } from "./sortable_item";
// import Container from "./components/Container";
// import { Item } from "./components/SortableItem";

// const wrapperStyle = {
//   overscrollBehavior: "contain",
// };

// const defaultAnnouncements = {
//   onDragStart(id) {
//     console.log(`Picked up draggable item ${id}.`);
//   },
//   onDragOver(id, overId) {
//     if (overId) {
//       console.log(
//         `Draggable item ${id} was moved over droppable area ${overId}.`
//       );
//       return;
//     }

//     console.log(`Draggable item ${id} is no longer over a droppable area.`);
//   },
//   onDragEnd(id, overId) {
//     if (overId) {
//       console.log(
//         `Draggable item ${id} was dropped over droppable area ${overId}`
//       );
//       return;
//     }

//     console.log(`Draggable item ${id} was dropped.`);
//   },
//   onDragCancel(id) {
//     console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
//   },
// };

// export default function App() {
//   const [visible, toggleVisible] = useState(true);
//   const [items, setItems] = useState({
//     unranked: ["4", "5", "6", "7"],
//     // container1: [],
//     container2: ["1", "2", "3"],
//     // container3: [],
//   });
//   const [activeId, setActiveId] = useState();

//   const desktopSensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );
//   const mobileSensors = useSensors(
//     useSensor(TouchSensor, {
//       activationConstraint: {
//         delay: 250,
//         tolerance: 5,
//       },
//     })
//   );
//   const [editing, setEdit] = useState(false);
//   return (
//     <div style={wrapperStyle}>
//       <button onClick={() => setEdit(!editing)}>
//         {editing ? "Save" : "Edit"}
//       </button>
//       <DndContext
//         announcements={defaultAnnouncements}
//         sensors={isMobile ? mobileSensors : desktopSensors}
//         collisionDetection={closestCorners}
//         onDragStart={handleDragStart}
//         onDragOver={handleDragOver}
//         onDragEnd={handleDragEnd}
//         onDragMove={handleDragMove}
//       >
//         {/* mobile:{isMobile === true ? "YES" : "NOPE"} */}
//         {Object.keys(items).map((item) => {
//           if (items[item].length == 0) {
//             items[item].push("ADD_PH_" + item);
//           }

//           // if (item === "unranked" && !visible) {
//           //   return (
//           //     <Container
//           //       id={item}
//           //       key={item}
//           //       items={items[item].filter((x) => parseInt(x, 10) > 10)}
//           //     />
//           //   );
//           // } else
//           // return <Container id={item} key={item} items={items[item]} />;
//         })}
//         <Container id={"unranked"} key={"unranked"} items={items.unranked} />
//         {editing ? (
//           <Container
//             id={"container2"}
//             key={"container2"}
//             items={items.container2}
//           />
//         ) : (
//           ""
//         )}

//         {/* <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay> */}
//       </DndContext>
//       {/* <button
//         style={{ width: "100px", height: "40px" }}
//         onClick={() => {
//           toggleVisible(!visible);
//         }}
//       >
//         CLICK. cur show all: {visible ? "yes" : "no"}
//       </button> */}
//     </div>
//   );

//   function findContainer(id) {
//     console.log(`find container`);
//     if (id in items) {
//       return id;
//     }

//     return Object.keys(items).find((key) => items[key].includes(id));
//   }

//   function handleDragStart(event) {
//     if (event.active.id.startsWith("ADD_PH_")) return;
//     console.log(`Drag start`, event);
//     const { active } = event;
//     const { id } = active;

//     setActiveId(id);
//   }
//   function handleDragMove(event) {
//     if (event.active.id.startsWith("ADD_PH_")) return;
//     // console.log(`Drag move`, event);
//   }
//   function handleDragOver(event) {
//     if (event.active.id.startsWith("ADD_PH_")) return;
//     console.log(`Drag over`, event);
//     const { active, over, draggingRect } = event;
//     const { id } = active;
//     if (over === null) return;
//     const { id: overId } = over;

//     // Find the containers
//     const activeContainer = findContainer(id);
//     const overContainer = findContainer(overId);

//     if (overId.startsWith("ADD_PH_")) {
//       console.log("Replacing empty");
//       setItems((prev) => {
//         const activeItems = prev[activeContainer];

//         // Find the indexes for the items
//         const activeIndex = activeItems.indexOf(id);
//         console.log("AI", activeIndex);
//         // let newIndex = 0;

//         return {
//           ...prev,
//           [activeContainer]: [
//             ...prev[activeContainer].filter((item) => item !== active.id),
//           ],
//           [overContainer]: [items[activeContainer][activeIndex]],
//         };
//       });
//       return;
//     }
//     if (
//       !activeContainer ||
//       !overContainer ||
//       activeContainer === overContainer
//     ) {
//       if (!overContainer) {
//         console.log(event);
//         console.log("No over container");
//       }
//       return;
//     }

//     setItems((prev) => {
//       const activeItems = prev[activeContainer];
//       const overItems = prev[overContainer];

//       // Find the indexes for the items
//       const activeIndex = activeItems.indexOf(id);
//       const overIndex = overItems.indexOf(overId);
//       console.log("AI", activeIndex);
//       console.log("OI", overIndex);
//       let newIndex;
//       if (overId in prev) {
//         // We're at the root droppable of a container
//         newIndex = overItems.length + 1;
//       } else {
//         const isBelowLastItem =
//           over &&
//           overIndex === overItems.length - 1 &&
//           draggingRect?.offsetTop > over?.rect?.offsetTop + over?.rect?.height;

//         const modifier = isBelowLastItem ? 1 : 0;

//         newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
//       }

//       return {
//         ...prev,
//         [activeContainer]: [
//           ...prev[activeContainer].filter((item) => item !== active.id),
//         ],
//         [overContainer]: [
//           ...prev[overContainer].slice(0, newIndex),
//           items[activeContainer][activeIndex],
//           ...prev[overContainer].slice(newIndex, prev[overContainer].length),
//         ],
//       };
//     });
//   }

//   function handleDragEnd(event) {
//     if (event.active.id.startsWith("ADD_PH_")) return;
//     console.log(`drag end`, event);
//     const { active, over } = event;
//     const { id } = active;
//     const { id: overId } = over;

//     const activeContainer = findContainer(id);
//     const overContainer = findContainer(overId);

//     if (
//       !activeContainer ||
//       !overContainer ||
//       activeContainer !== overContainer
//     ) {
//       if (!overContainer) {
//         console.log(event);
//         console.log("No over container");
//       }
//       return;
//     }

//     const activeIndex = items[activeContainer].indexOf(active.id);
//     const overIndex = items[overContainer].indexOf(overId);

//     if (activeIndex !== overIndex) {
//       setItems((items) => ({
//         ...items,
//         [overContainer]: arrayMove(
//           items[overContainer],
//           activeIndex,
//           overIndex
//         ),
//       }));
//     }

//     setActiveId(null);
//   }
// }
export default function App() {
  return (
    <>
      <MyGridLayout />
    </>
  );
}
