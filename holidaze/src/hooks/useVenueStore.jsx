import { create } from "zustand";
import { authFetch, headers } from "../auth/authFetch";
import { toast } from "react-toastify";

const notify = () =>
  toast.success("Venue updated successfully!", {
    onClose: () => {
      toast.dismiss();
      window.location.reload();
    },
    draggable: false,
    closeOnClick: true,
  });
const useVenueStore = create((set) => ({
  venues: [],
  booking: 0,
  searchList: [],
  currentVenue: 0,
  createdVenue: 0,
  updateError: null,
  createdSuccsess: false,
  updatedVenue: 0,
  isLoading: false,
  hasError: false,
  adminVenues: [],
  fetchAdminVenues: async (url) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await authFetch(url);
      const json = await response.json();
      set(() => ({ adminVenues: json, isLoading: false }));
    } catch (error) {
      set(() => ({ hasError: true, isLoading: false }));
    }
  },
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
  fetchSearch: async (url) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await fetch(url);
      const json = await response.json();
      set(() => ({ searchList: json, isLoading: false }));
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
      set((state) => ({ booking: (state.booking = json), isLoading: false }));
      if (!response.ok) {
        throw new Error(`Error: ${json.errors[0].message}`);
      }
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
      set((state) => ({
        createdVenue: (state.createdVenue = json),
        isLoading: false,
      }));
      if (!response.ok) {
        throw new Error(`Error: ${json.errors[0].message}`);
      }

      set(() => ({ createdSuccsess: true }));
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
      set(() => ({ updatedVenue: json, updateError: null, isLoading: false }));
      if (!response.ok) {
        throw new Error(`Error: ${json.errors[0].message}`);
      }
      notify();
    } catch (error) {
      set(() => ({
        updatedVenue: null,
        updateError: error.message,
        isLoading: false,
      }));
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
  const fetchSearch = useVenueStore((state) => state.fetchSearch);
  const searchList = useVenueStore((state) => state.searchList);
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
  const adminVenues = useVenueStore((state) => state.adminVenues);
  const fetchAdminVenues = useVenueStore((state) => state.fetchAdminVenues);
  const createdSuccsess = useVenueStore((state) => state.createdSuccsess);
  const updateError = useVenueStore((state) => state.updateError);
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
    adminVenues,
    fetchAdminVenues,
    fetchSearch,
    searchList,
    createdSuccsess,
    updateError,
  };
}

export { useVenueStore, useVenues };
