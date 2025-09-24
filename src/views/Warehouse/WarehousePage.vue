<script setup>
import { ref, computed } from "vue";
import Modal from "@/components/Modal.vue";
// Warehouse data
const warehouses = ref([
  {
    id: 1,
    name: "Main Distribution Center",
    location: "New York, NY",
    status: "Operational",
    capacity: 5000,
    used: 3250,
    lowStockItems: 12,
    incomingShipments: 5,
    outgoingShipments: 23,
    temperature: "Controlled (18-22°C)",
    manager: "Sarah Johnson",
    lastUpdated: "2 hours ago",
    password: "secure123",
  },
  {
    id: 2,
    name: "West Coast Facility",
    location: "Los Angeles, CA",
    status: "Operational",
    capacity: 3500,
    used: 2450,
    lowStockItems: 8,
    incomingShipments: 3,
    outgoingShipments: 18,
    temperature: "Dry Storage",
    manager: "Michael Chen",
    lastUpdated: "30 minutes ago",
    password: "secure123",
  },
  {
    id: 3,
    name: "Midwest Hub",
    location: "Chicago, IL",
    status: "Maintenance",
    capacity: 2800,
    used: 1950,
    lowStockItems: 5,
    incomingShipments: 2,
    outgoingShipments: 12,
    temperature: "Refrigerated (2-8°C)",
    manager: "Emma Wilson",
    lastUpdated: "5 hours ago",
    password: "secure123",
  },
  {
    id: 4,
    name: "Southern Distribution",
    location: "Dallas, TX",
    status: "Operational",
    capacity: 4200,
    used: 3100,
    lowStockItems: 15,
    incomingShipments: 7,
    outgoingShipments: 20,
    temperature: "Dry Storage",
    manager: "David Brown",
    lastUpdated: "1 hour ago",
    password: "secure123",
  },
]);

// Selected warehouse
const selectedWarehouse = ref(warehouses.value[0]);

// Quick stats for all warehouses
const totalStats = computed(() => {
  return {
    totalCapacity: warehouses.value.reduce((sum, w) => sum + w.capacity, 0),
    totalUsed: warehouses.value.reduce((sum, w) => sum + w.used, 0),
    totalLowStock: warehouses.value.reduce(
      (sum, w) => sum + w.lowStockItems,
      0
    ),
    totalIncoming: warehouses.value.reduce(
      (sum, w) => sum + w.incomingShipments,
      0
    ),
    totalOutgoing: warehouses.value.reduce(
      (sum, w) => sum + w.outgoingShipments,
      0
    ),
  };
});

// Warehouse status counts
const statusCounts = computed(() => {
  const counts = {
    operational: 0,
    maintenance: 0,
    offline: 0,
  };

  warehouses.value.forEach((warehouse) => {
    if (warehouse.status.toLowerCase() === "operational") counts.operational++;
    else if (warehouse.status.toLowerCase() === "maintenance")
      counts.maintenance++;
    else counts.offline++;
  });

  return counts;
});

// form for adding a new warehouse
const form = ref({
  name: null,
  location: null,
  manager: null,
  password: null,
});

// form for editing an existing warehouse
const newItem = ref({
  id: null,
  name: null,
  location: null,
  manager: null,
  password: null,
});

const showPassword = ref(false);

const editWarehouse = (item) => {
  isEditModalOpened.value = true;

  newItem.value.id = item.id;
  newItem.value.name = item.name;
  newItem.value.location = item.location;
  newItem.value.manager = item.manager;

  // If item has password from API or DB
  newItem.value.password = item.password || "";
};

// Select warehouse function
const selectWarehouse = (warehouse) => {
  selectedWarehouse.value = warehouse;
};

// Format capacity percentage
const capacityPercentage = (warehouse) => {
  return Math.round((warehouse.used / warehouse.capacity) * 100);
};

// Capacity status (for color coding)
const capacityStatus = (percentage) => {
  if (percentage >= 90) return "critical";
  if (percentage >= 75) return "warning";
  return "good";
};

// model
const isModalOpened = ref(false);
const isEditModalOpened = ref(false);

// open/close modal handlers
const openModal = () => {
  isModalOpened.value = true;
};

