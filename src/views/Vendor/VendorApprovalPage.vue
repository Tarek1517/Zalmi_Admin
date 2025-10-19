<template>
  <div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <!-- Pending Review -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 bg-gradient-to-br from-blue-500/10 to-blue-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold uppercase text-blue-600/80">
              Pending Review
            </p>
            <p class="text-3xl font-bold text-blue-900">{{ pendingCount }}</p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-blue-500/20 text-blue-600">
            <Icon name="heroicons:clock" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Rejected Vendors -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 bg-gradient-to-br from-red-500/10 to-red-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold uppercase text-red-600/80">
              Rejected Vendors
            </p>
            <p class="text-3xl font-bold text-red-900">{{ rejectedCount }}</p>
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
          Manage pending and rejected vendor applications
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
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>

        <!-- Refresh Button -->
        <button
          @click="getVendors"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Icon name="heroicons:arrow-path" class="h-4 w-4" />
          Refresh
        </button>
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
      <div v-if="loading" class="p-8 text-center">
        <div class="flex items-center justify-center gap-2">
          <Icon name="heroicons:arrow-path" class="h-5 w-5 animate-spin" />
          <span class="text-gray-600">Loading vendors...</span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredVendors.length === 0" class="p-8 text-center">
        <div class="text-gray-500">
          <Icon
            name="heroicons:document-magnifying-glass"
            class="h-12 w-12 mx-auto mb-4 opacity-50"
          />
          <p class="text-lg font-medium mb-2">No vendors found</p>
          <p class="text-sm">Try adjusting your search or filter criteria</p>
        </div>
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
                Contact Info
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Documents
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
                      {{ vendor.vendorName || "N/A" }}
                    </div>
                    <div class="text-sm text-gray-500">
                      License: {{ vendor.licenseNumber || "N/A" }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>{{ vendor.email || "N/A" }}</div>
                <div class="text-gray-500">
                  {{ vendor.phoneNumber || "N/A" }}
                </div>
                <div class="text-xs text-gray-400">
                  NID: {{ vendor.nid || "N/A" }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button
                  @click="downloadDocument(vendor)"
                  class="text-blue-600 hover:text-blue-800 p-1.5 rounded-md hover:bg-blue-50 transition-colors flex items-center gap-1"
                  :disabled="!vendor.documents"
                  :class="{
                    'opacity-50 cursor-not-allowed': !vendor.documents,
                  }"
                >
                  <Icon name="heroicons:document-arrow-down" class="h-4 w-4" />
                  <span class="text-xs">Download</span>
                </button>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(vendor.created_at) }}
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
                    v-if="vendor.status === 'pending'"
                    @click="openApprovalModal(vendor)"
                    class="text-green-600 hover:text-green-800 p-1.5 rounded-md hover:bg-green-50 transition-colors"
                    title="Approve Vendor"
                  >
                    <Icon name="heroicons:check" class="h-4 w-4" />
                  </button>
                  <button
                    v-if="vendor.status === 'pending'"
                    @click="openRejectionModal(vendor)"
                    class="text-red-600 hover:text-red-800 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                    title="Reject Vendor"
                  >
                    <Icon name="heroicons:x-mark" class="h-4 w-4" />
                  </button>
                  
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
          <span class="font-semibold">{{ selectedVendor?.vendorName }}</span> as
          a vendor?
        </p>
        <div class="bg-blue-50 p-4 rounded-lg mb-4">
          <p class="text-sm text-blue-700">
            This action will grant them full access to the vendor portal.
          </p>
        </div>
        <div class="flex justify-end gap-3 pt-2">
          <button
            @click="isApprovalModalOpen = false"
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
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
          <span class="font-semibold">{{ selectedVendor?.vendorName }}</span
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

        <div class="flex justify-end gap-3 pt-2">
          <button
            @click="isRejectionModalOpen = false"
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
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

