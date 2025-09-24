<script setup>
import { ref, onMounted, computed } from "vue";
import Modal from "@/components/Modal.vue";
import Modal2 from "@/components/Modal2.vue";

// Affiliate data
const affiliates = ref([]);
const selectedAffiliate = ref(null);
const isViewModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const searchQuery = ref("");
const statusFilter = ref("all");
const commissionFilter = ref("all");
const isLoading = ref(true);

// Status options
const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

// Commission options
const commissionOptions = [
  { value: "all", label: "All Tiers" },
  { value: "tier1", label: "Tier 1 (15%)" },
  { value: "tier2", label: "Tier 2 (10%)" },
  { value: "tier3", label: "Tier 3 (5%)" },
];

// Mock data - in a real app, this would come from an API
const mockAffiliates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@marketingpros.com",
    phone: "+1 (555) 123-4567",
    website: "https://marketingpros.com",
    socialMedia: "@marketingpros",
    commissionTier: "tier1",
    commissionRate: 15,
    status: "active",
    joinDate: "2023-10-15",
    totalReferrals: 156,
    totalRevenue: 45800,
    earnedCommission: 6870,
    conversionRate: 12.5,
    address: "123 Marketing St, San Francisco, CA 94103",
    paymentMethod: "PayPal",
    paymentEmail: "sarah@paypal.com",
    promoCode: "AFF-SJ15",
  },
  {
    id: 2,
    name: "Mike Thompson",
    email: "mike@techreviews.net",
    phone: "+1 (555) 987-6543",
    website: "https://techreviews.net",
    socialMedia: "@techreviews",
    commissionTier: "tier2",
    commissionRate: 10,
    status: "active",
    joinDate: "2023-10-10",
    totalReferrals: 289,
    totalRevenue: 28950,
    earnedCommission: 2895,
    conversionRate: 8.7,
    address: "456 Tech Ave, New York, NY 10001",
    paymentMethod: "Bank Transfer",
    paymentEmail: "mike@bank.com",
    promoCode: "AFF-MT10",
  },
  {
    id: 3,
    name: "Jennifer Lee",
    email: "jennifer@lifestyleblog.com",
    phone: "+1 (555) 456-7890",
    website: "https://lifestyleblog.com",
    socialMedia: "@lifestyleblog",
    commissionTier: "tier1",
    commissionRate: 15,
    status: "inactive",
    joinDate: "2023-10-05",
    totalReferrals: 87,
    totalRevenue: 18750,
    earnedCommission: 2812,
    conversionRate: 15.2,
    address: "789 Blog Lane, Chicago, IL 60601",
    paymentMethod: "PayPal",
    paymentEmail: "jennifer@paypal.com",
    promoCode: "AFF-JL15",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@fitnessguru.com",
    phone: "+1 (555) 234-5678",
    website: "https://fitnessguru.com",
    socialMedia: "@fitnessguru",
    commissionTier: "tier3",
    commissionRate: 5,
    status: "active",
    joinDate: "2023-10-18",
    totalReferrals: 134,
    totalRevenue: 15600,
    earnedCommission: 780,
    conversionRate: 6.8,
    address: "321 Fitness Blvd, Denver, CO 80202",
    paymentMethod: "Stripe",
    paymentEmail: "david@stripe.com",
    promoCode: "AFF-DW5",
  },
  {
    id: 5,
    name: "Amanda Rodriguez",
    email: "amanda@foodietravels.com",
    phone: "+1 (555) 876-5432",
    website: "https://foodietravels.com",
    socialMedia: "@foodietravels",
    commissionTier: "tier2",
    commissionRate: 10,
    status: "pending",
    joinDate: "2023-10-12",
    totalReferrals: 0,
    totalRevenue: 0,
    earnedCommission: 0,
    conversionRate: 0,
    address: "654 Food Street, Portland, OR 97205",
    paymentMethod: "PayPal",
    paymentEmail: "amanda@paypal.com",
    promoCode: "AFF-AR10",
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
      affiliate.website.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesStatus =
      statusFilter.value === "all" || affiliate.status === statusFilter.value;

    const matchesCommission =
      commissionFilter.value === "all" ||
      affiliate.commissionTier === commissionFilter.value;

    return matchesSearch && matchesStatus && matchesCommission;
  });
});

