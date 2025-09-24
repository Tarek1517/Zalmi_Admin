<template>
  <AppLayout>
    <!-- Header Section -->
    <div
      class="flex flex-col lg:flex-row items-start lg:items-center justify-between px-6 bg-white rounded-xl mb-6"
    >
      <div class="mb-4 lg:mb-0">
        <h2 class="text-2xl font-bold text-gray-900">System Settings</h2>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <button
          @click="resetToDefaults"
          class="flex items-center justify-center gap-2 bg-rose-500 px-4 py-2.5 text-white font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200"
        >
          <Icon name="heroicons:arrow-path" class="w-5 h-5" />
          Reset
        </button>
      </div>
    </div>

    <!-- Settings Tabs -->
    <div class="bg-white rounded-xl shadow-sm mb-6">
      <div class="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <nav class="flex overflow-x-auto px-4">
          <div
            class="flex space-x-1 rounded-full bg-gray-100/80 p-1 backdrop-blur-sm"
          >
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="relative rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ease-out"
              :class="
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-lg shadow-blue-100'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              "
            >
              {{ tab.name }}
              <span
                v-if="activeTab === tab.id"
                class="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
              ></span>
            </button>
          </div>
        </nav>
      </div>

      <!-- General Settings -->
      <div v-if="activeTab === 'general'" class="p-6">
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <!-- Application Settings -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div
                class="p-2 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl"
              >
                <Icon
                  name="ic:outline-settings-suggest"
                  class="w-5 h-5 text-blue-600"
                />
              </div>
              <h3 class="text-xl font-semibold text-gray-900">
                Application Settings
              </h3>
            </div>

            <div class="space-y-5">
              <div class="group">
                <label
                  class="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
                >
                  Application Name
                </label>
                <div class="relative">
                  <input
                    v-model="settings.general.appName"
                    type="text"
                    class="w-full px-4 pl-11 py-3.5 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    placeholder="Your Application Name"
                  />
                  <Icon
                    name="material-symbols:person-edit-outline-sharp"
                    class="text-xl text-orange-500 absolute left-4 top-1/2 transform -translate-y-1/2"
                  />
                </div>
              </div>

              <div class="group">
                <label
                  class="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
                >
                  Support Email
                </label>
                <div class="relative">
                  <input
                    v-model="settings.general.supportEmail"
                    type="email"
                    class="w-full px-4 pl-11 py-3.5 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    placeholder="support@example.com"
                  />
                  <Icon
                    name="material-symbols-light:stacked-email-rounded"
                    class="text-xl text-green-500 absolute left-4 top-1/2 transform -translate-y-1/2"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="group">
                  <label
                    class="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
                  >
                    Timezone
                  </label>
                  <div class="relative">
                    <select
                      v-model="settings.general.timezone"
                      class="w-full px-4 pl-11 py-3.5 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none shadow-sm hover:shadow-md"
                    >
                      <option v-for="tz in timezones" :key="tz" :value="tz">
                        {{ tz }}
                      </option>
                    </select>

                    <Icon
                      name="stash:globe-timezone-solid"
                      class="w-4 h-4 text-lime-500 absolute left-4 top-1/2 transform -translate-y-1/2"
                    />
                  </div>
                </div>

                <div class="group">
                  <label
                    class="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
                  >
                    Date Format
                  </label>
                  <div class="relative">
                    <select
                      v-model="settings.general.dateFormat"
                      class="w-full px-4 pl-11 py-3.5 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 appearance-none shadow-sm hover:shadow-md"
                    >
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                    <Icon
                      name="ic:twotone-calendar-month"
                      class="w-4 h-4 text-sky-500 absolute left-4 top-1/2 transform -translate-y-1/2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Security Settings -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div
                class="p-2 bg-gradient-to-br from-red-100 to-red-50 rounded-xl"
              >
                <Icon
                  name="material-symbols:shield-lock-outline"
                  class="w-5 h-5 text-red-600"
                />
              </div>
              <h3 class="text-xl font-semibold text-gray-900">
                Security Settings
              </h3>
            </div>

            <div class="space-y-5">
              <div
                class="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <Icon
                      name="cbi:mainsail"
                      class="text-2xl text-orange-500"
                    />
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Maintenance Mode</label
                      >
                      <p class="text-sm text-gray-500 mt-1">
                        Put the application in maintenance mode
                      </p>
                    </div>
                  </div>
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      v-model="settings.security.maintenanceMode"
                      type="checkbox"
                      class="sr-only peer"
                    />
                    <div
                      class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-600 shadow-inner"
                    ></div>
                  </label>
                </div>
              </div>

              <div
                class="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <Icon
                      name="material-symbols:android-wifi-3-bar-lock"
                      class="w-5 h-5 text-green-500"
                    />
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Force HTTPS</label
                      >
                      <p class="text-sm text-gray-500 mt-1">
                        Redirect all HTTP traffic to HTTPS
                      </p>
                    </div>
                  </div>
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      v-model="settings.security.forceHttps"
                      type="checkbox"
                      class="sr-only peer"
                    />
                    <div
                      class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-blue-600 shadow-inner"
                    ></div>
                  </label>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="group">
                  <label
                    class="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
                  >
                    <Icon
                      name="material-symbols:alarm-add"
                      class="w-4 h-4 text-orange-400"
                    />
                    Session Timeout
                  </label>
                  <div class="relative">
                    <input
                      v-model="settings.security.sessionTimeout"
                      type="number"
                      min="1"
                      class="w-full px-4 pl-11 py-3.5 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                    <Icon
                      name="material-symbols:alarm-pause-rounded"
                      class="text-xl text-orange-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                    />
                  </div>
                </div>

                <div class="group">
                  <label
                    class="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
                  >
                    <Icon
                      name="material-symbols:nest-clock-farsight-analog"
                      class="w-4 h-4 text-cyan-400"
                    />
                    Max Login Attempts
                  </label>
                  <div class="relative">
                    <input
                      v-model="settings.security.maxLoginAttempts"
                      type="number"
                      min="1"
                      class="w-full px-4 pl-11 py-3.5 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    />
                    <Icon
                      name="material-symbols:account-circle"
                      class="text-xl text-cyan-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Email Settings -->
      <div v-if="activeTab === 'email'" class="p-6">
        <div class="grid grid-cols-1 gap-8">
          <!-- SMTP Settings -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div
                class="p-2 bg-gradient-to-br from-purple-200 to-purple-300 rounded-xl"
              >
                <Icon
                  name="solar:server-minimalistic-broken"
                  class="w-5 h-5 text-purple-600"
                />
              </div>
              <h3 class="text-xl font-semibold text-gray-900">SMTP Settings</h3>
            </div>

            <div class="space-y-5">
              <div class="group">
                <label
                  class="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
                >
                  SMTP Host
                </label>
                <div class="relative">
                  <input
                    v-model="settings.email.smtpHost"
                    type="text"
                    class="w-full px-4 pl-11 py-3.5 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    placeholder="smtp.example.com"
                  />
                  <Icon
                    name="solar:server-minimalistic-linear"
                    class="w-4 h-4 text-blue-500 absolute left-4 top-1/2 transform -translate-y-1/2"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="group">
                  <label
                    class="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
                  >
                    SMTP Port
                  </label>
                  <div class="relative">
                    <input
                      v-model="settings.email.smtpPort"
                      type="number"
                      class="w-full px-4 pl-11 py-3.5 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
                      placeholder="587"
                    />
                    <Icon
                      name="material-symbols:settings-outline"
                      class="text-lg text-rose-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                    />
                  </div>
                </div>

                <div class="group">
                  <label
                    class="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
                  >
                    Username
                  </label>
                  <div class="relative">
                    <input
                      v-model="settings.email.smtpUsername"
                      type="text"
                      class="w-full px-4 pl-11 py-3.5 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
                      placeholder="your-email@example.com"
                    />
                    <Icon
                      name="mingcute:mail-send-fill"
                      class="text-xl text-sky-500 absolute left-4 top-1/2 transform -translate-y-1/2"
                    />
                  </div>
                </div>
              </div>

              <div class="group">
                <label
                  class="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
                >
                  Password
                </label>
                <div class="relative">
                  <input
                    v-model="settings.email.smtpPassword"
                    type="password"
                    class="w-full px-4 pl-11 py-3.5 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    placeholder="••••••••"
                  />
                  <Icon
                    name="material-symbols:key"
                    class="text-xl text-orange-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                  />
                </div>
              </div>

              <div
                class="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-primary/25 hover:border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <Icon
                      name="mdi:shield-account"
                      class="text-xl text-green-500"
                    />
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Use TLS/SSL</label
                      >
                      <p class="text-sm text-gray-500 mt-1">
                        Enable secure connection
                      </p>
                    </div>
                  </div>
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      v-model="settings.email.useTls"
                      type="checkbox"
                      class="sr-only peer"
                    />
                    <div
                      class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/50 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-purple-600 shadow-inner"
                    ></div>
                  </label>
                </div>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row justify-end gap-3 mt-10">
              <button
                @click="saveSettings"
                :disabled="loading"
                class="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 px-4 py-2.5 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                <Icon name="heroicons:check" class="w-5 h-5" />
                {{ loading ? "Saving..." : "Save Changes" }}
              </button>
              <button
                @click="testEmailConnection"
                class="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Icon name="lucide:wifi" class="w-4 h-4" />
                Test Connection
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Settings -->
      <div v-if="activeTab === 'payment'" class="p-6">
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <!-- Payment Gateways -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div
                class="p-2 bg-gradient-to-br from-green-100 to-green-50 rounded-xl"
              >
                <Icon name="bx:credit-card" class="w-5 h-5 text-green-600" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900">
                Payment Gateways
              </h3>
            </div>

            <div class="space-y-5">
              <!-- Stripe Settings -->
              <div
                class="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-purple-50 rounded-lg">
                      <Icon
                        name="fa7-brands:cc-stripe"
                        class="w-6 h-6 text-purple-600"
                      />
                    </div>
                    <div>
                      <span class="font-semibold text-gray-900">Stripe</span>
                      <p class="text-sm text-gray-500">Credit card payments</p>
                    </div>
                  </div>
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      v-model="settings.payment.stripe.enabled"
                      type="checkbox"
                      class="sr-only peer"
                    />
                    <div
                      class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300/50 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-blue-600 shadow-inner"
                    ></div>
                  </label>
                </div>

                <div
                  v-if="settings.payment.stripe.enabled"
                  class="space-y-4 pt-4 border-t border-gray-100"
                >
                  <div class="group">
                    <label
                      class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                    >
                      Publishable Key
                    </label>
                    <div class="relative">
                      <input
                        v-model="settings.payment.stripe.publishableKey"
                        type="text"
                        class="w-full px-4 pl-11 py-3 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                        placeholder="pk_test_..."
                      />
                      <Icon
                        name="material-symbols:eye-tracking"
                        class="text-lg text-blue-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                      />
                    </div>
                  </div>
                  <div class="group">
                    <label
                      class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                    >
                      Secret Key
                    </label>
                    <div class="relative">
                      <input
                        v-model="settings.payment.stripe.secretKey"
                        type="password"
                        class="w-full px-4 pl-11 py-3 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                        placeholder="sk_test_..."
                      />
                      <Icon
                        name="material-symbols:shield-lock-rounded"
                        class="text-xl text-rose-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Bikash Settings -->
              <div
                class="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <!-- Header -->
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-green-50 rounded-lg">
                      <img
                        src="@/assets/images/bikash.png"
                        alt="Admin Dashboard"
                        class="w-12 h-auto object-cover"
                      />
                    </div>
                    <div>
                      <span class="font-semibold text-gray-900">Bikash</span>
                      <p class="text-sm text-gray-500">
                        Mobile wallet payments
                      </p>
                    </div>
                  </div>

                  <!-- Toggle -->
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      v-model="settings.payment.bikash.enabled"
                      type="checkbox"
                      class="sr-only peer"
                    />
                    <div
                      class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300/50 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-600 shadow-inner"
                    ></div>
                  </label>
                </div>

                <!-- Settings -->
                <div
                  v-if="settings.payment.bikash.enabled"
                  class="space-y-4 pt-4 border-t border-gray-100"
                >
                  <!-- Merchant ID -->

                  <div class="group">
                    <label
                      class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                    >
                      Merchant ID
                    </label>
                    <div class="relative">
                      <input
                        v-model="settings.payment.bikash.merchantId"
                        type="password"
                        class="w-full px-4 pl-11 py-3 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                        placeholder="Merchant ID..."
                      />
                      <Icon
                        name="material-symbols:account-box-outline-sharp"
                        class="text-xl text-emerald-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                      />
                    </div>
                  </div>

                  <!-- API Key -->
                  <div class="group">
                    <label
                      class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                    >
                      API Key
                    </label>

                    <div class="relative">
                      <input
                        v-model="settings.payment.bikash.apiKey"
                        type="password"
                        class="w-full px-4 pl-11 py-3 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
                        placeholder="API Key..."
                      />
                      <Icon
                        name="eos-icons:api-outlined"
                        class="text-xl text-lime-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                      />
                    </div>
                  </div>

                  <!-- Environment -->
                  <div class="group">
                    <label
                      class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
                    >
                      Environment
                    </label>
                    <select
                      v-model="settings.payment.bikash.environment"
                      class="w-full px-4 py-3 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-200 appearance-none"
                    >
                      <option value="sandbox" class="text-orange-600">
                        Sandbox (Testing)
                      </option>
                      <option value="live" class="text-green-600">
                        Live (Production)
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Currency & Tax -->
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <div
                class="py-2 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-xl"
              >
                <Icon name="tabler:coin-taka" class="w-5 h-5 text-yellow-600" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900">
                Currency & Tax
              </h3>
            </div>

            <div class="space-y-5">
              <div class="group">
                <label
                  class="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
                >
                  Default Currency
                </label>
                <div class="relative">
                  <select
                    v-model="settings.payment.defaultCurrency"
                    class="w-full px-4 pl-11 py-3.5 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 appearance-none shadow-sm hover:shadow-md"
                  >
                    <option value="USD">🇺🇸 USD - US Dollar</option>
                    <option value="EUR">🇪🇺 EUR - Euro</option>
                    <option value="GBP">🇬🇧 GBP - British Pound</option>
                    <option value="CAD">🇨🇦 CAD - Canadian Dollar</option>
                    <option value="AUD">🇦🇺 AUD - Australian Dollar</option>
                  </select>
                  <Icon
                    name="tabler:coin-taka"
                    class="text-xl text-blue-500 absolute left-4 top-1/2 transform -translate-y-1/2"
                  />
                </div>
              </div>

              <div class="group">
                <label
                  class="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2"
                >
                  Tax Rate (%)
                </label>
                <div class="relative">
                  <input
                    v-model="settings.payment.taxRate"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    class="w-full px-4 pl-11 py-3.5 rounded-xl border border-primary/25 bg-white/50 focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md"
                  />
                  <Icon
                    name="solar:calculator-minimalistic-bold"
                    class="text-lg text-orange-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                  />
                </div>
              </div>

              <div
                class="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-primary/25 hover:border-gray-200 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <Icon
                      name="akar-icons:calculator"
                      class="w-5 h-5 text-green-500"
                    />
                    <div>
                      <label class="block text-sm font-medium text-gray-700"
                        >Enable Tax Calculation</label
                      >
                      <p class="text-sm text-gray-500 mt-1">
                        Automatically calculate tax on orders
                      </p>
                    </div>
                  </div>
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      v-model="settings.payment.enableTax"
                      type="checkbox"
                      class="sr-only peer"
                    />
                    <div
                      class="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300/50 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-600 shadow-inner"
                    ></div>
                  </label>
                </div>
              </div>

              <div
                class="p-4 bg-gradient-to-br from-blue-50 to-blue-25 rounded-xl border border-blue-100"
              >
                <div class="flex items-center gap-3">
                  <Icon name="material-symbols:chat-info-rounded" class="w-5 h-5 text-blue-500" />
                  <p class="text-sm text-blue-700">
                    Tax rates are applied automatically during checkout based on
                    your configured percentage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";

