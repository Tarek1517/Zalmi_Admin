<script setup>
import { ref, onMounted } from "vue";

// Security data
const securityData = ref({
  overallScore: 87,
  lastScan: "2023-11-15T14:30:00Z",
  threatsBlocked: 1247,
  securityLevel: "High",
  lastIncident: "2023-10-28T09:15:00Z",
});

// Security alerts
const securityAlerts = ref([
  {
    id: 1,
    type: "critical",
    title: "Suspicious Login Attempt",
    description: "Multiple failed login attempts from unknown IP address",
    time: "2 hours ago",
    resolved: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Outdated SSL Certificate",
    description: "SSL certificate will expire in 15 days",
    time: "1 day ago",
    resolved: false,
  },
  {
    id: 3,
    type: "info",
    title: "Security Scan Completed",
    description: "Regular security scan completed successfully",
    time: "2 days ago",
    resolved: true,
  },
  {
    id: 4,
    type: "warning",
    title: "Weak Password Detected",
    description: "3 user accounts have weak passwords",
    time: "3 days ago",
    resolved: false,
  },
]);

// Security settings
const securitySettings = ref({
  twoFactorAuth: true,
  loginAlerts: true,
  autoUpdates: true,
  firewall: true,
  backupEnabled: true,
  lastBackup: "2023-11-14T03:00:00Z",
});

// Activity logs
const activityLogs = ref([
  {
    id: 1,
    user: "admin@company.com",
    action: "Login",
    ip: "192.168.1.100",
    time: "2023-11-15T14:25:00Z",
    status: "success",
  },
  {
    id: 2,
    user: "john.doe@company.com",
    action: "File Upload",
    ip: "203.0.113.45",
    time: "2023-11-15T13:40:00Z",
    status: "success",
  },
  {
    id: 3,
    user: "unknown",
    action: "Login Attempt",
    ip: "198.51.100.23",
    time: "2023-11-15T12:15:00Z",
    status: "failed",
  },
  {
    id: 4,
    user: "jane.smith@company.com",
    action: "Password Change",
    ip: "192.168.1.150",
    time: "2023-11-15T11:20:00Z",
    status: "success",
  },
]);

// Methods
const runSecurityScan = () => {
  console.log("Running security scan...");
  // Simulate scan process
  setTimeout(() => {
    securityData.value.overallScore = 92;
    securityData.value.lastScan = new Date().toISOString();
  }, 3000);
};

const resolveAlert = (alertId) => {
  const alert = securityAlerts.value.find((a) => a.id === alertId);
  if (alert) {
    alert.resolved = true;
  }
};

const toggleSetting = (setting) => {
  securitySettings.value[setting] = !securitySettings.value[setting];
};

const formatTime = (timeString) => {
  return new Date(timeString).toLocaleString();
};

