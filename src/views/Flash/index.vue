<script setup>
import Modal from "@/components/Modal.vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import useAxios from "@/composables/useAxios.js";
import { toast } from "vue3-toastify";

const router = useRouter();
const { loading, error, sendRequest } = useAxios();

// Flash Sale data
const flashSales = ref([
  {
    id: 1,
    title: "24-Hour Electronics Flash Sale",
    banner_image:
      "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=600",
    status: "active",
    start_time: "2024-12-20T10:00:00",
    end_time: "2024-12-21T10:00:00",
    type: "flash_sale",
    discount_type: "percentage",
    discount_value: 40,
    max_discount: 1000,
    min_order_amount: 0,
    products_count: 45,
    categories: ["electronics", "gadgets"],
    featured: true,
    created_at: "2024-12-19",
    stats: {
      views: 15420,
      clicks: 3245,
      orders: 890,
      revenue: 125000,
      conversion_rate: 27.4,
    },
    timer: {
      days: 0,
      hours: 8,
      minutes: 23,
      seconds: 45,
    },
  },
  {
    id: 2,
    title: "Weekend Fashion Blitz",
    banner_image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600",
    status: "upcoming",
    start_time: "2024-12-23T00:00:00",
    end_time: "2024-12-25T23:59:59",
    type: "flash_sale",
    discount_type: "fixed",
    discount_value: 50,
    max_discount: null,
    min_order_amount: 100,
    products_count: 78,
    categories: ["fashion", "clothing"],
    featured: false,
    created_at: "2024-12-18",
    stats: {
      views: 0,
      clicks: 0,
      orders: 0,
      revenue: 0,
      conversion_rate: 0,
    },
    timer: {
      days: 2,
      hours: 15,
      minutes: 42,
      seconds: 18,
    },
  },
  {
    id: 3,
    title: "Black Friday Early Access",
    banner_image:
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=600",
    status: "completed",
    start_time: "2024-11-25T00:00:00",
    end_time: "2024-11-25T23:59:59",
    type: "flash_sale",
    discount_type: "percentage",
    discount_value: 60,
    max_discount: 500,
    min_order_amount: 50,
    products_count: 156,
    categories: ["all"],
    featured: true,
    created_at: "2024-11-20",
    stats: {
      views: 89200,
      clicks: 21560,
      orders: 4560,
      revenue: 780000,
      conversion_rate: 21.1,
    },
    timer: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  },
  {
    id: 4,
    title: "New Year Tech Clearance",
    banner_image:
      "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=1200&auto=format&fit=crop",
    status: "draft",
    start_time: "2024-12-31T18:00:00",
    end_time: "2025-01-01T23:59:59",
    type: "flash_sale",
    discount_type: "percentage",
    discount_value: 35,
    max_discount: 750,
    min_order_amount: 0,
    products_count: 0,
    categories: ["electronics", "home_appliances"],
    featured: false,
    created_at: "2024-12-15",
    stats: {
      views: 0,
      clicks: 0,
      orders: 0,
      revenue: 0,
      conversion_rate: 0,
    },
    timer: {
      days: 11,
      hours: 6,
      minutes: 12,
      seconds: 33,
    },
  },
]);

// Form data
const form = ref({
  title: "",
  description: "",
  start_time: "",
  end_time: "",
  discount_type: "percentage",
  discount_value: "",
  max_discount: "",
  min_order_amount: "",
  categories: [],
  featured: false,
  banner_image: null,
});

const bannerPreview = ref(null);
const searchQuery = ref("");
const filterStatus = ref("all");

// Modal states
const isCreateModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isViewModalOpen = ref(false);
const selectedSale = ref(null);

