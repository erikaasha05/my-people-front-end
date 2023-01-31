import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

const ReminderList = (props) => {
  const reminders = props.reminders.map((reminder) => {
    return (
      <ListGroup.Item className="mb-2" key={reminder.reminderId}>
        <div className="ms-2 me-auto">
          <div className="fw-bold">{reminder.message}</div>
          Reminder Date: {reminder.date}
        </div>
      </ListGroup.Item>
    );
  });
  return (
    <ListGroup>{reminders}</ListGroup>
  );
};

export default ReminderList;