<script setup>
import Modal from "@/components/Modal.vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import useAxios from "@/composables/useAxios.js";
import { toast } from "vue3-toastify";

const router = useRouter();
const { loading, error, sendRequest } = useAxios();

// Promotions data with online images
const promotions = ref([
  {
    id: 1,
    title: "Free Shipping on Orders Over $50",
    banner_image:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600",
    status: "active",
    type: "shipping",
    discount_type: "free_shipping",
    discount_value: 0,
    min_order_amount: 50,
    max_discount: null,
    start_date: "2024-12-01",
    end_date: "2024-12-31",
    usage_limit: null,
    used_count: 1245,
    customer_eligibility: "all_customers",
    product_scope: "all_products",
    coupon_code: "FREESHIP50",
    description:
      "Get free standard shipping on all orders over $50. No code needed!",
    featured: true,
    created_at: "2024-11-25",
    stats: {
      redemptions: 1245,
      revenue_impact: 62500,
      average_order_value: 85,
    },
  },
  {
    id: 2,
    title: "20% Off First Order",
    banner_image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
    status: "active",
    type: "discount",
    discount_type: "percentage",
    discount_value: 20,
    min_order_amount: 0,
    max_discount: 100,
    start_date: "2024-12-01",
    end_date: "2025-01-31",
    usage_limit: 1000,
    used_count: 856,
    customer_eligibility: "new_customers",
    product_scope: "all_products",
    coupon_code: "WELCOME20",
    description:
      "Welcome discount for new customers - 20% off your first order",
    featured: true,
    created_at: "2024-11-20",
    stats: {
      redemptions: 856,
      revenue_impact: 42800,
      average_order_value: 65,
    },
  },
  {
    id: 3,
    title: "Buy One Get One 50% Off",
    banner_image:
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=600",
    status: "active",
    type: "bogo",
    discount_type: "bogo",
    discount_value: 50,
    min_order_amount: 0,
    max_discount: null,
    start_date: "2024-12-15",
    end_date: "2024-12-25",
    usage_limit: 500,
    used_count: 234,
    customer_eligibility: "all_customers",
    product_scope: "selected_categories",
    coupon_code: "BOGO50",
    description:
      "Buy one item, get the second at 50% off. Perfect for holiday shopping!",
    featured: false,
    created_at: "2024-12-10",
    stats: {
      redemptions: 234,
      revenue_impact: 18720,
      average_order_value: 120,
    },
  },
  {
    id: 4,
    title: "Seasonal Clearance - Up to 60% Off",
    banner_image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
    status: "upcoming",
    type: "clearance",
    discount_type: "percentage",
    discount_value: 60,
    min_order_amount: 0,
    max_discount: null,
    start_date: "2024-12-26",
    end_date: "2025-01-15",
    usage_limit: null,
    used_count: 0,
    customer_eligibility: "all_customers",
    product_scope: "sale_items",
    coupon_code: "CLEARANCE60",
    description: "End of season clearance sale with discounts up to 60% off",
    featured: false,
    created_at: "2024-12-18",
    stats: {
      redemptions: 0,
      revenue_impact: 0,
      average_order_value: 0,
    },
  },

  {
    id: 6,
    title: "Student Discount - 25% Off",
    banner_image:
      "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=1200&auto=format&fit=crop",
    status: "draft",
    type: "student",
    discount_type: "percentage",
    discount_value: 25,
    min_order_amount: 25,
    max_discount: 50,
    start_date: "2025-01-15",
    end_date: "2025-06-30",
    usage_limit: 2000,
    used_count: 0,
    customer_eligibility: "students",
    product_scope: "all_products",
    coupon_code: "STUDENT25",
    description:
      "Special discount for students with valid student ID verification",
    featured: false,
    created_at: "2024-12-20",
    stats: {
      redemptions: 0,
      revenue_impact: 0,
      average_order_value: 0,
    },
  },
]);

