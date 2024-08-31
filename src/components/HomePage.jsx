import React, { useState } from "react";
import KanbanBoard from "./KanbanBoard";
import CreateTasks from "./CreateTasks";
import { Modal, Button, Dropdown, Form } from "react-bootstrap";
import dashboard from "../assets/dashboard.svg";
import user from "../assets/user.svg";
import dashboardActive from "../assets/dashboard-active.svg";
import userActive from "../assets/user-active.svg";
import profile from "../assets/profile-svgrepo-com.svg";
import plus from "../assets/plus-with-circle.svg";
import searchIcon from "../assets/searchIcon.svg";
import updown from "../assets/updown.svg";

const defaultCols = [
  {
    id: "Draft",
    title: "Draft",
  },
  {
    id: "Unsolved",
    title: "Unresolved",
  },
  {
    id: "underReview",
    title: "underReview on SOF & GOA",
  },
  {
    id: "Solved",
    title: "underReview on replies",
  },
  {
    id: "needConsulting",
    title: "Ready for IT portal",
  },
  {
    id: "Completed",
    title: "Replies ready",
  },
];

const defaultTasks = [
  {
    id: "1",
    columnId: "Draft",
    content: "List admin APIs for dashboard",
    Name: "Kohn",
    date: "2024-09-01",
    taskRating: 3,
    taskPriority: "Medium",
    taskPlatform: "Hypejab", // New field added
  },
  {
    id: "2",
    columnId: "needConsulting",
    content:
      "Develop user registration functionality with OTP delivered on SMS after email confirmation and phone number confirmation",
    Name: "John",
    date: "2024-09-02",
    taskRating: 4,
    taskPriority: "Critical",
    taskPlatform: "Getstra", // New field added
  },
  {
    id: "3",
    columnId: "Unsolved",
    content: "Conduct security testing",
    Name: "Simran",
    date: "2024-09-03",
    taskRating: 5,
    taskPriority: "Critical",
    taskPlatform: "Hypejab", // New field added
  },
  {
    id: "4",
    columnId: "Unsolved",
    content: "Analyze competitor",
    Name: "Simran",
    date: "2024-09-04",
    taskRating: 3,
    taskPriority: "Medium",
    taskPlatform: "Getstra", // New field added
  },
  {
    id: "5",
    columnId: "underReview",
    content: "Create UI kit documentation",
    Name: "Simran",
    date: "2024-09-05",
    taskRating: 2,
    taskPriority: "Low",
    taskPlatform: "Hypejab", // New field added
  },
  {
    id: "6",
    columnId: "underReview",
    content: "Dev meeting",
    Name: "Raj",
    date: "2024-09-06",
    taskRating: 4,
    taskPriority: "Medium",
    taskPlatform: "Getstra", // New field added
  },
  {
    id: "7",
    columnId: "underReview",
    content: "Deliver dashboard prototype",
    Name: "Raj",
    date: "2024-09-07",
    taskRating: 3,
    taskPriority: "Medium",
    taskPlatform: "Hypejab", // New field added
  },
  {
    id: "8",
    columnId: "Draft",
    content: "Optimize application performance",
    Name: "Raj",
    date: "2024-09-08",
    taskRating: 4,
    taskPriority: "Critical",
    taskPlatform: "Getstra", // New field added
  },
  {
    id: "9",
    columnId: "Draft",
    content: "Implement data validation",
    Name: "Raj",
    date: "2024-09-09",
    taskRating: 3,
    taskPriority: "Medium",
    taskPlatform: "Hypejab", // New field added
  },
  {
    id: "10",
    columnId: "needConsulting",
    content: "Design database schema",
    Name: "Raj",
    date: "2024-09-10",
    taskRating: 4,
    taskPriority: "Critical",
    taskPlatform: "Getstra", // New field added
  },
  {
    id: "11",
    columnId: "Draft",
    content: "Integrate SSL web certificates into workflow",
    Name: "Kush",
    date: "2024-09-11",
    taskRating: 5,
    taskPriority: "Critical",
    taskPlatform: "Hypejab", // New field added
  },
];


const HomePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [tasks, setTasks] = useState(defaultTasks);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <div className="d-flex flex-column vh-100">
        <nav className="navbar navbar-expand-lg navbar-light p-3 pb-2">
          <h1 className="fs-3 fw-bold">Vulnerabilities</h1>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav w-100 d-flex justify-content-end align-items-center px-2">
              {/* <li className="nav-item">
                  <Button variant="primary" style={{ backgroundColor: 'var(--secondary-color)' }} onClick={handleShowModal}>
                    Create Case
                  </Button>
                </li> */}
              <li className="nav-item">
                <Dropdown className="circle">
                  <Dropdown.Toggle
                    as="div"
                    style={{ border: "none", background: "none" }}
                  >
                    <img
                      src={profile}
                      alt="profile"
                      style={{ width: "1.5rem", cursor: "pointer" }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <Dropdown.Item href="#/change-password">
                      Change Password
                    </Dropdown.Item>
                    <Dropdown.Item href="/">Sign Out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </nav>
        <div className="p-3 pt-0">
          <div className="d-flex align-items-center">
            {/* Search Bar with Icon in Placeholder */}
            <div className="position-relative me-2">
              <Form.Control
                type="search"
                placeholder="Search by issue name..."
                className="custom-design fw-medium"
                style={{ paddingLeft: "2.3rem", color: "#d3d3d3" }}
              />
              <img
                src={searchIcon}
                alt="Search Icon"
                className="position-absolute top-50 start-0 translate-middle-y ms-2"
                style={{ width: "1.5rem" }}
              />
            </div>

            {/* Sort Button */}
            <Button
              className="custom-design d-flex align-items-center"
              style={{ color: "#484242" }}
            >
              <img
                src={updown}
                alt="Plus Icon"
                style={{ width: "1.1rem", marginRight: "0.4rem" }}
              />
              Sort By
            </Button>

            {/* Custom Button */}
            <Button className="custom-button px-3 d-flex align-items-center">
              <img
                src={plus}
                alt="Plus Icon"
                style={{ width: "1.1rem", marginRight: "0.4rem" }}
              />
              Assigned To
            </Button>
            <Button className="custom-button px-3 d-flex align-items-center">
              <img
                src={plus}
                alt="Plus Icon"
                style={{ width: "1.1rem", marginRight: "0.4rem" }}
              />
              Severity
            </Button>
            <Button className="custom-button px-3 d-flex align-items-center">
              <img
                src={plus}
                alt="Plus Icon"
                style={{ width: "1.1rem", marginRight: "0.4rem" }}
              />
              Status
            </Button>
            <Button className="custom-button px-3 d-flex align-items-center">
              <img
                src={plus}
                alt="Plus Icon"
                style={{ width: "1.1rem", marginRight: "0.4rem" }}
              />
              Pentest
            </Button>
          </div>
        </div>
        <div className="container-fluid m-0 bg-light">
          <KanbanBoard tasks={tasks} setTasks={setTasks} />;
        </div>
      </div>
      <Modal
        className="custom-modal-width"
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateTasks addTask={addTask} closeModal={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HomePage;
