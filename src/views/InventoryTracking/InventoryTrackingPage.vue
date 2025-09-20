<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Inventory Tracking</h2>
      <div class="flex items-center gap-3">
        <button
          class="flex items-center gap-2 px-4 py-2 text-green-800 bg-green-100 hover:bg-green-300 text-gray-700 rounded-lg"
        >
          <Icon name="ph:export" class="text-lg" />
        </button>
        <button
          class="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
        >
          <Icon name="ph:plus" class="text-lg" />
          New Tracking
        </button>
      </div>
    </div>

    <!-- Tracking Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-blue-600 font-medium">Total Items Tracked</p>
            <p class="text-2xl font-bold text-blue-900">2,847</p>
          </div>
          <Icon name="ph:binoculars" class="text-2xl text-blue-500" />
        </div>
      </div>

      <div class="bg-green-50 rounded-lg p-4 border border-green-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-green-600 font-medium">In Transit</p>
            <p class="text-2xl font-bold text-green-900">156</p>
          </div>
          <Icon name="ph:truck" class="text-2xl text-green-500" />
        </div>
      </div>

      <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-yellow-600 font-medium">Pending Receiving</p>
            <p class="text-2xl font-bold text-yellow-900">42</p>
          </div>
          <Icon name="ph:clock" class="text-2xl text-yellow-500" />
        </div>
      </div>

      <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-purple-600 font-medium">Recent Movements</p>
            <p class="text-2xl font-bold text-purple-900">289</p>
          </div>
          <Icon name="ph:activity" class="text-2xl text-purple-500" />
        </div>
      </div>
    </div>

    <!-- Tracking Filters -->
    <div class="bg-white rounded-xl mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Tracking ID</label
          >
          <input
            type="text"
            placeholder="Enter tracking ID"
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
            <option>In Transit</option>
            <option>Received</option>
            <option>Pending</option>
            <option>Delayed</option>
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
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Carrier</label
          >
          <select
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option>All Carriers</option>
            <option>UPS</option>
            <option>FedEx</option>
            <option>DHL</option>
            <option>USPS</option>
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

    <!-- Tracking List -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <h3 class="font-semibold text-gray-900 text-lg">
          Active Tracking ({{ trackingItems.length }})
        </h3>
      </div>

      <div class="overflow-x-auto">
        <div class="min-w-[900px]">
          <table class="w-full divide-y divide-gray-200">
            <thead class="bg-green-100">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Tracking ID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Product
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Quantity
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Carrier
                </th>

                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Destination
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Status
                </th>

                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  ETA
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in trackingItems" :key="item.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-blue-600">
                    {{ item.trackingId }}
                  </div>
                </td>

                <td class="px-2 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <img
                        class="h-10 w-10 rounded-md object-cover"
                        :src="item.image"
                        :alt="item.product"
                      />
                    </div>
                    <div class="ml-4 w-32">
                      <!-- Fixed width for text -->
                      <div
                        class="font-medium text-gray-900 truncate"
                        title="{{ item.product }}"
                      >
                        {{ item.product }}
                      </div>
                      <div class="text-xs text-gray-500">{{ item.sku }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.quantity }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {{ item.carrier }}
                  </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.destination }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getStatusClass(item.status)"
                  >
                    {{ item.status }}
                  </span>
                </td>

                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.eta }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium relative"
                >
                  <!-- 3-dot button -->
                  <button
                    @click="toggleMenu(item.id)"
                    class="p-1 text-primary"
                  >
                    <Icon
                      name="ph:dots-three-vertical-duotone"
                      class="text-lg"
                    />
                  </button>

                  <!-- Dropdown Menu -->
                  <div
                    v-if="openMenuId === item.id"
                    class="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-20"
                  >
                    <button
                      class="w-full flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                      @click="editStock(item)"
                    >
                      <Icon name="ph:pencil-simple" class="text-base" /> Edit
                      Stock
                    </button>
                    <button
                      class="w-full flex items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                      @click="addStock(item)"
                    >
                      <Icon name="ph:plus-circle" class="text-base" /> Add Stock
                    </button>
                    <button
                      class="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      @click="removeStock(item)"
                    >
                      <Icon name="ph:minus-circle" class="text-base" /> Remove
                      Stock
                    </button>
                    <button
                      class="w-full flex items-center gap-2 px-4 py-2 text-sm text-purple-600 hover:bg-purple-50"
                      @click="viewHistory(item)"
                    >
                      <Icon
                        name="ph:clock-counter-clockwise"
                        class="text-base"
                      />
                      View History
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
            <span class="font-medium">45</span> results
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

    <!-- Tracking Timeline Example -->
    <div class="bg-white rounded-xl shadow-sm p-6 mt-6">
      <h3 class="font-semibold text-gray-900 mb-6">
        Tracking Timeline Example
      </h3>
      <div class="space-y-4">
        <div class="flex items-start gap-4">
          <div
            class="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white mt-1"
          >
            <Icon name="ph:check" class="text-lg" />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h4 class="font-medium text-gray-900">Delivered</h4>
              <span class="text-sm text-gray-500">2023-10-15 14:30</span>
            </div>
            <p class="text-sm text-gray-600">Package delivered to recipient</p>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div
            class="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mt-1"
          >
            <Icon name="ph:truck" class="text-lg" />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h4 class="font-medium text-gray-900">Out for Delivery</h4>
              <span class="text-sm text-gray-500">2023-10-15 08:15</span>
            </div>
            <p class="text-sm text-gray-600">Package is out for delivery</p>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div
            class="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mt-1"
          >
            <Icon name="ph:package" class="text-lg" />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h4 class="font-medium text-gray-900">At Distribution Center</h4>
              <span class="text-sm text-gray-500">2023-10-14 20:45</span>
            </div>
            <p class="text-sm text-gray-600">
              Package arrived at local distribution center
            </p>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div
            class="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mt-1"
          >
            <Icon name="ph:airplane-takeoff" class="text-lg" />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h4 class="font-medium text-gray-900">In Transit</h4>
              <span class="text-sm text-gray-500">2023-10-13 12:20</span>
            </div>
            <p class="text-sm text-gray-600">
              Package is in transit to destination
            </p>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div
            class="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white mt-1"
          >
            <Icon name="ph:warehouse" class="text-lg" />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h4 class="font-medium text-gray-900">Shipment Created</h4>
              <span class="text-sm text-gray-500">2023-10-12 09:00</span>
            </div>
            <p class="text-sm text-gray-600">
              Tracking number created and label printed
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Tracking items data
const trackingItems = ref([
  {
    id: 1,
    trackingId: "TRK-001",
    product: "Wireless Headphones",
    sku: "WH-1000XM4",
    quantity: 25,
    carrier: "UPS",
    origin: "New York, NY",
    destination: "Los Angeles, CA",
    status: "In Transit",
    lastUpdate: "2023-10-15 14:30",
    eta: "2023-10-17",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    trackingId: "TRK-002",
    product: "Smart Watch",
    sku: "FIT-PRO-2024",
    quantity: 15,
    carrier: "FedEx",
    origin: "Chicago, IL",
    destination: "Miami, FL",
    status: "Delivered",
    lastUpdate: "2023-10-15 10:15",
    eta: "2023-10-15",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    trackingId: "TRK-003",
    product: "Water Bottles",
    sku: "HYDRO-750ML",
    quantity: 50,
    carrier: "DHL",
    origin: "Seattle, WA",
    destination: "Boston, MA",
    status: "Pending",
    lastUpdate: "2023-10-14 16:45",
    eta: "2023-10-18",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    trackingId: "TRK-004",
    product: "Yoga Mats",
    sku: "YG-MAT-PRO",
    quantity: 30,
    carrier: "USPS",
    origin: "Austin, TX",
    destination: "Denver, CO",
    status: "In Transit",
    lastUpdate: "2023-10-15 08:20",
    eta: "2023-10-16",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    trackingId: "TRK-005",
    product: "Charging Pads",
    sku: "WC-15W-QI",
    quantity: 40,
    carrier: "UPS",
    origin: "San Francisco, CA",
    destination: "Phoenix, AZ",
    status: "Delayed",
    lastUpdate: "2023-10-14 22:10",
    eta: "2023-10-19",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop",
  },
]);

const openMenuId = ref(null);

const toggleMenu = (id) => {
  openMenuId.value = openMenuId.value === id ? null : id;
};

// Get status class
const getStatusClass = (status) => {
  const classes = {
    "In Transit": "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Delayed: "bg-red-100 text-red-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};
</script>
