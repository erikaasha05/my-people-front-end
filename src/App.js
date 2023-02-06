import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./App.css";
import Contact from "./components/Contact";
import ContactList from "./components/ContactList";
import NavBar from "./components/NavBar";
import ReminderList from "./components/ReminderList";
// import Map from "./components/Map";

// const reminderDataTest = [
//   {
//     reminderId: 1,
//     message: "this is a message",
//     date: "02/01/2023",
//   },
//   {
//     reminderId: 2,
//     message: "huey's birthday",
//     date: "03/17/2023",
//   },
//   {
//     reminderId: 3,
//     message: "my birthday",
//     date: "12/05/2023",
//   },
// ];

// const contactDataTest = [
//   {
//     contactId: 1,
//     firstName: "Erika",
//     lastName: "Sha",
//     number: 7325128558,
//     email: "erikaasha05@gmail.com",
//     address: "50 Dey St.",
//     birthday: "12/05/1993",
//     relationships: ["Ian's Fiancee"],
//     notes: "notes will be here",
//     tags: ["tag 1"],
//   },
//   {
//     contactId: 2,
//     firstName: "Huey",
//     lastName: "Anderson-Sha",
//     number: 7325128558,
//     email: "erikaasha05@gmail.com",
//     address: "50 Dey St.",
//     birthday: "12/05/1993",
//     relationships: ["Ian's Fiancee"],
//     notes: "notes will be here",
//     tags: ["tag 1"],
//   },
//   {
//     contactId: 1,
//     firstName: "Erika",
//     lastName: "Sha",
//     number: 7325128558,
//     email: "erikaasha05@gmail.com",
//     address: "50 Dey St.",
//     birthday: "12/05/1993",
//     relationships: ["Ian's Fiancee"],
//     notes: "notes will be here",
//     tags: ["tag 1"],
//   },
//   {
//     contactId: 2,
//     firstName: "Huey",
//     lastName: "Anderson-Sha",
//     number: 7325128558,
//     email: "erikaasha05@gmail.com",
//     address: "50 Dey St.",
//     birthday: "12/05/1993",
//     relationships: ["Ian's Fiancee"],
//     notes: "notes will be here",
//     tags: ["tag 1"],
//   },
//   {
//     contactId: 1,
//     firstName: "Erika",
//     lastName: "Sha",
//     number: 7325128558,
//     email: "erikaasha05@gmail.com",
//     address: "50 Dey St.",
//     birthday: "12/05/1993",
//     relationships: ["Ian's Fiancee"],
//     notes: "notes will be here",
//     tags: ["tag 1"],
//   },
//   {
//     contactId: 2,
//     firstName: "Huey",
//     lastName: "Anderson-Sha",
//     number: 7325128558,
//     email: "erikaasha05@gmail.com",
//     address: "50 Dey St.",
//     birthday: "12/05/1993",
//     relationships: ["Ian's Fiancee"],
//     notes: "notes will be here",
//     tags: ["tag 1"],
//   },
//   {
//     contactId: 1,
//     firstName: "Erika",
//     lastName: "Sha",
//     number: 7325128558,
//     email: "erikaasha05@gmail.com",
//     address: "50 Dey St.",
//     birthday: "12/05/1993",
//     relationships: ["Ian's Fiancee"],
//     notes: "notes will be here",
//     tags: ["tag 1"],
//   },
//   {
//     contactId: 2,
//     firstName: "Huey",
//     lastName: "Anderson-Sha",
//     number: 7325128558,
//     email: "erikaasha05@gmail.com",
//     address: "50 Dey St.",
//     birthday: "12/05/1993",
//     relationships: ["Ian's Fiancee"],
//     notes: "notes will be here",
//     tags: ["tag 1"],
//   },
//   {
//     contactId: 1,
//     firstName: "Erika",
//     lastName: "Sha",
//     number: 7325128558,
//     email: "erikaasha05@gmail.com",
//     address: "50 Dey St.",
//     birthday: "12/05/1993",
//     relationships: ["Ian's Fiancee"],
//     notes: "notes will be here",
//     tags: ["tag 1"],
//   },
//   {
//     contactId: 2,
//     firstName: "Huey",
//     lastName: "Anderson-Sha",
//     number: 7325128558,
//     email: "erikaasha05@gmail.com",
//     address: "50 Dey St.",
//     birthday: "12/05/1993",
//     relationships: ["Ian's Fiancee"],
//     notes: "notes will be here",
//     tags: ["tag 1"],
//   },
// ];

// const oneContactTest = {
//   contactId: 1,
//   firstName: "Erika",
//   lastName: "Sha",
//   number: 7325128558,
//   email: "erikaasha05@gmail.com",
//   address: "50 Dey St.",
//   birthday: "12/05/1993",
//   relationships: ["Ian's Fiancee"],
//   notes: "notes will be here",
//   tags: ["tag 1", "tag 2"],
// };

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

const getAllContactsApi = () => {
  return axios
    .get(`${kBaseUrl}/contacts`)
    .then((response) => {
      return response.data.map(convertFromContactApi);
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

  const getAllContacts = () => {
    return getAllContactsApi().then((contacts) => {
      setContactData(contacts);
    });
  };

  const getAllReminders = () => {
    return getAllRemindersApi().then((reminders) => {
      setReminderData(reminders);
    });
  };

  useEffect(() => {
    getAllContacts();
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
