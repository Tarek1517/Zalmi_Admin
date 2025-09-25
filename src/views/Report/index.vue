<script setup>
import { ref, onMounted } from "vue";

// Mock analytics data
const analyticsData = ref({
  revenue: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [12500, 19000, 22000, 17800, 24500, 31000],
  },
  users: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    values: [450, 620, 780, 690, 920, 1150],
  },
  trafficSources: {
    labels: ["Direct", "Social", "Search", "Email", "Referral"],
    values: [35, 25, 20, 12, 8],
  },
  performance: {
    labels: ["Page Views", "Avg. Session", "Bounce Rate", "Conversion"],
    values: [12500, "3m 45s", "42%", "2.8%"],
  },
});

// Stats cards data
const statsCards = ref([
  {
    title: "Total Revenue",
    value: "$125,800",
    change: "+12.5%",
    icon: "ph:currency-dollar",
    gradient: "from-blue-500/10 to-blue-600/20",
    color: "blue",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-600",
  },
  {
    title: "Active Users",
    value: "5,240",
    change: "+8.2%",
    icon: "ph:users",
    gradient: "from-green-500/10 to-green-600/20",
    color: "green",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-600",
  },
  {
    title: "Avg. Session",
    value: "3m 45s",
    change: "-2.1%",
    icon: "ph:clock",
    gradient: "from-purple-500/10 to-purple-600/20",
    color: "purple",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-600",
  },
]);

// Filters
const dateRange = ref("last30days");
const dateRanges = [
  { value: "last7days", label: "Last 7 Days" },
  { value: "last30days", label: "Last 30 Days" },
  { value: "last90days", label: "Last 90 Days" },
  { value: "custom", label: "Custom Range" },
];

const reportType = ref("overview");
const reportTypes = [
  { value: "overview", label: "Overview" },
  { value: "revenue", label: "Revenue" },
  { value: "users", label: "Users" },
  { value: "traffic", label: "Traffic Sources" },
];

const exportFormat = ref("pdf");
const exportFormats = [
  { value: "pdf", label: "PDF" },
  { value: "csv", label: "CSV" },
  { value: "excel", label: "Excel" },
];

const isLoading = ref(false);

// Helpers
const generateLinePoints = (values, maxHeight, maxValue) => {
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * 350 + 25;
    const y = maxHeight - (value / maxValue) * maxHeight;
    return `${x},${y}`;
  });
  return points.join(" ");
};

const getPieSegmentStyle = (value, index) => {
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
  let startAngle = 0;

  for (let i = 0; i < index; i++) {
    startAngle += analyticsData.value.trafficSources.values[i] * 3.6;
  }

  const angle = value * 3.6;
  return {
    background: `conic-gradient(${colors[index]} 0deg ${angle}deg, transparent ${angle}deg 360deg)`,
    transform: `rotate(${startAngle}deg)`,
  };
};

const getLegendColor = (index) => {
  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
  return { backgroundColor: colors[index] };
};

// Actions
const generateReport = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    console.log("Report generated:", dateRange.value, reportType.value);
  }, 1500);
};

const exportReport = () => {
  console.log("Exporting report:", exportFormat.value);
};

// Mock live update
onMounted(() => {
  setInterval(() => {
    if (Math.random() > 0.7) {
      const randomIndex = Math.floor(
        Math.random() * analyticsData.value.revenue.values.length
      );
      analyticsData.value.revenue.values[randomIndex] +=
        Math.floor(Math.random() * 1000) - 500;
    }
  }, 5000);
});
</script>