const loading = ref(false);
const activeTab = ref("general");

const tabs = [
  { id: "general", name: "General" },
  { id: "email", name: "Email" },
  { id: "payment", name: "Payment" },
];

// Sample timezones (you can use a more comprehensive list)
const timezones = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Dubai",
  "Australia/Sydney",
];

// Default settings structure
const defaultSettings = {
  general: {
    appName: "Zalmi Admin",
    supportEmail: "support@zalmi.com",
    timezone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
  },
  security: {
    maintenanceMode: false,
    forceHttps: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
  },
  email: {
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUsername: "",
    smtpPassword: "",
    useTls: true,
    fromName: "Zalmi System",
    fromEmail: "noreply@zalmi.com",
  },
  payment: {
    stripe: {
      enabled: true,
      publishableKey: "",
      secretKey: "",
    },
    bikash: {
      enabled: false,
      apiKey: "",
      environment: "sandbox",
    },
    defaultCurrency: "USD",
    taxRate: 0,
    enableTax: false,
  },
  advanced: {
    cacheDuration: 60,
    enableCaching: true,
    enableGzip: true,
    logLevel: "error",
    debugMode: false,
  },
};

const settings = ref(JSON.parse(JSON.stringify(defaultSettings)));

const loadSettings = () => {
  const savedSettings = localStorage.getItem("systemSettings");
  if (savedSettings) {
    const parsed = JSON.parse(savedSettings);

    settings.value = {
      ...defaultSettings,
      ...parsed,
      payment: {
        ...defaultSettings.payment,
        ...parsed.payment,
        bikash: {
          ...defaultSettings.payment.bikash,
          ...(parsed.payment?.bikash || {}),
        },
      },
    };
  }
};

