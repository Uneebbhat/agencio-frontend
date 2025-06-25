"use client";

import {
  DndContext,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import Column from "@/components/Column";
import React, { useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";

const KanbanBoard = () => {
  const [columns, setColumns] = useState([
    {
      columnTitle: "Todo",
      tasks: [
        { id: 4, title: "Create Dashboard" },
        { id: 5, title: "Create Reset Password Ui" },
      ],
    },
    {
      columnTitle: "In Progress",
      tasks: [
        { id: 6, title: "Create a GitHub repo" },
        { id: 7, title: "Get the Gemini API" },
        { id: 8, title: "Meeting with client" },
        { id: 9, title: "Coffee break" },
      ],
    },
    {
      columnTitle: "Done",
      tasks: [
        { id: 10, title: "Settings Page" },
        { id: 11, title: "Profile Page" },
      ],
    },
  ]);

  // Find the column and task index for a given task id
  const findTaskLocation = (id: number) => {
    for (let colIdx = 0; colIdx < columns.length; colIdx++) {
      const taskIdx = columns[colIdx].tasks.findIndex((t) => t.id === id);
      if (taskIdx !== -1) {
        return { colIdx, taskIdx };
      }
    }
    return null;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = Number(active.id);
    const overId = Number(over.id);

    const fromLoc = findTaskLocation(activeId);
    const toLoc = findTaskLocation(overId);

    if (!fromLoc || !toLoc) return;

    setColumns((prevColumns) => {
      const columnsCopy = prevColumns.map((col) => ({
        ...col,
        tasks: [...col.tasks],
      }));

      // Remove the task from its original location
      const [movedTask] = columnsCopy[fromLoc.colIdx].tasks.splice(
        fromLoc.taskIdx,
        1
      );

      // Insert the task into the new location
      columnsCopy[toLoc.colIdx].tasks.splice(toLoc.taskIdx, 0, movedTask);

      return columnsCopy;
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <div className="min-h-screen p-6">
      <h1 className="mb-6 text-2xl font-bold">Kanban Board</h1>

      <div>
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <div className="bg-gray-200 overflow-x-auto">
            <div className="flex items-start justify-start gap-4 w-max min-w-0 p-4">
              {columns.map((column) => (
                <Column tasks={column.tasks} columnTitle={column.columnTitle} />
              ))}
            </div>
          </div>
        </DndContext>
      </div>
    </div>
  );
};

export default KanbanBoard;
