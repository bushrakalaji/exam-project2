import React, { useState } from "react";
import * as storage from "../../storage/index.mjs";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/api.js";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(API_BASE_URL + "/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const manager = data.venueManager;
      if (manager) {
        navigate("/admin/dashboard");
      }

      storage.save("token", data.accessToken);
      storage.save("profile", data);
      navigate("/user/profile");
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
