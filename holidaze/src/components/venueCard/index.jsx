import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import palceHolder from "../../images/placeHolder.png";

function VenueCard({ venue: { name, price, media, id, meta, location } }) {
  const wifi = meta && meta.wifi;
  const pets = meta && meta.pets;
  const parking = meta && meta.parking;
  const breakfast = meta && meta.breakfast;
  const city = location && location.city;
  const country = location && location.country;

  if (wifi) {
    <i className="bi bi-wifi"></i>;
  }

  return (
    <Card
      className="h-100 shadow-sm bg-white rounded border-0"
      style={{ height: "100%" }}
    >
      <div style={{ height: "200px" }}>
        <Card.Img
          alt={name}
          variant="top"
          src={media[0] ? media[0] : palceHolder}
          style={{
            objectFit: "cover",
            height: "100%",
            width: "100%",
          }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex mb-2 justify-content-between align-items-start flex-wrap gap-19">
          <Card.Title className="mb-0 font-weight-bold">
            {name.substring(0, 20)}
          </Card.Title>
          <Badge className="mb-1 fs-6 bg-success">{price},-</Badge>
        </div>{" "}
        <span className="mb-2 d-flex gap-1">
          <i className="bi bi-geo-alt-fill"></i>
          <span>{city}</span>
          <span>{country}</span>
        </span>
        <div className="mb-2 d-flex gap-2 align-items-center">
          {wifi ? (
            <Badge className="mb-1 ">
              <i className="bi bi-wifi "></i> {wifi}
            </Badge>
          ) : null}
          {breakfast ? (
            <Badge className="mb-1 ">
              <i className="fas fa-utensils"></i> {breakfast}
            </Badge>
          ) : null}

          {pets ? (
            <Badge className="mb-1 ">
              <i className="fas fa-cat"></i> {pets}
            </Badge>
          ) : null}

          {parking ? (
            <Badge className="mb-1 ">
              <i className="fas fa-parking"></i> {parking}
            </Badge>
          ) : null}
        </div>{" "}
        <LinkContainer to={`/venues/${id}`}>
          <Button
            className="mt-auto font-weight-bold"
            variant="outline-primary"
          >
            Veiw venue
          </Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}

export default VenueCard;
