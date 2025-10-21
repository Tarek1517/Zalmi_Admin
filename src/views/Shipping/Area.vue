<script setup>
import { ref, onMounted, watch, inject } from "vue";
import Modal from "@/components/Modal.vue";
import Modal2 from "@/components/Modal2.vue";
import useAxios from "@/composables/useAxios.js";
import { toast } from "vue3-toastify";

const { loading, error, sendRequest } = useAxios();

const extractPage = (url) => {
  if (!url) return 1;
  const match = url.match(/page=(\d+)/);
  return match ? parseInt(match[1]) : 1;
};

const setting = inject("setting");
const query = ref({
  search: "",
  city_id: null,
});

const resetQuery = () => {
  query.value.search = "";
  query.value.city_id = null;
};

const areas = ref(null);
const getAreas = async (page = 1) => {
  try {
    const response = await sendRequest({
      method: "get",
      url: "/v1/area",
      params: {
        search: query.value.search,
        city_id: query.value.city_id,
        page,
      },
    });

    if (response) {
      areas.value = response.data;
    }
  } catch (err) {
    console.error("Failed to fetch areas:", err);
    toast.error("Failed to load areas");
  }
};

const cities = ref(null);
const getCities = async () => {
  try {
    const response = await sendRequest({
      method: "get",
      url: "/v1/city",
    });

    // handle response
    if (response?.data?.data) {
      cities.value = response.data.data.map((city) => ({
        id: city.id,
        name: city.name,
      }));
    } else {
      cities.value = [];
    }
  } catch (err) {
    console.error("Failed to fetch cities:", err);
    toast.error("Failed to load cities");
  }
};

watch(query, getAreas, { deep: true });

// Form handling
const form = ref({
  name: "",
  city_id: null,
  delivery_charge: 0,
});

const resetForm = () => {
  form.value = {
    name: "",
    city_id: null,
    delivery_charge: 0,
  };
};

const onSubmit = async () => {
  if (!form.value.name.trim()) {
    toast.error("Area name is required");
    return;
  }

  if (!form.value.city_id) {
    toast.error("Please select a city");
    return;
  }

  try {
    const response = await sendRequest({
      method: "post",
      url: "/v1/area",
      data: form.value,
    });

    if (response) {
      toast.success("Area added successfully", {
        autoClose: 1500,
        theme: "dark",
      });
      closeModal();
      await getAreas();
    }
  } catch (err) {
    console.error("Failed to add area:", err);
    toast.error("Failed to add area");
  }
};

const onDelete = async (id, areaName) => {
  if (!confirm(`Are you sure you want to delete "${areaName}"?`)) {
    return;
  }

  try {
    const response = await sendRequest({
      url: `/v1/area/${id}`,
      method: "delete",
    });

    if (response) {
      toast.success("Area deleted successfully", {
        autoClose: 1500,
        theme: "dark",
      });
      await getAreas();
    }
  } catch (err) {
    console.error("Failed to delete area:", err);
    toast.error("Failed to delete area");
  }
};

// Edit area
const editArea = ref({
  id: null,
  name: "",
  delivery_charge: 0,
  city_id: null,
});

const editAreaItem = (item) => {
  isEditModalOpened.value = true;
  editArea.value = {
    id: item.id,
    name: item.name,
    delivery_charge: parseFloat(item.delivery_charge) || 0,
    city_id: item.city_id,
  };
};

const onUpdate = async (id) => {
  if (!editArea.value.name.trim()) {
    toast.error("Area name is required");
    return;
  }

  if (!editArea.value.city_id) {
    toast.error("Please select a city");
    return;
  }

  try {
    const response = await sendRequest({
      method: "post",
      url: `/v1/area/${id}`,
      params: {
        _method: "PUT",
      },
      data: editArea.value,
    });

    if (response) {
      toast.success("Area updated successfully", {
        autoClose: 1500,
        theme: "dark",
      });
      await getAreas();
      isEditModalOpened.value = false;
    }
  } catch (err) {
    console.error("Failed to update area:", err);
    toast.error("Failed to update area");
  }
};

// Modal area
const isModalOpened = ref(false);
const isEditModalOpened = ref(false);

const openModal = () => {
  isModalOpened.value = true;
};

const closeModal = () => {
  isModalOpened.value = false;
  isEditModalOpened.value = false;
  resetForm();
  editArea.value = {
    id: null,
    name: "",
    delivery_charge: 0,
    city_id: null,
  };
};