const newAffiliate = ref({
  id: null,
  name: "",
  email: "",
  website: "",
  commissionTier: "tier1",
  status: "pending",
  totalReferrals: 0,
  totalRevenue: 0,
  earnedCommission: 0,
  conversionRate: 0,
  joinDate: new Date().toISOString().slice(0, 10),
});

const isAddModalOpen = ref(false);

// Open view modal
const openViewModal = (affiliate) => {
  selectedAffiliate.value = affiliate;
  isViewModalOpen.value = true;
};

// Open edit modal
const openEditModal = (affiliate) => {
  selectedAffiliate.value = { ...affiliate };
  isEditModalOpen.value = true;
};

// Open delete modal
const openDeleteModal = (affiliate) => {
  selectedAffiliate.value = affiliate;
  isDeleteModalOpen.value = true;
};

// Save affiliate changes
const saveAffiliate = () => {
  if (selectedAffiliate.value) {
    const index = affiliates.value.findIndex(
      (a) => a.id === selectedAffiliate.value.id
    );
    if (index !== -1) {
      affiliates.value[index] = { ...selectedAffiliate.value };
      // In a real app, you would make an API call here
    }
    isEditModalOpen.value = false;
  }
};

// Delete affiliate
const deleteAffiliate = () => {
  if (selectedAffiliate.value) {
    affiliates.value = affiliates.value.filter(
      (a) => a.id !== selectedAffiliate.value.id
    );
    // In a real app, you would make an API call here
    isDeleteModalOpen.value = false;
  }
};

