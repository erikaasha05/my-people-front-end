import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FaTimesCircle } from "react-icons/fa";
// import NewReminderForm from "./NewReminderForm";

const ReminderList = (props) => {
  const reminders = props.reminders.map((reminder) => {
    return (
      <ListGroup.Item className="mb-2 rounded" key={reminder.reminderId}>
        <div className="ms-2 me-auto">
          <div className="fw-bold">{reminder.message}</div>
          Reminder Date: {reminder.date}
          <OverlayTrigger 
            key="delete-reminder-left" 
            placement="left"
            overlay={
              <Tooltip id="tooltip-delete-reminder">
                Delete Reminder
              </Tooltip>
            }
          >
            <Button
              className="me-3 position-absolute end-0 translate-middle-y"
              size="sm"
              variant="danger"
              onClick={() =>
                props.onDeleteReminder(reminder.reminderId, props.token)
              }
            >
              <FaTimesCircle />
            </Button>
          </OverlayTrigger>
        </div>
      </ListGroup.Item>
    );
  });
  return (
    <div>
      {/* <NewReminderForm
        onReminderSubmit={props.onReminderSubmit}
        token={props.token}
      /> */}
      <ListGroup>{reminders}</ListGroup>
    </div>
  );
};

export default ReminderList;
