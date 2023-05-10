import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBookings, useBookingStore } from "../../../hooks/useBookingStore";
import HasError from "../../hasError";
import IsLoading from "../../isLoading";
import UpdateDateRangePicker from "../../rangeDate/updateDate";

function UpdateBooking() {
  const { updateBookings, updatedBooking, isLoading, hasError, fetchBooking } =
    useBookings();
  const currentBooking = useBookingStore((state) => state.currentBooking);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const currentGuests = currentBooking.guests;
  console.log(currentGuests);
  let { id } = useParams();
  const [guests, setGuests] = useState(currentGuests);
  const [submitBooking, setSubmitBooking] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitBooking(true);
  };
  const handleGuestChange = (e) => {
    setGuests(Number(e.target.value));
  };

  useEffect(() => {
    if (!currentBooking) {
      fetchBooking(
        `https://api.noroff.dev/api/v1/holidaze/bookings/${id}?_venue=true&_customer=true`
      );
    }
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
      console.log(bookingData);
      updateBookings(
        `https://api.noroff.dev/api/v1/holidaze/bookings/${id}`,
        bookingData
      );

      setSubmitBooking(false);
    }
  }, [submitBooking, updatedBooking, selectionRange, id, guests]);

  if (isLoading || !currentBooking) {
    return <IsLoading />;
  }
  if (hasError) {
    return <HasError />;
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Guests:</label>
        <input type="number" value={guests} onChange={handleGuestChange} />
      </div>
      <div>
        <UpdateDateRangePicker setSelectionRange={setSelectionRange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UpdateBooking;
