import { ref } from "vue";
import axios from "axios";
import { useAdminStore } from "@/stores/useAdminStore.js";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
});

// Add request interceptor to handle token dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const adminStore = useAdminStore();
      await adminStore.clearSession();
      // Don't redirect here, let the component handle it
    }
    return Promise.reject(error);
  }
);

const getStoredToken = () => {
  const saved = localStorage.getItem("admin");
  return saved ? JSON.parse(saved).token : null;
};

export default function useAxios() {
  const loading = ref(false);
  const error = ref(null);

  const sendRequest = async (config) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await axiosInstance(config);
      return response;
    } catch (err) {
      error.value = err.response ? err.response.data : err.message;

      // Only show toast for non-auth errors
      if (err.response?.status !== 401) {
        toast.error(error.value.message || "An error occurred", {
          autoClose: 2000,
          theme: "dark",
        });
      }

      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    sendRequest,
  };
}
