import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Dashboard from "./components/admin/dashboard";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./sass/styles.scss";
import HomePage from "./pages/home";
import Venue from "./components/venue";
import MyBooking from "./components/bookings";
import BookingById from "./components/bookings/booking";
import UpdateBooking from "./components/bookings/update";
import UpdateVenuePage from "./pages/admin/update";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="venues/:id" element={<Venue />} />
          <Route path="/bookings" element={<MyBooking />} />
          <Route path="booking/:id" element={<BookingById />} />
        </Route>

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="update/:id" element={<UpdateVenuePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="updateBooking/:id" element={<UpdateBooking />} />
      </Routes>
    </>
  );
}

export default App;
