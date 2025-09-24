<script setup>
import Modal from "@/components/Modal.vue";
import Modal2 from "@/components/Modal2.vue";
import { ref, onMounted, computed } from "vue";

// Affiliate approval data
const affiliates = ref([]);
const selectedAffiliate = ref(null);
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
const mockAffiliates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@marketingpros.com",
    phone: "+1 (555) 123-4567",
    website: "marketingpros.com",
    socialMedia: ["instagram", "youtube", "tiktok"],
    followers: 125000,
    registrationDate: "2023-10-15",
    status: "pending",
    niche: "Lifestyle & Fashion",
    commissionRate: 15,
    performance: {
      clicks: 1250,
      conversions: 45,
      revenue: 2250,
    },
  },
  {
    id: 2,
    name: "TechReview Channel",
    email: "contact@techreview.com",
    phone: "+1 (555) 987-6543",
    website: "techreview.com",
    socialMedia: ["youtube", "twitter"],
    followers: 285000,
    registrationDate: "2023-10-10",
    status: "approved",
    niche: "Technology & Gadgets",
    commissionRate: 12,
    performance: {
      clicks: 3450,
      conversions: 128,
      revenue: 8950,
    },
  },
  {
    id: 3,
    name: "FitnessWithMike",
    email: "mike@fitnesswithmike.com",
    phone: "+1 (555) 456-7890",
    website: "fitnesswithmike.com",
    socialMedia: ["instagram", "tiktok"],
    followers: 89000,
    registrationDate: "2023-10-05",
    status: "rejected",
    niche: "Health & Fitness",
    commissionRate: 18,
    rejectionReason: "Content not aligned with brand values",
    performance: {
      clicks: 0,
      conversions: 0,
      revenue: 0,
    },
  },
  {
    id: 4,
    name: "HomeDecor Ideas",
    email: "info@homedecorideas.com",
    phone: "+1 (555) 234-5678",
    website: "homedecorideas.com",
    socialMedia: ["pinterest", "instagram"],
    followers: 156000,
    registrationDate: "2023-10-18",
    status: "pending",
    niche: "Home & Interior Design",
    commissionRate: 14,
    performance: {
      clicks: 0,
      conversions: 0,
      revenue: 0,
    },
  },
  {
    id: 5,
    name: "TravelWithAnna",
    email: "anna@travelwithanna.com",
    phone: "+1 (555) 876-5432",
    website: "travelwithanna.com",
    socialMedia: ["instagram", "youtube", "blog"],
    followers: 215000,
    registrationDate: "2023-10-12",
    status: "pending",
    niche: "Travel & Adventure",
    commissionRate: 16,
    performance: {
      clicks: 0,
      conversions: 0,
      revenue: 0,
    },
  },
];

// Fetch affiliates (simulated API call)
const fetchAffiliates = () => {
  isLoading.value = true;
  setTimeout(() => {
    affiliates.value = mockAffiliates;
    isLoading.value = false;
  }, 800);
};

// Filtered affiliates based on search and status filter
const filteredAffiliates = computed(() => {
  return affiliates.value.filter((affiliate) => {
    const matchesSearch =
      affiliate.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      affiliate.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      affiliate.niche.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesStatus =
      statusFilter.value === "all" || affiliate.status === statusFilter.value;

    return matchesSearch && matchesStatus;
  });
});

// Open approval modal
const openApprovalModal = (affiliate) => {
  selectedAffiliate.value = affiliate;
  isApprovalModalOpen.value = true;
};

// Open rejection modal
const openRejectionModal = (affiliate) => {
  selectedAffiliate.value = affiliate;
  rejectionReason.value = "";
  isRejectionModalOpen.value = true;
};

// Approve affiliate
const approveAffiliate = () => {
  if (selectedAffiliate.value) {
    const index = affiliates.value.findIndex(
      (v) => v.id === selectedAffiliate.value.id
    );
    if (index !== -1) {
      affiliates.value[index].status = "approved";
      // In a real app, you would make an API call here
    }
    isApprovalModalOpen.value = false;
  }
};

