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
  columnTitle,
}: {
  className?: string;
  tasks: Task[];
  columnTitle: string;
}) => {
  const getTitleStyle = (title: string) => {
    switch (title.toLowerCase()) {
      case "todo":
        return "bg-gray-200 text-gray-800 border border-gray-600";
      case "in progress":
        return "bg-blue-200 text-blue-800 border border-blue-600";
      case "done":
        return "bg-green-200 text-green-800 border border-green-600";
      default:
        return "text-black";
    }
  };

  const getTitleCircleStyle = (title: string) => {
    switch (title.toLowerCase()) {
      case "todo":
        return "bg-gray-800";
      case "in progress":
        return "bg-blue-800";
      case "done":
        return "bg-green-800";
      default:
        return "text-black";
    }
  };

  return (
    <div
      className={`rounded shadow ${className} bg-gray-100 p-4 flex flex-col gap-4 w-[300px]`}
    >
      <h2 className="">
        <span
          className={`${getTitleStyle(
            columnTitle
          )} py-1 px-3 rounded-full text-sm inline-flex items-center gap-2`}
        >
          <span
            className={`${getTitleCircleStyle(
              columnTitle
            )} w-2 h-2 rounded-full inline-block`}
          ></span>
          {columnTitle}
        </span>
      </h2>

      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task: Task) => (
          <Task id={task.id} title={task.title} key={task.id} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Column;
