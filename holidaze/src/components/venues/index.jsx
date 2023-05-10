import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useVenues } from "../../hooks/useVenueStore";

function VenuesList() {
  const { venues, fetchVenues, isLoading, hasError } = useVenues();
  console.log(venues);
  useEffect(() => {
    fetchVenues(
      "https://api.noroff.dev/api/v1/holidaze/venues?_bookigs=true&_owner=true"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>...Loading</div>;
  }
  if (hasError) {
    return <div>errrrror</div>;
  }

  return (
    <div>
      {venues.map((venue) => (
        <div>
          <h2>{venue.name}</h2>
          <Link to={`/venues/${venue.id}`}>veiw veniu</Link>
        </div>
      ))}
    </div>
  );
}

export default VenuesList;
