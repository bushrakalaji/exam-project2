import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useVenues } from "../../hooks/useVenueStore";
import { load } from "../../storage/index.mjs";
import DeleteVenue from "../admin/deleteVenue";
import { Row, Col, Nav, NavDropdown } from "react-bootstrap";
import CreateBooking from "../createBooking";
import placeholder from "../../images/placeHolder.png";
import { LinkContainer } from "react-router-bootstrap";

function Venue() {
  const { currentVenue, fetchVenue, isLoading, hasError } = useVenues();
  let { id } = useParams();
  const profile = load("profile");
  const ownerName = profile && profile.name;
  const meta = currentVenue.meta;
  const wifi = meta && meta.wifi;
  const breakfast = meta && meta.breakfast;
  const pets = meta && meta.pets;
  const parking = meta && meta.parking;

  console.log(id);
  console.log(currentVenue);
  useEffect(() => {
    fetchVenue(
      `https://api.noroff.dev/api/v1/holidaze/venues/${id}?_bookings=true&_owner=true`
    ); // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <section className="position-relative">
        {" "}
        <h1 className="mt-4">{currentVenue.name}</h1>
        <div className="position-absolute top-0 end-0">
          {" "}
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={<i className="bi bi-three-dots fs-1"></i>}
            menuVariant="dark"
          >
            <LinkContainer to={`/update/${currentVenue.id}`}>
              <NavDropdown.Item>Update</NavDropdown.Item>
            </LinkContainer>
            <DeleteVenue />
          </NavDropdown>
        </div>
        <div className="d-flex flex-wrap  justify-content-between">
          <Row className="g-2 img-style">
            {media.length > 0 ? (
              <>
                <Col md={12} lg={12} style={{ height: "400px" }}>
                  <img
                    src={media[0] ? media[0] : placeholder}
                    alt={currentVenue.name}
                    className="img-fluid rounded"
                  />
                </Col>
                {media.slice(1, 4).map((media, index) => (
                  <Col key={index} md={6} lg={3}>
                    <img
                      src={media ? media : placeholder}
                      alt={currentVenue.name}
                      className="img-fluid rounded"
                    />
                  </Col>
                ))}
              </>
            ) : (
              <Col md={12} lg={12}>
                <img
                  src={placeholder}
                  alt={currentVenue.name}
                  className="img-fluid rounded"
                />
              </Col>
            )}
            {/* ***** Venue Address ***** */}
            <div className="d-flex gap-1  ">
              <i className="bi bi-geo-alt-fill text-danger"></i>
              <span> {currentVenue.location.address} </span>{" "}
              <span>{currentVenue.location.city}</span>
              <span>{currentVenue.location.zip} </span>{" "}
              <span> {currentVenue.location.country}</span>
            </div>{" "}
          </Row>{" "}
          {/* price & rating */}
          <div className="bg-secondary d-flex flex-column gap-4 p-5 rounded">
            {" "}
            <div id="price">
              {" "}
              <span className="fs-3 fst-italic bg-danger text-light  px-5 rounded">
                {currentVenue.price} NOK <span className="fs-5"> Night</span>
              </span>
            </div>
            <div>
              <h3>Rating</h3>

              <div className=" d-flex gap-2 fs-5">
                <i className="bi bi-star-fill"></i>
                {currentVenue.rating}
              </div>
            </div>
            <div>
              <h3>Max Guests</h3>
              <span className="fs-4 fst-italic">
                <i className="bi bi-people-fill"></i> {currentVenue.maxGuests}
              </span>
            </div>
            <div>
              <h3>total reservations</h3>
              <span className="fs-4 fst-italic">
                <i className="bi bi-bookmark-check-fill"></i>{" "}
                {currentVenue?.bookings?.length}
              </span>
            </div>
          </div>{" "}
        </div>{" "}
        <Nav
          justify
          variant="tabs"
          defaultActiveKey="/home"
          className="rounded my-4"
        >
          <Nav.Item>
            <Nav.Link href="#description" className="text-light ">
              Description
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#facilities" className="text-light ">
              Facilities
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link href="#owner" className="text-light ">
              Owner
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#booking" className="text-light ">
              Bookings
            </Nav.Link>
          </Nav.Item>
        </Nav>
        {/* ***** Venue Info ***** */}{" "}
        <div className="d-flex justify-content-between flex-wrap">
          <div className="d-flex flex-wrap  mt-2 flex-column gap-3">
            <div className="vnu-desc" id="description">
              <h2>Description</h2>
              <p>{currentVenue.description}</p>
            </div>
            <div id="facilities">
              <h2>Facilities</h2>
              <div className="d-flex gap-3 flex-wrap ">
                {wifi ? (
                  <span className="mb-1 ">
                    <i className="fas fa-wifi"></i> Free Wifi
                  </span>
                ) : (
                  <span className="mb-1" variant="success">
                    <i className="fas fa-wifi"></i> No Wifi
                  </span>
                )}

                {breakfast ? (
                  <span className="mb-1 ">
                    <i className="fas fa-utensils"></i> Breakfast
                  </span>
                ) : (
                  <span className="mb-1" variant="success">
                    <i className="fas fa-utensils"></i> No breakfast
                  </span>
                )}
                {parking ? (
                  <span className="mb-1 ">
                    <i className="fas fa-parking"></i>Free parking
                  </span>
                ) : (
                  <span className="mb-1" variant="success">
                    <i className="fas fa-parking"></i> No parking
                  </span>
                )}
                {pets ? (
                  <span className="mb-1 ">
                    <i className="fas fa-cat"></i> Pets is welcome
                  </span>
                ) : (
                  <span className="mb-1" variant="success">
                    <i className="fas fa-cat"></i> No pets
                  </span>
                )}
              </div>
            </div>
            <div id="owner bg-secondary">
              <h3>The Owner</h3>{" "}
              <div className="d-flex align-items-center gap-2  p-4 rounded bg-secondary">
                {" "}
                <div>
                  {" "}
                  <img
                    className="img-thumbnail rounded-circle personal-img"
                    src={currentVenue?.owner?.avatar}
                    alt="owner avatar"
                  />
                </div>
                <div className="d-flex flex-column">
                  <span>Name : {currentVenue?.owner?.name}</span>
                  <span>Email : {currentVenue?.owner?.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className=" booking-form" id="booking">
              <CreateBooking />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      {" "}
      <h1 className="mt-4">{currentVenue.name}</h1>
      <div className="d-flex flex-wrap  justify-content-between">
        <Row className="g-2 img-style">
          {media.length > 0 ? (
            <>
              <Col
                className="rounded"
                md={12}
                lg={12}
                style={{ maxHeight: "600px", overflow: "hidden" }}
              >
                <img
                  src={media[0] ? media[0] : placeholder}
                  alt={currentVenue.name}
                  className="rounded w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </Col>
              {media.slice(1, 4).map((media, index) => (
                <Col key={index} md={6} lg={3}>
                  <img
                    src={media ? media : placeholder}
                    alt={currentVenue.name}
                    className="img-fluid rounded"
                  />
                </Col>
              ))}
            </>
          ) : (
            <Col md={12} lg={12}>
              <img
                src={placeholder}
                alt={currentVenue.name}
                className="img-fluid rounded"
              />
            </Col>
          )}
          {/* ***** Venue Address ***** */}
          <div className="d-flex gap-1  ">
            <i className="bi bi-geo-alt-fill text-danger"></i>
            <span> {currentVenue.location.address} </span>{" "}
            <span>{currentVenue.location.city}</span>
            <span>{currentVenue.location.zip} </span>{" "}
            <span> {currentVenue.location.country}</span>
          </div>
        </Row>{" "}
        {/* price & rating */}
        <div className="d-flex flex-column gap-4 bg-secondary p-5 rounded">
          {" "}
          <div id="price">
            {" "}
            <span className="fs-3  bg-danger text-light px-5 rounded">
              {currentVenue.price},- <span className="fs-5"> Night</span>
            </span>
          </div>
          <div>
            <h3>Rating</h3>

            <div className="d-flex gap-2 fs-5">
              <i className="bi bi-star-fill"></i>
              {currentVenue.rating}
            </div>
          </div>
          <div>
            <h3>Max Guests</h3>
            <span className="fs-4 fst-italic">
              <i className="bi bi-people-fill"></i> {currentVenue.maxGuests}
            </span>
          </div>
          <div>
            <h3>total reservations</h3>
            <span className="fs-4 fst-italic">
              <i className="bi bi-bookmark-check-fill"></i>{" "}
              {currentVenue?.bookings?.length}
            </span>
          </div>
        </div>
      </div>{" "}
      <Nav
        justify
        variant="tabs"
        defaultActiveKey="/home"
        className="rounded my-4 "
      >
        <Nav.Item>
          <Nav.Link href="#description" className="text-primary ">
            Description
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#facilities" className="text-primary ">
            Facilities
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="#owner" className="text-primary ">
            Owner
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#booking" className="text-primary ">
            Bookings
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* ***** Venue Info ***** */}{" "}
      <div className="d-flex justify-content-between flex-wrap">
        <div className="d-flex flex-wrap  mt-2 flex-column gap-3">
          <div className="vnu-desc" id="description">
            <h2>Description</h2>
            <p>{currentVenue.description}</p>
          </div>
          <div id="facilities">
            <h2>Facilities</h2>
            <div className="d-flex gap-3 flex-wrap ">
              {wifi ? (
                <span className="mb-1 ">
                  <i className="fas fa-wifi"></i> Free Wifi
                </span>
              ) : (
                <span className="mb-1" variant="success">
                  <i className="fas fa-wifi"></i> No Wifi
                </span>
              )}

              {breakfast ? (
                <span className="mb-1 ">
                  <i className="fas fa-utensils"></i> Breakfast
                </span>
              ) : (
                <span className="mb-1" variant="success">
                  <i className="fas fa-utensils"></i> No breackfast
                </span>
              )}
              {parking ? (
                <span className="mb-1 ">
                  <i className="fas fa-parking"></i>Free parking
                </span>
              ) : (
                <span className="mb-1" variant="success">
                  <i className="fas fa-parking"></i> No parking
                </span>
              )}
              {pets ? (
                <span className="mb-1 ">
                  <i className="fas fa-cat"></i> Pets is welcome
                </span>
              ) : (
                <span className="mb-1" variant="success">
                  <i className="fas fa-cat"></i> No pets
                </span>
              )}
            </div>
          </div>
          <div id="owner">
            <h3>meet the owner</h3>{" "}
            <div className="d-flex align-items-center gap-2 p-4 rounded bg-secondary">
              <div
                className="rounded-circle border border-2 border-white"
                style={{ width: "150px", height: "150px", overflow: "hidden" }}
              >
                <img
                  className="w-100 h-100"
                  src={currentVenue?.owner?.avatar}
                  alt="owner avatar"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="d-flex flex-column">
                <Link to={`/profile/${currentVenue?.owner?.name}`}>
                  {" "}
                  <span>Name : {currentVenue?.owner?.name}</span>
                </Link>
                <span>Email : {currentVenue?.owner?.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className=" booking-form" id="booking">
            <CreateBooking />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Venue;
