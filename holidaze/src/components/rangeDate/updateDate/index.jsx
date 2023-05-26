import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import { useBookingStore } from "../../../hooks/useBookingStore";
import { useVenues } from "../../../hooks/useVenueStore";

function UpdateDateRangePicker({ setSelectionRange }) {
  const currentBooking = useBookingStore((state) => state.currentBooking);
  const { currentVenue, fetchVenue } = useVenues();
  const id = currentBooking.venue.id;
  useEffect(() => {
    fetchVenue(
      `https://api.noroff.dev/api/v1/holidaze/venues/${id}?_bookings=true&_owner=true`
    ); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [selectionRangeState, setSelectionRangeState] = useState({
    selection1: {
      startDate: new Date(currentBooking.dateFrom),
      endDate: new Date(currentBooking.dateTo),
      key: "selection1",
    },
  });
  console.log(selectionRangeState.selection1);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    if (currentVenue.bookings) {
      const bookedRanges = currentVenue.bookings
        .filter((booking) => {
          const bookingStartDate = new Date(booking.dateFrom);
          const bookingEndDate = new Date(booking.dateTo);
          return !(
            bookingStartDate.getTime() ===
              selectionRangeState.selection1.startDate.getTime() &&
            bookingEndDate.getTime() ===
              selectionRangeState.selection1.endDate.getTime()
          );
        })
        .map((booking) => ({
          startDate: new Date(booking.dateFrom),
          endDate: new Date(booking.dateTo),
          key: "selection3",
          autoFocus: false,
          disabled: true,
        }));

      setBookedDates(bookedRanges);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVenue.bookings]);

  return (
    <DateRange
      minDate={new Date()}
      disableSelection={false} // Enable date selection
      editableDateInputs={true}
      onChange={(item) => {
        setSelectionRangeState({ ...selectionRangeState, ...item });
        setSelectionRange(item.selection1);
      }}
      moveRangeOnFirstSelection={false}
      ranges={
        bookedDates.length
          ? [selectionRangeState.selection1, ...bookedDates]
          : [selectionRangeState.selection1]
      }
      rangeColors={["#2c9a00"]}
    />
  );
}

export default UpdateDateRangePicker;
