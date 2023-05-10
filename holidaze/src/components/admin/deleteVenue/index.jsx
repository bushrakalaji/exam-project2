import React from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../api/api";
import { useVenues } from "../../../hooks/useVenueStore";

function DeleteVenue() {
  const { deleteVenue, isLoading, hasError } = useVenues();
  const { id } = useParams();
  const handleDelete = async () => {
    try {
      await deleteVenue(
        `https://api.noroff.dev/api/v1/holidaze/venues/${id}`,
        id
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <button onClick={() => handleDelete(id)}>delete</button>
      {isLoading && <p>Deleting venue...</p>}
      {hasError && (
        <p>There was an error deleting the venue. Please try again.</p>
      )}
    </div>
  );
}

export default DeleteVenue;
