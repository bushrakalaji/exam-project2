import React, { useState } from "react";
import { API_BASE_URL } from "../../../api/api";
import { useVenues } from "../../../hooks/useVenueStore";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required").min(0, "min price is 0"),
  rating: yup.number().min(0).max(5, "Max 5"),
  media: yup.array().of(yup.string()).required("Media is required"),
  maxGuests: yup
    .number()
    .integer()
    .min(1, "Guests must be at least 1")
    .max(100, "Max Guests cannot exceed 100"),

  meta: yup.object().shape({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breackfast: yup.boolean(),
    pets: yup.boolean(),
  }),
  location: yup.object().shape({
    address: yup.string(),
    city: yup.string(),
    zip: yup.string(),
    country: yup.string(),
    continent: yup.string(),
    lat: yup.number(),
    lng: yup.number(),
  }),
});

function CreateVenue() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handelClose = () => setShow(false);
  const handelShow = () => setShow(true);

  const notify = () =>
    toast.success("Venue created successfully!", {
      onClose: () => {
        navigate("/dashboard/venues");
        window.location.reload();
      },
      draggable: false,
    });

  const { createVenue, createdSuccsess, createdVenue } = useVenues();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });
  const onSubmit = (data) => {
    createVenue(`${API_BASE_URL}/venues`, data);
  };

  if (createdSuccsess) {
    notify();
  }

  return (
    <div>
      <Button onClick={handelShow} className="nav-link nav-tabs fs-5">
        <i className="bi bi-pencil-square"></i> Create Venue
      </Button>
      <Modal show={show} onHide={handelClose} centered>
        <Modal.Header closeButton>Create Venue</Modal.Header>
        <Modal.Body>
          <ToastContainer />
          <div className=" d-flex  text-primary  p-3  rounded venueForm m-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="d-flex flex-column gap-4 "
            >
              <div className="d-flex flex-column form-floating">
                <input
                  type="text"
                  {...register("name")}
                  placeholder="Name"
                  className="form-control"
                  id="name"
                />{" "}
                <label htmlFor="name">Venue Name</label>
                {errors.name && (
                  <span className="alert alert-danger">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="d-flex flex-column form-floating">
                <textarea
                  {...register("description")}
                  placeholder="Description"
                  className="form-control"
                  id="desc"
                />{" "}
                <label htmlFor="desc">Descripe your venue</label>
                {errors.description && (
                  <span className="alert alert-danger">
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div className="d-flex gap-3 flex-wrap ">
                <div className="d-flex flex-column form-floating">
                  <input
                    type="number"
                    {...register("price")}
                    placeholder="Price"
                    defaultValue={0}
                    className="form-control"
                    id="price"
                  />
                  <label htmlFor="price">Price </label>
                  {errors.price && (
                    <span className="alert alert-danger">
                      {errors.price.message}
                    </span>
                  )}
                </div>
                <div className="d-flex flex-column form-floating">
                  <input
                    type="number"
                    {...register("rating")}
                    placeholder="Rating"
                    defaultValue={0}
                    className="form-control"
                    id="rating"
                  />
                  <label htmlFor="rating">Rating </label>
                  {errors.rating && (
                    <span className="alert alert-danger">
                      {errors.rating.message}
                    </span>
                  )}
                </div>
                <div className="d-flex flex-column form-floating">
                  <input
                    type="number"
                    {...register("maxGuests")}
                    placeholder="Guests"
                    defaultValue={1}
                    className="form-control"
                    id="geusts"
                  />
                  <label htmlFor="geusts">Max Guests </label>
                  {errors.maxGuests && (
                    <span className="alert alert-danger">
                      {errors.maxGuests.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="d-flex gap-5  flex-wrap">
                <div className="d-flex gap-1">
                  <label htmlFor="wifi">Wifi:</label>
                  <input
                    type="checkbox"
                    {...register("meta.wifi")}
                    className="form-check-input"
                    id="wifi"
                  />
                </div>
                <div className="d-flex gap-1">
                  <label htmlFor="parking">parking:</label>
                  <input
                    type="checkbox"
                    {...register("meta.parking")}
                    className="form-check-input"
                    id="parking"
                  />
                </div>
                <div className="d-flex gap-1">
                  <label htmlFor="breackfast">breakfast:</label>
                  <input
                    type="checkbox"
                    {...register("meta.breakfast")}
                    id="breackfast"
                    className="form-check-input"
                  />
                </div>
                <div className="d-flex gap-1">
                  <label htmlFor="pets">pets:</label>
                  <input
                    type="checkbox"
                    {...register("meta.pets")}
                    className="form-check-input"
                    id="pets"
                  />
                </div>
              </div>
              <div className="d-flex flex-wrap gap-5 form-floating">
                <div className="form-floating">
                  <input
                    type="text"
                    {...register("location.address")}
                    className="form-control"
                    id="address"
                    placeholder="Address"
                  />
                  <label htmlFor="address">Address</label>
                </div>
                <div className=" form-floating">
                  <input
                    type="text"
                    {...register("location.city")}
                    className="form-control"
                    id="city"
                    placeholder="City"
                  />{" "}
                  <label htmlFor="city">City</label>
                </div>
                <div className=" form-floating">
                  <input
                    id="zip"
                    type="text"
                    {...register("location.zip")}
                    className="form-control"
                    placeholder="Zip"
                  />
                  <label htmlFor="zip">Zip</label>
                </div>
                <div className=" form-floating">
                  <input
                    id="country"
                    type="text"
                    {...register("location.country")}
                    className="form-control"
                    placeholder="Country"
                  />{" "}
                  <label htmlFor="country">Country</label>
                </div>
                <div className="form-floating">
                  {" "}
                  <input
                    type="text"
                    {...register("location.continent")}
                    className="form-control"
                    id="floatingInput"
                    placeholder="Continent"
                  />{" "}
                  <label htmlFor="floatingInput">Continent</label>
                </div>
              </div>
              <div className="d-flex gap-2 flex-column">
                {fields.map((field, index) => (
                  <div key={field.id} className="d-flex gap-2 form-floating">
                    <input
                      type="text"
                      {...register(`media.${index}`)}
                      defaultValue={field}
                      placeholder="Media"
                      id={`media.${index}`}
                      className="form-control"
                    />{" "}
                    <label htmlFor="media">Media:</label>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>{" "}
                  </div>
                ))}
                {errors.media && (
                  <span className="alert alert-danger">
                    {errors.media.message}
                  </span>
                )}
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => append("")}
                >
                  Add Media
                </button>
              </div>{" "}
              {createdVenue.errors && createdVenue.errors[0] && (
                <span className="alert-danger alert">
                  {createdVenue?.errors[0]?.message}
                </span>
              )}
              <div className="d-flex justify-content-center ">
                <button className="btn btn-outline-success form-control ">
                  Create Venue
                </button>
              </div>{" "}
            </form>{" "}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreateVenue;
