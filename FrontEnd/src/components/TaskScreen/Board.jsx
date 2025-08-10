import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCenter,
  useDndMonitor,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import Column from "./Column";
import TaskCard from "./TaskCard";
import { fetchBoardData } from "./data/taskScreenService";
// import { initialData } from "./data/mockData";

// Mathematical logic for visual indicator and insertion:
// For the card being hovered (over.id), get its bounding rect (top, height).
// Calculate its vertical midpoint: midY = rect.top + rect.height / 2
// If pointerY < midY, highlight top and insert above (index = toIdx)
// If pointerY >= midY, highlight bottom and insert below (index = toIdx + 1)

// Revert to previous working logic for drop indicator and insertion
function DndMonitor({ setDropLineIndex, setDropLineCol, data }) {
  useDndMonitor({
    onDragMove(event) {
      const { active, over } = event;
      if (!over || !active) {
        setDropLineIndex(null);
        setDropLineCol(null);
        return;
      }
      let colId, idx;
      if (typeof over.id === 'string' && over.id.includes(':')) {
        [colId, idx] = over.id.split(':');
        idx = parseInt(idx, 10);
        const overElement = document.querySelector(`[data-card-id='${over.id}']`);
        if (overElement && event.activatorEvent && event.activatorEvent.clientY) {
          const rect = overElement.getBoundingClientRect();
          const pointerY = event.activatorEvent.clientY;
          const midY = rect.top + rect.height / 2;
          if (pointerY < midY) {
            setDropLineIndex(idx);
            setDropLineCol(colId);
          } else {
            setDropLineIndex(idx + 1);
            setDropLineCol(colId);
          }
        } else {
          setDropLineIndex(null);
          setDropLineCol(null);
        }
      } else {
        // Dropping on column background (not a card)
        colId = over.id;
        // Find the column DOM node
        const colElement = document.querySelector(`[data-column-id='${colId}']`);
        if (colElement && event.activatorEvent && event.activatorEvent.clientY) {
          const rect = colElement.getBoundingClientRect();
          const pointerY = event.activatorEvent.clientY;
          // If pointer is in top 20px of column, treat as top
          if (pointerY < rect.top + 20) {
            setDropLineIndex(0);
            setDropLineCol(colId);
          // If pointer is in bottom 20px of column, treat as bottom
          } else if (pointerY > rect.bottom - 20) {
            const taskCount = data.columns[colId]?.taskIds.length || 0;
            setDropLineIndex(taskCount);
            setDropLineCol(colId);
          } else {
            setDropLineIndex(null);
            setDropLineCol(colId);
          }
        } else {
          setDropLineIndex(null);
          setDropLineCol(colId);
        }
      }
    },
    onDragEnd() {
      setDropLineIndex(null);
      setDropLineCol(null);
    },
    onDragCancel() {
      setDropLineIndex(null);
      setDropLineCol(null);
    }
  });
  return null;
}

