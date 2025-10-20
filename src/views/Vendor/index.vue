<script setup>
import { ref, onMounted, computed } from "vue";
import Modal from "@/components/Modal.vue";
import Modal2 from "@/components/Modal2.vue";
import useAxios from "@/composables/useAxios.js";
import { toast } from "vue3-toastify";
const showPassword = ref(false);
const { loading, sendRequest } = useAxios();
// Vendor data
const vendorList = ref([]);
const selectedVendor = ref(null);
const isViewModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const isAddModalOpen = ref(false);
const searchQuery = ref("");
const statusFilter = ref("all");
const isLoading = ref(true);

// New vendor form
const newVendor = ref({
  vendorName: "",
  email: "",
  phoneNumber: "",
  password: "",
});

// Status options
const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

// Computed properties - Filter only approved vendors and apply search/filter
const filteredVendors = computed(() => {
  let vendors = vendorList.value.filter(
    (vendor) => vendor.status === "approved"
  );

  return vendors.filter((vendor) => {
    const matchesSearch =
      vendor.vendorName
        ?.toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      vendor.email?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      vendor.shop?.[0]?.shopName
        ?.toLowerCase()
        .includes(searchQuery.value.toLowerCase());
    const matchesStatus =
      statusFilter.value === "all" ||
      vendor.isActiveStatus === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});

// Stats computation
const stats = computed(() => {
  const approvedVendors = vendorList.value.filter(
    (v) => v.status === "approved"
  );
  const totalVendors = approvedVendors.length;
  const activeVendors = approvedVendors.filter(
    (v) => v.isActiveStatus === "active"
  ).length;
  const vendorsWithShop = approvedVendors.filter(
    (v) => v.shop && v.shop.length > 0
  ).length;

  // Static data for demo
  const totalRevenue = 125000;
  const avgRating = 4.2;

  return {
    totalVendors,
    activeVendors,
    totalRevenue,
    avgRating,
    vendorsWithShop,
  };
});

// Methods
const getVendors = async () => {
  try {
    isLoading.value = true;
    const response = await sendRequest({
      method: "get",
      url: "/v1/vendorApproval",
    });
    vendorList.value = response?.data?.data || [];
  } catch (err) {
    toast.error("Failed to fetch vendors.");
  } finally {
    isLoading.value = false;
  }
};

// Modal handlers
const openViewModal = (vendor) => {
  selectedVendor.value = vendor;
  isViewModalOpen.value = true;
};

const openEditModal = (vendor) => {
  selectedVendor.value = { ...vendor };
  isEditModalOpen.value = true;
};

const openDeleteModal = (vendor) => {
  selectedVendor.value = vendor;
  isDeleteModalOpen.value = true;
};

const openAddModal = () => {
  // Reset form
  newVendor.value = {
    vendorName: "",
    email: "",
    phoneNumber: "",
    password: "",
  };
  isAddModalOpen.value = true;
};

// Vendor actions
const addVendor = async () => {
  try {
    await sendRequest({
      method: "post",
      url: "/v1/vendorApproval",
      data: {
        ...newVendor.value,
      },
    });
    await getVendors();
    isAddModalOpen.value = false;
    toast.success("Vendor added successfully");
  } catch (err) {
    toast.error("Failed to add vendor");
  }
};

const saveVendor = async () => {
  if (selectedVendor.value) {
    try {
      await sendRequest({
        method: "put",
        url: `/v1/vendorApproval/${selectedVendor.value.id}`,
        data: selectedVendor.value,
      });
      await getVendors();
      isEditModalOpen.value = false;
      toast.success("Vendor updated successfully");
    } catch (err) {
      toast.error("Failed to update vendor");
    }
  }
};

const deleteVendor = async () => {
  if (selectedVendor.value) {
    try {
      await sendRequest({
        method: "delete",
        url: `/v1/vendorApproval/${selectedVendor.value.id}`,
      });
      await getVendors();
      isDeleteModalOpen.value = false;
      toast.success("Vendor deleted successfully");
    } catch (err) {
      toast.error("Failed to delete vendor");
    }
  }
};

const toggleVendorStatus = async (vendor) => {
  try {
    const newStatus =
      vendor.isActiveStatus === "active" ? "inactive" : "active";
    await sendRequest({
      method: "put",
      url: `/v1/vendorStatusUpdate/${vendor.id}`,
      data: { ...vendor, isActiveStatus: newStatus },
    });
    await getVendors();
    toast.success(
      `Vendor ${newStatus === "active" ? "activated" : "deactivated"}`
    );
  } catch (err) {
    toast.error("Failed to update vendor status");
  }
};

// Utility functions
const getStatusClass = (status) => {
  const classes = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-red-100 text-red-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const getStatusText = (status) => {
  const texts = {
    active: "Active",
    inactive: "Inactive",
  };
  return texts[status] || status;
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount || 0);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Initialize
onMounted(() => {
  getVendors();
});
</script>

<template>
  <div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div
        class="rounded-xl shadow-lg p-6 border-0 bg-gradient-to-br from-blue-500/10 to-blue-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold text-blue-600/80">Total Vendors</p>
            <p class="text-3xl font-bold text-blue-900">
              {{ stats.totalVendors }}
            </p>
          </div>
          <div class="p-3 rounded-xl bg-blue-500/20 text-blue-600">
            <Icon name="heroicons:user-group" class="text-2xl" />
          </div>
        </div>
      </div>

      <div
        class="rounded-xl shadow-lg p-6 border-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold text-emerald-600/80">
              Active Vendors
            </p>
            <p class="text-3xl font-bold text-emerald-900">
              {{ stats.activeVendors }}
            </p>
          </div>
          <div class="p-3 rounded-xl bg-emerald-500/20 text-emerald-600">
            <Icon name="heroicons:check-badge" class="text-2xl" />
          </div>
        </div>
      </div>

      <div
        class="rounded-xl shadow-lg p-6 border-0 bg-gradient-to-br from-purple-500/10 to-purple-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold text-purple-600/80">
              Shops Created
            </p>
            <p class="text-3xl font-bold text-purple-900">
              {{ stats.vendorsWithShop }}
            </p>
          </div>
          <div class="p-3 rounded-xl bg-purple-500/20 text-purple-600">
            <Icon name="heroicons:building-storefront" class="text-2xl" />
          </div>
        </div>
      </div>

      <div
        class="rounded-xl shadow-lg p-6 border-0 bg-gradient-to-br from-yellow-500/10 to-yellow-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold text-yellow-600/80">Avg Rating</p>
            <p class="text-3xl font-bold text-yellow-900">
              {{ stats.avgRating }}
            </p>
          </div>
          <div class="p-3 rounded-xl bg-yellow-500/20 text-yellow-600">
            <Icon name="heroicons:star" class="text-2xl" />
          </div>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
    >
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Vendor Management</h2>
        <p class="text-sm text-gray-600 mt-1">
          Manage approved vendor relationships and shops
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <Icon
              name="heroicons:magnifying-glass"
              class="h-4 w-4 text-gray-400"
            />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search vendors or shops..."
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full sm:w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <select
          v-model="statusFilter"
          class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option
            v-for="option in statusOptions"
            :value="option.value"
            :key="option.value"
          >
            {{ option.label }}
          </option>
        </select>

        <!-- Add Vendor Button -->
        <button
          @click="openAddModal"
          class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium transition flex items-center gap-2 hover:bg-primary/90"
        >
          <Icon name="heroicons:plus" class="h-4 w-4" />
          Add Vendor
        </button>
      </div>
    </div>

    <!-- Vendors Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <h3 class="font-semibold text-gray-900 text-lg">
          Approved Vendors ({{ filteredVendors.length }})
        </h3>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="p-8 text-center">
        <div class="inline-flex items-center justify-center">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
          ></div>
          <span class="ml-3 text-gray-600">Loading vendors...</span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredVendors.length === 0" class="p-8 text-center">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4"
        >
          <Icon name="heroicons:user-group" class="h-8 w-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-1">
          No approved vendors found
        </h3>
        <p class="text-gray-500">
          Try adjusting your search or filter criteria
        </p>
      </div>

      <!-- Vendors List -->
      <div v-else class="overflow-x-auto">
        <table class="w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Vendor
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Shop Info
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contact
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Vendor Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="vendor in filteredVendors" :key="vendor.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center"
                  >
                    <Icon name="heroicons:user" class="h-5 w-5 text-blue-600" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ vendor.vendorName }}
                    </div>
                    <div class="text-sm text-gray-500">
                      License: {{ vendor.licenseNumber }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div v-if="vendor.shop && vendor.shop.length > 0">
                  <div class="text-sm font-medium text-gray-900">
                    {{ vendor.shop[0].shopName }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ vendor.shop[0].vendor_type }}
                  </div>
                </div>
                <div v-else class="text-sm text-gray-500 italic">
                  No shop created
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>{{ vendor.email }}</div>
                <div class="text-gray-500">{{ vendor.phoneNumber }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getStatusClass(vendor.isActiveStatus)"
                >
                  {{ getStatusText(vendor.isActiveStatus) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center gap-2">
                  <button
                    @click="openViewModal(vendor)"
                    class="text-blue-600 hover:text-blue-800 p-1.5 rounded-md hover:bg-blue-50 transition-colors"
                    title="View Details"
                  >
                    <Icon name="heroicons:eye" class="h-4 w-4" />
                  </button>
                  <button
                    @click="openEditModal(vendor)"
                    class="text-green-600 hover:text-green-800 p-1.5 rounded-md hover:bg-green-50 transition-colors"
                    title="Edit Vendor"
                  >
                    <Icon name="heroicons:pencil-square" class="h-4 w-4" />
                  </button>

                  <button
                    @click="toggleVendorStatus(vendor)"
                    class="p-1.5 rounded-md transition-colors"
                    :class="
                      vendor.isActiveStatus === 'active'
                        ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50'
                        : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                    "
                    :title="
                      vendor.isActiveStatus === 'active'
                        ? 'Deactivate Vendor'
                        : 'Activate Vendor'
                    "
                  >
                    <Icon
                      :name="
                        vendor.isActiveStatus === 'active'
                          ? 'heroicons:eye-slash'
                          : 'heroicons:eye'
                      "
                      class="h-4 w-4"
                    />
                  </button>
                  <button
                    @click="openDeleteModal(vendor)"
                    class="text-red-600 hover:text-red-800 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                    title="Delete Vendor"
                  >
                    <Icon name="heroicons:trash" class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Vendor Modal -->
    <Modal2
      title="Add New Vendor"
      :isOpen="isAddModalOpen"
      @modal-close="isAddModalOpen = false"
      size="md"
    >
      <div class="py-4">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Vendor Name</label
            >
            <input
              v-model="newVendor.vendorName"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter vendor name"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Email</label
            >
            <input
              v-model="newVendor.email"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Phone Number</label
            >
            <input
              v-model="newVendor.phoneNumber"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Password</label
            >
            <div class="relative">
              <input
                v-model="newVendor.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter password"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <Icon
                  :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'"
                  class="h-4 w-4"
                />
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-6 mt-4 border-t border-gray-200">
          <button
            @click="isAddModalOpen = false"
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            @click="addVendor"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Add Vendor
          </button>
        </div>
      </div>
    </Modal2>

    <!-- View Modal -->
    <Modal2
      title="Vendor Details"
      :isOpen="isViewModalOpen"
      @modal-close="isViewModalOpen = false"
      size="lg"
    >
      <div class="py-4" v-if="selectedVendor">
        <div
          class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-5 text-white mb-6"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                class="flex-shrink-0 h-12 w-12 bg-white rounded-lg flex items-center justify-center"
              >
                <Icon name="heroicons:user" class="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 class="text-xl font-bold">
                  {{ selectedVendor.vendorName }}
                </h2>
                <p class="text-blue-100 opacity-90">
                  License: {{ selectedVendor.licenseNumber }}
                </p>
              </div>
            </div>
            <span
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20"
            >
              {{ getStatusText(selectedVendor.isActiveStatus) }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Vendor Information -->
          <div class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-900">
              Vendor Information
            </h3>
            <div class="space-y-4">
              <div class="flex items-center">
                <Icon
                  name="heroicons:envelope"
                  class="h-5 w-5 text-gray-400 mr-3"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ selectedVendor.email }}
                  </p>
                  <p class="text-xs text-gray-500">Email</p>
                </div>
              </div>
              <div class="flex items-center">
                <Icon
                  name="heroicons:phone"
                  class="h-5 w-5 text-gray-400 mr-3"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ selectedVendor.phoneNumber }}
                  </p>
                  <p class="text-xs text-gray-500">Phone</p>
                </div>
              </div>
              <div class="flex items-center">
                <Icon
                  name="heroicons:document-text"
                  class="h-5 w-5 text-gray-400 mr-3"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ selectedVendor.licenseNumber }}
                  </p>
                  <p class="text-xs text-gray-500">License Number</p>
                </div>
              </div>
              <div class="flex items-center">
                <Icon
                  name="heroicons:identification"
                  class="h-5 w-5 text-gray-400 mr-3"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ selectedVendor.nid }}
                  </p>
                  <p class="text-xs text-gray-500">National ID</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Shop Information -->
          <div class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-900">
              Shop Information
            </h3>
            <div v-if="selectedVendor.shop && selectedVendor.shop.length > 0">
              <div class="space-y-4">
                <div class="flex items-center">
                  <Icon
                    name="heroicons:building-storefront"
                    class="h-5 w-5 text-gray-400 mr-3"
                  />
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ selectedVendor.shop[0].shopName }}
                    </p>
                    <p class="text-xs text-gray-500">Shop Name</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <Icon
                    name="heroicons:tag"
                    class="h-5 w-5 text-gray-400 mr-3"
                  />
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ selectedVendor.shop[0].vendor_type }}
                    </p>
                    <p class="text-xs text-gray-500">Vendor Type</p>
                  </div>
                </div>
                <div class="flex items-center">
                  <Icon
                    name="heroicons:chart-bar"
                    class="h-5 w-5 text-gray-400 mr-3"
                  />
                  <div>
                    <p class="text-sm font-medium text-gray-900">
                      {{ getStatusText(selectedVendor.shop[0].status) }}
                    </p>
                    <p class="text-xs text-gray-500">Shop Status</p>
                  </div>
                </div>
                <div v-if="selectedVendor.shop[0].image_url" class="mt-4">
                  <p class="text-sm font-medium text-gray-900 mb-2">
                    Shop Images
                  </p>
                  <div class="flex gap-2">
                    <img
                      :src="selectedVendor.shop[0].image_url"
                      alt="Shop"
                      class="h-20 w-20 object-cover rounded-lg border"
                    />
                    <img
                      v-if="selectedVendor.shop[0].cvrimage_url"
                      :src="selectedVendor.shop[0].cvrimage_url"
                      alt="CVR"
                      class="h-20 w-20 object-cover rounded-lg border"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              <Icon
                name="heroicons:building-storefront"
                class="h-12 w-12 mx-auto text-gray-300 mb-2"
              />
              <p>No shop created yet</p>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-gray-200">
          <div class="flex justify-center">
            <button
              @click="isViewModalOpen = false"
              class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal2>

    <!-- Edit Modal -->
    <Modal2
      title="Edit Vendor"
      :isOpen="isEditModalOpen"
      @modal-close="isEditModalOpen = false"
      size="md"
    >
      <div class="py-4" v-if="selectedVendor">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Vendor Name</label
            >
            <input
              v-model="selectedVendor.vendorName"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Email</label
            >
            <input
              v-model="selectedVendor.email"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Phone Number</label
            >
            <input
              v-model="selectedVendor.phoneNumber"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Password</label
            >
            <div class="relative">
              <input
                v-model="selectedVendor.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter password"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <Icon
                  :name="showPassword ? 'heroicons:eye-slash' : 'heroicons:eye'"
                  class="h-4 w-4"
                />
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-6 mt-4 border-t border-gray-200">
          <button
            @click="isEditModalOpen = false"
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            @click="saveVendor"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal2>

    <!-- Delete Modal -->
    <Modal2
      title="Delete Vendor"
      :isOpen="isDeleteModalOpen"
      @modal-close="isDeleteModalOpen = false"
    >
      <div class="py-4" v-if="selectedVendor">
        <p class="text-gray-600 mb-4">
          Are you sure you want to delete
          <span class="font-semibold">{{ selectedVendor.vendorName }}</span
          >? This action cannot be undone.
        </p>

        <div class="bg-red-50 p-4 rounded-lg mb-4">
          <p class="text-sm text-red-700">
            All vendor data, shop information, and associated records will be
            permanently removed from the system.
          </p>
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button
            @click="isDeleteModalOpen = false"
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            @click="deleteVendor"
            class="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
          >
            Delete Vendor
          </button>
        </div>
      </div>
    </Modal2>
  </div>
</template>
