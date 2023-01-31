import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const kDefaultFormData = {
  firstName: null,
  lastName: null,
  number: null,
  email: null,
  address: null,
  birthday: null,
  relationships: null,
  notes: null,
  tags: null,
};

// helper function to help format phone numbers
const formatNumber = (value) => {
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) {
    return phoneNumber;
  } else if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  } else {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }
};

const NewContactForm = (props) => {
  const [contactData, setContactData] = useState(kDefaultFormData);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleNewContactSubmit(contactData);
    setContactData(kDefaultFormData);
  };

  const handleNewContactData = (event) => {
    const dataValue = event.target.value;
    const dataField = event.target.name;

    if (dataField === "number") {
      const formattedNumber = {
        ...contactData,
        [dataField]: formatNumber(dataValue),
      };
      setContactData(formattedNumber);
    } else {
      const newContact = { ...contactData, [dataField]: dataValue };
      setContactData(newContact);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="firstName">First Name</Form.Label>
        <Form.Control
          type="text"
          id="firstName"
          name="firstName"
          value={contactData.firstName}
          onChange={handleNewContactData}
          required="true"
          placeholder="First Name"
          autoFocus
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="lastName">Last Name</Form.Label>
        <Form.Control
          type="text"
          id="lastName"
          name="lastName"
          value={contactData.lastName}
          onChange={handleNewContactData}
          required="true"
          placeholder="Last Name"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="number">Primary Phone Number</Form.Label>
        <Form.Control
          type="text"
          id="number"
          name="number"
          value={contactData.number}
          onChange={handleNewContactData}
          required="true"
          placeholder="Enter Phone Number"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">Email Address</Form.Label>
        <Form.Control
          type="email"
          id="email"
          name="email"
          value={contactData.email}
          onChange={handleNewContactData}
          placeholder="name@example.com"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="address">Home Address</Form.Label>
        <Form.Control
          type="text"
          id="address"
          name="address"
          value={contactData.address}
          onChange={handleNewContactData}
          placeholder="Home Address"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="birthday">Birthday</Form.Label>
        <Form.Control
          type="date"
          id="birthday"
          name="birthday"
          value={contactData.birthday}
          onChange={handleNewContactData}
          placeholder="Birthday"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="relationships">Relationships</Form.Label>
        <Form.Control
          type="text"
          id="relationships"
          name="relationships"
          value={contactData.relationships}
          onChange={handleNewContactData}
          placeholder="Relationships"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="notes">Notes</Form.Label>
        <Form.Control
          type="text"
          id="notes"
          name="notes"
          value={contactData.notes}
          onChange={handleNewContactData}
          placeholder="Provide Notes Here"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="tags">Tags</Form.Label>
        <Form.Control
          type="text"
          id="tags"
          name="tags"
          value={contactData.tags}
          onChange={handleNewContactData}
          placeholder="Select Tags"
        />
      </Form.Group>
      <Button type="submit">Add Contact</Button>
    </Form>
  );
};

NewContactForm.propTypes = {
  handleContactSubmit: PropTypes.func,
};

export default NewContactForm;
