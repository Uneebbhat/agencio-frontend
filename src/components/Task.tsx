import React from 'react'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

const Task = ({ id, title }: { id: number, title: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className='bg-white rounded-[8px] p-4 shadow-sm flex items-center gap-2 touch-none' >
      <input type="checkbox" />
      <h2>{title}</h2>
    </div>
  )
}

export default Task