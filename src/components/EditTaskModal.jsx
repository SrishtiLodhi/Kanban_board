import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function EditTaskModal({ show, onHide, task, updateTask, deleteTask }) {
  const [taskContent, setTaskContent] = useState(task.content);
  const [taskDate, setTaskDate] = useState(task.date || "");
  const [taskRating, setTaskRating] = useState(task.taskRating || 1);
  const [taskPriority, setTaskPriority] = useState(task.taskPriority || "Low");

  useEffect(() => {
    setTaskContent(task.content);
    setTaskDate(task.dueDate || "");
    setTaskRating(task.taskRating || 1);
    setTaskPriority(task.taskPriority || "Low");
  }, [task]);

  const handleSave = (e) => {
    e.stopPropagation();
    updateTask(task.id, taskContent, taskDate, taskRating, taskPriority);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" dialogClassName="modal-75w">
      <Modal.Header
        closeButton
        onClick={(e) => {
          e.stopPropagation();
          onHide(e);
        }}
      >
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTaskContent">
            <Form.Label>Task Content</Form.Label>
            <Form.Control
              type="text"
              value={taskContent}
              onChange={(e) => setTaskContent(e.target.value)}
            />
          </Form.Group>

          <Row className="mt-3">
            <Col>
              <Form.Group
                controlId="formTaskDate"
                className="d-flex flex-column"
              >
                <Form.Label>Task Date</Form.Label>
                <DatePicker
                  selected={taskDate ? new Date(taskDate) : null}
                  onChange={(date) => setTaskDate(date)}
                  className="form-control"
                  dateFormat="yyyy/MM/dd"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formTaskPriority">
                <Form.Label>Task Priority</Form.Label>
                <Form.Control
                  as="select"
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formTaskRating">
                <Form.Label>Task Rating</Form.Label>
                <Form.Control
                  as="select"
                  value={taskRating}
                  onChange={(e) => setTaskRating(parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((taskRating) => (
                    <option key={taskRating} value={taskRating}>
                      {taskRating}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
        <Button variant="danger" onClick={deleteTask}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTaskModal;
