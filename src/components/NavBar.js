import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../my_people_logo.png";
import NewContactForm from "./NewContactForm";


const NavBar = () => {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="My People logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link onClick={handleShow}>Add Contact</Nav.Link>
            <Modal size="lg" show={showModal} onHide={handleClose} centered>
              <Modal.Header closeButton>Add a New Contact</Modal.Header>
              <Modal.Body>
                <NewContactForm />
              </Modal.Body>
            </Modal>
            <Nav.Link href="#reminders">Reminders</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
