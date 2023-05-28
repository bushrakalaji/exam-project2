import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useBookings } from "../../../hooks/useBookingStore";

import { API_BASE_URL } from "../../../api/api";
import { Button, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

function DeleteBooking({ onBookingDeleted }) {
  const { deleteBooking } = useBookings();
  let { id } = useParams();

  const handleDelete = async () => {
    try {
      await deleteBooking(`${API_BASE_URL}/bookings/${id}`, id);

      onBookingDeleted();
    } catch (error) {
      console.error(error);
      toast.error("There was an error deleting the booking. Please try again.");
    }
  };

  const [show, setShow] = useState(false);
  const handelClose = () => setShow(false);
  const handelShow = () => setShow(true);

  return (
    <div>
      <Button onClick={handelShow} className=" dropdown-item ">
        Delete
      </Button>
      <Modal show={show} onHide={handelClose} centered>
        <Modal.Header closeButton>Delete booking</Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center gap-5">
          <div>Are you sure you want to delete the booking?</div>
          <button onClick={() => handleDelete(id)} className="btn btn-danger">
            Confirm Delete
          </button>
        </Modal.Body>
        <ToastContainer />
      </Modal>
    </div>
  );
}

export default DeleteBooking;
