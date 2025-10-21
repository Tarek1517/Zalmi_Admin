<script setup>
import { ref, onMounted, inject } from "vue";
import Modal from "@/components/Modal.vue";
import useAxios from "@/composables/useAxios.js";
import { toast } from "vue3-toastify";
import Modal2 from "@/components/Modal2.vue";

const setting = inject("setting");
const { loading, error, sendRequest } = useAxios();

const extractPage = (url) => {
  if (!url) return 1;
  const match = url.match(/page=(\d+)/);
  return match ? parseInt(match[1]) : 1;
};

const cities = ref(null);
const getCities = async (page = 1) => {
  try {
    const response = await sendRequest({
      method: "get",
      url: `/v1/city?page=${page}`,
    });
    if (response) {
      cities.value = response.data;
    }
  } catch (err) {
    console.error("Failed to fetch cities:", err);
    toast.error("Failed to load cities");
  }
};

// Form handling
const form = ref({
  name: "",
  delivery_charge: null,
});

const resetForm = () => {
  form.value = {
    name: "",
    delivery_charge: null,
  };
};

const onSubmit = async () => {
  if (!form.value.name.trim()) {
    toast.error("City name is required");
    return;
  }

  try {
    const response = await sendRequest({
      method: "post",
      url: "/v1/city",
      data: form.value,
    });
    
    if (response) {
      toast.success("City added successfully", {
        autoClose: 1500,
        theme: "dark",
      });
      closeModal();
      await getCities();
    }
  } catch (err) {
    console.error("Failed to add city:", err);
    toast.error("Failed to add city");
  }
};

const onDelete = async (id, cityName) => {
  if (!confirm(`Are you sure you want to delete ${cityName}?`)) {
    return;
  }

  try {
    const response = await sendRequest({
      url: `/v1/city/${id}`,
      method: "delete",
    });
    
    if (response) {
      toast.success("City deleted successfully");
      await getCities(cities.value.meta.current_page);
    }
  } catch (err) {
    console.error("Failed to delete city:", err);
    toast.error("Failed to delete city");
  }
};

// Modal state
const isModalOpened = ref(false);

const openModal = () => {
  isModalOpened.value = true;
};

const closeModal = () => {
  isModalOpened.value = false;
  resetForm();
};

onMounted(() => {
  getCities();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="w-full">
      <!-- Header Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div class="px-6 py-5 sm:px-8 sm:py-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center gap-3 mb-4 sm:mb-0">
              <div class="p-2 bg-blue-50 rounded-xl">
                <Icon name="mdi:city-variant-outline" class="text-2xl text-blue-600" />
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-900">City Management</h1>
                <p class="text-sm text-gray-500 mt-1">Manage cities and delivery charges</p>
              </div>
            </div>
            <button 
              @click="openModal"
              class="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-medium rounded-xl shadow-sm transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Icon name="mdi:plus" class="text-lg" />
              Add New City
            </button>
          </div>
        </div>
      </div>

      <!-- Cities Table Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Loading State -->
        <Loading :value="loading" />
        
        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50/80 border-b border-gray-200">
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  City Information
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Delivery Charge
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr 
                v-for="city in cities?.data" 
                :key="city.id"
                class="hover:bg-gray-50/50 transition-colors duration-150"
              >
                <!-- City Name -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-blue-50 rounded-lg">
                      <Icon name="mdi:map-marker-outline" class="text-blue-600 text-lg" />
                    </div>
                    <div>
                      <div class="font-medium text-gray-900 text-sm">{{ city.name }}</div>
                      <div class="text-xs text-gray-500 mt-0.5">City</div>
                    </div>
                  </div>
                </td>

                <!-- Delivery Charge -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <span class="text-lg font-semibold text-gray-900">
                      ${{ parseFloat(city.delivery_charge || 0).toFixed(2) }}
                    </span>
                    <span class="text-xs text-gray-500">per delivery</span>
                  </div>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <button
                      @click="onDelete(city.id, city.name)"
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-200 transition-all duration-200"
                      title="Delete City"
                    >
                      <Icon name="mdi:trash-can-outline" class="text-base" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              
              <!-- Empty State -->
              <tr v-if="!loading && (!cities?.data || cities.data.length === 0)">
                <td colspan="3" class="px-6 py-12 text-center">
                  <div class="flex flex-col items-center justify-center text-gray-400">
                    <Icon name="mdi:city-variant-outline" class="text-4xl mb-3" />
                    <p class="text-lg font-medium text-gray-500">No cities found</p>
                    <p class="text-sm mt-1">Get started by adding your first city</p>
                    <button 
                      @click="openModal"
                      class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary text-white font-medium rounded-lg transition-colors"
                    >
                      <Icon name="mdi:plus" />
                      Add City
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="cities?.meta && cities.meta.last_page > 1" class="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600">
              Showing {{ cities.meta.from }} to {{ cities.meta.to }} of {{ cities.meta.total }} results
            </div>
            <div class="flex gap-1">
              <button
                v-for="link in cities.meta.links"
                :key="link.label"
                @click="getCities(extractPage(link.url))"
                :disabled="!link.url || link.active"
                :class="[
                  'px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors',
                  link.active
                    ? 'bg-blue-600 text-white border-blue-600'
                    : link.url
                    ? 'text-gray-700 border-gray-300 hover:bg-gray-50'
                    : 'text-gray-400 border-gray-200 cursor-not-allowed'
                ]"
                v-html="link.label"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add City Modal -->
    <Modal2
      title="Add New City"
      :isOpen="isModalOpened"
      @modal-close="closeModal"
      size="md"
    >
      <div class="p-6 space-y-6">
        <!-- City Name -->
        <div class="space-y-2">
          <label for="cityName" class="block text-sm font-medium text-gray-700">
            City Name <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="mdi:map-marker-outline" class="text-gray-400" />
            </div>
            <input
              id="cityName"
              type="text"
              v-model="form.name"
              placeholder="Enter city name"
              class="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              @keyup.enter="onSubmit"
            />
          </div>
        </div>

        <!-- Delivery Charge -->
        <div class="space-y-2">
          <label for="deliveryCharge" class="block text-sm font-medium text-gray-700">
            Delivery Charge
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500">$</span>
            </div>
            <input
              id="deliveryCharge"
              type="number"
              v-model.number="form.delivery_charge"
              min="0"
              step="0.01"
              placeholder="0.00"
              class="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          <p class="text-xs text-gray-500">Delivery charge for this city area</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-4">
          <button
            @click="closeModal"
            class="flex-1 px-4 py-3 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 font-medium rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            @click="onSubmit"
            :disabled="!form.name.trim()"
            class="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Save City
          </button>
        </div>
      </div>
    </Modal2>
  </div>
</template>

<style scoped>

</style>