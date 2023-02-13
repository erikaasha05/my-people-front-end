import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./App.css";
import Contact from "./components/Contact";
import ContactList from "./components/ContactList";
import NavBar from "./components/NavBar";
import ReminderList from "./components/ReminderList";
import useToken from "./components/useToken";

const kBaseUrl = process.env.REACT_APP_BACKEND_URL;

const convertFromContactApi = (apiContact) => {
  const { contact_id, first_name, last_name, ...rest } = apiContact;
  const newContact = {
    contactId: contact_id,
    firstName: first_name,
    lastName: last_name,
    ...rest,
  };
  return newContact;
};

const convertToContactApi = (contact) => {
  const { firstName, lastName, ...rest } = contact;
  const apiContact = {
    first_name: firstName,
    last_name: lastName,
    ...rest,
  };
  return apiContact;
};

const convertFromReminderApi = (apiReminder) => {
  const { reminder_id, contact_id, ...rest } = apiReminder;
  const newReminder = {
    reminderId: reminder_id,
    contactId: contact_id,
    ...rest,
  };
  return newReminder;
};

// get all contacts for the user signed in
const getAllContactsApi = (token) => {
  return axios
    .get(`${kBaseUrl}/users/contacts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data.contacts.map(convertFromContactApi);
    })
    .catch((err) => console.log(`error from get contact api ${err}`));
};

// get all reminders for the user signed in
const getAllRemindersApi = (token) => {
  return axios
    .get(`${kBaseUrl}/users/contacts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data.reminders.map(convertFromReminderApi);
    })
    .catch((err) => console.log(`error from get reminders api ${err}`));
};

const getOneContactApi = (contactId, token) => {
  return axios
    .get(`${kBaseUrl}/contacts/${contactId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return convertFromContactApi(response.data);
    })
    .catch((err) => console.log(`error from get one contact api ${err}`));
};

// create a contact for the user logged in
const createContactApi = (newContactData, token) => {
  return axios
    .post(`${kBaseUrl}/contacts`, newContactData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return convertFromContactApi(response.data);
    })
    .catch((err) => console.log(`create contact api ${err}`));
};

// update a contact for the user logged in
const updateContactApi = (updatedContactData, contactId, token) => {
  return axios
    .put(`${kBaseUrl}/contacts/${contactId}`, updatedContactData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return convertFromContactApi(response.data.contact);
    })
    .catch((err) => console.log(`update contact api ${err}`));
};

// delete contact for the user logged in
const deleteContactApi = (contactId, token) => {
  return axios
    .delete(`${kBaseUrl}/contacts/${contactId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data.details;
    })
    .catch((err) => console.log(`delete contact api ${err}`));
};

// create reminder for a contact
const createReminderApi = (contactId, newReminderData, token) => {
  return axios
    .post(`${kBaseUrl}/contacts/${contactId}/reminders`, newReminderData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(`create a reminder api ${err}`));
};

// delete reminder for a contact
const deleteReminderApi = (reminderId, token) => {
  return axios
    .delete(`${kBaseUrl}/reminders/${reminderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data.details;
    })
    .catch((err) => {
      console.log(`delete reminder api ${err}`);
    });
};

// log a user out
const logUserOutApi = () => {
  return axios
    .post(`${kBaseUrl}/logout`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(`log user out api ${err}`));
};

function App() {
  const [contactData, setContactData] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");
  const [reminderData, setReminderData] = useState([]);
  const [showReminders, setShowReminders] = useState(false);

  const { token, removeToken } = useToken();
  const navigate = useNavigate();

  const getAllContacts = (token) => {
    return getAllContactsApi(token).then((contacts) => {
      setContactData(contacts);
    });
  };

  const getAllReminders = (token) => {
    return getAllRemindersApi(token).then((reminders) => {
      const sortedReminders = reminders.sort((a, b) =>
        a["date"] < b["date"] ? -1 : 1
      );
      setReminderData(sortedReminders);
    });
  };

  useEffect(() => {
    getAllContacts(token);
    getAllReminders(token);
    // eslint-disable-next-line
  }, []);

  const deleteContactToast = () => {
    toast.success("Contact deleted", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const deleteContact = (contactId, token) => {
    return deleteContactApi(contactId, token).then((contactResult) => {
      deleteContactToast();
      setTimeout(() => {
        setSelectedContact("");
        getAllContacts(token);
      }, 1500);
    });
  };

  const deleteReminderToast = () => {
    toast.success("Reminder deleted", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const deleteReminder = (reminderId, token) => {
    return deleteReminderApi(reminderId, token).then((reminderResult) => {
      deleteReminderToast();
      getAllReminders(token);
    });
  };

  const handleNewContactSubmit = (data, token) => {
    const apiContactData = convertToContactApi(data);
    createContactApi(apiContactData, token)
      .then((newContact) => {
        setContactData([...contactData, newContact]);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdatedContactSubmit = (data, id, token) => {
    const apiUpdatedContact = convertToContactApi(data);
    updateContactApi(apiUpdatedContact, id, token)
      .then((updatedContact) => {
        getAllContacts(token);
        setSelectedContact(updatedContact);
      })
      .catch((err) => console.log(err));
  };

  const handleReminderSubmit = (contactId, data, token) => {
    createReminderApi(contactId, data, token)
      .then((newReminder) => {
        setReminderData([...reminderData, newReminder]);
        getAllReminders(token);
      })
      .catch((err) => console.log(err));
  };

  const onContactSelect = async (contactId, token) => {
    const contact = await getOneContactApi(contactId, token);
    setShowReminders(false);
    setSelectedContact(contact);
  };

  const onReminderSelect = () => {
    setSelectedContact("");
    setShowReminders(true);
  };

  const onLogout = () => {
    return logUserOutApi().then((message) => {
      removeToken();
      navigate("/login");
      return message.msg;
    });
  };

  return (
    <section>
      {(!token && token !== "" && token !== undefined) || !contactData ? (
        navigate("/login")
      ) : (
        <div>
          <header className="App-header">
            <NavBar
              handleNewContactSubmit={handleNewContactSubmit}
              onLogout={onLogout}
              token={token}
              onReminderSelect={onReminderSelect}
            />
          </header>
          <Container className="mt-4">
            <Row className="h-100">
              <Col
                md={3}
                className="contact-container scrollbar scrollbar-near-moon"
              >
                <ContactList
                  contacts={contactData}
                  onSelect={onContactSelect}
                  token={token}
                />
              </Col>
              <Col>
                {showReminders ? (
                  <ReminderList
                    reminders={reminderData}
                    onDeleteReminder={deleteReminder}
                    onReminderSubmit={handleReminderSubmit}
                    token={token}
                  />
                ) : null}
                {selectedContact ? (
                  <Contact
                    contactData={selectedContact}
                    onDeleteContact={deleteContact}
                    onReminderSubmit={handleReminderSubmit}
                    handleUpdateContactSubmit={handleUpdatedContactSubmit}
                    token={token}
                  />
                ) : null}
              </Col>
            </Row>
          </Container>
        </div>
      )}
      <footer className="bg-light">
        <Container>
          <p className="footer-text">Copyright &copy; 2023 My People</p>
        </Container>
      </footer>
    </section>
  );
}

export default App;
