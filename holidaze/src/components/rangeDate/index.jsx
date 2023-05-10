import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./customDateRangeStyles.css";

import { useVenueStore } from "../../hooks/useVenueStore";

function DateRangePicker({ setSelectionRange }) {
  const currentVenue = useVenueStore((state) => state.currentVenue);

  const [selectionRangeState, setSelectionRangeState] = useState({
    selection1: {
      startDate: addDays(new Date(), 0),
      endDate: addDays(new Date(), 0),
      key: "selection1",
    },
  });

  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    if (currentVenue.bookings) {
      const bookedRanges = currentVenue.bookings.map((booking) => ({
        startDate: new Date(booking.dateFrom),
        endDate: new Date(booking.dateTo),
        key: "selection2",
        autoFocus: false,
        disabled: true,
      }));

      setBookedDates(bookedRanges);
    }
  }, [currentVenue.bookings]);

  return (
    <DateRange
      minDate={new Date()}
      disableSelection={true}
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

export default DateRangePicker;
