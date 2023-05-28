import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookings } from "../../../hooks/useBookingStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HasError from "../../hasError";
import IsLoading from "../../isLoading";
import DeleteBooking from "../deleteBooking";
import { Dropdown, ButtonGroup, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UpdateBooking from "../update";
import placeholder from "../../../images/placeHolder.png";

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
        navigate("/bookings");
        window.location.reload();
      },
      draggable: false,
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
    <div className="d-flex flex-wrap justify-content-center gap-1 ">
      {" "}
      <Row
        className="img-style shadow-sm rounded mx-2 flex-fill"
        style={{ overflow: "hidden", maxWidth: "600px", maxHeight: "600px" }}
      >
        {media ? (
          <img
            src={media}
            alt={venue.name}
            style={{ objectFit: "cover" }}
            className="w-100 h-100 p-0"
          />
        ) : (
          <img
            src={placeholder}
            alt="placeholder"
            style={{ objectFit: "cover" }}
            className="w-100 h-100 p-0"
          />
        )}
      </Row>
      <div
        className="d-flex flex-column gap-2 bg-secondary p-5 shadow-sm rounded position-relative  flex-fill"
        style={{ maxWidth: "600px", maxHeight: "600px" }}
      >
        <div
          className="position-absolute"
          style={{ top: "0px", right: "10px" }}
        >
          {" "}
          <Dropdown className="menuDots " as={ButtonGroup}>
            <Dropdown.Toggle
              id="dropdown-custom-components"
              variant="btn p-0 border-0 "
            >
              <i className="bi bi-three-dots-vertical fs-2"></i>
              <span className="visually-hidden">Open</span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="super-colors">
              <LinkContainer to={`/venues/${venue.id}`}>
                <Dropdown.Item>
                  <span>View venue</span>{" "}
                </Dropdown.Item>
              </LinkContainer>
              <UpdateBooking />
              <DeleteBooking onBookingDeleted={handleBookingDeleted} />
            </Dropdown.Menu>
          </Dropdown>
        </div>{" "}
        <h1 className="fs-2">{venue.name}</h1>
        <div className="d-flex gap-1 ">
          <i className="bi bi-geo-alt-fill text-danger"></i>
          <span> {venue.location.address} </span>{" "}
          <span>{venue.location.city}</span>
          <span>{venue.location.zip} </span>{" "}
          <span> {venue.location.country}</span>
        </div>{" "}
        <div>
          <span className="fs-4 fst-italic">
            {" "}
            <i className="bi bi-people-fill"></i> {guests}{" "}
          </span>
        </div>
        <div>
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
      </div>{" "}
      {bookingDeleted && notifyBookingDeleted()}
    </div>
  );
}

export default BookingById;
