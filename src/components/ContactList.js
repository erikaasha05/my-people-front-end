import React from 'react';
// import PropTypes from 'prop-types'
import ListGroup from "react-bootstrap/ListGroup";

const ContactList = (props) => {
  const contactList = props.contacts.map((contact) => {
    return (
      <ListGroup.Item action variant="info" className="mb-2" key={contact.contactId}>
        <div className="ms-2 me-auto">
          <div className="fw-bold">{contact.firstName} {contact.lastName}</div>
          📱 {contact.number}
        </div>
      </ListGroup.Item>
    );
  })
  return (
    <ListGroup variant="flush">{contactList}</ListGroup>
  );
};

export default ContactList;