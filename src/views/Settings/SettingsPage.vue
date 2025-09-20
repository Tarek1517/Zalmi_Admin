<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-rose-600">Warehouse Settings</h2>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Modern Navigation Sidebar -->
      <div class="lg:col-span-1">
        <div
          class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-primary/20 p-6 hover:shadow-2xl transition-all duration-300"
        >
          <nav class="space-y-2">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02] group',
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg border border-primary/30'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50/80 hover:to-gray-100/80 border border-transparent hover:border-gray-200/50',
              ]"
            >
              <div
                :class="[
                  'p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110',
                  activeTab === tab.id
                    ? 'bg-white/20 backdrop-blur-sm'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-primary/10 group-hover:to-primary/5',
                ]"
              >
                <Icon
                  :name="tab.icon"
                  :class="[
                    'text-xl transition-all duration-300',
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-gray-500 group-hover:text-primary',
                  ]"
                />
              </div>
              <span
                class="font-medium text-sm tracking-wide transition-all duration-300"
              >
                {{ tab.label }}
              </span>
              <div
                :class="[
                  'ml-auto w-2 h-2 rounded-full transition-all duration-300',
                  activeTab === tab.id
                    ? 'bg-white/80'
                    : 'bg-transparent group-hover:bg-primary/20',
                ]"
              ></div>
            </button>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <div class="lg:col-span-2">
        <!-- General Settings -->
        <div
          v-if="activeTab === 'general'"
          class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-primary/20 p-6 hover:shadow-2xl transition-all duration-300"
        >
          <h3 class="font-semibold text-rose-900 mb-6">General Settings</h3>
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Warehouse Name</label
              >
              <input
                type="text"
                v-model="settings.general.warehouseName"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Warehouse Address</label
              >
              <textarea
                v-model="settings.general.address"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              ></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Contact Email</label
                >
                <input
                  type="email"
                  v-model="settings.general.contactEmail"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Phone Number</label
                >
                <input
                  type="tel"
                  v-model="settings.general.phone"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Timezone</label
              >
              <select
                v-model="settings.general.timezone"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="est">Eastern Time (ET)</option>
                <option value="cst">Central Time (CT)</option>
                <option value="mst">Mountain Time (MT)</option>
                <option value="pst">Pacific Time (PT)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Inventory Settings -->
        <div
          v-if="activeTab === 'inventory'"
         class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-primary/20 p-6 hover:shadow-2xl transition-all duration-300"
        >
          <h3 class="font-semibold text-rose-900 mb-6">Inventory Settings</h3>
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Low Stock Threshold</label
              >
              <input
                type="number"
                v-model="settings.inventory.lowStockThreshold"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <p class="text-sm text-gray-500 mt-1">
                Minimum quantity before low stock alert
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Out of Stock Threshold</label
              >
              <input
                type="number"
                v-model="settings.inventory.outOfStockThreshold"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <p class="text-sm text-gray-500 mt-1">
                Quantity considered as out of stock
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Auto Reorder</label
              >
              <div class="flex items-center gap-3">
                <input
                  type="checkbox"
                  v-model="settings.inventory.autoReorder"
                  class="w-4 h-4 text-primary focus:ring-primary"
                />
                <span class="text-sm text-gray-700"
                  >Enable automatic reordering</span
                >
              </div>
            </div>

            <div v-if="settings.inventory.autoReorder">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Reorder Quantity</label
              >
              <input
                type="number"
                v-model="settings.inventory.reorderQuantity"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>

        <!-- Shipping Settings -->
        <div
          v-if="activeTab === 'shipping'"
          class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-primary/20 p-6 hover:shadow-2xl transition-all duration-300"
        >
          <h3 class="font-semibold text-rose-900 mb-6">Shipping Settings</h3>
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Default Carrier</label
              >
              <select
                v-model="settings.shipping.defaultCarrier"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="ups">UPS</option>
                <option value="fedex">FedEx</option>
                <option value="dhl">DHL</option>
                <option value="usps">USPS</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Default Service</label
              >
              <select
                v-model="settings.shipping.defaultService"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="standard">Standard</option>
                <option value="express">Express</option>
                <option value="overnight">Overnight</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Packaging Type</label
              >
              <select
                v-model="settings.shipping.packagingType"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="box">Box</option>
                <option value="envelope">Envelope</option>
                <option value="tube">Tube</option>
                <option value="pallet">Pallet</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Shipping Origin</label
              >
              <input
                type="text"
                v-model="settings.shipping.shippingOrigin"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="City, State, ZIP"
              />
            </div>
          </div>
        </div>

        <!-- Notification Settings -->
        <div
          v-if="activeTab === 'notifications'"
          class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-primary/20 p-6 hover:shadow-2xl transition-all duration-300"
        >
          <h3 class="font-semibold text-rose-900 mb-6">
            Notification Settings
          </h3>
          <div class="space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900">Low Stock Alerts</h4>
                <p class="text-sm text-gray-500">
                  Receive alerts when inventory is low
                </p>
              </div>
              <input
                type="checkbox"
                v-model="settings.notifications.lowStockAlerts"
                class="w-4 h-4 text-primary focus:ring-primary"
              />
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900">Order Notifications</h4>
                <p class="text-sm text-gray-500">Notify on new orders</p>
              </div>
              <input
                type="checkbox"
                v-model="settings.notifications.orderNotifications"
                class="w-4 h-4 text-primary focus:ring-primary"
              />
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900">Shipment Updates</h4>
                <p class="text-sm text-gray-500">
                  Notify on shipment status changes
                </p>
              </div>
              <input
                type="checkbox"
                v-model="settings.notifications.shipmentUpdates"
                class="w-4 h-4 text-primary focus:ring-primary"
              />
            </div>

            <div class="flex items-center justify-between">
              <div>
                <h4 class="font-medium text-gray-900">Return Requests</h4>
                <p class="text-sm text-gray-500">
                  Notify on new return requests
                </p>
              </div>
              <input
                type="checkbox"
                v-model="settings.notifications.returnRequests"
                class="w-4 h-4 text-primary focus:ring-primary"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Notification Email</label
              >
              <input
                type="email"
                v-model="settings.notifications.notificationEmail"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>

        <!-- User Management -->
        <div
          v-if="activeTab === 'users'"
          class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-primary/20 p-6 hover:shadow-2xl transition-all duration-300"
        >
          <h3 class="font-semibold text-rose-900 mb-6">User Management</h3>
          <div class="space-y-6">
            <div
              class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <span class="text-blue-700 font-medium">JD</span>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">John Doe</h4>
                  <p class="text-sm text-gray-500">Warehouse Manager</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button class="text-blue-600 hover:text-blue-800">
                  <Icon name="ph:pencil-simple" class="text-lg" />
                </button>
                <button class="text-red-600 hover:text-red-800">
                  <Icon name="ph:user-minus" class="text-lg" />
                </button>
              </div>
            </div>

            <div
              class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <span class="text-green-700 font-medium">SM</span>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Sarah Miller</h4>
                  <p class="text-sm text-gray-500">Inventory Specialist</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button class="text-blue-600 hover:text-blue-800">
                  <Icon name="ph:pencil-simple" class="text-lg" />
                </button>
                <button class="text-red-600 hover:text-red-800">
                  <Icon name="ph:user-minus" class="text-lg" />
                </button>
              </div>
            </div>

            <div
              class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"
                >
                  <span class="text-purple-700 font-medium">MJ</span>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">Mike Johnson</h4>
                  <p class="text-sm text-gray-500">Shipping Coordinator</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button class="text-blue-600 hover:text-blue-800">
                  <Icon name="ph:pencil-simple" class="text-lg" />
                </button>
                <button class="text-red-600 hover:text-red-800">
                  <Icon name="ph:user-minus" class="text-lg" />
                </button>
              </div>
            </div>

            <button
              class="w-full flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-900 hover:border-gray-400"
            >
              <Icon name="ph:user-plus" class="text-lg" />
              <span>Add New User</span>
            </button>
          </div>
        </div>

        <!-- Save Button -->
        <div class="mt-6 flex justify-end">
          <button
            @click="saveSettings"
            class="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

