import React from "react";
import { API_BASE_URL } from "../../../api/api";
import { useVenues } from "../../../hooks/useVenueStore";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  const { createVenue } = useVenues();
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

    console.log(data);
  };
  return (
    <div className=" d-flex bg-secondary text-primary  p-5 rounded venueForm m-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column gap-5 "
      >
        <div>
          <label for="name">Venue Name</label>
          <input
            type="text"
            {...register("name")}
            placeholder="Name"
            className="form-control"
            id="name"
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>
        <div>
          <label for="desc">Descripe your venue</label>
          <textarea
            {...register("description")}
            placeholder="Description"
            className="form-control"
            id="desc"
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>
        <div className="d-flex gap-5 flex-wrap">
          <div>
            <label for="price">Price </label>
            <input
              type="number"
              {...register("price")}
              placeholder="Price"
              defaultValue={0}
              className="form-control"
              id="price"
            />
            {errors.price && <span>{errors.price.message}</span>}
          </div>
          <div>
            <label for="rating">Rating </label>
            <input
              type="number"
              {...register("rating")}
              placeholder="Rating"
              defaultValue={0}
              className="form-control"
              id="rating"
            />
            {errors.rating && <span>{errors.rating.message}</span>}
          </div>
          <div>
            <label for="geusts">Max Guests </label>
            <input
              type="number"
              {...register("maxGuests")}
              placeholder="Guests"
              defaultValue={1}
              className="form-control"
              id="geusts"
            />
            {errors.maxGuests && <span>{errors.maxGuests.message}</span>}
          </div>
        </div>
        <div className="d-flex gap-5  flex-wrap">
          <div className="d-flex gap-1">
            <label for="wifi">Wifi:</label>
            <input
              type="checkbox"
              {...register("meta.wifi")}
              className="form-check-input"
              id="wifi"
            />
          </div>
          <div className="d-flex gap-1">
            <label for="parking">parking:</label>
            <input
              type="checkbox"
              {...register("meta.parking")}
              className="form-check-input"
              id="parking"
            />
          </div>
          <div className="d-flex gap-1">
            <label for="breackfast">breakfast:</label>
            <input
              type="checkbox"
              {...register("meta.breakfast")}
              id="breackfast"
              className="form-check-input"
            />
          </div>
          <div className="d-flex gap-1">
            <label for="pets">pets:</label>
            <input
              type="checkbox"
              {...register("meta.pets")}
              className="form-check-input"
              id="pets"
            />
          </div>
        </div>
        <div className="d-flex flex-wrap gap-5">
          <div>
            <label for="address">Address</label>
            <input
              type="text"
              {...register("location.address")}
              className="form-control"
              id="address"
            />
          </div>
          <div>
            <label for="city">City</label>
            <input
              type="text"
              {...register("location.city")}
              className="form-control"
              id="city"
            />
          </div>
          <div>
            <label for="zip">Zip</label>
            <input
              id="zip"
              type="text"
              {...register("location.zip")}
              className="form-control"
            />
          </div>
          <div>
            <label for="country">Country</label>
            <input
              id="country"
              type="text"
              {...register("location.country")}
              className="form-control"
            />
          </div>
          <div>
            <label for="continent">Continent</label>
            <input
              type="text"
              {...register("location.continent")}
              className="form-control"
              id="continent"
            />
          </div>
        </div>
        <div className="d-flex gap-2 flex-column">
          <label htmlFor="media">Media:</label>
          {fields.map((field, index) => (
            <div key={field.id} className="d-flex gap-2">
              <input
                type="text"
                {...register(`media.${index}`)}
                defaultValue={field}
                placeholder="Media"
                id={`media.${index}`}
                className="form-control"
              />
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}
          {errors.media && <span>{errors.media.message}</span>}
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => append("Add Your URL")}
          >
            Add Media
          </button>
        </div>
        <div className="d-flex justify-content-center ">
          <button className="btn btn-danger form-control ">Create Venue</button>
        </div>
      </form>
    </div>
  );
}

export default CreateVenue;
