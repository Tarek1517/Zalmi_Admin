<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-rose-600">Settings</h2>
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
          class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-primary/20 p-8 hover:shadow-2xl transition-all duration-300"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Left Column -->
            <div class="space-y-6">
              <!-- App Information Section -->
              <div
                class="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200"
              >
                <h4 class="font-semibold text-gray-700 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-rose-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  App Information
                </h4>
                <div class="space-y-4">
                  <div>
                    <label
                      for="app-url"
                      class="text-sm font-medium text-gray-700 mb-1 block"
                      >App URL</label
                    >
                    <div class="relative">
                      <input
                        v-model="setting.app_url"
                        readonly
                        type="text"
                        class="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                      />
                      <span
                        class="absolute right-3 top-3 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded"
                        >Read Only</span
                      >
                    </div>
                  </div>

                  <div>
                    <label
                      for="app-name"
                      class="text-sm font-medium text-gray-700 mb-1 block"
                      >App Name</label
                    >
                    <input
                      v-model="setting.app_name"
                      type="text"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <!-- Contact Information Section -->
              <div
                class="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200"
              >
                <h4 class="font-semibold text-gray-700 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-rose-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                    />
                  </svg>
                  Contact Information
                </h4>
                <div class="space-y-4">
                  <div>
                    <label
                      for="hotline-number"
                      class="text-sm font-medium text-gray-700 mb-1 block"
                      >Hotline Number</label
                    >
                    <input
                      v-model="setting.hotline_number"
                      type="text"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      for="phone-number"
                      class="text-sm font-medium text-gray-700 mb-1 block"
                      >Phone Number</label
                    >
                    <input
                      v-model="setting.phone_number"
                      type="text"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      for="whatsapp-number"
                      class="text-sm font-medium text-gray-700 mb-1 block"
                      >WhatsApp Number</label
                    >
                    <input
                      v-model="setting.whatsapp_number"
                      type="text"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      for="email"
                      class="text-sm font-medium text-gray-700 mb-1 block"
                      >Email</label
                    >
                    <input
                      v-model="setting.email"
                      type="text"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <!-- Social Media Section -->
              <div
                class="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200"
              >
                <h4 class="font-semibold text-gray-700 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-rose-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"
                    />
                  </svg>
                  Social Media
                </h4>
                <div class="space-y-4">
                  <div>
                    <label
                      for="facebook"
                      class="text-sm font-medium text-gray-700 mb-1 block"
                      >Facebook</label
                    >
                    <input
                      v-model="setting.facebook_link"
                      type="text"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      for="instagram"
                      class="text-sm font-medium text-gray-700 mb-1 block"
                      >Instagram</label
                    >
                    <input
                      v-model="setting.instagram_link"
                      type="text"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      for="linkedin"
                      class="text-sm font-medium text-gray-700 mb-1 block"
                      >LinkedIn</label
                    >
                    <input
                      v-model="setting.linkedin_link"
                      type="text"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      for="youtube"
                      class="text-sm font-medium text-gray-700 mb-1 block"
                      >YouTube</label
                    >
                    <input
                      v-model="setting.youtube_link"
                      type="text"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      for="twitter"
                      class="text-sm font-medium text-gray-700 mb-1 block"
                      >Twitter</label
                    >
                    <input
                      v-model="setting.twitter_link"
                      type="text"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-6">
              <!-- Legal Links Section -->
              <div
                class="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200"
              >
                <h4 class="font-semibold text-gray-700 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-rose-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Legal Links
                </h4>
                <div class="space-y-4">
                  <div>
                    <label
                      for="privacy-policy"
                      class="text-sm font-medium text-gray-700 mb-1 block"
                      >Privacy & Policy Link</label
                    >
                    <input
                      v-model="setting.privacyPolicy_link"
                      type="text"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      for="terms-conditions"
                      class="text-sm font-medium text-gray-700 mb-1 block"
                      >Terms & Conditions Link</label
                    >
                    <input
                      v-model="setting.termsandcondition_link"
                      type="text"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <!-- Business Details Section -->
              <div
                class="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200"
              >
                <h4 class="font-semibold text-gray-700 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-rose-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Business Details
                </h4>
                <div class="space-y-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        for="currency"
                        class="text-sm font-medium text-gray-700 mb-1 block"
                        >Currency</label
                      >
                      <input
                        v-model="setting.currency"
                        type="text"
                        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                      />
                    </div>

                    <div>
                      <label
                        for="currency-symbol"
                        class="text-sm font-medium text-gray-700 mb-1 block"
                        >Currency Symbol</label
                      >
                      <input
                        v-model="setting.currency_symbol"
                        type="text"
                        class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="address"
                      class="text-sm font-medium text-gray-700 mb-1 block"
                      >Address</label
                    >
                    <textarea
                      v-model="setting.address"
                      rows="3"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    ></textarea>
                  </div>

                  <div>
                    <label
                      for="service-hours"
                      class="text-sm font-medium text-gray-700 mb-1 block"
                      >Service Hours</label
                    >
                    <textarea
                      v-model="setting.service_hours"
                      rows="3"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Location Section -->
              <div
                class="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200"
              >
                <h4 class="font-semibold text-gray-700 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-rose-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Location
                </h4>
                <div>
                  <label
                    for="google-map"
                    class="text-sm font-medium text-gray-700 mb-1 block"
                    >Google Map Link</label
                  >
                  <textarea
                    v-model="setting.google_map"
                    rows="3"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Inventory Settings -->
        <div
          v-if="activeTab === 'home'"
          class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-primary/20 p-6 hover:shadow-2xl transition-all duration-300"
        >
          <h3 class="font-semibold text-rose-900 mb-6">Home Settings</h3>
          <div class="w-full">
            <label
              for="header-category"
              class="text-sm font-medium text-gray-700 mb-2 block"
            >
              Select Home Products
            </label>

            <VSelect
              v-if="products"
              label="title"
              :options="products?.data"
              :reduce="(item) => item.id"
              v-model="setting.home_products"
              multiple
              class="custom-select"
            >
              <template #option="option">
                <div class="flex items-center gap-3 py-2">
                  <img
                    :src="option?.cover_image_url"
                    class="w-10 h-10 rounded object-cover border border-gray-200"
                    :alt="option?.title"
                  />
                  <span class="text-sm font-medium">{{ option?.title }}</span>
                </div>
              </template>
            </VSelect>
          </div>

          <div class="w-full mt-2">
            <label
              for="header-category"
              class="text-sm font-medium text-gray-700 mb-2 block"
            >
              Select Header Categories
            </label>

            <VSelect
              v-if="categories"
              label="name"
              :options="categories"
              :reduce="(item) => item.id"
              v-model="setting.header_categories"
              multiple
              class="custom-select"
            >
              <template #option="option">
                <div class="flex items-center gap-3 py-2">
                  <img
                    :src="option?.banner_image_url"
                    class="w-10 h-10 rounded object-cover border border-gray-200"
                    :alt="option?.name"
                  />
                  <span class="text-sm font-medium">{{ option?.name }}</span>
                </div>
              </template>
            </VSelect>
          </div>

          <div class="w-full mt-2">
            <label
              for="header-category"
              class="text-sm font-medium text-gray-700 mb-2 block"
            >
              Select Home Categories
            </label>

            <VSelect
              v-if="AllCategories"
              label="name"
              :options="AllCategories"
              :reduce="(item) => item.id"
              v-model="setting.home_categories"
              multiple
              class="custom-select"
            >
              <template #option="option">
                <div class="flex items-center gap-3 py-2">
                  <img
                    :src="option?.banner_image_url"
                    class="w-10 h-10 rounded object-cover border border-gray-200"
                    :alt="option?.name"
                  />
                  <span class="text-sm font-medium">{{ option?.name }}</span>
                </div>
              </template>
            </VSelect>
          </div>

          <div class="w-full mt-5">
            <label
              for="header-category"
              class="text-sm font-medium text-gray-700 mb-2 block"
            >
              Select Category Section 1
            </label>

            <VSelect
              v-if="categories"
              label="name"
              :options="categories"
              :reduce="(item) => item.id"
              v-model="setting.home_category"
              class="custom-select"
            >
              <template #option="option">
                <div class="flex items-center gap-3 py-2">
                  <img
                    :src="option?.banner_image_url"
                    class="w-10 h-10 rounded object-cover border border-gray-200"
                    :alt="option?.name"
                  />
                  <span class="text-sm font-medium">{{ option?.name }}</span>
                </div>
              </template>
            </VSelect>
          </div>

          <div class="w-full mt-5">
            <label
              for="header-category"
              class="text-sm font-medium text-gray-700 mb-2 block"
            >
              Select Category Section 2
            </label>

            <VSelect
              v-if="categories"
              label="name"
              :options="categories"
              :reduce="(item) => item.id"
              v-model="setting.home_category_2"
              class="custom-select"
            >
              <template #option="option">
                <div class="flex items-center gap-3 py-2">
                  <img
                    :src="option?.banner_image_url"
                    class="w-10 h-10 rounded object-cover border border-gray-200"
                    :alt="option?.name"
                  />
                  <span class="text-sm font-medium">{{ option?.name }}</span>
                </div>
              </template>
            </VSelect>
          </div>
        </div>

        <!-- Logo Settings -->
        <div
          v-if="activeTab === 'logo'"
          class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-primary/20 p-6 hover:shadow-2xl transition-all duration-300"
        >
          <h3 class="font-semibold text-rose-900 mb-6 text-lg">
            Logo Settings
          </h3>
          <div class="w-full">
            <div class="flex">
              <!-- Logo Light -->
              <div class="w-1/3 p-2">
                <label
                  for="logo-light"
                  class="group p-4 cursor-pointer flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl hover:border-rose-400 hover:bg-rose-50/30 transition-all duration-300"
                >
                  <input
                    @change="handleLightLogo"
                    type="file"
                    class="hidden"
                    id="logo-light"
                    accept="image/*"
                  />
                  <img
                    v-if="logoLight"
                    :src="logoLight"
                    class="w-full h-28 object-contain transition-transform group-hover:scale-105"
                  />
                  <div v-else class="text-center">
                    <Icon
                      name="hugeicons:cloud-upload-02"
                      class="text-3xl text-gray-400 mb-2 group-hover:text-rose-500 transition-colors"
                    />
                    <span class="text-xs text-gray-500 block"
                      >Upload Light Logo</span
                    >
                  </div>
                </label>
                <h3 class="text-sm font-semibold text-gray-700 mt-3">
                  Logo Light
                </h3>
                <p class="text-xs text-gray-500 mt-1">For dark backgrounds</p>
              </div>

              <!-- Logo Dark -->
              <div class="w-1/3 p-2">
                <label
                  for="logo-dark"
                  class="group p-4 cursor-pointer flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300"
                >
                  <input
                    @change="handleDarkLogo"
                    type="file"
                    class="hidden"
                    id="logo-dark"
                    accept="image/*"
                  />
                  <img
                    class="w-full h-28 object-contain transition-transform group-hover:scale-105"
                    v-if="logoDark"
                    :src="logoDark"
                  />
                  <div v-else class="text-center">
                    <Icon
                      name="hugeicons:cloud-upload-02"
                      class="text-3xl text-gray-400 mb-2 group-hover:text-blue-500 transition-colors"
                    />
                    <span class="text-xs text-gray-500 block"
                      >Upload Dark Logo</span
                    >
                  </div>
                </label>
                <h3 class="text-sm font-semibold text-gray-700 mt-3">
                  Logo Dark
                </h3>
                <p class="text-xs text-gray-500 mt-1">For light backgrounds</p>
              </div>
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
            @click="onSubmit"
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
import { ref, reactive, onMounted } from "vue";
import useAxios from "@/composables/useAxios";
import { toast } from "vue3-toastify";
import Modal from "@/components/Modal.vue";

