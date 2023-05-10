import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVenues } from "../../hooks/useVenueStore";
import DateRangePicker from "../rangeDate/";

function CreateBooking() {
  const { sendBookings } = useVenues();

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  let { id } = useParams();
  const [guests, setGuests] = useState(1);
  const [submitBooking, setSubmitBooking] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitBooking(true);
  };

  const handleGuestChange = (e) => {
    setGuests(Number(e.target.value));
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
      console.log(bookingData);
      sendBookings(
        "https://api.noroff.dev/api/v1/holidaze/bookings",
        bookingData
      );

      setSubmitBooking(false);
    }
  }, [submitBooking, sendBookings, selectionRange, id, guests]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Guests:</label>
        <input type="number" value={guests} onChange={handleGuestChange} />
      </div>
      <div>
        <DateRangePicker setSelectionRange={setSelectionRange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
export default CreateBooking;
