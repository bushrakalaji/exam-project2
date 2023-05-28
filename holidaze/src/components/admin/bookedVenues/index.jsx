import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../api/api";
import { Card } from "react-bootstrap";
import { useVenues } from "../../../hooks/useVenueStore";
import HasError from "../../hasError";
import IsLoading from "../../isLoading";
import { load } from "../../../storage/index.mjs";
import placeholder from "../../../images/placeHolder.png";
import { Button, Modal } from "react-bootstrap";

function BookedVenues() {
  const { adminVenues, fetchAdminVenues, isLoading, hasError } = useVenues();

  const profile = load("profile");
  const name = profile.name;

  const [show, setShow] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedVenue(null);
  };

  const handleShow = (venue) => {
    setShow(true);
    setSelectedVenue(venue);
  };

  useEffect(() => {
    fetchAdminVenues(
      `${API_BASE_URL}/profiles/${name}/venues/?_bookings=true&_owner=true`
    ); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || !adminVenues) {
    return <IsLoading />;
  }

  if (hasError || !adminVenues) {
    return <HasError />;
  }

  return (
    <div className="d-flex flex-wrap justify-content-center gap-2">
      {adminVenues &&
        adminVenues.map((venue) => {
          const bookings = venue.bookings;
          if (bookings && bookings.length > 0) {
            return (
              <Card
                key={venue.id}
                className="h-100 shadow-sm bg-white rounded d-flex flex-column gap-2 "
                style={{ height: "100%", width: "300px" }}
              >
                <div style={{ height: "200px" }}>
                  {venue.media[0] ? (
                    <Card.Img
                      alt={name}
                      variant="top"
                      src={venue.media[0]}
                      style={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  ) : (
                    <Card.Img
                      alt={name}
                      variant="top"
                      src={placeholder}
                      style={{
                        objectFit: "cover",
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  )}
                </div>

                {/* Card body here */}
                <Button
                  onClick={() => handleShow(venue)}
                  variant="btn btn-outline-primary"
                  className="m-2"
                >
                  Show Bookings
                </Button>
              </Card>
            );
          }
          return null; // Return a value explicitly when condition is not met
        })}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          Bookings for {selectedVenue?.name}
        </Modal.Header>
        <Modal.Body>
          {selectedVenue &&
            selectedVenue.bookings.map((booking) => (
              <div
                key={booking.id}
                className="d-flex flex-column bg-secondary m-2 p-2 gap-2"
              >
                <div className="d-flex gap-1 fs-4">
                  <span>{booking.guests}</span>{" "}
                  <i className="bi bi-people-fill"></i>
                </div>
                <div className="d-flex flex-column">
                  <span>
                    From: {new Date(booking.dateFrom).toLocaleString("en-US")}
                  </span>
                  <span>
                    To: {new Date(booking.dateTo).toLocaleString("en-US")}
                  </span>
                </div>
              </div>
            ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BookedVenues;