const { loading, error, sendRequest } = useAxios();
const activeTab = ref("general");

const tabs = [
  { id: "general", label: "General", icon: "ph:gear" },
  { id: "home", label: "Home", icon: "material-symbols:add-home-rounded" },
  { id: "logo", label: "logo", icon: "material-symbols-light:home-app-logo" },
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

const getAllSetting = async () => {
  const response = await sendRequest({
    method: "get",
    url: "/v1/setting",
  });
  setting.value.header_categories = response.data.header_categories;
  setting.value.home_category = response.data.home_category;
  setting.value.home_category_2 = response.data.home_category_2;
  setting.value.currency = response.data.currency;
  setting.value.currency_symbol = response.data.currency_symbol;
  setting.value.email = response.data.email;
  setting.value.phone_number = response.data.phone_number;
  setting.value.whatsapp_number = response.data.whatsapp_number;
  setting.value.hotline_number = response.data.hotline_number;
  setting.value.facebook_link = response.data.facebook_link;
  setting.value.instagram_link = response.data.instagram_link;
  setting.value.youtube_link = response.data.youtube_link;
  setting.value.linkedin_link = response.data.linkedin_link;
  setting.value.app_name = response.data.app_name;
  setting.value.app_url = response.data.app_url;
  setting.value.home_products = response.data.home_products;
  setting.value.home_categories = response.data.home_categories;
  setting.value.header_categories = response.data.header_categories;
  logoLight.value = response.data.logo_light_url;
  logoDark.value = response.data.logo_dark_url;
  setting.value.twitter_link = response.data.twitter_link;
  setting.value.service_hours = response.data.service_hours;
  setting.value.address = response.data.address;
  setting.value.google_map = response.data.google_map;
  setting.value.termsandcondition_link = response.data.termsandcondition_link;
  setting.value.privacyPolicy_link = response.data.privacyPolicy_link;
};

// // get Category
const categories = ref(null);
const getCategory = async () => {
  const response = await sendRequest({
    method: "get",
    url: "/v1/parent/category",
  });
  if (response) {
    categories.value = response.data?.data;
  }
};

// // get Category
const AllCategories = ref(null);
const getAllCategory = async () => {
  const response = await sendRequest({
    method: "get",
    url: "/v1/all_category",
  });
  if (response) {
    AllCategories.value = response.data?.data;
  }
};

//get Product
const products = ref(null);
const getProduct = async () => {
  const response = await sendRequest({
    method: "get",
    url: "/v1/products",
  });
  if (response) {
    products.value = response.data;
  }
};

// get Page
// const pages = ref(null);
// const getPage = async () => {
//   const response = await sendRequest({
//     method: "get",
//     url: "/v1/all-page-list",
//   });

//   if (response) {
//     pages.value = response.data;
//   }
// };

// handle logo
const logoLight = ref(null);
const handleLightLogo = (image) => {
  const file = image.target.files[0];
  setting.value.logo_light = file;
  logoLight.value = URL.createObjectURL(file);
};

// handle logo
const logoDark = ref(null);
const handleDarkLogo = (image) => {
  const file = image.target.files[0];
  setting.value.logo_dark = file;
  logoDark.value = URL.createObjectURL(file);
};

const setting = ref({
  home_products: [],
  home_categories: [],
  header_categories: [],
  home_category: null,
  home_category_2: null,
  currency: null,
  currency_symbol: null,
  email: null,
  phone_number: null,
  whatsapp_number: null,
  hotline_number: null,
  facebook_link: null,
  youtube_link: null,
  instagram_link: null,
  linkedin_link: null,
  twitter_link: null,
  privacyPolicy_link: null,
  termsandcondition_link: null,
  app_name: null,
  logo_dark: null,
  logo_light: null,
  google_map: null,
  address: null,
  service_hours: null,
});

const onSubmit = async () => {
  const response = await sendRequest({
    method: "post",
    url: "/v1/save-header-setting",
    data: setting.value,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response) {
    toast.success("Setting saved Successfully");
    getAllSetting();
  }
};

// model
const isModalOpened = ref(false);

const openModal = () => {
  isModalOpened.value = true;
};
const closeModal = () => {
  isModalOpened.value = false;
};

onMounted(() => {
  getCategory();
  // getPage();
  getAllSetting();
  getAllCategory();
  getProduct();
});
</script>
