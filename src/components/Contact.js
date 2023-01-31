import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row"
import NewReminderForm from "./NewReminderForm";
import "./Contact.css";


const Contact = (props) => {
  return (
    <Row>
      <Col className="ms-3">
      <h1>{props.contactData.firstName}</h1>
      <h3>{props.contactData.lastName}</h3>
      {props.contactData.email ? 
        <Button className="mb-2" size="sm">Email {props.contactData.firstName}</Button> : null}
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
      <Button size="sm">Edit</Button>
      <Button size="sm" onClick={() => props.onDeleteContact(props.contactData.contactId)}>🗑️</Button>
      </Col>
    </Row>
  );
};

export default Contact;