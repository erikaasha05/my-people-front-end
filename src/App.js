import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./App.css";
import Contact from "./components/Contact";
import ContactList from "./components/ContactList";
import NavBar from "./components/NavBar";
import ReminderList from "./components/ReminderList";
import useToken from "./components/useToken";
import Login from "./pages/Login";
// import Map from "./components/Map";

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

// refactored to get all contacts for the user signed in
const getAllContactsApi = (token) => {
  return axios
    .get(`${kBaseUrl}/users/contacts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response.data);
      return response.data.contacts.map(convertFromContactApi);
    })
    .catch((err) => console.log(`error from get contact api ${err}`));
};

const getAllRemindersApi = (token) => {
  return axios
    .get(`${kBaseUrl}/users/contacts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response.data.reminders);
      return response.data.reminders.map(convertFromReminderApi);
    })
    .catch((err) => console.log(`error from get reminders api ${err}`));
};

// refactored to check for valide token
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

// get all reminders in db
// const getAllRemindersApi = () => {
//   return axios
//     .get(`${kBaseUrl}/reminders`)
//     .then((response) => {
//       return response.data.map(convertFromReminderApi);
//     })
//     .catch((err) => console.log(`error from get reminders api ${err}`));
// };

// const getRemindersForContactApi = (contactId) => {
//   return axios
//     .get(`${kBaseUrl}/contacts/${contactId}/reminders`)
//     .then((response) => {
//       return response.data.reminders.map(convertFromReminderApi);
//     })
//     .catch((err) => {
//       console.log(`from get reminders for a contact api ${err}`);
//     });
// };

// refactored to create a contact for the user logged in
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

// refactored to update a contact for the user logged in
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

// refactored to delete contact for the user logged in
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

const createReminderApi = (newReminderData) => {
  return axios
    .post(`${kBaseUrl}/reminders`, newReminderData)
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(`create a reminder api ${err}`));
};

// refactored to check for valid token
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
  const [selectedContact, setSelectedContact] = useState({});
  const [reminderData, setReminderData] = useState([]);

  const { token, removeToken, setToken } = useToken();

  const getAllContacts = (token) => {
    return getAllContactsApi(token).then((contacts) => {
      setContactData(contacts);
    });
  };

  const getAllReminders = (token) => {
    return getAllRemindersApi(token).then((reminders) => {
      setReminderData(reminders);
    });
  };

  useEffect(() => {
    getAllContacts(token);
    getAllReminders(token);
  }, []);

  const deleteContact = (contactId, token) => {
    return deleteContactApi(contactId, token).then((contactResult) => {
      setSelectedContact({});
      getAllContacts(token);
    });
  };

  const deleteReminder = (reminderId, token) => {
    return deleteReminderApi(reminderId, token).then((reminderResult) => {
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

  const handleReminderSubmit = (data) => {
    createReminderApi(data)
      .then((newReminder) => {
        setReminderData([...reminderData, newReminder]);
      })
      .catch((err) => console.log(err));
  };

  const onContactSelect = async (contactId, token) => {
    const contact = await getOneContactApi(contactId, token);
    setSelectedContact(contact);
  };

  const onLogout = () => {
    return logUserOutApi().then((message) => {
      removeToken();
      console.log(message.msg);
      return message.msg;
    });
  };

  return (
    <section>
      {!token && token !== "" && token !== undefined ? (
        <Login />
      ) : (
        <div>
          <header className="App-header">
            <NavBar
              handleNewContactSubmit={handleNewContactSubmit}
              onLogout={onLogout}
              token={token}
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
                <ReminderList
                  reminders={reminderData}
                  onDeleteReminder={deleteReminder}
                  onReminderSubmit={handleReminderSubmit}
                  token={token}
                />
                <Contact
                  contactData={selectedContact}
                  onDeleteContact={deleteContact}
                  onReminderSubmit={handleReminderSubmit}
                  handleUpdateContactSubmit={handleUpdatedContactSubmit}
                  token={token}
                />
              </Col>
            </Row>
          </Container>
        </div>
      )}
      <footer></footer>
    </section>
  );
}

export default App;