<template>
  <div
    class="space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"
  >
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3">
      <div
        v-for="(card, index) in statsCards"
        :key="index"
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        :class="`bg-gradient-to-br ${card.gradient}`"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase"
              :class="`text-${card.color}-600/80`"
            >
              {{ card.title }}
            </p>
            <p class="text-3xl font-bold" :class="`text-${card.color}-900`">
              {{ card.value }}
            </p>
            <span
              class="text-xs font-medium px-2 py-1 rounded-lg mt-2 inline-block"
              :class="
                card.change.includes('+')
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              "
            >
              {{ card.change }}
            </span>
          </div>
          <div class="p-3 rounded-xl shadow-md" :class="card.iconBg">
            <Icon :name="card.icon" :class="`text-2xl ${card.iconColor}`" />
          </div>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div class="flex items-center justify-between gap-4 py-3">
      <div class="flex items-center gap-3">
        <div
          class="p-3 bg-gradient-to-br from-blue-100 to-blue-300 text-white rounded-2xl shadow-lg flex items-center justify-center"
        >
          <Icon name="ph:chart-bar" class="w-6 h-6 text-blue-700" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p class="text-gray-600 text-sm">
            Track and analyze your business performance
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <select
          v-model="exportFormat"
          class="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          <option
            v-for="format in exportFormats"
            :key="format.value"
            :value="format.value"
          >
            {{ format.label }}
          </option>
        </select>
        <button
          @click="exportReport"
          class="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Icon name="ph:export" class="w-4 h-4" />
          Export
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div
      class="flex flex-wrap justify-between gap-4 items-center bg-white rounded-xl border border-gray-100"
    >
      <div class="flex gap-6">
        <div>
          <label class="text-sm text-gray-500">Date Range</label>
          <select
            v-model="dateRange"
            class="border border-primary/25 rounded-lg px-3 py-2 text-sm ml-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option
              v-for="range in dateRanges"
              :key="range.value"
              :value="range.value"
            >
              {{ range.label }}
            </option>
          </select>
        </div>

        <div>
          <label class="text-sm text-gray-500">Report Type</label>
          <select
            v-model="reportType"
            class="border border-primary/25 rounded-lg px-3 py-2 text-sm ml-2 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option
              v-for="type in reportTypes"
              :key="type.value"
              :value="type.value"
            >
              {{ type.label }}
            </option>
          </select>
        </div>
      </div>
      <button
        @click="generateReport"
        :disabled="isLoading"
        class="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50"
      >
        <Icon
          name="ph:arrow-clockwise"
          class="w-4 h-4"
          :class="{ 'animate-spin': isLoading }"
        />
        {{ isLoading ? "Generating..." : "Generate Report" }}
      </button>
    </div>

    <!-- Analytics Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Revenue -->
      <div
        class="bg-green-100 rounded-xl shadow-lg p-6 flex flex-col border border-gray-100 transition-all duration-300 hover:shadow-xl"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold text-gray-800 text-lg">Revenue Overview</h3>
          <span
            class="text-green-600 text-sm font-medium bg-green-100 px-2 py-1 rounded-lg"
          >
            +12.5%
          </span>
        </div>
        <div class="flex flex-cols-6 gap-4 items-end h-48">
          <div
            v-for="(value, index) in analyticsData.revenue.values"
            :key="index"
            class="flex flex-col items-center"
          >
            <div
              class="w-8 bg-gradient-to-t from-blue-500 to-blue-600 rounded-md transition-all duration-500 hover:from-blue-600 hover:to-blue-700"
              :style="{ height: (value / 35000) * 100 + '%' }"
            ></div>
            <span class="text-xs mt-2 text-gray-600">{{
              analyticsData.revenue.labels[index]
            }}</span>
          </div>
        </div>
      </div>

      <!-- Users -->
      <div
        class="bg-orange-100 rounded-xl shadow-lg p-6 flex flex-col border border-gray-100 transition-all duration-300 hover:shadow-xl"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold text-gray-800 text-lg">User Growth</h3>
          <span
            class="text-green-600 text-sm font-medium bg-green-100 px-2 py-1 rounded-lg"
          >
            +8.2%
          </span>
        </div>
        <svg class="w-full h-40" viewBox="0 0 400 200">
          <defs>
            <linearGradient
              id="userGrowthGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3" />
              <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path
            :d="`M25,${
              200 - (analyticsData.users.values[0] / 1200) * 200
            } ${generateLinePoints(analyticsData.users.values, 200, 1200)
              .split(' ')
              .map((point, i) => (i > 0 ? `L${point}` : ''))
              .join(' ')} L375,200 L25,200 Z`"
            fill="url(#userGrowthGradient)"
          />
          <polyline
            :points="generateLinePoints(analyticsData.users.values, 200, 1200)"
            class="fill-none stroke-indigo-500 stroke-2"
          />
        </svg>
        <div class="flex justify-between text-xs text-gray-500 mt-2">
          <span v-for="label in analyticsData.users.labels" :key="label">{{
            label
          }}</span>
        </div>
      </div>

      <!-- Traffic -->
      <div
        class="bg-blue-100 rounded-xl shadow-lg p-6 flex flex-col border border-gray-100 transition-all duration-300 hover:shadow-xl"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold text-gray-800 text-lg">Traffic Sources</h3>
          <span
            class="text-indigo-600 text-sm font-medium bg-indigo-100 px-2 py-1 rounded-lg"
          >
            Total 100%
          </span>
        </div>
        <div class="flex gap-6">
          <div
            class="relative w-32 h-32 rounded-full overflow-hidden shadow-md"
          >
            <div
              v-for="(value, index) in analyticsData.trafficSources.values"
              :key="index"
              class="absolute inset-0"
              :style="getPieSegmentStyle(value, index)"
            ></div>
          </div>
          <div class="flex flex-col justify-center space-y-2 text-sm">
            <div
              v-for="(label, index) in analyticsData.trafficSources.labels"
              :key="label"
              class="flex items-center gap-2"
            >
              <span
                class="w-3 h-3 rounded-full"
                :style="getLegendColor(index)"
              ></span>
              <span class="text-gray-700">{{ label }}</span>
              <span class="ml-auto text-gray-500"
                >{{ analyticsData.trafficSources.values[index] }}%</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-6">
      <!-- Performance -->
      <div
        class="bg-white rounded-xl py-6 flex flex-col col-span-1 xl:col-span-2 border border-gray-100 transition-all duration-300"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold text-gray-800 text-lg">
            Performance Metrics
          </h3>
          <span
            class="text-yellow-600 text-sm font-medium bg-yellow-100 px-2 py-1 rounded-lg"
          >
            -2.1%
          </span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="(value, index) in analyticsData.performance.values"
            :key="index"
            class="bg-gradient-to-t from-blue-100 to-blue-200 p-4 rounded-lg text-center border border-gray-200 transition-all duration-300 hover:shadow-md"
          >
            <div class="text-lg font-semibold text-gray-900">{{ value }}</div>
            <div class="text-sm text-gray-500">
              {{ analyticsData.performance.labels[index] }}
            </div>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div
        class="bg-white rounded-xl shadow-lg py-6 col-span-1 xl:col-span-3 border border-gray-100 transition-all duration-300 hover:shadow-xl"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold text-gray-800 text-lg">
            Detailed Analytics
          </h3>
          <button
            class="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1"
          >
            View All
            <Icon name="ph:arrow-right" class="w-4 h-4" />
          </button>
        </div>
        <div class="overflow-x-auto rounded-lg border border-gray-200">
          <table class="w-full text-sm text-left">
            <thead
              class="bg-gradient-to-r from-blue-100 to-gray-200 text-gray-600"
            >
              <tr>
                <th class="px-4 py-3 font-medium">Date</th>
                <th class="px-4 py-3 font-medium">Revenue</th>
                <th class="px-4 py-3 font-medium">Users</th>
                <th class="px-4 py-3 font-medium">Sessions</th>
                <th class="px-4 py-3 font-medium">Conversion</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="i in 5"
                :key="i"
                class="border-t border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                <td class="px-4 py-3">Jun {{ 25 - i }}, 2023</td>
                <td class="px-4 py-3 font-medium">
                  ${{ (Math.random() * 5000 + 1000).toFixed(0) }}
                </td>
                <td class="px-4 py-3">
                  {{ Math.floor(Math.random() * 200 + 50) }}
                </td>
                <td class="px-4 py-3">
                  {{ Math.floor(Math.random() * 500 + 100) }}
                </td>
                <td class="px-4 py-3">
                  {{ (Math.random() * 5 + 1).toFixed(1) }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover\:-translate-y-1:hover {
  transform: translateY(-4px);
}
/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
