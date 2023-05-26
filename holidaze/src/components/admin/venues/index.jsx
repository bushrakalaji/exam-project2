import React, { useEffect } from "react";
import { API_BASE_URL } from "../../../api/api";
import { useVenues } from "../../../hooks/useVenueStore";
import VenueCard from "../../venueCard";
import { Col, Row } from "react-bootstrap";
import { load } from "../../../storage/index.mjs";

function AdminVenues() {
  const { fetchAdminVenues, adminVenues, isLoading, hasError } = useVenues();
  const profile = load("profile");
  const name = profile.name;
  console.log(name);

  useEffect(() => {
    fetchAdminVenues(
      `${API_BASE_URL}/profiles/${name}/venues/?_bookings=true&_owner=true`
    );
  }, [fetchAdminVenues, name]);

  if (isLoading) {
    return <div>...Loading</div>;
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

export default AdminVenues;