// Form data
const form = ref({
  title: "",
  description: "",
  type: "discount",
  discount_type: "percentage",
  discount_value: "",
  min_order_amount: "",
  max_discount: "",
  start_date: "",
  end_date: "",
  usage_limit: "",
  customer_eligibility: "all_customers",
  product_scope: "all_products",
  coupon_code: "",
  featured: false,
  banner_image: null,
});

const bannerPreview = ref(null);
const searchQuery = ref("");
const filterStatus = ref("all");
const filterType = ref("all");

// Modal states
const isCreateModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isViewModalOpen = ref(false);
const selectedPromotion = ref(null);

// Handle banner image upload
const onBannerUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.banner_image = file;
    bannerPreview.value = URL.createObjectURL(file);
  }
};

// Generate coupon code
const generateCouponCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  form.value.coupon_code = code;
};

// Create new promotion
const createPromotion = async () => {
  if (!form.value.title || !form.value.start_date || !form.value.end_date) {
    toast.error("Please fill in all required fields", { theme: "dark" });
    return;
  }

  const newPromotion = {
    id: Math.max(...promotions.value.map((p) => p.id)) + 1,
    ...form.value,
    status: "draft",
    used_count: 0,
    created_at: new Date().toISOString().split("T")[0],
    stats: {
      redemptions: 0,
      revenue_impact: 0,
      average_order_value: 0,
    },
  };

  promotions.value.unshift(newPromotion);

  toast.success("Promotion created successfully!", { theme: "dark" });
  closeModal();
  resetForm();
};

// Update promotion
const updatePromotion = async () => {
  if (!selectedPromotion.value) return;

  const index = promotions.value.findIndex(
    (p) => p.id === selectedPromotion.value.id
  );
  if (index !== -1) {
    promotions.value[index] = {
      ...promotions.value[index],
      ...form.value,
    };

    toast.success("Promotion updated successfully!", { theme: "dark" });
    closeModal();
    resetForm();
  }
};

// Delete promotion
const deletePromotion = async (promotion) => {
  if (confirm(`Are you sure you want to delete "${promotion.title}"?`)) {
    promotions.value = promotions.value.filter((p) => p.id !== promotion.id);
    toast.success("Promotion deleted successfully!", { theme: "dark" });
  }
};

// Change promotion status
const changeStatus = (promotion, newStatus) => {
  const index = promotions.value.findIndex((p) => p.id === promotion.id);
  if (index !== -1) {
    promotions.value[index].status = newStatus;
    toast.success(`Promotion status changed to ${newStatus}`, {
      theme: "dark",
    });
  }
};

// Open modals
const openCreateModal = () => {
  resetForm();
  generateCouponCode();
  isCreateModalOpen.value = true;
};

const openEditModal = (promotion) => {
  selectedPromotion.value = promotion;
  form.value = { ...promotion };
  bannerPreview.value = promotion.banner_image;
  isEditModalOpen.value = true;
};

const openViewModal = (promotion) => {
  selectedPromotion.value = promotion;
  isViewModalOpen.value = true;
};

// Close modal
const closeModal = () => {
  isCreateModalOpen.value = false;
  isEditModalOpen.value = false;
  isViewModalOpen.value = false;
  selectedPromotion.value = null;
};

// Reset form
const resetForm = () => {
  form.value = {
    title: "",
    description: "",
    type: "discount",
    discount_type: "percentage",
    discount_value: "",
    min_order_amount: "",
    max_discount: "",
    start_date: "",
    end_date: "",
    usage_limit: "",
    customer_eligibility: "all_customers",
    product_scope: "all_products",
    coupon_code: "",
    featured: false,
    banner_image: null,
  };
  bannerPreview.value = null;
};

// Computed properties
const filteredPromotions = computed(() => {
  let filtered = promotions.value;

  if (searchQuery.value) {
    filtered = filtered.filter(
      (promotion) =>
        promotion.title
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        promotion.coupon_code
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
    );
  }

  if (filterStatus.value !== "all") {
    filtered = filtered.filter(
      (promotion) => promotion.status === filterStatus.value
    );
  }

  if (filterType.value !== "all") {
    filtered = filtered.filter(
      (promotion) => promotion.type === filterType.value
    );
  }

  return filtered;
});

