<script setup>
import { ref } from "vue";

// Sample data for the admin dashboard
const metrics = ref({
  totalUsers: 1247,
  activeUsers: 892,
  newRegistrations: 48,
  pendingApprovals: 23,
  systemHealth: 98.7,
  revenue: 125430,
  ordersToday: 156,
  securityAlerts: 2,
});

const recentActivities = ref([
  {
    id: 1,
    user: "John Doe",
    action: "New vendor registration",
    time: "2 min ago",
    type: "user",
  },
  {
    id: 2,
    user: "System",
    action: "Database backup completed",
    time: "15 min ago",
    type: "system",
  },
  {
    id: 3,
    user: "Sarah Wilson",
    action: "Product approval requested",
    time: "30 min ago",
    type: "approval",
  },
  {
    id: 4,
    user: "Mike Chen",
    action: "Order #ORD-7842 processed",
    time: "45 min ago",
    type: "order",
  },
  {
    id: 5,
    user: "System",
    action: "Security scan completed",
    time: "1 hour ago",
    type: "security",
  },
]);

const quickStats = ref([
  { title: "Vendors", value: 156, icon: "ph:storefront", color: "blue" },
  { title: "Affiliates", value: 89, icon: "ph:handshake", color: "green" },
  {
    title: "Orders Today",
    value: 247,
    icon: "ph:shopping-cart",
    color: "orange",
  },
  {
    title: "Revenue",
    value: "$12.5K",
    icon: "ph:currency-dollar",
    color: "purple",
  },
]);

// Warehouse data
const warehouseStats = ref({
  totalCapacity: 5000,
  usedCapacity: 3250,
  lowStockItems: 12,
  incomingShipments: 5,
  outgoingShipments: 23,
});

// Recent orders data
const recentOrders = ref([
  {
    id: "ORD-7842",
    customer: "Mike Chen",
    date: "2023-04-15",
    amount: "$245.99",
    status: "Completed",
    items: 3,
  },
  {
    id: "ORD-7841",
    customer: "Sarah Johnson",
    date: "2023-04-15",
    amount: "$89.50",
    status: "Processing",
    items: 2,
  },
  {
    id: "ORD-7840",
    customer: "Alex Kim",
    date: "2023-04-15",
    amount: "$1,245.00",
    status: "Completed",
    items: 5,
  },
  {
    id: "ORD-7839",
    customer: "Emma Wilson",
    date: "2023-04-14",
    amount: "$56.75",
    status: "Shipped",
    items: 1,
  },
  {
    id: "ORD-7838",
    customer: "David Miller",
    date: "2023-04-14",
    amount: "$345.25",
    status: "Processing",
    items: 4,
  },
]);
</script>

