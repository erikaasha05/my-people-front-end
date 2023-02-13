import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { BiSearchAlt2 } from "react-icons/bi";

const SearchBar = (props) => {
  return (
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
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
}

export default SearchBar;
