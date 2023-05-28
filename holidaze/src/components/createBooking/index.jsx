import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useVenues } from "../../hooks/useVenueStore";
import DateRangePicker from "../rangeDate/";
import * as Yup from "yup";
import { load } from "../../storage/index.mjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "../login";

const bookingSchema = Yup.object().shape({
  guests: Yup.number().required("Guests is required").min(1, "Minimum 1 guest"),
});

function CreateBooking() {
  const { sendBookings, currentVenue } = useVenues();
  const token = load("token");

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  let { id } = useParams();
  const [guests, setGuests] = useState(1);
  const [submitBooking, setSubmitBooking] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await bookingSchema.validate({ guests });
      setSubmitBooking(true);
      toast.success("Booking submitted successfully!", {
        onClose: () => {
          window.location.reload();
        },
        draggable: false,
      });
    } catch (error) {
      setErrors({ guests: error.message });
    }
  };

  const handleGuestChange = (e) => {
    setGuests(Number(e.target.value));
    setErrors({ ...errors, guests: "" });
  };

  useEffect(() => {
    if (submitBooking) {
      // Set the start and end dates with the correct time
      const startDate = new Date(selectionRange.startDate);
      startDate.setHours(23, 59, 59, 999);

      const endDate = new Date(selectionRange.endDate);
      endDate.setHours(23, 59, 59, 999);

      const bookingData = {
        dateFrom: startDate.toISOString(),
        dateTo: endDate.toISOString(),
        venueId: id,
        guests: guests,
      };

      sendBookings(
        "https://api.noroff.dev/api/v1/holidaze/bookings",
        bookingData
      );

      setSubmitBooking(false);
    }
  }, [submitBooking, sendBookings, selectionRange, id, guests]);

  return (
    <Form
      onSubmit={handleSubmit}
      className="shadow-lg p-3 mb-5  rounded d-flex flex-column align-items-auto p-2 rounded"
    >
      <Form.Group className="mb-2 gsts-input d-flex gap-2 align-items-center">
        <Form.Label className="text-primary">Guests:</Form.Label>
        <Form.Control
          type="number"
          value={guests}
          onChange={handleGuestChange}
          min={1}
          max={currentVenue?.maxGuests}
          isInvalid={!!errors.guests}
        />
        <Form.Control.Feedback type="invalid">
          {errors.guests && errors.guests.message}
        </Form.Control.Feedback>
      </Form.Group>

      <DateRangePicker setSelectionRange={setSelectionRange} />

      {token ? (
        <>
          <Button
            variant="outline-success"
            type="submit"
            className="mt-4 
          "
          >
            Submit
          </Button>

          <ToastContainer />
        </>
      ) : (
        <div className="d-flex gap-2 align-items-center justify-content-center">
          <span>Login to book</span>
          <LoginForm />
        </div>
      )}
    </Form>
  );
}

export default CreateBooking;
