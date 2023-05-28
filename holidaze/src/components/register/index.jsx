import { useState } from "react";
import { API_BASE_URL } from "../../api/api";
import { Button, Modal, Form } from "react-bootstrap";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginForm from "../login";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[\w\s]+$/, "Name can only contain letters, numbers and spaces")
    .max(20, "max 20 characters"),
  email: yup
    .string()
    .email("Must be a valid email")
    .matches(
      /^[\w\-.]+@(stud\.)?noroff\.no$/,
      "Email must be of the form name@noroff.no or name@stud.noroff.no"
    )
    .required("Email is required"),
  avatar: yup.string().url("Must be a valid URL"),
  venueManager: yup.boolean(),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
function RegisterForm({ color }) {
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [show, setShow] = useState(false);
  const handelShow = () => setShow(true);
  const handelClose = () => setShow(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parse the error message from the server
        throw new Error(errorData.errors[0].message);
      }

      setServerError("");
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <div>
      <Button
        onClick={handelShow}
        style={{ color: color }}
        variant="btn btn-outline-primary"
      >
        Register
      </Button>
      <Modal show={show} onHide={handelClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>REGISTER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column gap-3 text-primary p-3 rounded"
          >
            <Form.Group className="d-flex flex-column gap-1">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                className="form-control "
                type="text"
                {...register("name")}
                placeholder="Name"
                id="name"
              />
              {errors.name && (
                <span className="alert alert-danger">
                  {errors.name.message}
                </span>
              )}
            </Form.Group>
            <Form.Group className="d-flex flex-column gap-1">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                className="form-control"
                type="email"
                {...register("email")}
                placeholder="Email"
                id="email"
              />
              {errors.email && (
                <span className="alert alert-danger">
                  {errors.email.message}
                </span>
              )}
            </Form.Group>
            <Form.Group className="d-flex flex-column gap-1">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                className="form-control"
                type="password"
                {...register("password")}
                placeholder="Password"
                id="password"
              />
              {errors.password && (
                <span className="alert alert-danger">
                  {errors.password.message}
                </span>
              )}
            </Form.Group>
            <Form.Group className="d-flex flex-column gap-1">
              <Form.Label>Avatar:</Form.Label>
              <Form.Control
                className="form-control"
                type="text"
                {...register("avatar")}
                placeholder="Avatar"
                id="avatar"
              />
              {errors.avatar && (
                <span className="alert alert-danger">
                  {errors.avatar.message}
                </span>
              )}
            </Form.Group>
            <Form.Group className="d-flex gap-2 ">
              <Form.Label>Venue Manager:</Form.Label>
              <Form.Check
                type="checkbox"
                {...register("venueManager")}
                id="venueManeger"
              />
            </Form.Group>{" "}
            {serverError && (
              <div className="alert alert-danger">{serverError}</div>
            )}
            <div className="d-flex gap-2">
              <Button
                type="submit"
                className="form-control"
                variant="btn btn-outline-primary"
                style={{ width: "50%" }}
              >
                Register{" "}
              </Button>

              <Button
                style={{ width: "50%" }}
                onClick={handelClose}
                variant="btn btn-outline-primary"
              >
                Cansel
              </Button>
            </div>
            <div className="border-primary border-1 border-top border-opacity-25 p-1 d-flex align-items-center gap-2">
              <span> Already have an account?</span>
              <span>
                <LoginForm />
              </span>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RegisterForm;
