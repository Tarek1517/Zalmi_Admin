<script setup>
import ProfileHeader from "@/components/Dashboard/ProfileHeader.vue";
import SidebarNav from "@/components/Dashboard/SidebarNav.vue";
</script>

<template>
  <AppLayout>
    <div class="bg-gray-50">
      <section class="pb-16">
        <ProfileHeader />
        <div class="flex flex-col lg:flex-row gap-8 mb-12">
          <!-- Sidebar -->
          <div class="shrink-0">
            <SidebarNav />
          </div>
          <!-- Main Content -->
          <div class="flex-1 mr-12 mt-5">
            <router-view />
          </div>
        </div>
      </section>
    </div>
  </AppLayout>
</template>
