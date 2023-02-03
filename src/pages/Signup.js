import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logo from "../my_people_logo.png";

const Signup = () => {
  return (
    <Container className="my-5">
      <Card>
        <Row className="g-0 d-flex align-items-center">
          <Col md={5}>
            <Card.Img
              src={logo}
              alt="logo"
              className="rounded-t-5 rounded-tr-lg-0"
              fluid
            />
          </Col>
          <Col>
            <Card.Body>
              <Form>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="username" placeholder="Enter username" />
                  {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                {/* <Form.Group className="mb-4" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
              <div>
                Already have an account? <a href="/login">Sign In</a>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Signup;
