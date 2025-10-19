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
        const { data } = await sendRequest({
          url: "/admin/user",
          method: "GET",
        });

        if (data) {
          admin.value = data;
        } else {
          await clearSession();
        }
      } catch (err) {
        await clearSession();
        error.value = err.response?.data || "An error occurred";
      } finally {
        loading.value = false;
      }
    } else {
      await clearSession();
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
      const signupResponse = await sendRequest({
        method: "POST",
        url: "/admin/create",
        data: signupData,
      });

      if (signupResponse?.data) {
        await setLocalStorage(signupResponse.data);
        admin.value = signupResponse.data;
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
      await clearSession();
      router.push({ name: "Home" });
    }
  }

  // Add clearSession function
  async function clearSession() {
    admin.value = null;
    await clearLocalStorage();
  }

  async function setLocalStorage(adminData) {
    localStorage.setItem("admin", JSON.stringify(adminData));
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
    clearSession, // Export clearSession
    loading,
    error,
    getToken,
  };
});