// Save settings to localStorage or API
const saveSettings = async () => {
  loading.value = true;
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    localStorage.setItem("systemSettings", JSON.stringify(settings.value));
    toast.success("Settings saved successfully!", { theme: "dark" });
  } catch (error) {
    toast.error("Failed to save settings", { theme: "dark" });
  } finally {
    loading.value = false;
  }
};

// Reset to default settings
const resetToDefaults = () => {
  if (
    confirm(
      "Are you sure you want to reset all settings to default? This action cannot be undone."
    )
  ) {
    settings.value = JSON.parse(JSON.stringify(defaultSettings));
    localStorage.removeItem("systemSettings");
    toast.info("Settings reset to defaults", { theme: "dark" });
  }
};

// Test email connection
const testEmailConnection = async () => {
  toast.info("Testing email connection...", { theme: "dark" });
  // Implement email connection test logic
};

// Send test email
const sendTestEmail = async () => {
  toast.info("Sending test email...", { theme: "dark" });
  // Implement test email sending logic
};

// Clear cache
const clearCache = () => {
  if (confirm("Clear all cached data?")) {
    toast.success("Cache cleared successfully", { theme: "dark" });
  }
};

// View logs
const viewLogs = () => {
  // Navigate to logs page
  window.location.href = "/admin/logs";
};

// Dangerous actions
const clearAllData = () => {
  if (
    confirm(
      "This will delete ALL data including users, orders, and settings. Are you absolutely sure?"
    )
  ) {
    toast.error("Data clearance initiated", { theme: "dark" });
  }
};

const resetSystem = () => {
  if (
    confirm(
      "This will reset the entire system to factory defaults. ALL DATA WILL BE LOST. Continue?"
    )
  ) {
    toast.error("Factory reset initiated", { theme: "dark" });
  }
};

onMounted(() => {
  loadSettings();
});
</script>

<style scoped>
/* Custom styles for better appearance */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Smooth transitions for tab content */
.tab-content {
  transition: all 0.3s ease-in-out;
}
</style>
