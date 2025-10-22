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

// Sidebar collapse state
const isCollapsed = ref(false);

// Menu open states
const isVendorLinks = ref(false);
const isAffiliateLinks = ref(false);
const isSystemLinks = ref(false);
const isCMSLinks = ref(false);
const isShippingCMSLinks = ref(false);
const isCampaignLinks = ref(false);

// Keep Admin menu open if the route matches its children
const VendorRoutes = ["/dashboard/vendor-approval", "/dashboard/vendor-list"];
const ShippingRoutes = ["/dashboard/city", "/dashboard/area"];
const AffiliateRoutes = [
  "/dashboard/affiliate-approval",
  "/dashboard/affiliate-list",
];
const CMSRoutes = ["/dashboard/home-slider", "/dashboard/pages"];
const CampaignRoutes = [
  "/dashboard/campaign",
  "/dashboard/flash-sale",
  "/dashboard/promotions",
  "/dashboard/programs",
];

const systemRoutes = [
  "/dashboard/system-settings",
  "/dashboard/database",
  "/dashboard/backup",
  "/dashboard/logs",
  "/dashboard/api-settings",
];

watch(
  () => route.path,
  (newPath) => {
    isVendorLinks.value = VendorRoutes.includes(newPath);
    isAffiliateLinks.value = AffiliateRoutes.includes(newPath);
    isSystemLinks.value = systemRoutes.includes(newPath);
    isCMSLinks.value = CMSRoutes.includes(newPath);
    isCampaignLinks.value = CampaignRoutes.includes(newPath);
    isShippingCMSLinks.value = ShippingRoutes.includes(newPath);
  },
  { immediate: true }
);

