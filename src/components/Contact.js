import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import NewReminderForm from "./NewReminderForm";
import UpdateContactForm from "./UpdateContactForm";
import "./Contact.css";

const Contact = (props) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <Row>
      <Col className="ms-3">
        <h1>{props.contactData.firstName}</h1>
        <h3>{props.contactData.lastName}</h3>
        {props.contactData.email ? (
          <Button className="mb-2" size="sm">
            Email {props.contactData.firstName}
          </Button>
        ) : null}
        <NewReminderForm onReminderSubmit={props.onReminderSubmit} />
      </Col>
      <Col className="mt-4" xs={7}>
        <p>📱 Phone Number: {props.contactData.number}</p>
        <p>✉️ Email Address: {props.contactData.email}</p>
        <p>🎂 Birthday: {props.contactData.birthday}</p>
        <p>👪 Relationships: {props.contactData.relationships}</p>
        <p>🗒️ Notes: {props.contactData.notes}</p>
      </Col>
      <Col xs={1}>
        <Button size="sm" onClick={handleShow}>
          Edit
        </Button>
        <Modal size="lg" show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>Add a New Contact</Modal.Header>
          <Modal.Body>
            <UpdateContactForm
              contactData={props.contactData}
              handleUpdateContactSubmit={props.handleUpdateContactSubmit}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Button
          size="sm"
          onClick={() => props.onDeleteContact(props.contactData.contactId)}
        >
          🗑️
        </Button>
      </Col>
    </Row>
  );
};

export default Contact;
