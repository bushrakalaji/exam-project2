import React, { useEffect, useState } from "react";
import { Col, Row, Pagination } from "react-bootstrap";
import { useVenues } from "../../hooks/useVenueStore";
import IsLoading from "../isLoading";
import VenueCard from "../venueCard";

function VenuesList() {
  const { venues, fetchVenues, isLoading, hasError } = useVenues();
  const [currentPage, setCurrentPage] = useState(1);
  const venuesPerPage = 12;

  useEffect(() => {
    fetchVenues(
      "https://api.noroff.dev/api/v1/holidaze/venues?_bookigs=true&_owner=true"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchVenues]);

  if (isLoading) {
    return <IsLoading />;
  }
  if (hasError) {
    return <div>Error</div>;
  }

  // Calculate pagination
  const indexOfLastVenue = currentPage * venuesPerPage;
  const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
  const currentVenues = venues.slice(indexOfFirstVenue, indexOfLastVenue);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Row xs={2} md={3} lg={4} className="g-4 d-flex" id="explore">
        {currentVenues.map((venue) => (
          <Col key={venue.id}>
            <VenueCard venue={venue} className="mb-4 p-0" />
          </Col>
        ))}
      </Row>

      <Pagination className="d-flex justify-content-center mt-5">
        {Array.from(
          { length: Math.ceil(venues.length / venuesPerPage) },
          (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </>
  );
}

export default VenuesList;
