import { useEffect } from "react";
import { useBookings } from "../../hooks/useBookingStore";
import { Link } from "react-router-dom";
import { load } from "../../storage/index.mjs";
import IsLoading from "../isLoading";
import palceholder from "../../images/placeHolder.png";

function MyBooking() {
  const { bookings, fetchBookings, isLoading, hasError, deletedBooking } =
    useBookings();

  const curentCustom = load("profile");
  const name = curentCustom.name;

  useEffect(() => {
    fetchBookings(
      `https://api.noroff.dev/api/v1/holidaze/profiles/${name}/bookings?_venue=true&_customer=true`
    ); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedBooking, name]);

  if (isLoading) {
    return <IsLoading />;
  }
  if (hasError) {
    return <p>There was an error fetching the products.</p>;
  }

  return (
    <div className="d-flex flex-wrap justify-content-center gap-3 w-100">
      {bookings.map((book) => (
        <div
          className=" border border-2 border-primary  border-opacity-10 rounded gap-3 d-flex justify-content-center  "
          key={book.id}
          style={{ maxWidth: "600px" }}
        >
          <div className="" style={{ width: "50%" }}>
            {book.venue.media[0] ? (
              <img
                src={book.venue.media[0]}
                alt={book.venue.name}
                className="img-fluid rounded-start w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <img
                src={palceholder}
                alt="placeholder"
                className="img-fluid rounded-start w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
          <div className="d-flex flex-column p-2" style={{ width: "50%" }}>
            <h2 className="fs-5 fw-semibold">
              {book.venue.name.substring(0, 15)}
            </h2>
            <div
              className="d-flex gap-1 flex-wrap fs-6"
              style={{ maxWidth: "200px" }}
            >
              <i className="bi bi-geo-alt-fill text-danger"></i>
              <span> {book?.venue?.location?.address} </span>
              <span>{book?.venue?.location?.city}</span>
              <span>{book?.venue?.location?.zip} </span>
              <span> {book?.venue?.location?.country}</span>
            </div>{" "}
            <div>
              <span className="fs-4 fst-italic">
                <i className="bi bi-people-fill"></i> {book.guests}
              </span>
            </div>
            <Link
              to={`/booking/${book.id}`}
              className="btn btn-primary text-light px-4 mt-auto"
            >
              View Booking
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyBooking;
