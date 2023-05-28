import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../api/api";
import { useVenues } from "../../../hooks/useVenueStore";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import IsLoading from "../../isLoading";
import HasError from "../../hasError";

function DeleteVenue() {
  const { deleteVenue, isLoading, hasError } = useVenues();
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const handelClose = () => setShow(false);
  const handelShow = () => setShow(true);
  const navigate = useNavigate();
  const notify = () =>
    toast.success("Deleted successfully!", {
      onClose: () => {
        navigate("/dashboard/venues");
        window.location.reload();
      },
      draggable: false,
    });

  const handleDelete = async () => {
    try {
      await deleteVenue(`${API_BASE_URL}/venues/${id}`, id);
      notify();
    } catch (error) {
      <HasError error={error} />;
    }
  };
  return (
    <div>
      <Button onClick={handelShow} className="dropdown-item">
        Delete
      </Button>
      <Modal show={show} onHide={handelClose} centered>
        <Modal.Header closeButton>Delete venue</Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center gap-5">
          <div>Are you sure you want to delete the venue?</div>
          <button
            onClick={() => handleDelete(id)}
            className="btn btn-danger m-auto "
            style={{ width: "100%" }}
          >
            Delete
          </button>
          {isLoading && <IsLoading />}
          {hasError && (
            <p>There was an error deleting the venue. Please try again.</p>
          )}{" "}
        </Modal.Body>
        <ToastContainer />
      </Modal>
    </div>
  );
}

export default DeleteVenue;
