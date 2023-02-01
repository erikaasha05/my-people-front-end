import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const UpdateContactForm = (props) => {
  const [contactData, setContactData] = useState(props.contactData);

  const handleSubmit = (event) => {
    event.preventDefault();
    // props.handleContactSubmit(contactData);
    setContactData(props.contactData);
  };

  const handleNewContactData = (event) => {
    const dataValue = event.target.value;
    const dataField = event.target.name;

    const newContact = { ...contactData, [dataField]: dataValue };
    setContactData(newContact);
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
          placeholder="Phone Number"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">Email Address</Form.Label>
        <Form.Control
          type="email"
          id="email"
          name="femail"
          value={contactData.email}
          onChange={handleNewContactData}
          placeholder="Enter Email"
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
      <Button type="submit">Update Contact</Button>
    </Form>
  );
};

UpdateContactForm.propTypes = {
  handleContactSubmit: PropTypes.func,
};

export default UpdateContactForm;
