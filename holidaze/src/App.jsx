import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout";
import "react-toastify/dist/ReactToastify.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import HomePage from "./pages/home";
import Venue from "./components/venue";
import MyBooking from "./components/bookings";
import BookingById from "./components/bookings/booking";
import DashboardLayout from "./components/admin/dashboard";
import AdminVenues from "./components/admin/venues";
import BookedVenues from "./components/admin/bookedVenues";
import ProfilePage from "./pages/profile";
import DashboardIntro from "./components/admin/intro";
import VisitAdminVenues from "./components/visitAdminVenues";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="venues/:id" element={<Venue />} />
          <Route path="/bookings" element={<MyBooking />} />
          <Route path="booking/:id" element={<BookingById />} />
          <Route path="profile/:name" element={<ProfilePage />} />
          <Route path="/venues" element={<AdminVenues />} />
          <Route path="visit/:name" element={<VisitAdminVenues />} />
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
