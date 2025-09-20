<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Order Management</h2>
        <p class="text-sm text-gray-600 mt-1">Monitor and manage all system orders</p>
      </div>
      <div class="flex items-center gap-3">
        <button
          class="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Icon name="ph:export" class="text-lg" />
        
        </button>
        <button
          class="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <Icon name="ph:plus" class="text-lg" />
          New Order
        </button>
      </div>
    </div>

    <!-- Order Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-blue-500/10 to-blue-600/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold tracking-wide uppercase text-blue-600/80">Total Orders</p>
            <p class="text-3xl font-bold text-blue-900">2,847</p>
            <p class="text-xs font-medium mt-2 flex items-center text-blue-600">
              <span class="inline-flex items-center">
                <Icon name="ph:trend-up" class="mr-1" />
                +18% from last month
              </span>
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-blue-500/20 text-blue-600">
            <Icon name="ph:shopping-cart" class="text-2xl" />
          </div>
        </div>
      </div>

      <div class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-amber-500/10 to-amber-600/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold tracking-wide uppercase text-amber-600/80">Pending Processing</p>
            <p class="text-3xl font-bold text-amber-900">156</p>
            <p class="text-xs font-medium mt-2 flex items-center text-amber-600">
              <span class="inline-flex items-center">
                Awaiting action
              </span>
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-amber-500/20 text-amber-600">
            <Icon name="ph:clock" class="text-2xl" />
          </div>
        </div>
      </div>

      <div class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-emerald-500/10 to-emerald-600/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold tracking-wide uppercase text-emerald-600/80">Revenue Today</p>
            <p class="text-3xl font-bold text-emerald-900">$24.8K</p>
            <p class="text-xs font-medium mt-2 flex items-center text-emerald-600">
              <span class="inline-flex items-center">
                <Icon name="ph:currency-dollar" class="mr-1" />
                +12% daily growth
              </span>
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-emerald-500/20 text-emerald-600">
            <Icon name="ph:currency-dollar" class="text-2xl" />
          </div>
        </div>
      </div>

      <div class="rounded-xl shadow-lg p-6 border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-violet-500/10 to-violet-600/20">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold tracking-wide uppercase text-violet-600/80">Avg. Order Value</p>
            <p class="text-3xl font-bold text-violet-900">$89.42</p>
            <p class="text-xs font-medium mt-2 flex items-center text-violet-600">
              <span class="inline-flex items-center">
                <Icon name="ph:trend-up" class="mr-1" />
                +5.2% increase
              </span>
            </p>
          </div>
          <div class="p-3 rounded-xl shadow-md bg-violet-500/20 text-violet-600">
            <Icon name="ph:chart-line" class="text-2xl" />
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white rounded-2xl py-6 mb-6 border-0">
      <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Order Management <span class="text-gray-500">({{ filteredOrders.length }})</span></h3>
        
        <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div class="relative flex-1">
            <Icon name="ph:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search orders, customers, products..."
              v-model="searchQuery"
              class="pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select v-model="statusFilter" class="px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Ready to Ship">Ready to Ship</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Refunded">Refunded</option>
          </select>
          
          <select v-model="channelFilter" class="px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="">All Channels</option>
            <option value="Online Store">Online Store</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Retail">Retail Store</option>
            <option value="Wholesale">Wholesale</option>
            <option value="Marketplace">Marketplace</option>
          </select>

          <button class="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm transition-colors">
            <Icon name="ph:funnel" class="text-lg" />
          </button>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden border-0">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-orange-100">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Order Details
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Customer
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Date & Channel
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Items & Value
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Payment
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200/80">
            <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50/50 transition-colors duration-150">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-blue-600">
                  {{ order.order_code }}
                </div>
                <div class="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <Icon name="ph:tag" class="text-gray-400" />
                  {{ order.channel }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ order.customer }}
                </div>
                <div class="text-xs text-gray-500">{{ order.phone }}</div>
                <div class="text-xs text-gray-400 mt-1">{{ order.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatDate(order.order_date) }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ formatTime(order.order_date) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {{ order.items }} items
                  </span>
                  <span class="text-sm font-semibold text-gray-900">
                    ${{ order.amount.toFixed(2) }}
                  </span>
                </div>
                <div class="text-xs text-gray-500 mt-1">
                  {{ order.shipping_method }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="getPaymentClass(order.payment_status)">
                  {{ order.payment_status }}
                </span>
                <div class="text-xs text-gray-500 mt-1">
                  {{ order.payment_method }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <select
                  :value="order.status"
                  @change="updateOrderStatus(order.id, $event.target.value)"
                  class="rounded-xl text-xs font-medium px-3 py-1.5 border-0 focus:ring-2 focus:ring-blue-500/50 shadow-sm"
                  :class="getStatusClass(order.status)"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Ready to Ship">Ready to Ship</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <button @click="viewOrder(order)" class="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                    <Icon name="ph:eye" class="text-lg" />
                  </button>
                  <button @click="editOrder(order)" class="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors">
                    <Icon name="ph:pencil" class="text-lg" />
                  </button>
                  <div class="relative">
                    <button
                      @click="toggleMenu(order.id)"
                      class="p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Icon name="ph:dots-three-vertical" class="text-lg" />
                    </button>

                    <div
                      v-if="openMenuId === order.id"
                      class="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1"
                    >
                      <button
                        class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        @click="printInvoice(order)"
                      >
                        <Icon name="ph:receipt" class="text-base" /> Invoice
                      </button>
                      <button
                        class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        @click="trackOrder(order)"
                      >
                        <Icon name="ph:map-pin" class="text-base" /> Track
                      </button>
                      <button
                        class="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        @click="duplicateOrder(order)"
                      >
                        <Icon name="ph:copy" class="text-base" /> Duplicate
                      </button>
                      <div class="border-t border-gray-200 my-1"></div>
                      <button
                        class="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        @click="deleteOrder(order)"
                      >
                        <Icon name="ph:trash" class="text-base" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-sm text-gray-700">
            Showing <span class="font-semibold">1</span> to
            <span class="font-semibold">10</span> of
            <span class="font-semibold">{{ filteredOrders.length }}</span> results
          </div>
          <div class="flex items-center gap-2">
            <button
              class="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <button class="px-3.5 py-1.5 bg-primary text-white rounded-lg text-sm font-semibold">
              1
            </button>
            <button
              class="px-3.5 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              2
            </button>
            <button
              class="px-3.5 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              3
            </button>
            <button
              class="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Filters
const searchQuery = ref("");
const statusFilter = ref("");
const channelFilter = ref("");

// Warehouse orders data
const orders = ref([
  {
    id: 1,
    order_code: "ORD-2023-001",
    customer: "Sarah Johnson",
    phone: "+1 (555) 123-4567",
    email: "sarah@example.com",
    order_date: "2023-10-15T14:30:00",
    items: 3,
    amount: 249.99,
    shipping_method: "Express Delivery",
    status: "Ready to Ship",
    payment_status: "Paid",
    payment_method: "Credit Card",
    channel: "Online Store",
    priority: "High"
  },
  {
    id: 2,
    order_code: "ORD-2023-002",
    customer: "Mike Chen",
    phone: "+1 (555) 234-5678",
    email: "mike@example.com",
    order_date: "2023-10-15T10:15:00",
    items: 1,
    amount: 89.99,
    shipping_method: "Standard Shipping",
    status: "Processing",
    payment_status: "Paid",
    payment_method: "PayPal",
    channel: "Mobile App",
    priority: "Medium"
  },
  {
    id: 3,
    order_code: "ORD-2023-003",
    customer: "Emma Wilson",
    phone: "+1 (555) 345-6789",
    email: "emma@example.com",
    order_date: "2023-10-14T16:45:00",
    items: 5,
    amount: 459.99,
    shipping_method: "Next Day Air",
    status: "Pending",
    payment_status: "Pending",
    payment_method: "Bank Transfer",
    channel: "Online Store",
    priority: "High"
  },
  {
    id: 4,
    order_code: "ORD-2023-004",
    customer: "David Kim",
    phone: "+1 (555) 456-7890",
    email: "david@example.com",
    order_date: "2023-10-14T09:20:00",
    items: 2,
    amount: 129.99,
    shipping_method: "Standard Shipping",
    status: "Shipped",
    payment_status: "Paid",
    payment_method: "Credit Card",
    channel: "Retail Store",
    priority: "Low"
  },
  {
    id: 5,
    order_code: "ORD-2023-005",
    customer: "Lisa Rodriguez",
    phone: "+1 (555) 567-8901",
    email: "lisa@example.com",
    order_date: "2023-10-13T13:10:00",
    items: 4,
    amount: 329.99,
    shipping_method: "Express Delivery",
    status: "Delivered",
    payment_status: "Refunded",
    payment_method: "Credit Card",
    channel: "Marketplace",
    priority: "Medium"
  }
]);

// Filtered orders
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesSearch = searchQuery.value === "" || 
      order.order_code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    const matchesStatus = statusFilter.value === "" || order.status === statusFilter.value;
    const matchesChannel = channelFilter.value === "" || order.channel === channelFilter.value;
    
    return matchesSearch && matchesStatus && matchesChannel;
  });
});

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Format time
const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Update order status
const updateOrderStatus = (orderId, newStatus) => {
  const order = orders.value.find((o) => o.id === orderId);
  if (order) {
    order.status = newStatus;
  }
};

