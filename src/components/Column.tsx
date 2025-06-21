import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "./Task";

const Column = ({
  className = "",
  tasks,
}: {
  className?: string;
  // @ts-expect-error
  tasks: any[];
}) => {
  return (
    <>
      <div
        className={`rounded shadow ${className} bg-gray-100 p-4 flex flex-col gap-4`}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map(
            (
              // @ts-expect-error
              task: any
            ) => (
              <Task id={task.id} title={task.title} key={task.id} />
            )
          )}
        </SortableContext>
      </div>
    </>
  );
};

export default Column;
