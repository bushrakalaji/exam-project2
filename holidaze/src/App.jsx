import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import HomePage from "./pages/home";
import Venue from "./components/venue";
import MyBooking from "./components/bookings";
import BookingById from "./components/bookings/booking";
import UpdateBooking from "./components/bookings/update";
import UpdateVenuePage from "./pages/admin/update";
import DashboardLayout from "./components/admin/dashboard";
import AdminVenues from "./components/admin/venues";
import BookedVenues from "./components/admin/bookedVenues";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import ProfilePage from "./pages/profile";
import UpdateAvatar from "./components/profile/update";
import DashboardIntro from "./components/admin/intro";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="venues/:id" element={<Venue />} />
          <Route path="/bookings" element={<MyBooking />} />
          <Route path="booking/:id" element={<BookingById />} />
          <Route path="update/:id" element={<UpdateVenuePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="updateBooking/:id" element={<UpdateBooking />} />
          <Route path="profile/:name" element={<ProfilePage />} />
          <Route path="updateAvatar/:name" element={<UpdateAvatar />} />
          <Route path="/venues" element={<AdminVenues />} />
        </Route>{" "}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardIntro />} />
          <Route path="/dashboard/bookings" element={<MyBooking />} />
          <Route path="/dashboard/venues" element={<AdminVenues />} />
          <Route path="/dashboard/booked" element={<BookedVenues />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