// Get status class
const getStatusClass = (status) => {
  const classes = {
    Pending: "bg-gray-100 text-gray-800",
    Processing: "bg-yellow-100 text-yellow-800",
    "Ready to Ship": "bg-blue-100 text-blue-800",
    Shipped: "bg-green-100 text-green-800",
    Delivered: "bg-purple-100 text-purple-800",
    Cancelled: "bg-red-100 text-red-800",
    Refunded: "bg-orange-100 text-orange-800"
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

// Get payment class
const getPaymentClass = (paymentStatus) => {
  const classes = {
    Paid: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Failed: "bg-red-100 text-red-800",
    Refunded: "bg-orange-100 text-orange-800"
  };
  return classes[paymentStatus] || "bg-gray-100 text-gray-800";
};

const openMenuId = ref(null);

const toggleMenu = (id) => {
  openMenuId.value = openMenuId.value === id ? null : id;
};

const viewOrder = (order) => {
  console.log("Viewing order:", order);
  openMenuId.value = null;
};

const editOrder = (order) => {
  console.log("Editing order:", order);
  openMenuId.value = null;
};

const printInvoice = (order) => {
  console.log("Printing invoice:", order);
  openMenuId.value = null;
};

const trackOrder = (order) => {
  console.log("Tracking order:", order);
  openMenuId.value = null;
};

const duplicateOrder = (order) => {
  console.log("Duplicating order:", order);
  openMenuId.value = null;
};

const deleteOrder = (order) => {
  console.log("Deleting order:", order);
  openMenuId.value = null;
};
</script>