<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Stock Management</h2>
      <div class="flex items-center gap-3">
        <button
          class="flex items-center gap-2 px-4 py-2 text-green-800 bg-green-100 hover:bg-green-200 text-gray-700 rounded-lg"
        >
          <Icon name="ph:export" class="text-lg" />
        </button>
        <button
          class="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
        >
          <Icon name="ph:plus" class="text-lg" />
          Add Stock
        </button>
      </div>
    </div>

    <!-- Stock Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-blue-600 font-medium">Total Items</p>
            <p class="text-2xl font-bold text-blue-900">2,847</p>
          </div>
          <Icon name="ph:package" class="text-2xl text-blue-500" />
        </div>
      </div>

      <div class="bg-green-50 rounded-lg p-4 border border-green-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-green-600 font-medium">In Stock</p>
            <p class="text-2xl font-bold text-green-900">2,156</p>
          </div>
          <Icon name="ph:check-circle" class="text-2xl text-green-500" />
        </div>
      </div>

      <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-yellow-600 font-medium">Low Stock</p>
            <p class="text-2xl font-bold text-yellow-900">342</p>
          </div>
          <Icon name="ph:warning" class="text-2xl text-yellow-500" />
        </div>
      </div>

      <div class="bg-red-50 rounded-lg p-4 border border-red-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-red-600 font-medium">Out of Stock</p>
            <p class="text-2xl font-bold text-red-900">349</p>
          </div>
          <Icon name="ph:x-circle" class="text-2xl text-red-500" />
        </div>
      </div>
    </div>

    <!-- Stock Management Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div
        class="py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <h3 class="font-semibold text-gray-900 text-lg">
          Inventory Items ({{ stockItems.length }})
        </h3>
        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm flex-1"
          />
          <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Home & Kitchen</option>
            <option>Sports</option>
          </select>
          <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <div class="min-w-[1000px]">
          <table class="w-full divide-y divide-gray-200">
            <thead class="bg-blue-100">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Product
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  SKU
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Category
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Current Stock
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Min Stock Level
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Location
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
              <tr v-for="item in stockItems" :key="item.id">
                <td class="px-2 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <img
                        class="h-10 w-10 rounded-md object-cover"
                        :src="item.image"
                        :alt="item.name"
                      />
                    </div>
                    <div class="ml-4 w-32">
                      <!-- Fixed width for text -->
                      <div
                        class="font-medium text-gray-900 truncate"
                        title="{{ item.name }}"
                      >
                        {{ item.name }}
                      </div>
                      <div
                        class="text-sm text-gray-500 truncate"
                        title="{{ item.brand }}"
                      >
                        {{ item.brand }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.sku }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {{ item.category }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-medium text-gray-900">{{
                      item.currentStock
                    }}</span>
                    <span class="text-xs text-gray-500"
                      >/ {{ item.maxStock }}</span
                    >
                  </div>
                  <div class="w-20 bg-gray-200 rounded-full h-1.5 mt-1">
                    <div
                      class="h-1.5 rounded-full"
                      :class="{
                        'bg-green-500': item.stockPercentage >= 50,
                        'bg-yellow-500':
                          item.stockPercentage >= 20 &&
                          item.stockPercentage < 50,
                        'bg-red-500': item.stockPercentage < 20,
                      }"
                      :style="{ width: `${item.stockPercentage}%` }"
                    ></div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.minStockLevel }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {{ item.location }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="{
                      'bg-green-100 text-green-800': item.status === 'In Stock',
                      'bg-yellow-100 text-yellow-800':
                        item.status === 'Low Stock',
                      'bg-red-100 text-red-800': item.status === 'Out of Stock',
                    }"
                  >
                    {{ item.status }}
                  </span>
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
            <span class="font-medium">2847</span> results
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

    <!-- Quick Actions Section -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <!-- Stock Adjustment -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="font-semibold text-gray-900 mb-4">Quick Stock Adjustment</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Select Product</label
            >
            <select
              class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option>Select a product</option>
              <option
                v-for="item in stockItems"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Adjustment Type</label
            >
            <select
              class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option>Add Stock</option>
              <option>Remove Stock</option>
              <option>Set Stock Level</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Quantity</label
            >
            <input
              type="number"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Enter quantity"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Reason</label
            >
            <select
              class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option>Restock</option>
              <option>Damage</option>
              <option>Return</option>
              <option>Inventory Count</option>
              <option>Other</option>
            </select>
          </div>
          <button
            class="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium"
          >
            Apply Adjustment
          </button>
        </div>
      </div>

      <!-- Low Stock Alerts -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="font-semibold text-gray-900 mb-4">Low Stock Alerts</h3>
        <div class="space-y-3">
          <div
            v-for="alert in lowStockAlerts"
            :key="alert.id"
            class="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-yellow-800">
                  {{ alert.product }}
                </p>
                <p class="text-xs text-yellow-600">
                  Current: {{ alert.currentStock }} / Min: {{ alert.minStock }}
                </p>
              </div>
              <button class="text-yellow-600 hover:text-yellow-800">
                <Icon name="ph:arrow-right" class="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Stock Movements -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="font-semibold text-gray-900 mb-4">Recent Stock Movements</h3>
        <div class="space-y-3">
          <div
            v-for="movement in recentMovements"
            :key="movement.id"
            class="p-3 bg-gray-50 border border-gray-200 rounded-lg"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-800">
                  {{ movement.product }}
                </p>
                <p class="text-xs text-gray-600">
                  {{ movement.type }}: {{ movement.quantity }} units
                </p>
                <p class="text-xs text-gray-500">{{ movement.timestamp }}</p>
              </div>
              <span
                class="text-xs font-medium"
                :class="
                  movement.type === 'In' ? 'text-green-600' : 'text-red-600'
                "
              >
                {{ movement.type === "In" ? "+" : "-" }}{{ movement.quantity }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Stock items data
const stockItems = ref([
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    sku: "WH-1000XM4",
    brand: "Sony",
    category: "Electronics",
    currentStock: 45,
    maxStock: 100,
    minStockLevel: 20,
    stockPercentage: 45,
    location: "A-12-4",
    status: "In Stock",
    lastUpdated: "2 hours ago",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    sku: "FIT-PRO-2024",
    brand: "FitTech",
    category: "Electronics",
    currentStock: 8,
    maxStock: 50,
    minStockLevel: 15,
    stockPercentage: 16,
    location: "B-08-2",
    status: "Low Stock",
    lastUpdated: "5 hours ago",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    sku: "HYDRO-750ML",
    brand: "HydroFlask",
    category: "Kitchen",
    currentStock: 0,
    maxStock: 75,
    minStockLevel: 10,
    stockPercentage: 0,
    location: "C-15-7",
    status: "Out of Stock",
    lastUpdated: "1 day ago",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    name: "Yoga Mat Premium",
    sku: "YG-MAT-PRO",
    brand: "YogaLife",
    category: "Sports",
    currentStock: 23,
    maxStock: 60,
    minStockLevel: 12,
    stockPercentage: 38,
    location: "D-03-1",
    status: "In Stock",
    lastUpdated: "3 hours ago",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    sku: "WC-15W-QI",
    brand: "ChargeTech",
    category: "Electronics",
    currentStock: 67,
    maxStock: 120,
    minStockLevel: 25,
    stockPercentage: 56,
    location: "A-18-3",
    status: "In Stock",
    lastUpdated: "4 hours ago",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop",
  },
]);

