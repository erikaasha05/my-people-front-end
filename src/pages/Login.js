import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import logo from "../my_people_logo.png";
import useToken from "../components/useToken";

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
  const [message, setMessage] = useState("hello");
  const { setToken } = useToken();
  const navigate = useNavigate();

  const handleLoginSubmit = (userDetails) => {
    logUserInApi(userDetails).then((response) => {
      setToken(response.access_token);
      setMessage(response);
      console.log()

      if (response.msg === "Successfully logged in.") {
        navigate("/dashboard");
      }
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
    <Container className="my-5 login-container">
      <Card>
        <Row className="g-0 d-flex align-items-center">
          <Col md={5}>
            <Card.Img
              src={logo}
              alt="logo"
              className="rounded-t-5 rounded-tr-lg-0"
              fluid="true"
            />
          </Col>
          <Col>
            <Card.Body>
              <h1>Sign In</h1>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-4">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    value={loginForm.username}
                    onChange={handleUserData}
                    required={true}
                    placeholder="Enter username"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    ttype="text"
                    id="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleUserData}
                    required={true}
                    placeholder="Password"
                  />
                </Form.Group>
                <Button variant="dark" type="submit">
                  Sign In
                </Button>
                <Form.Group className="mt-2">
                  <Form.Text className="text-muted">{message.msg}</Form.Text>
                </Form.Group>
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
