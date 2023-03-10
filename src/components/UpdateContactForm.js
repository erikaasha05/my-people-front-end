import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";

const UpdateContactForm = (props) => {
  const [contactData, setContactData] = useState(props.contactData);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const closeModal = () => {
    setTimeout(handleClose, 800);
  };

  const handleShow = () => {
    setShowModal(true);
    setContactData(props.contactData);
  };

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

  const toastMessage = () => {
    toast.success("Contact updated", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleUpdateContactSubmit(
      contactData,
      props.contactData.contactId,
      props.token
    );
    setContactData(props.contactData);
    toastMessage();
    closeModal();
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
    <div>
      <OverlayTrigger
        key="edit-left"
        placement="left"
        overlay={<Tooltip id="tooltip-edit">Update Contact</Tooltip>}
      >
        <Button className="me-3" variant="light" size="sm" onClick={handleShow}>
          <FiEdit />
        </Button>
      </OverlayTrigger>
      <Modal size="lg" show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>Update Contact</Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="firstName">First Name</Form.Label>
              <Form.Control
                type="text"
                id="firstName"
                name="firstName"
                value={contactData.firstName}
                onChange={handleNewContactData}
                required={true}
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
                required={true}
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
                required={true}
                placeholder="Phone Number"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email Address</Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                value={contactData.email || ""}
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
                value={contactData.address || ""}
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
                value={contactData.birthday || ""}
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
                value={contactData.relationship || ""}
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
                value={contactData.notes || ""}
                onChange={handleNewContactData}
                placeholder="Provide Notes Here"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="tags">Tags</Form.Label>
              <Form.Select
                id="tags"
                name="tags"
                value={contactData.tags || ""}
                aria-label="Select tag"
                onChange={handleNewContactData}
                multiple={false}
              >
                <option value="" disabled>
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
              Update Contact
            </Button>
            <ToastContainer autoClose={300} />
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

UpdateContactForm.propTypes = {
  handleUpdateContactSubmit: PropTypes.func,
  contactData: PropTypes.object,
  token: PropTypes.string,
};

export default UpdateContactForm;
