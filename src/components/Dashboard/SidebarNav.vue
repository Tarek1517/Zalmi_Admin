<script setup>
import { ref, inject, watch } from "vue";
const setting = inject("setting");
import { useRoute } from "vue-router";
const route = useRoute();

const props = defineProps({
  text: {
    type: Boolean,
    default: true,
  },
});

const isAdminLinks = ref(false);
const isSystemLinks = ref(false);

// Keep Admin menu open if the route matches its children
const adminRoutes = [
  "/admin/vendor-approval",
  "/admin/affiliate-approval",
  "/admin/user-management",
  "/admin/role-management",
];

const systemRoutes = [
  "/admin/system-settings",
  "/admin/database",
  "/admin/backup",
  "/admin/logs",
  "/admin/api-settings",
];

watch(
  () => route.path,
  (newPath) => {
    isAdminLinks.value = adminRoutes.includes(newPath);
    isSystemLinks.value = systemRoutes.includes(newPath);
  },
  { immediate: true }
);
</script>

<template>
  <nav class="bg-white rounded-lg p-4">
    <ul class="space-y-1">
      <!-- Admin Dashboard -->
      <li>
        <router-link
          to="/dashboard"
          class="w-full px-4 py-3 text-left flex items-center gap-3 rounded-xl transition-all duration-200 group"
          :class="
            $route.path === '/dashboard'
              ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 text-blue-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:bg-gray-50 hover:text-blue-700 font-medium hover:translate-x-1'
          "
        >
          <Icon
            name="ph:gauge"
            class="text-xl text-blue-500 group-hover:scale-110 transition-transform"
          />
          <span class="flex-1">Dashboard</span>
          <div
            class="w-2 h-2 rounded-full bg-blue-500"
            v-if="$route.path === '/dashboard'"
          ></div>
        </router-link>
      </li>

      <!-- Orders -->
      <li>
        <router-link
          to="/dashboard/orders"
          class="w-full px-4 py-3 text-left flex items-center gap-3 rounded-xl transition-all duration-200 group"
          :class="
            $route.path.startsWith('/dashboard/orders')
              ? 'bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 text-orange-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:text-orange-600 font-medium hover:translate-x-1'
          "
        >
          <Icon
            name="ph:shopping-cart"
            class="text-xl text-orange-500 group-hover:scale-110 transition-transform"
          />
          <span class="flex-1">Orders</span>
          <div
            class="w-2 h-2 rounded-full bg-orange-500"
            v-if="$route.path.startsWith('/dashboard/orders')"
          ></div>
        </router-link>
      </li>

      <!-- Warehouse Overview -->
      <li>
        <router-link
          to="/dashboard/warehouse-overview"
          class="w-full px-4 py-3 text-left flex items-center gap-3 rounded-xl transition-all duration-200 group"
          :class="
            $route.path.startsWith('/dashboard/warehouse-overview')
              ? 'bg-gradient-to-r from-indigo-50 to-indigo-100 border-l-4 border-indigo-500 text-indigo-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:text-indigo-700 font-medium hover:translate-x-1'
          "
        >
          <Icon
            name="ph:warehouse"
            class="text-xl text-indigo-500 group-hover:scale-110 transition-transform"
          />
          <span class="flex-1">Warehouse</span>
          <div
            class="w-2 h-2 rounded-full bg-indigo-500"
            v-if="$route.path.startsWith('/dashboard/warehouse-overview')"
          ></div>
        </router-link>
      </li>

      <!-- Approval Center -->
      <li>
        <router-link
          to="/admin/approval-center"
          class="w-full px-4 py-3 text-left flex items-center gap-3 rounded-xl transition-all duration-200 group"
          :class="
            $route.path.startsWith('/admin/approval-center')
              ? 'bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 text-green-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:text-green-700 font-medium hover:translate-x-1'
          "
        >
          <Icon
            name="ph:check-circle"
            class="text-xl text-green-500 group-hover:scale-110 transition-transform"
          />
          <span class="flex-1">Approval Center</span>
          <div
            class="w-2 h-2 rounded-full bg-green-500"
            v-if="$route.path.startsWith('/admin/approval-center')"
          ></div>
        </router-link>
      </li>

      <!-- User Management -->
      <li>
        <div
          class="w-full px-4 py-3 text-left flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer group hover:bg-gray-50"
          :class="{ 'bg-gray-50': isAdminLinks }"
          @click="isAdminLinks = !isAdminLinks"
        >
          <Icon
            name="ph:users"
            class="text-xl text-indigo-500 group-hover:scale-110 transition-transform"
          />
          <span
            class="flex-1 font-medium transition-colors duration-200"
            :class="{
              'text-gray-900 group-hover:text-indigo-900': !isAdminLinks,
              'text-indigo-900': isAdminLinks,
            }"
          >
            User M
          </span>
          <Icon
            name="ph:caret-right"
            class="text-lg text-gray-400 transition-transform duration-200"
            :class="{ 'rotate-90': isAdminLinks }"
          />
        </div>
        <div
          class="overflow-hidden transition-all duration-300 ease-in-out"
          :class="{ 'max-h-0': !isAdminLinks, 'max-h-96': isAdminLinks }"
        >
          <ul class="pl-5 space-y-1 mt-1">
            <li>
              <router-link
                to="/admin/vendor-approval"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
                :class="{
                  'bg-blue-50 text-blue-700':
                    $route.path === '/admin/vendor-approval',
                }"
              >
                <Icon name="ph:storefront" class="text-lg text-blue-700" />
                Vendor Approval
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/affiliate-approval"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-green-50 hover:text-green-700"
                :class="{
                  'bg-green-50 text-green-700':
                    $route.path === '/admin/affiliate-approval',
                }"
              >
                <Icon name="ph:handshake" class="text-lg text-green-700" />
                Affiliate Approval
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/user-management"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-purple-50 hover:text-purple-700"
                :class="{
                  'bg-purple-50 text-purple-700':
                    $route.path === '/admin/user-management',
                }"
              >
                <Icon name="ph:user-list" class="text-lg text-purple-700" />
                All Users
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/role-management"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-orange-50 hover:text-orange-700"
                :class="{
                  'bg-orange-50 text-orange-700':
                    $route.path === '/admin/role-management',
                }"
              >
                <Icon name="ph:key" class="text-lg text-orange-700" />
                Role Management
              </router-link>
            </li>
          </ul>
        </div>
      </li>

      <!-- Financial Management -->
      <li>
        <router-link
          to="/admin/financial"
          class="w-full px-4 py-3 text-left flex items-center gap-3 rounded-xl transition-all duration-200 group"
          :class="
            $route.path.startsWith('/admin/financial')
              ? 'bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 text-orange-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:text-orange-600 font-medium hover:translate-x-1'
          "
        >
          <Icon
            name="ph:currency-dollar"
            class="text-xl text-orange-500 group-hover:scale-110 transition-transform"
          />
          <span class="flex-1">Financial M</span>
          <div
            class="w-2 h-2 rounded-full bg-orange-500"
            v-if="$route.path.startsWith('/admin/financial')"
          ></div>
        </router-link>
      </li>

      <!-- Content Moderation -->
      <li>
        <router-link
          to="/admin/moderation"
          class="w-full px-4 py-3 text-left flex items-center gap-3 rounded-xl transition-all duration-200 group"
          :class="
            $route.path.startsWith('/admin/moderation')
              ? 'bg-gradient-to-r from-purple-100 to-purple-200 border-l-4 border-purple-500 text-purple-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:text-purple-600 font-medium hover:translate-x-1'
          "
        >
          <Icon
            name="ph:shield-check"
            class="text-xl text-purple-500 group-hover:scale-110 transition-transform"
          />
          <span class="flex-1">Content Moderation</span>
          <div
            class="w-2 h-2 rounded-full bg-purple-500"
            v-if="$route.path.startsWith('/admin/moderation')"
          ></div>
        </router-link>
      </li>

      <!-- System Administration -->
      <li>
        <div
          class="w-full px-4 py-3 text-left flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer group hover:bg-gray-50"
          :class="{ 'bg-gray-50': isSystemLinks }"
          @click="isSystemLinks = !isSystemLinks"
        >
          <Icon
            name="ph:gear-six"
            class="text-xl text-rose-500 group-hover:scale-110 transition-transform"
          />
          <span
            class="flex-1 font-medium transition-colors duration-200"
            :class="{
              'text-gray-900 group-hover:text-rose-900': !isSystemLinks,
              'text-rose-900': isSystemLinks,
            }"
          >
            System Admin
          </span>
          <Icon
            name="ph:caret-right"
            class="text-lg text-gray-400 transition-transform duration-200"
            :class="{ 'rotate-90': isSystemLinks }"
          />
        </div>
        <div
          class="overflow-hidden transition-all duration-300 ease-in-out"
          :class="{ 'max-h-0': !isSystemLinks, 'max-h-96': isSystemLinks }"
        >
          <ul class="pl-5 space-y-1 mt-1">
            <li>
              <router-link
                to="/admin/system-settings"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
                :class="{
                  'bg-blue-50 text-blue-700':
                    $route.path === '/admin/system-settings',
                }"
              >
                <Icon name="ph:sliders" class="text-lg text-blue-700" />
                System Settings
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/database"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-green-50 hover:text-green-700"
                :class="{
                  'bg-green-50 text-green-700':
                    $route.path === '/admin/database',
                }"
              >
                <Icon name="ph:database" class="text-lg text-green-700" />
                Database Management
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/backup"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-orange-50 hover:text-orange-700"
                :class="{
                  'bg-orange-50 text-orange-700':
                    $route.path === '/admin/backup',
                }"
              >
                <Icon name="ph:hard-drives" class="text-lg text-orange-700" />
                Backup & Restore
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/logs"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-purple-50 hover:text-purple-700"
                :class="{
                  'bg-purple-50 text-purple-700': $route.path === '/admin/logs',
                }"
              >
                <Icon name="ph:file-text" class="text-lg text-purple-700" />
                System Logs
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/api-settings"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-cyan-50 hover:text-cyan-700"
                :class="{
                  'bg-cyan-50 text-cyan-700':
                    $route.path === '/admin/api-settings',
                }"
              >
                <Icon name="ph:code" class="text-lg text-cyan-700" />
                API Settings
              </router-link>
            </li>
          </ul>
        </div>
      </li>

      <!-- Reports & Analytics -->
      <li>
        <router-link
          to="/admin/reports"
          class="w-full px-4 py-3 text-left flex items-center gap-3 rounded-xl transition-all duration-200 group"
          :class="
            $route.path.startsWith('/admin/reports')
              ? 'bg-gradient-to-r from-cyan-50 to-cyan-100 border-l-4 border-cyan-500 text-cyan-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:text-cyan-600 font-medium hover:translate-x-1'
          "
        >
          <Icon
            name="ph:chart-bar"
            class="text-xl text-cyan-500 group-hover:scale-110 transition-transform"
          />
          <span class="flex-1">Reports & Analytics</span>
          <div
            class="w-2 h-2 rounded-full bg-cyan-500"
            v-if="$route.path.startsWith('/admin/reports')"
          ></div>
        </router-link>
      </li>

      <!-- Security Center -->
      <li>
        <router-link
          to="/admin/security"
          class="w-full px-4 py-3 text-left flex items-center gap-3 rounded-xl transition-all duration-200 group"
          :class="
            $route.path.startsWith('/admin/security')
              ? 'bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 text-red-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:text-red-600 font-medium hover:translate-x-1'
          "
        >
          <Icon
            name="ph:shield"
            class="text-xl text-red-500 group-hover:scale-110 transition-transform"
          />
          <span class="flex-1">Security Center</span>
          <div
            class="w-2 h-2 rounded-full bg-red-500"
            v-if="$route.path.startsWith('/admin/security')"
          ></div>
        </router-link>
      </li>

      <li>
        <router-link
          to="/dashboard/settings"
          class="w-full px-4 py-3 text-left flex items-center gap-3 rounded-xl transition-all duration-200 group"
          :class="
            $route.path.startsWith('/dashboard/settings')
              ? 'bg-gradient-to-r from-rose-50 to-rose-200 border-l-4 border-rose-500 text-rose-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:text-rose-600 font-medium hover:translate-x-1'
          "
        >
          <Icon
            name="ph:gear"
            class="text-xl text-rose-500 group-hover:scale-110 transition-transform"
          />
          <span class="flex-1">Settings</span>
          <div
            class="w-2 h-2 rounded-full bg-rose-500"
            v-if="$route.path.startsWith('/dashboard/settings')"
          ></div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
