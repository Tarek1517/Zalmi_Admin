<script setup>
import Modal from "@/components/Modal.vue";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import useAxios from "@/composables/useAxios.js";
import { toast } from "vue3-toastify";

const router = useRouter();
const { loading, error, sendRequest } = useAxios();

// Zalmi Programs data
const zalmiPrograms = ref([
  {
    id: 1,
    title: "Zalmi Premium Membership",
    banner_image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    status: "active",
    type: "membership",
    program_code: "ZALMI-PREMIUM",
    description:
      "Exclusive premium membership program with special benefits, early access to sales, and premium support",
    benefits: [
      "Free express shipping on all orders",
      "Early access to sales and new collections",
      "Exclusive member-only discounts",
      "Priority customer support",
      "Birthday rewards and special gifts",
    ],
    membership_fee: 99,
    duration: "annual", // monthly, quarterly, annual
    discount_benefit: 15,
    signup_bonus: 500, // loyalty points
    max_members: 1000,
    current_members: 856,
    start_date: "2024-01-01",
    end_date: "2024-12-31",
    eligibility: "all_customers",
    featured: true,
    created_at: "2024-01-01",
    stats: {
      total_revenue: 84744,
      active_members: 856,
      renewal_rate: 78.5,
      avg_member_value: 250,
    },
  },

  {
    id: 3,
    title: "Zalmi Business Partner",
    banner_image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
    status: "active",
    type: "business",
    program_code: "ZALMI-BUSINESS",
    description:
      "Corporate partnership program for businesses with bulk purchasing benefits and dedicated account management",
    benefits: [
      "Volume-based discounts (up to 40%)",
      "Dedicated account manager",
      "Customized billing solutions",
      "Priority order processing",
      "Business expense tracking",
    ],
    membership_fee: 299,
    duration: "annual",
    discount_benefit: 25, // base discount
    signup_bonus: 1000,
    max_members: 200,
    current_members: 89,
    start_date: "2024-03-01",
    end_date: "2025-02-28",
    eligibility: "business_customers",
    featured: false,
    created_at: "2024-02-15",
    stats: {
      total_revenue: 26611,
      active_members: 89,
      renewal_rate: 85.7,
      avg_member_value: 1500,
    },
  },
  {
    id: 4,
    title: "Zalmi Family Plan",
    banner_image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=600",
    status: "upcoming",
    type: "family",
    program_code: "ZALMI-FAMILY",
    description:
      "Family-focused program allowing multiple family members to share benefits and enjoy group discounts",
    benefits: [
      "Up to 5 family members under one plan",
      "Shared loyalty points pool",
      "Family bundle discounts",
      "Child-specific products and offers",
      "Family event invitations",
    ],
    membership_fee: 149,
    duration: "annual",
    discount_benefit: 20,
    signup_bonus: 750,
    max_members: 2000,
    current_members: 0,
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    eligibility: "family_customers",
    featured: false,
    created_at: "2024-12-01",
    stats: {
      total_revenue: 0,
      active_members: 0,
      renewal_rate: 0,
      avg_member_value: 0,
    },
  },
  {
    id: 5,
    title: "Zalmi Senior Citizens Program",
    banner_image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
    status: "draft",
    type: "senior",
    program_code: "ZALMI-SENIOR",
    description:
      "Special program for senior citizens with age-verified benefits and dedicated support",
    benefits: [
      "30% discount for seniors (65+)",
      "Free shipping with no minimum",
      "Senior-friendly product recommendations",
      "Phone ordering assistance",
      "Extended warranty options",
    ],
    membership_fee: 49,
    duration: "annual",
    discount_benefit: 30,
    signup_bonus: 300,
    max_members: 1000,
    current_members: 0,
    start_date: "2025-03-01",
    end_date: "2026-02-28",
    eligibility: "senior_citizens",
    featured: false,
    created_at: "2024-12-10",
    stats: {
      total_revenue: 0,
      active_members: 0,
      renewal_rate: 0,
      avg_member_value: 0,
    },
  },
]);

