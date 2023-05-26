import React, { useState } from "react";
import { useProfile } from "../../../hooks/useProfile";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router";
import { API_BASE_URL } from "../../../api/api";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

const schema = yup.object().shape({
  avatar: yup.string().url("Avatar must be a valid URL"),
});
function UpdateAvatar() {
  const { profile, updateAvatar, updatedAvatar } = useProfile();
  const [show, setShow] = useState(false);
  const { name } = useParams();
  console.log(name);
  const handelClose = () => setShow(false);
  const handelShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      avatar: profile?.avatar,
    },
  });

  const onSubmit = (data) => {
    updateAvatar(`${API_BASE_URL}/profiles/${name}/media`, data);

    console.log(data);
  };

  return (
    <div>
      <Button onClick={handelShow} className="dropdown-item">
        Update avatar
      </Button>
      <Modal show={show} onHide={handelClose} centered>
        <Modal.Header closeButton>Update Avatar</Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column gap-5 "
          >
            <div>
              <label for="avatar">Avatar URL</label>
              <input
                type="url"
                {...register("avatar")}
                placeholder="Avatar url"
                className="form-control"
                id="avatar"
              />
              {updatedAvatar.errors && updatedAvatar.errors[0] && (
                <span className="text-danger">
                  {updatedAvatar?.errors[0]?.message}
                </span>
              )}
              {errors.avatar && <span>{errors.avatar.message}</span>}
            </div>
            <button className="btn btn-primary form-control " type="submit">
              Update
            </button>
            <ToastContainer />
          </form>
        </Modal.Body>
      </Modal>{" "}
    </div>
  );
}

export default UpdateAvatar;