<script setup>
import Modal from "@/components/Modal.vue";
import Modal2 from "@/components/Modal2.vue";
import { ref, onMounted, computed } from "vue";
import useAxios from "@/composables/useAxios.js";
import { toast } from "vue3-toastify";

const { loading, sendRequest } = useAxios();

// Data
const vendorAproval = ref([]);
const selectedVendor = ref(null);
const isApprovalModalOpen = ref(false);
const isRejectionModalOpen = ref(false);
const rejectionReason = ref("");
const searchQuery = ref("");
const statusFilter = ref("all");

// Get vendors array safely
const vendorsArray = computed(() => {
  if (Array.isArray(vendorAproval.value)) return vendorAproval.value;
  if (vendorAproval.value?.data) return vendorAproval.value.data;
  return [];
});

// Filter only pending and rejected vendors
const filteredVendors = computed(() => {
  let vendors = vendorsArray.value.filter(
    (vendor) => vendor.status === "pending" || vendor.status === "rejected"
  );

  if (searchQuery.value) {
    vendors = vendors.filter(
      (vendor) =>
        vendor.vendorName
          ?.toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        vendor.email?.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (statusFilter.value !== "all") {
    vendors = vendors.filter((vendor) => vendor.status === statusFilter.value);
  }

  return vendors;
});

// Stats
const pendingCount = computed(
  () => vendorsArray.value.filter((v) => v.status === "pending").length
);
const rejectedCount = computed(
  () => vendorsArray.value.filter((v) => v.status === "rejected").length
);

// Methods
const getVendors = async () => {
  try {
    const response = await sendRequest({
      method: "get",
      url: "/v1/vendorApproval",
    });
    vendorAproval.value = response?.data || [];
  } catch (err) {
    toast.error("Failed to fetch vendors.");
  }
};

const openApprovalModal = (vendor) => {
  selectedVendor.value = vendor;
  isApprovalModalOpen.value = true;
};

const openRejectionModal = (vendor) => {
  selectedVendor.value = vendor;
  rejectionReason.value = "";
  isRejectionModalOpen.value = true;
};

const approveVendor = async () => {
  if (!selectedVendor.value) return;

  try {
    await sendRequest({
      method: "POST",
      url: `/v1/vendorApproval/${selectedVendor.value.id}/approve`,
    });

    // Update local state
    const vendor = vendorsArray.value.find(
      (v) => v.id === selectedVendor.value.id
    );
    if (vendor) vendor.status = "approved";

    toast.success("Vendor approved successfully!");
    isApprovalModalOpen.value = false;
  } catch (err) {
    toast.error("Failed to approve vendor.");
  }
};

const rejectVendor = async () => {
  if (!selectedVendor.value || !rejectionReason.value.trim()) return;

  try {
    await sendRequest({
      method: "POST",
      url: `/v1/vendorApproval/${selectedVendor.value.id}/reject`,
      data: { reason: rejectionReason.value },
    });

    // Update local state
    const vendor = vendorsArray.value.find(
      (v) => v.id === selectedVendor.value.id
    );
    if (vendor) vendor.status = "rejected";

    toast.success("Vendor rejected successfully!");
    isRejectionModalOpen.value = false;
  } catch (err) {
    toast.error("Failed to reject vendor.");
  }
};

const getStatusClass = (status) => {
  return (
    {
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
    }[status] || "bg-gray-100 text-gray-800"
  );
};

const getStatusText = (status) => {
  return (
    {
      pending: "Pending Review",
      rejected: "Rejected",
    }[status] || status
  );
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US");
};

const downloadDocument = (vendor) => {
  if (vendor.documents) {
    const documentUrl = `${import.meta.env.VITE_API_URL}/${vendor.documents}`;
    window.open(documentUrl, "_blank");
  } else {
    toast.error("No document available.");
  }
};

// Initialize
onMounted(() => {
  getVendors();
});
</script>
