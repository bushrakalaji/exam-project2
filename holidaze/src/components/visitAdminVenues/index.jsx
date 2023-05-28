import React, { useEffect } from "react";
import { API_BASE_URL } from "../../api/api";
import { useVenues } from "../../hooks/useVenueStore";
import VenueCard from "../venueCard";
import { Col, Row } from "react-bootstrap";
import IsLoading from "../isLoading";
import { useParams } from "react-router-dom";

function VisitAdminVenues() {
  const { fetchAdminVenues, adminVenues, isLoading, hasError } = useVenues();
  console.log(adminVenues);
  const { name } = useParams();

  useEffect(() => {
    fetchAdminVenues(
      `${API_BASE_URL}/profiles/${name}/venues/?_bookings=true&_owner=true`
    );
  }, [fetchAdminVenues, name]);

  if (isLoading) {
    return <IsLoading />;
  }
  if (hasError) {
    return <div>error</div>;
  }

  return (
    <Row xs={2} md={3} lg={4} className="g-2 d-flex" id="explore">
      {adminVenues &&
        adminVenues.map((venue) => (
          <Col key={venue.id}>
            <VenueCard venue={venue} className="mb-4 p-0" />
          </Col>
        ))}
    </Row>
  );
}

export default VisitAdminVenues;
