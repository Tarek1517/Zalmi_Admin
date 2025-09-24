<script setup>
import Modal from "@/components/Modal.vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import useAxios from "@/composables/useAxios.js";
import { toast } from "vue3-toastify";

const router = useRouter();
const { loading, error, sendRequest } = useAxios();

// Campaign data
const campaigns = ref([
  {
    id: 1,
    title: "Summer Sale 2024",
    banner_image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
    status: "active",
    start_date: "2024-06-01",
    end_date: "2024-06-30",
    type: "seasonal",
    description: "Biggest summer sale with discounts up to 70%",
    target_audience: "all_customers",
    budget: 50000,
    spent: 32500,
    banner_position: "home_top",
    is_featured: true,
    created_at: "2024-05-15",
    stats: {
      views: 15420,
      clicks: 3245,
      conversions: 890,
      revenue: 125000,
    },
  },
  {
    id: 2,
    title: "Back to School",
    banner_image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
    status: "upcoming",
    start_date: "2024-08-01",
    end_date: "2024-08-31",
    type: "seasonal",
    description: "Special offers for students and parents",
    target_audience: "students",
    budget: 30000,
    spent: 0,
    banner_position: "category_top",
    is_featured: false,
    created_at: "2024-07-10",
    stats: {
      views: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
    },
  },
  {
    id: 3,
    title: "Flash Sale - Electronics",
    banner_image:
      "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=600",
    status: "completed",
    start_date: "2024-05-01",
    end_date: "2024-05-07",
    type: "flash_sale",
    description: "24-hour flash sale on electronics",
    target_audience: "tech_enthusiasts",
    budget: 20000,
    spent: 19850,
    banner_position: "home_top",
    is_featured: true,
    created_at: "2024-04-20",
    stats: {
      views: 8920,
      clicks: 2156,
      conversions: 456,
      revenue: 78000,
    },
  },
  {
    id: 4,
    title: "Winter Collection Launch",
    banner_image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
    status: "draft",
    start_date: "2024-11-01",
    end_date: "2024-12-31",
    type: "product_launch",
    description: "New winter fashion collection",
    target_audience: "fashion_lovers",
    budget: 40000,
    spent: 0,
    banner_position: "sidebar",
    is_featured: false,
    created_at: "2024-10-15",
    stats: {
      views: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
    },
  },
]);

// Form data
const form = ref({
  title: "",
  description: "",
  type: "seasonal",
  start_date: "",
  end_date: "",
  target_audience: "all_customers",
  budget: "",
  banner_position: "home_top",
  is_featured: false,
  banner_image: null,
});

const bannerPreview = ref(null);

// Modal states
const isCreateModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isViewModalOpen = ref(false);
const selectedCampaign = ref(null);
const searchQuery = ref("");

// Filter campaigns by status
const filterStatus = ref("all");

// Handle banner image upload
const onBannerUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.banner_image = file;
    bannerPreview.value = URL.createObjectURL(file);
  }
};

// Create new campaign
const createCampaign = async () => {
  if (!form.value.title || !form.value.start_date || !form.value.end_date) {
    toast.error("Please fill in all required fields", { theme: "dark" });
    return;
  }

  const newCampaign = {
    id: Math.max(...campaigns.value.map((c) => c.id)) + 1,
    ...form.value,
    status: "draft",
    created_at: new Date().toISOString().split("T")[0],
    spent: 0,
    stats: {
      views: 0,
      clicks: 0,
      conversions: 0,
      revenue: 0,
    },
  };

  campaigns.value.unshift(newCampaign);

  toast.success("Campaign created successfully!", { theme: "dark" });
  closeModal();
  resetForm();
};

// Update campaign
const updateCampaign = async () => {
  if (!selectedCampaign.value) return;

  const index = campaigns.value.findIndex(
    (c) => c.id === selectedCampaign.value.id
  );
  if (index !== -1) {
    campaigns.value[index] = {
      ...campaigns.value[index],
      ...form.value,
    };

    toast.success("Campaign updated successfully!", { theme: "dark" });
    closeModal();
    resetForm();
  }
};

