<script setup>
import { ref, onMounted, computed } from "vue";
import Modal from "@/components/Modal.vue";
import Modal2 from "@/components/Modal2.vue";
// Vendor data
const vendors = ref([]);
const selectedVendor = ref(null);
const isViewModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const searchQuery = ref("");
const statusFilter = ref("all");
const isLoading = ref(true);

// Status options
const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

// Mock data - in a real app, this would come from an API
const mockVendors = [
  {
    id: 1,
    name: "TechGadgets Inc.",
    email: "contact@techgadgets.com",
    phone: "+1 (555) 123-4567",
    businessType: "Electronics Supplier",
    status: "active",
    joinDate: "2023-10-15",
    totalOrders: 156,
    totalRevenue: 45800,
    rating: 4.8,
    address: "123 Tech Street, San Francisco, CA 94103",
    contactPerson: "John Smith",
    paymentTerms: "Net 30",
    products: ["Smartphones", "Laptops", "Accessories"],
  },
  {
    id: 2,
    name: "FashionTrends LLC",
    email: "info@fashiontrends.com",
    phone: "+1 (555) 987-6543",
    businessType: "Clothing Manufacturer",
    status: "active",
    joinDate: "2023-10-10",
    totalOrders: 289,
    totalRevenue: 28950,
    rating: 4.5,
    address: "456 Fashion Ave, New York, NY 10001",
    contactPerson: "Sarah Johnson",
    paymentTerms: "Net 15",
    products: ["Clothing", "Accessories", "Footwear"],
  },
  {
    id: 3,
    name: "HomeEssentials Corp",
    email: "support@homeessentials.com",
    phone: "+1 (555) 456-7890",
    businessType: "Home Goods Supplier",
    status: "inactive",
    joinDate: "2023-10-05",
    totalOrders: 87,
    totalRevenue: 18750,
    rating: 4.2,
    address: "789 Home Lane, Chicago, IL 60601",
    contactPerson: "Michael Brown",
    paymentTerms: "Net 30",
    products: ["Kitchenware", "Decor", "Furniture"],
  },
  {
    id: 4,
    name: "SportGear Suppliers",
    email: "sales@sportgear.com",
    phone: "+1 (555) 234-5678",
    businessType: "Sports Equipment",
    status: "active",
    joinDate: "2023-10-18",
    totalOrders: 134,
    totalRevenue: 15600,
    rating: 4.7,
    address: "321 Athletic Blvd, Denver, CO 80202",
    contactPerson: "Emily Davis",
    paymentTerms: "Net 15",
    products: ["Fitness Equipment", "Outdoor Gear", "Sportswear"],
  },
  {
    id: 5,
    name: "OrganicFoods Direct",
    email: "orders@organicfoods.com",
    phone: "+1 (555) 876-5432",
    businessType: "Food Supplier",
    status: "pending",
    joinDate: "2023-10-12",
    totalOrders: 0,
    totalRevenue: 0,
    rating: 0,
    address: "654 Green Street, Portland, OR 97205",
    contactPerson: "Robert Wilson",
    paymentTerms: "Net 30",
    products: ["Organic Produce", "Natural Foods", "Supplements"],
  },
];

// Fetch vendors (simulated API call)
const fetchVendors = () => {
  isLoading.value = true;
  setTimeout(() => {
    vendors.value = mockVendors;
    isLoading.value = false;
  }, 800);
};

// Filtered vendors based on search and status filter
const filteredVendors = computed(() => {
  return vendors.value.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      vendor.businessType
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());

    const matchesStatus =
      statusFilter.value === "all" || vendor.status === statusFilter.value;

    return matchesSearch && matchesStatus;
  });
});

// Open view modal
const openViewModal = (vendor) => {
  selectedVendor.value = vendor;
  isViewModalOpen.value = true;
};

// Open edit modal
const openEditModal = (vendor) => {
  selectedVendor.value = { ...vendor };
  isEditModalOpen.value = true;
};

// Open delete modal
const openDeleteModal = (vendor) => {
  selectedVendor.value = vendor;
  isDeleteModalOpen.value = true;
};

// Save vendor changes
const saveVendor = () => {
  if (selectedVendor.value) {
    const index = vendors.value.findIndex(
      (v) => v.id === selectedVendor.value.id
    );
    if (index !== -1) {
      vendors.value[index] = { ...selectedVendor.value };
      // In a real app, you would make an API call here
    }
    isEditModalOpen.value = false;
  }
};