// Toggle affiliate status
const toggleAffiliateStatus = (affiliate) => {
  const index = affiliates.value.findIndex((a) => a.id === affiliate.id);
  if (index !== -1) {
    affiliates.value[index].status =
      affiliates.value[index].status === "active" ? "inactive" : "active";
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

// Get commission tier text
const getCommissionTierText = (tier) => {
  const texts = {
    tier1: "Tier 1 (15%)",
    tier2: "Tier 2 (10%)",
    tier3: "Tier 3 (5%)",
  };
  return texts[tier] || tier;
};

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const openMenuId = ref(null);

const toggleMenu = (id) => {
  openMenuId.value = openMenuId.value === id ? null : id;
};

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Format percentage
const formatPercentage = (value) => {
  return `${value}%`;
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
      <!-- Total Affiliates -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-blue-500/10 to-blue-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-blue-600/80"
            >
              Total Affiliates
            </p>
            <p class="text-3xl font-bold text-blue-900">
              {{ affiliates.length }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-blue-500/20 text-blue-600">
            <Icon name="heroicons:user-group" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Active Affiliates -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-emerald-500/10 to-emerald-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-emerald-600/80"
            >
              Active Affiliates
            </p>
            <p class="text-3xl font-bold text-emerald-900">
              {{ affiliates.filter((a) => a.status === "active").length }}
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-emerald-500/20 text-emerald-600"
          >
            <Icon name="heroicons:check-badge" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Total Revenue -->
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
                  affiliates.reduce(
                    (sum, affiliate) => sum + affiliate.totalRevenue,
                    0
                  )
                )
              }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-sky-500/20 text-sky-600">
            <Icon name="tabler:coin-taka" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Total Commission -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-yellow-500/10 to-yellow-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-yellow-600/80"
            >
              Total Commission
            </p>
            <p class="text-3xl font-bold text-yellow-900">
              {{
                formatCurrency(
                  affiliates.reduce(
                    (sum, affiliate) => sum + affiliate.earnedCommission,
                    0
                  )
                )
              }}
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-yellow-500/20 text-yellow-600"
          >
            <Icon name="heroicons:banknotes" class="text-2xl" />
          </div>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
    >
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Affiliate Management</h2>
        <p class="text-sm text-gray-600 mt-1">
          Manage your affiliate partners and track performance
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

        <!-- Commission Filter -->
        <select
          v-model="commissionFilter"
          class="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option
            v-for="option in commissionOptions"
            :value="option.value"
            :key="option.value"
          >
            {{ option.label }}
          </option>
        </select>

        <button
          @click="isAddModalOpen = true"
          class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium transition flex items-center gap-2"
        >
          <Icon name="heroicons:plus" class="h-4 w-4" />
          Add Affiliate
        </button>
      </div>
    </div>

    <!-- Affiliates Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <h3 class="font-semibold text-gray-900 text-lg">
          Affiliate List ({{ filteredAffiliates.length }})
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
      <div v-else-if="filteredAffiliates.length === 0" class="p-6 text-center">
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
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Affiliate
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Commission
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Referrals
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Revenue
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Commission
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Conversion
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
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center"
                  >
                    <Icon
                      name="heroicons:user-circle"
                      class="h-5 w-5 text-blue-600"
                    />
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
                {{ getCommissionTierText(affiliate.commissionTier) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ affiliate.totalReferrals }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(affiliate.totalRevenue) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(affiliate.earnedCommission) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatPercentage(affiliate.conversionRate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getStatusClass(affiliate.status)"
                >
                  {{ getStatusText(affiliate.status) }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium relative"
              >
                <div class="relative">
                  <!-- 3-dot menu button -->
                  <button
                    @click="toggleMenu(affiliate.id)"
                    class="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Icon
                      :name="
                        openMenuId === affiliate.id
                          ? 'heroicons:x-mark'
                          : 'ph:dots-three-vertical'
                      "
                      class="text-lg"
                    />
                  </button>

                  <!-- Dropdown menu -->
                  <div
                    v-if="openMenuId === affiliate.id"
                    class="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1"
                  >
                    <button
                      class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      @click="openViewModal(affiliate)"
                    >
                      <Icon
                        name="heroicons:eye"
                        class="text-base text-primary"
                      />
                      View Details
                    </button>
                    <button
                      class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      @click="openEditModal(affiliate)"
                    >
                      <Icon
                        name="heroicons:pencil-square"
                        class="text-base text-blue-700"
                      />
                      Edit Affiliate
                    </button>
                    <button
                      class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      @click="toggleAffiliateStatus(affiliate)"
                    >
                      <Icon
                        :name="
                          affiliate.status === 'active'
                            ? 'heroicons:eye-slash'
                            : 'heroicons:eye'
                        "
                        class="text-base text-green-700"
                      />
                      {{
                        affiliate.status === "active"
                          ? "Deactivate"
                          : "Activate"
                      }}
                    </button>
                    <div class="border-t border-gray-200 my-1"></div>
                    <button
                      class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      @click="openDeleteModal(affiliate)"
                    >
                      <Icon name="heroicons:trash" class="text-base" /> Delete
                    </button>
                  </div>
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

    <!-- View Modal -->
    <Modal
      title="Affiliate Details"
      :isOpen="isViewModalOpen"
      @modal-close="isViewModalOpen = false"
      size="lg"
    >
      <div class="py-4" v-if="selectedAffiliate">
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
                  name="heroicons:user-circle"
                  class="h-5 w-5 text-blue-600"
                />
              </div>
              <div>
                <h2 class="text-xl font-bold">{{ selectedAffiliate.name }}</h2>
                <p class="text-blue-100 opacity-90">
                  {{ selectedAffiliate.website }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm"
              >
                <Icon name="heroicons:calendar" class="w-4 h-4 mr-1" />
                Joined {{ formatDate(selectedAffiliate.joinDate) }}
              </span>
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                :class="
                  selectedAffiliate.status === 'active'
                    ? 'bg-green-500/20'
                    : selectedAffiliate.status === 'inactive'
                    ? 'bg-red-500/20'
                    : 'bg-yellow-500/20'
                "
              >
                <Icon
                  :name="
                    selectedAffiliate.status === 'active'
                      ? 'heroicons:check-badge'
                      : selectedAffiliate.status === 'inactive'
                      ? 'heroicons:x-circle'
                      : 'heroicons:clock'
                  "
                  class="w-4 h-4 mr-1"
                />
                {{ getStatusText(selectedAffiliate.status) }}
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
                    {{ selectedAffiliate.email }}
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
                    {{ selectedAffiliate.phone }}
                  </p>
                </div>
              </div>
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3"
                >
                  <Icon
                    name="heroicons:globe"
                    class="w-4 h-4 text-purple-600"
                  />
                </div>
                <div>
                  <p class="text-xs text-gray-500">Website</p>
                  <p class="text-sm font-medium text-gray-900">
                    {{ selectedAffiliate.website }}
                  </p>
                </div>
              </div>
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3"
                >
                  <Icon
                    name="heroicons:at-symbol"
                    class="w-4 h-4 text-orange-600"
                  />
                </div>
                <div>
                  <p class="text-xs text-gray-500">Social Media</p>
                  <p class="text-sm font-medium text-gray-900">
                    {{ selectedAffiliate.socialMedia }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Details -->
          <div
            class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 shadow-sm border border-gray-100"
          >
            <h3
              class="text-sm font-semibold text-gray-700 mb-4 flex items-center"
            >
              <Icon
                name="heroicons:credit-card"
                class="w-4 h-4 mr-2 text-purple-500"
              />
              Payment Details
            </h3>
            <div class="space-y-3">
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3"
                >
                  <Icon
                    name="heroicons:banknotes"
                    class="w-4 h-4 text-orange-600"
                  />
                </div>
                <div>
                  <p class="text-xs text-gray-500">Payment Method</p>
                  <p class="text-sm font-medium text-gray-900">
                    {{ selectedAffiliate.paymentMethod }}
                  </p>
                </div>
              </div>
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3"
                >
                  <Icon
                    name="heroicons:envelope"
                    class="w-4 h-4 text-red-600"
                  />
                </div>
                <div>
                  <p class="text-xs text-gray-500">Payment Email</p>
                  <p class="text-sm font-medium text-gray-900">
                    {{ selectedAffiliate.paymentEmail }}
                  </p>
                </div>
              </div>
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3"
                >
                  <Icon name="heroicons:tag" class="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p class="text-xs text-gray-500">Promo Code</p>
                  <p class="text-sm font-medium text-gray-900">
                    {{ selectedAffiliate.promoCode }}
                  </p>
                </div>
              </div>
              <div class="flex items-center">
                <div
                  class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3"
                >
                  <Icon
                    name="heroicons:percent-badge"
                    class="w-4 h-4 text-blue-600"
                  />
                </div>
                <div>
                  <p class="text-xs text-gray-500">Commission Rate</p>
                  <p class="text-sm font-medium text-gray-900">
                    {{ selectedAffiliate.commissionRate }}%
                  </p>
                </div>
              </div>
            </div>
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
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div
              class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
            >
              <div class="flex items-center justify-between mb-2">
                <p class="text-xs font-medium text-gray-500">Total Referrals</p>
                <Icon
                  name="heroicons:user-group"
                  class="w-4 h-4 text-blue-500"
                />
              </div>
              <p class="text-2xl font-bold text-gray-900">
                {{ selectedAffiliate.totalReferrals }}
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
                {{ formatCurrency(selectedAffiliate.totalRevenue) }}
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
                <p class="text-xs font-medium text-gray-500">
                  Commission Earned
                </p>
                <Icon
                  name="heroicons:banknotes"
                  class="w-4 h-4 text-yellow-500"
                />
              </div>
              <p class="text-2xl font-bold text-gray-900">
                {{ formatCurrency(selectedAffiliate.earnedCommission) }}
              </p>
              <div class="flex items-center mt-1">
                <Icon
                  name="heroicons:arrow-trending-up"
                  class="w-4 h-4 text-green-500 mr-1"
                />
                <span class="text-xs text-green-600 font-medium">+10.1%</span>
              </div>
            </div>

            <div
              class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
            >
              <div class="flex items-center justify-between mb-2">
                <p class="text-xs font-medium text-gray-500">Conversion Rate</p>
                <Icon
                  name="heroicons:arrow-trending-up"
                  class="w-4 h-4 text-indigo-500"
                />
              </div>
              <p class="text-2xl font-bold text-gray-900">
                {{ formatPercentage(selectedAffiliate.conversionRate) }}
              </p>
              <div class="flex items-center mt-1">
                <Icon
                  name="heroicons:arrow-trending-up"
                  class="w-4 h-4 text-green-500 mr-1"
                />
                <span class="text-xs text-green-600 font-medium">+2.3%</span>
              </div>
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
    <Modal2
      title="Edit Affiliate"
      :isOpen="isEditModalOpen"
      @modal-close="isEditModalOpen = false"
      size="lg"
    >
      <div v-if="selectedAffiliate" class="space-y-6 py-6">
        <!-- Name -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">
            Name
          </label>
          <div class="relative">
            <input
              v-model="selectedAffiliate.name"
              type="text"
              class="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm px-3 py-2"
            />
            <Icon
              name="heroicons:user"
              class="w-4 h-4 absolute right-3 top-2.5 text-gray-400"
            />
          </div>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <div class="relative">
            <input
              v-model="selectedAffiliate.email"
              type="email"
              class="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm px-3 py-2"
            />
            <Icon
              name="heroicons:envelope"
              class="w-4 h-4 absolute right-3 top-2.5 text-gray-400"
            />
          </div>
        </div>

        <!-- Website -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">
            Website
          </label>
          <div class="relative">
            <input
              v-model="selectedAffiliate.website"
              type="url"
              class="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm px-3 py-2"
            />
            <Icon
              name="heroicons:globe-alt"
              class="w-4 h-4 absolute right-3 top-2.5 text-gray-400"
            />
          </div>
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">
            Status
          </label>
          <div class="relative">
            <select
              v-model="selectedAffiliate.status"
              class="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm px-3 py-2 appearance-none"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <Icon
              name="heroicons:chevron-down"
              class="w-4 h-4 absolute right-3 top-2.5 text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end mt-6 gap-3 pt-4">
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
          @click="saveAffiliate"
          class="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
        >
          <span class="flex items-center gap-2">
            <Icon name="heroicons:pencil-square" class="w-5 h-5" />
            Save Changes
          </span>
        </button>
      </div>
    </Modal2>

    <!-- Delete Modal -->
    <Modal2
      title="Confirm Delete"
      :isOpen="isDeleteModalOpen"
      @modal-close="isDeleteModalOpen = false"
    >
      <div v-if="selectedAffiliate" class="py-6 text-center">
        <div
          class="mx-auto mb-4 w-14 h-14 rounded-full bg-red-100 flex items-center justify-center"
        >
          <Icon
            name="heroicons:exclamation-triangle"
            class="w-8 h-8 text-red-600"
          />
        </div>
        <p class="text-gray-700">
          Are you sure you want to delete affiliate
          <span class="font-semibold">{{ selectedAffiliate.name }}</span
          >?
        </p>
        <p class="text-sm text-gray-500 mt-1">This action cannot be undone.</p>
      </div>

      <div class="flex justify-end mt-6 gap-2">
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
          @click="deleteAffiliate"
          class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </Modal2>

    <!-- Add Affiliate Modal -->
    <Modal2
      title="Add New Affiliate"
      :isOpen="isAddModalOpen"
      @modal-close="isAddModalOpen = false"
      size="lg"
    >
      <div class="space-y-6 py-6">
        <!-- Name -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">
            Name
          </label>
          <div class="relative">
            <input
              v-model="newAffiliate.name"
              type="text"
              placeholder="Enter affiliate name"
              class="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm px-3 py-2"
            />
            <Icon
              name="heroicons:user"
              class="w-4 h-4 absolute right-3 top-2.5 text-gray-400"
            />
          </div>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <div class="relative">
            <input
              v-model="newAffiliate.email"
              type="email"
              placeholder="Enter email address"
              class="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm px-3 py-2"
            />
            <Icon
              name="heroicons:envelope"
              class="w-4 h-4 absolute right-3 top-2.5 text-gray-400"
            />
          </div>
        </div>

        <!-- Website -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">
            Website
          </label>
          <div class="relative">
            <input
              v-model="newAffiliate.website"
              type="url"
              placeholder="https://example.com"
              class="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm px-3 py-2"
            />
            <Icon
              name="heroicons:globe-alt"
              class="w-4 h-4 absolute right-3 top-2.5 text-gray-400"
            />
          </div>
        </div>

        <!-- Commission Tier -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">
            Commission Tier
          </label>
          <div class="relative">
            <select
              v-model="newAffiliate.commissionTier"
              class="w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm px-3 py-2 appearance-none"
            >
              <option value="tier1">Tier 1 (15%)</option>
              <option value="tier2">Tier 2 (10%)</option>
              <option value="tier3">Tier 3 (5%)</option>
            </select>
            <Icon
              name="heroicons:chevron-down"
              class="w-4 h-4 absolute right-3 top-2.5 text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end mt-6 gap-3 pt-4">
        <button
          @click="isAddModalOpen = false"
          class="p-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md hover:from-rose-600 hover:to-rose-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
        >
          <Icon
            name="material-symbols:close-rounded"
            class="text-white text-2xl group-hover:rotate-90 transition-transform duration-300"
          />
        </button>
        <button
          @click="addAffiliate"
          class="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300"
        >
          <span class="flex items-center gap-2">
            <Icon name="heroicons:plus-circle" class="w-5 h-5" />
            Add Affiliate
          </span>
        </button>
      </div>
    </Modal2>
  </div>
</template>
