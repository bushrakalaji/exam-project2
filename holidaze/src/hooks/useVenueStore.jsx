import { create } from "zustand";
import { authFetch, headers } from "../auth/authFetch";

const useVenueStore = create((set) => ({
  venues: [],
  booking: 0,
  currentVenue: 0,
  createdVenue: 0,
  updatedVenue: 0,
  isLoading: false,
  hasError: false,
  fetchVenues: async (url) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await fetch(url);
      const json = await response.json();
      set(() => ({ venues: json, isLoading: false }));
    } catch (error) {
      set(() => ({ hasError: true, isLoading: false }));
    }
  },
  fetchVenue: async (url) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await fetch(url);
      const json = await response.json();
      set((state) => ({
        currentVenue: (state.currentVenue = json),
        isLoading: false,
      }));
    } catch (error) {
      set(() => ({ hasError: true, isLoading: false }));
    }
  },
  sendBookings: async (url, data) => {
    try {
      const response = await authFetch(url, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data),
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(`Error: ${json.errors[0].message}`);
      }

      set((state) => ({ booking: (state.booking = json), isLoading: false }));
    } catch (error) {
      set(() => ({ hasError: true, isLoading: false }));
    }
  },
  createVenue: async (url, data) => {
    try {
      const response = await authFetch(url, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(`Error: ${json.errors[0].message}`);
      }

      set((state) => ({
        createdVenue: (state.createdVenue = json),
        isLoading: false,
      }));
    } catch (error) {
      set(() => ({ hasError: true, isLoading: false }));
    }
  },
  updateVenue: async (url, data) => {
    try {
      const response = await authFetch(url, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(`Error: ${json.errors[0].message}`);
      }

      set((state) => ({ updatedVenue: state.json, isLoading: false }));
    } catch (error) {
      set(() => ({ hasError: true, isLoading: false }));
    }
  },
  deleteVenue: async (url) => {
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
}));

function useVenues() {
  const venues = useVenueStore((state) => state.venues);
  const currentVenue = useVenueStore((state) => state.currentVenue);
  const fetchVenues = useVenueStore((state) => state.fetchVenues);
  const fetchVenue = useVenueStore((state) => state.fetchVenue);
  const isLoading = useVenueStore((state) => state.isLoading);
  const hasError = useVenueStore((state) => state.hasError);
  const booking = useVenueStore((state) => state.booking);
  const sendBookings = useVenueStore((state) => state.sendBookings);
  const createdVenue = useVenueStore((state) => state.createdVenue);
  const createVenue = useVenueStore((state) => state.createVenue);
  const updateVenue = useVenueStore((state) => state.updateVenue);
  const updatedVenue = useVenueStore((state) => state.updatedVenue);
  const deleteVenue = useVenueStore((state) => state.deleteVenue);
  return {
    venues,
    currentVenue,
    fetchVenues,
    fetchVenue,
    isLoading,
    hasError,
    booking,
    sendBookings,
    createdVenue,
    createVenue,
    updateVenue,
    updatedVenue,
    deleteVenue,
  };
}

export { useVenueStore, useVenues };
