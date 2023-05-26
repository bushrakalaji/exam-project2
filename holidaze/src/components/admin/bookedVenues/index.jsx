import React, { useEffect } from "react";
import { API_BASE_URL } from "../../../api/api";
import { Card } from "react-bootstrap";
import { useVenues } from "../../../hooks/useVenueStore";
import HasError from "../../hasError";
import IsLoading from "../../isLoading";
import { load } from "../../../storage/index.mjs";

function BookedVenues() {
  const { adminVenues, fetchAdminVenues, isLoading, hasError } = useVenues();

  const profile = load("profile");
  const name = profile.name;
  console.log(adminVenues);

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
  const booked =
    adminVenues[1] && adminVenues[1].bookings && adminVenues[1].bookings;

  console.log(booked);
  return (
    <div className="d-flex flex-wrap justify-content-center gap-5">
      {adminVenues &&
        adminVenues.map((venue) => {
          const bookings = venue.bookings;
          if (bookings && bookings.length > 0) {
            return (
              <Card
                key={venue.id}
                className="h-100 shadow-sm bg-white rounded "
                style={{ height: "100%", width: "400px" }}
              >
                <div>
                  <div style={{ height: "200px" }}>
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
                  </div>
                  <div className="m-2">
                    <h2>{venue.name}</h2>
                  </div>
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="d-flex flex-column bg-secondary m-2 p-2 gap-2"
                    >
                      {" "}
                      <div className="d-flex gap-1 fs-4">
                        <span>{booking.guests}</span>{" "}
                        <i className="bi bi-people-fill"></i>
                      </div>
                      <div className="d-flex flex-column">
                        <span>
                          From:{" "}
                          {new Date(booking.dateFrom).toLocaleString("en-US")}
                        </span>
                        <span>
                          To: {new Date(booking.dateTo).toLocaleString("en-US")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          }
          return null; // Return a value explicitly when condition is not met
        })}
    </div>
  );
}

export default BookedVenues;