// Form data
const form = ref({
  title: "",
  description: "",
  type: "membership",
  program_code: "",
  benefits: [""],
  membership_fee: "",
  duration: "annual",
  discount_benefit: "",
  signup_bonus: "",
  max_members: "",
  start_date: "",
  end_date: "",
  eligibility: "all_customers",
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
const selectedProgram = ref(null);

// Handle banner image upload
const onBannerUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.banner_image = file;
    bannerPreview.value = URL.createObjectURL(file);
  }
};

// Add benefit field
const addBenefit = () => {
  form.value.benefits.push("");
};

// Remove benefit field
const removeBenefit = (index) => {
  form.value.benefits.splice(index, 1);
};

// Generate program code
const generateProgramCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "ZALMI-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  form.value.program_code = code;
};

// Create new program
const createProgram = async () => {
  if (!form.value.title || !form.value.start_date || !form.value.end_date) {
    toast.error("Please fill in all required fields", { theme: "dark" });
    return;
  }

  const newProgram = {
    id: Math.max(...zalmiPrograms.value.map((p) => p.id)) + 1,
    ...form.value,
    status: "draft",
    current_members: 0,
    created_at: new Date().toISOString().split("T")[0],
    stats: {
      total_revenue: 0,
      active_members: 0,
      renewal_rate: 0,
      avg_member_value: 0,
    },
  };

  zalmiPrograms.value.unshift(newProgram);

  toast.success("Zalmi Program created successfully!", { theme: "dark" });
  closeModal();
  resetForm();
};

// Update program
const updateProgram = async () => {
  if (!selectedProgram.value) return;

  const index = zalmiPrograms.value.findIndex(
    (p) => p.id === selectedProgram.value.id
  );
  if (index !== -1) {
    zalmiPrograms.value[index] = {
      ...zalmiPrograms.value[index],
      ...form.value,
    };

    toast.success("Zalmi Program updated successfully!", { theme: "dark" });
    closeModal();
    resetForm();
  }
};

// Delete program
const deleteProgram = async (program) => {
  if (confirm(`Are you sure you want to delete "${program.title}"?`)) {
    zalmiPrograms.value = zalmiPrograms.value.filter(
      (p) => p.id !== program.id
    );
    toast.success("Zalmi Program deleted successfully!", { theme: "dark" });
  }
};

// Change program status
const changeStatus = (program, newStatus) => {
  const index = zalmiPrograms.value.findIndex((p) => p.id === program.id);
  if (index !== -1) {
    zalmiPrograms.value[index].status = newStatus;
    toast.success(`Program status changed to ${newStatus}`, { theme: "dark" });
  }
};

// Open modals
const openCreateModal = () => {
  resetForm();
  generateProgramCode();
  isCreateModalOpen.value = true;
};

const openEditModal = (program) => {
  selectedProgram.value = program;
  form.value = {
    ...program,
    benefits: [...program.benefits], // Create a copy to avoid reference issues
  };
  bannerPreview.value = program.banner_image;
  isEditModalOpen.value = true;
};

const openViewModal = (program) => {
  selectedProgram.value = program;
  isViewModalOpen.value = true;
};

// Close modal
const closeModal = () => {
  isCreateModalOpen.value = false;
  isEditModalOpen.value = false;
  isViewModalOpen.value = false;
  selectedProgram.value = null;
};

// Reset form
const resetForm = () => {
  form.value = {
    title: "",
    description: "",
    type: "membership",
    program_code: "",
    benefits: [""],
    membership_fee: "",
    duration: "annual",
    discount_benefit: "",
    signup_bonus: "",
    max_members: "",
    start_date: "",
    end_date: "",
    eligibility: "all_customers",
    featured: false,
    banner_image: null,
  };
  bannerPreview.value = null;
};

// Computed properties
const filteredPrograms = computed(() => {
  let filtered = zalmiPrograms.value;

  if (searchQuery.value) {
    filtered = filtered.filter(
      (program) =>
        program.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        program.program_code
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
    );
  }

  if (filterStatus.value !== "all") {
    filtered = filtered.filter(
      (program) => program.status === filterStatus.value
    );
  }

  if (filterType.value !== "all") {
    filtered = filtered.filter((program) => program.type === filterType.value);
  }

  return filtered;
});

