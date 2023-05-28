import { create } from "zustand";
import { authFetch, headers } from "../auth/authFetch";
import { toast } from "react-toastify";

const notify = () =>
  toast.success("Avatar updated  successfully!", {
    onClose: () => {
      window.location.reload();
    },
    draggable: false,
  });
const useProfileStore = create((set) => ({
  profiles: [],
  profile: 0,
  updatedAvatar: 0,
  isLoading: false,
  hasError: false,
  fetchProfiles: async (url) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await authFetch(url);
      const json = await response.json();
      set(() => ({ profiles: json, isLoading: false }));
    } catch (error) {
      set(() => ({ hasError: true, isLoading: false }));
    }
  },

  fetchProfile: async (url) => {
    set(() => ({ isLoading: true }));
    try {
      const response = await authFetch(url);
      const json = await response.json();
      set((state) => ({
        profile: (state.profile = json),
        isLoading: false,
      }));
    } catch (error) {
      set(() => ({ hasError: true, isLoading: false, error: error.message }));
    }
  },
  updateAvatar: async (url, data) => {
    try {
      const response = await authFetch(url, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(data),
      });

      const json = await response.json();
      set(() => ({ updatedAvatar: json, isLoading: false }));

      if (!response.ok) {
        throw new Error(`Error: ${json.errors[0].message}`);
      }
      notify();
    } catch (error) {
      set(() => ({ hasError: true, isLoading: false, error: error.message }));
    }
  },
}));

function useProfile() {
  const profiles = useProfileStore((state) => state.profiles);
  const profile = useProfileStore((state) => state.profile);
  const fetchProfile = useProfileStore((state) => state.fetchProfile);
  const isLoading = useProfileStore((state) => state.isLoading);
  const hasError = useProfileStore((state) => state.hasError);
  const updateAvatar = useProfileStore((state) => state.updateAvatar);
  const updatedAvatar = useProfileStore((state) => state.updatedAvatar);

  return {
    profiles,
    profile,
    fetchProfile,
    isLoading,
    hasError,
    updateAvatar,
    updatedAvatar,
  };
}

export { useProfileStore, useProfile };
