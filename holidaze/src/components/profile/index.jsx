import { useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../api/api";
import { useProfile } from "../../hooks/useProfile";
import { load } from "../../storage/index.mjs";
import admin from "../../images/admin.png";
import user from "../../images/user.png";
import palceholder from "../../images/placeHolder.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { NavDropdown } from "react-bootstrap";
import UpdateAvatar from "./update";
import { useParams } from "react-router";
import HasError from "../hasError";
import IsLoading from "../isLoading";

function ProfileInfo() {
  const { name } = useParams();
  const myProfile = load("profile");
  const currentProfile = myProfile.name;
  const manager = myProfile.venueManager === true;

  const managerTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Manager
    </Tooltip>
  );

  const customerTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Costumer
    </Tooltip>
  );

  const { fetchProfile, profile, isLoading, hasError } = useProfile();
  useEffect(() => {
    fetchProfile(
      `${API_BASE_URL}/profiles/${name}?_venues=true&_bookings=true`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProfile, name]);
  if (isLoading) {
    return <IsLoading />;
  }
  if (hasError) {
    return <HasError />;
  }

  return (
    <>
      <div className="rounded-bottom shadow ">
        <div className="profile rounded-top position-relative">
          <div
            className="rounded-circle position-absolute border-3 border border-white"
            style={{
              width: "200px",
              height: "200px",
              overflow: "hidden",
              top: "50%",
              left: "3%",
            }}
          >
            <img
              src={profile.avatar ? profile.avatar : palceholder}
              alt="user avatar "
              className="h-100 w-100 "
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          {currentProfile === name ? (
            <div
              className="position-absolute "
              style={{
                top: "100%",
                right: "3%",
              }}
            >
              {" "}
              <NavDropdown
                id="nav-dropdown-dark-example"
                className="menuDots"
                menuVariant="dark"
                title={<i className="bi bi-three-dots fs-1"></i>}
              >
                <UpdateAvatar />
              </NavDropdown>
            </div>
          ) : null}
        </div>
        <div className="d-flex  mt-5 align-items-top gap-5  p-5  container flex-wrap justify-content-start position-relative">
          <div className="position-relative d-flex flex-column  ">
            <div className="d-flex align-items-center gap-2">
              <span className="text-capitalize fs-3">{profile.name}</span>
              {manager ? (
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={managerTooltip}
                >
                  <img
                    src={admin}
                    alt=""
                    className=" "
                    style={{ width: "25px" }}
                  />
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={customerTooltip}
                >
                  <img
                    src={user}
                    alt=""
                    className=" "
                    style={{ width: "25px" }}
                  />
                </OverlayTrigger>
              )}
            </div>

            <span>{profile.email}</span>
            <span></span>
          </div>
          <div className="d-flex gap-5">
            <div className="d-flex flex-column align-items-center">
              <span className="fs-3">
                <i className="bi bi-calendar2-week-fill"></i> Bookings
              </span>
              <span className="fs-5">{profile?._count?.bookings}</span>
            </div>
            {manager ? (
              <div className="d-flex flex-column align-items-center">
                <Link to={`/visit/${name}`}>
                  <span className="fs-3">
                    <i className="bi bi-houses-fill"></i> Venues
                  </span>
                </Link>
                <span className="fs-5"> {profile?._count?.venues}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileInfo;
