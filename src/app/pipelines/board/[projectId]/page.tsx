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
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1" },
    { id: 2, title: "Task 2" },
    { id: 3, title: "Task 3" },
  ]);

  const getTaskPosition = (id: number) => tasks.findIndex((t) => t.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Convert active.id and over.id to numbers before using as indices
    const fromIndex = getTaskPosition(Number(active.id));
    const toIndex = getTaskPosition(Number(over.id));

    setTasks((t) => arrayMove(t, fromIndex, toIndex));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <div className="min-h-screen p-6">
      <h1 className="mb-6 text-2xl font-bold">Kanban Board</h1>

      {/* Scrollable horizontal container */}
      <div className="overflow-x-auto bg-slate-600">
        {/* Row that expands based on children width */}
        <div className="flex w-max gap-4">
          <DndContext
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <div className="w-[400px] flex-shrink-0">
              <Column tasks={tasks} />
            </div>
            <div className="w-[400px] flex-shrink-0">
              <Column tasks={tasks} />
            </div>
            <div className="w-[400px] flex-shrink-0">
              <Column tasks={tasks} />
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
