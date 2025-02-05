/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, TouchSensor, useDroppable, useDraggable } from '@dnd-kit/core';
import "@/globals.css"
import { SortableContext } from '@dnd-kit/sortable';
// Sample tasks
const initialTasks = {
  todo: [
    { id: '1', title: 'Set up project structure' },
    { id: '2', title: 'Create database schema' }
  ],
  inProgress: [
    { id: '3', title: 'Implement login system' }
  ],
  done: [
    { id: '4', title: 'Create UI wireframes' }
  ]
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  // Handle drag end event
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return; // If no drop target, do nothing

    // Get current tasks and the active item (the dragged task)
    const sourceColumn = active.data.current.droppableId;
    const destinationColumn = over.data.current.droppableId;

    // Create a new updated task state
    const updatedTasks = { ...tasks };
    const [movedTask] = updatedTasks[sourceColumn].splice(active.index, 1);
    updatedTasks[destinationColumn].splice(over.index, 0, movedTask);

    setTasks(updatedTasks); // Update the state
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex justify-between p-5 space-x-4">
        {Object.keys(tasks).map((columnId) => (
          <KanbanColumn key={columnId} title={columnId} tasks={tasks[columnId]} />
        ))}
      </div>
    </DndContext>
  );
};

// Kanban Column Component
const KanbanColumn = ({ title, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: title
  });

  return (
    <div ref={setNodeRef} className="w-1/3 p-4 bg-red-100 rounded-lg min-h-[300px]">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">{title.toUpperCase()}</h2>
      <div className="space-y-2">
        <SortableContext items={tasks} >
        {tasks.map((task, index) => (
          <KanbanCard key={task.id} task={task} index={index} columnId={title} />
        ))}
        </SortableContext>
      </div>
    </div>
  );
};

// Kanban Card Component
const KanbanCard = ({ task, index, columnId }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task.id,
    data: { columnId }
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="p-3 bg-white rounded-md shadow-md cursor-pointer"
    >
      <p className="text-gray-800">{task.title}</p>
    </div>
  );
};

export default KanbanBoard;
