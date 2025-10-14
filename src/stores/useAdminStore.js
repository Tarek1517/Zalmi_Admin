import { defineStore } from "pinia";
import { ref, computed } from "vue";
import useAxios from "@/composables/useAxios";
import { useRouter } from "vue-router";

export const useAdminStore = defineStore("admin", () => {
  const router = useRouter();
  const admin = ref(JSON.parse(localStorage.getItem("admin")) ?? null); // Store admin data
  const isLoggedIn = computed(() => !!admin.value); // Check if admin is logged in
  const { loading, error, sendRequest } = useAxios();

  async function fetchAdmin() {
    const storedAdmin = JSON.parse(await getLocalStorage());

    if (storedAdmin) {
      try {
        loading.value = true;
        const { data } = await axios.get("/admin/user", {
          headers: {
            Authorization: `Bearer ${storedAdmin?.token}`,
          },
        });

        if (data) {
          admin.value = data;
        } else {
          await clearLocalStorage();
        }
      } catch (err) {
        await clearLocalStorage();
        error.value = err.response?.data || "An error occurred";
      } finally {
        loading.value = false;
      }
    } else {
      await clearLocalStorage();
    }
  }

  // Admin Login Function
  async function login(credentials) {
    try {
      const loginResponse = await sendRequest({
        method: "POST",
        url: "/admin/login",
        data: credentials,
      });

      if (loginResponse?.data) {
        await setLocalStorage(loginResponse.data);
        admin.value = loginResponse.data;
        return loginResponse;
      }
    } catch (err) {
      console.error("Login error:", err);
      throw err; // Rethrow so component can handle
    }
  }

  // Admin Signup Function (if needed)
  async function signup(signupData) {
    try {
      loading.value = true;
      const signupResponse = await axios.post("/api/admin/create", signupData);

      if (signupResponse.data?.data) {
        await setLocalStorage(signupResponse.data.data);
        admin.value = signupResponse.data.data;
        return signupResponse;
      }
    } catch (err) {
      error.value = err.response?.data || "Signup failed";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  // Admin Logout Function
  async function logout() {
    try {
      await sendRequest({
        url: "/logout",
        method: "GET",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    } catch (err) {
      console.warn("Logout request failed — proceeding to clear session.");
    } finally {
      admin.value = null;
      await clearLocalStorage();
      router.push({ name: "Home" });
    }
  }
  async function setLocalStorage(admin) {
    localStorage.setItem("admin", JSON.stringify(admin));
  }

  async function clearLocalStorage() {
    localStorage.removeItem("admin");
  }

  async function getLocalStorage() {
    return localStorage.getItem("admin");
  }

  function getToken() {
    return JSON.parse(localStorage.getItem("admin"))?.token;
  }
  return {
    admin,
    login,
    signup,
    isLoggedIn,
    fetchAdmin,
    logout,
    loading,
    error,
    getToken,
  };
});