// Low stock alerts
const lowStockAlerts = ref([
  {
    id: 1,
    product: "Smart Fitness Watch",
    currentStock: 8,
    minStock: 15,
  },
  {
    id: 2,
    product: "Running Shoes - Men's",
    currentStock: 5,
    minStock: 12,
  },
  {
    id: 3,
    product: "Wireless Mouse",
    currentStock: 3,
    minStock: 10,
  },
]);

// Recent stock movements
const recentMovements = ref([
  {
    id: 1,
    product: "Wireless Headphones",
    type: "In",
    quantity: 25,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    product: "Yoga Mat",
    type: "Out",
    quantity: 12,
    timestamp: "4 hours ago",
  },
  {
    id: 3,
    product: "Water Bottle",
    type: "Out",
    quantity: 8,
    timestamp: "6 hours ago",
  },
]);

const openMenuId = ref(null);

const toggleMenu = (id) => {
  openMenuId.value = openMenuId.value === id ? null : id;
};

const editStock = (item) => {
  console.log("Editing stock for", item);
  openMenuId.value = null;
};

const addStock = (item) => {
  console.log("Adding stock for", item);
  openMenuId.value = null;
};

const removeStock = (item) => {
  console.log("Removing stock for", item);
  openMenuId.value = null;
};

const viewHistory = (item) => {
  console.log("Viewing history for", item);
  openMenuId.value = null;
};
</script>