// Reject affiliate
const rejectAffiliate = () => {
  if (selectedAffiliate.value && rejectionReason.value.trim()) {
    const index = affiliates.value.findIndex(
      (v) => v.id === selectedAffiliate.value.id
    );
    if (index !== -1) {
      affiliates.value[index].status = "rejected";
      affiliates.value[index].rejectionReason = rejectionReason.value;
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
    pending: "Pending",
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

// Format number with commas
const formatNumber = (num) => {
  return num.toLocaleString();
};

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Get social media icon
const getSocialMediaIcon = (platform) => {
  const icons = {
    instagram: "ri:instagram-fill",
    youtube: "ri:youtube-fill",
    tiktok: "ri:tiktok-fill",
    twitter: "ri:twitter-x-fill",
    pinterest: "ri:pinterest-fill",
    blog: "ri:article-fill",
  };
  return icons[platform] || "ri:share-circle-fill";
};

// Get social media color
const getSocialMediaColor = (platform) => {
  const colors = {
    instagram: "text-pink-600",
    youtube: "text-red-600",
    tiktok: "text-black",
    twitter: "text-blue-400",
    pinterest: "text-red-500",
    blog: "text-purple-600",
  };
  return colors[platform] || "text-gray-600";
};

// Initialize component
onMounted(() => {
  fetchAffiliates();
});
</script>

<template>
  <div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Pending Affiliates -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-yellow-500/10 to-yellow-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-yellow-600/80"
            >
              Pending Review
            </p>
            <p class="text-3xl font-bold text-yellow-900">
              {{ affiliates.filter((v) => v.status === "pending").length }}
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-yellow-500/20 text-yellow-600"
          >
            <Icon name="heroicons:clock" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Approved Affiliates -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-green-500/10 to-green-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-green-600/80"
            >
              Approved Affiliates
            </p>
            <p class="text-3xl font-bold text-green-900">
              {{ affiliates.filter((v) => v.status === "approved").length }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-green-500/20 text-green-600">
            <Icon name="heroicons:check-badge" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Rejected Affiliates -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-red-500/10 to-red-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-red-600/80"
            >
              Rejected Affiliates
            </p>
            <p class="text-3xl font-bold text-red-900">
              {{ affiliates.filter((v) => v.status === "rejected").length }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-red-500/20 text-red-600">
            <Icon name="heroicons:x-circle" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Total Revenue -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-purple-500/10 to-purple-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-purple-600/80"
            >
              Total Revenue
            </p>
            <p class="text-3xl font-bold text-purple-900">
              {{
                formatCurrency(
                  affiliates.reduce((sum, a) => sum + a.performance.revenue, 0)
                )
              }}
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-purple-500/20 text-purple-600"
          >
            <Icon name="heroicons:currency-dollar" class="text-2xl" />
          </div>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
    >
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Affiliate Approvals</h2>
        <p class="text-sm text-gray-600 mt-1">
          Manage and review affiliate applications
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
            placeholder="Search affiliates..."
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

    <!-- Affiliates Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="py-6 px-3 border-b border-gray-100">
        <h3 class="font-semibold text-gray-900 text-lg">
          Affiliate Applications ({{ filteredAffiliates.length }})
        </h3>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="p-8 text-center">
        <div class="inline-flex items-center justify-center">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
          ></div>
          <span class="ml-3 text-gray-600">Loading affiliates...</span>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredAffiliates.length === 0" class="p-8 text-center">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4"
        >
          <Icon name="heroicons:user-group" class="h-8 w-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-1">
          No affiliates found
        </h3>
        <p class="text-gray-500">
          Try adjusting your search or filter criteria
        </p>
      </div>

      <!-- Affiliates List -->
      <div v-else class="overflow-x-auto">
        <table class="w-full divide-y divide-gray-200">
          <thead class="bg-green-100">
            <tr>
              <th
                class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Affiliate
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Niche
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Followers
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Platforms
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Commission
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
            <tr v-for="affiliate in filteredAffiliates" :key="affiliate.id">
              <td class="px-3 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white"
                  >
                    <Icon name="heroicons:user-circle" class="h-5 w-5" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ affiliate.name }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ affiliate.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ affiliate.niche }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatNumber(affiliate.followers) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex gap-1">
                  <span
                    v-for="platform in affiliate.socialMedia"
                    :key="platform"
                    :class="getSocialMediaColor(platform)"
                    class="text-lg"
                  >
                    <Icon :name="getSocialMediaIcon(platform)" />
                  </span>
                </div>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600"
              >
                {{ affiliate.commissionRate }}%
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getStatusClass(affiliate.status)"
                >
                  {{ getStatusText(affiliate.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center gap-2">
                  <button
                    @click="openApprovalModal(affiliate)"
                    class="text-green-600 hover:text-green-800 p-1.5 rounded-md hover:bg-green-50 transition-colors"
                    :disabled="affiliate.status !== 'pending'"
                    :class="{
                      'opacity-50 cursor-not-allowed':
                        affiliate.status !== 'pending',
                    }"
                  >
                    <Icon name="heroicons:check" class="h-4 w-4" />
                  </button>
                  <button
                    @click="openRejectionModal(affiliate)"
                    class="text-red-600 hover:text-red-800 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                    :disabled="affiliate.status !== 'pending'"
                    :class="{
                      'opacity-50 cursor-not-allowed':
                        affiliate.status !== 'pending',
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
            <span class="font-medium">{{ filteredAffiliates.length }}</span> of
            <span class="font-medium">{{ filteredAffiliates.length }}</span>
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

    <!-- Approval Modal -->
    <Modal2
      title="Approve Affiliate"
      :isOpen="isApprovalModalOpen"
      @modal-close="isApprovalModalOpen = false"
    >
      <div class="py-4">
        <p class="text-gray-600 mb-4">
          Are you sure you want to approve
          <span class="font-semibold">{{ selectedAffiliate?.name }}</span> as an
          affiliate?
        </p>
        <div class="bg-blue-50 p-4 rounded-lg mb-4">
          <p class="text-sm text-blue-700">
            This action will grant them access to the affiliate dashboard and
            allow them to start promoting your products.
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
            @click="approveAffiliate"
            class="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Approve Affiliate
          </button>
        </div>
      </div>
    </Modal2>

    <!-- Rejection Modal -->
    <Modal2
      title="Reject Affiliate"
      :isOpen="isRejectionModalOpen"
      @modal-close="isRejectionModalOpen = false"
    >
      <div class="py-4">
        <p class="text-gray-600 mb-4">
          Are you sure you want to reject
          <span class="font-semibold">{{ selectedAffiliate?.name }}</span
          >'s affiliate application?
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
            This action cannot be undone. The affiliate will be notified of the
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
            @click="rejectAffiliate"
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
