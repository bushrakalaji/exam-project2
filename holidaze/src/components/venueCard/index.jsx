import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import palceHolder from "../../images/placeHolder.png";

function VenueCard({ venue: { name, price, media, id, meta, location } }) {
  const wifi = meta && meta.wifi;

  const city = location && location.city;
  const country = location && location.country;

  if (wifi) {
    <i className="bi bi-wifi"></i>;
  }

  return (
    <Card
      className="h-100 shadow bg-white rounded border-0"
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
        <div className="d-flex mb-2 justify-content-between align-items-start">
          <Card.Title className="mb-0 font-weight-bold">
            {name.substring(0, 20)}
          </Card.Title>
          <Badge className="mb-1" variant="warning">
            {price}kr
          </Badge>
        </div>{" "}
        <span className="mb-2">
          <i className="bi bi-geo-alt-fill"></i>
          {city}
          {country}
        </span>
        <div className="mb-2 d-flex gap-2 align-items-center">
          {wifi ? (
            <Badge className="mb-1 bg-warning">
              <i className="bi bi-wifi "></i> {wifi}
            </Badge>
          ) : (
            <Badge className="mb-1" variant="success">
              <i className="bi bi-wifi-off"></i>
            </Badge>
          )}

          <Badge>
            <i className="fas fa-cat"></i>
          </Badge>
          <Badge>
            <i className="fas fa-parking"></i>
          </Badge>
        </div>{" "}
        <LinkContainer to={`/venues/${id}`}>
          <Button variant="primary" className="mt-auto font-weight-bold">
            Veiw venue
          </Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}

export default VenueCard;
