import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import NewReminderForm from "./NewReminderForm";


const Contact = (props) => {
  return (
    <Col>
      <h1>{props.contactInfo.firstName}</h1>
      <h3>{props.contactInfo.lastName}</h3>
      <p>📱 Phone Number: {props.contactInfo.number}</p>
      <p>✉️ Email Address: {props.contactInfo.email}</p>
      <p>🎂 Birthday: {props.contactInfo.birthday}</p>
      <p>👪 Relationships: {props.contactInfo.relationships}</p>
      <p>🗒️ Notes: {props.contactInfo.notes}</p>
      {props.contactInfo.email ? 
        <Button>Email {props.contactInfo.firstName}</Button> : null}
      <NewReminderForm />
    </Col>
  );
};

export default Contact;