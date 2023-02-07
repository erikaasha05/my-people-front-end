import React from "react";
// import PropTypes from 'prop-types'
import ListGroup from "react-bootstrap/ListGroup";
import "./ContactList.css"

const ContactList = (props) => {
  const contacts = props.contacts.map((contact) => {
    return (
      <ListGroup.Item action variant="info" className="mb-2" key={contact.contactId} onClick={() => props.onSelect(contact.contactId, props.token)}>
        <div className="ms-2 me-auto">
          <div className="fw-bold">{contact.firstName} {contact.lastName}</div>
          📱 {contact.number}
        </div>
      </ListGroup.Item>
    );
  });
  return (
    <div>
      <ListGroup variant="flush">{contacts}</ListGroup>
    </div>
  );
};

export default ContactList;