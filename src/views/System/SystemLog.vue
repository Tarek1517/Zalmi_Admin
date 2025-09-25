<template>
  <div class="min-h-screen bg-gray-50/50 py-6">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-2">
        <div
          class="p-2 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl"
        >
          <Icon name="lucide:file-text" class="w-6 h-6 text-purple-600" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900">System Logs</h1>
      </div>
    </div>

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
              Total Logs
            </p>
            <p class="text-2xl font-bold text-blue-900">
              {{ totalLogs }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-blue-500/20 text-blue-600">
            <Icon name="lucide:file-text" class="w-6 h-6 text-blue-600" />
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
              Errors
            </p>
            <p class="text-2xl font-bold text-green-900">
              {{ errorCount }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-green-500/20 text-green-600">
            <Icon name="lucide:alert-circle" class="w-6 h-6 text-green-600" />
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
              Warnings
            </p>
            <p class="text-2xl font-bold text-yellow-900">
              {{ warningCount }}
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-yellow-500/20 text-yellow-600"
          >
            <Icon
              name="lucide:alert-triangle"
              class="w-6 h-6 text-yellow-600"
            />
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
              Info
            </p>
            <p class="text-2xl font-bold text-purple-900">{{ infoCount }}</p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-purple-500/20 text-purple-600"
          >
            <Icon name="lucide:info" class="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
      <div class="py-6 border-b border-gray-100">
        <div
          class="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center"
        >
          <h3 class="text-lg font-semibold text-gray-900">Log Entries</h3>
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center gap-3">
              <label class="text-sm font-medium text-gray-700">Level:</label>
              <select
                v-model="filters.level"
                class="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              >
                <option value="">All Levels</option>
                <option value="error">Error</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
                <option value="debug">Debug</option>
              </select>
            </div>
            <div class="flex items-center gap-3">
              <label class="text-sm font-medium text-gray-700"
                >Date Range:</label
              >
              <select
                v-model="filters.dateRange"
                class="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="all">All time</option>
              </select>
            </div>
            <div class="relative">
              <input
                v-model="filters.search"
                type="text"
                placeholder="Search logs..."
                class="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
              <Icon
                name="lucide:search"
                class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              />
            </div>
            <button
              @click="refreshLogs"
              :disabled="loading"
              class="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 disabled:opacity-50"
            >
              <Icon name="lucide:refresh-cw" class="w-4 h-4" />
              Refresh
            </button>
            <button
              @click="clearLogs"
              class="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all duration-200"
            >
              <Icon name="lucide:trash-2" class="w-4 h-4" />
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Log Table -->
    <div
      class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-blue-100">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Level
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Timestamp
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Module
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Message
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="log in filteredLogs"
              :key="log.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getLevelBadgeClass(log.level)"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ log.level }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDateTime(log.timestamp) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span
                  class="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                  >{{ log.module }}</span
                >
              </td>
              <td class="px-6 py-4 text-sm text-gray-900 max-w-md">
                <div class="truncate" :title="log.message">
                  {{ log.message }}
                </div>
                <div
                  v-if="log.details"
                  class="text-xs text-gray-500 mt-1 truncate"
                >
                  {{ log.details }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ log.user || "System" }}
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center gap-2">
                  <button
                    @click="viewLogDetails(log)"
                    class="text-blue-600 hover:text-blue-900 transition-colors"
                    title="View Details"
                  >
                    <Icon name="lucide:eye" class="w-4 h-4" />
                  </button>
                  <button
                    @click="exportLog(log)"
                    class="text-green-600 hover:text-green-900 transition-colors"
                    title="Export"
                  >
                    <Icon name="lucide:download" class="w-4 h-4" />
                  </button>
                  <button
                    @click="deleteLog(log.id)"
                    class="text-red-600 hover:text-red-900 transition-colors"
                    title="Delete"
                  >
                    <Icon name="lucide:trash-2" class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="px-6 py-4 border-t border-gray-200 flex items-center justify-between"
      >
        <div class="text-sm text-gray-700">
          Showing {{ filteredLogs.length }} of {{ totalLogs }} entries
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            <Icon name="lucide:chevron-left" class="w-4 h-4" />
          </button>
          <span class="px-3 py-1 text-sm text-gray-700"
            >Page {{ currentPage }}</span
          >
          <button
            @click="nextPage"
            :disabled="currentPage * itemsPerPage >= totalLogs"
            class="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            <Icon name="lucide:chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Log Details Modal -->
    <Modal
      :title="`Log Details - ${selectedLog?.module}`"
      :isOpen="isViewModalOpen"
      @modal-close="closeModal"
    >
      <div v-if="selectedLog" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-700">Level</label>
            <p
              :class="getLevelTextClass(selectedLog.level)"
              class="mt-1 font-medium"
            >
              {{ selectedLog.level }}
            </p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700">Timestamp</label>
            <p class="mt-1 text-gray-900">
              {{ formatDateTime(selectedLog.timestamp) }}
            </p>
          </div>
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700">Module</label>
          <p class="mt-1 text-gray-900">{{ selectedLog.module }}</p>
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700">Message</label>
          <p class="mt-1 text-gray-900 bg-gray-50 p-3 rounded-lg">
            {{ selectedLog.message }}
          </p>
        </div>
        <div v-if="selectedLog.details">
          <label class="text-sm font-medium text-gray-700">Details</label>
          <pre
            class="mt-1 text-gray-900 bg-gray-50 p-3 rounded-lg text-sm overflow-x-auto"
            >{{ selectedLog.details }}</pre
          >
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium text-gray-700">User</label>
            <p class="mt-1 text-gray-900">{{ selectedLog.user || "System" }}</p>
          </div>
          <div>
            <label class="text-sm font-medium text-gray-700">IP Address</label>
            <p class="mt-1 text-gray-900">
              {{ selectedLog.ipAddress || "N/A" }}
            </p>
          </div>
        </div>
        <div class="mt-6 flex justify-end gap-3">
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
  </div>
