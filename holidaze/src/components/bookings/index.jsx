import { useEffect } from "react";
import { useBookings } from "../../hooks/useBookingStore";
import { Link } from "react-router-dom";
import { load } from "../../storage/index.mjs";

function MyBooking() {
  const { bookings, fetchBookings, isLoading, hasError } = useBookings();
  console.log(bookings);
  const curentCustom = load("profile");
  const name = curentCustom.name;
  console.log(name);
  useEffect(() => {
    fetchBookings(
      `https://api.noroff.dev/api/v1/holidaze/profiles/${name}/bookings?_venue=true&_customer=true`
    );
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (hasError) {
    return <p>There was an error fetching the products.</p>;
  }

  return (
    <div>
      {bookings.map((book) => (
        <div>
          <h1>{book.id}</h1>
          <Link to={`/booking/${book.id}`}>Veiw</Link>
        </div>
      ))}
    </div>
  );
}

export default MyBooking;
