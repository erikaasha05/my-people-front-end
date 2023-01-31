// import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import Contact from "./components/Contact";
import ContactList from "./components/ContactList";
import NavBar from "./components/NavBar";
import ReminderList from "./components/ReminderList";

const reminderData = [
  {
    reminderId: 1,
    message: "this is a message",
    date: "02/01/2023"
  },
  {
    reminderId: 2,
    message: "huey's birthday",
    date: "03/17/2023"
  },
  {
    reminderId: 3,
    message: "my birthday",
    date: "12/05/2023"
  }
]

const contactData = [
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
    tags: ["tag 1"]
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
    tags: ["tag 1"]
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
    tags: ["tag 1"]
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
    tags: ["tag 1"]
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
    tags: ["tag 1"]
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
    tags: ["tag 1"]
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
    tags: ["tag 1"]
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
    tags: ["tag 1"]
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
    tags: ["tag 1"]
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
    tags: ["tag 1"]
  }
]

const oneContact = 
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
    tags: ["tag 1"]
  }


function App() {

  return (
    <section>
      <header className="App-header">
          <NavBar />
      </header>
      <Container className="mt-4">
        <Row className="h-100">
          <Col md={3} className="contact-container scrollbar scrollbar-near-moon">
          <ContactList contacts={contactData}/>
          </Col>
          <Col>
          {/* <ReminderList reminders={reminderData}/> */}
          <Contact contactInfo={oneContact}/>
          </Col>
        </Row>
        
      </Container>
      <footer>

      </footer>
    </section>
  );
}

export default App;