const getTimeAgo = (timeString) => {
  const now = new Date();
  const time = new Date(timeString);
  const diff = now - time;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${minutes}m ago`;
};

// Initialize
onMounted(() => {
  // Simulate real-time updates
  setInterval(() => {
    if (Math.random() > 0.8) {
      securityData.value.threatsBlocked += Math.floor(Math.random() * 5);
    }
  }, 10000);
});
</script>

<template>
  <div
    class="pb-6 pt-2 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"
  >
    <!-- Security Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Security Score -->
      <div
        class="bg-gradient-to-br from-green-500/10 to-green-600/20 rounded-2xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold text-green-600">Security Score</p>
            <p class="text-3xl font-bold text-green-900">
              {{ securityData.overallScore }}/100
            </p>
            <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                class="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                :style="{ width: `${securityData.overallScore}%` }"
              ></div>
            </div>
          </div>
          <div class="p-3 rounded-xl bg-green-500/20 text-green-600">
            <Icon name="ph:shield-check" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Threats Blocked -->
      <div
        class="bg-gradient-to-br from-rose-500/10 to-rose-600/20 rounded-2xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold text-rose-600">Threats Blocked</p>
            <p class="text-3xl font-bold text-rose-900">
              {{ securityData.threatsBlocked.toLocaleString() }}
            </p>
            <p class="text-xs text-rose-500 mt-1">This month</p>
          </div>
          <div class="p-3 rounded-xl bg-red-500/20 text-red-600">
            <Icon name="ph:shield-warning" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Security Level -->
      <div
        class="bg-gradient-to-br from-blue-500/10 to-blue-600/20 rounded-2xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold text-blue-600">Security Level</p>
            <p class="text-3xl font-bold text-blue-900">
              {{ securityData.securityLevel }}
            </p>
            <p class="text-xs text-blue-600 font-medium mt-1">Optimal</p>
          </div>
          <div class="p-3 rounded-xl bg-blue-500/20 text-blue-600">
            <Icon name="ph:lock" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Last Scan -->
      <div
        class="bg-gradient-to-br from-purple-500/10 to-purple-600/20 rounded-2xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold text-purple-600">Last Scan</p>
            <p class="text-lg font-bold text-purple-900">
              {{ formatTime(securityData.lastScan) }}
            </p>
            <p class="text-xs text-purple-500 mt-1">
              {{ getTimeAgo(securityData.lastScan) }}
            </p>
          </div>
          <div class="p-3 rounded-xl bg-purple-500/20 text-purple-600">
            <Icon name="ph:clock" class="text-2xl" />
          </div>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
    >
      <div class="flex items-center gap-3">
        <div
          class="p-3 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl shadow-lg flex items-center justify-center"
        >
          <Icon name="ph:shield" class="w-6 h-6" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Security Center</h1>
          <p class="text-gray-600 text-sm">
            Monitor and protect your system security
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          @click="runSecurityScan"
          class="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Icon name="ph:scan" class="w-4 h-4" />
          Scan Now
        </button>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Security Alerts -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Alerts Section -->
        <div class="bg-white rounded-2xl shadow-lg py-6 border-0">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">Security Alerts</h2>
            <span
              class="bg-red-100 text-red-600 text-sm font-medium px-3 py-1 rounded-full"
            >
              {{ securityAlerts.filter((a) => !a.resolved).length }} Active
            </span>
          </div>

          <div class="space-y-4">
            <div
              v-for="alert in securityAlerts"
              :key="alert.id"
              class="p-4 rounded-xl border transition-all duration-200 hover:shadow-md"
              :class="[
                alert.resolved
                  ? 'border-green-200 bg-green-50'
                  : alert.type === 'critical'
                  ? 'border-red-200 bg-red-50'
                  : alert.type === 'warning'
                  ? 'border-orange-200 bg-orange-50'
                  : 'border-blue-200 bg-blue-50',
              ]"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="w-3 h-3 rounded-full flex-shrink-0"
                    :class="[
                      alert.resolved
                        ? 'bg-green-500'
                        : alert.type === 'critical'
                        ? 'bg-red-500'
                        : alert.type === 'warning'
                        ? 'bg-orange-500'
                        : 'bg-blue-500',
                    ]"
                  ></div>
                  <div>
                    <h3 class="font-semibold text-gray-900">
                      {{ alert.title }}
                    </h3>
                    <p class="text-sm text-gray-600">{{ alert.description }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-sm text-gray-500">{{ alert.time }}</span>
                  <button
                    v-if="!alert.resolved"
                    @click="resolveAlert(alert.id)"
                    class="text-green-600 hover:text-green-700 transition-colors"
                  >
                    <Icon name="ph:check-circle" class="w-5 h-5" />
                  </button>
                  <Icon
                    v-else
                    name="ph:check-circle"
                    class="w-5 h-5 text-green-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Activity Logs -->
        <div class="bg-white rounded-2xl shadow-lg py-6 border-0">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>

          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-rose-100">
                <tr>
                  <th class="px-4 py-3 text-left font-medium text-gray-600">
                    User
                  </th>
                  <th class="px-4 py-3 text-left font-medium text-gray-600">
                    Action
                  </th>
                  <th class="px-4 py-3 text-left font-medium text-gray-600">
                    IP Address
                  </th>
                  <th class="px-4 py-3 text-left font-medium text-gray-600">
                    Time
                  </th>
                  <th class="px-4 py-3 text-left font-medium text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="log in activityLogs"
                  :key="log.id"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="px-4 py-3 font-medium text-gray-900">
                    {{ log.user }}
                  </td>
                  <td class="px-4 py-3 text-gray-600">{{ log.action }}</td>
                  <td class="px-4 py-3 text-gray-600">{{ log.ip }}</td>
                  <td class="px-4 py-3 text-gray-600">
                    {{ getTimeAgo(log.time) }}
                  </td>
                  <td class="px-4 py-3">
                    <span
                      class="px-2 py-1 rounded-full text-xs font-medium"
                      :class="
                        log.status === 'success'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      "
                    >
                      {{ log.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Quick Actions -->
        <!-- Quick Actions -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-0">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>

          <div class="grid grid-cols-2 gap-4">
            <!-- Run Security Scan -->
            <button
              class="p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-200 group"
            >
              <div class="flex flex-col items-center text-center">
                <div
                  class="p-3 rounded-xl mb-2 bg-blue-200 group-hover:bg-blue-500"
                >
                  <Icon
                    name="ph:scan"
                    class="text-xl text-blue-600 group-hover:text-white"
                  />
                </div>
                <span class="text-sm font-medium text-gray-700"
                  >Run Security Scan</span
                >
              </div>
            </button>

            <!-- Backup Now -->
            <button
              class="p-4 rounded-xl border border-gray-200 hover:border-green-200 hover:shadow-md transition-all duration-200 group"
            >
              <div class="flex flex-col items-center text-center">
                <div
                  class="p-3 rounded-xl mb-2 bg-green-200 group-hover:bg-green-500"
                >
                  <Icon
                    name="ph:cloud-arrow-down"
                    class="text-xl text-green-600 group-hover:text-white"
                  />
                </div>
                <span class="text-sm font-medium text-gray-700"
                  >Backup Now</span
                >
              </div>
            </button>

            <!-- Firewall Settings -->
            <button
              class="p-4 rounded-xl border border-gray-200 hover:border-orange-200 hover:shadow-md transition-all duration-200 group"
            >
              <div class="flex flex-col items-center text-center">
                <div
                  class="p-3 rounded-xl mb-2 bg-orange-200 group-hover:bg-orange-500"
                >
                  <Icon
                    name="ph:fire-simple"
                    class="text-xl text-orange-600 group-hover:text-white"
                  />
                </div>
                <span class="text-sm font-medium text-gray-700"
                  >Firewall Settings</span
                >
              </div>
            </button>

            <!-- User Sessions -->
            <button
              class="p-4 rounded-xl border border-gray-200 hover:border-purple-200 hover:shadow-md transition-all duration-200 group"
            >
              <div class="flex flex-col items-center text-center">
                <div
                  class="p-3 rounded-xl mb-2 bg-purple-200 group-hover:bg-purple-500"
                >
                  <Icon
                    name="ph:users"
                    class="text-xl text-purple-600 group-hover:text-white"
                  />
                </div>
                <span class="text-sm font-medium text-gray-700"
                  >User Sessions</span
                >
              </div>
            </button>
          </div>
        </div>

        <!-- Security Settings -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-0">
          <h2 class="text-xl font-bold text-gray-900 mb-6">
            Security Settings
          </h2>

          <div class="space-y-4">
            <div
              v-for="(enabled, setting) in securitySettings"
              :key="setting"
              class="flex items-center justify-between py-2"
            >
              <div>
                <p class="font-medium text-gray-900 capitalize">
                  {{ setting.replace(/([A-Z])/g, " $1").toLowerCase() }}
                </p>
                <p
                  class="text-sm text-gray-500"
                  v-if="setting === 'lastBackup' && enabled"
                >
                  Last backup: {{ getTimeAgo(enabled) }}
                </p>
              </div>
              <button
                v-if="setting !== 'lastBackup'"
                @click="toggleSetting(setting)"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                :class="enabled ? 'bg-green-500' : 'bg-gray-200'"
              >
                <span
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  :class="enabled ? 'translate-x-6' : 'translate-x-1'"
                ></span>
              </button>
              <Icon
                v-else
                name="ph:check-circle"
                class="w-5 h-5 text-green-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Security Tips -->
    <div
      class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-6 border-0"
    >
      <h2 class="text-xl font-bold text-gray-900 mb-4">Security Tips</h2>
      <ul class="space-y-3 text-sm text-gray-700">
        <li class="flex items-center gap-2">
          <Icon
            name="ph:check-circle"
            class="w-4 h-4 text-green-500 flex-shrink-0"
          />
          Enable two-factor authentication for all users
        </li>
        <li class="flex items-center gap-2">
          <Icon
            name="ph:check-circle"
            class="w-4 h-4 text-green-500 flex-shrink-0"
          />
          Regular backup schedule is active
        </li>
        <li class="flex items-center gap-2">
          <Icon
            name="ph:warning-circle"
            class="w-4 h-4 text-orange-500 flex-shrink-0"
          />
          Update SSL certificate in 15 days
        </li>
        <li class="flex items-center gap-2">
          <Icon
            name="ph:warning-circle"
            class="w-4 h-4 text-orange-500 flex-shrink-0"
          />
          Review weak password policies
        </li>
      </ul>
    </div>
  </div>
</template>
