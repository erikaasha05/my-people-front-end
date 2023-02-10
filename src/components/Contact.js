import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import NewReminderForm from "./NewReminderForm";
import UpdateContactForm from "./UpdateContactForm";
import "./Contact.css";
// import ReminderList from "./ReminderList";
import Map from "./Map";

const Contact = (props) => {
  // const [showModal, setShowModal] = useState(false);

  // const handleClose = () => {
  //   setShowModal(false);
  // };

  // const handleShow = () => {
  //   setShowModal(true);
  // };

  return (
    <div>
      <Row>
        <Col className="ms-3">
          <h1>{props.contactData.firstName}</h1>
          <h3>{props.contactData.lastName}</h3>
          {props.contactData.email ? (
            <Button className="mb-2" size="sm" href={`mailto:${props.contactData.email}`}>
              Email {props.contactData.firstName}
            </Button>
          ) : null}
          <NewReminderForm contactData={props.contactData} onReminderSubmit={props.onReminderSubmit} token={props.token} />
        </Col>
        <Col className="mt-4" xs={6}>
          <p>📱 Phone Number: {props.contactData.number}</p>
          <p>✉️ Email Address: {props.contactData.email}</p>
          <p>🎂 Birthday: {props.contactData.birthday}</p>
          <p>👪 Relationships: {props.contactData.relationship}</p>
          <p>🗒️ Notes: {props.contactData.notes}</p>
          <p>🏠 Address: {props.contactData.address}</p>
        </Col>
        <Col xs={2}>
          <UpdateContactForm
            contactData={props.contactData}
            handleUpdateContactSubmit={props.handleUpdateContactSubmit}
            token={props.token}
          />
          <Button
            size="sm"
            onClick={() => props.onDeleteContact(props.contactData.contactId, props.token)}
          >
            🗑️
          </Button>
        </Col>
      </Row>
      {/* <Row>
        <ReminderList 
          onReminderSubmit={props.onReminderSubmit} 
          onDeleteContact={props.onDeleteContact}
          token={props.token}
          contactData={props.contactData}
        />
      </Row> */}
      <Row>
      <Map contactData={props.contactData} />
      </Row>
    </div>
  );
};

export default Contact;
