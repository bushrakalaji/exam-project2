import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../api/api";
import { useVenues } from "../../../hooks/useVenueStore";
import HasError from "../../hasError";
import IsLoading from "../../isLoading";

function UpdateVenue() {
  const { updateVenue, currentVenue, hasError, isLoading } = useVenues();
  const [name, setName] = useState(currentVenue.name);
  const [description, setDescription] = useState(currentVenue.description);
  const [media, setMedia] = useState(currentVenue.media);
  const [price, setPrice] = useState(currentVenue.price);
  const [maxGuests, setMaxGuests] = useState(currentVenue.maxGuests);
  const [rating, setRating] = useState(currentVenue.rating);
  const [meta, setMeta] = useState(currentVenue.meta);
  const [location, setLocation] = useState(currentVenue.location);

  const { id } = useParams();
  console.log(currentVenue);
  const handleSubmit = (event) => {
    event.preventDefault();
    const mediaArray = media.split(",");
    const venueData = {
      name,
      description,
      mediaArray,
      price,
      maxGuests,
      rating,
      meta,
      location,
      id: id,
    };

    updateVenue(API_BASE_URL + "/venues/" + id, venueData);
  };

  useEffect(() => {
    if (isLoading || !currentVenue) {
      return <IsLoading />;
    }
    if (hasError || !currentVenue) {
      return <HasError />;
    }
  });
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Media:</label>
        <input
          type="text"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Max Guests:</label>
        <input
          type="number"
          value={maxGuests}
          onChange={(e) => setMaxGuests(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Wifi</label>
        <input
          type="checkbox"
          checked={meta.wifi}
          onChange={(e) => setMeta({ ...meta, wifi: e.target.checked })}
        />
      </div>
      <div>
        <label>Parking</label>
        <input
          type="checkbox"
          checked={meta.parking}
          onChange={(e) => setMeta({ ...meta, parking: e.target.checked })}
        />
      </div>
      <div>
        <label>Breakfast</label>
        <input
          type="checkbox"
          checked={meta.breakfast}
          onChange={(e) => setMeta({ ...meta, breakfast: e.target.checked })}
        />
      </div>
      <div>
        <label>Pets</label>
        <input
          type="checkbox"
          checked={meta.pets}
          onChange={(e) => setMeta({ ...meta, pets: e.target.checked })}
        />
      </div>

      <div>
        <label>Address:</label>
        <input
          type="text"
          value={location.address}
          onChange={(e) =>
            setLocation({ ...location, address: e.target.value })
          }
        />
      </div>
      <div>
        <label>city:</label>
        <input
          type="text"
          value={location.city}
          onChange={(e) => setLocation({ ...location, city: e.target.value })}
        />
      </div>
      <div>
        <label>zip:</label>
        <input
          type="text"
          value={location.zip}
          onChange={(e) => setLocation({ ...location, zip: e.target.value })}
        />
      </div>
      <div>
        <label>country:</label>
        <input
          type="text"
          value={location.country}
          onChange={(e) =>
            setLocation({ ...location, country: e.target.value })
          }
        />
      </div>
      <div>
        <label>continent:</label>
        <input
          type="text"
          value={location.continent}
          onChange={(e) =>
            setLocation({ ...location, continent: e.target.value })
          }
        />
      </div>

      <div>
        <label>Lat:</label>
        <input
          type="number"
          value={location.lat}
          onChange={(e) =>
            setLocation({ ...location, lat: Number(e.target.value) })
          }
        />
      </div>
      <div>
        <label>Lng:</label>
        <input
          type="number"
          value={location.lng}
          onChange={(e) =>
            setLocation({ ...location, lng: Number(e.target.value) })
          }
        />
      </div>

      <button>submit</button>
    </form>
  );
}

export default UpdateVenue;
