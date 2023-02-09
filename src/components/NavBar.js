import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import logo from "../my_people_logo.png";
import NewContactForm from "./NewContactForm";


const NavBar = (props) => {
  const [showAddContactModal, setShowAddContactModal] = useState(false)
  // const [showMapModal, setShowMapModal] = useState(false);

  const handleContactClose = () => {
    setShowAddContactModal(false);
  };

  const handleContactShow = () => {
    setShowAddContactModal(true);
  };

  // const handleMapClose = () => {
  //   setShowMapModal(false);
  // };

  // const handleMapShow = () => {
  //   setShowMapModal(true);
  // };

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
          <Nav className="me-auto container-fluid">
            <Nav.Link href="#home">Home</Nav.Link>
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
            {/* <Nav.Link onClick={handleMapShow}>Map</Nav.Link>
            <Modal size="lg" show={showMapModal} onHide={handleMapClose} centered>
              <Modal.Header closeButton>Map</Modal.Header>
              <Modal.Body>
                <Map contacts={props.contacts} />
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleMapClose}>Close</Button>
              </Modal.Footer>
            </Modal> */}
            <Nav.Link className="ms-auto" onClick={() => props.onLogout()}>Log Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
