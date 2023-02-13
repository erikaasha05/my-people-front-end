import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Col,
  Row,
  OverlayTrigger,
  Tooltip,
  Badge,
} from "react-bootstrap";
import {
  FiTrash2,
  FiPhone,
  FiMail,
  FiHome,
  FiUsers,
  FiTag,
} from "react-icons/fi";
import { FaBirthdayCake, FaStickyNote } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { format } from "date-fns";
import NewReminderForm from "./NewReminderForm";
import UpdateContactForm from "./UpdateContactForm";
import Map from "./Map";
import "./Contact.css";

const Contact = (props) => {
  const formattedDate = format(new Date(props.contactData.birthday.replace(/-/g, '/')), "MMMM d, yyyy");

  return (
    <div>
      <Row>
        <Col className="ms-3">
          <h1>{props.contactData.firstName}</h1>
          <h3>{props.contactData.lastName}</h3>
          {props.contactData.email ? (
            <Button
              className="mb-2"
              variant="light"
              size="sm"
              href={`mailto:${props.contactData.email}`}
            >
              Email {props.contactData.firstName}
            </Button>
          ) : null}
          <NewReminderForm
            contactId={props.contactData.contactId}
            onReminderSubmit={props.onReminderSubmit}
            token={props.token}
          />
        </Col>
        <Col className="mt-4" xs={7}>
          <p>
            <FiPhone className="contact-details" /> {props.contactData.number}
          </p>
          <p>
            <FiMail className="contact-details" /> {props.contactData.email}
          </p>
          <p>
            <FaBirthdayCake className="contact-details" />{" "}
            {formattedDate}
          </p>
          <p>
            <FiUsers className="contact-details" />{" "}
            {props.contactData.relationship}
          </p>
          <p>
            <FaStickyNote className="contact-details" />{" "}
            {props.contactData.notes}
          </p>
          <p>
            <FiTag />{" "}
            {props.contactData.tags ? (
              <Badge
                pill
                bg="info"
                className="ms-2 text-uppercase align-middle"
              >
                {props.contactData.tags}
              </Badge>
            ) : null}
          </p>
          <p>
            <FiHome className="contact-details" /> {props.contactData.address}
          </p>
          <Map contactData={props.contactData} />
        </Col>
        <Col xs={1}>
          <UpdateContactForm
            contactData={props.contactData}
            handleUpdateContactSubmit={props.handleUpdateContactSubmit}
            token={props.token}
          />
          <OverlayTrigger
            key="delete-right"
            placement="right"
            overlay={<Tooltip id="tooltip-delete">Delete Contact</Tooltip>}
          >
            <Button
              className="mt-2"
              variant="light"
              size="sm"
              onClick={() =>
                props.onDeleteContact(props.contactData.contactId, props.token)
              }
            >
              <FiTrash2 />
            </Button>
          </OverlayTrigger>
          <ToastContainer autoClose={500} />
        </Col>
      </Row>
    </div>
  );
};

Contact.propTypes = {
  onDeleteContact: PropTypes.func,
  onReminderSubmit: PropTypes.func,
  handleUpdateContactSubmit: PropTypes.func,
  token: PropTypes.string,
  contactData: PropTypes.object,
};

export default Contact;