const programStats = computed(() => {
  return {
    total: zalmiPrograms.value.length,
    active: zalmiPrograms.value.filter((p) => p.status === "active").length,
    upcoming: zalmiPrograms.value.filter((p) => p.status === "upcoming").length,
    draft: zalmiPrograms.value.filter((p) => p.status === "draft").length,
    total_members: zalmiPrograms.value.reduce(
      (sum, p) => sum + p.current_members,
      0
    ),
    total_revenue: zalmiPrograms.value.reduce(
      (sum, p) => sum + p.stats.total_revenue,
      0
    ),
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

const getProgramTypeIcon = (type) => {
  const icons = {
    membership: "heroicons:crown",
    student: "heroicons:academic-cap",
    business: "heroicons:building-office",
    family: "heroicons:user-group",
    senior: "heroicons:heart",
  };
  return icons[type] || "heroicons:star";
};

const getEligibilityText = (eligibility) => {
  const texts = {
    all_customers: "All Customers",
    students: "Students Only",
    business_customers: "Business Customers",
    family_customers: "Families",
    senior_citizens: "Senior Citizens (65+)",
  };
  return texts[eligibility] || eligibility;
};

const getMembershipProgress = (program) => {
  return (program.current_members / program.max_members) * 100;
};

onMounted(() => {
  // In a real app, you would fetch programs from API here
});
</script>

<template>
  <AppLayout>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <!--Total Programs -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-red-500/10 to-red-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-red-600/80"
            >
              Total Programs
            </p>
            <p class="text-3xl font-bold text-red-900">
              {{ programStats.total }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-red-500/20 text-red-600">
            <Icon name="heroicons:star" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Active Programs -->
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
              {{ programStats.active }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-green-500/20 text-green-600">
            <Icon name="heroicons:play" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Total Members -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-blue-500/10 to-blue-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-blue-600/80"
            >
              Total Members
            </p>
            <p class="text-3xl font-bold text-blue-900">
              {{ programStats.total_members.toLocaleString() }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-blue-500/20 text-blue-600">
            <Icon name="heroicons:users" class="text-2xl" />
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
              {{ formatCurrency(programStats.total_revenue) }}
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-purple-500/20 text-purple-600"
          >
            <Icon name="heroicons:banknotes" class="text-2xl" />
          </div>
        </div>
      </div>

    </div>

    <!-- Header Section -->
    <div
      class="flex flex-col lg:flex-row items-start lg:items-center justify-between py-6 bg-white rounded-xl shadow-sm mb-6"
    >
      <div class="mb-4 lg:mb-0">
        <h2 class="text-2xl font-bold text-gray-900">
          Zalmi Programs Management
        </h2>
        <p class="text-gray-600 mt-1">
          Create and manage exclusive membership programs and special offers
        </p>
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
            class="pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full lg:w-64"
            placeholder="Search programs..."
          />
        </div>

        <button
          @click="openCreateModal"
          class="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Icon name="heroicons:plus" class="w-5 h-5" />
          New Program
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl shadow-sm py-4 mb-6">
      <div class="flex flex-wrap items-center gap-6">
        <div class="flex items-center gap-4">
          <span class="text-sm font-medium text-gray-700"
            >Filter by status:</span
          >
          <div class="flex flex-wrap gap-2">
            <button
              v-for="status in ['all', 'active', 'upcoming', 'draft']"
              :key="status"
              @click="filterStatus = status"
              class="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
              :class="{
                'bg-indigo-500 text-white': filterStatus === status,
                'bg-gray-100 text-gray-700 hover:bg-gray-200':
                  filterStatus !== status,
              }"
            >
              {{ status.charAt(0).toUpperCase() + status.slice(1) }}
            </button>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <span class="text-sm font-medium text-gray-700">Filter by type:</span>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="type in [
                'all',
                'membership',
                'student',
                'business',
                'family',
                'senior',
              ]"
              :key="type"
              @click="filterType = type"
              class="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 capitalize"
              :class="{
                'bg-purple-500 text-white': filterType === type,
                'bg-gray-100 text-gray-700 hover:bg-gray-200':
                  filterType !== type,
              }"
            >
              {{ type }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Programs Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="program in filteredPrograms"
        :key="program.id"
        class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        <!-- Banner Image -->
        <div class="h-40 relative overflow-hidden">
          <img
            :src="program.banner_image"
            :alt="program.title"
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
                'bg-green-100 text-green-800': program.status === 'active',
                'bg-blue-100 text-blue-800': program.status === 'upcoming',
                'bg-yellow-100 text-yellow-800': program.status === 'draft',
              }"
            >
              {{ program.status }}
            </span>
          </div>

          <!-- Program Type Badge -->
          <div class="absolute top-3 left-3">
            <span
              class="px-2 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold shadow-lg capitalize"
            >
              {{ program.type }}
            </span>
          </div>

          <!-- Program Code -->
          <div class="absolute bottom-3 left-3">
            <span
              class="px-2 py-1 rounded bg-black/70 text-white text-xs font-mono"
            >
              {{ program.program_code }}
            </span>
          </div>

          <!-- Featured Badge -->
          <div v-if="program.featured" class="absolute bottom-3 right-3">
            <span
              class="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold"
            >
              Featured
            </span>
          </div>
        </div>

        <!-- Program Details -->
        <div class="p-5">
          <div class="flex items-start justify-between mb-3">
            <h3 class="text-lg font-semibold text-gray-900 flex-1">
              {{ program.title }}
            </h3>
            <Icon
              :name="getProgramTypeIcon(program.type)"
              class="w-5 h-5 text-indigo-500 ml-2"
            />
          </div>

          <p class="text-gray-600 text-sm mb-4 line-clamp-2">
            {{ program.description }}
          </p>

          <!-- Program Details -->
          <div class="grid grid-cols-2 gap-3 mb-4">
            <div class="text-sm">
              <span class="text-gray-500">Fee:</span>
              <span class="font-medium ml-1">{{
                program.membership_fee
                  ? formatCurrency(program.membership_fee)
                  : "Free"
              }}</span>
            </div>
            <div class="text-sm">
              <span class="text-gray-500">Discount:</span>
              <span class="font-medium ml-1"
                >{{ program.discount_benefit }}%</span
              >
            </div>
          </div>

          <!-- Membership Progress -->
          <div class="mb-4">
            <div class="flex justify-between text-xs text-gray-600 mb-1">
              <span
                >Members: {{ program.current_members }}/{{
                  program.max_members
                }}</span
              >
              <span>{{ getMembershipProgress(program).toFixed(1) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="h-2 rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-indigo-500 to-purple-600"
                :style="{ width: getMembershipProgress(program) + '%' }"
              ></div>
            </div>
          </div>

          <!-- Dates -->
          <div
            class="flex items-center justify-between text-sm text-gray-500 mb-4"
          >
            <span>Starts: {{ formatDate(program.start_date) }}</span>
            <span>Ends: {{ formatDate(program.end_date) }}</span>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-lg mb-4">
            <div class="text-center">
              <div class="text-sm font-bold text-indigo-600">
                {{ program.stats.active_members }}
              </div>
              <div class="text-xs text-gray-500">Members</div>
            </div>
            <div class="text-center">
              <div class="text-sm font-bold text-green-600">
                {{ formatCurrency(program.stats.total_revenue) }}
              </div>
              <div class="text-xs text-gray-500">Revenue</div>
            </div>
            <div class="text-center">
              <div class="text-sm font-bold text-blue-600">
                {{ program.stats.renewal_rate }}%
              </div>
              <div class="text-xs text-gray-500">Renewal</div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <button
                @click="openViewModal(program)"
                class="p-2 bg-gray-100 text-green-500 hover:bg-green-100 hover:text-green-600 transition-colors"
                title="View Details"
              >
                <Icon name="heroicons:eye" class="w-4 h-4" />
              </button>
              <button
                @click="openEditModal(program)"
                class="p-2 bg-gray-100 text-blue-500 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                title="Edit Program"
              >
                <Icon name="heroicons:pencil" class="w-4 h-4" />
              </button>
            </div>

            <div class="flex items-center gap-2">
              <button
                v-if="program.status === 'draft'"
                @click="changeStatus(program, 'active')"
                class="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
              >
                Activate
              </button>
              <button
                v-if="program.status === 'active'"
                @click="changeStatus(program, 'draft')"
                class="px-3 py-1.5 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors"
              >
                Pause
              </button>
              <button
                @click="deleteProgram(program)"
                class="p-2 rounded-lg bg-gray-100 text-rose-500 hover:bg-red-100 hover:text-red-600 transition-colors"
                title="Delete Program"
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
      v-if="filteredPrograms.length === 0"
      class="text-center py-12 bg-white rounded-xl shadow-sm"
    >
      <Icon
        name="heroicons:star"
        class="w-16 h-16 text-gray-300 mx-auto mb-4"
      />
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        No Zalmi programs found
      </h3>
      <p class="text-gray-500 mb-4">
        Create your first program to build customer loyalty!
      </p>
      <button
        @click="openCreateModal"
        class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
      >
        Create Program
      </button>
    </div>
  </AppLayout>

  <!-- Create Program Modal -->
  <Modal
    title="Create New Zalmi Program"
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
                >Program Title *</label
              >
              <input
                v-model="form.title"
                type="text"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., Zalmi Premium Membership"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Description</label
              >
              <textarea
                v-model="form.description"
                rows="3"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Describe your program"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Program Type</label
                >
                <select
                  v-model="form.type"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="membership">Membership</option>
                  <option value="student">Student</option>
                  <option value="business">Business</option>
                  <option value="family">Family</option>
                  <option value="senior">Senior Citizens</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Program Code</label
                >
                <div class="flex gap-2">
                  <input
                    v-model="form.program_code"
                    type="text"
                    class="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
                    placeholder="Program code"
                  />
                  <button
                    @click="generateProgramCode"
                    class="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Benefits -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Program Benefits
            </h4>
            <div
              v-for="(benefit, index) in form.benefits"
              :key="index"
              class="flex gap-2 mb-2"
            >
              <input
                v-model="form.benefits[index]"
                type="text"
                class="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter benefit description"
              />
              <button
                @click="removeBenefit(index)"
                class="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                v-if="form.benefits.length > 1"
              >
                <Icon name="heroicons:trash" class="w-4 h-4" />
              </button>
            </div>
            <button
              @click="addBenefit"
              class="flex items-center gap-2 px-3 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              <Icon name="heroicons:plus" class="w-4 h-4" />
              Add Benefit
            </button>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Pricing & Duration -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Pricing & Duration
            </h4>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Membership Fee</label
                >
                <input
                  v-model="form.membership_fee"
                  type="number"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="0 for free program"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Duration</label
                >
                <select
                  v-model="form.duration"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annual">Annual</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Discount Benefit (%)</label
                >
                <input
                  v-model="form.discount_benefit"
                  type="number"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., 15 for 15%"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Signup Bonus Points</label
                >
                <input
                  v-model="form.signup_bonus"
                  type="number"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Loyalty points"
                />
              </div>
            </div>
          </div>

          <!-- Capacity & Eligibility -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Capacity & Eligibility
            </h4>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Maximum Members</label
              >
              <input
                v-model="form.max_members"
                type="number"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="0 for unlimited"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Eligibility</label
              >
              <select
                v-model="form.eligibility"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all_customers">All Customers</option>
                <option value="students">Students Only</option>
                <option value="business_customers">Business Customers</option>
                <option value="family_customers">Families</option>
                <option value="senior_citizens">Senior Citizens (65+)</option>
              </select>
            </div>
          </div>

          <!-- Dates -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Program Dates
            </h4>

            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Start Date *</label
                >
                <input
                  v-model="form.start_date"
                  type="date"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >End Date *</label
                >
                <input
                  v-model="form.end_date"
                  type="date"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <!-- Banner Image -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Banner Image
            </h4>

            <div class="flex items-center gap-4">
              <div class="flex-1">
                <input
                  type="file"
                  @change="onBannerUpload"
                  accept="image/*"
                  class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

              <div
                v-if="bannerPreview"
                class="w-20 h-20 rounded-lg overflow-hidden border"
              >
                <img
                  :src="bannerPreview"
                  alt="Banner preview"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Featured Toggle -->
          <div
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Featured Program</label
              >
              <p class="text-sm text-gray-500">
                Highlight this program on the main page
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                v-model="form.featured"
                type="checkbox"
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"
              ></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div
        class="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-gray-200"
      >
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
          @click="createProgram"
          class="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all font-medium"
        >
          Create Program
        </button>
      </div>
    </div>
  </Modal>

  <!-- Edit Program Modal -->
  <Modal
    title="Edit Zalmi Program"
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
                >Program Title *</label
              >
              <input
                v-model="form.title"
                type="text"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., Zalmi Premium Membership"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Description</label
              >
              <textarea
                v-model="form.description"
                rows="3"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Describe your program"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Program Type</label
                >
                <select
                  v-model="form.type"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="membership">Membership</option>
                  <option value="student">Student</option>
                  <option value="business">Business</option>
                  <option value="family">Family</option>
                  <option value="senior">Senior Citizens</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Program Code</label
                >
                <input
                  v-model="form.program_code"
                  type="text"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
                  placeholder="Program code"
                />
              </div>
            </div>
          </div>

          <!-- Benefits -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Program Benefits
            </h4>
            <div
              v-for="(benefit, index) in form.benefits"
              :key="index"
              class="flex gap-2 mb-2"
            >
              <input
                v-model="form.benefits[index]"
                type="text"
                class="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter benefit description"
              />
              <button
                @click="removeBenefit(index)"
                class="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                v-if="form.benefits.length > 1"
              >
                <Icon name="heroicons:trash" class="w-4 h-4" />
              </button>
            </div>
            <button
              @click="addBenefit"
              class="flex items-center gap-2 px-3 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              <Icon name="heroicons:plus" class="w-4 h-4" />
              Add Benefit
            </button>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Pricing & Duration -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Pricing & Duration
            </h4>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Membership Fee</label
                >
                <input
                  v-model="form.membership_fee"
                  type="number"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="0 for free program"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Duration</label
                >
                <select
                  v-model="form.duration"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annual">Annual</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Discount Benefit (%)</label
                >
                <input
                  v-model="form.discount_benefit"
                  type="number"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., 15 for 15%"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Signup Bonus Points</label
                >
                <input
                  v-model="form.signup_bonus"
                  type="number"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Loyalty points"
                />
              </div>
            </div>
          </div>

          <!-- Capacity & Eligibility -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Capacity & Eligibility
            </h4>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Maximum Members</label
              >
              <input
                v-model="form.max_members"
                type="number"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="0 for unlimited"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Eligibility</label
              >
              <select
                v-model="form.eligibility"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all_customers">All Customers</option>
                <option value="students">Students Only</option>
                <option value="business_customers">Business Customers</option>
                <option value="family_customers">Families</option>
                <option value="senior_citizens">Senior Citizens (65+)</option>
              </select>
            </div>
          </div>

          <!-- Dates -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Program Dates
            </h4>

            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Start Date *</label
                >
                <input
                  v-model="form.start_date"
                  type="date"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >End Date *</label
                >
                <input
                  v-model="form.end_date"
                  type="date"
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <!-- Banner Image -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900 mb-4">
              Banner Image
            </h4>

            <div class="flex items-center gap-4">
              <div class="flex-1">
                <input
                  type="file"
                  @change="onBannerUpload"
                  accept="image/*"
                  class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

              <div
                v-if="bannerPreview"
                class="w-20 h-20 rounded-lg overflow-hidden border"
              >
                <img
                  :src="bannerPreview"
                  alt="Banner preview"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Featured Toggle -->
          <div
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Featured Program</label
              >
              <p class="text-sm text-gray-500">
                Highlight this program on the main page
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                v-model="form.featured"
                type="checkbox"
                class="sr-only peer"
              />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"
              ></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div
        class="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-gray-200"
      >
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
          @click="updateProgram"
          class="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all font-medium"
        >
          Update Program
        </button>
      </div>
    </div>
  </Modal>

  <!-- View Program Modal -->
  <Modal
    :title="selectedProgram?.title"
    :isOpen="isViewModalOpen"
    @modal-close="closeModal"
    size="lg"
  >
    <div class="p-6" v-if="selectedProgram">
      <!-- Banner Image -->
      <div class="h-48 rounded-lg overflow-hidden mb-6">
        <img
          :src="selectedProgram.banner_image"
          :alt="selectedProgram.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Program Details -->
      <div class="grid grid-cols-2 gap-6 mb-6">
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-500"
              >Program Code</label
            >
            <p class="font-mono text-lg font-semibold">
              {{ selectedProgram.program_code }}
            </p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Type</label>
            <p class="capitalize font-semibold">{{ selectedProgram.type }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Status</label>
            <span
              class="px-2 py-1 rounded-full text-xs font-semibold capitalize"
              :class="{
                'bg-green-100 text-green-800':
                  selectedProgram.status === 'active',
                'bg-blue-100 text-blue-800':
                  selectedProgram.status === 'upcoming',
                'bg-yellow-100 text-yellow-800':
                  selectedProgram.status === 'draft',
              }"
            >
              {{ selectedProgram.status }}
            </span>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium text-gray-500"
              >Membership Fee</label
            >
            <p class="text-lg font-semibold">
              {{
                selectedProgram.membership_fee
                  ? formatCurrency(selectedProgram.membership_fee)
                  : "Free"
              }}
            </p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Discount</label>
            <p class="text-lg font-semibold">
              {{ selectedProgram.discount_benefit }}%
            </p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-500">Eligibility</label>
            <p class="font-semibold">
              {{ getEligibilityText(selectedProgram.eligibility) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="mb-6">
        <label class="text-sm font-medium text-gray-500 block mb-2"
          >Description</label
        >
        <p class="text-gray-700">{{ selectedProgram.description }}</p>
      </div>

      <!-- Benefits -->
      <div class="mb-6">
        <label class="text-sm font-medium text-gray-500 block mb-3"
          >Benefits</label
        >
        <ul class="space-y-2">
          <li
            v-for="(benefit, index) in selectedProgram.benefits"
            :key="index"
            class="flex items-center gap-2"
          >
            <Icon name="heroicons:check" class="w-4 h-4 text-green-500" />
            <span class="text-gray-700">{{ benefit }}</span>
          </li>
        </ul>
      </div>

      <!-- Stats -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h4 class="font-semibold text-gray-900 mb-3">Program Statistics</h4>
        <div class="grid grid-cols-3 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-indigo-600">
              {{ selectedProgram.current_members }}
            </div>
            <div class="text-sm text-gray-500">Current Members</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">
              {{ formatCurrency(selectedProgram.stats.total_revenue) }}
            </div>
            <div class="text-sm text-gray-500">Total Revenue</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">
              {{ selectedProgram.stats.renewal_rate }}%
            </div>
            <div class="text-sm text-gray-500">Renewal Rate</div>
          </div>
        </div>
      </div>

      <!-- Dates -->
      <div class="flex items-center justify-between text-sm text-gray-500 mt-4">
        <span>Created: {{ formatDate(selectedProgram.created_at) }}</span>
        <span
          >Runs: {{ formatDate(selectedProgram.start_date) }} -
          {{ formatDate(selectedProgram.end_date) }}</span
        >
      </div>
      <!-- Action Buttons -->
      <div
        class="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-gray-200"
      >
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

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar for modals */
.modal-content {
  scrollbar-width: thin;
  scrollbar-color: #c7d2fe #f5f5f5;
}

.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #c7d2fe;
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #a5b4fc;
}
</style>
