<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Warehouse Revenue</h2>
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 px-4 py-2 text-green-800 bg-green-100 hover:bg-green-300 text-gray-700 rounded-lg">
          <Icon name="ph:export" class="text-lg" />
          
        </button>
        <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>This Year</option>
          <option>Custom Range</option>
        </select>
      </div>
    </div>

    <!-- Revenue Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-green-50 rounded-lg p-4 border border-green-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-green-600 font-medium">Total Revenue</p>
            <p class="text-2xl font-bold text-green-900">
              {{ currency_symbol }}{{ totalRevenue.toLocaleString() }}
            </p>
            <p class="text-xs text-green-500 mt-1">+12.5% from last month</p>
          </div>
          <Icon name="ph:currency-dollar" class="text-2xl text-green-500" />
        </div>
      </div>
      
      <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-blue-600 font-medium">Avg Order Value</p>
            <p class="text-2xl font-bold text-blue-900">
              {{ currency_symbol }}{{ averageOrderValue.toFixed(2) }}
            </p>
            <p class="text-xs text-blue-500 mt-1">+8.2% from last month</p>
          </div>
          <Icon name="ph:shopping-cart" class="text-2xl text-blue-500" />
        </div>
      </div>
      
      <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-purple-600 font-medium">Orders Processed</p>
            <p class="text-2xl font-bold text-purple-900">
              {{ totalOrders.toLocaleString() }}
            </p>
            <p class="text-xs text-purple-500 mt-1">+15.3% from last month</p>
          </div>
          <Icon name="ph:package" class="text-2xl text-purple-500" />
        </div>
      </div>
      
      <div class="bg-orange-50 rounded-lg p-4 border border-orange-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-orange-600 font-medium">Fulfillment Rate</p>
            <p class="text-2xl font-bold text-orange-900">
              {{ fulfillmentRate }}%
            </p>
            <p class="text-xs text-orange-500 mt-1">99.2% on-time delivery</p>
          </div>
          <Icon name="ph:check-circle" class="text-2xl text-orange-500" />
        </div>
      </div>
    </div>

    <!-- Revenue Chart Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <!-- Main Chart -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-semibold text-gray-900">Revenue Overview</h3>
          <div class="flex gap-2">
            <button class="px-3 py-1 bg-primary text-white rounded-lg text-sm">Monthly</button>
            <button class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">Quarterly</button>
            <button class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">Yearly</button>
          </div>
        </div>
        <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div class="text-center text-gray-500">
            <Icon name="ph:chart-line" class="text-4xl mx-auto mb-2" />
            <p>Revenue chart will be displayed here</p>
          </div>
        </div>
      </div>

      <!-- Revenue by Category -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="font-semibold text-gray-900 mb-6">Revenue by Category</h3>
        <div class="space-y-4">
          <div v-for="category in revenueByCategory" :key="category.name" class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: category.color }"></div>
              <span class="text-sm font-medium text-gray-700">{{ category.name }}</span>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium text-gray-900">{{ currency_symbol }}{{ category.amount.toLocaleString() }}</div>
              <div class="text-xs text-gray-500">{{ category.percentage }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Revenue Details -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 class="font-semibold text-gray-900 text-lg">
          Revenue Details ({{ revenueDetails.length }})
        </h3>
        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search revenue records..."
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm flex-1"
          />
          <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Types</option>
            <option>Order Revenue</option>
            <option>Storage Fees</option>
            <option>Fulfillment Fees</option>
            <option>Other Income</option>
          </select>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <div class="min-w-[1000px]">
          <table class="w-full divide-y divide-gray-200">
            <thead class="bg-purple-200">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Order ID
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Type
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Description
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Amount
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in revenueDetails" :key="item.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.date }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                  {{ item.order_id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                    :class="getTypeClass(item.type)"
                  >
                    {{ item.type }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ item.description }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  +{{ currency_symbol }}{{ item.amount.toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getStatusClass(item.status)"
                  >
                    {{ item.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button class="text-primary hover:text-primary/80 text-sm">
                     <Icon name="material-symbols-light:eye-tracking-outline" class="text-base" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Pagination -->
      <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of <span class="font-medium">45</span> results
          </div>
          <div class="flex items-center gap-2">
            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              Previous
            </button>
            <button class="px-3 py-1 bg-primary text-white rounded-md text-sm">
              1
            </button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              2
            </button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              3
            </button>
            <button class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currency_symbol = "$";

// Warehouse revenue data
const totalRevenue = ref(125847.50);
const totalOrders = ref(1560);
const averageOrderValue = ref(80.67);
const fulfillmentRate = ref(98.7);

const revenueByCategory = ref([
  { name: "Electronics", amount: 45800, percentage: 36.4, color: "#3B82F6" },
  { name: "Clothing", amount: 28950, percentage: 23.0, color: "#10B981" },
  { name: "Home & Kitchen", amount: 18750, percentage: 14.9, color: "#F59E0B" },
  { name: "Sports", amount: 15600, percentage: 12.4, color: "#EF4444" },
  { name: "Other", amount: 16747.5, percentage: 13.3, color: "#8B5CF6" }
]);

const revenueDetails = ref([
  {
    id: 1,
    date: "2023-10-15",
    order_id: "WH-ORD-001",
    type: "Order Revenue",
    description: "Wireless Headphones (3 units)",
    amount: 249.99,
    status: "Completed"
  },
  {
    id: 2,
    date: "2023-10-15",
    order_id: "WH-ORD-002",
    type: "Fulfillment Fee",
    description: "Standard shipping fee",
    amount: 8.99,
    status: "Completed"
  },
  {
    id: 3,
    date: "2023-10-14",
    order_id: "WH-ORD-003",
    type: "Order Revenue",
    description: "Smart Watch (2 units)",
    amount: 599.98,
    status: "Completed"
  },
  {
    id: 4,
    date: "2023-10-14",
    order_id: "WH-ORD-004",
    type: "Storage Fee",
    description: "Monthly storage charge",
    amount: 120.00,
    status: "Completed"
  },
  {
    id: 5,
    date: "2023-10-13",
    order_id: "WH-ORD-005",
    type: "Order Revenue",
    description: "Fitness Equipment (1 unit)",
    amount: 299.99,
    status: "Completed"
  },
  {
    id: 6,
    date: "2023-10-13",
    order_id: "WH-ORD-006",
    type: "Fulfillment Fee",
    description: "Express shipping fee",
    amount: 15.99,
    status: "Completed"
  },
  {
    id: 7,
    date: "2023-10-12",
    order_id: "WH-ORD-007",
    type: "Order Revenue",
    description: "Home Appliances (4 units)",
    amount: 899.96,
    status: "Completed"
  },
  {
    id: 8,
    date: "2023-10-12",
    order_id: "WH-ORD-008",
    type: "Other Income",
    description: "Packaging service fee",
    amount: 5.50,
    status: "Completed"
  },
  {
    id: 9,
    date: "2023-10-11",
    order_id: "WH-ORD-009",
    type: "Order Revenue",
    description: "Sports Equipment (2 units)",
    amount: 159.98,
    status: "Pending"
  },
  {
    id: 10,
    date: "2023-10-11",
    order_id: "WH-ORD-010",
    type: "Fulfillment Fee",
    description: "Standard shipping fee",
    amount: 8.99,
    status: "Pending"
  }
]);

// Get type class
const getTypeClass = (type) => {
  const classes = {
    'Order Revenue': 'bg-blue-100 text-blue-800',
    'Fulfillment Fee': 'bg-green-100 text-green-800',
    'Storage Fee': 'bg-yellow-100 text-yellow-800',
    'Other Income': 'bg-purple-100 text-purple-800'
  };
  return classes[type] || 'bg-gray-100 text-gray-800';
};

// Get status class
const getStatusClass = (status) => {
  const classes = {
    'Completed': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Failed': 'bg-red-100 text-red-800'
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};
</script>