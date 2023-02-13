import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "./NewContactForm.css";


const kDefaultFormData = {
  firstName: "",
  lastName: "",
  number: "",
  email: "",
  address: "",
  birthday: "",
  relationships: "",
  notes: "",
  tags: "",
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

  const ifFirstNameEmpty = contactData.firstName ? "" : "empty";
  const ifLastNameEmpty = contactData.lastName ? "" : "empty";
  const ifNumberEmpty = contactData.number ? "" : "empty";

  const newContactToast = () => {
    toast.success("New contact created", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleNewContactSubmit(contactData, props.token);
    setContactData(kDefaultFormData);
    newContactToast();
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
          className={ifFirstNameEmpty}
          type="text"
          id="firstName"
          name="firstName"
          value={contactData.firstName}
          onChange={handleNewContactData}
          required={true}
          placeholder="First Name"
          autoFocus
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="lastName">Last Name</Form.Label>
        <Form.Control
          className={ifLastNameEmpty}
          type="text"
          id="lastName"
          name="lastName"
          value={contactData.lastName}
          onChange={handleNewContactData}
          required={true}
          placeholder="Last Name"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="number">Primary Phone Number</Form.Label>
        <Form.Control
          className={ifNumberEmpty}
          type="text"
          id="number"
          name="number"
          value={contactData.number}
          onChange={handleNewContactData}
          required={true}
          placeholder="(123) 456-7890"
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
          id="relationship"
          name="relationship"
          value={contactData.relationship}
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
        <Form.Select
          id="tags"
          name="tags"
          value={contactData.tags}
          aria-label="Select tag"
          onChange={handleNewContactData}
          multiple={false}
        >
          <option defaultValue="">
            Select tag
          </option>
          <option value="family">Family</option>
          <option value="friend">Friend</option>
          <option value="school">School</option>
          <option value="work">Work</option>
          <option value="game night">Game Night</option>
        </Form.Select>
      </Form.Group>
      <Button variant="secondary" type="submit">
        Add Contact
      </Button>
      <ToastContainer autoClose={300} />
    </Form>
  );
};

NewContactForm.propTypes = {
  handleNewContactSubmit: PropTypes.func,
  token: PropTypes.string,
};

export default NewContactForm;
