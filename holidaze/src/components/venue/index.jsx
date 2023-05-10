import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useVenues } from "../../hooks/useVenueStore";
import { load } from "../../storage/index.mjs";
import DeleteVenue from "../admin/deleteVenue";

import CreateBooking from "../createBooking";

function Venue() {
  const { currentVenue, fetchVenue, isLoading, hasError } = useVenues();
  let { id } = useParams();
  const profile = load("profile");
  const ownerName = profile && profile.name;

  console.log(id);
  console.log(currentVenue);
  useEffect(() => {
    fetchVenue(
      `https://api.noroff.dev/api/v1/holidaze/venues/${id}?_bookings=true&_owner=true`
    );
  }, [id]);

  const media = currentVenue.media;

  if (isLoading || !currentVenue) {
    return <div>loading ....</div>;
  }

  if (hasError || !currentVenue) {
    return <div>errrroooor</div>;
  }

  const currentVenueManager =
    currentVenue && currentVenue.owner ? currentVenue.owner.name : null;

  if (ownerName === currentVenueManager) {
    return (
      <div>
        <h1>{currentVenue.name}</h1>
        <h2>{currentVenue.description}</h2>
        <div>
          {" "}
          {media &&
            media.length > 0 &&
            media.map((url, index) => (
              <img key={index} src={url} alt={`Image ${index + 1}`} />
            ))}
        </div>
        {currentVenue.bookings && currentVenue.bookings.length > 0 && (
          <div>
            <h3>Bookings:</h3>
          </div>
        )}{" "}
        <CreateBooking />
        <Link to={`/update/${currentVenue.id}`}>Update</Link>
        <DeleteVenue />
      </div>
    );
  }

  return (
    <div>
      <h1>{currentVenue.name}</h1>
      <h2>{currentVenue.description}</h2>
      <div>
        {" "}
        {media &&
          media.length > 0 &&
          media.map((url, index) => (
            <img key={index} src={url} alt={`Image ${index + 1}`} />
          ))}
      </div>
      {currentVenue.bookings && currentVenue.bookings.length > 0 && (
        <div>
          <h3>Bookings:</h3>
        </div>
      )}{" "}
      <CreateBooking />
    </div>
  );
}

export default Venue;
