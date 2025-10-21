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
          component: () => import("@/views/Warehouse/WarehousePage.vue"),
        },
        {
          path: "orders",
          name: "Orders",
          component: () => import("@/views/Orders/OrdersPage.vue"),
        },
        {
          path: "vendor-approval",
          name: "VendorApproval",
          component: () => import("@/views/Vendor/VendorApprovalPage.vue"),
        },
        {
          path: "vendor-list",
          name: "VendorList",
          component: () => import("@/views/Vendor/index.vue"),
        },
        {
          path: "settings",
          name: "Settings",
          component: () => import("@/views/Settings/SettingsPage.vue"),
        },
        {
          path: "affiliate-approval",
          name: "AffiliateApproval",
          component: () =>
            import("@/views/Affiliate/AffiliateApprovalPage.vue"),
        },
        {
          path: "affiliate-list",
          name: "AffiliateList",
          component: () => import("@/views/Affiliate/index.vue"),
        },

        {
          path: "send-mail",
          name: "SendMail",
          component: () => import("@/views/Mail/index.vue"),
        },

        {
          path: "categories",
          name: "Categories",
          component: () => import("@/views/Category/index.vue"),
        },

        {
          path: "brand",
          name: "Brand",
          component: () => import("@/views/Brand/index.vue"),
        },

        {
          path: "Products",
          name: "products",
          component: () => import("@/views/Products/index.vue"),
        },

        {
          path: "campaign",
          name: "Campaign",
          component: () => import("@/views/Campaign/index.vue"),
        },

        {
          path: "reports",
          name: "Reports",
          component: () => import("@/views/Report/index.vue"),
        },

        {
          path: "flash-sale",
          name: "FlashSale",
          component: () => import("@/views/Flash/index.vue"),
        },

        {
          path: "promotions",
          name: "Promotions",
          component: () => import("@/views/Promotion/index.vue"),
        },

        {
          path: "programs",
          name: "Programs",
          component: () => import("@/views/Program/index.vue"),
        },

        {
          path: "system-settings",
          name: "SystemSettings",
          component: () => import("@/views/System/SystemSettings.vue"),
        },
        {
          path: "backup",
          name: "Backup",
          component: () => import("@/views/System/Backup.vue"),
        },

        {
          path: "logs",
          name: "Logs",
          component: () => import("@/views/System/SystemLog.vue"),
        },

        {
          path: "security",
          name: "Security",
          component: () => import("@/views/Security/index.vue"),
        },

        {
          path: "city",
          name: "city",
          component: () => import("@/views/Shipping/City.vue"),
        },
        {
          path: "area",
          name: "area",
          component: () => import("@/views/Shipping/Area.vue"),
        },
      ],
    },
    { path: "/", name: "Home", component: () => import("@/views/index.vue") },
  ],
});

export default router;
