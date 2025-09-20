<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Return Management</h2>
      <div class="flex items-center gap-3">
        <button
          class="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
        >
          <Icon name="ph:export" class="text-lg" />
          Export
        </button>
        <button
          class="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
        >
          <Icon name="ph:plus" class="text-lg" />
          Process Return
        </button>
      </div>
    </div>

    <!-- Return Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-blue-600 font-medium">Total Returns</p>
            <p class="text-2xl font-bold text-blue-900">156</p>
          </div>
          <Icon name="ph:arrow-u-up-left" class="text-2xl text-blue-500" />
        </div>
      </div>

      <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-yellow-600 font-medium">
              Pending Processing
            </p>
            <p class="text-2xl font-bold text-yellow-900">28</p>
          </div>
          <Icon name="ph:clock" class="text-2xl text-yellow-500" />
        </div>
      </div>

      <div class="bg-green-50 rounded-lg p-4 border border-green-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-green-600 font-medium">Processed Today</p>
            <p class="text-2xl font-bold text-green-900">12</p>
          </div>
          <Icon name="ph:check-circle" class="text-2xl text-green-500" />
        </div>
      </div>

      <div class="bg-red-50 rounded-lg p-4 border border-red-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-red-600 font-medium">Refund Issued</p>
            <p class="text-2xl font-bold text-red-900">$2,845</p>
          </div>
          <Icon name="ph:currency-dollar" class="text-2xl text-red-500" />
        </div>
      </div>
    </div>

    <!-- Return Filters -->
    <div class="bg-white rounded-xl mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Return ID</label
          >
          <input
            type="text"
            placeholder="Enter return ID"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Status</label
          >
          <select
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option>All Status</option>
            <option>Requested</option>
            <option>Approved</option>
            <option>In Transit</option>
            <option>Received</option>
            <option>Processed</option>
            <option>Rejected</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Return Reason</label
          >
          <select
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option>All Reasons</option>
            <option>Defective</option>
            <option>Wrong Item</option>
            <option>Size Issue</option>
            <option>Changed Mind</option>
            <option>Late Delivery</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Date Range</label
          >
          <select
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Custom Range</option>
          </select>
        </div>
      </div>
      <div class="flex justify-end gap-3 mt-4">
        <button
          class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
        >
          Clear Filters
        </button>
        <button
          class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90"
        >
          Apply Filters
        </button>
      </div>
    </div>

    <!-- Returns Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div
        class="py-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <h3 class="font-semibold text-gray-900 text-lg">
          Return Requests ({{ returnRequests.length }})
        </h3>
        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search returns..."
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm flex-1"
          />
          <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <option>Sort by: Newest</option>
            <option>Sort by: Oldest</option>
            <option>Sort by: Status</option>
            <option>Sort by: Amount</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <div class="min-w-[1000px]">
          <table class="w-full divide-y divide-gray-200">
            <thead class="bg-red-100">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Return ID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Order ID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Customer
                </th>

                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Reason
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  QTY
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Amount
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Request
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="returnItem in returnRequests" :key="returnItem.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-blue-600">
                    {{ returnItem.returnId }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ returnItem.orderId }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ returnItem.customer }}
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ returnItem.email }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {{ returnItem.reason }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ returnItem.quantity }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600"
                >
                  -${{ returnItem.amount.toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ returnItem.requestDate }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getStatusClass(returnItem.status)"
                  >
                    {{ returnItem.status }}
                  </span>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium relative"
                >
                  <!-- 3-dot button -->
                  <button
                    @click="toggleMenu(returnItem.id)"
                    class="p-1 text-primary"
                  >
                    <Icon name="ph:dots-three-vertical-duotone" class="text-lg" />
                  </button>

                  <!-- Dropdown Menu -->
                  <div
                    v-if="openMenuId === returnItem.id"
                    class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20"
                  >
                    <button
                      class="w-full flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                      @click="viewDetails(returnItem)"
                    >
                      <Icon name="ph:eye" class="text-base" /> View Details
                    </button>
                    <button
                      class="w-full flex items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                      @click="approveReturn(returnItem)"
                    >
                      <Icon name="ph:check" class="text-base" /> Approve Return
                    </button>
                    <button
                      class="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      @click="rejectReturn(returnItem)"
                    >
                      <Icon name="ph:x" class="text-base" /> Reject Return
                    </button>
                    <button
                      class="w-full flex items-center gap-2 px-4 py-2 text-sm text-purple-600 hover:bg-purple-50"
                      @click="processRefund(returnItem)"
                    >
                      <Icon name="ph:currency-dollar" class="text-base" />
                      Process Refund
                    </button>
                  </div>
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
            Showing <span class="font-medium">1</span> to
            <span class="font-medium">10</span> of
            <span class="font-medium">156</span> results
          </div>
          <div class="flex items-center gap-2">
            <button
              class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              Previous
            </button>
            <button class="px-3 py-1 bg-primary text-white rounded-md text-sm">
              1
            </button>
            <button
              class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              2
            </button>
            <button
              class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              3
            </button>
            <button
              class="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Return Processing Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <!-- Quick Actions -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="font-semibold text-gray-900 mb-4">Quick Return Actions</h3>
        <div class="space-y-4">
          <button
            class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"
              >
                <Icon name="ph:check-circle" class="text-green-600 text-lg" />
              </div>
              <div>
                <h4 class="font-medium text-gray-900">Approve Returns</h4>
                <p class="text-sm text-gray-500">
                  Approve pending return requests
                </p>
              </div>
            </div>
            <Icon name="ph:arrow-right" class="text-gray-400 text-lg" />
          </button>

          <button
            class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"
              >
                <Icon name="ph:truck" class="text-blue-600 text-lg" />
              </div>
              <div>
                <h4 class="font-medium text-gray-900">
                  Generate Return Labels
                </h4>
                <p class="text-sm text-gray-500">
                  Create shipping labels for returns
                </p>
              </div>
            </div>
            <Icon name="ph:arrow-right" class="text-gray-400 text-lg" />
          </button>

          <button
            class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"
              >
                <Icon
                  name="ph:currency-dollar"
                  class="text-purple-600 text-lg"
                />
              </div>
              <div>
                <h4 class="font-medium text-gray-900">Process Refunds</h4>
                <p class="text-sm text-gray-500">
                  Issue refunds for processed returns
                </p>
              </div>
            </div>
            <Icon name="ph:arrow-right" class="text-gray-400 text-lg" />
          </button>

          <button
            class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center"
              >
                <Icon name="ph:x-circle" class="text-red-600 text-lg" />
              </div>
              <div>
                <h4 class="font-medium text-gray-900">Reject Returns</h4>
                <p class="text-sm text-gray-500">
                  Review and reject invalid returns
                </p>
              </div>
            </div>
            <Icon name="ph:arrow-right" class="text-gray-400 text-lg" />
          </button>
        </div>
      </div>

      <!-- Return Statistics -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="font-semibold text-gray-900 mb-4">Return Statistics</h3>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-700"
                >Defective Products</span
              >
              <span class="text-sm font-medium text-gray-900">42%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-red-500 h-2 rounded-full" style="width: 42%"></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-700"
                >Wrong Size/Item</span
              >
              <span class="text-sm font-medium text-gray-900">28%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-yellow-500 h-2 rounded-full"
                style="width: 28%"
              ></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-700"
                >Changed Mind</span
              >
              <span class="text-sm font-medium text-gray-900">18%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-blue-500 h-2 rounded-full"
                style="width: 18%"
              ></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-700"
                >Late Delivery</span
              >
              <span class="text-sm font-medium text-gray-900">8%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-green-500 h-2 rounded-full"
                style="width: 8%"
              ></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-700"
                >Other Reasons</span
              >
              <span class="text-sm font-medium text-gray-900">4%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gray-500 h-2 rounded-full" style="width: 4%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const openMenuId = ref(null);

function toggleMenu(id) {
  openMenuId.value = openMenuId.value === id ? null : id;
}
// Return requests data
const returnRequests = ref([
  {
    id: 1,
    returnId: "RET-001",
    orderId: "WH-ORD-001",
    customer: "Sarah Johnson",
    email: "sarah@email.com",
    product: "Wireless Headphones",
    sku: "WH-1000XM4",
    reason: "Defective",
    quantity: 1,
    amount: 249.99,
    requestDate: "2023-10-15",
    status: "Requested",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    returnId: "RET-002",
    orderId: "WH-ORD-002",
    customer: "Mike Chen",
    email: "mike@email.com",
    product: "Smart Watch",
    sku: "FIT-PRO-2024",
    reason: "Wrong Size",
    quantity: 1,
    amount: 299.99,
    requestDate: "2023-10-14",
    status: "Approved",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    returnId: "RET-003",
    orderId: "WH-ORD-003",
    customer: "Emma Wilson",
    email: "emma@email.com",
    product: "Water Bottle",
    sku: "HYDRO-750ML",
    reason: "Changed Mind",
    quantity: 2,
    amount: 179.98,
    requestDate: "2023-10-13",
    status: "In Transit",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    returnId: "RET-004",
    orderId: "WH-ORD-004",
    customer: "David Kim",
    email: "david@email.com",
    product: "Yoga Mat",
    sku: "YG-MAT-PRO",
    reason: "Defective",
    quantity: 1,
    amount: 89.99,
    requestDate: "2023-10-12",
    status: "Received",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    returnId: "RET-005",
    orderId: "WH-ORD-005",
    customer: "Lisa Rodriguez",
    email: "lisa@email.com",
    product: "Charging Pad",
    sku: "WC-15W-QI",
    reason: "Late Delivery",
    quantity: 1,
    amount: 89.99,
    requestDate: "2023-10-11",
    status: "Processed",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop",
  },
]);

// Get status class
const getStatusClass = (status) => {
  const classes = {
    Requested: "bg-yellow-100 text-yellow-800",
    Approved: "bg-blue-100 text-blue-800",
    "In Transit": "bg-purple-100 text-purple-800",
    Received: "bg-green-100 text-green-800",
    Processed: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};
</script>
