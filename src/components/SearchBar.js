import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { BiSearchAlt2 } from "react-icons/bi";

const SearchBar = (props) => {
  return (
    <Row>
      <Form action="/dashboard" method="get" className="d-flex">
        <Form.Control
          type="text"
          id="search"
          name="search"
          placeholder="Search by name"
          onChange={(event) => props.setSearchQuery(event.target.value)}
          value={props.searchQuery}
          className="mb-3"
        />
        <Button type="submit" className="mb-3 ms-2" variant="outline-secondary"><BiSearchAlt2 /></Button>
      </Form>
    </Row>
  );
};

export default SearchBar;
