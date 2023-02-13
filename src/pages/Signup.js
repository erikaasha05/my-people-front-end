import React, { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logo from "../my_people_logo.png";

const kDefaultFormData = {
  username: "",
  password: "",
};

const registerUserApi = (newUserData) => {
  return axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/users`, newUserData)
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(`register user api ${err}`));
};

const Signup = () => {
  const [signupForm, setSignupForm] = useState(kDefaultFormData);
  const [message, setMessage] = useState("");

  const handleNewUserSubmit = (newUserDetails) => {
    registerUserApi(newUserDetails).then((response) => {
      console.log(response);
      setMessage(response);
      return response;
    });
  };

const handleRegister = (event) => {
  event.preventDefault();
  handleNewUserSubmit(signupForm);
  setSignupForm(kDefaultFormData);
};

const handleNewUserData = (event) =>{
  const dataValue = event.target.value;
  const dataField = event.target.name;

  const newUser = { ...signupForm, [dataField]: dataValue };
  setSignupForm(newUser);
};

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
              <h1>Register</h1>
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-4">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    value={signupForm.username}
                    onChange={handleNewUserData}
                    required="true"
                    placeholder="Enter username"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="text"
                    id="password"
                    name="password"
                    value={signupForm.password}
                    onChange={handleNewUserData}
                    required="true"
                    placeholder="Password"
                  />
                </Form.Group>
                <Button variant="dark" type="submit">
                  Register
                </Button>
                <Form.Group className="mt-2">
                  <Form.Text className="text-muted">
                    {message}
                  </Form.Text>
                </Form.Group>
              </Form>
              <div className="mt-2">
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