</template>

<script setup>
import Modal from "@/components/Modal.vue";
import { ref, computed } from "vue";

const loading = ref(false);
const isViewModalOpen = ref(false);

const logs = ref([
  {
    id: 1,
    level: "error",
    timestamp: "2024-01-15T14:30:00Z",
    module: "Authentication",
    message: "Failed login attempt",
    details: "Invalid credentials provided for user: admin",
    user: "admin",
    ipAddress: "192.168.1.100",
  },
  {
    id: 2,
    level: "warning",
    timestamp: "2024-01-15T14:25:00Z",
    module: "Database",
    message: "Slow query detected",
    details: "Query took 2.5 seconds to execute",
    user: "system",
    ipAddress: null,
  },
  {
    id: 3,
    level: "info",
    timestamp: "2024-01-15T14:20:00Z",
    module: "Backup",
    message: "Backup completed successfully",
    details: "Full system backup created: backup_2024_01_15",
    user: "system",
    ipAddress: null,
  },
  {
    id: 4,
    level: "debug",
    timestamp: "2024-01-15T14:15:00Z",
    module: "API",
    message: "API request processed",
    details: "GET /api/users completed in 120ms",
    user: "api_user",
    ipAddress: "10.0.1.50",
  },
  {
    id: 5,
    level: "error",
    timestamp: "2024-01-15T14:10:00Z",
    module: "Payment",
    message: "Payment gateway timeout",
    details: "Stripe API timeout after 30 seconds",
    user: "customer_123",
    ipAddress: "203.0.113.45",
  },
]);

const filters = ref({
  level: "",
  dateRange: "all",
  search: "",
});

const selectedLog = ref(null);
const currentPage = ref(1);
const itemsPerPage = ref(10);

const filteredLogs = computed(() => {
  let filtered = logs.value;

  if (filters.value.level) {
    filtered = filtered.filter((log) => log.level === filters.value.level);
  }

  const now = new Date();
  switch (filters.value.dateRange) {
    case "24h":
      filtered = filtered.filter(
        (log) => new Date(log.timestamp) > new Date(now - 24 * 60 * 60 * 1000)
      );
      break;
    case "7d":
      filtered = filtered.filter(
        (log) =>
          new Date(log.timestamp) > new Date(now - 7 * 24 * 60 * 60 * 1000)
      );
      break;
    case "30d":
      filtered = filtered.filter(
        (log) =>
          new Date(log.timestamp) > new Date(now - 30 * 24 * 60 * 60 * 1000)
      );
      break;
  }

  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase();
    filtered = filtered.filter(
      (log) =>
        log.message.toLowerCase().includes(searchTerm) ||
        log.module.toLowerCase().includes(searchTerm) ||
        (log.details && log.details.toLowerCase().includes(searchTerm)) ||
        (log.user && log.user.toLowerCase().includes(searchTerm))
    );
  }

  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filtered.slice(start, start + itemsPerPage.value);
});

const totalLogs = computed(() => logs.value.length);
const errorCount = computed(
  () => logs.value.filter((log) => log.level === "error").length
);
const warningCount = computed(
  () => logs.value.filter((log) => log.level === "warning").length
);
const infoCount = computed(
  () => logs.value.filter((log) => log.level === "info").length
);

function getLevelBadgeClass(level) {
  const classes = {
    error: "bg-red-100 text-red-800",
    warning: "bg-orange-100 text-orange-800",
    info: "bg-blue-100 text-blue-800",
    debug: "bg-gray-100 text-gray-800",
  };
  return classes[level] || "bg-gray-100 text-gray-800";
}

function getLevelTextClass(level) {
  const classes = {
    error: "text-red-600",
    warning: "text-orange-600",
    info: "text-blue-600",
    debug: "text-gray-600",
  };
  return classes[level] || "text-gray-600";
}

function formatDateTime(timestamp) {
  return new Date(timestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function viewLogDetails(log) {
  selectedLog.value = log;
  isViewModalOpen.value = true;
}

function closeModal() {
  isViewModalOpen.value = false;
  selectedLog.value = null;
}

function exportLog(log) {
  const logData = JSON.stringify(log, null, 2);
  const blob = new Blob([logData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `log_${log.id}_${log.timestamp.split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function deleteLog(logId) {
  if (confirm("Are you sure you want to delete this log entry?")) {
    logs.value = logs.value.filter((log) => log.id !== logId);
  }
}

function clearLogs() {
  if (
    confirm(
      "Are you sure you want to clear all logs? This action cannot be undone."
    )
  ) {
    logs.value = [];
  }
}

function nextPage() {
  if (currentPage.value * itemsPerPage.value < totalLogs.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

async function refreshLogs() {
  loading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Logs refreshed");
  } catch (error) {
    alert("Error refreshing logs: " + error.message);
  } finally {
    loading.value = false;
  }
}
</script>
