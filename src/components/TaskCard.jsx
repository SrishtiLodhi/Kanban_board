import React, { useState } from "react";
import EditTaskModal from "./EditTaskModal"; // Ensure this path is correct
import trash from "../assets/trash.svg";
import { useSortable } from "@dnd-kit/sortable";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import verified from "../assets/verified.png";
import img from "../assets/KJS2oI01.svg";

function TaskCard({ task, deleteTask, updateTask }) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    console.log("Opening modal");
    setShowModal(true);
  };

  console.log(task, "task");

  const handleCloseModal = (e) => {
    if (e) e.stopPropagation(); // Prevent the click event from propagating
    console.log("Closing modal");
    setShowModal(false);
  };

  const handleDeleteTask = (e) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  const handleUpdateTask = (id, content, date, taskRating, taskPriority) => {
    updateTask(id, content, date, taskRating, taskPriority);
    setShowModal(false); // Close modal after updating task
  };

  // Truncate the content and add ellipsis if too long
  const truncatedContent =
    task.content.length > 100
      ? `${task.content.substring(0, 100)}...`
      : task.content;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    boxShadow: isDragging
      ? "0 4px 8px rgba(0, 0, 0, 0.2)"
      : "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task-card text-left cursor-pointer position-relative border-radius-1 fs-5 mb-3"
      onClick={handleOpenModal}
    >
      <div className="d-flex justify-content-between flex-column p-2">
        <div className="d-flex align-items-center flex-row justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div className="fw-medium" style={{ color: "#8c7c7c" }}>
              #8793
            </div>

            <div className="fw-medium" style={{ color: "#8c7c7c" }}>
             <li>3 Jan, 4:35 PM</li> 
            </div>
          </div>
          <img src={img} alt="img" style={{ width: "10%" }} />
        </div>
        <div
          className="case-details pt-2 pb-3 fw-medium"
          style={{ fontSize: "1rem" }}
        >
          <span>{truncatedContent}</span>
        </div>

        <div className="d-flex flex-row align-items-center justify-content-between pb-0">
          <div className="gap-2 d-flex ">
            <div
              className={`mb-0 rounded-4 text-light fw-medium fs-5 ${
                task.taskPriority === "Critical"
                  ? "bg-red-500"
                  : task.taskPriority === "Medium"
                  ? "bg-orange-500"
                  : "bg-yellow-500"
              }`}
            >
              {task.taskPriority}
            </div>

            <div
              className={`mb-0 rounded-4 fs-5 fw-medium ${
                task.taskPlatform === "Hypejab"
                  ? "bg-purple-500"
                  : task.taskPriority === "Getstra"
                  ? "bg-blue-500"
                  : "bg-blue-500"
              } `}
            >
              {task.taskPlatform}
            </div>

            <div>{task.taskRating}</div>
          </div>
          <div className="d-flex justify-content-end">
            <img src={verified} className="w-25" />
          </div>
        </div>
      </div>

      <EditTaskModal
        show={showModal}
        onHide={handleCloseModal}
        task={task}
        updateTask={handleUpdateTask}
        deleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default TaskCard;
