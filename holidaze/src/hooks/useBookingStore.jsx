import { create } from "zustand";
import { authFetch, headers } from "../auth/authFetch";

const useBookingStore = create((set) => ({
  bookings: [],
  updatedBooking: 0,
  currentBooking: 0,
  isLoading: false,
  hasError: false,
  deleteBooking: async (url) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await authFetch(url, {
        method: "DELETE",
        headers: headers(),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      set(() => ({ isLoading: false }));
    } catch (error) {
      set(() => ({ hasError: true, isLoading: false }));
    }
  },

  fetchBookings: async (url) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await authFetch(url);
      const json = await response.json();
      set(() => ({ bookings: json, isLoading: false }));
    } catch (error) {
      set(() => ({ hasError: true, isLoading: false }));
    }
  },
  fetchBooking: async (url) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await authFetch(url);
      const json = await response.json();
      set(() => ({ currentBooking: json, isLoading: false }));
    } catch (error) {
      set(() => ({ hasError: true, isLoading: false }));
    }
  },
  updateBookings: async (url, data) => {
    try {
      const response = await authFetch(url, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const json = await response.json();
      set(() => ({ updatedBooking: json, isLoading: false }));
    } catch (error) {
      set(() => ({ hasError: true, isLoading: false }));
    }
  },
}));

function useBookings() {
  const bookings = useBookingStore((state) => state.bookings);
  const currentBooking = useBookingStore((state) => state.currentBooking);
  const fetchBookings = useBookingStore((state) => state.fetchBookings);
  const fetchBooking = useBookingStore((state) => state.fetchBooking);
  const isLoading = useBookingStore((state) => state.isLoading);
  const hasError = useBookingStore((state) => state.hasError);
  const updatedBooking = useBookingStore((state) => state.updatedBooking);
  const sendBookings = useBookingStore((state) => state.sendBookings);
  const updateBookings = useBookingStore((state) => state.updateBookings);
  const deleteBooking = useBookingStore((state) => state.deleteBooking);
  return {
    bookings,
    currentBooking,
    fetchBookings,
    fetchBooking,
    isLoading,
    hasError,
    updatedBooking,
    sendBookings,
    updateBookings,
    deleteBooking,
  };
}

export { useBookingStore, useBookings };
