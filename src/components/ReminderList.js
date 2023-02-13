import React from "react";
import PropTypes from "prop-types";
import { ListGroup, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import { format } from "date-fns";

const ReminderList = (props) => {
  const reminders = props.reminders.map((reminder) => {
    const formattedDate = format(new Date(reminder.date.replace(/-/g, '/')), "MMMM d, yyyy");

    return (
      <ListGroup.Item className="mb-2 rounded" key={reminder.reminderId}>
        <div className="ms-2 me-auto">
          <div className="fw-bold">{reminder.message}</div>
          Reminder Date: {formattedDate}
          <OverlayTrigger
            key="delete-reminder-left"
            placement="left"
            overlay={
              <Tooltip id="tooltip-delete-reminder">Delete Reminder</Tooltip>
            }
          >
            <Button
              className="me-3 position-absolute end-0 translate-middle-y"
              size="sm"
              variant="outline-danger"
              onClick={() =>
                props.onDeleteReminder(reminder.reminderId, props.token)
              }
            >
              <IoMdClose />
            </Button>
          </OverlayTrigger>
          <ToastContainer autoClose={200} />
        </div>
      </ListGroup.Item>
    );
  });
  return (
    <div>
      <ListGroup>{reminders}</ListGroup>
    </div>
  );
};

ReminderList.propTypes = {
  reminder: PropTypes.arrayOf(
    PropTypes.shape({
      reminderId: PropTypes.number,
      message: PropTypes.string,
      date: PropTypes.string,
    })
  ),
  onDeleteReminder: PropTypes.func,
  onReminderSubmit: PropTypes.func,
  token: PropTypes.string,
};

export default ReminderList;
