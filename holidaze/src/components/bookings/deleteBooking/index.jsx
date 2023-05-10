import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBookings } from "../../../hooks/useBookingStore";

function DeleteBooking({ onDelete }) {
  const { deleteBooking, isLoading, hasError } = useBookings();

  let { id } = useParams();

  useEffect(() => {
    async function deleteAndRedirect() {
      try {
        await deleteBooking(
          `https://api.noroff.dev/api/v1/holidaze/bookings/${id}`,
          id
        );
        if (onDelete) {
          onDelete();
        }
      } catch (error) {
        console.error("Error deleting the booking: ", error);
      }
    }

    deleteAndRedirect();
  }, [id, deleteBooking, onDelete]);

  return (
    <div>
      {isLoading && <p>Deleting booking...</p>}
      {hasError && (
        <p>There was an error deleting the booking. Please try again.</p>
      )}
    </div>
  );
}

export default DeleteBooking;