const Board = ({ sprintId, projectId }) => {
  const emptyBoard = {
  columnOrder: [],
  columns: {},
  tasks: {}
};

const [data, setData] = useState(emptyBoard);
  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);
  const [dropLineIndex, setDropLineIndex] = useState(null);
  const [dropLineCol, setDropLineCol] = useState(null);
  const lastPointerY = useRef(null);
  const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);


  useEffect(() => {
    if (!sprintId && !projectId) return;

    const loadData = async () => {
      setLoading(true);
      setError(null);
      console.log("This runs")
      try {
        const fetchedData = await fetchBoardData(sprintId, projectId);
        console.log(data)
        console.log(`fetched data: ${fetchedData}`)
        console.log(data)
        setData(fetchedData);
        console.log("This runs in try")
      } catch (err) {
        // console.log(err)
        console.log("This runs whenever an err is caught")
        setError("Error loading board data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [sprintId, projectId]);

  // Add updateTask function
  const updateTask = (taskId, updates) => {
    setData(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [taskId]: {
          ...prev.tasks[taskId],
          ...updates,
        },
      },
    }));
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    setOverId(null);
    setDropLineIndex(null);
    setDropLineCol(null);
    if (!over) return;

    const [fromCol, fromIdx] = active.id.split(":");
    let toCol, toIdx;
    let insertAt = null;

    if (typeof over.id === 'string' && over.id.includes(':')) {
      [toCol, toIdx] = over.id.split(":");
      toIdx = parseInt(toIdx, 10);
      // Unified: always use dropLineIndex if set
      insertAt = (dropLineCol === toCol && dropLineIndex !== null) ? dropLineIndex : data.columns[toCol].taskIds.length;
    } else {
      toCol = over.id;
      // Unified: always use dropLineIndex if set
      insertAt = (dropLineCol === toCol && dropLineIndex !== null) ? dropLineIndex : data.columns[toCol].taskIds.length;
    }

    const sourceTaskId = data.columns[fromCol].taskIds[parseInt(fromIdx, 10)];

    if (fromCol === toCol && parseInt(fromIdx, 10) === insertAt) return;

    if (fromCol === toCol) {
      const newTaskIds = Array.from(data.columns[fromCol].taskIds);
      const from = parseInt(fromIdx, 10);
      let to = insertAt;
      newTaskIds.splice(from, 1);
      // If moving down, adjust for shifted indices
      if (to > from) to--;
      newTaskIds.splice(to, 0, sourceTaskId);

      setData(prev => ({
        ...prev,
        columns: {
          ...prev.columns,
          [fromCol]: { ...prev.columns[fromCol], taskIds: newTaskIds },
        },
      }));
    } else {
      const sourceTaskIds = Array.from(data.columns[fromCol].taskIds);
      sourceTaskIds.splice(parseInt(fromIdx, 10), 1);

      const targetTaskIds = Array.from(data.columns[toCol].taskIds);
      targetTaskIds.splice(insertAt, 0, sourceTaskId);

      setData(prev => {
        // Get the new status from the target column's title
        const newStatus = prev.columns[toCol].title;
 
        return {
          ...prev,
          columns: {
            ...prev.columns,
            [fromCol]: { ...prev.columns[fromCol], taskIds: sourceTaskIds },
            [toCol]: { ...prev.columns[toCol], taskIds: targetTaskIds },
          },
          tasks: {
            ...prev.tasks,
            [sourceTaskId]: {
              ...prev.tasks[sourceTaskId],
              status: newStatus,
            },
          },
        };
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <DndMonitor setDropLineIndex={setDropLineIndex} setDropLineCol={setDropLineCol} data={data} />
      <Box
        display="flex"
        width="100%"
        height="100%"
        gap={2}
        sx={{
          overflowX: 'auto',
        }}
      >
        {data.columnOrder.map(colId => (
          <SortableContext
            key={colId}
            items={data.columns[colId].taskIds.map((_, idx) => `${colId}:${idx}`)}
            strategy={rectSortingStrategy}
          >
            <Box
              flex={1}
              minWidth={"280px"}
              maxWidth={"400px"}
              display="flex"
              flexDirection="column"
              height="100%"
            >
              <Column
                sprintId={sprintId} 
                projectId={projectId}
                column={data.columns[colId]}
                tasks={data.columns[colId].taskIds.map((id, idx) => {
                  const cardId = `${colId}:${idx}`;
                  return {
                    ...data.tasks[id],
                    _cardId: cardId,
                  };
                })}
                dropLineIndex={dropLineCol === colId ? dropLineIndex : null}
                updateTask={updateTask}
              />
            </Box>
          </SortableContext>
        ))}
      </Box>

      <DragOverlay>
        {activeId && (() => {
          const [colId, idx] = activeId.split(":");
          const task = data.tasks[data.columns[colId].taskIds[parseInt(idx, 10)]];
          return <TaskCard sprintId={sprintId} projectId={projectId} task={task} index={parseInt(idx, 10)} columnId={colId} overlay />;
        })()}
      </DragOverlay>
    </DndContext>
  );
};

export default Board;