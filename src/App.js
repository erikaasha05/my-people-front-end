import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./App.css";
import Contact from "./components/Contact";
import ContactList from "./components/ContactList";
import NavBar from "./components/NavBar";
import ReminderList from "./components/ReminderList";
import useToken from "./components/useToken";
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
    .get(`${kBaseUrl}/users/contacts`, {headers: {"Authorization": `Bearer ${token}`}})
    .then((response) => {
      return response.data.contacts.map(convertFromContactApi);
    })
    .catch((err) => console.log(`error from get contact api ${err}`));
};

const getOneContactApi = (contactId) => {
  return axios
    .get(`${kBaseUrl}/contacts/${contactId}`)
    .then((response) => {
      return convertFromContactApi(response.data);
    })
    .catch((err) => console.log(`error from get one contact api ${err}`));
};

const getAllRemindersApi = () => {
  return axios
    .get(`${kBaseUrl}/reminders`)
    .then((response) => {
      return response.data.map(convertFromReminderApi);
    })
    .catch((err) => console.log(`error from get reminders api ${err}`));
};

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

const createContactApi = (newContactData) => {
  return axios
    .post(`${kBaseUrl}/contacts`, newContactData)
    .then((response) => {
      return convertFromContactApi(response.data);
    })
    .catch((err) => console.log(`create contact api ${err}`));
};

const updateContactApi = (updatedContactData, contactId) => {
  return axios
    .put(`${kBaseUrl}/contacts/${contactId}`, updatedContactData)
    .then((response) => {
      return convertFromContactApi(response.data.contact);
    })
    .catch((err) => console.log(`update contact api ${err}`));
};

const deleteContactApi = (contactId) => {
  return axios
    .delete(`${kBaseUrl}/contacts/${contactId}`)
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

const deleteReminderApi = (reminderId) => {
  return axios
    .delete(`${kBaseUrl}/reminders/${reminderId}`)
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
      console.log(contactData);
    });
  };

  const getAllReminders = () => {
    return getAllRemindersApi().then((reminders) => {
      setReminderData(reminders);
    });
  };

  useEffect(() => {
    getAllContacts(token);
    getAllReminders();
  }, []);

  const deleteContact = (contactId) => {
    return deleteContactApi(contactId).then((contactResult) => {
      setSelectedContact({});
      getAllContacts();
    });
  };

  const deleteReminder = (reminderId) => {
    return deleteReminderApi(reminderId).then((reminderResult) => {
      getAllReminders();
    });
  };

  const handleNewContactSubmit = (data) => {
    const apiContactData = convertToContactApi(data);
    createContactApi(apiContactData)
      .then((newContact) => {
        setContactData([...contactData, newContact]);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdatedContactSubmit = (data, id) => {
    const apiUpdatedContact = convertToContactApi(data);
    updateContactApi(apiUpdatedContact, id)
      .then((updatedContact) => {
        getAllContacts();
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

  const onContactSelect = async (contactId) => {
    const contact = await getOneContactApi(contactId);
    setSelectedContact(contact);
  };

  const onLogout = () => {
    return logUserOutApi()
      .then((message) => {
        removeToken();
        console.log(message.msg);
        return message.msg;
      })
  }

  return (
    <section>
      <header className="App-header">
        <NavBar handleNewContactSubmit={handleNewContactSubmit} onLogout={onLogout} />
      </header>
      <Container className="mt-4">
        <Row className="h-100">
          <Col
            md={3}
            className="contact-container scrollbar scrollbar-near-moon"
          >
            <ContactList contacts={contactData} onSelect={onContactSelect} />
          </Col>
          <Col>
            <ReminderList
              reminders={reminderData}
              onDeleteReminder={deleteReminder}
              onReminderSubmit={handleReminderSubmit}
            />
            <Contact
              contactData={selectedContact}
              onDeleteContact={deleteContact}
              onReminderSubmit={handleReminderSubmit}
              handleUpdateContactSubmit={handleUpdatedContactSubmit}
            />
          </Col>
        </Row>
      </Container>
      <footer></footer>
    </section>
  );
}

export default App;