const promotionStats = computed(() => {
  return {
    total: promotions.value.length,
    active: promotions.value.filter((p) => p.status === "active").length,
    upcoming: promotions.value.filter((p) => p.status === "upcoming").length,
    draft: promotions.value.filter((p) => p.status === "draft").length,
  };
});

// Helper functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getStatusColor = (status) => {
  const colors = {
    active: "green",
    upcoming: "blue",
    draft: "yellow",
  };
  return colors[status] || "gray";
};

const getPromotionTypeIcon = (type) => {
  const icons = {
    discount: "heroicons:ticket",
    shipping: "heroicons:truck",
    bogo: "heroicons:gift",
    loyalty: "heroicons:star",
    student: "heroicons:academic-cap",
    clearance: "heroicons:tag",
  };
  return icons[type] || "heroicons:megaphone";
};

const getDiscountText = (promotion) => {
  switch (promotion.discount_type) {
    case "free_shipping":
      return "Free Shipping";
    case "percentage":
      return `${promotion.discount_value}% OFF`;
    case "fixed":
      return `${formatCurrency(promotion.discount_value)} OFF`;
    case "bogo":
      return `BOGO ${promotion.discount_value}% OFF`;
    default:
      return "Discount";
  }
};

const getUsageProgress = (promotion) => {
  if (!promotion.usage_limit) return 0;
  return (promotion.used_count / promotion.usage_limit) * 100;
};

onMounted(() => {
  // In a real app, you would fetch promotions from API here
});
</script>

