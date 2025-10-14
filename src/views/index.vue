<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAdminStore } from "@/stores/useAdminStore.js";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
const router = useRouter();
const isForm = ref(false);

const adminStore = useAdminStore();
//Login
const state = ref({
  email: null,
  password: null,
});

const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  try {
    const loginResponse = await adminStore.login(state.value);
    if (loginResponse) {
      loading.value = false;
      toast.success("Login successful!", { autoClose: 1000 });
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    }
  } catch (error) {
    loading.value = false;
    toast.error(
      error.response?.data?.message || "Login failed. Please try again.",
      { autoClose: 1000 }
    );
  }
};
onMounted(() => {
  setTimeout(() => {
    isForm.value = true;
  }, 500);
});
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-200 px-4"
  >
    <div
      class="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden bg-white"
    >
      <!-- Left Side: Form -->
      <div class="px-10 py-12 flex flex-col justify-center">
        <!-- Title -->
        <div class="text-center mb-8">
          <div class="flex justify-center mb-4">
            <div
              class="px-5 py-3 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg"
            >
              <span class="text-4xl font-bold text-white font-serif">Z</span>
            </div>
          </div>
          <h2 class="text-3xl font-extrabold text-gray-900">Admin Portal</h2>
          <p class="text-sm text-gray-600">
            Sign in to access management dashboard
          </p>
        </div>

        <!-- Form -->
        <div class="space-y-6 max-w-sm mx-auto w-full">
          <!-- Email -->
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Admin Email</label
            >
            <input
              id="email"
              v-model="state.email"
              type="email"
              placeholder="admin@company.com"
              class="block w-full px-4 py-3 border border-primary/25 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-colors"
            />
          </div>

          <!-- Password -->
          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Password</label
            >
            <input
              id="password"
              v-model="state.password"
              type="password"
              placeholder="••••••••"
              class="block w-full px-4 py-3 border border-primary/25 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-colors"
            />
          </div>

          <!-- Remember / Forgot -->
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="ml-2 text-gray-700">Remember me</span>
            </label>
            <a
              href="#"
              class="font-medium text-primary hover:text-secondary transition-colors"
              >Forgot password?</a
            >
          </div>

          <!-- Submit -->
          <button
            v-if="loading"
            class="w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-md text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary font-semibold transition-all duration-200 transform hover:scale-[1.02]"
          >
            <Icon name="svg-spinners:ring-resize" class="text-3xl" />
          </button>
          <button
            v-else
            @click="handleLogin"
            class="w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-md text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary font-semibold transition-all duration-200 transform hover:scale-[1.02]"
          >
            Access Admin Dashboard
          </button>
        </div>

        <!-- Footer -->
        <div class="mt-10 text-center text-xs text-gray-500">
          © 2025 Admin Management System — Secure Access Only
        </div>
      </div>

      <div
        class="hidden md:flex items-center justify-center bg-gradient-to-br from-primary to-secondary"
      >
        <img
          src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
          alt="Admin Dashboard"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>