<template>
  <div class="space-y-6">
    <!-- Quick Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(stat, index) in quickStats"
        :key="index"
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        :class="{
          'bg-gradient-to-br from-blue-500/10 to-blue-600/20':
            stat.color === 'blue',
          'bg-gradient-to-br from-emerald-500/10 to-emerald-600/20':
            stat.color === 'green',
          'bg-gradient-to-br from-amber-500/10 to-amber-600/20':
            stat.color === 'orange',
          'bg-gradient-to-br from-violet-500/10 to-violet-600/20':
            stat.color === 'purple',
        }"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase"
              :class="{
                'text-blue-600/80': stat.color === 'blue',
                'text-emerald-600/80': stat.color === 'green',
                'text-amber-600/80': stat.color === 'orange',
                'text-violet-600/80': stat.color === 'purple',
              }"
            >
              {{ stat.title }}
            </p>
            <p
              class="text-3xl font-bold mt-2"
              :class="{
                'text-blue-900': stat.color === 'blue',
                'text-emerald-900': stat.color === 'green',
                'text-amber-900': stat.color === 'orange',
                'text-violet-900': stat.color === 'purple',
              }"
            >
              {{ stat.value }}
            </p>
            <p
              class="text-xs font-medium mt-2 flex items-center"
              :class="{
                'text-blue-600': stat.color === 'blue',
                'text-emerald-600': stat.color === 'green',
                'text-amber-600': stat.color === 'orange',
                'text-violet-600': stat.color === 'purple',
              }"
            >
              <span class="inline-flex items-center">
                <Icon name="ph:trend-up" class="mr-1" />
                +{{ Math.floor(Math.random() * 15) + 5 }}% from last week
              </span>
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md"
            :class="{
              'bg-blue-500/20 text-blue-600': stat.color === 'blue',
              'bg-emerald-500/20 text-emerald-600': stat.color === 'green',
              'bg-amber-500/20 text-amber-600': stat.color === 'orange',
              'bg-violet-500/20 text-violet-600': stat.color === 'purple',
            }"
          >
            <Icon :name="stat.icon" class="text-2xl" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Warehouse Overview Card -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-0">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900">Warehouse Overview</h3>
            <span
              class="text-sm font-semibold bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
              >65% Capacity Used</span
            >
          </div>
          <div class="space-y-6">
            <!-- Capacity Bar -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-700"
                  >Storage Capacity</span
                >
                <span class="text-sm font-semibold text-gray-900"
                  >{{ warehouseStats.usedCapacity }} /
                  {{ warehouseStats.totalCapacity }} units</span
                >
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  class="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full shadow-inner"
                  style="width: 65%"
                ></div>
              </div>
            </div>

            <!-- Warehouse Stats -->
            <div class="grid grid-cols-2 gap-4">
              <div
                class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-100"
              >
                <div class="flex items-center">
                  <div
                    class="bg-white p-2 rounded-lg shadow-sm mr-3 border border-blue-100"
                  >
                    <Icon name="ph:package" class="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-600">
                      Low Stock Items
                    </p>
                    <p class="text-xl font-bold text-gray-900">
                      {{ warehouseStats.lowStockItems }}
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-100"
              >
                <div class="flex items-center">
                  <div
                    class="bg-white p-2 rounded-lg shadow-sm mr-3 border border-emerald-100"
                  >
                    <Icon
                      name="ph:arrow-down"
                      class="text-emerald-600 text-xl"
                    />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-600">
                      Incoming Shipments
                    </p>
                    <p class="text-xl font-bold text-gray-900">
                      {{ warehouseStats.incomingShipments }}
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-100"
              >
                <div class="flex items-center">
                  <div
                    class="bg-white p-2 rounded-lg shadow-sm mr-3 border border-amber-100"
                  >
                    <Icon name="ph:arrow-up" class="text-amber-600 text-xl" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-600">
                      Outgoing Shipments
                    </p>
                    <p class="text-xl font-bold text-gray-900">
                      {{ warehouseStats.outgoingShipments }}
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="bg-gradient-to-br from-violet-50 to-violet-100 p-4 rounded-xl border border-violet-100"
              >
                <div class="flex items-center">
                  <div
                    class="bg-white p-2 rounded-lg shadow-sm mr-3 border border-violet-100"
                  >
                    <Icon name="ph:warning" class="text-violet-600 text-xl" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-600">
                      Needs Attention
                    </p>
                    <p class="text-xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions Card -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-0">
          <h3 class="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div class="grid grid-cols-2 gap-4">
            <button
              class="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 group"
            >
              <div class="flex flex-col items-center">
                <div
                  class="bg-white p-2 rounded-lg shadow-sm mb-2 border border-blue-100 group-hover:shadow-md transition-shadow"
                >
                  <Icon name="ph:user-plus" class="text-blue-600 text-lg" />
                </div>
                <span class="text-sm font-semibold text-blue-700"
                  >Add User</span
                >
              </div>
            </button>
            <button
              class="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-100 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300 group"
            >
              <div class="flex flex-col items-center">
                <div
                  class="bg-white p-2 rounded-lg shadow-sm mb-2 border border-emerald-100 group-hover:shadow-md transition-shadow"
                >
                  <Icon name="ph:gear" class="text-emerald-600 text-lg" />
                </div>
                <span class="text-sm font-semibold text-emerald-700"
                  >Settings</span
                >
              </div>
            </button>
            <button
              class="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-100 hover:from-amber-100 hover:to-amber-200 transition-all duration-300 group"
            >
              <div class="flex flex-col items-center">
                <div
                  class="bg-white p-2 rounded-lg shadow-sm mb-2 border border-amber-100 group-hover:shadow-md transition-shadow"
                >
                  <Icon name="ph:chart-bar" class="text-amber-600 text-lg" />
                </div>
                <span class="text-sm font-semibold text-amber-700"
                  >Reports</span
                >
              </div>
            </button>
            <button
              class="p-4 bg-gradient-to-br from-violet-100 to-violet-200 rounded-xl border border-violet-100 hover:from-violet-200 hover:to-violet-200 transition-all duration-300 group"
            >
              <div class="flex flex-col items-center">
                <div
                  class="bg-white p-2 rounded-lg shadow-sm mb-2 border border-violet-100 group-hover:shadow-md transition-shadow"
                >
                  <Icon name="ph:shield" class="text-violet-600 text-lg" />
                </div>
                <span class="text-sm font-semibold text-violet-700"
                  >Security</span
                >
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Recent Activity Card -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-0">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-gray-900">Recent Activity</h3>
            <button
              class="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
            >
              View all
              <Icon name="ph:arrow-right" class="ml-1" />
            </button>
          </div>
          <div class="space-y-4">
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50/80 transition-all duration-300 group"
            >
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border"
                :class="{
                  'bg-blue-50 border-blue-200': activity.type === 'user',
                  'bg-gray-50 border-gray-200': activity.type === 'system',
                  'bg-amber-50 border-amber-200': activity.type === 'approval',
                  'bg-emerald-50 border-emerald-200': activity.type === 'order',
                  'bg-rose-50 border-rose-200': activity.type === 'security',
                }"
              >
                <Icon
                  :name="
                    {
                      user: 'ph:user',
                      system: 'ph:gear',
                      approval: 'ph:check-circle',
                      order: 'ph:shopping-cart',
                      security: 'ph:shield',
                    }[activity.type]
                  "
                  :class="{
                    'text-blue-600': activity.type === 'user',
                    'text-gray-600': activity.type === 'system',
                    'text-amber-600': activity.type === 'approval',
                    'text-emerald-600': activity.type === 'order',
                    'text-rose-600': activity.type === 'security',
                  }"
                  class="text-lg"
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-gray-900 truncate">
                  {{ activity.user }}
                </p>
                <p class="text-sm text-gray-600 truncate">
                  {{ activity.action }}
                </p>
                <p class="text-xs text-gray-400 mt-1 flex items-center">
                  <Icon name="ph:clock" class="mr-1" />
                  {{ activity.time }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Orders Card -->
    <div class="bg-white rounded-2xl shadow-lg p-6 border-0">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-gray-900">Recent Orders</h3>
        <button
          class="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
        >
          <Icon name="ph:list" class="mr-2" />
          View All Orders
        </button>
      </div>

      <div class="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50/80">
              <th
                class="py-4 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                class="py-4 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                class="py-4 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="py-4 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                class="py-4 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Items
              </th>
              <th
                class="py-4 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="py-4 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200/80">
            <tr
              v-for="order in recentOrders"
              :key="order.id"
              class="hover:bg-gray-50/50 transition-colors duration-200"
            >
              <td class="py-4 px-4 font-medium text-blue-600">
                {{ order.id }}
              </td>
              <td class="py-4 px-4 font-medium text-gray-900">
                {{ order.customer }}
              </td>
              <td class="py-4 px-4 text-gray-600">{{ order.date }}</td>
              <td class="py-4 px-4 font-semibold text-gray-900">
                {{ order.amount }}
              </td>
              <td class="py-4 px-4 text-gray-600">{{ order.items }} items</td>
              <td class="py-4 px-4">
                <span
                  :class="{
                    'bg-emerald-100 text-emerald-800':
                      order.status === 'Completed',
                    'bg-blue-100 text-blue-800': order.status === 'Processing',
                    'bg-amber-100 text-amber-800': order.status === 'Shipped',
                  }"
                  class="px-3 py-1.5 rounded-full text-xs font-medium"
                >
                  {{ order.status }}
                </span>
              </td>
              <td class="py-4 px-4">
                <button
                  class="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center transition-colors"
                >
                  <Icon name="ph:eye" class="mr-1" />
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