<template>
  <AppLayout>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!-- Total Promotions -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-purple-500/10 to-purple-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-purple-600/80"
            >
              Total Promotions
            </p>
            <p class="text-3xl font-bold text-purple-900">
              {{ promotionStats.total }}
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-purple-500/20 text-purple-600"
          >
            <Icon name="heroicons:megaphone" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Active Promotions -->
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
              {{ promotionStats.active }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-green-500/20 text-green-600">
            <Icon name="heroicons:play" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Upcoming Promotions -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-blue-500/10 to-blue-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-blue-600/80"
            >
              Upcoming
            </p>
            <p class="text-3xl font-bold text-blue-900">
              {{ promotionStats.upcoming }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-blue-500/20 text-blue-600">
            <Icon name="heroicons:clock" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Draft Promotions -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-yellow-500/10 to-yellow-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-yellow-600/80"
            >
              Draft
            </p>
            <p class="text-3xl font-bold text-yellow-900">
              {{ promotionStats.draft }}
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-yellow-500/20 text-yellow-600"
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
        <h2 class="text-2xl font-bold text-gray-900">Promotions Management</h2>
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
            class="pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full lg:w-64"
            placeholder="Search promotions..."
          />
        </div>

        <button
          @click="openCreateModal"
          class="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Icon name="heroicons:plus" class="w-5 h-5" />
          New Promotion
        </button>
      </div>
    </div>
    <!-- Filters -->
    <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
      <div class="flex flex-wrap items-center gap-6">
        <div class="flex items-center gap-4">
          <span class="text-sm font-medium text-cyan-700"
            >Filter by status:</span
          >
          <div class="flex flex-wrap gap-2">
            <button
              v-for="status in ['all', 'active', 'upcoming', 'draft']"
              :key="status"
              @click="filterStatus = status"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              :class="{
                'bg-purple-500 text-white': filterStatus === status,
                'bg-gray-200 text-gray-700 hover:bg-gray-200':
                  filterStatus !== status,
              }"
            >
              {{ status.charAt(0).toUpperCase() + status.slice(1) }}
            </button>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <span class="text-sm font-medium text-cyan-700">Filter by type:</span>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="type in [
                'alls',
                'discount',
                'shipping',
                'bogo',
                'loyalty',
                'student',
                'clearance',
              ]"
              :key="type"
              @click="filterType = type"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize"
              :class="{
                'bg-pink-500 text-white': filterType === type,
                'bg-gray-200 text-gray-700 hover:bg-gray-200':
                  filterType !== type,
              }"
            >
              {{ type.replace("_", " ") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Promotions Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="promotion in filteredPromotions"
        :key="promotion.id"
        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        <!-- Banner Image -->
        <div class="h-52 relative overflow-hidden">
          <img
            :src="promotion.banner_image"
            :alt="promotion.title"
            class="w-full h-full object-cover"
          />

          <!-- Gradient Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
          ></div>

          <!-- Status Badge -->
          <div class="absolute top-3 right-3">
            <span
              class="px-2 py-1 rounded-full text-xs font-semibold capitalize"
              :class="{
                'bg-green-100 text-green-800': promotion.status === 'active',
                'bg-blue-100 text-blue-800': promotion.status === 'upcoming',
                'bg-yellow-100 text-yellow-800': promotion.status === 'draft',
              }"
            >
              {{ promotion.status }}
            </span>
          </div>

          <!-- Discount Badge -->
          <div class="absolute top-3 left-3">
            <span
              class="px-2 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold shadow-lg"
            >
              {{ getDiscountText(promotion) }}
            </span>
          </div>

          <!-- Coupon Code -->
          <div class="absolute bottom-3 left-3">
            <span
              class="px-2 py-1 rounded bg-black/70 text-white text-xs font-mono"
            >
              {{ promotion.coupon_code }}
            </span>
          </div>

          <!-- Featured Badge -->
          <div v-if="promotion.featured" class="absolute bottom-3 right-3">
            <span
              class="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold"
            >
              Featured
            </span>
          </div>
        </div>

        <!-- Promotion Details -->
        <div class="p-5">
          <div class="flex items-start justify-between mb-3">
            <h3 class="text-lg font-semibold text-gray-900 flex-1">
              {{ promotion.title }}
            </h3>
            <Icon
              :name="getPromotionTypeIcon(promotion.type)"
              class="w-5 h-5 text-purple-500 ml-2"
            />
          </div>

          <p class="text-gray-600 text-sm mb-4 line-clamp-2">
            {{ promotion.description }}
          </p>

          <!-- Promotion Details -->
          <div class="grid grid-cols-2 gap-3 mb-4">
            <div class="text-sm">
              <span class="text-gray-500">Min Order:</span>
              <span class="font-medium ml-1">{{
                promotion.min_order_amount
                  ? formatCurrency(promotion.min_order_amount)
                  : "None"
              }}</span>
            </div>
            <div class="text-sm">
              <span class="text-gray-500">Eligibility:</span>
              <span class="font-medium ml-1 capitalize">{{
                promotion.customer_eligibility.replace("_", " ")
              }}</span>
            </div>
          </div>

          <!-- Usage Progress -->
          <div v-if="promotion.usage_limit" class="mb-4">
            <div class="flex justify-between text-xs text-gray-600 mb-1">
              <span
                >Usage: {{ promotion.used_count }}/{{
                  promotion.usage_limit
                }}</span
              >
              <span>{{ getUsageProgress(promotion).toFixed(1) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="h-2 rounded-full transition-all duration-500 ease-out"
                :class="{
                  'bg-green-500': getUsageProgress(promotion) <= 70,
                  'bg-yellow-500':
                    getUsageProgress(promotion) > 70 &&
                    getUsageProgress(promotion) <= 90,
                  'bg-red-500': getUsageProgress(promotion) > 90,
                }"
                :style="{ width: getUsageProgress(promotion) + '%' }"
              ></div>
            </div>
          </div>

          <!-- Dates -->
          <div
            class="flex items-center justify-between text-sm text-gray-500 mb-4"
          >
            <span>Starts: {{ formatDate(promotion.start_date) }}</span>
            <span>Ends: {{ formatDate(promotion.end_date) }}</span>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg mb-4">
            <div class="text-center">
              <div class="text-sm font-bold text-purple-600">
                {{ promotion.stats.redemptions }}
              </div>
              <div class="text-xs text-gray-500">Redemptions</div>
            </div>
            <div class="text-center">
              <div class="text-sm font-bold text-green-600">
                {{ formatCurrency(promotion.stats.revenue_impact) }}
              </div>
              <div class="text-xs text-gray-500">Revenue</div>
            </div>
            <div class="text-center">
              <div class="text-sm font-bold text-blue-600">
                {{ formatCurrency(promotion.stats.average_order_value) }}
              </div>
              <div class="text-xs text-gray-500">Avg Order</div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button
                @click="openViewModal(promotion)"
                class="p-2 bg-gray-100 text-green-500 hover:bg-green-100 hover:text-green-600 transition-colors"
                title="View Details"
              >
                <Icon name="heroicons:eye" class="w-4 h-4" />
              </button>
              <button
                @click="openEditModal(promotion)"
                class="p-2 bg-gray-100 text-blue-500 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                title="Edit Promotion"
              >
                <Icon name="heroicons:pencil" class="w-4 h-4" />
              </button>
            </div>

            <div class="flex items-center gap-2">
              <button
                v-if="promotion.status === 'draft'"
                @click="changeStatus(promotion, 'active')"
                class="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
              >
                Activate
              </button>
              <button
                v-if="promotion.status === 'active'"
                @click="changeStatus(promotion, 'draft')"
                class="px-3 py-1.5 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors"
              >
                Pause
              </button>
              <button
                @click="deletePromotion(promotion)"
                class="p-2 rounded-lg bg-gray-100 text-rose-500 hover:bg-red-100 hover:text-red-600 transition-colors"
                title="Delete Promotion"
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
      v-if="filteredPromotions.length === 0"
      class="text-center py-12 bg-white rounded-xl shadow-sm"
    >
      <Icon
        name="heroicons:megaphone"
        class="w-16 h-16 text-gray-300 mx-auto mb-4"
      />
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        No promotions found
      </h3>
      <p class="text-gray-500 mb-4">
        Create your first promotion to attract more customers!
      </p>
      <button
        @click="openCreateModal"
        class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
      >
        Create Promotion
      </button>
    </div>
  </AppLayout>

  <!-- Create Promotion Modal -->
  <Modal
    title="Create New Promotion"
    :isOpen="isCreateModalOpen"
    @modal-close="closeModal"
    size="2xl"
  >
    <div class="p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left Column -->
        <div class="space-y-6">
          <!-- Basic Information -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h4>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Promotion Title *</label
              >
              <input
                v-model="form.title"
                type="text"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Free Shipping on Orders Over $50"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Description</label
              >
              <textarea
                v-model="form.description"
                rows="3"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe your promotion"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Promotion Type</label
                >
                <select
                  v-model="form.type"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="discount">Discount</option>
                  <option value="shipping">Shipping</option>
                  <option value="bogo">Buy One Get One</option>
                  <option value="loyalty">Loyalty</option>
                  <option value="student">Student</option>
                  <option value="clearance">Clearance</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Discount Type</label
                >
                <select
                  v-model="form.discount_type"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                  <option value="free_shipping">Free Shipping</option>
                  <option value="bogo">BOGO</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Coupon Settings -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Coupon Settings
            </h4>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Coupon Code</label
              >
              <div class="flex gap-2">
                <input
                  v-model="form.coupon_code"
                  type="text"
                  class="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
                  placeholder="Coupon code"
                />
                <button
                  @click="generateCouponCode"
                  class="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Generate
                </button>
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Usage Limit</label
              >
              <input
                v-model="form.usage_limit"
                type="number"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Leave empty for unlimited usage"
              />
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Discount Settings -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Discount Settings
            </h4>

            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Discount Value *</label
                >
                <input
                  v-model="form.discount_value"
                  type="number"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  :placeholder="
                    form.discount_type === 'percentage'
                      ? 'e.g., 20 for 20%'
                      : 'e.g., 50 for $50'
                  "
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Minimum Order Amount</label
                >
                <input
                  v-model="form.min_order_amount"
                  type="number"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 50 for $50 minimum"
                />
              </div>

              <div v-if="form.discount_type === 'percentage'">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Maximum Discount</label
                >
                <input
                  v-model="form.max_discount"
                  type="number"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Optional maximum discount amount"
                />
              </div>
            </div>
          </div>

          <!-- Eligibility Settings -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Eligibility Settings
            </h4>

            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Customer Eligibility</label
                >
                <select
                  v-model="form.customer_eligibility"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all_customers">All Customers</option>
                  <option value="new_customers">New Customers Only</option>
                  <option value="returning_customers">
                    Returning Customers Only
                  </option>
                  <option value="loyalty_members">Loyalty Members Only</option>
                  <option value="students">Students Only</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Product Scope</label
                >
                <select
                  v-model="form.product_scope"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all_products">All Products</option>
                  <option value="selected_categories">
                    Selected Categories
                  </option>
                  <option value="selected_products">Selected Products</option>
                  <option value="sale_items">Sale Items Only</option>
                  <option value="excluded_categories">
                    Exclude Categories
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Date Settings -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Schedule</h4>

            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Start Date *</label
                >
                <input
                  v-model="form.start_date"
                  type="date"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >End Date *</label
                >
                <input
                  v-model="form.end_date"
                  type="date"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <!-- Banner Image -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Banner Image
            </h4>

            <div
              class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 transition-all duration-200 hover:border-purple-400"
            >
              <div v-if="bannerPreview" class="mb-4">
                <img
                  :src="bannerPreview"
                  alt="Banner preview"
                  class="w-full h-32 object-cover rounded-lg"
                />
              </div>

              <div v-else class="text-center mb-4">
                <Icon
                  name="heroicons:photo"
                  class="w-12 h-12 text-gray-400 mx-auto mb-2"
                />
                <p class="text-sm text-gray-500">
                  Upload a banner image for your promotion
                </p>
              </div>

              <input
                type="file"
                id="banner-upload"
                accept="image/*"
                @change="onBannerUpload"
                class="hidden"
              />
              <label
                for="banner-upload"
                class="cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Choose Image
              </label>
            </div>
          </div>

          <!-- Featured Promotion -->
          <div
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Featured Promotion</label
              >
              <p class="text-xs text-gray-500">
                Feature this promotion on the homepage
              </p>
            </div>
            <button
              @click="form.featured = !form.featured"
              class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              :class="form.featured ? 'bg-purple-500' : 'bg-gray-200'"
              role="switch"
            >
              <span
                aria-hidden="true"
                class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                :class="form.featured ? 'translate-x-5' : 'translate-x-0'"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
        <button
          @click="closeModal"
          class="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          @click="createPromotion"
          class="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
        >
          Create Promotion
        </button>
      </div>
    </div>
  </Modal>

  <!-- Edit Promotion Modal -->
  <Modal
    title="Edit Promotion"
    :isOpen="isEditModalOpen"
    @modal-close="closeModal"
    size="2xl"
  >
    <div class="p-6">
      <!-- Same form structure as create modal -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left Column -->
        <div class="space-y-6">
          <!-- Basic Information -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h4>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Promotion Title *</label
              >
              <input
                v-model="form.title"
                type="text"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Free Shipping on Orders Over $50"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Description</label
              >
              <textarea
                v-model="form.description"
                rows="3"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe your promotion"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Promotion Type</label
                >
                <select
                  v-model="form.type"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="discount">Discount</option>
                  <option value="shipping">Shipping</option>
                  <option value="bogo">Buy One Get One</option>
                  <option value="loyalty">Loyalty</option>
                  <option value="student">Student</option>
                  <option value="clearance">Clearance</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Discount Type</label
                >
                <select
                  v-model="form.discount_type"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                  <option value="free_shipping">Free Shipping</option>
                  <option value="bogo">BOGO</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Coupon Settings -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Coupon Settings
            </h4>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Coupon Code</label
              >
              <div class="flex gap-2">
                <input
                  v-model="form.coupon_code"
                  type="text"
                  class="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono"
                  placeholder="Coupon code"
                />
                <button
                  @click="generateCouponCode"
                  class="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Generate
                </button>
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Usage Limit</label
              >
              <input
                v-model="form.usage_limit"
                type="number"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Leave empty for unlimited usage"
              />
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Discount Settings -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Discount Settings
            </h4>

            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Discount Value *</label
                >
                <input
                  v-model="form.discount_value"
                  type="number"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  :placeholder="
                    form.discount_type === 'percentage'
                      ? 'e.g., 20 for 20%'
                      : 'e.g., 50 for $50'
                  "
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Minimum Order Amount</label
                >
                <input
                  v-model="form.min_order_amount"
                  type="number"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., 50 for $50 minimum"
                />
              </div>

              <div v-if="form.discount_type === 'percentage'">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Maximum Discount</label
                >
                <input
                  v-model="form.max_discount"
                  type="number"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Optional maximum discount amount"
                />
              </div>
            </div>
          </div>

          <!-- Eligibility Settings -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Eligibility Settings
            </h4>

            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Customer Eligibility</label
                >
                <select
                  v-model="form.customer_eligibility"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all_customers">All Customers</option>
                  <option value="new_customers">New Customers Only</option>
                  <option value="returning_customers">
                    Returning Customers Only
                  </option>
                  <option value="loyalty_members">Loyalty Members Only</option>
                  <option value="students">Students Only</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Product Scope</label
                >
                <select
                  v-model="form.product_scope"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all_products">All Products</option>
                  <option value="selected_categories">
                    Selected Categories
                  </option>
                  <option value="selected_products">Selected Products</option>
                  <option value="sale_items">Sale Items Only</option>
                  <option value="excluded_categories">
                    Exclude Categories
                  </option>
                </select>
              </div>
            </div>
          </div>

          <!-- Date Settings -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Schedule</h4>

            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Start Date *</label
                >
                <input
                  v-model="form.start_date"
                  type="date"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >End Date *</label
                >
                <input
                  v-model="form.end_date"
                  type="date"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <!-- Banner Image -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Banner Image
            </h4>

            <div
              class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 transition-all duration-200 hover:border-purple-400"
            >
              <div v-if="bannerPreview" class="mb-4">
                <img
                  :src="bannerPreview"
                  alt="Banner preview"
                  class="w-full h-32 object-cover rounded-lg"
                />
              </div>

              <div v-else class="text-center mb-4">
                <Icon
                  name="heroicons:photo"
                  class="w-12 h-12 text-gray-400 mx-auto mb-2"
                />
                <p class="text-sm text-gray-500">
                  Upload a banner image for your promotion
                </p>
              </div>

              <input
                type="file"
                id="banner-upload-edit"
                accept="image/*"
                @change="onBannerUpload"
                class="hidden"
              />
              <label
                for="banner-upload-edit"
                class="cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Choose Image
              </label>
            </div>
          </div>

          <!-- Featured Promotion -->
          <div
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Featured Promotion</label
              >
              <p class="text-xs text-gray-500">
                Feature this promotion on the homepage
              </p>
            </div>
            <button
              @click="form.featured = !form.featured"
              class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              :class="form.featured ? 'bg-purple-500' : 'bg-gray-200'"
              role="switch"
            >
              <span
                aria-hidden="true"
                class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                :class="form.featured ? 'translate-x-5' : 'translate-x-0'"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
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
          @click="updatePromotion"
          class="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all font-medium"
        >
          Update Promotion
        </button>
      </div>
    </div>
  </Modal>

  <!-- View Promotion Modal -->
  <Modal
    :title="selectedPromotion?.title"
    :isOpen="isViewModalOpen"
    @modal-close="closeModal"
    size="lg"
  >
    <div class="p-6" v-if="selectedPromotion">
      <!-- Banner Image -->
      <div class="h-48 rounded-lg overflow-hidden mb-6">
        <img
          :src="selectedPromotion.banner_image"
          :alt="selectedPromotion.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Promotion Details -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Basic Info -->
        <div>
          <h4 class="text-lg font-semibold text-gray-900 mb-4">
            Promotion Details
          </h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Status:</span>
              <span
                class="font-medium capitalize"
                :class="{
                  'text-green-600': selectedPromotion.status === 'active',
                  'text-blue-600': selectedPromotion.status === 'upcoming',
                  'text-yellow-600': selectedPromotion.status === 'draft',
                }"
              >
                {{ selectedPromotion.status }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Type:</span>
              <span class="font-medium capitalize">{{
                selectedPromotion.type
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Coupon Code:</span>
              <span class="font-mono font-bold text-purple-600">{{
                selectedPromotion.coupon_code
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Featured:</span>
              <span
                class="font-medium"
                :class="
                  selectedPromotion.featured
                    ? 'text-green-600'
                    : 'text-gray-600'
                "
              >
                {{ selectedPromotion.featured ? "Yes" : "No" }}
              </span>
            </div>
          </div>
        </div>

        <!-- Discount Info -->
        <div>
          <h4 class="text-lg font-semibold text-gray-900 mb-4">
            Discount Information
          </h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Discount:</span>
              <span class="font-bold text-green-600">{{
                getDiscountText(selectedPromotion)
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Min Order:</span>
              <span class="font-medium">{{
                selectedPromotion.min_order_amount
                  ? formatCurrency(selectedPromotion.min_order_amount)
                  : "None"
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Max Discount:</span>
              <span class="font-medium">{{
                selectedPromotion.max_discount
                  ? formatCurrency(selectedPromotion.max_discount)
                  : "None"
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Usage Limit:</span>
              <span class="font-medium">{{
                selectedPromotion.usage_limit || "Unlimited"
              }}</span>
            </div>
          </div>
        </div>

        <!-- Eligibility -->
        <div>
          <h4 class="text-lg font-semibold text-gray-900 mb-4">Eligibility</h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Customers:</span>
              <span class="font-medium capitalize">{{
                selectedPromotion.customer_eligibility.replace("_", " ")
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Products:</span>
              <span class="font-medium capitalize">{{
                selectedPromotion.product_scope.replace("_", " ")
              }}</span>
            </div>
          </div>
        </div>

        <!-- Schedule -->
        <div>
          <h4 class="text-lg font-semibold text-gray-900 mb-4">Schedule</h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Starts:</span>
              <span class="font-medium">{{
                formatDate(selectedPromotion.start_date)
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Ends:</span>
              <span class="font-medium">{{
                formatDate(selectedPromotion.end_date)
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Created:</span>
              <span class="font-medium">{{
                formatDate(selectedPromotion.created_at)
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 class="text-lg font-semibold text-gray-900 mb-4">
          Performance Stats
        </h4>
        <div class="grid grid-cols-3 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600">
              {{ selectedPromotion.stats.redemptions }}
            </div>
            <div class="text-sm text-gray-600">Redemptions</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">
              {{ formatCurrency(selectedPromotion.stats.revenue_impact) }}
            </div>
            <div class="text-sm text-gray-600">Revenue Impact</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">
              {{ formatCurrency(selectedPromotion.stats.average_order_value) }}
            </div>
            <div class="text-sm text-gray-600">Avg Order Value</div>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="mt-6">
        <h4 class="text-lg font-semibold text-gray-900 mb-2">Description</h4>
        <p class="text-gray-600">{{ selectedPromotion.description }}</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
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
