<template>
  <div class="min-h-screen bg-gray-50/50 p-6">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-2">
        <div
          class="p-2 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl"
        >
          <Icon name="ph:hard-drives" class="w-6 h-6 text-orange-600" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900">Backup & Restore</h1>
      </div>
      <p class="text-gray-600">Manage your system backups and restore points</p>
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
              Total Backups
            </p>
            <p class="text-2xl font-bold text-blue-900">
              {{ backups.length }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-blue-500/20 text-blue-600">
            <Icon
              name="solar:archive-minimalistic-bold-duotone"
              class="w-6 h-6 text-blue-600"
            />
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
              Total Size
            </p>
            <p class="text-2xl font-bold text-green-900">
              {{ totalSize }}
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-green-500/20 text-green-600">
            <Icon
              name="material-symbols:hard-drive"
              class="w-6 h-6 text-green-600"
            />
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
              Last Backup
            </p>
            <p class="text-2xl font-bold text-yellow-900">
              {{ lastBackupDate }}
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-yellow-500/20 text-yellow-600"
          >
            <Icon
              name="material-symbols:calendar-month"
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
              Auto Backup
            </p>
            <p class="text-2xl font-bold text-purple-900">Active</p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-purple-500/20 text-purple-600"
          >
            <Icon name="ion:shield-checkmark" class="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <!-- Backup Operations -->
      <div class="xl:col-span-2 space-y-6">
        <!-- Manual Backup -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="py-6 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900">Create Backup</h3>
          </div>
          <div class="py-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Backup Name</label
                >
                <input
                  v-model="newBackup.name"
                  type="text"
                  class="w-full px-4 py-3 rounded-lg border border-primary/25 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  placeholder="backup_2024_01_15"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Backup Type</label
                >
                <select
                  v-model="newBackup.type"
                  class="w-full px-4 py-3 rounded-lg border border-primary/25 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                >
                  <option value="full">Full System Backup</option>
                  <option value="database">Database Only</option>
                  <option value="files">Files Only</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Description</label
              >
              <textarea
                v-model="newBackup.description"
                rows="3"
                class="w-full px-4 py-3 rounded-lg border border-primary/25 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                placeholder="Optional backup description..."
              ></textarea>
            </div>
            <div class="flex gap-3">
              <button
                @click="createBackup"
                :disabled="loading.create"
                class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-50"
              >
                <Icon name="ic:sharp-download" class="w-4 h-4" />
                Create Backup
              </button>
              <button
                @click="scheduleBackup"
                class="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200"
              >
                <Icon name="material-symbols:alarm-add" class="w-4 h-4" />
                Schedule
              </button>
            </div>
          </div>
        </div>

        <!-- Backup List -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100">
          <div
            class="p-6 border-b border-gray-100 flex justify-between items-center"
          >
            <h3 class="text-lg font-semibold text-gray-900">
              Available Backups
            </h3>
            <div class="relative">
              <input
                v-model="backupSearch"
                type="text"
                placeholder="Search backups..."
                class="pl-10 pr-4 py-2 border border-primary/25 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
              <Icon
                name="material-symbols:screen-search-desktop-outline-sharp"
                class="w-4 h-4 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              />
            </div>
          </div>
          <div class="overflow-hidden">
            <table class="w-full">
              <thead class="bg-amber-100">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Size
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
                  v-for="backup in filteredBackups"
                  :key="backup.id"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div class="font-medium text-gray-900">
                        {{ backup.name }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ backup.description }}
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="getTypeBadgeClass(backup.type)"
                      class="px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {{ backup.type }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatDate(backup.createdAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ backup.size }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex items-center gap-2">
                      <button
                        @click="restoreBackup(backup.id)"
                        class="text-green-600 hover:text-green-900 transition-colors"
                        title="Restore"
                      >
                        <Icon name="lucide:refresh-cw" class="w-4 h-4" />
                      </button>
                      <button
                        @click="downloadBackup(backup.id)"
                        class="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Download"
                      >
                        <Icon name="line-md:download-loop" class="w-4 h-4" />
                      </button>
                      <button
                        @click="deleteBackup(backup.id)"
                        class="text-red-600 hover:text-red-900 transition-colors"
                        title="Delete"
                      >
                        <Icon name="heroicons:trash-20-solid" class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Sidebar - Restore & Settings -->
      <div class="space-y-6">
        <!-- Restore Backup -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="py-6 pl-6 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900">Restore Backup</h3>
          </div>
          <div class="py-6 pl-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Select Backup</label
              >
              <select
                v-model="selectedBackup"
                class="w-full px-4 py-3 rounded-lg border border-primary/25 focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              >
                <option value="">Choose a backup...</option>
                <option
                  v-for="backup in backups"
                  :key="backup.id"
                  :value="backup.id"
                >
                  {{ backup.name }} ({{ formatDate(backup.createdAt) }})
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Restore Options</label
              >
              <div class="space-y-2">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="restoreOptions.includeFiles"
                    class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span class="ml-2 text-sm text-gray-700"
                    >Include files and media</span
                  >
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="restoreOptions.includeDatabase"
                    class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span class="ml-2 text-sm text-gray-700"
                    >Include database</span
                  >
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="restoreOptions.clearExisting"
                    class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span class="ml-2 text-sm text-gray-700"
                    >Clear existing data</span
                  >
                </label>
              </div>
            </div>
            <button
              @click="startRestore"
              :disabled="!selectedBackup || loading.restore"
              class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50"
            >
              <Icon name="lucide:refresh-cw" class="w-4 h-4" />
              Restore Backup
            </button>
          </div>
        </div>

        <!-- Auto Backup Settings -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="py-6 pl-6 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900">
              Auto Backup Settings
            </h3>
          </div>
          <div class="py-6 pl-6 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >Enable Auto Backup</label
                >
                <p class="text-sm text-gray-500">
                  Automatically create backups
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="autoBackup.enabled"
                  class="sr-only peer"
                />
                <div
                  class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300/50 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-600 shadow-inner"
                ></div>
              </label>
            </div>

            <div v-if="autoBackup.enabled" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Frequency</label
                >
                <select
                  v-model="autoBackup.frequency"
                  class="w-full px-4 py-3 rounded-lg border border-primary/25 focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Keep Backups For</label
                >
                <select
                  v-model="autoBackup.retention"
                  class="w-full px-4 py-3 rounded-lg border border-primary/25 focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                >
                  <option value="7">1 Week</option>
                  <option value="30">1 Month</option>
                  <option value="90">3 Months</option>
                  <option value="365">1 Year</option>
                </select>
              </div>
            </div>

            <button
              @click="saveAutoBackupSettings"
              class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-gray-200 transition-all duration-200"
            >
              <Icon
                name="material-symbols-light:sync-saved-locally"
                class="w-4 h-4"
              />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const loading = ref({
  create: false,
  restore: false,
});

