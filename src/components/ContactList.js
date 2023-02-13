import React, { useState } from "react";
// import PropTypes from 'prop-types'
import ListGroup from "react-bootstrap/ListGroup";
import { FiPhone } from "react-icons/fi";
import SearchBar from "./SearchBar";
import "./ContactList.css";

const filterContacts = (contacts, query) => {
  if (!query) {
    return contacts;
  }

  return contacts.filter((contact) => {
    const queryName = query.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(queryName) ||
      contact.lastName.toLowerCase().includes(queryName)
    );
  });
};

const ContactList = (props) => {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("search");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filteredContacts = filterContacts(props.contacts, searchQuery);

  const contacts = filteredContacts.map((contact) => {
    return (
      <ListGroup.Item
        action
        variant="light"
        className="mb-2 rounded"
        key={contact.contactId}
        onClick={() => props.onSelect(contact.contactId, props.token)}
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">
            {contact.firstName} {contact.lastName}
          </div>
          <FiPhone /> {contact.number}
        </div>
      </ListGroup.Item>
    );
  });
  return (
    <div className="contact-list scrollbar-near-moon">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ListGroup variant="flush">{contacts}</ListGroup>
    </div>
  );
};

export default ContactList;