const activeTab = ref("general");

const tabs = [
  { id: "general", label: "General", icon: "ph:gear" },
  { id: "inventory", label: "Inventory", icon: "ph:package" },
  { id: "shipping", label: "Shipping", icon: "ph:truck" },
  { id: "notifications", label: "Notifications", icon: "ph:bell" },
  { id: "users", label: "User Management", icon: "ph:users" },
];

const settings = reactive({
  general: {
    warehouseName: "Main Warehouse",
    address: "1234 Distribution Street\nNew York, NY 10001",
    contactEmail: "warehouse@example.com",
    phone: "+1 (555) 123-4567",
    timezone: "est",
  },
  inventory: {
    lowStockThreshold: 10,
    outOfStockThreshold: 0,
    autoReorder: true,
    reorderQuantity: 25,
  },
  shipping: {
    defaultCarrier: "ups",
    defaultService: "standard",
    packagingType: "box",
    shippingOrigin: "New York, NY 10001",
  },
  notifications: {
    lowStockAlerts: true,
    orderNotifications: true,
    shipmentUpdates: true,
    returnRequests: true,
    notificationEmail: "alerts@example.com",
  },
});

const saveSettings = () => {
  console.log("Saving settings:", settings);
  // Here you would typically send the settings to your backend
  alert("Settings saved successfully!");
};
</script>
