import React, { useMemo, useState } from "react";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import circle from "../assets/circle.svg";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";
import { Modal, Button, Dropdown } from "react-bootstrap";
import plus from "../assets/plus.svg";
import CreateTasks from "../components/CreateTasks";

function ColumnContainer({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) {
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: true, // Disabling column dragging
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    height: "85vh",
    width: "18vw",
    borderRadius: "24px",
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const addTask = (newTask) => {
    createTask(column.id, newTask);
    handleCloseModal();
  };

  return (
    <div ref={setNodeRef} style={style} className="d-flex flex-column p-2">
      <div
        {...attributes}
        {...listeners}
        className="transparent bold text-md h-60 text-dark cursor-grab font-bold border-4 d-flex align-items-center justify-content-between"
        style={{ padding: "0.7rem", backgroundColor: "transparent" }}
      >
        <div className="d-flex gap-1" style={{ fontWeight: "600" }}>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "7%" }}
          >
            <img src={circle} alt="" className="w-75" />
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="form-control"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setEditMode(false);
              }}
            />
          )}
        </div>
        <div className="d-flex align-items-center gap-3">
          <Dropdown>
            <Dropdown.Toggle
              variant="transparent"
              id="dropdown-basic"
              className="border-0 text-dark p-0 text-lg font-bold "
              style={{ fontWeight: "600" }}
            >
              •••
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setEditMode(true)}>
                Rename
              </Dropdown.Item>
              <Dropdown.Item onClick={() => deleteColumn(tasks.id)}>
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div
            className="d-flex justify-content-center align-items-center bg-light border-dark cursor-pointer"
            onClick={handleShowModal}
          >
            <img
              src={plus}
              alt=""
              className="p-1"
              style={{ width: "1.5rem" }}
            />
          </div>
        </div>
      </div>

      <SortableContext items={tasksIds}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
      </SortableContext>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateTasks addTask={addTask} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ColumnContainer;
