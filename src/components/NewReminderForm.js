import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const kDefaultFormData = {
  message: "",
  date: "",
};

const NewReminderForm = (props) => {
  const [reminderData, setReminderData] = useState(kDefaultFormData);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const closeModal = () => {
    setTimeout(handleClose, 1000);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const toastMessage = () => {
    toast.success("New reminder created", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onReminderSubmit(props.contactId, reminderData, props.token);
    setReminderData(kDefaultFormData);
    toastMessage();
    closeModal();
  };

  const handleNewReminderData = (event) => {
    const dataValue = event.target.value;
    const dataField = event.target.name;

    const newReminder = { ...reminderData, [dataField]: dataValue };
    setReminderData(newReminder);
  };

  return (
    <div>
      <Button variant="light" size="sm" onClick={handleShow}>
        Add Reminder
      </Button>
      <Modal size="lg" show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>Add a Reminder</Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="message">Reminder Message</Form.Label>
              <Form.Control
                type="text"
                id="message"
                name="message"
                value={reminderData.message}
                onChange={handleNewReminderData}
                required={true}
                placeholder="Enter Reminder"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="date">Remind me on:</Form.Label>
              <Form.Control
                type="date"
                id="date"
                name="date"
                value={reminderData.date}
                onChange={handleNewReminderData}
                placeholder="Date"
              />
            </Form.Group>
            <Button variant="secondary" type="submit">
              Add Reminder
            </Button>
            <ToastContainer autoClose={400} />
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

NewReminderForm.propTypes = {
  onReminderSubmit: PropTypes.func,
  token: PropTypes.string,
  contactId: PropTypes.number,
};

export default NewReminderForm;
