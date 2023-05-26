import React, { useState } from "react";
import * as storage from "../../storage/index.mjs";
import { API_BASE_URL } from "../../api/api.js";
import { Button, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import RegisterForm from "../register/index.jsx";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});
function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [show, setShow] = useState(false);

  const handelClose = () => setShow(false);
  const handelShow = () => setShow(true);
  const notify = () =>
    toast.success("Logged in successfully!", {
      onClose: () => {
        window.location.reload();
      },
    });

  const onSubmit = async (data) => {
    try {
      const response = await fetch(API_BASE_URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const loginInfo = await response.json();

      storage.save("token", loginInfo.accessToken);
      storage.save("profile", loginInfo);
      notify();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <Button onClick={handelShow}>Login</Button>
      <Modal show={show} onHide={handelClose} centered>
        <Modal.Header closeButton>Login</Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column  gap-3 text-primary p-5 rounded "
          >
            <label className="form-label">
              Email:
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="form-control"
              />
              {errors.email && (
                <span className="alert alert-danger">
                  {errors.email.message}
                </span>
              )}
            </label>
            <label className="form-label">
              Password:
              <input
                type="password"
                placeholder="password"
                {...register("password")}
                className="form-control"
              />
            </label>
            {errors.password && (
              <span className="alert alert-danger">
                {errors.password.message}
              </span>
            )}
            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "50%" }}
              >
                Login
              </button>
              <ToastContainer />
              <Button
                className="btn btn-primary "
                style={{ width: "50%" }}
                onClick={handelClose}
              >
                Cansel
              </Button>
            </div>
            <div className="border-primary border-1 border-top border-opacity-25  py-3 d-flex align-items-center gap-2  ">
              <span> New user ? </span>
              <span>
                <RegisterForm />
              </span>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LoginForm;
