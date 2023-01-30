import { Container } from "react-bootstrap";
import "./App.css";
import NavBar from "./components/NavBar";
import NewContactForm from "./components/NewContactForm";

function App() {
  return (
    <Container>
      <header className="App-header">
        <NavBar />
        <a
          className="btn btn-primary"
          data-bs-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Bootstrap button
        </a>
      </header>
      <NewContactForm />
    </Container>
  );
}

export default App;
