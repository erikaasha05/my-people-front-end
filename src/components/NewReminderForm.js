import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const kDefaultFormData = {
  message: "",
  date: "",
};

const NewReminderForm = () => {
  const [reminderData, setReminderData] = useState(kDefaultFormData);

  const handleSubmit = (event) => {
    event.preventDefault();
    // props.handleContactSubmit(contactData);
    setReminderData(kDefaultFormData);
  };

  const handleNewReminderData = (event) => {
    const dataValue = event.target.value;
    const dataField = event.target.name;

    const newReminder = { ...reminderData, [dataField]: dataValue };
    setReminderData(newReminder);
  };

  return (
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
      <Button type="submit">Add Reminder</Button>
    </Form>
  );
};

NewReminderForm.propTypes = {
  handleReminderSubmit: PropTypes.func,
};

export default NewReminderForm;
