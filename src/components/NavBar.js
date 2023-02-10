import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import logo from "../my_people_no_bg.png";
import NewContactForm from "./NewContactForm";


const NavBar = (props) => {
  const [showAddContactModal, setShowAddContactModal] = useState(false)

  const handleContactClose = () => {
    setShowAddContactModal(false);
  };

  const handleContactShow = () => {
    setShowAddContactModal(true);
  };


  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="My People logo"
          />
        </Navbar.Brand>
          <Nav className="me-auto container-fluid">
            <Nav.Link onClick={handleContactShow} >Add Contact</Nav.Link>
            <Modal size="lg" show={showAddContactModal} onHide={handleContactClose} centered>
              <Modal.Header closeButton>Add a New Contact</Modal.Header>
              <Modal.Body>
                <NewContactForm handleNewContactSubmit={props.handleNewContactSubmit} token={props.token} />
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleContactClose}>Close</Button>
              </Modal.Footer>
            </Modal>
            <Nav.Link onClick={() => props.onReminderSelect()}>Reminders</Nav.Link>
            <Nav.Link className="ms-auto" onClick={() => props.onLogout()}>Log Out</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
