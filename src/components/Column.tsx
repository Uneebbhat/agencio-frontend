import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "./Task";

interface Task {
  id: number;
  title: string;
}

const Column = ({
  className = "",
  tasks,
}: {
  className?: string;
  tasks: Task[];
}) => {
  return (
    <>
      <div
        className={`rounded shadow ${className} bg-gray-100 p-4 flex flex-col gap-4`}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task: Task) => (
            <Task id={task.id} title={task.title} key={task.id} />
          ))}
        </SortableContext>
      </div>
    </>
  );
};

export default Column;
