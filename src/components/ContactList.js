import React from 'react';
import PropTypes from 'prop-types'
import ListGroup from "react-bootstrap/ListGroup"

const ContactList = (props) => {
  const contactList = props.contacts.map((contact) => {
    return (
      <ListGroup.Item>{contact.firstName} {contact.lastName}</ListGroup.Item>
    );
  })
  return (
    <ListGroup>{contactList}</ListGroup>
  );
};

export default ContactList;