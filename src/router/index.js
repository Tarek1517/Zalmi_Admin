import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "@/components/layouts/DashboardLayout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/dashboard",
      component: DashboardLayout,
      children: [
        {
          path: "",
          name: "DashboardHome",
          component: () => import("@/views/dashboard/DashboardPage.vue"),
        },
        {
          path: "warehouse-overview",
          name: "WarehouseOverview",
          component: () => import("@/views/Warehouse-Overview/WarehouseOverviewPage.vue"),
        },
        {
          path: "orders",
          name: "Orders",
          component: () => import("@/views/Orders/OrdersPage.vue"),
        },
        {
          path: "revenue",
          name: "Revenue",
          component: () => import("@/views/Revenue/RevenuePage.vue"),
        },
        {
          path: "settings",
          name: "Settings",
          component: () => import("@/views/Settings/SettingsPage.vue"),
        },
        {
          path: "tracking-inventory",
          name: "InventoryTracking",
          component: () => import("@/views/InventoryTracking/InventoryTrackingPage.vue"),
        },
        {
          path: "stock-management",
          name: "StockManagement",
          component: () => import("@/views/Stock-Management/StockManagementPage.vue"),
        },
        {
          path: "shipping-labels",
          name: "ShippingLabels",
          component: () => import("@/views/Shipping-Labels/ShippingLabelsPage.vue"),
        },
        {
          path: "return-management",
          name: "ReturnManagement",
          component: () => import("@/views/Return-Management/ReturnManagementPage.vue"),
        },
      ],
    },
    { path: "/", name: "Home", component: () => import("@/views/index.vue") },
    
  ],
});

export default router;
