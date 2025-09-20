<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Shipping Labels</h2>
      <div class="flex items-center gap-3">
        <button
          class="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
        >
          <Icon name="ph:printer" class="text-lg" />
          Bulk Print
        </button>
        <button
          class="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg"
        >
          <Icon name="ph:plus" class="text-lg" />
          Create Label
        </button>
      </div>
    </div>

    <!-- Shipping Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-blue-600 font-medium">Labels Created</p>
            <p class="text-2xl font-bold text-blue-900">156</p>
          </div>
          <Icon name="ph:tag" class="text-2xl text-blue-500" />
        </div>
      </div>

      <div class="bg-green-50 rounded-lg p-4 border border-green-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-green-600 font-medium">Labels Printed</p>
            <p class="text-2xl font-bold text-green-900">128</p>
          </div>
          <Icon name="ph:printer" class="text-2xl text-green-500" />
        </div>
      </div>

      <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-yellow-600 font-medium">Pending Print</p>
            <p class="text-2xl font-bold text-yellow-900">28</p>
          </div>
          <Icon name="ph:clock" class="text-2xl text-yellow-500" />
        </div>
      </div>

      <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-purple-600 font-medium">This Week</p>
            <p class="text-2xl font-bold text-purple-900">42</p>
          </div>
          <Icon name="ph:calendar" class="text-2xl text-purple-500" />
        </div>
      </div>
    </div>

    <!-- Quick Label Creation -->
    <div class="bg-white rounded-xl mb-6">
      <h3 class="font-semibold text-gray-900 mb-4">Quick Label Creation</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Order ID</label
          >
          <input
            type="text"
            placeholder="Enter order ID"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Carrier</label
          >
          <select
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option>Select Carrier</option>
            <option>UPS</option>
            <option>FedEx</option>
            <option>DHL</option>
            <option>USPS</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Service Type</label
          >
          <select
            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option>Standard</option>
            <option>Express</option>
            <option>Next Day</option>
            <option>International</option>
          </select>
        </div>
      </div>
      <div class="flex justify-end gap-3 mt-4">
        <button
          class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
        >
          Clear
        </button>
        <button
          class="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90"
        >
          Generate Label
        </button>
      </div>
    </div>

    <!-- Shipping Labels Table -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div
        class="py-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <h3 class="font-semibold text-gray-900 text-lg">
          Shipping Labels ({{ shippingLabels.length }})
        </h3>
        <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search labels..."
            class="px-4 py-2 border border-gray-300 rounded-lg text-sm flex-1"
          />
          <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Printed</option>
            <option>Pending</option>
            <option>Used</option>
            <option>Voided</option>
          </select>
          <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Carriers</option>
            <option>UPS</option>
            <option>FedEx</option>
            <option>DHL</option>
            <option>USPS</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <div class="min-w-[1000px]">
          <table class="w-full divide-y divide-gray-200">
            <thead class="bg-orange-100">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Label ID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Order ID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Carrier
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Service
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Dimensions
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Weight
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Created
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="label in shippingLabels" :key="label.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-blue-600">
                    {{ label.labelId }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ label.orderId }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                    :class="getCarrierClass(label.carrier)"
                  >
                    {{ label.carrier }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ label.service }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ label.dimensions }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ label.weight }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getStatusClass(label.status)"
                  >
                    {{ label.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ label.created }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium relative"
                >
                  <!-- 3-dot button -->
                  <button
                    @click="toggleMenu(label.id)"
                    class="p-1 text-primary"
                  >
                    <Icon
                      name="ph:dots-three-vertical-duotone"
                      class="text-lg"
                    />
                  </button>

                  <!-- Dropdown Menu -->
                  <div
                    v-if="openMenuId === label.id"
                    class="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-20"
                  >
                    <button
                      class="w-full flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
                      @click="printLabel(label)"
                    >
                      <Icon name="ph:printer" class="text-base" /> Print Label
                    </button>
                    <button
                      class="w-full flex items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                      @click="downloadPdf(label)"
                    >
                      <Icon name="ph:download" class="text-base" /> Download PDF
                    </button>
                    <button
                      class="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      @click="voidLabel(label)"
                    >
                      <Icon name="ph:x" class="text-base" /> Void Label
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

    <!-- Label Preview Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <!-- Label Template -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="font-semibold text-gray-900 mb-4">Label Preview</h3>
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div class="bg-white p-4 border border-gray-200 rounded">
            <div class="text-center mb-4">
              <div class="text-lg font-bold text-gray-900">
                {{ selectedLabel.carrier }} SHIPPING LABEL
              </div>
              <div class="text-sm text-gray-500">
                Tracking #: {{ selectedLabel.labelId }}
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div class="text-xs font-medium text-gray-500">FROM:</div>
                <div class="text-sm text-gray-900">Warehouse Hub</div>
                <div class="text-sm text-gray-900">1234 Distribution St</div>
                <div class="text-sm text-gray-900">New York, NY 10001</div>
              </div>
              <div>
                <div class="text-xs font-medium text-gray-500">TO:</div>
                <div class="text-sm text-gray-900">Sarah Johnson</div>
                <div class="text-sm text-gray-900">5678 Customer Ave</div>
                <div class="text-sm text-gray-900">Los Angeles, CA 90001</div>
              </div>
            </div>

            <div class="border-t border-gray-200 pt-4">
              <div class="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div class="font-medium text-gray-500">Service:</div>
                  <div>{{ selectedLabel.service }}</div>
                </div>
                <div>
                  <div class="font-medium text-gray-500">Weight:</div>
                  <div>{{ selectedLabel.weight }}</div>
                </div>
                <div>
                  <div class="font-medium text-gray-500">Dimensions:</div>
                  <div>{{ selectedLabel.dimensions }}</div>
                </div>
              </div>
            </div>

            <div class="mt-4 p-2 bg-gray-100 rounded text-center">
              <div class="text-xs text-gray-500">SCAN CODE HERE</div>
              <div class="text-lg font-mono">
                📦 ✸ {{ selectedLabel.labelId }} ✸ 📦
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-3 mt-4">
          <button
            class="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90"
          >
            Print Label
          </button>
          <button
            class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            Download PDF
          </button>
        </div>
      </div>

      <!-- Shipping Instructions -->
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="font-semibold text-gray-900 mb-4">Shipping Instructions</h3>
        <div class="space-y-4">
          <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div class="flex items-center gap-3">
              <Icon name="ph:info" class="text-blue-500 text-lg" />
              <div>
                <h4 class="font-medium text-blue-900">Packaging Guidelines</h4>
                <p class="text-sm text-blue-700 mt-1">
                  Use appropriate packaging materials to ensure safe delivery.
                </p>
              </div>
            </div>
          </div>

          <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div class="flex items-center gap-3">
              <Icon name="ph:warning" class="text-green-500 text-lg" />
              <div>
                <h4 class="font-medium text-green-900">Label Placement</h4>
                <p class="text-sm text-green-700 mt-1">
                  Place label on the largest flat surface of the package.
                </p>
              </div>
            </div>
          </div>

          <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div class="flex items-center gap-3">
              <Icon name="ph:clock" class="text-yellow-500 text-lg" />
              <div>
                <h4 class="font-medium text-yellow-900">Pickup Times</h4>
                <p class="text-sm text-yellow-700 mt-1">
                  Daily pickup at 4:00 PM. Ensure packages are ready by 3:30 PM.
                </p>
              </div>
            </div>
          </div>

          <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div class="flex items-center gap-3">
              <Icon name="ph:phone" class="text-purple-500 text-lg" />
              <div>
                <h4 class="font-medium text-purple-900">Support</h4>
                <p class="text-sm text-purple-700 mt-1">
                  Contact support for any shipping-related questions.
                </p>
              </div>
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
// Shipping labels data
const shippingLabels = ref([
  {
    id: 1,
    labelId: "UPS-78294631",
    orderId: "WH-ORD-001",
    carrier: "UPS",
    service: "Next Day Air",
    dimensions: "12x8x4 in",
    weight: "2.5 lbs",
    status: "Printed",
    created: "2023-10-15 14:30",
  },
  {
    id: 2,
    labelId: "FEDEX-98456213",
    orderId: "WH-ORD-002",
    carrier: "FedEx",
    service: "Ground",
    dimensions: "16x12x6 in",
    weight: "5.2 lbs",
    status: "Pending",
    created: "2023-10-15 10:15",
  },
  {
    id: 3,
    labelId: "DHL-65748921",
    orderId: "WH-ORD-003",
    carrier: "DHL",
    service: "Express",
    dimensions: "20x15x8 in",
    weight: "8.7 lbs",
    status: "Used",
    created: "2023-10-14 16:45",
  },
  {
    id: 4,
    labelId: "USPS-32165498",
    orderId: "WH-ORD-004",
    carrier: "USPS",
    service: "Priority",
    dimensions: "10x6x3 in",
    weight: "1.8 lbs",
    status: "Printed",
    created: "2023-10-14 08:20",
  },
  {
    id: 5,
    labelId: "UPS-12398745",
    orderId: "WH-ORD-005",
    carrier: "UPS",
    service: "Standard",
    dimensions: "18x14x7 in",
    weight: "6.3 lbs",
    status: "Voided",
    created: "2023-10-13 22:10",
  },
]);

const selectedLabel = ref(shippingLabels.value[0]);

// Get carrier class
const getCarrierClass = (carrier) => {
  const classes = {
    UPS: "bg-brown-100 text-brown-800",
    FedEx: "bg-purple-100 text-purple-800",
    DHL: "bg-yellow-100 text-yellow-800",
    USPS: "bg-blue-100 text-blue-800",
  };
  return classes[carrier] || "bg-gray-100 text-gray-800";
};

// Get status class
const getStatusClass = (status) => {
  const classes = {
    Printed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Used: "bg-blue-100 text-blue-800",
    Voided: "bg-red-100 text-red-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};
</script>

<style scoped>
.bg-brown-100 {
  background-color: #f5e8d3;
}
.text-brown-800 {
  color: #5d4037;
}
</style>
