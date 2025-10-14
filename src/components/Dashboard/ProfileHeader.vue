<script setup>
import { useAdminStore } from "@/stores/useAdminStore.js";
const adminStore = useAdminStore();
</script>

<template>
  <!-- Admin Dashboard Header -->
  <div class="bg-primary/15 border-b p-2 border-gray-200">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo & Admin Title -->
        <div class="flex items-center space-x-3">
          <img
            src="@/assets/images/logo.png"
            alt="Warehouse Portal"
            class="h-9 w-auto transition-transform duration-200 hover:scale-105"
          />
        </div>

        <!-- Right side items -->
        <div class="flex items-center space-x-3">
          <!-- Notifications -->
          <div class="relative group">
            <button
              class="relative p-2.5 text-white transition-all duration-200 bg-gradient-to-r from-primary to-rose-600 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group"
            >
              <Icon
                name="ph:bell"
                class="text-xl transition-transform group-hover:scale-110"
              />
              <span
                class="absolute top-1.5 right-1.5 bg-red-500 rounded-full w-2.5 h-2.5 border-2 border-white shadow-sm animate-pulse"
              ></span>
            </button>

            <!-- Notifications Dropdown -->
            <div
              class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2"
            >
              <div
                class="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50"
              >
                <h3 class="font-semibold text-gray-800">System Alerts</h3>
                <span class="text-xs text-gray-500"
                  >3 critical, 2 warnings</span
                >
              </div>
              <div class="max-h-96 overflow-y-auto">
                <div
                  class="p-3 border-b border-gray-100 hover:bg-red-50 cursor-pointer"
                >
                  <div class="flex items-start gap-3">
                    <div
                      class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center"
                    >
                      <svg
                        class="w-4 h-4 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        ></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-800">
                        Database Backup Failed
                      </p>
                      <p class="text-xs text-gray-500">
                        Last backup attempt unsuccessful
                      </p>
                      <span class="text-xs text-red-600">10 minutes ago</span>
                    </div>
                  </div>
                </div>
                <div
                  class="p-3 border-b border-gray-100 hover:bg-yellow-50 cursor-pointer"
                >
                  <div class="flex items-start gap-3">
                    <div
                      class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center"
                    >
                      <svg
                        class="w-4 h-4 text-yellow-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        ></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-800">
                        High Memory Usage
                      </p>
                      <p class="text-xs text-gray-500">
                        Server memory at 85% capacity
                      </p>
                      <span class="text-xs text-yellow-600"
                        >25 minutes ago</span
                      >
                    </div>
                  </div>
                </div>
                <div
                  class="p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer"
                >
                  <div class="flex items-start gap-3">
                    <div
                      class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                    >
                      <svg
                        class="w-4 h-4 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium text-gray-800">
                        New Admin Login
                      </p>
                      <p class="text-xs text-gray-500">
                        User authenticated from new device
                      </p>
                      <span class="text-xs text-blue-600">1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-3 border-t border-gray-100">
                <button
                  class="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all alerts
                </button>
              </div>
            </div>
          </div>

          <button
            class="relative p-2.5 text-white transition-all duration-200 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group"
          >
            <Icon
              name="ph:chat-circle"
              class="text-xl transition-transform group-hover:scale-110"
            />
            <span
              class="absolute top-1.5 right-1.5 bg-blue-500 rounded-full w-2.5 h-2.5 border-2 border-white shadow-sm animate-pulse"
            ></span>
          </button>

          <!-- User menu -->
          <div class="relative group">
            <button
              class="flex items-center space-x-3 p-2 rounded-lg transition-all duration-200"
            >
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-sm border border-blue-300"
              >
                <span class="text-white font-semibold text-sm">SA</span>
              </div>
              <div class="hidden md:block text-left">
                <p class="text-sm font-medium">System Admin</p>
                <p class="text-xs text-primary">Super Administrator</p>
              </div>
              <svg
                class="w-4 h-4 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <!-- User Dropdown -->
            <div
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2"
            >
              <div
                class="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50"
              >
                <p class="text-sm font-medium text-gray-800">System Admin</p>
                <p class="text-xs text-gray-500">admin@system.com</p>
              </div>
              <div class="p-2">
                <a
                  href="#"
                  class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  Admin Profile
                </a>
                <a
                  href="#"
                  class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  System Settings
                </a>
                <a
                  href="#"
                  class="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                  Audit Log
                </a>
              </div>
              <div class="p-2 border-t border-gray-100">
                <button
                  @click="adminStore?.logout"
                  class="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
