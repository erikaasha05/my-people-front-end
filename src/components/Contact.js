import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { FiTrash2, FiPhone, FiMail, FiHome, FiUsers } from "react-icons/fi";
import { FaBirthdayCake, FaStickyNote } from "react-icons/fa";
import NewReminderForm from "./NewReminderForm";
import UpdateContactForm from "./UpdateContactForm";
import "./Contact.css";
// import ReminderList from "./ReminderList";
import Map from "./Map";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = (props) => {
  // const deleteContactToast = () => {
  //   toast.success("Contact deleted", {
  //     position: toast.POSITION.TOP_CENTER,
  //   });
  // };

  // const onDelete = () => {
  //   deleteContactToast();
  //   setTimeout(() => props.onDeleteContact(props.contactData.contactId, props.token), 2000);
  // }

  // const delayed = () => {
  //   setTimeout(onDelete, 2000);
  // };

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
            contactData={props.contactData}
            onReminderSubmit={props.onReminderSubmit}
            token={props.token}
          />
        </Col>
        <Col className="mt-4" xs={6}>
          <p>
            <FiPhone /> {props.contactData.number}
          </p>
          <p>
            <FiMail /> {props.contactData.email}
          </p>
          <p>
            <FaBirthdayCake /> {props.contactData.birthday}
          </p>
          <p>
            <FiUsers /> {props.contactData.relationship}
          </p>
          <p>
            <FaStickyNote /> {props.contactData.notes}
          </p>
          <p>
            <FiHome /> {props.contactData.address}
          </p>
          <Map contactData={props.contactData} />
        </Col>
        <Col xs={2}>
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
              onClick={() => props.onDeleteContact(props.contactData.contactId, props.token)}
            >
              <FiTrash2 />
            </Button>
          </OverlayTrigger>
          <ToastContainer autoClose={500} />
        </Col>
      </Row>
      {/* <Row>
        <ReminderList 
          onReminderSubmit={props.onReminderSubmit} 
          onDeleteContact={props.onDeleteContact}
          token={props.token}
          contactData={props.contactData}
        />
      </Row> */}
    </div>
  );
};

export default Contact;
