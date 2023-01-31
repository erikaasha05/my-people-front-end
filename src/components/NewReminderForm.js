import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const kDefaultFormData = {
  message: "",
  date: "",
  show: false,
};

const NewReminderForm = (props) => {
  const [reminderData, setReminderData] = useState(kDefaultFormData);

  const handleClose = () => {
    const closeReminder = { ...reminderData, show: false };
    setReminderData(closeReminder);
  };

  const handleShow = () => {
    const showReminder = { ...reminderData, show: true };
    setReminderData(showReminder);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onReminderSubmit(reminderData);
    setReminderData(kDefaultFormData);
  };

  const handleNewReminderData = (event) => {
    const dataValue = event.target.value;
    const dataField = event.target.name;

    const newReminder = { ...reminderData, [dataField]: dataValue };
    setReminderData(newReminder);
  };

  return (
    <div>
      <Button size="sm" onClick={handleShow}>
        Add Reminder
      </Button>
      <Modal size="lg" show={reminderData.show} onHide={handleClose} centered>
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
                required="true"
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
            <Button type="submit" onClick={handleClose}>
              Add Reminder
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

NewReminderForm.propTypes = {
  handleReminderSubmit: PropTypes.func,
};

export default NewReminderForm;
