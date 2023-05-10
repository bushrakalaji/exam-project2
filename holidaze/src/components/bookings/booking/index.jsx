import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useBookings } from "../../../hooks/useBookingStore";
import HasError from "../../hasError";
import IsLoading from "../../isLoading";
import DeleteBooking from "../deleteBooking";

function BookingById() {
  const { currentBooking, fetchBooking, isLoading, hasError } = useBookings();
  const [deleteClicked, setDeleteClicked] = useState(false);

  function handleDeleteClick() {
    setDeleteClicked(true);
  }

  let { id } = useParams();
  console.log(currentBooking);

  useEffect(() => {
    fetchBooking(
      `https://api.noroff.dev/api/v1/holidaze/bookings/${id}?_venue=true&_customer=true`
    );
  }, [id]);
  if (isLoading || !currentBooking) {
    return <IsLoading />;
  }

  if (hasError || !currentBooking.venue) {
    return <div>Booking not found</div>;
  }

  const venue = currentBooking.venue;
  const venueId = venue.id;
  return (
    <div>
      <h1>{venueId}</h1>
      <Link to={`/updateBooking/${id}`}>Update</Link>
      <button onClick={handleDeleteClick}>Delete</button>
      {deleteClicked && (
        <DeleteBooking onDelete={() => setDeleteClicked(false)} />
      )}
    </div>
  );
}

export default BookingById;