// Delete vendor
const deleteVendor = () => {
  if (selectedVendor.value) {
    vendors.value = vendors.value.filter(
      (v) => v.id !== selectedVendor.value.id
    );
    // In a real app, you would make an API call here
    isDeleteModalOpen.value = false;
  }
};

// Toggle vendor status
const toggleVendorStatus = (vendor) => {
  const index = vendors.value.findIndex((v) => v.id === vendor.id);
  if (index !== -1) {
    vendors.value[index].status =
      vendors.value[index].status === "active" ? "inactive" : "active";
    // In a real app, you would make an API call here
  }
};

// Get status badge class
const getStatusClass = (status) => {
  const classes = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

// Get status text
const getStatusText = (status) => {
  const texts = {
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
  };
  return texts[status] || status;
};

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Initialize component
onMounted(() => {
  fetchVendors();
});
</script>

<template>
  <div>
    <!-- Stats Cards -->

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Total Warehouses -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-blue-500/10 to-blue-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-blue-600/80"
            >
              Total Vendors
            </p>
            <p class="text-3xl font-bold text-blue-900">
              {{ vendors.length }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-blue-500/20 text-blue-600">
            <Icon name="heroicons:user-group" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Total Capacity -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-emerald-500/10 to-emerald-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-emerald-600/80"
            >
              Active Vendors
            </p>
            <p class="text-3xl font-bold text-emerald-900">
              {{ vendors.filter((v) => v.status === "active").length }}
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-emerald-500/20 text-emerald-600"
          >
            <Icon name="heroicons:check-badge" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Outgoing Shipments -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-sky-500/10 to-sky-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-sky-600/80"
            >
              Total Revenue
            </p>
            <p class="text-3xl font-bold text-sky-900">
              {{
                formatCurrency(
                  vendors.reduce((sum, vendor) => sum + vendor.totalRevenue, 0)
                )
              }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-sky-500/20 text-sky-600">
            <Icon name="tabler:coin-taka" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Outgoing Shipments -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-yellow-500/10 to-yellow-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-yellow-600/80"
            >
              Avg Rating
            </p>
            <p class="text-3xl font-bold text-yellow-900">
              {{
                (
                  vendors
                    .filter((v) => v.rating > 0)
                    .reduce((sum, vendor) => sum + vendor.rating, 0) /
                    vendors.filter((v) => v.rating > 0).length || 0
                ).toFixed(1)
              }}
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-yellow-500/20 text-yellow-600"
          >
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
          Manage your vendor relationships and performance
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <!-- Search -->
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
            placeholder="Search vendors..."
            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full sm:w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <!-- Status Filter -->
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
          class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium transition flex items-center gap-2"
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
          Vendor List ({{ filteredVendors.length }})
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
        <h3 class="text-lg font-medium text-gray-900 mb-1">No vendors found</h3>
        <p class="text-gray-500">
          Try adjusting your search or filter criteria
        </p>
      </div>

      <!-- Vendors List -->
      <div v-else class="overflow-x-auto">
        <table class="w-full divide-y divide-gray-200">
          <thead class="bg-green-100">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Vendor
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Business Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Orders
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Revenue
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Rating
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
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
                    <Icon
                      name="heroicons:building-storefront"
                      class="h-5 w-5 text-blue-600"
                    />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ vendor.name }}
                    </div>
                    <div class="text-sm text-gray-500">{{ vendor.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ vendor.businessType }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ vendor.totalOrders }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(vendor.totalRevenue) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <Icon name="heroicons:star" class="h-4 w-4 text-yellow-400" />
                  <span class="ml-1 text-sm font-medium text-gray-900">{{
                    vendor.rating || "-"
                  }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getStatusClass(vendor.status)"
                >
                  {{ getStatusText(vendor.status) }}
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
                      vendor.status === 'active'
                        ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50'
                        : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                    "
                    :title="
                      vendor.status === 'active' ? 'Deactivate' : 'Activate'
                    "
                  >
                    <Icon
                      :name="
                        vendor.status === 'active'
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

      <!-- Pagination -->
      <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing <span class="font-medium">1</span> to
            <span class="font-medium">{{ filteredVendors.length }}</span> of
            <span class="font-medium">{{ filteredVendors.length }}</span>
            results
          </div>
          <div class="flex items-center gap-2">
            <button
              class="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Previous
            </button>
            <button
              class="px-3 py-1.5 bg-primary text-white rounded-md text-sm"
            >
              1
            </button>
            <button
              class="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <Modal
      title="Vendor Details"
      :isOpen="isViewModalOpen"
      @modal-close="isViewModalOpen = false"
      size="lg"
    >
      <div class="py-4" v-if="selectedVendor">
        <!-- Header with gradient background -->
        <div
          class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-5 mx-5 text-white"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-between gap-2">
              <div
                class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center"
              >
                <Icon
                  name="heroicons:building-storefront"
                  class="h-5 w-5 text-blue-600"
                />
              </div>
              <div>
                <h2 class="text-xl font-bold">{{ selectedVendor.name }}</h2>
                <p class="text-blue-100 opacity-90">
                  {{ selectedVendor.businessType }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm"
              >
                <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
                Joined {{ formatDate(selectedVendor.joinDate) }}
              </span>
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                :class="
                  selectedVendor.status === 'active'
                    ? 'bg-green-500/20'
                    : selectedVendor.status === 'inactive'
                    ? 'bg-red-500/20'
                    : 'bg-yellow-500/20'
                "
              >
                <Icon
                  :name="
                    selectedVendor.status === 'active'
                      ? 'heroicons:check-badge'
                      : selectedVendor.status === 'inactive'
                      ? 'heroicons:x-circle'
                      : 'heroicons:clock'
                  "
                  class="w-4 h-4 mr-1"
                />
                {{ getStatusText(selectedVendor.status) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Main content grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <!-- Contact Information -->
          <div
            class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <h3
              class="text-sm font-semibold text-gray-700 mb-4 flex items-center"
            >
              <Icon
                name="heroicons:envelope"
                class="w-4 h-4 mr-2 text-blue-500"
              />
              Contact Information
            </h3>
            <div class="space-y-3">
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3"
                >
                  <Icon
                    name="heroicons:envelope"
                    class="w-4 h-4 text-blue-600"
                  />
                </div>
                <div>
                  <p class="text-xs text-gray-500">Email</p>
                  <p class="text-sm font-medium text-gray-900">
                    {{ selectedVendor.email }}
                  </p>
                </div>
              </div>
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3"
                >
                  <Icon name="heroicons:phone" class="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p class="text-xs text-gray-500">Phone</p>
                  <p class="text-sm font-medium text-gray-900">
                    {{ selectedVendor.phone }}
                  </p>
                </div>
              </div>
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3"
                >
                  <Icon name="heroicons:user" class="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p class="text-xs text-gray-500">Contact Person</p>
                  <p class="text-sm font-medium text-gray-900">
                    {{ selectedVendor.contactPerson }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Business Details -->
          <div
            class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <h3
              class="text-sm font-semibold text-gray-700 mb-4 flex items-center"
            >
              <Icon
                name="heroicons:building-office"
                class="w-4 h-4 mr-2 text-purple-500"
              />
              Business Details
            </h3>
            <div class="space-y-3">
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3"
                >
                  <Icon
                    name="heroicons:document-text"
                    class="w-4 h-4 text-orange-600"
                  />
                </div>
                <div>
                  <p class="text-xs text-gray-500">Payment Terms</p>
                  <p class="text-sm font-medium text-gray-900">
                    {{ selectedVendor.paymentTerms }}
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <div
                  class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3 mt-1"
                >
                  <Icon name="heroicons:map-pin" class="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p class="text-xs text-gray-500">Address</p>
                  <p class="text-sm font-medium text-gray-900">
                    {{ selectedVendor.address }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Products Section -->
        <div
          class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6"
        >
          <h3
            class="text-sm font-semibold text-gray-700 mb-4 flex items-center"
          >
            <Icon name="heroicons:cube" class="w-4 h-4 mr-2 text-green-500" />
            Product Categories
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(product, index) in selectedVendor.products"
              :key="index"
              class="px-3 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl text-sm font-medium border border-blue-200/50 shadow-sm hover:shadow-md transition-shadow"
            >
              {{ product }}
            </span>
          </div>
        </div>

        <!-- Performance Metrics -->
        <div
          class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 shadow-sm border border-gray-100"
        >
          <h3
            class="text-sm font-semibold text-gray-700 mb-4 flex items-center"
          >
            <Icon
              name="heroicons:chart-bar"
              class="w-4 h-4 mr-2 text-indigo-500"
            />
            Performance Metrics
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
            >
              <div class="flex items-center justify-between mb-2">
                <p class="text-xs font-medium text-gray-500">Total Orders</p>
                <Icon
                  name="heroicons:shopping-bag"
                  class="w-4 h-4 text-blue-500"
                />
              </div>
              <p class="text-2xl font-bold text-gray-900">
                {{ selectedVendor.totalOrders }}
              </p>
              <div class="flex items-center mt-1">
                <Icon
                  name="heroicons:arrow-trending-up"
                  class="w-4 h-4 text-green-500 mr-1"
                />
                <span class="text-xs text-green-600 font-medium">+12.5%</span>
              </div>
            </div>

            <div
              class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
            >
              <div class="flex items-center justify-between mb-2">
                <p class="text-xs font-medium text-gray-500">Total Revenue</p>
                <Icon
                  name="heroicons:currency-dollar"
                  class="w-4 h-4 text-green-500"
                />
              </div>
              <p class="text-2xl font-bold text-gray-900">
                {{ formatCurrency(selectedVendor.totalRevenue) }}
              </p>
              <div class="flex items-center mt-1">
                <Icon
                  name="heroicons:arrow-trending-up"
                  class="w-4 h-4 text-green-500 mr-1"
                />
                <span class="text-xs text-green-600 font-medium">+8.2%</span>
              </div>
            </div>

            <div
              class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
            >
              <div class="flex items-center justify-between mb-2">
                <p class="text-xs font-medium text-gray-500">Customer Rating</p>
                <Icon name="heroicons:star" class="w-4 h-4 text-yellow-500" />
              </div>
              <div class="flex items-center">
                <p class="text-2xl font-bold text-gray-900">
                  {{ selectedVendor.rating || "N/A" }}
                </p>
                <div class="ml-2 flex">
                  <Icon
                    v-for="i in 5"
                    :key="i"
                    name="heroicons:star"
                    :class="
                      i <= Math.floor(selectedVendor.rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    "
                    class="w-4 h-4"
                  />
                </div>
              </div>
              <div class="text-xs text-gray-500 mt-1">Based on 156 reviews</div>
            </div>
          </div>
        </div>

        <!-- Close Button -->
        <div class="flex justify-center pt-6 mt-6">
          <button
            @click="isViewModalOpen = false"
            class="p-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md hover:from-rose-600 hover:to-rose-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
          >
            <Icon
              name="material-symbols:close-rounded"
              class="text-white text-2xl group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </Modal>

    <!-- Edit Modal -->
    <Modal
      title="Edit Vendor"
      :isOpen="isEditModalOpen"
      @modal-close="isEditModalOpen = false"
      size="lg"
    >
      <div class="py-4" v-if="selectedVendor">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Vendor Name</label
            >
            <input
              v-model="selectedVendor.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Business Type</label
            >
            <input
              v-model="selectedVendor.businessType"
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
              >Phone</label
            >
            <input
              v-model="selectedVendor.phone"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Contact Person</label
            >
            <input
              v-model="selectedVendor.contactPerson"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Payment Terms</label
            >
            <select
              v-model="selectedVendor.paymentTerms"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option>Net 15</option>
              <option>Net 30</option>
              <option>Net 45</option>
              <option>Net 60</option>
            </select>
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Address</label
            >
            <textarea
              v-model="selectedVendor.address"
              rows="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Status</label
            >
            <select
              v-model="selectedVendor.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-6 mt-4 border-t border-gray-200">
          <button
            @click="isEditModalOpen = false"
            class="p-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md hover:from-rose-600 hover:to-rose-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
          >
            <Icon
              name="material-symbols:close-rounded"
              class="text-white text-2xl group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
          <button
            @click="saveVendor"
            class="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>

    <!-- Delete Modal -->
    <Modal2
      title="Delete Vendor"
      :isOpen="isDeleteModalOpen"
      @modal-close="isDeleteModalOpen = false"
    >
      <div class="py-4" v-if="selectedVendor">
        <p class="text-gray-600 mb-4">
          Are you sure you want to delete
          <span class="font-semibold">{{ selectedVendor.name }}</span
          >? This action cannot be undone.
        </p>

        <div class="bg-red-50 p-4 rounded-lg mb-4">
          <p class="text-sm text-red-700">
            All vendor data, order history, and associated records will be
            permanently removed from the system.
          </p>
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button
            @click="isDeleteModalOpen = false"
            class="p-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md hover:from-rose-600 hover:to-rose-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
          >
            <Icon
              name="material-symbols:close-rounded"
              class="text-white text-2xl group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
          <button
            @click="deleteVendor"
            class="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Delete Vendor
          </button>
        </div>
      </div>
    </Modal2>
  </div>
</template>