const closeModal = () => {
  isModalOpened.value = false;
  isEditModalOpened.value = false;

  // reset add form
  form.value = {
    name: null,
    location: null,
    manager: null,
    password: null,
  };

  // reset edit form
  newItem.value = {
    id: null,
    name: null,
    location: null,
    manager: null,
    password: null,
  };

  showPassword.value = false;
};

// Temperature zones
const temperatureZones = ref([
  { name: "Controlled (18-22°C)", percentage: 45, color: "blue" },
  { name: "Refrigerated (2-8°C)", percentage: 25, color: "green" },
  { name: "Frozen (-18°C)", percentage: 15, color: "purple" },
  { name: "Dry Storage", percentage: 15, color: "orange" },
]);
</script>

<template>
  <div class="space-y-6">
    <!-- Overall Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Total Warehouses -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-blue-500/10 to-blue-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-blue-600/80"
            >
              Total Warehouses
            </p>
            <p class="text-3xl font-bold text-blue-900">
              {{ warehouses.length }}
            </p>
            <p class="text-xs font-medium mt-2 flex items-center text-blue-600">
              <span class="inline-flex items-center">
                {{ statusCounts.operational }} Operational
              </span>
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-blue-500/20 text-blue-600">
            <Icon name="ph:buildings" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Total Capacity -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-emerald-500/10 to-emerald-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-emerald-600/80"
            >
              Total Capacity
            </p>
            <p class="text-3xl font-bold text-emerald-900">
              {{ totalStats.totalCapacity }}
            </p>
            <p
              class="text-xs font-medium mt-2 flex items-center text-emerald-600"
            >
              <span class="inline-flex items-center">
                {{ totalStats.totalUsed }} units used
              </span>
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-emerald-500/20 text-emerald-600"
          >
            <Icon name="ph:package" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Low Stock Alerts -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-amber-500/10 to-amber-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-amber-600/80"
            >
              Low Stock Items
            </p>
            <p class="text-3xl font-bold text-amber-900">
              {{ totalStats.totalLowStock }}
            </p>
            <p
              class="text-xs font-medium mt-2 flex items-center text-amber-600"
            >
              <span class="inline-flex items-center">
                Across all warehouses
              </span>
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-amber-500/20 text-amber-600">
            <Icon name="ph:warning" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Incoming Shipments -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-purple-500/10 to-purple-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-purple-600/80"
            >
              Incoming Shipments
            </p>
            <p class="text-3xl font-bold text-purple-900">
              {{ totalStats.totalIncoming }}
            </p>
            <p
              class="text-xs font-medium mt-2 flex items-center text-purple-600"
            >
              <span class="inline-flex items-center"> To be received </span>
            </p>
          </div>
          <div
            class="p-3 rounded-xl shadow-md bg-purple-500/20 text-purple-600"
          >
            <Icon name="ph:arrow-down" class="text-2xl" />
          </div>
        </div>
      </div>

      <!-- Outgoing Shipments -->
      <div
        class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-red-500/10 to-red-600/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <p
              class="text-sm font-semibold tracking-wide uppercase text-red-600/80"
            >
              Outgoing Shipments
            </p>
            <p class="text-3xl font-bold text-red-900">
              {{ totalStats.totalOutgoing }}
            </p>
            <p class="text-xs font-medium mt-2 flex items-center text-red-600">
              <span class="inline-flex items-center"> Ready for dispatch </span>
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-red-500/20 text-red-600">
            <Icon name="ph:arrow-up" class="text-2xl" />
          </div>
        </div>
      </div>
    </div>

    <!-- Warehouse Selector -->
    <div class="bg-white rounded-2xl shadow-xl p-6 border-0">
      <div
        class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
      >
        <div class="flex flex-wrap gap-3">
          <button
            v-for="warehouse in warehouses"
            :key="warehouse.id"
            @click="selectWarehouse(warehouse)"
            class="px-4 py-2.5 rounded-xl border transition-all duration-300 hover:-translate-y-0.5"
            :class="{
              'bg-gradient-to-r from-purple-700 to-indigo-900 text-white shadow-lg shadow-blue-100/50 hover:shadow-xl':
                selectedWarehouse.id === warehouse.id,
              'border-purple-200 bg-gradient-to-r from-purple-100 to-indigo-100 hover:border-blue-300 hover:shadow-md':
                selectedWarehouse.id !== warehouse.id,
            }"
          >
            {{ warehouse.name }}
          </button>
        </div>

        <div class="flex items-center gap-3">
          <button
            class="flex items-center gap-2 px-4 py-2.5 text-gray-600 bg-white border border-gray-200 hover:border-blue-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:text-blue-600"
          >
            <Icon name="ph:export" class="text-lg" />
          </button>
          <button
            @click="openModal"
            class="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <Icon name="ph:plus" class="text-lg" />
            Add Warehouse
          </button>
        </div>
      </div>
    </div>

    <!-- Selected Warehouse Details -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Warehouse Info Card -->
      <div class="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 border-0">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ selectedWarehouse.name }}
          </h3>
          <span
            class="px-3 py-1 rounded-full text-xs font-medium"
            :class="{
              'bg-green-100 text-green-800':
                selectedWarehouse.status === 'Operational',
              'bg-yellow-100 text-yellow-800':
                selectedWarehouse.status === 'Maintenance',
              'bg-red-100 text-red-800': selectedWarehouse.status === 'Offline',
            }"
          >
            {{ selectedWarehouse.status }}
          </span>
        </div>

        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"
            >
              <Icon name="ph:map-pin" class="text-blue-600" />
            </div>
            <div>
              <p class="text-sm text-gray-600">Location</p>
              <p class="font-medium text-gray-900">
                {{ selectedWarehouse.location }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"
            >
              <Icon name="ph:user" class="text-green-600" />
            </div>
            <div>
              <p class="text-sm text-gray-600">Manager</p>
              <p class="font-medium text-gray-900">
                {{ selectedWarehouse.manager }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"
            >
              <Icon name="ph:thermometer" class="text-purple-600" />
            </div>
            <div>
              <p class="text-sm text-gray-600">Temperature</p>
              <p class="font-medium text-gray-900">
                {{ selectedWarehouse.temperature }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"
            >
              <Icon name="ph:clock" class="text-gray-600" />
            </div>
            <div>
              <p class="text-sm text-gray-600">Last Updated</p>
              <p class="font-medium text-gray-900">
                {{ selectedWarehouse.lastUpdated }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-gray-200">
          <button
            @click="editWarehouse(selectedWarehouse)"
            class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white rounded-xl transition-colors"
          >
            <Icon name="ph:gear" class="text-lg" />
            Update Warehouse
          </button>
        </div>
      </div>

      <!-- Capacity & Stats -->
      <div class="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border-0">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">
          Storage Overview
        </h3>

        <!-- Capacity Bar -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700"
              >Storage Capacity</span
            >
            <span class="text-sm font-semibold text-gray-900">
              {{ selectedWarehouse.used }} /
              {{ selectedWarehouse.capacity }} units ({{
                capacityPercentage(selectedWarehouse)
              }}%)
            </span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="h-2.5 rounded-full transition-all duration-500"
              :class="{
                'bg-red-500':
                  capacityStatus(capacityPercentage(selectedWarehouse)) ===
                  'critical',
                'bg-yellow-500':
                  capacityStatus(capacityPercentage(selectedWarehouse)) ===
                  'warning',
                'bg-green-500':
                  capacityStatus(capacityPercentage(selectedWarehouse)) ===
                  'good',
              }"
              :style="`width: ${capacityPercentage(selectedWarehouse)}%`"
            ></div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div class="flex items-center">
              <div class="bg-blue-100 p-2 rounded-lg mr-3">
                <Icon name="ph:warning" class="text-blue-600 text-xl" />
              </div>
              <div>
                <p class="text-sm text-gray-600">Low Stock Items</p>
                <p class="text-xl font-bold text-gray-900">
                  {{ selectedWarehouse.lowStockItems }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-green-50 p-4 rounded-xl border border-green-100">
            <div class="flex items-center">
              <div class="bg-green-100 p-2 rounded-lg mr-3">
                <Icon name="ph:arrow-down" class="text-green-600 text-xl" />
              </div>
              <div>
                <p class="text-sm text-gray-600">Incoming Shipments</p>
                <p class="text-xl font-bold text-gray-900">
                  {{ selectedWarehouse.incomingShipments }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-orange-50 p-4 rounded-xl border border-orange-100">
            <div class="flex items-center">
              <div class="bg-orange-100 p-2 rounded-lg mr-3">
                <Icon name="ph:arrow-up" class="text-orange-600 text-xl" />
              </div>
              <div>
                <p class="text-sm text-gray-600">Outgoing Shipments</p>
                <p class="text-xl font-bold text-gray-900">
                  {{ selectedWarehouse.outgoingShipments }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Temperature Zones -->
        <div class="mt-8">
          <h4 class="text-md font-semibold text-gray-900 mb-4">
            Temperature Zones
          </h4>
          <div class="space-y-3">
            <div
              v-for="zone in temperatureZones"
              :key="zone.name"
              class="flex items-center justify-between"
            >
              <span class="text-sm text-gray-600">{{ zone.name }}</span>
              <div class="w-24 bg-gray-200 rounded-full h-2">
                <div
                  class="h-2 rounded-full"
                  :class="{
                    'bg-blue-500': zone.color === 'blue',
                    'bg-green-500': zone.color === 'green',
                    'bg-purple-500': zone.color === 'purple',
                    'bg-orange-500': zone.color === 'orange',
                  }"
                  :style="`width: ${zone.percentage}%`"
                ></div>
              </div>
              <span class="text-sm font-medium text-gray-900 w-8 text-right"
                >{{ zone.percentage }}%</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal
    title="Add New Warehouse"
    :isOpen="isModalOpened"
    @modal-close="closeModal"
    size="md"
    overlayClose
  >
    <div class="flex flex-col gap-5 pt-3">
      <!-- Warehouse Name -->
      <div class="w-full">
        <label
          for="warehouseName"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Warehouse Name
        </label>
        <input
          v-model="form.name"
          type="text"
          id="warehouseName"
          class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          placeholder="Enter warehouse name"
        />
      </div>

      <!-- Location -->
      <div class="w-full">
        <label
          for="location"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Location
        </label>
        <input
          v-model="form.location"
          type="text"
          id="location"
          class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          placeholder="Enter location"
        />
      </div>

      <!-- Manager -->
      <div class="w-full">
        <label
          for="manager"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Manager
        </label>
        <input
          v-model="form.manager"
          type="text"
          id="manager"
          class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          placeholder="Enter manager name"
        />
      </div>

      <!-- Password -->
      <div class="w-full">
        <label
          for="password"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Password
        </label>
        <div class="relative">
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            class="w-full px-4 py-3 pr-10 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            placeholder="Enter password"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600 transition-colors"
            @click="showPassword = !showPassword"
          >
            <Icon
              :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'"
              class="text-lg"
            />
          </button>
        </div>
      </div>

      <!-- Actions -->
      <div class="w-full flex justify-end gap-3 pt-3">
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
          @click="onSubmit"
          class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white hover:from-secondary hover:to-primary transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Save Warehouse
        </button>
      </div>
    </div>
  </Modal>

  <Modal
    title="Edit Warehouse"
    :isOpen="isEditModalOpened"
    @modal-close="closeModal"
    size="md"
    overlayClose
  >
    <div class="flex flex-col gap-5 pt-3">
      <!-- Warehouse Name -->
      <div class="w-full">
        <label
          for="editWarehouseName"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Warehouse Name
        </label>
        <input
          v-model="newItem.name"
          type="text"
          id="editWarehouseName"
          class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          placeholder="Enter warehouse name"
        />
      </div>

      <!-- Location -->
      <div class="w-full">
        <label
          for="editLocation"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Location
        </label>
        <input
          v-model="newItem.location"
          type="text"
          id="editLocation"
          class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          placeholder="Enter location"
        />
      </div>

      <!-- Manager -->
      <div class="w-full">
        <label
          for="editManager"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Manager
        </label>
        <input
          v-model="newItem.manager"
          type="text"
          id="editManager"
          class="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          placeholder="Enter manager name"
        />
      </div>

      <!-- Password with Toggle -->
      <div class="w-full">
        <label
          for="editPassword"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Password
        </label>
        <div class="relative">
          <input
            v-model="newItem.password"
            :type="showPassword ? 'text' : 'password'"
            id="editPassword"
            class="w-full px-4 py-3 pr-10 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            placeholder="Enter password"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-blue-600 transition-colors"
            @click="showPassword = !showPassword"
          >
            <Icon
              :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'"
              class="text-lg"
            />
          </button>
        </div>
      </div>

      <!-- Actions -->
      <div class="w-full flex justify-end gap-3 pt-3">
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
          @click="onUpdate(newItem.id)"
          class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Update Warehouse
        </button>
      </div>
    </div>
  </Modal>
</template>
