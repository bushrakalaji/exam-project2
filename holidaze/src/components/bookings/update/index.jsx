import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBookings, useBookingStore } from "../../../hooks/useBookingStore";
import HasError from "../../hasError";
import IsLoading from "../../isLoading";
import { Button, Form } from "react-bootstrap";
import UpdateDateRangePicker from "../../rangeDate/updateDate";
import { LinkContainer } from "react-router-bootstrap";
import * as Yup from "yup";

import { Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const bookingSchema = Yup.object().shape({
  guests: Yup.number().required("Guests is required").min(1, "Minimum 1 guest"),
});

function UpdateBooking() {
  const { updateBookings, updatedBooking, isLoading, hasError, fetchBooking } =
    useBookings();
  const currentBooking = useBookingStore((state) => state.currentBooking);
  const [errors, setErrors] = useState({});
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const currentGuests = currentBooking.guests;

  let { id } = useParams();
  const [guests, setGuests] = useState(currentGuests);
  const [submitBooking, setSubmitBooking] = useState(false);
  const [show, setShow] = useState(false);
  const handelClose = () => setShow(false);
  const handelShow = () => setShow(true);
  const notify = () =>
    toast.success("Updated successfully!", {
      onClose: () => {
        window.location.reload();
      },
      draggable: false,
    });
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await bookingSchema.validate({ guests });
      setSubmitBooking(true);
      notify();
    } catch (error) {
      setErrors({ guests: error.message });
    }
  };

  const handleGuestChange = (e) => {
    setGuests(Number(e.target.value));
    setErrors({ ...errors, guests: "" });
  };

  useEffect(() => {
    if (!currentBooking) {
      fetchBooking(
        `https://api.noroff.dev/api/v1/holidaze/bookings/${id}?_venue=true&_customer=true`
      );
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBooking, id]);

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

      updateBookings(
        `https://api.noroff.dev/api/v1/holidaze/bookings/${id}`,
        bookingData
      );

      setSubmitBooking(false);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitBooking, updatedBooking, selectionRange, id, guests]);

  if (isLoading || !currentBooking) {
    return <IsLoading />;
  }
  if (hasError) {
    return <HasError />;
  }
  return (
    <div className="d-flex ">
      <Button onClick={handelShow} className="dropdown-item">
        Update
      </Button>
      <Modal show={show} onHide={handelClose} centered>
        <Modal.Header closeButton>Update booking</Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center gap-5">
          <Form
            onSubmit={handleSubmit}
            className="bg-secondary d-flex flex-column  p-2 rounded"
          >
            {" "}
            <Form.Group className="mb-2 gsts-input d-flex gap-2 align-items-center">
              <Form.Label className=" ">Guests:</Form.Label>
              <Form.Control
                type="number"
                value={guests}
                onChange={handleGuestChange}
                min={1}
                isInvalid={!!errors.guests}
              />
              <Form.Control.Feedback type="invalid">
                {errors.guests && errors.guests.message}
              </Form.Control.Feedback>
            </Form.Group>
            <UpdateDateRangePicker setSelectionRange={setSelectionRange} />
            <div className="d-flex gap-2 mt-2">
              <Button type="submit" style={{ width: "50%" }}>
                Update
              </Button>
              <LinkContainer to={`/booking/${id}`} style={{ width: "50%" }}>
                <Button type="submit">Cansel</Button>
              </LinkContainer>{" "}
            </div>
          </Form>{" "}
        </Modal.Body>
        <ToastContainer />
      </Modal>
    </div>
  );
}

export default UpdateBooking;
