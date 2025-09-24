<script setup>
import Modal from "@/components/Modal.vue";
import Modal2 from "@/components/Modal2.vue";
import { ref, onMounted, computed } from "vue";

// Vendor approval data
const vendors = ref([]);
const selectedVendor = ref(null);
const isApprovalModalOpen = ref(false);
const isRejectionModalOpen = ref(false);
const rejectionReason = ref("");
const searchQuery = ref("");
const statusFilter = ref("all");
const isLoading = ref(true);

// Status options
const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

// Mock data - in a real app, this would come from an API
const mockVendors = [
  {
    id: 1,
    name: "TechGadgets Inc.",
    email: "contact@techgadgets.com",
    phone: "+1 (555) 123-4567",
    businessType: "Electronics Supplier",
    registrationDate: "2023-10-15",
    status: "pending",
    documents: ["business_license.pdf", "tax_certificate.pdf"],
    address: "123 Tech Street, San Francisco, CA 94103",
  },
  {
    id: 2,
    name: "FashionTrends LLC",
    email: "info@fashiontrends.com",
    phone: "+1 (555) 987-6543",
    businessType: "Clothing Manufacturer",
    registrationDate: "2023-10-10",
    status: "approved",
    documents: ["business_license.pdf", "quality_certificate.pdf"],
    address: "456 Fashion Ave, New York, NY 10001",
  },
  {
    id: 3,
    name: "HomeEssentials Corp",
    email: "support@homeessentials.com",
    phone: "+1 (555) 456-7890",
    businessType: "Home Goods Supplier",
    registrationDate: "2023-10-05",
    status: "rejected",
    documents: ["business_license.pdf"],
    address: "789 Home Lane, Chicago, IL 60601",
    rejectionReason: "Incomplete documentation provided",
  },
  {
    id: 4,
    name: "SportGear Suppliers",
    email: "sales@sportgear.com",
    phone: "+1 (555) 234-5678",
    businessType: "Sports Equipment",
    registrationDate: "2023-10-18",
    status: "pending",
    documents: ["business_license.pdf", "safety_certificate.pdf"],
    address: "321 Athletic Blvd, Denver, CO 80202",
  },
  {
    id: 5,
    name: "OrganicFoods Direct",
    email: "orders@organicfoods.com",
    phone: "+1 (555) 876-5432",
    businessType: "Food Supplier",
    registrationDate: "2023-10-12",
    status: "pending",
    documents: [
      "business_license.pdf",
      "organic_certificate.pdf",
      "health_permit.pdf",
    ],
    address: "654 Green Street, Portland, OR 97205",
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

// Open approval modal
const openApprovalModal = (vendor) => {
  selectedVendor.value = vendor;
  isApprovalModalOpen.value = true;
};

// Open rejection modal
const openRejectionModal = (vendor) => {
  selectedVendor.value = vendor;
  rejectionReason.value = "";
  isRejectionModalOpen.value = true;
};

// Approve vendor
const approveVendor = () => {
  if (selectedVendor.value) {
    const index = vendors.value.findIndex(
      (v) => v.id === selectedVendor.value.id
    );
    if (index !== -1) {
      vendors.value[index].status = "approved";
      // In a real app, you would make an API call here
    }
    isApprovalModalOpen.value = false;
  }
};

// Reject vendor
const rejectVendor = () => {
  if (selectedVendor.value && rejectionReason.value.trim()) {
    const index = vendors.value.findIndex(
      (v) => v.id === selectedVendor.value.id
    );
    if (index !== -1) {
      vendors.value[index].status = "rejected";
      vendors.value[index].rejectionReason = rejectionReason.value;
      // In a real app, you would make an API call here
    }
    isRejectionModalOpen.value = false;
  }
};

// Get status badge class
const getStatusClass = (status) => {
  const classes = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

// Get status text
const getStatusText = (status) => {
  const texts = {
    pending: "Pending Review",
    approved: "Approved",
    rejected: "Rejected",
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

// Initialize component
onMounted(() => {
  fetchVendors();
});
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <!-- Total Warehouses -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-blue-500/10 to-blue-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-blue-600/80"
            >
              Pending Review
            </p>
            <p class="text-3xl font-bold text-blue-900">
              {{ vendors.filter((v) => v.status === "pending").length }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-blue-500/20 text-blue-600">
            <Icon name="heroicons:clock" class="text-2xl" />
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
              Approved Vendors
            </p>
            <p class="text-3xl font-bold text-emerald-900">
              {{ vendors.filter((v) => v.status === "approved").length }}
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
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-red-500/10 to-red-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-red-600/80"
            >
              Rejected Vendors
            </p>
            <p class="text-3xl font-bold text-red-900">
              {{ vendors.filter((v) => v.status === "rejected").length }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-red-500/20 text-red-600">
            <Icon name="heroicons:x-circle" class="text-2xl" />
          </div>
        </div>
      </div>
    </div>
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
    >
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Vendor Approvals</h2>
        <p class="text-sm text-gray-600 mt-1">
          Manage and review vendor applications
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
      </div>
    </div>

    <!-- Vendors Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <h3 class="font-semibold text-gray-900 text-lg">
          Vendor Applications ({{ filteredVendors.length }})
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
          <thead class="bg-blue-100">
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
                Registration Date
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
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(vendor.registrationDate) }}
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
                    @click="openApprovalModal(vendor)"
                    class="text-green-600 hover:text-green-800 p-1.5 rounded-md hover:bg-green-50 transition-colors"
                    :disabled="vendor.status !== 'pending'"
                    :class="{
                      'opacity-50 cursor-not-allowed':
                        vendor.status !== 'pending',
                    }"
                  >
                    <Icon name="heroicons:check" class="h-4 w-4" />
                  </button>
                  <button
                    @click="openRejectionModal(vendor)"
                    class="text-red-600 hover:text-red-800 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                    :disabled="vendor.status !== 'pending'"
                    :class="{
                      'opacity-50 cursor-not-allowed':
                        vendor.status !== 'pending',
                    }"
                  >
                    <Icon name="heroicons:x-mark" class="h-4 w-4" />
                  </button>
                  <button
                    class="text-blue-600 hover:text-blue-800 p-1.5 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <Icon name="heroicons:eye" class="h-4 w-4" />
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
              class="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm"
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

    <!-- Approval Modal -->
    <Modal2
      title="Approve Vendor"
      :isOpen="isApprovalModalOpen"
      @modal-close="isApprovalModalOpen = false"
    >
      <div class="py-4">
        <p class="text-gray-600 mb-4">
          Are you sure you want to approve
          <span class="font-semibold">{{ selectedVendor?.name }}</span> as a
          vendor?
        </p>
        <div class="bg-blue-50 p-4 rounded-lg mb-4">
          <p class="text-sm text-blue-700">
            This action will grant them full access to the vendor portal and
            allow them to submit products.
          </p>
        </div>
        <div class="flex justify-end gap-3 pt-2">
          <button
            @click="isApprovalModalOpen = false"
            class="p-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md hover:from-rose-600 hover:to-rose-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
          >
            <Icon
              name="material-symbols:close-rounded"
              class="text-white text-2xl group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
          <button
            @click="approveVendor"
            class="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Approve Vendor
          </button>
        </div>
      </div>
    </Modal2>

    <!-- Rejection Modal -->
    <Modal2
      title="Reject Vendor"
      :isOpen="isRejectionModalOpen"
      @modal-close="isRejectionModalOpen = false"
    >
      <div class="py-4">
        <p class="text-gray-600 mb-4">
          Are you sure you want to reject
          <span class="font-semibold">{{ selectedVendor?.name }}</span
          >'s vendor application?
        </p>

        <div class="mb-4">
          <label
            for="rejectionReason"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Reason for rejection (required)
          </label>
          <textarea
            v-model="rejectionReason"
            id="rejectionReason"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Please provide a reason for rejection..."
          ></textarea>
        </div>

        <div class="bg-red-50 p-4 rounded-lg mb-4">
          <p class="text-sm text-red-700">
            This action cannot be undone. The vendor will be notified of the
            rejection.
          </p>
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button
            @click="isRejectionModalOpen = false"
            class="p-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md hover:from-rose-600 hover:to-rose-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
          >
            <Icon
              name="material-symbols:close-rounded"
              class="text-white text-2xl group-hover:rotate-90 transition-transform duration-300"
            />
          </button>
          <button
            @click="rejectVendor"
            :disabled="!rejectionReason.trim()"
            :class="{
              'opacity-50 cursor-not-allowed': !rejectionReason.trim(),
            }"
            class="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Reject Application
          </button>
        </div>
      </div>
    </Modal2>
  </div>
</template>