// Timer update function
const updateTimers = () => {
  flashSales.value.forEach((sale) => {
    if (sale.status === "active" || sale.status === "upcoming") {
      const now = new Date();
      const start = new Date(sale.start_time);
      const end = new Date(sale.end_time);

      if (now < start) {
        // Upcoming sale
        const diff = start - now;
        sale.timer = {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        };

        // Auto-activate when start time reached
        if (diff <= 0) {
          sale.status = "active";
        }
      } else if (now >= start && now <= end) {
        // Active sale
        const diff = end - now;
        sale.timer = {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        };

        // Auto-complete when end time reached
        if (diff <= 0) {
          sale.status = "completed";
        }
      }
    }
  });
};

// Handle banner image upload
const onBannerUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.banner_image = file;
    bannerPreview.value = URL.createObjectURL(file);
  }
};

// Create new flash sale
const createFlashSale = async () => {
  if (!form.value.title || !form.value.start_time || !form.value.end_time) {
    toast.error("Please fill in all required fields", { theme: "dark" });
    return;
  }

  const newSale = {
    id: Math.max(...flashSales.value.map((s) => s.id)) + 1,
    ...form.value,
    status: "draft",
    type: "flash_sale",
    products_count: 0,
    created_at: new Date().toISOString().split("T")[0],
    stats: {
      views: 0,
      clicks: 0,
      orders: 0,
      revenue: 0,
      conversion_rate: 0,
    },
    timer: {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  };

  flashSales.value.unshift(newSale);

  toast.success("Flash Sale created successfully!", { theme: "dark" });
  closeModal();
  resetForm();
};

// Update flash sale
const updateFlashSale = async () => {
  if (!selectedSale.value) return;

  const index = flashSales.value.findIndex(
    (s) => s.id === selectedSale.value.id
  );
  if (index !== -1) {
    flashSales.value[index] = {
      ...flashSales.value[index],
      ...form.value,
    };

    toast.success("Flash Sale updated successfully!", { theme: "dark" });
    closeModal();
    resetForm();
  }
};

// Delete flash sale
const deleteFlashSale = async (sale) => {
  if (confirm(`Are you sure you want to delete "${sale.title}"?`)) {
    flashSales.value = flashSales.value.filter((s) => s.id !== sale.id);
    toast.success("Flash Sale deleted successfully!", { theme: "dark" });
  }
};

// Change sale status
const changeStatus = (sale, newStatus) => {
  const index = flashSales.value.findIndex((s) => s.id === sale.id);
  if (index !== -1) {
    flashSales.value[index].status = newStatus;
    toast.success(`Flash Sale status changed to ${newStatus}`, {
      theme: "dark",
    });
  }
};

// Open modals
const openCreateModal = () => {
  resetForm();
  isCreateModalOpen.value = true;
};

const openEditModal = (sale) => {
  selectedSale.value = sale;
  form.value = { ...sale };
  bannerPreview.value = sale.banner_image;
  isEditModalOpen.value = true;
};

const openViewModal = (sale) => {
  selectedSale.value = sale;
  isViewModalOpen.value = true;
};

// Close modal
const closeModal = () => {
  isCreateModalOpen.value = false;
  isEditModalOpen.value = false;
  isViewModalOpen.value = false;
  selectedSale.value = null;
};

// Reset form
const resetForm = () => {
  form.value = {
    title: "",
    description: "",
    start_time: "",
    end_time: "",
    discount_type: "percentage",
    discount_value: "",
    max_discount: "",
    min_order_amount: "",
    categories: [],
    featured: false,
    banner_image: null,
  };
  bannerPreview.value = null;
};

// Computed properties
const filteredSales = computed(() => {
  let filtered = flashSales.value;

  if (searchQuery.value) {
    filtered = filtered.filter((sale) =>
      sale.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (filterStatus.value !== "all") {
    filtered = filtered.filter((sale) => sale.status === filterStatus.value);
  }

  return filtered;
});

const flashSaleStats = computed(() => {
  return {
    total: flashSales.value.length,
    active: flashSales.value.filter((s) => s.status === "active").length,
    upcoming: flashSales.value.filter((s) => s.status === "upcoming").length,
    completed: flashSales.value.filter((s) => s.status === "completed").length,
    draft: flashSales.value.filter((s) => s.status === "draft").length,
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
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusColor = (status) => {
  const colors = {
    active: "green",
    upcoming: "blue",
    completed: "gray",
    draft: "yellow",
  };
  return colors[status] || "gray";
};

const getDiscountText = (sale) => {
  if (sale.discount_type === "percentage") {
    return `${sale.discount_value}% OFF`;
  } else {
    return `${formatCurrency(sale.discount_value)} OFF`;
  }
};

// Start timer updates
onMounted(() => {
  updateTimers();
  setInterval(updateTimers, 1000);
});
</script>

<template>
  <AppLayout>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <!-- Total Flash Sales -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-red-500/10 to-red-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-red-600/80"
            >
              Total
            </p>
            <p class="text-3xl font-bold text-red-900">
              {{ flashSaleStats.total }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-red-500/20 text-red-600">
            <Icon name="heroicons:bolt" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Active Flash Sales -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-green-500/10 to-green-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-green-600/80"
            >
              Live Now
            </p>
            <p class="text-3xl font-bold text-green-900">
              {{ flashSaleStats.active }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-green-500/20 text-green-600">
            <Icon name="heroicons:play" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Upcoming Flash Sales -->
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
              {{ flashSaleStats.upcoming }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-blue-500/20 text-blue-600">
            <Icon name="heroicons:clock" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Completed Flash Sales -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-gray-500/10 to-gray-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-gray-600/80"
            >
              Completed
            </p>
            <p class="text-3xl font-bold text-gray-900">
              {{ flashSaleStats.completed }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-gray-500/20 text-gray-600">
            <Icon name="heroicons:check-badge" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Draft Flash Sales -->
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
              {{ flashSaleStats.draft }}
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
        <h2 class="text-2xl font-bold text-gray-900">Flash Sale Management</h2>
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
            placeholder="Search flash sales..."
          />
        </div>

        <button
          @click="openCreateModal"
          class="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2.5 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Icon name="heroicons:bolt" class="w-5 h-5" />
          New Flash Sale
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
              'completed',
              'draft',
            ]"
            :key="status"
            @click="filterStatus = status"
            class="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
            :class="{
              'bg-red-500 text-white': filterStatus === status,
              'bg-gray-200 text-gray-700 hover:bg-gray-200':
                filterStatus !== status,
            }"
          >
            {{ status.charAt(0).toUpperCase() + status.slice(1) }}
          </button>
        </div>
      </div>
    </div>

    <!-- Flash Sales Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="sale in filteredSales"
        :key="sale.id"
        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        <!-- Banner with Timer -->
        <div class="h-48 relative overflow-hidden">
          <!-- Banner Image -->
          <img
            :src="sale.banner_image"
            :alt="sale.title"
            class="w-full h-full object-cover"
          />

          <!-- Gradient Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          ></div>

          <!-- Status Badge -->
          <div class="absolute top-4 right-4">
            <span
              class="px-3 py-1.5 rounded-full text-xs font-semibold capitalize backdrop-blur-md border border-white/20"
              :class="{
                'bg-green-500/20 text-green-100': sale.status === 'active',
                'bg-blue-500/20 text-blue-100': sale.status === 'upcoming',
                'bg-gray-500/20 text-gray-100': sale.status === 'completed',
                'bg-yellow-500/20 text-yellow-100': sale.status === 'draft',
              }"
            >
              {{ sale.status }}
            </span>
          </div>

          <!-- Discount Badge -->
          <div class="absolute top-4 left-4">
            <span
              class="px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold shadow-lg"
            >
              {{ getDiscountText(sale) }}
            </span>
          </div>

          <!-- Countdown Timer -->
          <div
            v-if="sale.status === 'active' || sale.status === 'upcoming'"
            class="absolute bottom-4 left-4 right-4"
          >
            <div class="text-center mb-2">
              <span class="text-white text-sm font-semibold drop-shadow-lg">
                {{ sale.status === "active" ? "Ends in" : "Starts in" }}
              </span>
            </div>
            <div class="grid grid-cols-4 gap-2">
              <div
                v-for="(value, unit) in sale.timer"
                :key="unit"
                class="text-center"
              >
                <div class="bg-white/20 backdrop-blur-md rounded-lg p-2">
                  <div class="text-white font-bold text-lg">
                    {{ value.toString().padStart(2, "0") }}
                  </div>
                  <div class="text-white/80 text-xs uppercase">{{ unit }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sale Details -->
        <div class="p-5">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            {{ sale.title }}
          </h3>

          <!-- Sale Info -->
          <div class="grid grid-cols-2 gap-3 mb-4">
            <div class="flex items-center gap-2">
              <Icon
                name="heroicons:calendar"
                class="w-4 h-4 text-emerald-600"
              />
              <span class="text-sm text-gray-600">{{
                formatDate(sale.start_time)
              }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Icon name="heroicons:clock" class="w-4 h-4 text-red-600" />
              <span class="text-sm text-gray-600"
                >{{ sale.products_count }} products</span
              >
            </div>
          </div>

          <!-- Discount Details -->
          <div
            class="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-3 mb-4"
          >
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span class="text-gray-600">Discount:</span>
                <span class="font-semibold text-red-600 ml-1">{{
                  getDiscountText(sale)
                }}</span>
              </div>
              <div>
                <span class="text-gray-600">Min Order:</span>
                <span class="font-semibold ml-1">{{
                  sale.min_order_amount
                    ? formatCurrency(sale.min_order_amount)
                    : "None"
                }}</span>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div
            v-if="sale.status === 'active' || sale.status === 'completed'"
            class="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg mb-4"
          >
            <div class="text-center">
              <div class="text-sm font-bold text-red-600">
                {{ sale.stats.views.toLocaleString() }}
              </div>
              <div class="text-xs text-gray-500">Views</div>
            </div>
            <div class="text-center">
              <div class="text-sm font-bold text-green-600">
                {{ sale.stats.orders.toLocaleString() }}
              </div>
              <div class="text-xs text-gray-500">Orders</div>
            </div>
            <div class="text-center">
              <div class="text-sm font-bold text-blue-600">
                {{ sale.stats.conversion_rate }}%
              </div>
              <div class="text-xs text-gray-500">Conversion</div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button
                @click="openViewModal(sale)"
                class="p-2 bg-gray-100 text-green-500 hover:bg-green-100 hover:text-green-600 transition-colors"
                title="View Details"
              >
                <Icon name="heroicons:eye" class="w-4 h-4" />
              </button>
              <button
                @click="openEditModal(sale)"
                class="p-2 bg-gray-100 text-blue-500 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                title="Edit Sale"
              >
                <Icon name="heroicons:pencil" class="w-4 h-4" />
              </button>
            </div>

            <div class="flex items-center gap-2">
              <button
                v-if="sale.status === 'draft'"
                @click="changeStatus(sale, 'upcoming')"
                class="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
              >
                Activate
              </button>
              <button
                v-if="sale.status === 'active'"
                @click="changeStatus(sale, 'completed')"
                class="px-3 py-1.5 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition-colors shadow-sm"
              >
                End Sale
              </button>
              <button
                @click="deleteFlashSale(sale)"
                class="p-2 rounded-lg bg-gray-100 text-rose-500 hover:bg-red-100 hover:text-red-600 transition-colors"
                title="Delete Sale"
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
      v-if="filteredSales.length === 0"
      class="text-center py-12 bg-white rounded-xl shadow-sm"
    >
      <Icon
        name="heroicons:bolt"
        class="w-16 h-16 text-gray-300 mx-auto mb-4"
      />
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        No flash sales found
      </h3>
      <p class="text-gray-500 mb-4">
        Create your first flash sale to boost sales!
      </p>
      <button
        @click="openCreateModal"
        class="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
      >
        Create Flash Sale
      </button>
    </div>
  </AppLayout>

  <!-- Create Flash Sale Modal -->
  <Modal
    title="Create New Flash Sale"
    :isOpen="isCreateModalOpen"
    @modal-close="closeModal"
    size="lg"
  >
    <div class="p-6">
      <div class="grid grid-cols-1 gap-6">
        <!-- Flash Sale Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Flash Sale Title *</label
          >
          <input
            v-model="form.title"
            type="text"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="e.g., 24-Hour Electronics Flash Sale"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Description</label
          >
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Describe your flash sale"
          ></textarea>
        </div>

        <!-- Date and Time -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Start Time *</label
            >
            <input
              v-model="form.start_time"
              type="datetime-local"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >End Time *</label
            >
            <input
              v-model="form.end_time"
              type="datetime-local"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        <!-- Discount Settings -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Discount Type</label
            >
            <select
              v-model="form.discount_type"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Discount Value *</label
            >
            <input
              v-model="form.discount_value"
              type="number"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              :placeholder="
                form.discount_type === 'percentage' ? 'e.g., 40' : 'e.g., 50'
              "
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Max Discount</label
            >
            <input
              v-model="form.max_discount"
              type="number"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Optional"
            />
          </div>
        </div>

        <!-- Order Settings -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Minimum Order Amount</label
            >
            <input
              v-model="form.min_order_amount"
              type="number"
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="e.g., 100"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Categories</label
            >
            <select
              v-model="form.categories"
              multiple
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home & Kitchen</option>
              <option value="beauty">Beauty</option>
              <option value="sports">Sports</option>
              <option value="all">All Categories</option>
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
                  class="relative cursor-pointer rounded-md font-medium text-red-600 hover:text-red-500"
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

        <!-- Featured Sale -->
        <div class="flex items-center">
          <input
            v-model="form.featured"
            type="checkbox"
            id="featured"
            class="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
          />
          <label for="featured" class="ml-2 text-sm text-gray-700"
            >Feature this flash sale on homepage</label
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
          @click="createFlashSale"
          class="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          Create Flash Sale
        </button>
      </div>
    </div>
  </Modal>

  <!-- View Flash Sale Modal -->
  <Modal
    :title="selectedSale?.title"
    :isOpen="isViewModalOpen"
    @modal-close="closeModal"
    size="xl"
  >
    <div class="p-6" v-if="selectedSale">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Banner and Basic Info -->
        <div class="lg:col-span-2">
          <div class="h-64 rounded-xl overflow-hidden mb-4">
            <img
              :src="selectedSale.banner_image"
              :alt="selectedSale.title"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Status and Featured -->
            <div class="flex items-center gap-4">
              <span
                class="px-3 py-1.5 rounded-full text-sm font-semibold capitalize"
                :class="{
                  'bg-green-100 text-green-800':
                    selectedSale.status === 'active',
                  'bg-blue-100 text-blue-800':
                    selectedSale.status === 'upcoming',
                  'bg-gray-100 text-gray-800':
                    selectedSale.status === 'completed',
                  'bg-yellow-100 text-yellow-800':
                    selectedSale.status === 'draft',
                }"
              >
                {{ selectedSale.status }}
              </span>
              <span
                v-if="selectedSale.featured"
                class="px-3 py-1.5 rounded-full bg-red-100 text-red-800 text-sm font-semibold"
              >
                Featured
              </span>
            </div>

            <!-- Products Count -->
            <div class="flex items-center gap-2 text-gray-600">
              <Icon name="heroicons:cube" class="w-5 h-5" />
              <span>{{ selectedSale.products_count }} products</span>
            </div>
          </div>

          <!-- Description -->
          <div class="mt-4">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Description</h4>
            <p class="text-gray-600">
              {{ selectedSale.description || "No description provided" }}
            </p>
          </div>
        </div>

        <!-- Sale Details Sidebar -->
        <div class="space-y-4">
          <!-- Discount Information -->
          <div
            class="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4"
          >
            <h4 class="text-sm font-semibold text-red-700 mb-3">
              Discount Details
            </h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Type:</span>
                <span class="font-medium capitalize">{{
                  selectedSale.discount_type
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Value:</span>
                <span class="font-bold text-red-600">
                  {{
                    selectedSale.discount_type === "percentage"
                      ? selectedSale.discount_value + "%"
                      : formatCurrency(selectedSale.discount_value)
                  }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Max Discount:</span>
                <span class="font-medium">{{
                  selectedSale.max_discount
                    ? formatCurrency(selectedSale.max_discount)
                    : "No limit"
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Min Order:</span>
                <span class="font-medium">{{
                  selectedSale.min_order_amount
                    ? formatCurrency(selectedSale.min_order_amount)
                    : "No minimum"
                }}</span>
              </div>
            </div>
          </div>

          <!-- Timing Information -->
          <div
            class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4"
          >
            <h4 class="text-sm font-semibold text-blue-700 mb-3">Timing</h4>
            <div class="space-y-2">
              <div>
                <div class="text-xs text-gray-500">Start Time</div>
                <div class="font-medium">
                  {{ formatDate(selectedSale.start_time) }}
                </div>
              </div>
              <div>
                <div class="text-xs text-gray-500">End Time</div>
                <div class="font-medium">
                  {{ formatDate(selectedSale.end_time) }}
                </div>
              </div>
              <div
                v-if="
                  selectedSale.status === 'active' ||
                  selectedSale.status === 'upcoming'
                "
                class="pt-2"
              >
                <div class="text-xs text-gray-500 mb-1">
                  {{
                    selectedSale.status === "active"
                      ? "Time remaining"
                      : "Starts in"
                  }}
                </div>
                <div class="flex gap-1 text-sm font-mono">
                  <span class="bg-gray-800 text-white px-2 py-1 rounded"
                    >{{
                      selectedSale.timer.days.toString().padStart(2, "0")
                    }}d</span
                  >
                  <span class="bg-gray-800 text-white px-2 py-1 rounded"
                    >{{
                      selectedSale.timer.hours.toString().padStart(2, "0")
                    }}h</span
                  >
                  <span class="bg-gray-800 text-white px-2 py-1 rounded"
                    >{{
                      selectedSale.timer.minutes.toString().padStart(2, "0")
                    }}m</span
                  >
                  <span class="bg-gray-800 text-white px-2 py-1 rounded"
                    >{{
                      selectedSale.timer.seconds.toString().padStart(2, "0")
                    }}s</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Categories -->
          <div
            class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4"
          >
            <h4 class="text-sm font-semibold text-green-700 mb-3">
              Categories
            </h4>
            <div class="flex flex-wrap gap-1">
              <span
                v-for="category in selectedSale.categories"
                :key="category"
                class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs capitalize"
              >
                {{ category }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Stats -->
      <div
        class="mt-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6"
      >
        <h4 class="text-lg font-semibold text-purple-700 mb-4">
          Performance Statistics
        </h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600">
              {{ selectedSale.stats.views.toLocaleString() }}
            </div>
            <div class="text-sm text-gray-600">Total Views</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">
              {{ selectedSale.stats.clicks.toLocaleString() }}
            </div>
            <div class="text-sm text-gray-600">Clicks</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">
              {{ selectedSale.stats.orders.toLocaleString() }}
            </div>
            <div class="text-sm text-gray-600">Orders</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-red-600">
              {{ selectedSale.stats.conversion_rate }}%
            </div>
            <div class="text-sm text-gray-600">Conversion Rate</div>
          </div>
        </div>

        <!-- Revenue -->
        <div class="mt-4 text-center">
          <div class="text-3xl font-bold text-gray-900">
            {{ formatCurrency(selectedSale.stats.revenue) }}
          </div>
          <div class="text-sm text-gray-600">Total Revenue Generated</div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex gap-3 justify-end">
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

  <!-- Edit Flash Sale Modal -->
  <Modal
    :title="`Edit Flash Sale: ${selectedSale?.title}`"
    :isOpen="isEditModalOpen"
    @modal-close="closeModal"
    size="2xl"
  >
    <div class="p-6" v-if="selectedSale">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Left Column -->
        <div class="space-y-6">
          <!-- Basic Information -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Basic Information
            </h4>

            <!-- Title -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Flash Sale Title *</label
              >
              <input
                v-model="form.title"
                type="text"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter flash sale title"
              />
            </div>

            <!-- Description -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Description</label
              >
              <textarea
                v-model="form.description"
                rows="3"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Describe your flash sale"
              ></textarea>
            </div>

            <!-- Status -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Status</label
              >
              <select
                v-model="form.status"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <!-- Featured -->
            <div class="flex items-center mb-4">
              <input
                v-model="form.featured"
                type="checkbox"
                id="edit-featured"
                class="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
              />
              <label for="edit-featured" class="ml-2 text-sm text-gray-700"
                >Feature this flash sale on homepage</label
              >
            </div>
          </div>

          <!-- Timing Settings -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Timing Settings
            </h4>

            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Start Time *</label
                >
                <input
                  v-model="form.start_time"
                  type="datetime-local"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >End Time *</label
                >
                <input
                  v-model="form.end_time"
                  type="datetime-local"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
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
              <!-- Discount Type -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Discount Type</label
                >
                <select
                  v-model="form.discount_type"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>

              <!-- Discount Value -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Discount Value *</label
                >
                <input
                  v-model="form.discount_value"
                  type="number"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  :placeholder="
                    form.discount_type === 'percentage'
                      ? 'e.g., 40'
                      : 'e.g., 50'
                  "
                />
              </div>

              <!-- Max Discount -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Maximum Discount</label
                >
                <input
                  v-model="form.max_discount"
                  type="number"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Optional maximum discount amount"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Leave empty for no maximum limit
                </p>
              </div>

              <!-- Minimum Order Amount -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Minimum Order Amount</label
                >
                <input
                  v-model="form.min_order_amount"
                  type="number"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="e.g., 100"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Set 0 for no minimum order requirement
                </p>
              </div>
            </div>
          </div>

          <!-- Categories -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">Categories</h4>
            <div class="grid grid-cols-2 gap-2">
              <label
                v-for="category in [
                  'electronics',
                  'fashion',
                  'home',
                  'beauty',
                  'sports',
                  'all',
                ]"
                :key="category"
                class="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                :class="{
                  'bg-blue-50 border-blue-500':
                    form.categories.includes(category),
                }"
              >
                <input
                  type="checkbox"
                  :value="category"
                  v-model="form.categories"
                  class="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <span class="ml-2 text-sm font-medium capitalize">{{
                  category
                }}</span>
              </label>
            </div>
          </div>

          <!-- Banner Image -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Banner Image
            </h4>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div class="text-center">
                <div class="flex justify-center mb-2">
                  <Icon name="heroicons:photo" class="w-8 h-8 text-gray-400" />
                </div>
                <label
                  class="block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  <span class="text-red-600 hover:text-red-500"
                    >Click to upload</span
                  >
                  <input
                    type="file"
                    class="sr-only"
                    @change="onBannerUpload"
                    accept="image/*"
                  />
                </label>
                <p class="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
              </div>
            </div>

            <!-- Banner Preview -->
            <div v-if="bannerPreview || selectedSale.banner_image" class="mt-4">
              <img
                :src="bannerPreview || selectedSale.banner_image"
                class="w-full h-32 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-8 flex gap-3 pt-6 border-t border-gray-200">
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
          @click="updateFlashSale"
          class="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium"
        >
          Update Flash Sale
        </button>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