onMounted(() => {
  getAreas();
  getCities();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="w-full">
      <!-- Header Card -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6"
      >
        <div class="px-6 py-5 sm:px-8 sm:py-6">
          <div
            class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
          >
            <!-- Title Section -->
            <div class="flex items-center gap-3">
              <div class="p-2 bg-indigo-50 rounded-xl">
                <Icon
                  name="mdi:map-marker-radius-outline"
                  class="text-2xl text-indigo-600"
                />
              </div>
              <div>
                <h1 class="text-2xl font-bold text-gray-900">
                  Area Management
                </h1>
                <p class="text-sm text-gray-500 mt-1">
                  Manage delivery areas and charges
                </p>
              </div>
            </div>

            <!-- Search and Filter Section -->
            <div class="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
              <!-- Search Input -->
              <div class="flex-1">
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                  >
                    <Icon name="mdi:magnify" class="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    v-model="query.search"
                    placeholder="Search by area name..."
                    class="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>
              <div class="sm:w-64">
                <select
                  v-model="query.city_id"
                  class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled selected>Select City</option>
                  <option
                    v-for="city in cities"
                    :key="city.id"
                    :value="city.id"
                  >
                    {{ city.name }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Add Area Button -->
            <div class="lg:self-start">
              <button
                @click="openModal"
                class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-medium rounded-xl shadow-sm transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <Icon name="mdi:plus" class="text-lg" />
                Add New Area
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Areas Table Card -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <Loading :value="loading" />

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50/80 border-b border-gray-200">
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Area Information
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  City
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Delivery Charge
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="item in areas?.data"
                :key="item.id"
                class="hover:bg-gray-50/50 transition-colors duration-150"
              >
                <!-- Area Name -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-indigo-50 rounded-lg">
                      <Icon
                        name="mdi:map-marker-outline"
                        class="text-indigo-600 text-lg"
                      />
                    </div>
                    <div>
                      <div class="font-medium text-gray-900 text-sm">
                        {{ item.name }}
                      </div>
                      <div class="text-xs text-gray-500 mt-0.5">Area</div>
                    </div>
                  </div>
                </td>

                <!-- City -->
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">
                    {{ item.city?.name || "N/A" }}
                  </div>
                </td>

                <!-- Delivery Charge -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <span class="text-lg font-semibold text-gray-900">
                      ${{ parseFloat(item.delivery_charge || 0).toFixed(2) }}
                    </span>
                    <span class="text-xs text-gray-500">per delivery</span>
                  </div>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <button
                      @click="editAreaItem(item)"
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg border border-blue-200 transition-all duration-200"
                      title="Edit Area"
                    >
                      <Icon name="mdi:pencil-outline" class="text-base" />
                      Edit
                    </button>
                    <button
                      @click="onDelete(item.id, item.name)"
                      class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-200 transition-all duration-200"
                      title="Delete Area"
                    >
                      <Icon name="mdi:trash-can-outline" class="text-base" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Empty area -->
              <tr v-if="!loading && (!areas?.data || areas.data.length === 0)">
                <td colspan="4" class="px-6 py-12 text-center">
                  <div
                    class="flex flex-col items-center justify-center text-gray-400"
                  >
                    <Icon
                      name="mdi:map-marker-off-outline"
                      class="text-4xl mb-3"
                    />
                    <p class="text-lg font-medium text-gray-500">
                      No areas found
                    </p>
                    <p class="text-sm mt-1">
                      Get started by adding your first area
                    </p>
                    <button
                      @click="openModal"
                      class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-secondary text-white font-medium rounded-lg transition-colors"
                    >
                      <Icon name="mdi:plus" />
                      Add Area
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          v-if="areas?.meta && areas.meta.last_page > 1"
          class="px-6 py-4 border-t border-gray-200 bg-gray-50/50"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div class="text-sm text-gray-600">
              Showing {{ areas.meta.from }} to {{ areas.meta.to }} of
              {{ areas.meta.total }} results
            </div>
            <div class="flex gap-1 flex-wrap">
              <button
                v-for="link in areas.meta.links"
                :key="link.label"
                @click="getAreas(extractPage(link.url))"
                :disabled="!link.url || link.active"
                :class="[
                  'px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors min-w-10',
                  link.active
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : link.url
                    ? 'text-gray-700 border-gray-300 hover:bg-gray-50'
                    : 'text-gray-400 border-gray-200 cursor-not-allowed',
                ]"
                v-html="link.label"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Area Modal -->
    <Modal2
      title="Add New Area"
      :isOpen="isModalOpened"
      @modal-close="closeModal"
      size="md"
    >
      <div class="p-6 space-y-6">
        <!-- City Selection -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            City <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.city_id"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled selected>Select City</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>

        <!-- Area Name -->
        <div class="space-y-2">
          <label for="areaName" class="block text-sm font-medium text-gray-700">
            Area Name <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <Icon name="mdi:map-marker-outline" class="text-gray-400" />
            </div>
            <input
              id="areaName"
              type="text"
              v-model="form.name"
              placeholder="Enter area name"
              class="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              @keyup.enter="onSubmit"
            />
          </div>
        </div>

        <!-- Delivery Charge -->
        <div class="space-y-2">
          <label
            for="deliveryCharge"
            class="block text-sm font-medium text-gray-700"
          >
            Delivery Charge
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <span class="text-gray-500">$</span>
            </div>
            <input
              id="deliveryCharge"
              type="number"
              v-model.number="form.delivery_charge"
              min="0"
              step="0.01"
              placeholder="0.00"
              class="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          <p class="text-xs text-gray-500">Delivery charge for this area</p>
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
            :disabled="!form.name.trim() || !form.city_id"
            class="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium rounded-xl shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Save Area
          </button>
        </div>
      </div>
    </Modal2>

    <!-- Edit Area Modal -->
    <Modal2
      title="Edit Area"
      :isOpen="isEditModalOpened"
      @modal-close="closeModal"
      size="md"
    >
      <div class="p-6 space-y-6">
        <!-- City Selection -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            City <span class="text-red-500">*</span>
          </label>
          <select
            v-model="editArea.city_id"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled selected>Select City</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>

        <!-- Area Name -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            Area Name <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <Icon name="mdi:map-marker-outline" class="text-gray-400" />
            </div>
            <input
              type="text"
              v-model="editArea.name"
              placeholder="Enter area name"
              class="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <!-- Delivery Charge -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">
            Delivery Charge
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <span class="text-gray-500">$</span>
            </div>
            <input
              type="number"
              v-model.number="editArea.delivery_charge"
              min="0"
              step="0.01"
              placeholder="0.00"
              class="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
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
            @click="onUpdate(editArea.id)"
            :disabled="!editArea.name.trim() || !editArea.city_id"
            class="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-medium rounded-xl shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Update Area
          </button>
        </div>
      </div>
    </Modal2>
  </div>
</template>

<style scoped></style>