// Delete campaign
const deleteCampaign = async (campaign) => {
  if (confirm(`Are you sure you want to delete "${campaign.title}"?`)) {
    campaigns.value = campaigns.value.filter((c) => c.id !== campaign.id);
    toast.success("Campaign deleted successfully!", { theme: "dark" });
  }
};

// Change campaign status
const changeStatus = (campaign, newStatus) => {
  const index = campaigns.value.findIndex((c) => c.id === campaign.id);
  if (index !== -1) {
    campaigns.value[index].status = newStatus;
    toast.success(`Campaign status changed to ${newStatus}`, { theme: "dark" });
  }
};

// Open modals
const openCreateModal = () => {
  resetForm();
  isCreateModalOpen.value = true;
};

const openEditModal = (campaign) => {
  selectedCampaign.value = campaign;
  form.value = { ...campaign };
  bannerPreview.value = campaign.banner_image;
  isEditModalOpen.value = true;
};

const openViewModal = (campaign) => {
  selectedCampaign.value = campaign;
  isViewModalOpen.value = true;
};

// Close modal
const closeModal = () => {
  isCreateModalOpen.value = false;
  isEditModalOpen.value = false;
  isViewModalOpen.value = false;
  selectedCampaign.value = null;
};

// Reset form
const resetForm = () => {
  form.value = {
    title: "",
    description: "",
    type: "seasonal",
    start_date: "",
    end_date: "",
    target_audience: "all_customers",
    budget: "",
    banner_position: "home_top",
    is_featured: false,
    banner_image: null,
  };
  bannerPreview.value = null;
};

// Computed properties
const filteredCampaigns = computed(() => {
  let filtered = campaigns.value;

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(
      (campaign) =>
        campaign.title
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        campaign.description
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
    );
  }

  // Filter by status
  if (filterStatus.value !== "all") {
    filtered = filtered.filter(
      (campaign) => campaign.status === filterStatus.value
    );
  }

  return filtered;
});

const campaignStats = computed(() => {
  return {
    total: campaigns.value.length,
    active: campaigns.value.filter((c) => c.status === "active").length,
    upcoming: campaigns.value.filter((c) => c.status === "upcoming").length,
    draft: campaigns.value.filter((c) => c.status === "draft").length,
  };
});

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Get status color
const getStatusColor = (status) => {
  const colors = {
    active: "green",
    upcoming: "blue",
    completed: "gray",
    draft: "yellow",
  };
  return colors[status] || "gray";
};

onMounted(() => {
  // In a real app, you would fetch campaigns from API here
});
</script>

