import React, { useEffect, useState } from "react";
import { Form, ListGroup } from "react-bootstrap";
import { useVenues } from "../../hooks/useVenueStore";
import { LinkContainer } from "react-router-bootstrap";
import { API_BASE_URL } from "../../api/api";
import IsLoading from "../isLoading";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchSearch, searchList, isLoading, hasError } = useVenues();
  const [filterdVenues, setFilterdVenues] = useState([]);

  useEffect(() => {
    fetchSearch(API_BASE_URL + "/venues");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchSearch]);

  useEffect(() => {
    if (searchList) {
      setFilterdVenues(
        searchList.filter((venue) =>
          venue.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchList, searchQuery]);

  const handelChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClick = (venue) => {
    setSearchQuery(venue.name);
    setFilterdVenues([]);
  };

  if (isLoading) {
    return <IsLoading />;
  }

  if (hasError) {
    return <p>There was an error fetching the products.</p>;
  }

  return (
    <Form>
      <Form.Group>
        <div className=" border  rounded    form-floating">
          <Form.Control
            type="text"
            placeholder="Search for Venues..."
            value={searchQuery}
            onChange={handelChange}
            style={{ border: "none", width: "300px" }}
            id="search"
          />
          <label htmlFor="search">
            <i className="bi bi-search text-primary"></i> Search
          </label>
        </div>
        {searchQuery && (
          <ListGroup
            style={{ zIndex: 1000, position: "absolute" }}
            onMouseLeave={() => setFilterdVenues([])}
          >
            {filterdVenues.map((venue) => (
              <LinkContainer key={venue.id} to={`/venues/${venue.id}`}>
                <ListGroup.Item action onClick={() => handleClick(venue)}>
                  {venue.name}
                </ListGroup.Item>
              </LinkContainer>
            ))}
          </ListGroup>
        )}
      </Form.Group>
    </Form>
  );
}

export default SearchBar;
