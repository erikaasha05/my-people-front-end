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
      <h1>{props.contactInfo.firstName}</h1>
      <h3>{props.contactInfo.lastName}</h3>
      {props.contactInfo.email ? 
        <Button className="mb-2" size="sm">Email {props.contactInfo.firstName}</Button> : null}
      <NewReminderForm />
      </Col>
      <Col className="mt-4" xs={7}>
      <p>📱 Phone Number: {props.contactInfo.number}</p>
      <p>✉️ Email Address: {props.contactInfo.email}</p>
      <p>🎂 Birthday: {props.contactInfo.birthday}</p>
      <p>👪 Relationships: {props.contactInfo.relationships}</p>
      <p>🗒️ Notes: {props.contactInfo.notes}</p>
      </Col>
      <Col xs={1}>
      <Button size="sm">Edit</Button>
      </Col>
    </Row>
  );
};

export default Contact;