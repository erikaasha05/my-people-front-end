import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./App.css";
import Contact from "./components/Contact";
import ContactList from "./components/ContactList";
import NavBar from "./components/NavBar";
import ReminderList from "./components/ReminderList";

const reminderDataTest = [
  {
    reminderId: 1,
    message: "this is a message",
    date: "02/01/2023",
  },
  {
    reminderId: 2,
    message: "huey's birthday",
    date: "03/17/2023",
  },
  {
    reminderId: 3,
    message: "my birthday",
    date: "12/05/2023",
  },
];

const contactDataTest = [
  {
    contactId: 1,
    firstName: "Erika",
    lastName: "Sha",
    number: 7325128558,
    email: "erikaasha05@gmail.com",
    address: "50 Dey St.",
    birthday: "12/05/1993",
    relationships: ["Ian's Fiancee"],
    notes: "notes will be here",
    tags: ["tag 1"],
  },
  {
    contactId: 2,
    firstName: "Huey",
    lastName: "Anderson-Sha",
    number: 7325128558,
    email: "erikaasha05@gmail.com",
    address: "50 Dey St.",
    birthday: "12/05/1993",
    relationships: ["Ian's Fiancee"],
    notes: "notes will be here",
    tags: ["tag 1"],
  },
  {
    contactId: 1,
    firstName: "Erika",
    lastName: "Sha",
    number: 7325128558,
    email: "erikaasha05@gmail.com",
    address: "50 Dey St.",
    birthday: "12/05/1993",
    relationships: ["Ian's Fiancee"],
    notes: "notes will be here",
    tags: ["tag 1"],
  },
  {
    contactId: 2,
    firstName: "Huey",
    lastName: "Anderson-Sha",
    number: 7325128558,
    email: "erikaasha05@gmail.com",
    address: "50 Dey St.",
    birthday: "12/05/1993",
    relationships: ["Ian's Fiancee"],
    notes: "notes will be here",
    tags: ["tag 1"],
  },
  {
    contactId: 1,
    firstName: "Erika",
    lastName: "Sha",
    number: 7325128558,
    email: "erikaasha05@gmail.com",
    address: "50 Dey St.",
    birthday: "12/05/1993",
    relationships: ["Ian's Fiancee"],
    notes: "notes will be here",
    tags: ["tag 1"],
  },
  {
    contactId: 2,
    firstName: "Huey",
    lastName: "Anderson-Sha",
    number: 7325128558,
    email: "erikaasha05@gmail.com",
    address: "50 Dey St.",
    birthday: "12/05/1993",
    relationships: ["Ian's Fiancee"],
    notes: "notes will be here",
    tags: ["tag 1"],
  },
  {
    contactId: 1,
    firstName: "Erika",
    lastName: "Sha",
    number: 7325128558,
    email: "erikaasha05@gmail.com",
    address: "50 Dey St.",
    birthday: "12/05/1993",
    relationships: ["Ian's Fiancee"],
    notes: "notes will be here",
    tags: ["tag 1"],
  },
  {
    contactId: 2,
    firstName: "Huey",
    lastName: "Anderson-Sha",
    number: 7325128558,
    email: "erikaasha05@gmail.com",
    address: "50 Dey St.",
    birthday: "12/05/1993",
    relationships: ["Ian's Fiancee"],
    notes: "notes will be here",
    tags: ["tag 1"],
  },
  {
    contactId: 1,
    firstName: "Erika",
    lastName: "Sha",
    number: 7325128558,
    email: "erikaasha05@gmail.com",
    address: "50 Dey St.",
    birthday: "12/05/1993",
    relationships: ["Ian's Fiancee"],
    notes: "notes will be here",
    tags: ["tag 1"],
  },
  {
    contactId: 2,
    firstName: "Huey",
    lastName: "Anderson-Sha",
    number: 7325128558,
    email: "erikaasha05@gmail.com",
    address: "50 Dey St.",
    birthday: "12/05/1993",
    relationships: ["Ian's Fiancee"],
    notes: "notes will be here",
    tags: ["tag 1"],
  },
];

const oneContactTest = {
  contactId: 1,
  firstName: "Erika",
  lastName: "Sha",
  number: 7325128558,
  email: "erikaasha05@gmail.com",
  address: "50 Dey St.",
  birthday: "12/05/1993",
  relationships: ["Ian's Fiancee"],
  notes: "notes will be here",
  tags: ["tag 1", "tag 2"],
};

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
    .catch((err) => {
      console.log(`error from get contact api ${err}`);
    });
};

const getRemindersForContactApi = (contactId) => {
  return axios
    .get(`${kBaseUrl}/contacts/${contactId}/reminders`)
    .then((response) => {
      return response.data.reminders.map(convertFromReminderApi);
    })
    .catch((err) => {
      console.log(`from get reminders for a contact api ${err}`);
    });
};

const createContactApi = (newContactData) => {
  return axios
    .post(`${kBaseUrl}/contacts`, newContactData)
    .then((response) => {
      return convertFromContactApi(response.data);
    })
    .catch((err) => {
      console.log(`create contact api ${err}`);
    });
};

const deleteContactApi = (contactId) => {
  return axios
    .delete(`${kBaseUrl}/contacts/${contactId}`)
    .then((response) => {
      return response.data.details;
    })
    .catch((err) => {
      console.log(`delete contact api ${err}`);
    });
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

function App() {
  const [contactData, setContactData] = useState([]);
  console.log(kBaseUrl);

  const getAllContacts = () =>{
    return getAllContactsApi().then((contacts) => {
      setContactData(contacts);
    });
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <section>
      <header className="App-header">
        <NavBar />
      </header>
      <Container className="mt-4">
        <Row className="h-100">
          <Col
            md={3}
            className="contact-container scrollbar scrollbar-near-moon"
          >
            <ContactList contacts={contactData} />
          </Col>
          <Col>
            <ReminderList reminders={reminderDataTest} />
            <Contact contactInfo={oneContactTest} />
          </Col>
        </Row>
      </Container>
      <footer></footer>
    </section>
  );
}

export default App;
