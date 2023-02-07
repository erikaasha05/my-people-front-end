import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import NewReminderForm from "./NewReminderForm";

const ReminderList = (props) => {
  const reminders = props.reminders.map((reminder) => {
    return (
      <ListGroup.Item className="mb-2" key={reminder.reminderId}>
        <div className="ms-2 me-auto">
          <div className="fw-bold">{reminder.message}</div>
          Reminder Date: {reminder.date}
          <Button
            className="me-3 position-absolute top-50 end-0 translate-middle-y"
            size="sm"
            variant="danger"
            onClick={() => props.onDeleteReminder(reminder.reminderId, props.token)}
          >
            X
          </Button>
        </div>
      </ListGroup.Item>
    );
  });
  return (
    <div>
      <NewReminderForm onReminderSubmit={props.onReminderSubmit} token={props.token} />
      <ListGroup>{reminders}</ListGroup>
    </div>
  );
};

export default ReminderList;
