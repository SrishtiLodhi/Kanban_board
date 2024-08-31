import React, { useState } from "react";

const CreateTasks = ({ addTask, closeModal }) => {
  const [columnId, setColumnId] = useState("Draft");

  const [formData, setFormData] = useState({
    caseDescription: "",
    dueDate: "",
    taskPriority: "low",
    taskRating: 1, // Default value for the rating
    platform: "getastra", // Default value for the platform dropdown
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateSection = () => {
    return (
      formData.caseDescription &&
      formData.dueDate &&
      formData.taskPriority &&
      formData.taskRating &&
      formData.platform
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      id: generateId(),
      columnId,
      content: formData.caseDescription,
      dueDate: formData.dueDate,
      taskPriority: formData.taskPriority,
      taskRating: formData.taskRating,
      platform: formData.platform,
    };
    addTask(newTask);
    //closeModal();
  };

  function generateId() {
    return Math.floor(Math.random() * 10001);
  }

  return (
    <div className="login template d-flex justify-content-center align-items-center w-100">
      <div
        className="d-flex bg-light p-lg-2 p-md-2 p-sm-1 d-flex flex-column justify-content-between w-100"
        style={{ borderRadius: "1.5rem", height: "90%" }}
      >
        <div className="d-flex gap-10 align-items-center justify-content-center w-100">
          <form className="card-content w-100">
            <div className="mb-3">
              <label
                htmlFor="caseDescription"
                className="form-label text-secondary fw-bold"
              >
                Task Description
              </label>
              <textarea
                className="form-control"
                id="caseDescription"
                placeholder="Enter case description"
                rows="3"
                value={formData.caseDescription}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 d-flex gap-3">
              <div className="w-50">
                <label
                  htmlFor="dueDate"
                  className="form-label text-secondary fw-bold"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </div>
              <div className="w-50">
                <label
                  htmlFor="taskPriority"
                  className="form-label text-secondary fw-bold"
                >
                  Priority
                </label>
                <select
                  id="taskPriority"
                  className="form-select"
                  value={formData.taskPriority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="mb-3 d-flex gap-3">
              <div className="w-50">
                <label
                  htmlFor="taskRating"
                  className="form-label text-secondary fw-bold"
                >
                  Rating
                </label>
                <select
                  id="taskRating"
                  className="form-select"
                  value={formData.taskRating}
                  onChange={handleChange}
                >
                  {[...Array(10).keys()].map((i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} Star{i > 0 && "s"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-50">
                <label
                  htmlFor="platform"
                  className="form-label text-secondary fw-bold"
                >
                  Platform
                </label>
                <select
                  id="platform"
                  className="form-select"
                  value={formData.platform}
                  onChange={handleChange}
                >
                  <option value="getastra">GetAstra</option>
                  <option value="hypejab">HypeJab</option>
                  <option value="sourcecode">Source Code</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div className="d-flex justify-content-end">
          {error && (
            <div className="alert text-danger p-0 text-end mb-1">{error}</div>
          )}
          <button
            className="btn w-25 text-primary text-light "
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTasks;