// Toggle sidebar collapse
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<template>
  <nav
    class="bg-white rounded-lg p-4 relative transition-all duration-300"
    :class="isCollapsed ? 'w-20' : 'w-64'"
  >
    <!-- Toggle Button -->
    <button
      @click="toggleSidebar"
      class="absolute -right-4 top-7 p-1 rounded-full shadow-md transition-colors z-10"
      :class="[
        'hover:bg-rose-600 hover:text-white',
        isCollapsed ? 'bg-blue-600 text-white' : 'bg-rose-200 text-rose-700',
      ]"
    >
      <Icon
        :name="isCollapsed ? 'ph:caret-right' : 'ph:caret-left'"
        class="text-lg"
      />
    </button>

    <ul class="space-y-1">
      <!-- Admin Dashboard -->
      <li>
        <router-link
          to="/dashboard"
          class="w-full px-4 py-3 text-left flex items-center rounded-xl transition-all duration-200 group"
          :class="[
            $route.path === '/dashboard'
              ? 'bg-gradient-to-r from-blue-50 to-blue-200 border-l-4 border-blue-500 text-blue-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:bg-gray-50 hover:text-blue-700 font-medium hover:translate-x-1',
            isCollapsed ? 'justify-center px-2' : 'justify-start gap-3',
          ]"
        >
          <Icon
            name="material-symbols:dashboard-outline-rounded"
            class="text-xl text-blue-500 group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <span
            class="transition-all duration-200 overflow-hidden whitespace-nowrap"
            :class="isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-3'"
            >Dashboard</span
          >
          <div
            class="w-2 h-2 rounded-full bg-blue-500 ml-11 flex-shrink-0"
            v-if="$route.path === '/dashboard' && !isCollapsed"
          ></div>
        </router-link>
      </li>

      <!-- categories -->
      <li>
        <router-link
          to="/dashboard/categories"
          class="w-full px-4 py-3 text-left flex items-center rounded-xl transition-all duration-200 group"
          :class="[
            $route.path.startsWith('/dashboard/categories')
              ? 'bg-gradient-to-r from-cyan-50 to-cyan-200 border-l-4 border-cyan-500 text-cyan-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:text-cyan-600 font-medium hover:translate-x-1',
            isCollapsed ? 'justify-center px-2' : 'justify-start gap-3',
          ]"
        >
          <Icon
            name="material-symbols:ac-unit"
            class="text-xl text-cyan-500 group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <span
            class="transition-all duration-200 overflow-hidden whitespace-nowrap"
            :class="isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-3'"
            >Category</span
          >
          <div
            class="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0 ml-14"
            v-if="
              $route.path.startsWith('/dashboard/categories') && !isCollapsed
            "
          ></div>
        </router-link>
      </li>

      <!-- categories -->
      <li>
        <router-link
          to="/dashboard/brand"
          class="w-full px-4 py-3 text-left flex items-center rounded-xl transition-all duration-200 group"
          :class="[
            $route.path.startsWith('/dashboard/brand')
              ? 'bg-gradient-to-r from-secondary/5 to-secondary/25 border-l-4 border-secondary text-secondary font-semibold shadow-sm'
              : 'text-gray-900 hover:text-secondary font-medium hover:translate-x-1',
            isCollapsed ? 'justify-center px-2' : 'justify-start gap-3',
          ]"
        >
          <Icon
            name="tabler:brand-databricks"
            class="text-xl text-secondary group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <span
            class="transition-all duration-200 overflow-hidden whitespace-nowrap"
            :class="isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-3'"
            >Brand</span
          >
          <div
            class="w-2 h-2 rounded-full bg-secondary flex-shrink-0 ml-14"
            v-if="$route.path.startsWith('/dashboard/brand') && !isCollapsed"
          ></div>
        </router-link>
      </li>

      <!-- categories -->
      <li>
        <router-link
          to="/dashboard/Products"
          class="w-full px-4 py-3 text-left flex items-center rounded-xl transition-all duration-200 group"
          :class="[
            $route.path.startsWith('/dashboard/Products')
              ? 'bg-gradient-to-r from-violet-50 to-violet-200 border-l-4 border-violet-500 text-violet-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:bg-gray-50 hover:text-violet-700 font-medium hover:translate-x-1',
            isCollapsed ? 'justify-center px-2' : 'justify-start gap-3',
          ]"
        >
          <Icon
            name="eos-icons:product-classes"
            class="text-xl text-violet-500 group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <span
            class="transition-all duration-200 overflow-hidden whitespace-nowrap"
            :class="isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-3'"
            >Products</span
          >
          <div
            class="w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 ml-14"
            v-if="$route.path.startsWith('/dashboard/Products') && !isCollapsed"
          ></div>
        </router-link>
      </li>

      <!-- Vendor -->
      <li>
        <div
          class="w-full px-4 py-3 text-left flex items-center rounded-xl transition-all duration-200 cursor-pointer group hover:bg-gray-50"
          :class="[
            { 'bg-gray-50': isVendorLinks },
            isCollapsed ? 'justify-center px-2' : 'justify-start gap-3',
          ]"
          @click="isCollapsed ? null : (isVendorLinks = !isVendorLinks)"
        >
          <Icon
            name="solar:shop-2-bold"
            class="text-xl text-emerald-500 group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <span
            class="font-medium transition-all duration-200 overflow-hidden whitespace-nowrap"
            :class="{
              'text-gray-900 group-hover:text-emerald-900': !isVendorLinks,
              'text-emerald-900': isVendorLinks,
              'w-0 opacity-0': isCollapsed,
              'w-auto opacity-100 ml-3': !isCollapsed,
            }"
          >
            Vendor
          </span>
          <Icon
            v-if="!isCollapsed"
            name="ph:caret-right"
            class="text-lg text-gray-400 transition-transform duration-200 flex-shrink-0"
            :class="{ 'rotate-90': isVendorLinks }"
          />
        </div>
        <div
          v-if="!isCollapsed"
          class="overflow-hidden transition-all duration-300 ease-in-out"
          :class="{ 'max-h-0': !isVendorLinks, 'max-h-96': isVendorLinks }"
        >
          <ul class="pl-5 space-y-1 mt-1">
            <li>
              <router-link
                to="/dashboard/vendor-approval"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
                :class="{
                  'bg-blue-50 text-blue-700':
                    $route.path === '/dashboard/vendor-approval',
                }"
              >
                <Icon
                  name="ph:storefront"
                  class="text-lg text-blue-700 flex-shrink-0"
                />
                Vendor Approval
              </router-link>
            </li>
            <li>
              <router-link
                to="/dashboard/vendor-list"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-green-50 hover:text-green-700"
                :class="{
                  'bg-green-50 text-green-700':
                    $route.path === '/dashboard/vendor-list',
                }"
              >
                <Icon
                  name="material-symbols:list-alt"
                  class="text-lg text-green-700 flex-shrink-0"
                />
                Vendor List
              </router-link>
            </li>
          </ul>
        </div>
      </li>

      <!-- Affiliate Management -->
      <li>
        <div
          class="w-full px-4 py-3 text-left flex items-center rounded-xl transition-all duration-200 cursor-pointer group hover:bg-gray-50"
          :class="[
            { 'bg-gray-50': isAffiliateLinks },
            isCollapsed ? 'justify-center px-2' : 'justify-start gap-3',
          ]"
          @click="isCollapsed ? null : (isAffiliateLinks = !isAffiliateLinks)"
        >
          <Icon
            name="tabler:affiliate-filled"
            class="text-xl text-fuchsia-500 group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <span
            class="font-medium transition-all duration-200 overflow-hidden whitespace-nowrap"
            :class="{
              'text-gray-900 group-hover:text-fuchsia-900': !isAffiliateLinks,
              'text-fuchsia-900': isAffiliateLinks,
              'w-0 opacity-0': isCollapsed,
              'w-auto opacity-100 ml-3': !isCollapsed,
            }"
          >
            Affiliate
          </span>
          <Icon
            v-if="!isCollapsed"
            name="ph:caret-right"
            class="text-lg text-gray-400 transition-transform duration-200 flex-shrink-0"
            :class="{ 'rotate-90': isAffiliateLinks }"
          />
        </div>
        <div
          v-if="!isCollapsed"
          class="overflow-hidden transition-all duration-300 ease-in-out"
          :class="{
            'max-h-0': !isAffiliateLinks,
            'max-h-96': isAffiliateLinks,
          }"
        >
          <ul class="pl-5 space-y-1 mt-1">
            <li>
              <router-link
                to="/dashboard/affiliate-approval"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-green-50 hover:text-green-700"
                :class="{
                  'bg-green-50 text-green-700':
                    $route.path === '/dashboard/affiliate-approval',
                }"
              >
                <Icon
                  name="ph:handshake"
                  class="text-lg text-green-700 flex-shrink-0"
                />
                Affiliate Approval
              </router-link>
            </li>
            <li>
              <router-link
                to="/dashboard/affiliate-list"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
                :class="{
                  'bg-blue-50 text-blue-700':
                    $route.path === '/dashboard/affiliate-list',
                }"
              >
                <Icon
                  name="material-symbols:patient-list"
                  class="text-lg text-blue-700 flex-shrink-0"
                />
                Affiliate List
              </router-link>
            </li>
          </ul>
        </div>
      </li>

      <!-- Marketing center -->
      <li>
        <div
          class="w-full px-4 py-3 text-left flex items-center rounded-xl transition-all duration-200 cursor-pointer group hover:bg-gray-50"
          :class="[
            { 'bg-gray-50': isCampaignLinks },
            isCollapsed ? 'justify-center px-2' : 'justify-start gap-3',
          ]"
          @click="isCollapsed ? null : (isCampaignLinks = !isCampaignLinks)"
        >
          <Icon
            name="logos:google-marketing-platform"
            class="text-lg text-lime-700 group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <span
            class="font-medium transition-all duration-200 overflow-hidden whitespace-nowrap"
            :class="{
              'text-gray-900 group-hover:text-lime-900': !isCampaignLinks,
              'text-lime-900': isCampaignLinks,
              'w-0 opacity-0': isCollapsed,
              'w-auto opacity-100 ml-3': !isCollapsed,
            }"
          >
            Marketing
          </span>
          <Icon
            v-if="!isCollapsed"
            name="ph:caret-right"
            class="text-lg text-gray-400 transition-transform duration-200 flex-shrink-0"
            :class="{ 'rotate-90': isCampaignLinks }"
          />
        </div>
        <div
          v-if="!isCollapsed"
          class="overflow-hidden transition-all duration-300 ease-in-out"
          :class="{ 'max-h-0': !isCampaignLinks, 'max-h-96': isCampaignLinks }"
        >
          <ul class="pl-5 space-y-1 mt-1">
            <li>
              <router-link
                to="/dashboard/campaign"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-rose-50 hover:text-rose-700"
                :class="{
                  'bg-rose-100 text-rose-700':
                    $route.path === '/dashboard/campaign',
                }"
              >
                <Icon
                  name="material-symbols:campaign"
                  class="text-lg text-rose-700 flex-shrink-0"
                />
                Campaign
              </router-link>
            </li>
            <li>
              <router-link
                to="/dashboard/flash-sale"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-yellow-50 hover:text-yellow-700"
                :class="{
                  'bg-yellow-100 text-yellow-700':
                    $route.path === '/dashboard/flash-sale',
                }"
              >
                <Icon
                  name="mdi:flash-alert-outline"
                  class="text-lg text-yellow-700 flex-shrink-0"
                />
                Flash Sale
              </router-link>
            </li>

            <li>
              <router-link
                to="/dashboard/promotions"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-purple-50 hover:text-purple-700"
                :class="{
                  'bg-purple-100 text-purple-700':
                    $route.path === '/dashboard/promotions',
                }"
              >
                <Icon
                  name="ep:promotion"
                  class="text-lg text-purple-700 flex-shrink-0"
                />
                Promotions
              </router-link>
            </li>

            <li>
              <router-link
                to="/dashboard/programs"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-primary/10 hover:text-primary"
                :class="{
                  'bg-primary/15 text-primary':
                    $route.path === '/dashboard/programs',
                }"
              >
                <Icon
                  name="material-symbols:deployed-code-outline-sharp"
                  class="text-lg text-primary flex-shrink-0"
                />
                Zalmi Programs
              </router-link>
            </li>
          </ul>
        </div>
      </li>

      <!-- System Administration -->
      <li>
        <div
          class="w-full px-4 py-3 text-left flex items-center rounded-xl transition-all duration-200 cursor-pointer group hover:bg-gray-50"
          :class="[
            { 'bg-gray-50': isSystemLinks },
            isCollapsed ? 'justify-center px-2' : 'justify-start gap-3',
          ]"
          @click="isCollapsed ? null : (isSystemLinks = !isSystemLinks)"
        >
          <Icon
            name="tdesign:system-setting"
            class="text-xl text-rose-500 group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <span
            class="font-medium transition-all duration-200 overflow-hidden whitespace-nowrap"
            :class="{
              'text-gray-900 group-hover:text-rose-900': !isSystemLinks,
              'text-rose-900': isSystemLinks,
              'w-0 opacity-0': isCollapsed,
              'w-auto opacity-100 ml-3': !isCollapsed,
            }"
          >
            System Admin
          </span>
          <Icon
            v-if="!isCollapsed"
            name="ph:caret-right"
            class="text-lg text-gray-400 transition-transform duration-200 flex-shrink-0"
            :class="{ 'rotate-90': isSystemLinks }"
          />
        </div>
        <div
          v-if="!isCollapsed"
          class="overflow-hidden transition-all duration-300 ease-in-out"
          :class="{ 'max-h-0': !isSystemLinks, 'max-h-96': isSystemLinks }"
        >
          <ul class="pl-5 space-y-1 mt-1">
            <li>
              <router-link
                to="/dashboard/system-settings"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
                :class="{
                  'bg-blue-50 text-blue-700':
                    $route.path === '/dashboard/system-settings',
                }"
              >
                <Icon
                  name="ph:sliders"
                  class="text-lg text-blue-700 flex-shrink-0"
                />
                System Settings
              </router-link>
            </li>

            <li>
              <router-link
                to="/dashboard/backup"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-orange-50 hover:text-orange-700"
                :class="{
                  'bg-orange-50 text-orange-700':
                    $route.path === '/dashboard/backup',
                }"
              >
                <Icon
                  name="ph:hard-drives"
                  class="text-lg text-orange-700 flex-shrink-0"
                />
                Backup & Restore
              </router-link>
            </li>
            <li>
              <router-link
                to="/dashboard/logs"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-purple-50 hover:text-purple-700"
                :class="{
                  'bg-purple-50 text-purple-700':
                    $route.path === '/dashboard/logs',
                }"
              >
                <Icon
                  name="ph:file-text"
                  class="text-lg text-purple-700 flex-shrink-0"
                />
                System Logs
              </router-link>
            </li>
          </ul>
        </div>
      </li>

      <!-- Content Management System-->
      <li>
        <div
          class="w-full px-4 py-3 text-left flex items-center rounded-xl transition-all duration-200 cursor-pointer group hover:bg-gray-50"
          :class="[
            { 'bg-gray-50': isCMSLinks },
            isCollapsed ? 'justify-center px-2' : 'justify-start gap-3',
          ]"
          @click="isCollapsed ? null : (isCMSLinks = !isCMSLinks)"
        >
          <Icon
            name="mdi:content-save-settings"
            class="text-xl text-teal-500 group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <span
            class="font-medium transition-all duration-200 overflow-hidden whitespace-nowrap"
            :class="{
              'text-gray-900 group-hover:text-teal-900': !isCMSLinks,
              'text-teal-900': isCMSLinks,
              'w-0 opacity-0': isCollapsed,
              'w-auto opacity-100 ml-3': !isCollapsed,
            }"
          >
            CMS
          </span>
          <Icon
            v-if="!isCollapsed"
            name="ph:caret-right"
            class="text-lg text-gray-400 transition-transform duration-200 flex-shrink-0"
            :class="{ 'rotate-90': isCMSLinks }"
          />
        </div>
        <div
          v-if="!isCollapsed"
          class="overflow-hidden transition-all duration-300 ease-in-out"
          :class="{ 'max-h-0': !isCMSLinks, 'max-h-96': isCMSLinks }"
        >
          <ul class="pl-5 space-y-1 mt-1">
            <li>
              <router-link
                to="/dashboard/home-slider"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-green-50 hover:text-green-700"
                :class="{
                  'bg-green-50 text-green-700':
                    $route.path === '/dashboard/home-slider',
                }"
              >
                <Icon
                  name="solar:slider-vertical-outline"
                  class="text-lg text-green-700 flex-shrink-0"
                />
                Home Slider
              </router-link>
            </li>
            <li>
              <router-link
                to="/dashboard/pages"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
                :class="{
                  'bg-blue-50 text-blue-700':
                    $route.path === '/dashboard/pages',
                }"
              >
                <Icon
                  name="material-symbols:patient-list"
                  class="text-lg text-blue-700 flex-shrink-0"
                />
                Pages
              </router-link>
            </li>
          </ul>
        </div>
      </li>

      <!-- Shipping-->
      <li>
        <div
          class="w-full px-4 py-3 text-left flex items-center rounded-xl transition-all duration-200 cursor-pointer group hover:bg-gray-50"
          :class="[
            { 'bg-gray-50': isShippingCMSLinks },
            isCollapsed ? 'justify-center px-2' : 'justify-start gap-3',
          ]"
          @click="
            isCollapsed ? null : (isShippingCMSLinks = !isShippingCMSLinks)
          "
        >
          <Icon
            name="hugeicons:shipping-truck-02"
            class="text-xl text-orange-500 group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <span
            class="font-medium transition-all duration-200 overflow-hidden whitespace-nowrap"
            :class="{
              'text-gray-900 group-hover:text-orange-900': !isShippingCMSLinks,
              'text-orange-900': isShippingCMSLinks,
              'w-0 opacity-0': isCollapsed,
              'w-auto opacity-100 ml-3': !isCollapsed,
            }"
          >
            Shipping
          </span>
          <Icon
            v-if="!isCollapsed"
            name="ph:caret-right"
            class="text-lg text-gray-400 transition-transform duration-200 flex-shrink-0"
            :class="{ 'rotate-90': isShippingCMSLinks }"
          />
        </div>
        <div
          v-if="!isCollapsed"
          class="overflow-hidden transition-all duration-300 ease-in-out"
          :class="{
            'max-h-0': !isShippingCMSLinks,
            'max-h-96': isShippingCMSLinks,
          }"
        >
          <ul class="pl-5 space-y-1 mt-1">
            <li>
              <router-link
                to="/dashboard/city"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-green-50 hover:text-green-700"
                :class="{
                  'bg-green-50 text-green-700':
                    $route.path === '/dashboard/city',
                }"
              >
                <Icon
                  name="material-symbols:location-city-rounded"
                  class="text-lg text-green-700 flex-shrink-0"
                />
                City
              </router-link>
            </li>
            <li>
              <router-link
                to="/dashboard/area"
                class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm transition-all duration-200 hover:bg-blue-50 hover:text-blue-700"
                :class="{
                  'bg-blue-50 text-blue-700': $route.path === '/dashboard/area',
                }"
              >
                <Icon
                  name="material-symbols:area-chart-outline-rounded"
                  class="text-lg text-blue-700 flex-shrink-0"
                />
                Area
              </router-link>
            </li>
          </ul>
        </div>
      </li>

      <!-- Orders -->
      <li>
        <router-link
          to="/dashboard/orders"
          class="w-full px-4 py-3 text-left flex items-center rounded-xl transition-all duration-200 group"
          :class="[
            $route.path.startsWith('/dashboard/orders')
              ? 'bg-gradient-to-r from-orange-50 to-orange-200 border-l-4 border-orange-500 text-orange-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:text-orange-600 font-medium hover:translate-x-1',
            isCollapsed ? 'justify-center px-2' : 'justify-start gap-3',
          ]"
        >
          <Icon
            name="ph:shopping-cart"
            class="text-xl text-orange-500 group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <span
            class="transition-all duration-200 overflow-hidden whitespace-nowrap"
            :class="isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-3'"
            >Orders</span
          >
          <div
            class="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 ml-16"
            v-if="$route.path.startsWith('/dashboard/orders') && !isCollapsed"
          ></div>
        </router-link>
      </li>

      <!-- Warehouse Overview -->
      <li>
        <router-link
          to="/dashboard/warehouse-overview"
          class="w-full px-4 py-3 text-left flex items-center rounded-xl transition-all duration-200 group"
          :class="[
            $route.path.startsWith('/dashboard/warehouse-overview')
              ? 'bg-gradient-to-r from-indigo-50 to-indigo-200 border-l-4 border-indigo-500 text-indigo-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:text-indigo-700 font-medium hover:translate-x-1',
            isCollapsed ? 'justify-center px-2' : 'justify-start gap-3',
          ]"
        >
          <Icon
            name="ph:warehouse"
            class="text-xl text-indigo-500 group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <span
            class="transition-all duration-200 overflow-hidden whitespace-nowrap"
            :class="isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-3'"
            >Warehouses</span
          >
          <div
            class="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0 ml-8"
            v-if="
              $route.path.startsWith('/dashboard/warehouse-overview') &&
              !isCollapsed
            "
          ></div>
        </router-link>
      </li>

      <!-- Send Mail -->
      <li>
        <router-link
          to="/dashboard/send-mail"
          class="w-full px-4 py-3 text-left flex items-center rounded-xl transition-all duration-200 group"
          :class="[
            $route.path.startsWith('/dashboard/send-mail')
              ? 'bg-gradient-to-r from-amber-50 to-amber-200 border-l-4 border-amber-500 text-amber-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:text-amber-600 font-medium hover:translate-x-1',
            isCollapsed ? 'justify-center px-2' : 'justify-start gap-3',
          ]"
        >
          <Icon
            name="line-md:email-alt-filled"
            class="text-xl text-amber-500 group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <span
            class="transition-all duration-200 overflow-hidden whitespace-nowrap"
            :class="isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-3'"
            >Send Mail</span
          >
          <div
            class="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"
            v-if="
              $route.path.startsWith('/dashboard/send-mail') && !isCollapsed
            "
          ></div>
        </router-link>
      </li>

      <!-- Reports & Analytics -->
      <li>
        <router-link
          to="/dashboard/reports"
          class="w-full px-4 py-3 text-left flex items-center rounded-xl transition-all duration-200 group"
          :class="[
            $route.path.startsWith('/dashboard/reports')
              ? 'bg-gradient-to-r from-cyan-50 to-cyan-200 border-l-4 border-cyan-500 text-cyan-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:text-cyan-600 font-medium hover:translate-x-1',
            isCollapsed ? 'justify-center px-2' : 'justify-start gap-3',
          ]"
        >
          <Icon
            name="material-symbols:add-chart"
            class="text-xl text-cyan-500 group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <span
            class="transition-all duration-200 overflow-hidden whitespace-nowrap"
            :class="isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-3'"
            >Reports & Analytics</span
          >
          <div
            class="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0"
            v-if="$route.path.startsWith('/dashboard/reports') && !isCollapsed"
          ></div>
        </router-link>
      </li>

      <!-- Security Center -->
      <li>
        <router-link
          to="/dashboard/security"
          class="w-full px-4 py-3 text-left flex items-center rounded-xl transition-all duration-200 group"
          :class="[
            $route.path.startsWith('/dashboard/security')
              ? 'bg-gradient-to-r from-red-50 to-red-200 border-l-4 border-red-500 text-red-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:text-red-600 font-medium hover:translate-x-1',
            isCollapsed ? 'justify-center px-2' : 'justify-start gap-3',
          ]"
        >
          <Icon
            name="mdi:shield-lock"
            class="text-xl text-red-500 group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <span
            class="transition-all duration-200 overflow-hidden whitespace-nowrap"
            :class="isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-3'"
            >Security Center</span
          >
          <div
            class="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"
            v-if="$route.path.startsWith('/dashboard/security') && !isCollapsed"
          ></div>
        </router-link>
      </li>

      <!-- Settings -->
      <li>
        <router-link
          to="/dashboard/settings"
          class="w-full px-4 py-3 text-left flex items-center rounded-xl transition-all duration-200 group"
          :class="[
            $route.path.startsWith('/dashboard/settings')
              ? 'bg-gradient-to-r from-rose-50 to-rose-200 border-l-4 border-rose-500 text-rose-700 font-semibold shadow-sm'
              : 'text-gray-900 hover:text-rose-600 font-medium hover:translate-x-1',
            isCollapsed ? 'justify-center px-2' : 'justify-start gap-3',
          ]"
        >
          <Icon
            name="ph:gear"
            class="text-xl text-rose-500 group-hover:scale-110 transition-transform flex-shrink-0"
          />
          <span
            class="transition-all duration-200 overflow-hidden whitespace-nowrap"
            :class="isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100 ml-3'"
            >Settings</span
          >
          <div
            class="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0 ml-8"
            v-if="$route.path.startsWith('/dashboard/settings') && !isCollapsed"
          ></div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