<template>
  <AppLayout>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Total Campaigns -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-blue-500/10 to-blue-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-blue-600/80"
            >
              Total Campaigns
            </p>
            <p class="text-3xl font-bold text-blue-900">
              {{ campaignStats.total }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-blue-500/20 text-blue-600">
            <Icon name="heroicons:rectangle-stack" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Active Campaigns -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-green-500/10 to-green-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-green-600/80"
            >
              Active
            </p>
            <p class="text-3xl font-bold text-green-900">
              {{ campaignStats.active }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-green-500/20 text-green-600">
            <Icon name="heroicons:play" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Upcoming Campaigns -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-yellow-500/10 to-yellow-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-yellow-600/80"
            >
              Upcoming
            </p>
            <p class="text-3xl font-bold text-yellow-900">
              {{ campaignStats.upcoming }}
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-yellow-500/20 text-yellow-600"
          >
            <Icon name="heroicons:clock" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Draft Campaigns -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-purple-500/10 to-purple-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-purple-600/80"
            >
              Draft
            </p>
            <p class="text-3xl font-bold text-purple-900">
              {{ campaignStats.draft }}
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-purple-500/20 text-purple-600"
          >
            <Icon name="heroicons:document-text" class="text-2xl" />
          </div>
        </div>
      </div>
    </div>

    <!-- Header Section -->
    <div
      class="flex flex-col lg:flex-row items-start lg:items-center justify-between py-6 bg-white rounded-xl shadow-sm mb-6"
    >
      <div class="mb-4 lg:mb-0">
        <h2 class="text-2xl font-bold text-gray-900">Campaign Management</h2>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <Icon
              name="heroicons:magnifying-glass"
              class="w-5 h-5 text-gray-400"
            />
          </div>
          <input
            type="text"
            v-model="searchQuery"
            class="pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full lg:w-64"
            placeholder="Search campaigns..."
          />
        </div>

        <button
          @click="openCreateModal"
          class="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Icon name="heroicons:plus" class="w-5 h-5" />
          Add Campaign
        </button>
      </div>
    </div>
    <!-- Filters -->
    <div class="bg-white rounded-xl py-4 mb-6">
      <div class="flex flex-wrap items-center gap-4">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="status in [
              'all',
              'active',
              'upcoming',
              'draft',
              'completed',
            ]"
            :key="status"
            @click="filterStatus = status"
            class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
            :class="{
              'bg-primary text-white': filterStatus === status,
              'bg-gray-200 text-gray-700 hover:bg-primary hover:text-white':
                filterStatus !== status,
            }"
          >
            {{ status.charAt(0).toUpperCase() + status.slice(1) }}
          </button>
        </div>
      </div>
    </div>

    <!-- Campaigns Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        v-for="campaign in filteredCampaigns"
        :key="campaign.id"
        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        <div class="h-60 relative overflow-hidden rounded-t-lg">
          <!-- Image background layer -->
          <img
            :src="campaign.banner_image"
            :alt="campaign.title"
            class="absolute inset-0 w-full h-full object-cover"
          />

          <!-- Status Badge -->
          <div class="absolute top-4 right-3">
            <span
              class="px-2 py-1 rounded-full text-xs font-semibold capitalize"
              :class="{
                'bg-green-100 text-green-800': campaign.status === 'active',
                'bg-blue-100 text-blue-800': campaign.status === 'upcoming',
                'bg-gray-100 text-gray-800': campaign.status === 'completed',
                'bg-yellow-100 text-yellow-800': campaign.status === 'draft',
              }"
            >
              {{ campaign.status }}
            </span>
          </div>

          <!-- Featured Badge -->
          <div v-if="campaign.is_featured" class="absolute top-3 left-3">
            <span
              class="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold"
            >
              Featured
            </span>
          </div>
        </div>

        <!-- Campaign Details -->
        <div class="p-5">
          <h3 class="text-2xl font-bold text-gray-900 mb-2">
            {{ campaign.title }}
          </h3>
          <p class="text-gray-600 text-sm mb-4 line-clamp-2">
            {{ campaign.description }}
          </p>

          <div class="grid grid-cols-2 gap-3 mb-4">
            <div class="text-sm flex items-center">
              <Icon name="heroicons:tag" class="w-4 h-4 mr-1 text-blue-500" />
              <span class="text-gray-500">Type:</span>
              <span class="font-medium ml-1 capitalize">
                {{ campaign.type.replace("_", " ") }}
              </span>
            </div>
            <div class="text-sm flex items-center">
              <Icon
                name="heroicons:users"
                class="w-4 h-4 mr-1 text-purple-500"
              />
              <span class="text-gray-500">Audience:</span>
              <span class="font-medium ml-1 capitalize">
                {{ campaign.target_audience.replace("_", " ") }}
              </span>
            </div>
            <div class="text-sm flex items-center">
              <Icon
                name="heroicons:currency-dollar"
                class="w-4 h-4 mr-1 text-green-500"
              />
              <span class="text-gray-500">Budget:</span>
              <span class="font-medium ml-1">
                {{ formatCurrency(campaign.budget) }}
              </span>
            </div>
            <div class="text-sm flex items-center">
              <Icon
                name="heroicons:arrow-trending-down"
                class="w-4 h-4 mr-1 text-red-500"
              />
              <span class="text-gray-500">Spent:</span>
              <span class="font-medium ml-1">
                {{ formatCurrency(campaign.spent) }}
              </span>
            </div>
          </div>

          <div
            class="flex items-center justify-between text-sm text-gray-500 mb-4"
          >
            <div class="flex items-center">
              <Icon
                name="heroicons:calendar"
                class="w-4 h-4 mr-1 text-indigo-500"
              />
              <span>Starts: {{ formatDate(campaign.start_date) }}</span>
            </div>
            <div class="flex items-center">
              <Icon
                name="heroicons:calendar-days"
                class="w-4 h-4 mr-1 text-pink-500"
              />
              <span>Ends: {{ formatDate(campaign.end_date) }}</span>
            </div>
          </div>

          <!-- Stats -->
          <div
            class="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-xl shadow-sm mb-4"
          >
            <div class="text-center">
              <div class="text-lg font-bold text-indigo-600">
                {{ campaign.stats.views.toLocaleString() }}
              </div>
              <div
                class="text-xs text-gray-500 flex items-center justify-center gap-1"
              >
                <Icon name="heroicons:eye" class="w-4 h-4 text-indigo-400" />
                Views
              </div>
            </div>
            <div class="text-center">
              <div class="text-lg font-bold text-green-600">
                {{ campaign.stats.conversions.toLocaleString() }}
              </div>
              <div
                class="text-xs text-gray-500 flex items-center justify-center gap-1"
              >
                <Icon
                  name="heroicons:chart-bar"
                  class="w-4 h-4 text-green-400"
                />
                Conversions
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button
                @click="openViewModal(campaign)"
                class="p-2 rounded-lg bg-gray-100 text-green-500 hover:bg-green-100 hover:text-green-600 transition-colors"
                title="View Details"
              >
                <Icon name="heroicons:eye" class="w-4 h-4" />
              </button>
              <button
                @click="openEditModal(campaign)"
                class="p-2 rounded-lg bg-gray-100 text-blue-500 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                title="Edit Campaign"
              >
                <Icon name="heroicons:pencil" class="w-4 h-4" />
              </button>
            </div>

            <div class="flex items-center gap-2">
              <button
                v-if="campaign.status === 'draft'"
                @click="changeStatus(campaign, 'active')"
                class="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors shadow-sm"
              >
                Activate
              </button>
              <button
                v-if="campaign.status === 'active'"
                @click="changeStatus(campaign, 'completed')"
                class="px-3 py-1.5 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition-colors shadow-sm"
              >
                Complete
              </button>
              <button
                @click="deleteCampaign(campaign)"
                class="p-2 rounded-lg bg-gray-100 text-rose-500 hover:bg-red-100 hover:text-red-600 transition-colors"
                title="Delete Campaign"
              >
                <Icon name="heroicons:trash" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-if="filteredCampaigns.length === 0"
      class="text-center py-12 bg-white rounded-xl shadow-sm"
    >
      <Icon
        name="heroicons:rectangle-stack"
        class="w-16 h-16 text-gray-300 mx-auto mb-4"
      />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
      <p class="text-gray-500 mb-4">
        Get started by creating your first campaign.
      </p>
      <button
        @click="openCreateModal"
        class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
      >
        Create Campaign
      </button>
    </div>
  </AppLayout>

  <!-- Create Campaign Modal -->
  <Modal
    title="Create New Campaign"
    :isOpen="isCreateModalOpen"
    @modal-close="closeModal"
    size="lg"
  >
    <div class="p-6">
      <div class="grid grid-cols-1 gap-6">
        <!-- Campaign Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Campaign Title *</label
          >
          <input
            v-model="form.title"
            type="text"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter campaign title"
          />
        </div>

        <!-- Campaign Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Description</label
          >
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Describe your campaign"
          ></textarea>
        </div>

        <!-- Campaign Type and Audience -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Campaign Type</label
            >
            <select
              v-model="form.type"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="seasonal">Seasonal Sale</option>
              <option value="flash_sale">Flash Sale</option>
              <option value="product_launch">Product Launch</option>
              <option value="clearance">Clearance Sale</option>
              <option value="holiday">Holiday Special</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Target Audience</label
            >
            <select
              v-model="form.target_audience"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all_customers">All Customers</option>
              <option value="new_customers">New Customers</option>
              <option value="returning_customers">Returning Customers</option>
              <option value="premium_members">Premium Members</option>
              <option value="students">Students</option>
            </select>
          </div>
        </div>

        <!-- Dates -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Start Date *</label
            >
            <input
              v-model="form.start_date"
              type="date"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >End Date *</label
            >
            <input
              v-model="form.end_date"
              type="date"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <!-- Budget and Banner Position -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Budget (USD)</label
            >
            <input
              v-model="form.budget"
              type="number"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Enter budget amount"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Banner Position</label
            >
            <select
              v-model="form.banner_position"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="home_top">Home Page Top</option>
              <option value="category_top">Category Page Top</option>
              <option value="sidebar">Sidebar</option>
              <option value="popup">Popup</option>
            </select>
          </div>
        </div>

        <!-- Banner Image -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Banner Image</label
          >
          <div
            class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg"
          >
            <div class="space-y-1 text-center">
              <div class="flex text-sm text-gray-600 justify-center">
                <label
                  class="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark"
                >
                  <span>Upload a banner image</span>
                  <input
                    type="file"
                    class="sr-only"
                    @change="onBannerUpload"
                    accept="image/*"
                  />
                </label>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>
          </div>
          <div v-if="bannerPreview" class="mt-4 flex justify-center">
            <img
              :src="bannerPreview"
              class="h-32 rounded-lg object-cover shadow-md"
            />
          </div>
        </div>

        <!-- Featured Campaign -->
        <div class="flex items-center">
          <input
            v-model="form.is_featured"
            type="checkbox"
            id="featured"
            class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label for="featured" class="ml-2 text-sm text-gray-700"
            >Feature this campaign on homepage</label
          >
        </div>
      </div>

      <div class="mt-6 flex gap-3">
        <button
          @click="closeModal"
          class="p-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md hover:from-rose-600 hover:to-rose-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
        >
          <Icon
            name="material-symbols:close-rounded"
            class="text-white text-2xl group-hover:rotate-90 transition-transform duration-300"
          />
        </button>
        <button
          @click="createCampaign"
          class="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Create Campaign
        </button>
      </div>
    </div>
  </Modal>

  <!-- Edit Campaign Modal -->
  <Modal
    :title="`Edit Campaign: ${selectedCampaign?.title}`"
    :isOpen="isEditModalOpen"
    @modal-close="closeModal"
    size="lg"
  >
    <div class="p-6" v-if="selectedCampaign">
      <!-- Same form structure as create modal, pre-filled with campaign data -->
      <div class="grid grid-cols-1 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Campaign Title *</label
          >
          <input
            v-model="form.title"
            type="text"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Description</label
          >
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Campaign Type</label
            >
            <select
              v-model="form.type"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="seasonal">Seasonal Sale</option>
              <option value="flash_sale">Flash Sale</option>
              <option value="product_launch">Product Launch</option>
              <option value="clearance">Clearance Sale</option>
              <option value="holiday">Holiday Special</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Target Audience</label
            >
            <select
              v-model="form.target_audience"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all_customers">All Customers</option>
              <option value="new_customers">New Customers</option>
              <option value="returning_customers">Returning Customers</option>
              <option value="premium_members">Premium Members</option>
              <option value="students">Students</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Start Date *</label
            >
            <input
              v-model="form.start_date"
              type="date"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >End Date *</label
            >
            <input
              v-model="form.end_date"
              type="date"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Budget (USD)</label
            >
            <input
              v-model="form.budget"
              type="number"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Banner Position</label
            >
            <select
              v-model="form.banner_position"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="home_top">Home Page Top</option>
              <option value="category_top">Category Page Top</option>
              <option value="sidebar">Sidebar</option>
              <option value="popup">Popup</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Banner Image</label
          >
          <div
            class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg"
          >
            <div class="space-y-1 text-center">
              <div class="flex text-sm text-gray-600 justify-center">
                <label
                  class="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark"
                >
                  <span>Upload a new banner image</span>
                  <input
                    type="file"
                    class="sr-only"
                    @change="onBannerUpload"
                    accept="image/*"
                  />
                </label>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>
          </div>
          <div class="mt-4 flex justify-center">
            <img
              :src="bannerPreview || selectedCampaign.banner_image"
              class="h-32 rounded-lg object-cover shadow-md"
            />
          </div>
        </div>

        <div class="flex items-center">
          <input
            v-model="form.is_featured"
            type="checkbox"
            id="edit-featured"
            class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label for="edit-featured" class="ml-2 text-sm text-gray-700"
            >Feature this campaign on homepage</label
          >
        </div>
      </div>

      <div class="mt-6 flex gap-3">
        <button
          @click="closeModal"
          class="p-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md hover:from-rose-600 hover:to-rose-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
        >
          <Icon
            name="material-symbols:close-rounded"
            class="text-white text-2xl group-hover:rotate-90 transition-transform duration-300"
          />
        </button>
        <button
          @click="updateCampaign"
          class="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Update Campaign
        </button>
      </div>
    </div>
  </Modal>

  <!-- View Campaign Modal -->
  <Modal
    :title="selectedCampaign?.title"
    :isOpen="isViewModalOpen"
    @modal-close="closeModal"
    size="xl"
  >
    <div class="p-6" v-if="selectedCampaign">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Banner Image -->
        <div class="lg:col-span-2">
          <img
            :src="selectedCampaign.banner_image"
            :alt="selectedCampaign.title"
            class="w-full h-48 object-cover rounded-lg"
          />
        </div>

        <!-- Campaign Details -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900">Campaign Details</h3>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-sm text-gray-500">Status:</span>
              <span
                class="ml-2 px-2 py-1 rounded-full text-xs font-semibold capitalize"
                :class="{
                  'bg-green-100 text-green-800':
                    selectedCampaign.status === 'active',
                  'bg-blue-100 text-blue-800':
                    selectedCampaign.status === 'upcoming',
                  'bg-gray-100 text-gray-800':
                    selectedCampaign.status === 'completed',
                  'bg-yellow-100 text-yellow-800':
                    selectedCampaign.status === 'draft',
                }"
              >
                {{ selectedCampaign.status }}
              </span>
            </div>
            <div>
              <span class="text-sm text-gray-500">Type:</span>
              <span class="ml-2 font-medium capitalize">{{
                selectedCampaign.type.replace("_", " ")
              }}</span>
            </div>
            <div>
              <span class="text-sm text-gray-500">Audience:</span>
              <span class="ml-2 font-medium capitalize">{{
                selectedCampaign.target_audience.replace("_", " ")
              }}</span>
            </div>
            <div>
              <span class="text-sm text-gray-500">Featured:</span>
              <span class="ml-2 font-medium">{{
                selectedCampaign.is_featured ? "Yes" : "No"
              }}</span>
            </div>
          </div>

          <div>
            <span class="text-sm text-gray-500">Description:</span>
            <p class="mt-1 text-gray-700">{{ selectedCampaign.description }}</p>
          </div>
        </div>

        <!-- Statistics -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900">
            Campaign Performance
          </h3>

          <div class="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div class="text-center">
              <div class="text-2xl font-bold text-primary">
                {{ selectedCampaign.stats.views.toLocaleString() }}
              </div>
              <div class="text-sm text-gray-500">Total Views</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600">
                {{ selectedCampaign.stats.clicks.toLocaleString() }}
              </div>
              <div class="text-sm text-gray-500">Clicks</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600">
                {{ selectedCampaign.stats.conversions.toLocaleString() }}
              </div>
              <div class="text-sm text-gray-500">Conversions</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-600">
                {{ formatCurrency(selectedCampaign.stats.revenue) }}
              </div>
              <div class="text-sm text-gray-500">Revenue</div>
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Budget:</span>
              <span class="font-medium">{{
                formatCurrency(selectedCampaign.budget)
              }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Spent:</span>
              <span class="font-medium">{{
                formatCurrency(selectedCampaign.spent)
              }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500">Remaining:</span>
              <span class="font-medium">{{
                formatCurrency(selectedCampaign.budget - selectedCampaign.spent)
              }}</span>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="lg:col-span-2">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Campaign Timeline
          </h3>
          <div
            class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div class="text-center">
              <div class="text-sm text-gray-500">Start Date</div>
              <div class="font-medium">
                {{ formatDate(selectedCampaign.start_date) }}
              </div>
            </div>

            <div class="text-center">
              <div class="text-sm text-gray-500">End Date</div>
              <div class="font-medium">
                {{ formatDate(selectedCampaign.end_date) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <button
          @click="closeModal"
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
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
