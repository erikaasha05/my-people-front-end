import React, { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logo from "../my_people_logo.png";
// import logUserInApi from "../App.js";

const kDefaultFormData = {
  username: "",
  password: "",
};

const logUserInApi = (userData) => {
  return axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/login`, userData)
    .then((response) => {
      return response.data;
    })
    .catch((err) => console.log(`log user in api ${err}`));
};

const Login = () => {
  const [loginForm, setLoginForm] = useState(kDefaultFormData);

  const handleLoginSubmit = (userDetails) => {
    logUserInApi(userDetails).then((data) => {
      console.log(data);
      return data
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    handleLoginSubmit(loginForm);
    setLoginForm(kDefaultFormData);
  };

  const handleUserData = (event) => {
    const dataValue = event.target.value;
    const dataField = event.target.name;

    const userData = { ...loginForm, [dataField]: dataValue };
    setLoginForm(userData);
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
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-4">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    value={loginForm.username}
                    onChange={handleUserData}
                    required="true"
                    placeholder="Enter username"
                  />
                  {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    ttype="text"
                    id="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleUserData}
                    required="true"
                    placeholder="Password"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Sign In
                </Button>
              </Form>
              <div className="mt-2">
                Don't have an account? <a href="/signup">Register</a>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Login;
