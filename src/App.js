// import { useState } from "react";
import { Container } from "react-bootstrap";
import "./App.css";
import Contact from "./components/Contact";
import ContactList from "./components/ContactList";
import NavBar from "./components/NavBar";
import NewContactForm from "./components/NewContactForm";
import NewReminderForm from "./components/NewReminderForm";


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
  // const [show, setShow] = useState(false);

  // const handleModalClose = () => setShow(false);
  // const handleModalShow = () => setShow(true);

  return (
    <section>
      <header className="App-header">
          <NavBar />
      </header>
      <Container>
        <ContactList contacts={contactData}/>
        <Contact contactInfo={oneContact}/>
        <NewContactForm />
        <NewReminderForm />
        {/* <Button onClick={handleModalShow}>
          Set Reminder
        </Button>
        <Modal show={show} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Reminder</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewReminderForm />
          </Modal.Body>
        </Modal> */}
      </Container>
    </section>
  );
}

export default App;