const backups = ref([
  {
    id: 1,
    name: "backup_2024_01_15",
    description: "Full system backup before update",
    type: "full",
    size: "2.4 GB",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "backup_2024_01_10",
    description: "Weekly database backup",
    type: "database",
    size: "1.2 GB",
    createdAt: "2024-01-10T14:20:00Z",
  },
  {
    id: 3,
    name: "backup_2024_01_05",
    description: "Files and media backup",
    type: "files",
    size: "800 MB",
    createdAt: "2024-01-05T09:15:00Z",
  },
]);

const newBackup = ref({
  name: "",
  type: "full",
  description: "",
});

const selectedBackup = ref("");
const backupSearch = ref("");

const restoreOptions = ref({
  includeFiles: true,
  includeDatabase: true,
  clearExisting: false,
});

const autoBackup = ref({
  enabled: true,
  frequency: "daily",
  retention: "30",
});

const filteredBackups = computed(() => {
  if (!backupSearch.value) return backups.value;
  return backups.value.filter(
    (backup) =>
      backup.name.toLowerCase().includes(backupSearch.value.toLowerCase()) ||
      backup.description
        .toLowerCase()
        .includes(backupSearch.value.toLowerCase())
  );
});

const totalSize = computed(() => {
  return (
    backups.value
      .reduce((total, backup) => {
        const size =
          parseFloat(backup.size) * (backup.size.includes("GB") ? 1024 : 1);
        return total + size;
      }, 0)
      .toFixed(1) + " MB"
  );
});

const lastBackupDate = computed(() => {
  if (backups.value.length === 0) return "Never";
  const latest = backups.value.reduce((latest, backup) =>
    new Date(backup.createdAt) > new Date(latest.createdAt) ? backup : latest
  );
  return formatDate(latest.createdAt);
});

function getTypeBadgeClass(type) {
  const classes = {
    full: "bg-orange-100 text-orange-800",
    database: "bg-blue-100 text-blue-800",
    files: "bg-green-100 text-green-800",
  };
  return classes[type] || "bg-gray-100 text-gray-800";
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

async function createBackup() {
  loading.value.create = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const backup = {
      id: backups.value.length + 1,
      name:
        newBackup.value.name ||
        `backup_${new Date().toISOString().split("T")[0]}`,
      description: newBackup.value.description,
      type: newBackup.value.type,
      size: "1.5 GB",
      createdAt: new Date().toISOString(),
    };

    backups.value.unshift(backup);
    newBackup.value = { name: "", type: "full", description: "" };

    alert("Backup created successfully!");
  } catch (error) {
    alert("Error creating backup: " + error.message);
  } finally {
    loading.value.create = false;
  }
}

async function restoreBackup(backupId) {
  if (
    !confirm(
      "Are you sure you want to restore this backup? This will overwrite existing data."
    )
  ) {
    return;
  }

  loading.value.restore = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    alert("Backup restored successfully!");
  } catch (error) {
    alert("Error restoring backup: " + error.message);
  } finally {
    loading.value.restore = false;
  }
}

function downloadBackup(backupId) {
  const backup = backups.value.find((b) => b.id === backupId);
  alert(`Downloading backup: ${backup.name}`);
}

function deleteBackup(backupId) {
  if (!confirm("Are you sure you want to delete this backup?")) {
    return;
  }
  backups.value = backups.value.filter((b) => b.id !== backupId);
  alert("Backup deleted successfully!");
}

function startRestore() {
  restoreBackup(selectedBackup.value);
}

function scheduleBackup() {
  alert("Backup scheduling feature coming soon!");
}

function saveAutoBackupSettings() {
  alert("Auto backup settings saved!");
}
</script>
