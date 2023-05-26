import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookings } from "../../../hooks/useBookingStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HasError from "../../hasError";
import IsLoading from "../../isLoading";
import DeleteBooking from "../deleteBooking";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UpdateBooking from "../update";

function BookingById() {
  const { currentBooking, fetchBooking, isLoading, hasError } = useBookings();
  let { id } = useParams();
  const navigate = useNavigate();
  const [bookingDeleted, setBookingDeleted] = useState(false);
  const { venue, dateFrom, dateTo, guests } = currentBooking;
  const media = venue?.media[0];
  const formattedDateFrom = new Date(dateFrom).toLocaleString("en-US");
  const formattedDateTo = new Date(dateTo).toLocaleString("en-US");
  const expired = new Date() > new Date(dateTo);
  const notifyBookingDeleted = () => {
    toast.success("Booking deleted successfully!", {
      onClose: () => {
        navigate("/dashboard/bookings");
        window.location.reload();
      },
    });
  };
  useEffect(() => {
    fetchBooking(
      `https://api.noroff.dev/api/v1/holidaze/bookings/${id}?_venue=true&_customer=true`
    ); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleBookingDeleted = () => {
    setBookingDeleted(true);
  };
  if (isLoading || !currentBooking) {
    return <IsLoading />;
  }

  if (hasError || !currentBooking.venue) {
    return <HasError error="Booking not found" />;
  }

  return (
    <section className="d-flex border border-2 border-primary p-3 border-opacity-10 rounded gap-3 flex-wrap position-relative">
      <div className="position-absolute top-0 end-0">
        {" "}
        <NavDropdown
          id="nav-dropdown-dark-example"
          title={<i className="bi bi-three-dots fs-1"></i>}
          menuVariant="dark"
          className="d-flex flex-column align-items-start"
        >
          {" "}
          <LinkContainer to={`/venues/${venue.id}`}>
            <NavDropdown.Item>
              <span>View venue</span>{" "}
            </NavDropdown.Item>
          </LinkContainer>
          <UpdateBooking />
          <DeleteBooking onBookingDeleted={handleBookingDeleted} />
        </NavDropdown>
      </div>
      <div className="d-flex gap-5 flex-wrap">
        <div>
          <img
            src={media}
            alt={venue.name}
            className="img-fluid rounded"
            width="500px"
          />
        </div>
        <div className="d-flex flex-column gap-3">
          <h1>{venue.name}</h1>
          <div className="d-flex gap-5 flex-wrap">
            <div>
              <h3>Date & Time</h3>
              <div className="d-flex flex-column gap-1 bg-danger p-3 rounded-start text-light fs-5 fst-italic border border-secondary border-3">
                {expired ? (
                  <span>This booking has expired</span>
                ) : (
                  <div className="d-flex flex-column gap-1">
                    <span>From: {formattedDateFrom}</span>
                    <span>To: {formattedDateTo}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3>Guests</h3>
              <span className="fs-4 fst-italic">{guests} Person/s</span>
            </div>
          </div>
        </div>
      </div>
      {bookingDeleted && notifyBookingDeleted()}
    </section>
  );
}

export default BookingById;
